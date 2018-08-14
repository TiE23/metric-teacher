import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import cuid from "cuid";

import QuestionViewerLayout from "./QuestionViewerLayout";

class QuestionViewer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorOpen: false,
      qaFormData: null,
    };

    // On first load
    this.componentDidMount = () => {
      this.initialQaFormData = this.makeQaFormFromQaData();
      this.setState({ qaFormData: this.initialQaFormData });
    };

    this.makeQaFormFromQaData = () => (
      this.props.qaData ? {
        question: {
          basics: {
            id: this.props.qaData.questionId,
            type: this.props.qaData.question.type,
            difficulty: this.props.qaData.difficulty,
            status: this.props.qaData.status,
            flags: this.props.qaData.flags,
            media: this.props.qaData.media,
          },
          questionData: {
            // type - use basics.type
            text: this.props.qaData.question.text,
            detail: this.props.qaData.question.detail,
            range: this.props.qaData.question.data ? {
              lower: (this.props.qaData.question.data.conversion &&
                this.props.qaData.question.data.conversion.range.bottom.value) ||
                (this.props.qaData.question.data.survey &&
                  this.props.qaData.question.data.survey.range.bottom.value),
              upper: (this.props.qaData.question.data.conversion &&
                this.props.qaData.question.data.conversion.range.top.value) ||
                (this.props.qaData.question.data.survey &&
                  this.props.qaData.question.data.survey.range.top.value),
              unit: (this.props.qaData.question.data.conversion &&
                this.props.qaData.question.data.conversion.range.top.unit) ||
                (this.props.qaData.question.data.survey &&
                  this.props.qaData.question.data.survey.range.top.unit),
              step: (this.props.qaData.question.data.conversion &&
                this.props.qaData.question.data.conversion.step) ||
                (this.props.qaData.question.data.survey &&
                  this.props.qaData.question.data.survey.step),
            } : null,
          },
          answerData: {
            // type - user basics.type
            detail: this.props.qaData.answer.detail,
            accuracy: this.props.qaData.answer.data.accuracy,
            unit: this.props.qaData.answer.data.unit,
            multiple: this.props.qaData.answer.data.multiple ? {
              choicesOffered: this.props.qaData.answer.data.multiple.choicesOffered,
              choices: this.props.qaData.answer.data.multiple.choices.map(choice => ({
                unit: choice.unit,
                mixedValue: choice.value || choice.written,
                cuid: cuid.slug(),
              })),
            } : null,
          },
        },
        subSubjectId: this.props.qaData.subSubjectId,
      } : null
    );

    this.openEditor = () => {
      this.setState({ editorOpen: true });
    };

    this.closeEditor = () => {
      this.setState({ editorOpen: false });
    };

    this.resetChanges = () => {
      this.setState({ qaFormData: this.initialQaFormData });
    };

    this.handleChange = (newState) => {
      this.setState(previousState => merge({}, previousState, newState));
    };

    this.handleBasicsChange = (basics) => {
      this.handleChange({ qaFormData: { question: { basics } } });
    };

    this.handleSubSubjectIdChange = (subSubjectId) => {
      this.handleChange({ qaFormData: { subSubjectId } });
    };

    this.handleQuestionDataChange = (questionData) => {
      this.handleChange({ qaFormData: { question: { questionData } } });
    };

    this.handleAnswerDataChange = (answerData) => {
      this.handleChange({ qaFormData: { question: { answerData } } });
    };
  }

  render() {
    if (!this.state.qaFormData) return null;

    return (
      <QuestionViewerLayout
        qaFormData={this.state.qaFormData}
        allowEditor={this.props.allowEditor}
        editorOpen={this.state.editorOpen}
        openEditor={this.openEditor}
        closeEditor={this.closeEditor}
        resetChanges={this.resetChanges}
        handleChangeFunctions={{
          handleBasicsChange: this.handleBasicsChange,
          handleSubSubjectIdChange: this.handleSubSubjectIdChange,
          handleQuestionDataChange: this.handleQuestionDataChange,
          handleAnswerDataChange: this.handleAnswerDataChange,
        }}
      />
    );
  }
}

QuestionViewer.propTypes = {
  qaData: PropTypes.shape({
    questionId: PropTypes.string.isRequired,
    subSubjectId: PropTypes.string.isRequired,
    flags: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    media: PropTypes.string,
    question: PropTypes.shape({
      text: PropTypes.string,
      detail: PropTypes.string,
      type: PropTypes.number.isRequired,
      data: PropTypes.shape({
        conversion: PropTypes.shape({
          step: PropTypes.number.isRequired,
          range: PropTypes.shape({
            bottom: PropTypes.shape({
              value: PropTypes.number.isRequired,
            }).isRequired,
            top: PropTypes.shape({
              value: PropTypes.number.isRequired,
              unit: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
        survey: PropTypes.shape({
          step: PropTypes.number.isRequired,
          range: PropTypes.shape({
            bottom: PropTypes.shape({
              value: PropTypes.number.isRequired,
            }).isRequired,
            top: PropTypes.shape({
              value: PropTypes.number.isRequired,
              unit: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      }),
    }).isRequired,
    answer: PropTypes.shape({
      detail: PropTypes.string,
      data: PropTypes.shape({
        accuracy: PropTypes.number,
        unit: PropTypes.string,
        multiple: PropTypes.shape({
          choices: PropTypes.arrayOf(PropTypes.shape({
            unit: PropTypes.string.isRequired,
            written: PropTypes.string,
            value: PropTypes.number,
          })).isRequired,
          choicesOffered: PropTypes.number.isRequired,
        }),
        conversion: PropTypes.shape({
          range: PropTypes.shape({
            bottom: PropTypes.shape({
              unit: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      }).isRequired,
    }).isRequired,
  }),
  allowEditor: PropTypes.bool,
};

QuestionViewer.defaultProps = {
  qaData: null,
  allowEditor: false,
};

export default QuestionViewer;
