/* eslint-disable no-undef */
const {
  FLAGS_NONE,
  QUESTION_STATUS_ACTIVE,
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_DIFFICULTY_MEDIUM,
  QUESTION_FLAG_USER_DETAIL_REQUIRED,
  SURVEY_STATUS_NORMAL,
  SURVEY_STATUS_SKIPPED,
  ANSWER_TYPE_MULTIPLE_CHOICE,
  ANSWER_TYPE_CONVERSION,
  ANSWER_TYPE_SURVEY,
  WRITTEN_ANSWER_UNIT,
} = require("../../constants");
const {
  qaGenerate,
} = require("../../logic/qaGenerator");


describe("qaGenerator", () => {
  describe("Happy Path", () => {
    describe("Written Questions", () => {
      let baseWrittenQuestion = null;
      beforeEach(() => {
        baseWrittenQuestion = {
          id: "question01",
          type: QUESTION_TYPE_WRITTEN,
          status: QUESTION_STATUS_ACTIVE,
          flags: FLAGS_NONE,
          difficulty: QUESTION_DIFFICULTY_MEDIUM,
          question: "What temperature Celsius does water freeze at?",
          answer: "[0c|32c|100c]",
          media: "someMedia",
          parent: {
            id: "someSubSubject",
          },
        };
      });

      it("Should parse a Written question", () => {
        const qaFormat = qaGenerate(baseWrittenQuestion);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.flags).toBe(FLAGS_NONE);
        expect(qaFormat.media).toBe("someMedia");

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_WRITTEN);
        expect(qaFormat.question.text).toBe("What temperature Celsius does water freeze at?");
        expect(qaFormat.question.detail).toBe("");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
        expect(qaFormat.answer.data.multiple).toBeDefined();
        expect(qaFormat.answer.data.multiple.choicesOffered).toBe(3);
        expect(qaFormat.answer.data.multiple.choices).toBeDefined();
        expect(qaFormat.answer.data.multiple.choices).toHaveLength(3);
      });

      it("Should parse a Written question with answer details", () => {
        baseWrittenQuestion.question = "If Jim is 6'1\" and Harry is 195cm, who is taller?";
        baseWrittenQuestion.answer = "195cm is about 6'5\" and 6'1\" is about 185cm. [Harry is taller|Jim is taller|They are about the same height]";
        const qaFormat = qaGenerate(baseWrittenQuestion);

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
        expect(qaFormat.answer.detail).toBeDefined();
        expect(qaFormat.answer.detail).toBe("195cm is about 6'5\" and 6'1\" is about 185cm.");
        expect(qaFormat.answer.data.multiple).toBeDefined();
        expect(qaFormat.answer.data.multiple.choicesOffered).toBe(3);
        expect(qaFormat.answer.data.multiple.choices).toBeDefined();
        expect(qaFormat.answer.data.multiple.choices).toHaveLength(3);
        expect(qaFormat.answer.data.multiple.choices[0].written).toBe("Harry is taller");
        expect(qaFormat.answer.data.multiple.choices[0].unit).toBe(WRITTEN_ANSWER_UNIT);
        expect(qaFormat.answer.data.multiple.choices[1].written).toBe("Jim is taller");
        expect(qaFormat.answer.data.multiple.choices[1].unit).toBe(WRITTEN_ANSWER_UNIT);
        expect(qaFormat.answer.data.multiple.choices[2].written).toBe("They are about the same height");
        expect(qaFormat.answer.data.multiple.choices[2].unit).toBe(WRITTEN_ANSWER_UNIT);
      });

      it("Should parse a Written question with a custom choicesOffered value in the answer", () => {
        // Add a 2 to the end of the answer to change the choices offered.
        baseWrittenQuestion.answer = "[0c|32c|100c]2";

        const qaFormat = qaGenerate(baseWrittenQuestion);

        expect(qaFormat.answer.data.multiple.choicesOffered).toBe(2);
        expect(qaFormat.answer.data.multiple.choices).toHaveLength(3);
      });
    });


    describe("Conversion questions", () => {
      let baseConversionQuestion = null;
      beforeEach(() => {
        baseConversionQuestion = {
          id: "question01",
          type: QUESTION_TYPE_CONVERSION,
          status: QUESTION_STATUS_ACTIVE,
          flags: FLAGS_NONE,
          difficulty: QUESTION_DIFFICULTY_MEDIUM,
          question: "[100,100c]",
          answer: "[f]",
          media: "someMedia",
          parent: {
            id: "someSubSubject",
          },
        };
      });

      it("Should parse a Conversion question", () => {
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.flags).toBe(FLAGS_NONE);
        expect(qaFormat.media).toBe("someMedia");

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.fromUnitWord).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord.singular).toBe("Celsius");
        expect(qaFormat.question.data.fromUnitWord.plural).toBe("Celsius");
        expect(qaFormat.question.data.conversion).toBeDefined();
        expect(qaFormat.question.data.conversion.range).toBeDefined();
        expect(qaFormat.question.data.conversion.range.bottom).toBeDefined();
        expect(qaFormat.question.data.conversion.range.top).toBeDefined();
        expect(qaFormat.question.data.conversion.range.bottom.unit).toBe("c");
        expect(qaFormat.question.data.conversion.range.top.unit).toBe("c");
        expect(qaFormat.question.data.conversion.range.bottom.value).toBe(100);
        expect(qaFormat.question.data.conversion.range.top.value).toBe(100);
        expect(qaFormat.question.data.conversion.step).toBe(1);
        expect(qaFormat.question.data.conversion.exact).toBeDefined();
        expect(qaFormat.question.data.conversion.exact.value).toBe(100);
        expect(qaFormat.question.data.conversion.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.toUnitWord).toBeDefined();
        expect(qaFormat.answer.data.toUnitWord.singular).toBe("Fahrenheit");
        expect(qaFormat.answer.data.toUnitWord.plural).toBe("Fahrenheit");
        expect(qaFormat.answer.data.conversion).toBeDefined();
        expect(qaFormat.answer.data.conversion.exact).toBe(212);
        expect(qaFormat.answer.data.conversion.rounded).toBe(212);
        expect(qaFormat.answer.data.conversion.friendly).toBe(212);
        expect(qaFormat.answer.data.conversion.range).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom.unit).toBe("f");
        expect(qaFormat.answer.data.conversion.range.top.unit).toBe("f");
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(211);
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(213);
        expect(qaFormat.answer.data.conversion.accuracy).toBe(1);
        expect(qaFormat.answer.data.conversion.choices).toBeDefined();
        expect(qaFormat.answer.data.conversion.choices).toHaveLength(9);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(212);
        expect(qaFormat.answer.data.conversion.choices[0].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[1].value).toBe(211);
        expect(qaFormat.answer.data.conversion.choices[1].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[2].value).toBe(213);
        expect(qaFormat.answer.data.conversion.choices[2].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[3].value).toBe(210);
        expect(qaFormat.answer.data.conversion.choices[3].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[4].value).toBe(214);
        expect(qaFormat.answer.data.conversion.choices[4].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[5].value).toBe(209);
        expect(qaFormat.answer.data.conversion.choices[5].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[6].value).toBe(215);
        expect(qaFormat.answer.data.conversion.choices[6].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[7].value).toBe(208);
        expect(qaFormat.answer.data.conversion.choices[7].unit).toBe("f");
        expect(qaFormat.answer.data.conversion.choices[8].value).toBe(216);
        expect(qaFormat.answer.data.conversion.choices[8].unit).toBe("f");
      });

      it("Should parse a Conversion question and prevent negative range and choices", () => {
        baseConversionQuestion.question = "[0.25,0.25kg]";
        baseConversionQuestion.answer = "[lb]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Answer Data
        expect(qaFormat.answer.data.conversion.exact).toBe(0.5511556555);
        expect(qaFormat.answer.data.conversion.rounded).toBe(0.551);
        expect(qaFormat.answer.data.conversion.friendly).toBe(0.551);
        expect(qaFormat.answer.data.conversion.range).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom.unit).toBe("lb");
        expect(qaFormat.answer.data.conversion.range.top.unit).toBe("lb");
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(0);   // Not -0.551 lb
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(1.551);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(0.551);
        expect(qaFormat.answer.data.conversion.choices[1].value).toBe(1.051); // Not -0.551 lb
        expect(qaFormat.answer.data.conversion.choices[2].value).toBe(1.551);
        expect(qaFormat.answer.data.conversion.choices[3].value).toBe(2.051); // Not -1.551 lb
        expect(qaFormat.answer.data.conversion.choices[4].value).toBe(2.551);
        expect(qaFormat.answer.data.conversion.choices[5].value).toBe(3.051); // Not -2.551 lb
        expect(qaFormat.answer.data.conversion.choices[6].value).toBe(3.551);
        expect(qaFormat.answer.data.conversion.choices[7].value).toBe(4.051); // Not -3.551 lb
        expect(qaFormat.answer.data.conversion.choices[8].value).toBe(4.551);
      });

      it("Should parse a Conversion question and generate friendly results", () => {
        baseConversionQuestion.question = "[100,100m]";
        baseConversionQuestion.answer = "[in]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Answer Data
        expect(qaFormat.answer.data.conversion.exact).toBe(3937.0078740158);
        expect(qaFormat.answer.data.conversion.rounded).toBe(3937.008);
        expect(qaFormat.answer.data.conversion.friendly).toBe(3940);
        expect(qaFormat.answer.data.conversion.range).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom.unit).toBe("in");
        expect(qaFormat.answer.data.conversion.range.top.unit).toBe("in");
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(3939);
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(3941);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(3940);
        expect(qaFormat.answer.data.conversion.choices[1].value).toBe(3939);
        expect(qaFormat.answer.data.conversion.choices[2].value).toBe(3941);
        expect(qaFormat.answer.data.conversion.choices[3].value).toBe(3938);
        expect(qaFormat.answer.data.conversion.choices[4].value).toBe(3942);
        expect(qaFormat.answer.data.conversion.choices[5].value).toBe(3937);
        expect(qaFormat.answer.data.conversion.choices[6].value).toBe(3943);
        expect(qaFormat.answer.data.conversion.choices[7].value).toBe(3936);
        expect(qaFormat.answer.data.conversion.choices[8].value).toBe(3944);
      });

      it("Should parse a Conversion question and generate custom accuracy choices", () => {
        baseConversionQuestion.question = "[1,1m]";
        baseConversionQuestion.answer = "[in(5)a]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Answer Data
        expect(qaFormat.answer.data.conversion.exact).toBe(39.3700787402);
        expect(qaFormat.answer.data.conversion.rounded).toBe(39.37);
        expect(qaFormat.answer.data.conversion.friendly).toBe(39.37);
        expect(qaFormat.answer.data.conversion.range).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom.unit).toBe("in");
        expect(qaFormat.answer.data.conversion.range.top.unit).toBe("in");
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(34.37);
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(44.37);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(39.37);
        expect(qaFormat.answer.data.conversion.choices[1].value).toBe(34.37);
        expect(qaFormat.answer.data.conversion.choices[2].value).toBe(44.37);
        expect(qaFormat.answer.data.conversion.choices[3].value).toBe(29.37);
        expect(qaFormat.answer.data.conversion.choices[4].value).toBe(49.37);
        expect(qaFormat.answer.data.conversion.choices[5].value).toBe(24.37);
        expect(qaFormat.answer.data.conversion.choices[6].value).toBe(54.37);
        expect(qaFormat.answer.data.conversion.choices[7].value).toBe(19.37);
        expect(qaFormat.answer.data.conversion.choices[8].value).toBe(59.37);
      });

      it("Should parse a Conversion question with context added", () => {
        baseConversionQuestion.question = "This weight is typical of a 5 year old child. [35,45lb]";
        baseConversionQuestion.answer = "[kg]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        expect(qaFormat.question.detail).toBe("This weight is typical of a 5 year old child.");
      });

      it("Should parse a Conversion question with a messy conversion", () => {
        baseConversionQuestion.question = "[5.25,5.25c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.conversion).toBeDefined();
        expect(qaFormat.question.data.conversion.step).toBe(1);
        expect(qaFormat.question.data.conversion.exact).toBeDefined();
        expect(qaFormat.question.data.conversion.exact.value).toBe(5.25);
        expect(qaFormat.question.data.conversion.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.conversion).toBeDefined();
        expect(qaFormat.answer.data.conversion.exact).toBe(41.45);
        expect(qaFormat.answer.data.conversion.rounded).toBe(41.5);
        expect(qaFormat.answer.data.conversion.friendly).toBe(41.5);
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(40.5);
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(42.5);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(41.5);
        expect(qaFormat.answer.data.conversion.choices[1].value).toBe(40.5);
        expect(qaFormat.answer.data.conversion.choices[2].value).toBe(42.5);
      });

      it("Should parse a Conversion question with a negative temperature degrees", () => {
        baseConversionQuestion.question = "[-40,-40c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.conversion).toBeDefined();
        expect(qaFormat.question.data.conversion.step).toBe(1);
        expect(qaFormat.question.data.conversion.exact).toBeDefined();
        expect(qaFormat.question.data.conversion.exact.value).toBe(-40);
        expect(qaFormat.question.data.conversion.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.conversion).toBeDefined();
        expect(qaFormat.answer.data.conversion.exact).toBe(-40);
        expect(qaFormat.answer.data.conversion.rounded).toBe(-40);
        expect(qaFormat.answer.data.conversion.friendly).toBe(-40);
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(-41);
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(-39);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(-40);
        expect(qaFormat.answer.data.conversion.choices[1].value).toBe(-41); // Allows negative
        expect(qaFormat.answer.data.conversion.choices[2].value).toBe(-39);
      });

      it("Should parse a Conversion question with -17.78 C to 0 F temperature edge case", () => {
        baseConversionQuestion.question = "[-17.78,-17.78c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.conversion).toBeDefined();
        expect(qaFormat.question.data.conversion.step).toBe(1);
        expect(qaFormat.question.data.conversion.exact).toBeDefined();
        expect(qaFormat.question.data.conversion.exact.value).toBe(-17.78);
        expect(qaFormat.question.data.conversion.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.conversion).toBeDefined();
        expect(qaFormat.answer.data.conversion.exact).toBe(-0.004);
        expect(qaFormat.answer.data.conversion.rounded).toBe(0);
        expect(qaFormat.answer.data.conversion.friendly).toBe(0);
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(-1);
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(1);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(0);
        expect(qaFormat.answer.data.conversion.choices[1].value).toBe(-1);  // Allows negative
        expect(qaFormat.answer.data.conversion.choices[2].value).toBe(1);
      });

      it("Should parse a Conversion question with simple range", () => {
        baseConversionQuestion.question = "[5,10c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversion.step).toBe(1);
        expect(qaFormat.question.data.conversion.exact.value).toBeGreaterThanOrEqual(5);
        expect(qaFormat.question.data.conversion.exact.value).toBeLessThanOrEqual(10);
      });

      it("Should parse a Conversion question with range smaller than step", () => {
        baseConversionQuestion.question = "[5.1,6m]";
        baseConversionQuestion.answer = "[ft]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversion.step).toBe(1);
        expect(qaFormat.question.data.conversion.exact.value).toBeGreaterThanOrEqual(5.1);
        expect(qaFormat.question.data.conversion.exact.value).toBeLessThanOrEqual(6);
      });

      it("Should parse a Conversion question with decimal range with decimal step and accuracy", () => {
        baseConversionQuestion.question = "[5.1,6m(0.1)s]";
        baseConversionQuestion.answer = "[ft(0.1)a]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversion.step).toBe(0.1);
        expect(qaFormat.question.data.conversion.exact.value).toBeGreaterThanOrEqual(5.1);
        expect(qaFormat.question.data.conversion.exact.value).toBeLessThanOrEqual(6);
      });

      it("Should parse a Conversion question with range with >1 step and accuracy", () => {
        baseConversionQuestion.question = "[1,5m(2)s]";
        baseConversionQuestion.answer = "[ft(3)a]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversion.step).toBe(2);
        expect(qaFormat.question.data.conversion.exact.value).toBeGreaterThanOrEqual(1);
        expect(qaFormat.question.data.conversion.exact.value).toBeLessThanOrEqual(6);

        // Answer Data
        expect(qaFormat.answer.data.conversion.accuracy).toBe(3);
      });
    });


    describe("Survey questions", () => {
      let baseSurveyQuestion = null;
      let baseSurveyResponse = null;
      beforeEach(() => {
        baseSurveyQuestion = {
          id: "question01",
          type: QUESTION_TYPE_SURVEY,
          status: QUESTION_STATUS_ACTIVE,
          flags: FLAGS_NONE,
          difficulty: QUESTION_DIFFICULTY_MEDIUM,
          question: "How tall are you? [40,96in]",
          answer: "[cm]",
          media: "someMedia",
          parent: {
            id: "someSubSubject",
          },
        };

        baseSurveyResponse = {
          id: "survey01",
          score: 0,
          answer: "[70in]",
          detail: null,
          status: SURVEY_STATUS_NORMAL,
          parent: {
            id: "someCourse",
          },
          question: {
            id: "someQuestion",
          },
        };
      });

      it("Should parse a survey question with no survey", () => {
        const qaFormat = qaGenerate(baseSurveyQuestion);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.flags).toBe(FLAGS_NONE);
        expect(qaFormat.media).toBe("someMedia");

        // Question Data
        expect(qaFormat.question).toBeDefined();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.text).toBe("How tall are you?");
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_SURVEY);
        expect(qaFormat.question.data).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord.singular).toBe("inch");
        expect(qaFormat.question.data.fromUnitWord.plural).toBe("inches");
        expect(qaFormat.question.data.survey).toBeDefined();
        expect(qaFormat.question.data.survey.response).toBeNull();
        expect(qaFormat.question.data.survey.step).toBe(1);
        expect(qaFormat.question.data.survey.range).toBeDefined();
        expect(qaFormat.question.data.survey.range.bottom).toBeDefined();
        expect(qaFormat.question.data.survey.range.top).toBeDefined();
        expect(qaFormat.question.data.survey.range.bottom.value).toBe(40);
        expect(qaFormat.question.data.survey.range.bottom.unit).toBe("in");
        expect(qaFormat.question.data.survey.range.top.value).toBe(96);
        expect(qaFormat.question.data.survey.range.top.unit).toBe("in");

        // Answer Data
        expect(qaFormat.answer).toBeDefined();
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_SURVEY);
        expect(qaFormat.answer.data).toBeDefined();
        expect(qaFormat.answer.data.survey).toBeNull();
      });

      it("Should parse a survey question with a survey", () => {
        const qaFormat = qaGenerate(baseSurveyQuestion, baseSurveyResponse);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.flags).toBe(FLAGS_NONE);
        expect(qaFormat.media).toBe("someMedia");

        // Question Data
        expect(qaFormat.question).toBeDefined();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.text).toBe("How tall are you?");
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_SURVEY);
        expect(qaFormat.question.data).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord.singular).toBe("inch");
        expect(qaFormat.question.data.fromUnitWord.plural).toBe("inches");
        expect(qaFormat.question.data.survey).toBeDefined();
        expect(qaFormat.question.data.survey.response).toBeDefined();
        expect(qaFormat.question.data.survey.response.id).toBe("survey01");
        expect(qaFormat.question.data.survey.response.status).toBe(SURVEY_STATUS_NORMAL);
        expect(qaFormat.question.data.survey.response.score).toBe(0);
        expect(qaFormat.question.data.survey.response.answer.unit).toBe("in");
        expect(qaFormat.question.data.survey.response.answer.value).toBe(70);
        expect(qaFormat.question.data.survey.step).toBe(1);
        expect(qaFormat.question.data.survey.range).toBeDefined();
        expect(qaFormat.question.data.survey.range.bottom).toBeDefined();
        expect(qaFormat.question.data.survey.range.top).toBeDefined();
        expect(qaFormat.question.data.survey.range.bottom.value).toBe(40);
        expect(qaFormat.question.data.survey.range.bottom.unit).toBe("in");
        expect(qaFormat.question.data.survey.range.top.value).toBe(96);
        expect(qaFormat.question.data.survey.range.top.unit).toBe("in");

        // Answer Data
        expect(qaFormat.answer).toBeDefined();
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_SURVEY);
        expect(qaFormat.answer.data).toBeDefined();
        expect(qaFormat.answer.data.toUnitWord).toBeDefined();
        expect(qaFormat.answer.data.toUnitWord.singular).toBe("centimeter");
        expect(qaFormat.answer.data.toUnitWord.plural).toBe("centimeters");
        expect(qaFormat.answer.data.conversion).toBeDefined();
        expect(qaFormat.answer.data.conversion.accuracy).toBe(1);
        expect(qaFormat.answer.data.conversion.choices).toBeDefined();
        expect(qaFormat.answer.data.conversion.choices).toHaveLength(9);
        expect(qaFormat.answer.data.conversion.choices[0].value).toBe(177.8);
        expect(qaFormat.answer.data.conversion.choices[0].unit).toBe("cm");
        expect(qaFormat.answer.data.conversion.exact).toBe(177.8);
        expect(qaFormat.answer.data.conversion.rounded).toBe(177.8);
        expect(qaFormat.answer.data.conversion.friendly).toBe(177.8);
        expect(qaFormat.answer.data.conversion.range).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversion.range.bottom.value).toBe(176.8);
        expect(qaFormat.answer.data.conversion.range.bottom.unit).toBe("cm");
        expect(qaFormat.answer.data.conversion.range.top.value).toBe(178.8);
        expect(qaFormat.answer.data.conversion.range.top.unit).toBe("cm");
        expect(qaFormat.answer.data.survey).toBeDefined();
        expect(qaFormat.answer.data.survey.choices).toBeDefined();
        expect(qaFormat.answer.data.survey.choices).toHaveLength(9);
      });

      it("Should parse a survey question with a survey that was skipped", () => {
        baseSurveyResponse.answer = "";
        baseSurveyResponse.status = SURVEY_STATUS_SKIPPED;
        const qaFormat = qaGenerate(baseSurveyQuestion, baseSurveyResponse);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.flags).toBe(FLAGS_NONE);
        expect(qaFormat.media).toBe("someMedia");

        // Question Data
        expect(qaFormat.question).toBeDefined();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.text).toBe("How tall are you?");
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_SURVEY);
        expect(qaFormat.question.data).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord.singular).toBe("inch");
        expect(qaFormat.question.data.fromUnitWord.plural).toBe("inches");
        expect(qaFormat.question.data.survey).toBeDefined();
        expect(qaFormat.question.data.survey.response).toBeDefined();
        expect(qaFormat.question.data.survey.response.id).toBe("survey01");
        expect(qaFormat.question.data.survey.response.status).toBe(SURVEY_STATUS_SKIPPED);
        expect(qaFormat.question.data.survey.response.score).toBe(0);
        expect(qaFormat.question.data.survey.step).toBe(1);
        expect(qaFormat.question.data.survey.range).toBeDefined();
        expect(qaFormat.question.data.survey.range.bottom).toBeDefined();
        expect(qaFormat.question.data.survey.range.top).toBeDefined();
        expect(qaFormat.question.data.survey.range.bottom.value).toBe(40);
        expect(qaFormat.question.data.survey.range.bottom.unit).toBe("in");
        expect(qaFormat.question.data.survey.range.top.value).toBe(96);
        expect(qaFormat.question.data.survey.range.top.unit).toBe("in");

        // Answer Data
        expect(qaFormat.answer).toBeDefined();
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_SURVEY);
        expect(qaFormat.answer.data).toBeDefined();
        expect(qaFormat.answer.data.survey).toBeNull();
      });

      it("Should parse a survey question with a survey with detail", () => {
        baseSurveyQuestion.question = "How tall is the tallest person you personally know? Give your best guess if you don't know exactly. [70,96in]";
        baseSurveyResponse.detail = "My neighbor Anthony";
        baseSurveyResponse.answer = "[80in]";

        const qaFormat = qaGenerate(baseSurveyQuestion, baseSurveyResponse);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.flags).toBe(FLAGS_NONE);
        expect(qaFormat.media).toBe("someMedia");

        // Question Data
        expect(qaFormat.question).toBeDefined();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.text).toBe("How tall is the tallest person you personally know? Give your best guess if you don't know exactly.");
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_SURVEY);
        expect(qaFormat.question.data.survey.response.answer.unit).toBe("in");
        expect(qaFormat.question.data.survey.response.answer.value).toBe(80);
        expect(qaFormat.question.data.survey.response.detail).toBe("My neighbor Anthony");
      });

      it("Should parse a survey question with a request for user detail input and without a survey", () => {
        baseSurveyQuestion.question = "How tall is the last friend you spoke to and what is their name? Give your best guess if you don't know exactly. [24,96in]";
        baseSurveyQuestion.flags = QUESTION_FLAG_USER_DETAIL_REQUIRED;

        const qaFormat = qaGenerate(baseSurveyQuestion);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.flags).toBe(QUESTION_FLAG_USER_DETAIL_REQUIRED);

        // Question Data
        expect(qaFormat.question).toBeDefined();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.text).toBe("How tall is the last friend you spoke to and what is their name? Give your best guess if you don't know exactly.");
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_SURVEY);
      });
    });
  });
});
