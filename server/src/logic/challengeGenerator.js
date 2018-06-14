const random = require("lodash/random");

const {
  qaGenerate,
} = require("./qaGenerator");

const {
  CHANCES_COUNT,
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_STATUS_ACTIVE,
  CONVERSION_CHOICE_OPTIONS_MULTIPLIERS,
  UNITS,
} = require("../constants");

const PREFERENCE_NONE = 0;
const PREFERENCE_IMPERIAL = 1;
const PREFERENCE_METRIC = 2;

class challengeGenerator {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async challengeGenerate(courseId, subjectIds, subSubjectIds, size, ignoreRarity,
    ignoreDifficulty, ignorePreference) {
    //
  }

  async getSubSubjectsForSubjects(subjectIds) {
    const subjectsData = this.ctx.db.query.subjects(
      {
        where: {
          OR: subjectIds.map(subjectId => ({ id: subjectId }))
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

  async getAllQuestionsForSubSubjects(subSubjectIds, difficulties = []) {
    const difficultyClause = difficulties.length ?
      `, { difficulty_in: [${difficulties.join()}] }` : "";

    const subSubjects = await this.ctx.db.query.subSubjects(
      {
        where: {
          OR: subSubjectIds.map(subSubjectId => ({ id: subSubjectId })),
        },
      },
      `{
        toMetric
        rarity
        questions( where: {
          AND: [
            { status: ${QUESTION_STATUS_ACTIVE} } ${difficultyClause}
          ]
        }) {
          id
          type
          difficulty
        }
      }`,
    );

    // Add "toMetric" to every question, this will be used for surveys later
    for (let x = 0; x < subSubjects.length; ++x) {
      for (let y = 0; y < subSubjects[x].question.length; ++y) {
        subSubjects[x].questions[y].toMetric = subSubjects[x].toMetric;
      }
    }
    return subSubjects;
  }

  buildQuestionList(subSubjectQuestions, listSize, preference, useRarity) {
    // Create the rarity ranges.
    // The algorithm here is very basic and works like a lottery. By default every SubSubject has
    // 100 "chances" to be drawn. "Rarity" reduces those chances. A rarity of 0 means 100 chances.
    // A rarity of 50 means 50 chances (basically 50% as likely). A rarity of 90 means 10 chances
    // (basically 10% as likely).
    // This lottery system works because similarly-rare SubSubjects will have equal chance.
    const rarityRanges = [];
    let rarityTotal = 0;
    subSubjectQuestions.forEach((subSubjectObject) => {
      // If using rarity, determine the chances. (Minimum is 1/100, max is 100/100)
      const chances = useRarity ?
        Math.min(
          CHANCES_COUNT,
          Math.max(1, CHANCES_COUNT - subSubjectObject.rarity),
        ) :
        CHANCES_COUNT;
      // Define the range. Ex: if you had 0 rarity, 50 rarity, and 99 rarity SubSubjects the range
      // would be: [[1, 100], [101, 150], [151, 151]]
      rarityRanges.push([rarityTotal + 1, rarityTotal + chances]);
      rarityTotal += chances;
    });
  }
}


module.exports = {
  challengeGenerator,
};
