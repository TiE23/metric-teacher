const random = require("lodash/random");

const {
  qaGenerate,
} = require("./qaGenerator");

const {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_STATUS_ACTIVE,
  CONVERSION_CHOICE_OPTIONS_MULTIPLIERS,
  UNITS,
} = require("../constants");

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

  buildQuestionList(subSubjectQuestions, preference, useRarity, useDifficulty) {
    //
  }
}


module.exports = {
  challengeGenerator,
};
