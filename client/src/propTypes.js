import PropTypes from "prop-types";

export const QA_UNIT_OBJECT_TYPE = PropTypes.shape({
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

export const QA_RANGE_OBJECT_TYPE = PropTypes.shape({
  bottom: QA_UNIT_OBJECT_TYPE.isRequired,
  top: QA_UNIT_OBJECT_TYPE.isRequired,
});

export const QA_DATA_QUESTION = PropTypes.shape({
  detail: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.number.isRequired,
  data: PropTypes.shape({                     // Only if conversion or survey question.
    fromUnitWord: PropTypes.shape({
      plural: PropTypes.string.isRequired,
      singular: PropTypes.string.isRequired,
    }).isRequired,
    conversion: PropTypes.shape({             // Only if conversion question.
      step: PropTypes.number.isRequired,
      range: QA_RANGE_OBJECT_TYPE.isRequired,
      exact: QA_UNIT_OBJECT_TYPE.isRequired,
    }),
    survey: PropTypes.shape({                 // Only if survey question.
      step: PropTypes.number.isRequired,
      range: QA_RANGE_OBJECT_TYPE.isRequired,
      response: PropTypes.shape({             // Only if survey is answered.
        id: PropTypes.string.isRequired,
        status: PropTypes.number,
        detail: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        answer: QA_UNIT_OBJECT_TYPE.isRequired,
      }),
    }),
  }),
});

export const QA_DATA_ANSWER = PropTypes.shape({
  detail: PropTypes.string,
  type: PropTypes.number.isRequired,
  data: PropTypes.shape({
    multiple: PropTypes.shape({               // Only if written question.
      choices: PropTypes.arrayOf(QA_UNIT_OBJECT_TYPE).isRequired,
      choicesOffered: PropTypes.number.isRequired,
    }),
    toUnitWord: PropTypes.shape({             // Only if conversion or survey question.
      plural: PropTypes.string.isRequired,
      singular: PropTypes.string.isRequired,
    }),
    conversion: PropTypes.shape({             // Only if conversion or survey question.
      accuracy: PropTypes.number.isRequired,
      range: QA_RANGE_OBJECT_TYPE.isRequired,
      exact: PropTypes.number.isRequired,
      rounded: PropTypes.number.isRequired,
      friendly: PropTypes.number.isRequired,
      choices: PropTypes.arrayOf(QA_UNIT_OBJECT_TYPE).isRequired,
    }),
    survey: PropTypes.shape({                 // Only if survey question.
      choices: PropTypes.arrayOf(QA_UNIT_OBJECT_TYPE).isRequired,
    }),
  }).isRequired,
});

export const QA_DATA_EVERYTHING = PropTypes.shape({
  questionId: PropTypes.string.isRequired,
  subSubjectId: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
  flags: PropTypes.number.isRequired,
  media: PropTypes.string,
  question: QA_DATA_QUESTION.isRequired,
  answer: QA_DATA_ANSWER.isRequired,
});
