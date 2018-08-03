import PropTypes from "prop-types";

const QaUnitObjectType = PropTypes.shape({
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

export const QA_DATA_EVERYTHING = PropTypes.shape({
  questionId: PropTypes.string.isRequired,
  subSubjectId: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
  flags: PropTypes.number.isRequired,
  media: PropTypes.string,
  question: PropTypes.shape({
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
        range: PropTypes.shape({
          bottom: QaUnitObjectType.isRequired,
          top: QaUnitObjectType.isRequired,
        }).isRequired,
        exact: QaUnitObjectType.isRequired,
      }),
      survey: PropTypes.shape({                 // Only if survey question.
        step: PropTypes.number.isRequired,
        surveyRange: PropTypes.shape({
          bottom: QaUnitObjectType.isRequired,
          top: QaUnitObjectType.isRequired,
        }).isRequired,
        response: PropTypes.shape({             // Only if survey is answered.
          id: PropTypes.string.isRequired,
          status: PropTypes.number,
          detail: PropTypes.string.isRequired,
          score: PropTypes.number.isRequired,
          answer: QaUnitObjectType.isRequired,
        }),
      }),
    }),
  }).isRequired,
  answer: PropTypes.shape({
    detail: PropTypes.string,
    type: PropTypes.number.isRequired,
    data: PropTypes.shape({
      multiple: PropTypes.shape({               // Only if written question.
        choices: PropTypes.arrayOf(QaUnitObjectType).isRequired,
        choicesOffered: PropTypes.number.isRequired,
      }),
      toUnitWord: PropTypes.shape({             // Only if conversion or survey question.
        plural: PropTypes.string.isRequired,
        singular: PropTypes.string.isRequired,
      }),
      conversion: PropTypes.shape({             // Only if conversion or survey question.
        accuracy: PropTypes.number.isRequired,
        range: PropTypes.shape({
          bottom: QaUnitObjectType.isRequired,
          top: QaUnitObjectType.isRequired,
        }).isRequired,
        exact: PropTypes.number.isRequired,
        rounded: PropTypes.number.isRequired,
        friendly: PropTypes.number.isRequired,
        choices: PropTypes.arrayOf(QaUnitObjectType).isRequired,
      }),
      survey: PropTypes.shape({                 // Only if survey question.
        choices: PropTypes.arrayOf(QaUnitObjectType).isRequired,
      }),
    }).isRequired,
  }).isRequired,
});
