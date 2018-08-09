import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";

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
      this.setState({ qaFormData: this.makeQaFormFromQaData() });
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
            multiple: this.props.qaData.answer.data.multiple,
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

    this.handleChange = (newState) => {
      this.setState(previousState => merge({}, previousState, newState));
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
        handleChange={this.handleChange}
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
