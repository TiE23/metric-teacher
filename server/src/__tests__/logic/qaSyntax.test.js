/* eslint-disable no-undef */
const {
  QuestionSyntaxError,
  AnswerSyntaxError,
  QuestionAnswerError,
} = require("../../errors");
const {
  parseQAStrings,
} = require("../../logic/qaSyntax");
const {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  ANSWER_TYPE_MULTIPLE_CHOICE,
  ANSWER_TYPE_CONVERSION,
} = require("../../constants");

debugger; // eslint-disable-line no-debugger

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
      it("Should reject a question+answer with nothing", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "",
            "",
          );
        }).toThrowError(QuestionSyntaxError); // Question gets parsed first.
      });

      it("Should reject a written question with a conversion answer", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[m(2)a]",
          );
        }).toThrowError(QuestionAnswerError);
      });

      it("Should reject a conversion question with a multiple-choice answer", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-5m(1)s]",
            "[3.3ft|6.6ft|9.8ft|13.1ft|16.4ft]",
          );
        }).toThrowError(QuestionAnswerError);
      });

      it("Should reject a conversion question+answer with an incompatible unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5-10m]",
            "[mph]",
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

      it("Should reject a written question with conversion syntax", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "[5-10m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with an unrecognized unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-2foo]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with bad number range (no unit)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5-10]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with bad number range (letter)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[x-2m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with bad number range (nothing)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[-2m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with an invalid range", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a question with a backwards range", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[10-1m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      /*  // Won't Fix
      it("Should reject a question with bad step", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-10m(x)s]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });
      */
    });


    describe("Answers", () => {
      it("Should reject a multiple-choice answer with broken syntax", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "5m|6m",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with nothing", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a conversion answer with nothing", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-5m]",
            "",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with empty brackets", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a conversion answer with empty brackets", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-5m]",
            "[]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with invalid options", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|5]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with invalid unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|5foo]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a conversion answer with invalid unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-5m]",
            "[foo]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      /*  // Won't Fix
      it("Should reject a conversion answer with bad accuracy", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1-5m]",
            "[ft(x)a]",
          );
        }).toThrowError(AnswerSyntaxError);
      });
      */

      it("Should reject a multiple-choice answer with too few options defined", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with too few choices offered", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|4m|3m|2m]1",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with too many choices offered", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|2m]3",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with mixed family", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[10mi|16km]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a multiple-choice answer with mixed subjects", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[10gal|10mi]",
          );
        }).toThrowError(AnswerSyntaxError);
      });
    });
  });
});
