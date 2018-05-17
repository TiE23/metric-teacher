const {
  QuestionSyntaxError,
  AnswerSyntaxError,
  QuestionAnswerError,
} = require("../errors");
const {
  parseQAStrings,
} = require("../qaSyntax");
const {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  ANSWER_TYPE_MULTIPLE_CHOICE,
  ANSWER_TYPE_CONVERSION,
  UNITS,
} = require("../constants");

describe("qaSyntax", () => {
  describe("Happy Path", () => {
    it("Should parse a multiple choice question/answer", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_WRITTEN,
        "How long is 500 centimeters?",
        "[5.00m|200cm|3000mm]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_WRITTEN);
      expect(questionPayload.data.text).toBe("How long is 500 centimeters?");

      expect(answerPayload.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
      expect(answerPayload.data.choicesOffered).toBe(3);
      expect(answerPayload.data.choices.length).toBe(3);
      expect(answerPayload.data.choices[0].value).toBe(5);
      expect(answerPayload.data.choices[0].unit).toBe("m");
      expect(answerPayload.data.choices[1].value).toBe(200);
      expect(answerPayload.data.choices[1].unit).toBe("cm");
      expect(answerPayload.data.choices[2].value).toBe(3000);
      expect(answerPayload.data.choices[2].unit).toBe("mm");
      expect(answerPayload.data.syntax).toBe("[5.00m|200cm|3000mm]");
    });

    it("Should parse a written question with extra whitespace", () => {
      const { questionPayload } = parseQAStrings(
        QUESTION_TYPE_WRITTEN,
        "    How long is 500 centimeters?    ",
        "[5.00m|200cm|3000mm]",
      );
      expect(questionPayload.data.text).toBe("How long is 500 centimeters?");
    });

    it("Should parse a multiple choice question/answer with a custom amount of choices", () => {
      const { answerPayload } = parseQAStrings(
        QUESTION_TYPE_WRITTEN,
        "How long is 500 centimeters?",
        "[5.00m|200cm|3000mm]2",
      );
      expect(answerPayload.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
      expect(answerPayload.data.choicesOffered).toBe(2);
      expect(answerPayload.data.choices.length).toBe(3);
    });

    it("Should parse a conversion question", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5-10m]",
        "[ft]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_CONVERSION);
      expect(questionPayload.data.text).toBe("");
      expect(questionPayload.data.rangeBottom).toBe(5);
      expect(questionPayload.data.rangeTop).toBe(10);
      expect(questionPayload.data.unit).toBe("m");
      expect(questionPayload.data.step).toBe(1);

      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.accuracy).toBe(1);
    });

    it("Should parse a conversion question with extra whitespace", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "    [5-10m]    ",
        "[ft]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_CONVERSION);
      expect(questionPayload.data.text).toBe("");
      expect(questionPayload.data.rangeBottom).toBe(5);
      expect(questionPayload.data.rangeTop).toBe(10);
      expect(questionPayload.data.unit).toBe("m");
      expect(questionPayload.data.step).toBe(1);

      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.accuracy).toBe(1);
    });

    it("Should parse a conversion question with junk after it", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5-10m]    !@#$%foo",
        "[ft]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_CONVERSION);
      expect(questionPayload.data.text).toBe("");
      expect(questionPayload.data.rangeBottom).toBe(5);
      expect(questionPayload.data.rangeTop).toBe(10);
      expect(questionPayload.data.unit).toBe("m");
      expect(questionPayload.data.step).toBe(1);
      expect(questionPayload.data.syntax).toBe("[5-10m]");

      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.accuracy).toBe(1);
    });

    it("Should parse a survey question", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_SURVEY,
        "[5-10m]",
        "[ft]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_SURVEY);
      expect(questionPayload.data.text).toBe("");
      expect(questionPayload.data.rangeBottom).toBe(5);
      expect(questionPayload.data.rangeTop).toBe(10);
      expect(questionPayload.data.unit).toBe("m");
      expect(questionPayload.data.step).toBe(1);

      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.accuracy).toBe(1);
    });

    it("Should parse a conversion question with custom text", () => {
      const { questionPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "This is a range typical of an adult man. [1.70-1.85m]",
        "[in]",
      );
      expect(questionPayload.data.text).toBe("This is a range typical of an adult man.");
    });

    it("Should parse a conversion question with steps defined", () => {
      const { questionPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5-10m(2.5)s]",
        "[ft]",
      );
      expect(questionPayload.data.step).toBe(2.5);
    });

    it("Should parse a conversion answer with accuracy defined", () => {
      const { answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5-10m]",
        "[ft(2.5)a]",
      );
      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.accuracy).toBe(2.5);
    });

    it("Should parse an answer with junk before and after it", () => {
      const { answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5-10m]",
        "!@#$%foo    [ft]    !@#$%^foo",
      );
      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.syntax).toBe("[ft]");
    });
  });


  describe("Error Checking", () => {
    describe("Question+Answer", () => {
      it("Should reject a conversion question+answer with incompatible units", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5-10m]",
            "[mph]",
          );
        }).toThrowError(QuestionAnswerError);
      });

      it("Should reject a multiple-choice question+answer with incompatible units", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5-10m]",
            "[5mi|10mph]",
          );
        }).toThrowError(QuestionAnswerError);
      });

      it("Should reject a multiple-choice question+answer that doesn't convert families", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5-10m]",
            "[km]",
          );
        }).toThrowError(QuestionAnswerError);
      });
    });


    describe("Questions", () => {
      it("Should reject a question with nothing", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "",
            "[5m|6m]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with an unrecognized unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-2foo]",
            "[5m|6m]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with bad number range (no unit)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5-10]",
            "[5m|6m]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with bad number range (letter)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[x-2m]",
            "[5m|6m]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with bad number range (nothing)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[-2m]",
            "[5m|6m]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with an invalid range", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1m]",
            "[5m|6m]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with a backwards range", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[10-1m]",
            "[5m|6m]",
          );
        }).toThrowError(QuestionSyntaxError);
      });
    });


    describe("Answers", () => {
      it("Should reject an answer with broken syntax", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Test",
            "5m|6m",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject an answer with nothing", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Test",
            "",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject an answer with empty brackets", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Test",
            "[]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject an answer with invalid multiple choice options", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Test",
            "[5m|5]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject an answer with too few multiple choice options defined", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Test",
            "[5m]", // This is interpreted as a conversion answer in reality and fails parse
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject an answer with too few multiple choice options offered", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Test",
            "[5m|4m|3m|2m]1",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject an answer with too many choices offered", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Test",
            "[5m|2m]3",
          );
        }).toThrowError(AnswerSyntaxError);
      });
    });
  });
});
