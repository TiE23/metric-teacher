const {
  checkAuth,
} = require("../../utils");

const {
  surveyAnswerFormatter,
} = require("../../logic/utils");

const {
  AuthError,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
  SurveyAnswerIncomplete,
} = require("../../errors");

const {
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  COURSE_STATUS_INACTIVE,
  MASTERY_DEFAULT_SCORE,
  MASTERY_MIN_SCORE,
  MASTERY_MAX_SCORE,
  MASTERY_STATUS_ACTIVE,
  SURVEY_DEFAULT_SCORE,
  SURVEY_MIN_SCORE,
  SURVEY_MAX_SCORE,
  SURVEY_STATUS_NORMAL,
  SURVEY_STATUS_SKIPPED,
} = require("../../constants");

const course = {
  /**
   * Assigns subSubjects to an existing course. Only the owning student (or moderators or better)
   * can do this.
   * TODO let teachers (connected via active course + active classroom) also assign SubSubjects.
   * @param parent
   * @param args
   *        courseid: ID!
   *        subsubjects: [ID!]!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async assignCourseNewSubSubjects(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "assignCourseNewSubSubjects",
    });

    const targetCourseData = await ctx.db.query.course({ where: { id: args.courseid } }, `
      {
        id
        parent {
          student {
            id
          }
        }
        masteries {
          subSubject {
            id 
          }
        }
      }
    `);

    // Check the course exists.
    if (targetCourseData === null) {
      throw new CourseNotFound(args.courseid);
    }

    // A student can assign new SubSubjects and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "assignCourseNewSubSubjects");
    }

    // Only act on SubSubjects that are not already listed in Masteries
    const existingSubSubjectIds =
      targetCourseData.masteries.map(mastery => mastery.subSubject.id);
    const newSubSubjectIds =
      args.subsubjects.filter(newSubSubjectId => !existingSubSubjectIds.includes(newSubSubjectId));

    // If no SubSubjects are being added throw an error. Common situation might be where this
    // mutation is run twice by accident.
    if (newSubSubjectIds.length === 0) {
      throw new CourseNoSubSubjectsAdded(targetCourseData.id);
    }

    // Construct connect statements for each targeted SubSubject
    const newMasteries = newSubSubjectIds.map(subSubjectId => (
      {
        status: MASTERY_STATUS_ACTIVE,
        score: MASTERY_DEFAULT_SCORE,
        subSubject: {
          connect: {
            id: subSubjectId,
          },
        },
      }
    ));

    return ctx.db.mutation.updateCourse({
      where: { id: targetCourseData.id },
      data: {
        masteries: {
          create: newMasteries,
        },
      },
    }, info);
  },


  /**
   * Give a courseid and a list of combination SubSubject IDs and scores (positive or negative) and
   * those values will be added to each valid Mastery belonging to that Course.
   * It automatically gathers the Mastery IDs so you don't need to!
   * Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        courseid: ID!
   *        scoreinput: [
   *          MasteryScoreInput: {
   *            subsubjectid: ID!
   *            score: Int!
   *          }!
   *        ]!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async addMasteryScores(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "addMasteryScores",
    });

    // Note: Does not check if the Mastery is active or not, so it could affect inactive Masteries.
    const targetCourseData = await ctx.db.query.course(
      { where: { id: args.courseid } },
      `{
        id
        parent {
          student {
            id
          }
        }
        masteries(
          where: {
            subSubject: {
              id_in: [
                ${args.scoreinput.map(scoreInput => `"${scoreInput.subsubjectid}"`).join(",")}
              ]
            }
          }
        ){
          subSubject {
            id
          }
          id
          score
        }
      }`,
    );

    if (!targetCourseData) {
      throw new CourseNotFound(args.courseid);
    }

    // Check to make sure that the Course belongs to the student. Mods and better can access freely.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "addMasteryScores");
    }

    // Flatten the scoreinput into an object where keys are the subsubjectid and value is score.
    // If the student doesn't have a Mastery for the SubSubject it will be silently handled by
    // simply not updating any Mastery for that input.
    const scoreAdditions = {};
    args.scoreinput.forEach((scoreInputRow) => {
      scoreAdditions[scoreInputRow.subsubjectid] = scoreInputRow.score;
    });

    // Now make the Mastery update clause for the updateCourse mutation.
    const masteriesUpdateClause = [];
    targetCourseData.masteries.forEach((mastery) => {
      const newScore = Math.max(
        MASTERY_MIN_SCORE,
        Math.min(
          MASTERY_MAX_SCORE,
          mastery.score + scoreAdditions[mastery.subSubject.id],
        ),
      );
      masteriesUpdateClause.push({
        where: { id: mastery.id },
        data: { score: newScore },
      });
    });

    // Perform the mutation.
    return ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        masteries: {
          update: masteriesUpdateClause,
        },
      },
    }, info);
  },


  /**
   * Give a courseid and a list of combination Survey IDs and scores (positive or negative) and
   * those values will be added to each valid Survey belonging to that Course.
   * Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        courseid: ID!
   *        scoreinput: [
   *          SurveyScoreInput: {
   *            surveyid: ID!
   *            score: Int!
   *          }!
   *        ]!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async addSurveyScores(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "addSurveyScores",
    });

    // Note: Does not check if the Survey is skipped or not, so it could affect skipped Surveys.
    const targetCourseData = await ctx.db.query.course(
      { where: { id: args.courseid } },
      `{
        id
        parent {
          student {
            id
          }
        }
        surveys(
          where: {
            id_in: [
              ${args.scoreinput.map(scoreInput => `"${scoreInput.surveyid}"`).join(",")}
            ]
          }
        ){
          id
          score
        }
      }`,
    );

    if (!targetCourseData) {
      throw new CourseNotFound(args.courseid);
    }

    // Check to make sure that the Course belongs to the student. Mods and better can access freely.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "addSurveyScores");
    }

    // Flatten the scoreinput into an object where keys are the surveyid and value is score.
    // If the student doesn't have a Survey that was targeted it will be silently handled by
    // simply not updating any Survey for that input.
    const scoreAdditions = {};
    args.scoreinput.forEach((scoreInputRow) => {
      scoreAdditions[scoreInputRow.surveyid] = scoreInputRow.score;
    });

    // Now make the Survey update clause for the updateCourse mutation.
    const surveysUpdateClause = [];
    targetCourseData.surveys.forEach((survey) => {
      const newScore = Math.max(
        SURVEY_MIN_SCORE,
        Math.min(
          SURVEY_MAX_SCORE,
          survey.score + scoreAdditions[survey.id],
        ),
      );
      surveysUpdateClause.push({
        where: { id: survey.id },
        data: { score: newScore },
      });
    });

    // Perform the mutation.
    return ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        surveys: {
          update: surveysUpdateClause,
        },
      },
    }, info);
  },


  /**
   * Answer or re-answer a series of Survey questions. Only the owning student (or moderators or
   * better) can do this.
   * @param parent
   * @param args
   *        courseid: ID!
   *        answerinput: [
   *          SurveyAnswerInput: {
   *            questionid: ID!
   *            skip: Boolean
   *            value: Float
   *            unit: String
   *            detail: String
   *          }!
   *        ]!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async addSurveyAnswers(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "addSurveyAnswers",
    });

    // Note: Does not check if the Survey is skipped or not, so it could affect skipped Surveys.
    const targetCourseData = await ctx.db.query.course({ where: { id: args.courseid } }, `
    {
      id
      parent {
        student {
          id
        }
      }
      surveys(
        where: {
          question: {
            id_in: [
              ${args.answerinput.map(answerInput => `"${answerInput.questionid}"`).join(",")}
            ]
          }
        }
      ) {
        id
        status
        question {
          id
        }
      }
    }
    `);

    // Check the course exists.
    if (targetCourseData === null) {
      throw new CourseNotFound(args.courseid);
    }

    // A student can answer/re-answer Surveys and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "addSurveyAnswers");
    }

    // Check all answer inputs to confirm they are complete
    args.answerinput.forEach((answerInput) => {
      if (!((answerInput.value && answerInput.unit) || answerInput.skip === true)) {
        throw new SurveyAnswerIncomplete(args.courseid, answerInput.questionid);
      }
    });

    // Get existing Survey answer ids and connected question ids
    const existingSurveyQuestionAnswers =
      targetCourseData.surveys.map(survey => ({
        surveyid: survey.id,
        questionid: survey.question.id,
      }));

    // Construct update/create data payloads
    const surveysPayload = {};

    // Loop through the answers input.
    args.answerinput.forEach((answerInput) => {
      // Construct data payload
      const surveyData = {
        status: answerInput.skip === true ? SURVEY_STATUS_SKIPPED : SURVEY_STATUS_NORMAL,
        score: SURVEY_DEFAULT_SCORE,
        answer: answerInput.skip === true ?
          "" : surveyAnswerFormatter(answerInput.value, answerInput.unit),
        detail: answerInput.skip === true ? null : answerInput.detail,
      };

      // Find if there is an existing survey for this question...
      const existingSurveyQuestionAnswer = existingSurveyQuestionAnswers.find(existingObject =>
        existingObject.questionid === answerInput.questionid);

      // Was it found?
      if (existingSurveyQuestionAnswer) {
        // Update!
        if (surveysPayload.update === undefined) {
          surveysPayload.update = [];
        }
        surveysPayload.update.push({
          where: { id: existingSurveyQuestionAnswer.surveyid },
          data: surveyData,
        });
      } else {
        // Create!
        if (surveysPayload.create === undefined) {
          surveysPayload.create = [];
        }
        surveyData.question = {
          connect: {
            id: answerInput.questionid,
          },
        };
        surveysPayload.create.push(surveyData);
      }
    });

    // Fire off the mutation!
    return ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        surveys: surveysPayload,
      },
    }, info);
  },


  /**
   * Deactivates a course. Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        courseid: ID!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async deactivateCourse(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "deactivateCourse",
    });

    const targetCourseData = await ctx.db.query.course({ where: { id: args.courseid } }, `
      {
        id
        status
        parent {
          student {
            id
          }
        }
      }
    `);

    // Check the Course exists.
    if (targetCourseData === null) {
      throw new CourseNotFound(args.courseid);
    }
    // A student can change the status of a Course and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "deactivateCourse");
    }

    // Perform the update
    return ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        status: COURSE_STATUS_INACTIVE,
      },
    }, info);
  },
};

module.exports = { course };
