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
  ANSWER_TYPE_SURVEY,
  WRITTEN_ANSWER_UNIT,
} = require("../../constants");

describe("qaSyntax", () => {
  describe("Happy Path", () => {
    it("Should parse a multiple choice question/answer with unit answers", () => {
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

    it("Should parse a multiple choice question/answer with written answers", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_WRITTEN,
        "What is longer?",
        "[A meter|A yard]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_WRITTEN);
      expect(questionPayload.data.text).toBe("What is longer?");

      expect(answerPayload.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
      expect(answerPayload.data.choicesOffered).toBe(2);
      expect(answerPayload.data.choices.length).toBe(2);
      expect(answerPayload.data.choices[0].value).toBeNull();
      expect(answerPayload.data.choices[0].written).toBe("A meter");
      expect(answerPayload.data.choices[0].unit).toBe(WRITTEN_ANSWER_UNIT);
      expect(answerPayload.data.choices[1].value).toBeNull();
      expect(answerPayload.data.choices[1].written).toBe("A yard");
      expect(answerPayload.data.choices[1].unit).toBe(WRITTEN_ANSWER_UNIT);
      expect(answerPayload.data.syntax).toBe("[A meter|A yard]");
    });

    it("Should parse a multiple choice question/answer with mixed unit and written answers", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_WRITTEN,
        "Which is the heaviest?",
        "[1kg|A pound of feathers|1lb|16oz]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_WRITTEN);
      expect(questionPayload.data.text).toBe("Which is the heaviest?");

      expect(answerPayload.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
      expect(answerPayload.data.choicesOffered).toBe(4);
      expect(answerPayload.data.choices.length).toBe(4);
      expect(answerPayload.data.choices[0].value).toBe(1);
      expect(answerPayload.data.choices[0].unit).toBe("kg");
      expect(answerPayload.data.choices[1].value).toBeNull();
      expect(answerPayload.data.choices[1].written).toBe("A pound of feathers");
      expect(answerPayload.data.choices[1].unit).toBe(WRITTEN_ANSWER_UNIT);
      expect(answerPayload.data.choices[2].value).toBe(1);
      expect(answerPayload.data.choices[2].unit).toBe("lb");
      expect(answerPayload.data.choices[3].value).toBe(16);
      expect(answerPayload.data.choices[3].unit).toBe("oz");
      expect(answerPayload.data.syntax).toBe("[1kg|A pound of feathers|1lb|16oz]");
    });

    it("Should parse a multiple choice question/answer with repeated choices and deduplicate them", () => {
      const { answerPayload } = parseQAStrings(
        QUESTION_TYPE_WRITTEN,
        "Blah blah blah",
        "[1kg|1lb|1lb|1kg|16oz]3",
      );
      expect(answerPayload.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
      expect(answerPayload.data.choicesOffered).toBe(3);
      expect(answerPayload.data.choices.length).toBe(3);    // Remove the duplicates
      expect(answerPayload.data.choices[0].value).toBe(1);  // This stays the same
      expect(answerPayload.data.choices[0].unit).toBe("kg");
      expect(answerPayload.data.choices[1].value).toBe(1);
      expect(answerPayload.data.choices[1].unit).toBe("lb");
      expect(answerPayload.data.choices[2].value).toBe(16);
      expect(answerPayload.data.choices[2].unit).toBe("oz");
    });

    it("Should parse a multiple choice question/answer with answer details", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_WRITTEN,
        "If Jim is 6'1\" and Harry is 195cm, who is taller?",
        "195cm is about 6'5\" and 6'1\" is about 185cm. [Harry is taller|Jim is taller|They are about the same height]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_WRITTEN);
      expect(questionPayload.data.text).toBe("If Jim is 6'1\" and Harry is 195cm, who is taller?");

      expect(answerPayload.type).toBe(ANSWER_TYPE_MULTIPLE_CHOICE);
      expect(answerPayload.data.choicesOffered).toBe(3);
      expect(answerPayload.data.choices.length).toBe(3);
      expect(answerPayload.data.choices[0].value).toBeNull();
      expect(answerPayload.data.choices[0].written).toBe("Harry is taller");
      expect(answerPayload.data.choices[0].unit).toBe(WRITTEN_ANSWER_UNIT);
      expect(answerPayload.data.choices[1].value).toBeNull();
      expect(answerPayload.data.choices[1].written).toBe("Jim is taller");
      expect(answerPayload.data.choices[1].unit).toBe(WRITTEN_ANSWER_UNIT);
      expect(answerPayload.data.choices[2].value).toBeNull();
      expect(answerPayload.data.choices[2].written).toBe("They are about the same height");
      expect(answerPayload.data.choices[2].unit).toBe(WRITTEN_ANSWER_UNIT);
      expect(answerPayload.data.syntax).toBe("[Harry is taller|Jim is taller|They are about the same height]");
    });

    it("Should parse a Written question with extra whitespace", () => {
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

    it("Should parse a Conversion question", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5,10m]",
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

    it("Should parse a Conversion question with extra whitespace", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "    [5,10m]    ",
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

    it("Should parse a Conversion question with junk after it", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5,10m]    !@#$%foo",
        "[ft]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_CONVERSION);
      expect(questionPayload.data.text).toBe("");
      expect(questionPayload.data.rangeBottom).toBe(5);
      expect(questionPayload.data.rangeTop).toBe(10);
      expect(questionPayload.data.unit).toBe("m");
      expect(questionPayload.data.step).toBe(1);
      expect(questionPayload.data.syntax).toBe("[5,10m]");

      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.accuracy).toBe(1);
    });

    it("Should parse a Survey question", () => {
      const { questionPayload, answerPayload } = parseQAStrings(
        QUESTION_TYPE_SURVEY,
        "How tall are you? [40,96in]",
        "[cm]",
      );
      expect(questionPayload.type).toBe(QUESTION_TYPE_SURVEY);
      expect(questionPayload.data.text).toBe("How tall are you?");
      expect(questionPayload.data.rangeBottom).toBe(40);
      expect(questionPayload.data.rangeTop).toBe(96);
      expect(questionPayload.data.unit).toBe("in");
      expect(questionPayload.data.step).toBe(1);

      expect(answerPayload.type).toBe(ANSWER_TYPE_SURVEY);
      expect(answerPayload.data.unit).toBe("cm");
      expect(answerPayload.data.accuracy).toBe(1);
    });

    it("Should parse a Conversion question with custom text", () => {
      const { questionPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "This is a range typical of an adult man. [1.70,1.85m]",
        "[in]",
      );
      expect(questionPayload.data.text).toBe("This is a range typical of an adult man.");
    });

    it("Should parse a Conversion question with steps defined", () => {
      const { questionPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5,10m(2.5)s]",
        "[ft]",
      );
      expect(questionPayload.data.step).toBe(2.5);
    });

    it("Should parse a Conversion answer with accuracy defined", () => {
      const { answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5,10m]",
        "[ft(2.5)a]",
      );
      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.accuracy).toBe(2.5);
    });

    it("Should parse an answer with detail before it", () => {
      const { answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5,10m]",
        "Answer detail.    [ft]",
      );
      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.syntax).toBe("[ft]");
      expect(answerPayload.data.detail).toBe("Answer detail.");
    });

    it("Should parse an answer with detail before it and junk after it", () => {
      const { answerPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[5,10m]",
        "Answer detail.    [ft]    !@#$%^foo",
      );
      expect(answerPayload.type).toBe(ANSWER_TYPE_CONVERSION);
      expect(answerPayload.data.unit).toBe("ft");
      expect(answerPayload.data.syntax).toBe("[ft]");
      expect(answerPayload.data.detail).toBe("Answer detail.");
    });

    it("Should parse a Conversion question with all negative range values", () => {
      const { questionPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[-10,-5c]",
        "[f]",
      );
      expect(questionPayload.data.rangeBottom).toBe(-10);
      expect(questionPayload.data.rangeTop).toBe(-5);
      expect(questionPayload.data.unit).toBe("c");
    });

    it("Should parse a Conversion question with mixed negative and positive range values", () => {
      const { questionPayload } = parseQAStrings(
        QUESTION_TYPE_CONVERSION,
        "[-10,10c]",
        "[f]",
      );
      expect(questionPayload.data.rangeBottom).toBe(-10);
      expect(questionPayload.data.rangeTop).toBe(10);
      expect(questionPayload.data.unit).toBe("c");
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

      it("Should reject a Written question with a Conversion answer", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[m(2)a]",
          );
        }).toThrowError(QuestionAnswerError);
      });

      it("Should reject a Conversion question with a Multiple-choice answer", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,5m(1)s]",
            "[3.3ft|6.6ft|9.8ft|13.1ft|16.4ft]",
          );
        }).toThrowError(QuestionAnswerError);
      });

      it("Should reject a Conversion question+answer with an incompatible unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5,10m]",
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

      it("Should reject a Written question with Conversion syntax", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "[5,10m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with an unrecognized unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,2foo]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with bad number range (no unit)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[5,10]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with bad number range (letter)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[x,2m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with bad number range (nothing)", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[,2m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with an invalid range", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with a backwards range", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[10,1m]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with a backwards negative range", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[-1,-10c]",
            "[f]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Conversion question with a negative step", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[10,20c(-5)s]",
            "[f]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      it("Should reject a Survey question with no written context", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_SURVEY,
            "[40-96in]",
            "[cm]",
          );
        }).toThrowError(QuestionSyntaxError);
      });

      /*  // Won't Fix, it will default to 1
      it("Should reject a question with bad step", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,10m(x)s]",
            "[ft]",
          );
        }).toThrowError(QuestionSyntaxError);
      });
      */
    });


    describe("Answers", () => {
      it("Should reject a Multiple-choice answer with broken syntax", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "5m|6m",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with nothing", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Conversion answer with nothing", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,5m]",
            "",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with empty brackets", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Conversion answer with empty brackets", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,5m]",
            "[]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with blank options", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[| | ]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer mixed with invalid option", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer mixed with invalid options", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m||]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer mixed with blank option", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m||]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer mixed with blank options", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m| | ]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with invalid unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|5foo]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Conversion answer with invalid unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,5m]",
            "[foo]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Conversion answer with negative accuracy", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,5m]",
            "[ft(-1)a]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Survey answer with invalid unit", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_SURVEY,
            "How tall are you? [40,96in]",
            "[foo]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      /*  // Won't Fix, it will default to 1
      it("Should reject a Conversion answer with bad accuracy", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_CONVERSION,
            "[1,5m]",
            "[ft(x)a]",
          );
        }).toThrowError(AnswerSyntaxError);
      });
      */

      it("Should reject a Multiple-choice answer with too few options defined", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with too few choices offered", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|4m|3m|2m]1",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with too many choices offered", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[5m|2m]3",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with mixed subjects", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[10gal|10mi]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with too many repeated answers", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[10gal|10gal]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with too many repeated written answers", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[Foo!|Foo!]",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should reject a Multiple-choice answer with too many repeated answers", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[10gal|10l|10ml|10l]4",
          );
        }).toThrowError(AnswerSyntaxError);
      });

      it("Should NOT reject a Multiple-choice answer with acceptable number of repeated answers", () => {
        expect(() => {
          parseQAStrings(
            QUESTION_TYPE_WRITTEN,
            "Blah",
            "[10gal|10l|10ml|10l]3",
          );
        }).not.toThrowError(AnswerSyntaxError);
      });
    });
  });
});
