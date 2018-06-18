const random = require("lodash/random");
const cloneDeep = require("lodash/cloneDeep");
const difference = require("lodash/difference");

const {
  difficultyFinder,
} = require("./utils");

const {
  qaGenerate,
} = require("./qaGenerator");

const {
  CHANCES_COUNT,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_STATUS_ACTIVE,
} = require("../constants");

const {
  GraphQlDumpWarning,
  MasteryNotFoundForSubSubject,
  ChallengeHasNoTargetedSubSubjects,
  ChallangeCouldNotFindSubSubjects,
} = require("../errors");

const PREFERENCE_NONE = 0;
const PREFERENCE_IMPERIAL = 1;
const PREFERENCE_METRIC = 2;

class ChallengeGenerator {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async challengeGenerate(courseId, subjectIds, subSubjectIds, size, ignoreRarity,
    ignoreDifficulty, ignorePreference) {
    // Need to have Subject or SubSubject IDs defined.
    if (subjectIds.length === 0 && subSubjectIds.length === 0) {
      throw new ChallengeHasNoTargetedSubSubjects();
    }

    // First, need to get all subSubjectIds
    const allSubSubjectIds = [];
    if (subjectIds.length) {
      allSubSubjectIds.push(...this.getSubSubjectsForSubjects(subjectIds));
    }
    if (subSubjectIds.length) {
      allSubSubjectIds.push(...subSubjectIds);
    }
    if (allSubSubjectIds.length === 0) {
      // There were no subSubjects at all. That shouldn't occur.
      throw new ChallangeCouldNotFindSubSubjects(subjectIds.join(", "));
    }

    // Get all Mastery information for each SubSubject.
    const subSubjectMasteryData = this.getMasteriesForSubSubjects(courseId, allSubSubjectIds);

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
      this.getAllQuestionsForSubSubjects(allSubSubjectIds, subSubjectDifficulties);

    // TODO get preference and call buildQuestionList()
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
   * Query all the Questions belonging to each SubSubject.
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
  async getAllQuestionsForSubSubjects(subSubjectIds, difficulties = {}) {
    if (subSubjectIds.length === 0) {
      throw new GraphQlDumpWarning("query", "getAllQuestionsForSubSubjects");
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
    subSubjectIds.forEach((subSubjectId) => {
      subSubjectQuestions[subSubjectId] = {};
    });

    // Loop through all Questions and sort them by their parent SubSubject ID.
    questionData.forEach((question) => {
      // Using Object reference to save some character space.
      const subSubjectRef = subSubjectQuestions[question.parent.id];
      if (subSubjectRef.id === undefined) {
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
 * @param useRarity
 * @returns [QuestionID]
 */
function buildQuestionList(subSubjectQuestions, listSize, preference, useRarity) {
  // We're going to be performing slices on these arrays, so let's deep clone it be be sanitary.
  const ssqClone = cloneDeep(subSubjectQuestions);

  // Build a lottery
  const { lotteryRanges, lotteryTotal } = lotteryBuilder(ssqClone, useRarity);

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

    // This subSubject had no valid questions available.
    if (ssqClone[winnerSubSubjectPos].question.length < 1) {
      continue; // eslint-disable-line no-continue
    }

    // Pick a random question
    const winnerQuestionPos = random(0, ssqClone[winnerSubSubjectPos].questions.length);
    const winnerQuestion = ssqClone[winnerSubSubjectPos].questions[winnerQuestionPos];

    // Check preference option for Survey type questions.
    // Users with metric preference will not get "toMetric" Survey questions.
    // Users with imperial preference will not get !"toMetric" (i.e. "toImperial") Survey questions.
    if ((winnerQuestion.type === QUESTION_TYPE_SURVEY) &&
      ((preference === "metric" && winnerQuestion.toMetric) ||
        (preference === "imperial" && !winnerQuestion.toMetric))
    ) {
      continue; // eslint-disable-line no-continue
    }

    // Add the Question's ID to the list.
    questionIds.push(winnerQuestion.id);

    // Conversion questions can be repeated. Written and Surveys will not be repeated.
    if (winnerQuestion.type !== QUESTION_TYPE_CONVERSION) {
      ssqClone[winnerSubSubjectPos].questions =
        ssqClone[winnerSubSubjectPos].questions.slice(winnerQuestionPos, 1);
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
 * @param useRarity
 * @returns {{lotteryRanges: Array, lotteryTotal: number}}
 */
function lotteryBuilder(subSubjectQuestions, useRarity) {
  const lotteryRanges = [];
  let lotteryTotal = 0;
  subSubjectQuestions.forEach((subSubjectObject) => {
    // If using rarity, determine the chances.
    // Use min() and max() to prevent 0-chance and increased chances.
    const chances = useRarity ?
      Math.min(
        CHANCES_COUNT,
        Math.max(1, CHANCES_COUNT - subSubjectObject.rarity),
      ) :
      CHANCES_COUNT;

    // Define the range. Ex: if you had 0 rarity, 50 rarity, and 99 rarity SubSubjects the range
    // would be: [[1, 100], [101, 150], [151, 151]]
    lotteryRanges.push([lotteryTotal + 1, lotteryTotal + chances]);
    lotteryTotal += chances;
  });

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
