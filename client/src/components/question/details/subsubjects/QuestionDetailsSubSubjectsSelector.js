import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import cloneDeep from "lodash/cloneDeep";
import forEach from "lodash/forEach";
import find from "lodash/find";

import utils from "../../../../utils";

import SubSubjectReview from "../../../subsubject/SubSubjectReview";

import {
  SUBJECT_ICONS,
} from "../../../../constants";

class QuestionDetailsSubSubjectsSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjectId: null,
      selectedSubjectsDropdown: null,
      selectedScalesDropdown: null,
      selectedScale: null,
      selectedDirectionToMetric: null,
      selectedSubSubjectId: null,
      selectedSubSubjectData: null,
    };

    // Because I update selectedSubjectId in componentDidMount() I need to prevent reseting the
    // dropdown selections the first time that componentDidUpdate() and sees that selectedSubjectId
    // was changed. This single-use state is how I avoid that first-time reset.
    this.firstMount = true;

    // On first load...
    this.componentDidMount = () => {
      if (this.props.subjectsData) {
        this.setState({
          selectedSubjectsDropdown: this.buildSubjectsDropdownSelection(this.props.subjectsData),
        });
      }

      // Knowing only the SubSubject's ID, get the Subject's ID and add it to state right away.
      if (this.props.subjectsData && this.props.initialSubSubjectId) {
        const initialSubSubject = utils.cacheGetTarget(
          this.props.subjectsData,
          this.props.initialSubSubjectId,
        );

        // Subject was found. Also, let's build the SubSubject data to start!
        if (initialSubSubject) {
          this.setState({
            selectedSubjectId: initialSubSubject.parent.id,
            selectedScalesDropdown: this.buildScalesDropdownSelection(utils.cacheGetTarget(
              this.props.subjectsData,
              initialSubSubject.parent.id,
              "subSubjects",
            )),
            selectedScale: initialSubSubject.scale,
            selectedDirectionToMetric: initialSubSubject.toMetric,
            selectedSubSubjectId: this.props.initialSubSubjectId,
            selectedSubSubjectData: this.buildSubSubjectData(
              cloneDeep(this.props.subjectsData), // Must make a copy first!
              this.props.initialSubSubjectId,
            ),
          });
        }
      }
    };

    // On each update...
    this.componentDidUpdate = (prevProps, prevState) => {
      // Change of Subject means we gotta grab different scales.
      if (this.props.subjectsData && !this.firstMount &&
        this.state.selectedSubjectId !== prevState.selectedSubjectId
      ) {
        this.setState({
          selectedScalesDropdown: this.buildScalesDropdownSelection(utils.cacheGetTarget(
            this.props.subjectsData,
            this.state.selectedSubjectId,
            "subSubjects",
          )),
          selectedScale: null,              // New Subject? No scale!
          selectedDirectionToMetric: null,  // New Subject? No direction!
        });
      } else if (this.firstMount) {
        this.firstMount = false;
      }

      // A change in scale or direction means we need to re-find our targeted SubSubject.
      if (this.props.subjectsData && this.state.selectedScale !== null &&
        this.state.selectedDirectionToMetric !== null &&
        (this.state.selectedScale !== prevState.selectedScale ||
        this.state.selectedDirectionToMetric !== prevState.selectedDirectionToMetric)
      ) {
        const targetSubSubject = find(utils.cacheGetTarget(
          this.props.subjectsData,
          this.state.selectedSubjectId,
          "subSubjects",
        ), o => (o.scale === this.state.selectedScale &&
          o.toMetric === this.state.selectedDirectionToMetric));

        this.setState({
          selectedSubSubjectId: targetSubSubject.id,
        });
      }

      // If the selected SubSubject ID was changed we need to rebuild the selectedSubSubjectData
      // object.
      if (this.props.subjectsData &&
        this.state.selectedSubSubjectId !== prevState.selectedSubSubjectId
      ) {
        // Place the content of the Subject object into the parent property of the selected
        // SubSubject object.
        this.setState({
          selectedSubSubjectData: this.buildSubSubjectData(
            cloneDeep(this.props.subjectsData), // Must make a copy first!
            this.state.selectedSubSubjectId,
          ),
        });
      }
    };

    this.handleSubjectChange = (e, { value }) => {
      this.setState({ selectedSubjectId: value });
    };

    this.handleScaleChange = (e, { value }) => {
      this.setState({ selectedScale: value });
    };

    this.handleDirectionChange = (e, { value }) => {
      this.setState({ selectedDirectionToMetric: value });
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

    this.buildSubjectsDropdownSelection = subjects => (
      subjects.map(subject => ({
        text: subject.name,
        icon: SUBJECT_ICONS[subject.name] || "question circle outline",
        value: subject.id,
        key: subject.id,
      }))
    );

    this.buildScalesDropdownSelection = (subSubjects) => {
      const scalesDropdown = [];
      forEach(subSubjects, (subSubject) => {
        if (!find(scalesDropdown, o => o.key === subSubject.scale)) {
          scalesDropdown.push({
            text: `${utils.firstLetterCap(subSubject.scale)} Scale`,
            value: subSubject.scale,
            icon: "minus",
            key: subSubject.scale,
          });
        }
      });

      return scalesDropdown;
    };
  }

  render() {
    if (!this.props.subjectsData) return null;

    return (
      <div>
        <p>
          Subject: {this.state.selectedSubjectId}
          <br />
          SubSubject: {this.state.selectedSubSubjectId}
        </p>
        <Dropdown
          // inline
          // text="Subject"
          selection
          options={this.state.selectedSubjectsDropdown}
          value={this.state.selectedSubjectId}
          onChange={this.handleSubjectChange}
        />
        <br />
        <Dropdown
          // inline
          // text="Scale"
          selection
          options={this.state.selectedScalesDropdown}
          value={this.state.selectedScale}
          onChange={this.handleScaleChange}
        />
        <br />
        <Dropdown
          // inline
          // text="Direction"
          selection
          options={[
            { value: true, text: "To Metric", icon: "redo alternate" },
            { value: false, text: "From Metric", icon: "undo alternate" },
          ]}
          value={this.state.selectedDirectionToMetric}
          onChange={this.handleDirectionChange}
        />

        <SubSubjectReview
          subSubjectData={this.state.selectedSubSubjectData}
        />
      </div>
    );
  }
}

QuestionDetailsSubSubjectsSelector.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subSubjects: PropTypes.arrayOf(PropTypes.shape({
      scale: PropTypes.string.isRequired,
      toMetric: PropTypes.bool.isRequired,
    })).isRequired,
  })),
  initialSubSubjectId: PropTypes.string,
};

QuestionDetailsSubSubjectsSelector.defaultProps = {
  subjectsData: null,
  initialSubSubjectId: null,
};

export default QuestionDetailsSubSubjectsSelector;
