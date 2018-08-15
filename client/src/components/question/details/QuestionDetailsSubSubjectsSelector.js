import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import forEach from "lodash/forEach";
import find from "lodash/find";

import utils from "../../../utils";

import SubSubjectReview from "../../subsubject/SubSubjectReview";

import {
  SUBJECT_ICONS,
  SCALE_ICONS,
} from "../../../constants";

class QuestionDetailsSubSubjectsSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjectId: null,
      selectedSubjectName: null,
      selectedScalesDropdown: null,
      selectedScale: null,
      selectedToMetric: null,
      selectedSubSubjectId: null,
      selectedSubSubjectDescription: null,
      selectedSubSubjectRarity: null,
    };

    // Because I update selectedSubjectId in componentDidMount() I need to prevent reseting the
    // dropdown selections the first time that componentDidUpdate() and sees that selectedSubjectId
    // was changed. This single-use state is how I avoid that first-time reset.
    this.firstMount = true;
    this.selectedSubjectsDropdown = null;

    // On first load...
    this.componentDidMount = () => {
      if (this.props.subjectsData) {
        this.selectedSubjectsDropdown =
          this.buildSubjectsDropdownSelection(this.props.subjectsData);
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
            selectedSubjectName: initialSubSubject.parent.name,
            selectedScalesDropdown: this.buildScalesDropdownSelection(utils.cacheGetTarget(
              this.props.subjectsData,
              initialSubSubject.parent.id,
              "subSubjects",
            )),
            selectedScale: initialSubSubject.scale,
            selectedToMetric: initialSubSubject.toMetric,
            selectedSubSubjectId: this.props.initialSubSubjectId,
            selectedSubSubjectDescription: initialSubSubject.description,
            selectedSubSubjectRarity: utils.cacheGetTarget(
              this.props.subjectsData,
              this.props.initialSubSubjectId,
              "rarity",
            ),
          });

          // Update the qaFormData right away.
          if (this.props.handleSubSubjectChange) {
            this.props.handleSubSubjectChange(
              this.props.initialSubSubjectId,
              initialSubSubject.toMetric,
              initialSubSubject.parent.name,
            );
          }
        }
      }
    };

    // On each update...
    this.componentDidUpdate = (prevProps, prevState) => {
      // Selected Subject was changed, we need to get new scales dropdown.
      if (this.props.subjectsData && !this.firstMount &&
        this.state.selectedSubjectId !== prevState.selectedSubjectId
      ) {
        const newSubjectData = utils.cacheGetTarget(
          this.props.subjectsData,
          this.state.selectedSubjectId,
        );

        this.setState({
          selectedSubjectName: newSubjectData.name,
          selectedScalesDropdown: this.buildScalesDropdownSelection(newSubjectData.subSubjects),
          selectedScale: null,                  // New Subject? No scale!
          selectedToMetric: null,               // New Subject? No direction!
          selectedSubSubjectId: null,           // New Subject? No SubSubject!
          selectedSubSubjectDescription: null,  // New subject? No description!
          selectedSubSubjectRarity: null,       // New Subject? No SubSubject!
        });

      // We lost scale or toMetric. Clear the selected SubSubject's ID and rarity.
      } else if (
        (this.state.selectedScale !== prevState.selectedScale &&
          this.state.selectedScale === null) ||
        (this.state.selectedToMetric !== prevState.selectedToMetric &&
          this.state.selectedToMetric === null)
      ) {
        this.setState({
          selectedSubSubjectId: null,
          selectedSubSubjectDescription: null,
          selectedSubSubjectRarity: null,
        });
      }

      // A new combo of scale and direction has been made. Get the new selected SubSubject.
      if (this.props.subjectsData && this.state.selectedScale !== null &&
        this.state.selectedToMetric !== null &&
        (this.state.selectedScale !== prevState.selectedScale ||
          this.state.selectedToMetric !== prevState.selectedToMetric)
      ) {
        const targetSubSubject = find(utils.cacheGetTarget(
          this.props.subjectsData,
          this.state.selectedSubjectId,
          "subSubjects",
        ), o => (o.scale === this.state.selectedScale &&
          o.toMetric === this.state.selectedToMetric));

        this.setState({
          selectedSubSubjectId: targetSubSubject.id,
          selectedSubSubjectDescription: targetSubSubject.description,
          selectedSubSubjectRarity: targetSubSubject.rarity,
        });
      }

      // Need to communicate SubSubjectID, toMetric, and Subject's name to qaFormData.
      if (this.state.selectedSubSubjectId !== prevState.selectedSubSubjectId &&
        this.state.selectedSubSubjectId !== null &&
        this.props.handleSubSubjectChange !== null
      ) {
        this.props.handleSubSubjectChange(
          this.state.selectedSubSubjectId,
          this.state.selectedToMetric,
          this.state.selectedSubjectName,
        );
      }

      if (this.firstMount) {
        this.firstMount = false;
      }
    };

    this.handleSubjectChange = (e, { value }) => {
      this.setState({ selectedSubjectId: value });
    };

    this.handleScaleChange = (e, { value }) => {
      this.setState({ selectedScale: value });
    };

    this.handleDirectionChange = (e, { value }) => {
      this.setState({ selectedToMetric: value });
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
            icon: SCALE_ICONS[subSubject.scale] || "question circle outline",
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
      <SubSubjectReview
        id={this.state.selectedSubSubjectId}
        subjectName={this.state.selectedSubjectName}
        scale={this.state.selectedScale}
        toMetric={this.state.selectedToMetric}
        description={this.state.selectedSubSubjectDescription}
        rarity={this.state.selectedSubSubjectRarity}
        subjectSelector={
          <Dropdown
            inline
            text="Subject"
            options={this.selectedSubjectsDropdown}
            value={this.state.selectedSubjectId}
            onChange={this.handleSubjectChange}
          />
        }
        scaleSelector={
          <Dropdown
            inline
            text="Scale"
            options={this.state.selectedScalesDropdown}
            value={this.state.selectedScale}
            onChange={this.handleScaleChange}
          />
        }
        toMetricSelector={
          <Dropdown
            text="Direction"
            options={[
              { value: true, text: "To Metric", icon: "redo alternate" },
              { value: false, text: "From Metric", icon: "undo alternate" },
            ]}
            value={this.state.selectedToMetric}
            onChange={this.handleDirectionChange}
          />
        }
      />
    );
  }
}

QuestionDetailsSubSubjectsSelector.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    subSubjects: PropTypes.arrayOf(PropTypes.shape({
      scale: PropTypes.string.isRequired,
      toMetric: PropTypes.bool.isRequired,
    })).isRequired,
  })),
  initialSubSubjectId: PropTypes.string,
  handleSubSubjectChange: PropTypes.func,
};

QuestionDetailsSubSubjectsSelector.defaultProps = {
  subjectsData: null,
  initialSubSubjectId: null,
  handleSubSubjectChange: null,
};

export default QuestionDetailsSubSubjectsSelector;
