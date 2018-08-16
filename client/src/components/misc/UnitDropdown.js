import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";

import utils from "../../utils";

import {
  UNIT_NAMES,
  UNIT_FAMILIES,
} from "../../constants";

class UnitDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: null,
    };

    const buildUnitOptions = (family, subject, addWrittenOption) => {
      const options = [];
      if (addWrittenOption) {
        options.push({
          text: "Written Answer",
          value: "written",
        });
      }

      if (UNIT_FAMILIES[family] && UNIT_FAMILIES[family][subject]) {
        const unitOptions = (UNIT_FAMILIES[family][subject].map(unit => ({
          key: unit,
          text: `${utils.unitInitilizer(unit)} - ${UNIT_NAMES[unit]}`,
          value: unit,
        })));
        options.push(...unitOptions);
      }

      return options;
    };

    // On first mount...
    this.componentDidMount = () => {
      this.setState({
        options: buildUnitOptions(
          this.props.family,
          this.props.subject,
          this.props.addWrittenOption,
        ),
      });
    };

    // On updates...
    this.componentDidUpdate = (prevProps) => {
      if (prevProps.family !== this.props.family || prevProps.subject !== this.props.subject) {
        this.setState({
          options: buildUnitOptions(
            this.props.family,
            this.props.subject,
            this.props.addWrittenOption,
          ),
        });
      }
    };

    this.handleAddition = (e, { value }) => {
      const unit = value.toLocaleLowerCase();
      this.setState({
        options: [
          {
            text: `${utils.unitInitilizer(unit)} - ${UNIT_NAMES[unit] || "Unknown Unit"}`,
            value: unit,
          },
          ...this.state.options,
        ],
      });
    };
  }

  render() {
    if (this.state.options) {
      return (
        <Dropdown
          options={this.state.options}
          placeholder="Unit"
          search
          selection
          allowAdditions
          value={this.props.value}
          onAddItem={this.handleAddition}
          onChange={this.props.onChange}
          {...this.props.dropdownProps}
        />
      );
    } else {
      return (
        <span>Unit</span>
      );
    }
  }
}

UnitDropdown.propTypes = {
  family: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  dropdownProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  addWrittenOption: PropTypes.bool,
};

UnitDropdown.defaultProps = {
  value: null,
  dropdownProps: null,
  addWrittenOption: false,
};

export default UnitDropdown;
