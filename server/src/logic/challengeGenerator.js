const random = require("lodash/random");
const cloneDeep = require("lodash/cloneDeep");
const difference = require("lodash/difference");
const uniq = require("lodash/uniq");

const {
  minMax,
  difficultyFinder,
} = require("./utils");

const {
  qaGenerate,
} = require("./qaGenerator");

const {
  CHANCES_COUNT,
  COURSE_FLAG_PREFER_METRIC,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_STATUS_ACTIVE,
} = require("../constants");

const {
  GraphQlDumpWarning,
  MasteryNotFoundForSubSubject,
  ChallengeHasNoTargetedSubSubjects,
  ChallengeCouldNotFindSubSubjects,
} = require("../errors");

const PREFERENCE_NONE = "none";
const PREFERENCE_IMPERIAL = "imperial";
const PREFERENCE_METRIC = "metric";

class ChallengeGenerator {
  constructor(ctx) {
    this.ctx = ctx;
  }


  /**
   * Function that coordinates all the needed behaviors to build a challenge into one point of
   * access.
   * @param courseId
   * @param subjectIds
   * @param subSubjectIds
   * @param listSize
   * @param ignoreRarity
   * @param ignoreDifficulty
   * @param ignorePreference
   * @returns [QAObjects]
   */
  async generateChallenge(courseId, subjectIds, subSubjectIds, listSize, ignoreRarity,
    ignoreDifficulty, ignorePreference) {
    // Need to have Subject or SubSubject IDs defined.
    if (subjectIds.length === 0 && subSubjectIds.length === 0) {
      throw new ChallengeHasNoTargetedSubSubjects();
    }

    // First, need to get all subSubjectIds
    let allSubSubjectIds = [];
    if (subjectIds.length) {
      allSubSubjectIds.push(...await this.getSubSubjectsForSubjects(subjectIds));
    }
    if (subSubjectIds.length) {
      allSubSubjectIds.push(...subSubjectIds);
    }

    // Remove any subSubject ID duplicates.
    allSubSubjectIds = uniq(allSubSubjectIds);

    if (allSubSubjectIds.length === 0) {
      // There were no subSubjects at all. That shouldn't occur.
      throw new ChallengeCouldNotFindSubSubjects(subjectIds.join(", "));
    }

    // Get all Mastery information for each SubSubject.
    const subSubjectMasteryData = await this.getMasteriesForSubSubjects(courseId, allSubSubjectIds);

    // Make sure that every SubSubject has a Mastery.
    const missingSubSubjects = difference(allSubSubjectIds, Object.keys(subSubjectMasteryData));
    if (missingSubSubjects.length) {
      // TODO Add a check that confirms that inputted SubSubject IDs are all valid.
      throw new MasteryNotFoundForSubSubject(courseId, missingSubSubjects.join(", "));
    }

    // Get desired difficulties (if they're not ignored) for each SubSubject.
    const subSubjectDifficulties = {};
    if (!ignoreDifficulty) {
      allSubSubjectIds.forEach((subSubjectId) => {
        subSubjectDifficulties[subSubjectId] =
          difficultyFinder(subSubjectMasteryData[subSubjectId].score);
      });
    }

    // Get the Question IDs for each SubSubject.
    const subSubjectQuestions =
      await this.getQuestionsForSubSubjects(allSubSubjectIds, subSubjectDifficulties);

    // Get course preference and build the final list of questions.
    const preference = ignorePreference ?
      PREFERENCE_NONE : await this.getCoursePreference(courseId);
    const questionIds = buildQuestionList(
      subSubjectQuestions,
      listSize,
      preference,
      ignoreRarity,
    );

    // Get the content of the selected questions and get any Survey data the Course may have.
    const questionData = await this.getQuestionData(questionIds);
    const surveyData = await this.getCourseSurveys(courseId, questionIds);

    // Finally, parse the Question and (if present) Survey data to generate an array of QA objects.
    const qaList = [];

    // Because questionData has only unique Questions (i.e. no repeats) we need to loop off the
    // questionIds array instead for the full listSize of questions. That way repeated questions
    // (randomly generate conversion questions) can be repeated in the final QA list.
    // TODO think of some way to handle question loss through skipped Survey questions.
    for (let x = 0; x < questionIds.length; ++x) {
      if (surveyData[questionIds[x]]) {
        qaList.push(qaGenerate(
          questionData[questionIds[x]],
          surveyData[questionIds[x]],
        ));
      } else {
        qaList.push(qaGenerate(questionData[questionIds[x]]));
      }
    }

    return qaList;
  }


  /**
   * Simple function gets all the necessary Question data necessary for QA generation from a list of
   * Question IDs.
   * @param questionIds
   * @returns {{ questionId: {
   *               id, type, status, flags, difficulty, question, answer, media, parent: {
   *                id
   *               }
   *             }
   *          }}
   */
  async getQuestionData(questionIds) {
    if (!Array.isArray(questionIds) || questionIds.length < 1) {
      throw new GraphQlDumpWarning("query", "getQuestionData");
    }

    const questionData = await this.ctx.db.query.questions(
      {
        where: {
          OR: questionIds.map(questionId => ({ id: questionId })),
        },
      },
      `{
        id
        type
        status
        flags
        difficulty
        question
        answer
        media
        parent {
          id
        }
      }`,
    );

    // Format returned data into a key-value object so each question can be retrieved by its ID.
    const questionDataObject = {};
    questionData.forEach((question) => {
      questionDataObject[question.id] = question;
    });

    return questionDataObject;
  }


  /**
   * Simple function gets Surveys that belong to the course and are associated with particular
   * Questions as determined by their IDs.
   * @param courseId
   * @param questionIds
   * @returns [Survey]!
   */
  async getCourseSurveys(courseId, questionIds) {
    const surveyData = await this.ctx.db.query.surveys(
      {
        where: {
          AND: [
            { parent: { id: courseId } },
            { OR: questionIds.map(questionId => ({ question: { id: questionId } })) },
          ],
        },
      },
      `{
        id
        score
        answer
        detail
        status
        parent {
          id
        }
        question {
          id
        }
      }`,
    );

    // To make the data format convenient organize each Survey by Question Id.
    const surveys = {};
    surveyData.forEach((survey) => {
      surveys[survey.question.id] = survey;
    });

    return surveys;
  }


  /**
   * Simple function queries the server for a course's flags to see if the flag indicating a
   * preference for Metric measurements is present and returns one of two constants.
   * @param courseId
   * @returns {String}
   */
  async getCoursePreference(courseId) {
    const courseData = await this.ctx.db.query.course(
      { where: { id: courseId } },
      "{ flags }",
    );
    if (courseData.flags & COURSE_FLAG_PREFER_METRIC) {
      return PREFERENCE_METRIC;
    }
    return PREFERENCE_IMPERIAL;
  }


  /**
   * Using the Course ID this gets the connected Masteries of each targeted SubSubject ID.
   * @param courseId
   * @param subSubjectIds
   * @returns {{ subSubjectId: { masteryId, masteryStatus, masteryScore } }}
   */
  async getMasteriesForSubSubjects(courseId, subSubjectIds) {
    if (!courseId || subSubjectIds.length === 0) {
      throw new GraphQlDumpWarning("query", "getMasteriesForSubSubjects");
    }

    const masteryData = await this.ctx.db.query.masteries(
      {
        where: {
          AND: [
            { parent: { id: courseId } },
            { OR: subSubjectIds.map(subSubjectId => ({ subSubject: { id: subSubjectId } })) },
          ],
        },
      },
      "{ id, status, score, subSubject { id } }",
    );

    const subSubjectMasteryData = {};
    masteryData.forEach((mastery) => {
      subSubjectMasteryData[mastery.subSubject.id] = {
        id: mastery.id,
        status: mastery.status,
        score: mastery.score,
      };
    });

    return subSubjectMasteryData;
  }


  /**
   * Retrieve all SubSubect IDs for a given list of Subjects IDs.
   * @param subjectIds
   * @returns [SubSubjectID]
   */
  async getSubSubjectsForSubjects(subjectIds) {
    if (!Array.isArray(subjectIds) && subjectIds.length === 0) {
      throw new GraphQlDumpWarning("query", "getSubSubjectsForSubjects");
    }

    const subjectsData = await this.ctx.db.query.subjects(
      {
        where: {
          OR: subjectIds.map(subjectId => ({ id: subjectId })),
        },
      },
      `{
        subSubjects {
          id
        }
      }`,
    );

    // Simplify to a basic array of SubSubject IDs.
    const subSubjectIds = [];
    subjectsData.forEach(subjectData =>
      subjectData.subSubjects.forEach(subSubject =>
        subSubjectIds.push(subSubject.id)));

    return subSubjectIds;
  }


  /**
   * Query the active Questions belonging to each SubSubject filtered by requested difficulties.
   * @param subSubjectIds
   * @param difficulties Object of difficulties where each key is a subSubjectId and contains an
   *                      array of Ints, each representing a desired difficulty value. If empty
   *                      it will not apply difficulty filtering.
   * @returns {[{
   *            subSubjectid,
   *            rarity,
   *            toMetric,
   *            questions: [{ questionId, toMetric, type, difficulty }]
   *          }]}
   */
  async getQuestionsForSubSubjects(subSubjectIds, difficulties = {}) {
    if (subSubjectIds.length === 0) {
      throw new GraphQlDumpWarning("query", "getQuestionsForSubSubjects");
    }

    // Construct the filtering criteria for the Questions.
    const orClauses = {};
    if (Object.keys(difficulties).length) {
      // Find questions by their difficulty AND their parent SubSubject ID.
      // Note: If the user's Mastery score was out of bounds, difficulty will be [], returning
      // no questions.
      orClauses.OR = subSubjectIds.map(subSubjectId =>
        ({
          AND: [
            { difficulty_in: difficulties[subSubjectId] },
            { parent: { id: subSubjectId } },
          ],
        }));
    } else {
      // We're not doing difficulty filtering. Find only by parent SubSubject ID.
      orClauses.OR = subSubjectIds.map(subSubjectId =>
        ({ parent: { id: subSubjectId } }));
    }

    const questionData = await this.ctx.db.query.questions(
      {
        where: {
          AND: [
            { status: QUESTION_STATUS_ACTIVE },
            orClauses,
          ],
        },
      },
      `{
        id
        type
        difficulty
        status
        parent {
          id
          toMetric
          rarity
        }
      }`,
    );

    // Flip the structure around so we're organized by SubSubject.
    const subSubjectQuestions = {};

    // Loop through all Questions and sort them by their parent SubSubject ID.
    questionData.forEach((question) => {
      // Using Object reference to save some character space.
      let subSubjectRef = subSubjectQuestions[question.parent.id];
      if (subSubjectRef === undefined) {
        subSubjectQuestions[question.parent.id] = {};
        subSubjectRef = subSubjectQuestions[question.parent.id];
        subSubjectRef.id = question.parent.id;
        subSubjectRef.toMetric = question.parent.toMetric;
        subSubjectRef.rarity = question.parent.rarity;
        subSubjectRef.questions = [];
      }
      subSubjectRef.questions.push({
        id: question.id,
        type: question.type,
        difficulty: question.difficulty,
        status: question.status,
        // Add "toMetric" to every question, this will be used for surveys later.
        toMetric: question.parent.toMetric,
      });
    });

    return subSubjectQuestions;
  }
}


/**
 * Takes an array of SubSubjects (with id and rarity defined) and their questions (with id, type,
 * toMetric, and difficulty defined) and uses subSubject rarity to randomly choose a
 * @param subSubjectQuestions
 * @param listSize    Desired question payload size. This is not guaranteed but will attempt to get
 *                    as close as possible.
 * @param preference
 * @param ignoreRarity
 * @returns [QuestionID]
 */
function buildQuestionList(subSubjectQuestions, listSize, preference, ignoreRarity) {
  // We're going to be performing slices on these arrays, so let's deep clone it be be sanitary.
  const ssqClone = cloneDeep(subSubjectQuestions);
  const subSubjectKeys = Object.keys(subSubjectQuestions);

  // Build a lottery
  const { lotteryRanges, lotteryTotal } = lotteryBuilder(ssqClone, ignoreRarity);

  const questionIds = [];
  const maxAttempts = listSize * 3;  // Will attempt up to 3 times the requested size.

  // List size loop. maxAttempts limits keeps the loop from going infinite if it is unable to build
  // a question list long enough given the dwindling question pool it has to pull from.
  for (let q = 0; q < maxAttempts && questionIds.length < listSize; ++q) {
    // Pick a winner subSubject for this question
    const winnerSubSubjectPos = lotteryPicker(lotteryRanges, lotteryTotal);

    // Something went wrong with the lottery system.
    if (winnerSubSubjectPos === -1) {
      throw new Error(`Could not pick lottery. Ranges: ${lotteryRanges}, Total: ${lotteryTotal}`);
    }
    const winnerSubSubjectId = subSubjectKeys[winnerSubSubjectPos];

    // This subSubject had no valid questions available.
    if (ssqClone[winnerSubSubjectId] === undefined ||
      ssqClone[winnerSubSubjectId].questions.length === 0) {
      continue; // eslint-disable-line no-continue
    }

    // Pick a random question
    const winnerQuestionPos = random(0, ssqClone[winnerSubSubjectId].questions.length - 1);
    const winnerQuestion = ssqClone[winnerSubSubjectId].questions[winnerQuestionPos];

    // Check preference option for Survey type questions.
    // Users with metric preference will not get "toMetric" Survey questions.
    // Users with imperial preference will not get !"toMetric" (i.e. "toImperial") Survey questions.
    if ((winnerQuestion.type === QUESTION_TYPE_SURVEY) &&
      ((preference === PREFERENCE_METRIC && winnerQuestion.toMetric) ||
        (preference === PREFERENCE_IMPERIAL && !winnerQuestion.toMetric))
    ) {
      continue; // eslint-disable-line no-continue
    }

    // Add the Question's ID to the list.
    questionIds.push(winnerQuestion.id);

    // Conversion questions can be repeated. Written and Surveys will not be repeated.
    if (winnerQuestion.type !== QUESTION_TYPE_CONVERSION) {
      // Remove the Question from the list of options.
      ssqClone[winnerSubSubjectId].questions.splice(winnerQuestionPos, 1);
    }
  }

  return questionIds;
}


/**
 * Create the rarity ranges.
 * The algorithm here is very basic and works like a lottery. By default every SubSubject has
 * 100 "chances" to be drawn. "Rarity" reduces those chances. A rarity of 0 means 100 chances.
 * A rarity of 50 means 50 chances (basically 50% as likely). A rarity of 90 means 10 chances
 * (basically 10% as likely).
 * This lottery system works because similarly-rare SubSubjects will have equal chance.
 * @param subSubjectQuestions
 * @param ignoreRarity
 * @returns {{lotteryRanges: Array, lotteryTotal: number}}
 */
function lotteryBuilder(subSubjectQuestions, ignoreRarity) {
  const lotteryRanges = [];
  let lotteryTotal = 0;
  const subSubjectKeys = Object.keys(subSubjectQuestions);
  for (let x = 0; x < subSubjectKeys.length; ++x) {
    // If ignoring rarity, give every SubSubject the same number of chances.
    // Else, if using rarity, determine the chances.
    // Use minMax() to prevent 0-chance and over 100% inflated chances.
    const chances = ignoreRarity ?
      1 :
      minMax(
        1,
        CHANCES_COUNT - subSubjectQuestions[subSubjectKeys[x]].rarity,
        CHANCES_COUNT,
      );

    // Define the range. Ex: if you had 0 rarity, 50 rarity, and 99 rarity SubSubjects the range
    // would be: [[1, 100], [101, 150], [151, 151]]
    lotteryRanges.push([lotteryTotal + 1, lotteryTotal + chances]);
    lotteryTotal += chances;
  }

  return { lotteryRanges, lotteryTotal };
}


/**
 * Given ranges in a lottery and a number to be between it and 1 return the winning subArray.
 * @param lotteryRanges
 * @param lotteryTotal
 * @returns {number}
 */
function lotteryPicker(lotteryRanges, lotteryTotal) {
  const winner = random(1, lotteryTotal);
  for (let x = 0; x < lotteryRanges.length; ++x) {
    if (winner >= lotteryRanges[x][0] && winner <= lotteryRanges[x][1]) {
      return x;
    }
  }
  // Something went wrong, return -1 to indicate an error.
  return -1;
}

module.exports = {
  ChallengeGenerator,
};
