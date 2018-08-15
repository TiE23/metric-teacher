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

    const buildUnitOptions = (family, subject) => {
      if (UNIT_FAMILIES[family] && UNIT_FAMILIES[family][subject]) {
        return UNIT_FAMILIES[family][subject].map(unit => ({
          key: unit,
          text: `${utils.unitInitilizer(unit)} - ${UNIT_NAMES[unit]}`,
          value: unit,
        }));
      }
      return null;
    };

    // On first mount...
    this.componentDidMount = () => {
      this.setState({ options: buildUnitOptions(this.props.family, this.props.subject) });
    };

    // On updates...
    this.componentDidUpdate = (prevProps) => {
      if (prevProps.family !== this.props.family || prevProps.subject !== this.props.subject) {
        this.setState({ options: buildUnitOptions(this.props.family, this.props.subject) });
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
};

UnitDropdown.defaultProps = {
  value: null,
  dropdownProps: null,
};

export default UnitDropdown;
