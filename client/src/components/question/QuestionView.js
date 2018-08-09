import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import QuestionEdit from "./edit/QuestionEdit";
import QuestionReviewDetails from "./review/QuestionReviewDetails";

class QuestionView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorOpen: false,
    };

    this.openEditor = () => {
      this.setState({ editorOpen: true });
    };

    this.closeEditor = () => {
      this.setState({ editorOpen: false });
    };
  }

  render() {
    if (!this.props.qaData) return null;

    if (this.props.allowEditor && this.state.editorOpen) {
      return (
        <QuestionEdit
          qaData={this.props.qaData}
          closeEditor={this.closeEditor}
        />
      );
    }
    return (
      <QuestionReviewDetails
        qaData={this.props.qaData}
        allowEditor={this.props.allowEditor}
        openEditor={this.openEditor}
      />
    );
  }
}

QuestionView.propTypes = {
  qaData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  allowEditor: PropTypes.bool,
};

QuestionView.defaultProps = {
  qaData: null,
  allowEditor: false,
};

export default QuestionView;
