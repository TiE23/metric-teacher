import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import forEach from "lodash/forEach";
import find from "lodash/find";

import utils from "../../../../utils";

import SubSubjectReview from "../../../subsubject/SubSubjectReview";

import {
  SUBJECT_ICONS,
  SCALE_ICONS,
} from "../../../../constants";

class QuestionDetailsSubSubjectsSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubjectId: null,
      selectedSubjectName: null,
      selectedScalesDropdown: null,
      selectedScale: null,
      selectedToMetric: null,
      selectedSubSubjectRarity: null,
      selectedSubSubjectId: null,
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
            selectedSubSubjectRarity: utils.cacheGetTarget(
              this.props.subjectsData,
              this.props.initialSubSubjectId,
              "rarity",
            ),
          });
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
          selectedScale: null,    // New Subject? No scale!
          selectedToMetric: null, // New Subject? No direction!
        });
      } else if (this.firstMount) {
        this.firstMount = false;
      }

      // TODO - There is improved efficiency by else/if'ing these checks and nulling more states.
      // We lost scale or toMetric. Clear the selected SubSubject's ID and rarity.
      if ((this.state.selectedScale !== prevState.selectedScale &&
        this.state.selectedScale === null) ||
        (this.state.selectedToMetric !== prevState.selectedToMetric &&
          this.state.selectedToMetric === null)
      ) {
        this.setState({
          selectedSubSubjectId: null,
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
          selectedSubSubjectRarity: targetSubSubject.rarity,
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

    const {
      selectedSubjectId,
      selectedSubjectName,
      selectedScalesDropdown,
      selectedScale,
      selectedToMetric,
      selectedSubSubjectId,
      selectedSubSubjectRarity,
    } = this.state;

    return (
      <SubSubjectReview
        id={selectedSubSubjectId}
        subjectName={selectedSubjectName}
        scale={selectedScale}
        toMetric={selectedToMetric}
        rarity={selectedSubSubjectRarity}
        subjectSelector={
          <Dropdown
            inline
            text="Subject"
            options={this.selectedSubjectsDropdown}
            value={selectedSubjectId}
            onChange={this.handleSubjectChange}
          />
        }
        scaleSelector={
          <Dropdown
            inline
            text="Scale"
            options={selectedScalesDropdown}
            value={selectedScale}
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
            value={selectedToMetric}
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
