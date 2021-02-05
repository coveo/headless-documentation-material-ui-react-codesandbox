import React from "react";
import {
  DateFacet as DateFacetType,
  DateFacetState,
  buildDateFacet,
  DateFacetValue
} from "@coveo/headless";
import { headlessEngine } from "../Engine";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";

interface IRangeDateFacetProps {
  title: string;
  field: string;
}

export default class DateFacet extends React.Component<
  IRangeDateFacetProps,
  {}
> {
  private headlessDateFacet: DateFacetType;
  state: DateFacetState & {
    inputValue: "";
  };

  constructor(props: any) {
    super(props);

    this.headlessDateFacet = buildDateFacet(headlessEngine, {
      options: {
        numberOfValues: 3,
        field: this.props.field,
        generateAutomaticRanges: true
      }
    });

    this.state = {
      ...this.headlessDateFacet.state,
      inputValue: ""
    };
  }
  componentDidMount() {
    this.headlessDateFacet.subscribe(() => this.updateState());
  }

  componentWillUnmount() {
    this.headlessDateFacet.subscribe(() => {});
  }

  updateState() {
    this.setState(this.headlessDateFacet.state);
  }

  toggleSelect(value: DateFacetValue) {
    this.headlessDateFacet.toggleSelect(value);
  }

  getFacetValues() {
    return this.state.values.map((value: DateFacetValue) => (
      <Box mb={1} key={value.start}>
        <div onClick={() => this.headlessDateFacet.toggleSelect(value)}>
          <input
            type="checkbox"
            checked={this.headlessDateFacet.isValueSelected(value)}
          ></input>
          <span>
            {value.start.split("/")[0]}-{value.end.split("/")[0]} (
            {value.numberOfResults})
          </span>
        </div>
      </Box>
    ));
  }

  render() {
    return (
      <Box mt={5} mr={3} p={1} bgcolor="#5D7289">
        <FormControl component="fieldset">
          <Box mb={1}>
            <FormLabel component="legend" color="primary">
              {this.props.title}
            </FormLabel>
          </Box>
          <FormGroup>{this.getFacetValues()}</FormGroup>
        </FormControl>
      </Box>
    );
  }
}
