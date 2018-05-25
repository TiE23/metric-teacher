/* eslint-disable no-undef */
const {
  FLAGS_NONE,
  QUESTION_STATUS_ACTIVE,
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_DIFFICULTY_MEDIUM,
  ANSWER_TYPE_MULTIPLE_CHOICE,
  ANSWER_TYPE_CONVERSION,
  ANSWER_TYPE_SURVEY,
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
          media: null,
          parent: "someSubSubject",
        };
      });

      it("Should parse a Written question", () => {
        const qaFormat = qaGenerate(baseWrittenQuestion);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_WRITTEN);
        expect(qaFormat.question.text).toBe("What temperature Celsius does water freeze at?");
        expect(qaFormat.question.detail).toBe("");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
        expect(qaFormat.answer.data.multipleChoiceData).toBeDefined();
        expect(qaFormat.answer.data.multipleChoiceData.choicesOffered).toBe(3);
        expect(qaFormat.answer.data.multipleChoiceData.choices).toBeDefined();
        expect(qaFormat.answer.data.multipleChoiceData.choices).toHaveLength(3);
      });

      it("Should parse a Written question with a custom choicesOffered value in the answer", () => {
        // Add a 2 to the end of the answer to change the choices offered.
        baseWrittenQuestion.answer = "[0c|32c|100c]2";

        const qaFormat = qaGenerate(baseWrittenQuestion);

        expect(qaFormat.answer.data.multipleChoiceData.choicesOffered).toBe(2);
        expect(qaFormat.answer.data.multipleChoiceData.choices).toHaveLength(3);
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
          media: null,
          parent: "someSubSubject",
        };
      });

      it("Should parse a Conversion question", () => {
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.fromUnitWord).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord.singular).toBe("Celsius");
        expect(qaFormat.question.data.fromUnitWord.plural).toBe("Celsius");
        expect(qaFormat.question.data.conversionData).toBeDefined();
        expect(qaFormat.question.data.conversionData.step).toBe(1);
        expect(qaFormat.question.data.conversionData.exact).toBeDefined();
        expect(qaFormat.question.data.conversionData.exact.value).toBe(100);
        expect(qaFormat.question.data.conversionData.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.toUnitWord).toBeDefined();
        expect(qaFormat.answer.data.toUnitWord.singular).toBe("Fahrenheit");
        expect(qaFormat.answer.data.toUnitWord.plural).toBe("Fahrenheit");
        expect(qaFormat.answer.data.conversionData).toBeDefined();
        expect(qaFormat.answer.data.conversionData.exact).toBe(212);
        expect(qaFormat.answer.data.conversionData.rounded).toBe(212);
        expect(qaFormat.answer.data.conversionData.range).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.bottom.unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.range.top.unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.range.bottom.value).toBe(211);
        expect(qaFormat.answer.data.conversionData.range.top.value).toBe(213);
        expect(qaFormat.answer.data.conversionData.accuracy).toBe(1);
        expect(qaFormat.answer.data.conversionData.choices).toBeDefined();
        expect(qaFormat.answer.data.conversionData.choices).toHaveLength(9);
        expect(qaFormat.answer.data.conversionData.choices[0].value).toBe(212);
        expect(qaFormat.answer.data.conversionData.choices[0].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[1].value).toBe(211);
        expect(qaFormat.answer.data.conversionData.choices[1].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[2].value).toBe(213);
        expect(qaFormat.answer.data.conversionData.choices[2].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[3].value).toBe(210);
        expect(qaFormat.answer.data.conversionData.choices[3].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[4].value).toBe(214);
        expect(qaFormat.answer.data.conversionData.choices[4].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[5].value).toBe(209);
        expect(qaFormat.answer.data.conversionData.choices[5].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[6].value).toBe(215);
        expect(qaFormat.answer.data.conversionData.choices[6].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[7].value).toBe(208);
        expect(qaFormat.answer.data.conversionData.choices[7].unit).toBe("f");
        expect(qaFormat.answer.data.conversionData.choices[8].value).toBe(216);
        expect(qaFormat.answer.data.conversionData.choices[8].unit).toBe("f");
      });

      it("Should parse a Conversion question and prevent negative range and choices", () => {
        baseConversionQuestion.question = "[0.25,0.25kg]";
        baseConversionQuestion.answer = "[lb]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Answer Data
        expect(qaFormat.answer.data.conversionData.exact).toBe(0.5511556555);
        expect(qaFormat.answer.data.conversionData.rounded).toBe(0.551);
        expect(qaFormat.answer.data.conversionData.range).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.bottom.unit).toBe("lb");
        expect(qaFormat.answer.data.conversionData.range.top.unit).toBe("lb");
        expect(qaFormat.answer.data.conversionData.range.bottom.value).toBe(0);   // Not -0.551 lb
        expect(qaFormat.answer.data.conversionData.range.top.value).toBe(1.551);
        expect(qaFormat.answer.data.conversionData.choices[0].value).toBe(0.551);
        expect(qaFormat.answer.data.conversionData.choices[1].value).toBe(1.051); // Not -0.551 lb
        expect(qaFormat.answer.data.conversionData.choices[2].value).toBe(1.551);
        expect(qaFormat.answer.data.conversionData.choices[3].value).toBe(2.051); // Not -1.551 lb
        expect(qaFormat.answer.data.conversionData.choices[4].value).toBe(2.551);
        expect(qaFormat.answer.data.conversionData.choices[5].value).toBe(3.051); // Not -2.551 lb
        expect(qaFormat.answer.data.conversionData.choices[6].value).toBe(3.551);
        expect(qaFormat.answer.data.conversionData.choices[7].value).toBe(4.051); // Not -3.551 lb
        expect(qaFormat.answer.data.conversionData.choices[8].value).toBe(4.551);
      });

      it("Should parse a Conversion question with a messy conversion", () => {
        baseConversionQuestion.question = "[5.25,5.25c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.conversionData).toBeDefined();
        expect(qaFormat.question.data.conversionData.step).toBe(1);
        expect(qaFormat.question.data.conversionData.exact).toBeDefined();
        expect(qaFormat.question.data.conversionData.exact.value).toBe(5.25);
        expect(qaFormat.question.data.conversionData.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.conversionData).toBeDefined();
        expect(qaFormat.answer.data.conversionData.exact).toBe(41.45);
        expect(qaFormat.answer.data.conversionData.rounded).toBe(41.5);
        expect(qaFormat.answer.data.conversionData.range.bottom.value).toBe(40.5);
        expect(qaFormat.answer.data.conversionData.range.top.value).toBe(42.5);
        expect(qaFormat.answer.data.conversionData.choices[0].value).toBe(41.5);
        expect(qaFormat.answer.data.conversionData.choices[1].value).toBe(40.5);
        expect(qaFormat.answer.data.conversionData.choices[2].value).toBe(42.5);
      });

      it("Should parse a Conversion question with a negative temperature degrees", () => {
        baseConversionQuestion.question = "[-40,-40c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.conversionData).toBeDefined();
        expect(qaFormat.question.data.conversionData.step).toBe(1);
        expect(qaFormat.question.data.conversionData.exact).toBeDefined();
        expect(qaFormat.question.data.conversionData.exact.value).toBe(-40);
        expect(qaFormat.question.data.conversionData.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.conversionData).toBeDefined();
        expect(qaFormat.answer.data.conversionData.exact).toBe(-40);
        expect(qaFormat.answer.data.conversionData.rounded).toBe(-40);
        expect(qaFormat.answer.data.conversionData.range.bottom.value).toBe(-41);
        expect(qaFormat.answer.data.conversionData.range.top.value).toBe(-39);
        expect(qaFormat.answer.data.conversionData.choices[0].value).toBe(-40);
        expect(qaFormat.answer.data.conversionData.choices[1].value).toBe(-41); // Allows negative
        expect(qaFormat.answer.data.conversionData.choices[2].value).toBe(-39);
      });

      it("Should parse a Conversion question with -17.78 C to 0 F temperature edge case", () => {
        baseConversionQuestion.question = "[-17.78,-17.78c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_CONVERSION);
        expect(qaFormat.question.data).toBeTruthy();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.data.conversionData).toBeDefined();
        expect(qaFormat.question.data.conversionData.step).toBe(1);
        expect(qaFormat.question.data.conversionData.exact).toBeDefined();
        expect(qaFormat.question.data.conversionData.exact.value).toBe(-17.78);
        expect(qaFormat.question.data.conversionData.exact.unit).toBe("c");

        // Answer Data
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_CONVERSION);
        expect(qaFormat.answer.data.conversionData).toBeDefined();
        expect(qaFormat.answer.data.conversionData.exact).toBe(-0.004);
        expect(qaFormat.answer.data.conversionData.rounded).toBe(0);
        expect(qaFormat.answer.data.conversionData.range.bottom.value).toBe(-1);
        expect(qaFormat.answer.data.conversionData.range.top.value).toBe(1);
        expect(qaFormat.answer.data.conversionData.choices[0].value).toBe(0);
        expect(qaFormat.answer.data.conversionData.choices[1].value).toBe(-1);  // Allows negative
        expect(qaFormat.answer.data.conversionData.choices[2].value).toBe(1);
      });

      it("Should parse a Conversion question with simple range", () => {
        baseConversionQuestion.question = "[5,10c]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversionData.step).toBe(1);
        expect(qaFormat.question.data.conversionData.exact.value).toBeGreaterThanOrEqual(5);
        expect(qaFormat.question.data.conversionData.exact.value).toBeLessThanOrEqual(10);
      });

      it("Should parse a Conversion question with range smaller than step", () => {
        baseConversionQuestion.question = "[5.1,6m]";
        baseConversionQuestion.answer = "[ft]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversionData.step).toBe(1);
        expect(qaFormat.question.data.conversionData.exact.value).toBeGreaterThanOrEqual(5.1);
        expect(qaFormat.question.data.conversionData.exact.value).toBeLessThanOrEqual(6);
      });

      it("Should parse a Conversion question with decimal range with decimal step and accuracy", () => {
        baseConversionQuestion.question = "[5.1,6m(0.1)s]";
        baseConversionQuestion.answer = "[ft(0.1)a]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversionData.step).toBe(0.1);
        expect(qaFormat.question.data.conversionData.exact.value).toBeGreaterThanOrEqual(5.1);
        expect(qaFormat.question.data.conversionData.exact.value).toBeLessThanOrEqual(6);
      });

      it("Should parse a Conversion question with range with >1 step and accuracy", () => {
        baseConversionQuestion.question = "[1,5m(2)s]";
        baseConversionQuestion.answer = "[ft(3)a]";
        const qaFormat = qaGenerate(baseConversionQuestion);

        // Question Data
        expect(qaFormat.question.data.conversionData.step).toBe(2);
        expect(qaFormat.question.data.conversionData.exact.value).toBeGreaterThanOrEqual(1);
        expect(qaFormat.question.data.conversionData.exact.value).toBeLessThanOrEqual(6);

        // Answer Data
        expect(qaFormat.answer.data.conversionData.accuracy).toBe(3);
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
          media: null,
          parent: "someSubSubject",
        };

        baseSurveyResponse = {
          id: "survey01",
          score: 0,
          answer: "[70in]",
          parent: "someCourse",
          question: "someQuestion",
        };
      });

      it("Should parse a survey question with no survey", () => {
        const qaFormat = qaGenerate(baseSurveyQuestion);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");

        // Question Data
        expect(qaFormat.question).toBeDefined();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.text).toBe("How tall are you?");
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_SURVEY);
        expect(qaFormat.question.data).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord.singular).toBe("inch");
        expect(qaFormat.question.data.fromUnitWord.plural).toBe("inches");
        expect(qaFormat.question.data.surveyData).toBeDefined();
        expect(qaFormat.question.data.surveyData.response).toBeNull();
        expect(qaFormat.question.data.surveyData.step).toBe(1);
        expect(qaFormat.question.data.surveyData.surveyRange).toBeDefined();
        expect(qaFormat.question.data.surveyData.surveyRange.bottom).toBeDefined();
        expect(qaFormat.question.data.surveyData.surveyRange.top).toBeDefined();
        expect(qaFormat.question.data.surveyData.surveyRange.bottom.value).toBe(40);
        expect(qaFormat.question.data.surveyData.surveyRange.bottom.unit).toBe("in");
        expect(qaFormat.question.data.surveyData.surveyRange.top.value).toBe(96);
        expect(qaFormat.question.data.surveyData.surveyRange.top.unit).toBe("in");

        // Answer Data
        expect(qaFormat.answer).toBeDefined();
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_SURVEY);
        expect(qaFormat.answer.data).toBeDefined();
        expect(qaFormat.answer.data.surveyData).toBeNull();
      });

      it("Should parse a survey question with a survey", () => {
        const qaFormat = qaGenerate(baseSurveyQuestion, baseSurveyResponse);

        // Basic Data
        expect(qaFormat).toBeDefined();
        expect(qaFormat.difficulty).toBe(QUESTION_DIFFICULTY_MEDIUM);
        expect(qaFormat.questionId).toBe("question01");
        expect(qaFormat.subSubjectId).toBe("someSubSubject");

        // Question Data
        expect(qaFormat.question).toBeDefined();
        expect(qaFormat.question.detail).toBe("");
        expect(qaFormat.question.text).toBe("How tall are you?");
        expect(qaFormat.question.type).toBe(QUESTION_TYPE_SURVEY);
        expect(qaFormat.question.data).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord).toBeDefined();
        expect(qaFormat.question.data.fromUnitWord.singular).toBe("inch");
        expect(qaFormat.question.data.fromUnitWord.plural).toBe("inches");
        expect(qaFormat.question.data.surveyData).toBeDefined();
        expect(qaFormat.question.data.surveyData.response).toBeDefined();
        expect(qaFormat.question.data.surveyData.response.id).toBe("survey01");
        expect(qaFormat.question.data.surveyData.response.score).toBe(0);
        expect(qaFormat.question.data.surveyData.response.unit).toBe("in");
        expect(qaFormat.question.data.surveyData.response.value).toBe(70);
        expect(qaFormat.question.data.surveyData.step).toBe(1);
        expect(qaFormat.question.data.surveyData.surveyRange).toBeDefined();
        expect(qaFormat.question.data.surveyData.surveyRange.bottom).toBeDefined();
        expect(qaFormat.question.data.surveyData.surveyRange.top).toBeDefined();
        expect(qaFormat.question.data.surveyData.surveyRange.bottom.value).toBe(40);
        expect(qaFormat.question.data.surveyData.surveyRange.bottom.unit).toBe("in");
        expect(qaFormat.question.data.surveyData.surveyRange.top.value).toBe(96);
        expect(qaFormat.question.data.surveyData.surveyRange.top.unit).toBe("in");

        // Answer Data
        expect(qaFormat.answer).toBeDefined();
        expect(qaFormat.answer.type).toBe(ANSWER_TYPE_SURVEY);
        expect(qaFormat.answer.data).toBeDefined();
        expect(qaFormat.answer.data.toUnitWord).toBeDefined();
        expect(qaFormat.answer.data.toUnitWord.singular).toBe("centimeter");
        expect(qaFormat.answer.data.toUnitWord.plural).toBe("centimeters");
        expect(qaFormat.answer.data.conversionData).toBeDefined();
        expect(qaFormat.answer.data.conversionData.accuracy).toBe(1);
        expect(qaFormat.answer.data.conversionData.choices).toBeDefined();
        expect(qaFormat.answer.data.conversionData.choices).toHaveLength(9);
        expect(qaFormat.answer.data.conversionData.choices[0].value).toBe(177.8);
        expect(qaFormat.answer.data.conversionData.choices[0].unit).toBe("cm");
        expect(qaFormat.answer.data.conversionData.exact).toBe(177.8);
        expect(qaFormat.answer.data.conversionData.rounded).toBe(177.8);
        expect(qaFormat.answer.data.conversionData.range).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.bottom).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.top).toBeDefined();
        expect(qaFormat.answer.data.conversionData.range.bottom.value).toBe(176.8);
        expect(qaFormat.answer.data.conversionData.range.bottom.unit).toBe("cm");
        expect(qaFormat.answer.data.conversionData.range.top.value).toBe(178.8);
        expect(qaFormat.answer.data.conversionData.range.top.unit).toBe("cm");
        expect(qaFormat.answer.data.surveyData).toBeDefined();
        expect(qaFormat.answer.data.surveyData.choices).toBeDefined();
        expect(qaFormat.answer.data.surveyData.choices).toHaveLength(9);
      });
    });
  });
});
