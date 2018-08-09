import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";

import utils from "../../../../utils";

import SubSubjectReview from "../../../subsubject/SubSubjectReview";

class QuestionDetailsSubSubjectsSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjectId: null,
      selectedSubSubjectId: this.props.initialSubSubjectId,
      selectedSubSubjectData: null,
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

        // Subject was found. Also, let's build the SubSubject data to start!
        if (initialSubjectId) {
          this.setState({
            selectedSubjectId: initialSubjectId,
            selectedSubSubjectData: this.buildSubSubjectData(
              cloneDeep(this.props.subjectsData), // Cannot
              this.state.selectedSubSubjectId,
            ),
          });
        }
      }
    };

    // On each update...
    this.componentDidUpdate = (prevProps, prevState) => {
      // If the selected SubSubject ID was changed we need to rebuild the selectedSubSubjectData
      // object.
      if (this.props.subjectsData &&
        this.state.selectedSubSubjectId !== prevState.selectedSubSubjectId
      ) {
        // Place the content of the Subject object into the parent property of the selected
        // SubSubject object.
        this.setState({
          selectedSubSubjectData: this.buildSubSubjectData(
            cloneDeep(this.props.subjectsData),
            this.state.selectedSubSubjectId,
          ),
        });
      }
    };


    /**
     * Build the current SubSubject's data object from the SubjectsData input and the SubSubject's
     * ID.
     *
     * Manipulation of subjectsData is done by reference, so consider sending in a clone if you're
     * editing a prop or state object!
     *
     * @param subjectsData - SEE NOTE ABOVE!!
     * @param subSubjectId
     * @returns {*}
     */
    this.buildSubSubjectData = (subjectsData, subSubjectId) => {
      const selectedSubSubjectData = utils.cacheGetTarget(subjectsData, subSubjectId);
      selectedSubSubjectData.parent = utils.rootCopy(utils.cacheGetTarget(
        subjectsData,
        selectedSubSubjectData.parent.id,
      ));
      return selectedSubSubjectData;
    };
  }

  render() {
    if (!this.props.subjectsData) return null;

    return (
      <div>
        <p>QuestionDetailsSubSubjectsSelector</p>
        <p>Current Subject: {this.state.selectedSubjectId}</p>
        <p>Current SubSubject: {this.state.selectedSubSubjectId}</p>
        <SubSubjectReview
          subSubjectData={this.state.selectedSubSubjectData}
        />
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
