import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import utils from "../../../../utils";

class QuestionDetailsSubSubjectsSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: null,
      selectedSubSubject: this.props.initialSubSubjectId,
    };

    // On first load...
    this.componentDidMount = () => {
      // Knowing only the SubSubject's ID, get the Subject's ID and add it to state right away.
      if (this.props.subjectsData && this.props.initialSubSubjectId) {
        const initialSubjectId = utils.cacheGetTarget(
          this.props.subjectsData,
          this.props.initialSubSubjectId,
          "parent.id",
        );

        if (initialSubjectId) {
          this.setState({ selectedSubject: initialSubjectId });
        }
      }
    };
  }

  render() {
    if (!this.props.subjectsData) return null;

    return (
      <div>
        <p>QuestionDetailsSubSubjectsSelector</p>
        <p>Current Subject: {this.state.selectedSubject}</p>
        <p>Current SubSubject: {this.state.selectedSubSubject}</p>
        <ul>
          {this.props.subjectsData.map(subject => (
            <li key={subject.id}>
              {subject.id}
              <ul>
                {subject.subSubjects.map(subSubject => (
                  <li key={subSubject.id}>
                    {subSubject.id}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

QuestionDetailsSubSubjectsSelector.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  initialSubSubjectId: PropTypes.string,
};

QuestionDetailsSubSubjectsSelector.defaultProps = {
  subjectsData: null,
  initialSubSubjectId: null,
};

export default QuestionDetailsSubSubjectsSelector;
