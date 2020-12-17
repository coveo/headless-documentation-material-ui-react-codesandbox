import React from "react";
import {
  Facet as FacetType,
  FacetState,
  buildFacet,
  FacetValue
} from "@coveo/headless";
import { headlessEngine } from "../Engine";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";

interface IFacetProps {
  title: string;
  field: string;
}

export default class Facet extends React.Component<IFacetProps, {}> {
  private headlessFacet: FacetType;
  state: FacetState;

  constructor(props: any) {
    super(props);

    this.headlessFacet = buildFacet(headlessEngine, {
      options: {
        numberOfValues: 3,
        field: this.props.field
      }
    });

    this.state = this.headlessFacet.state;
  }
  componentDidMount() {
    this.headlessFacet.subscribe(() => this.updateState());
  }

  componentWillUnmount() {
    this.headlessFacet.subscribe(() => {});
  }

  updateState() {
    this.setState(this.headlessFacet.state);
  }

  toggleSelect(value: FacetValue) {
    this.headlessFacet.toggleSelect(value);
  }

  showMore() {
    this.headlessFacet.showMoreValues();
  }

  showLess() {
    this.headlessFacet.showLessValues();
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
          <FormGroup>
            {this.state.values.map((value: FacetValue) => (
              <Box mb={1} key={value.value}>
                <FormControlLabel
                  label={`${value.value} (${value.numberOfResults})`}
                  control={
                    <Checkbox
                      color="primary"
                      onChange={(event) => this.toggleSelect(value)}
                    />
                  }
                />
              </Box>
            ))}
          </FormGroup>
          {this.state.canShowMoreValues && (
            <Button
              onClick={() => {
                this.showMore();
              }}
            >
              Show More
            </Button>
          )}
          {this.state.canShowLessValues && (
            <Button
              onClick={() => {
                this.showLess();
              }}
            >
              Show Less
            </Button>
          )}
        </FormControl>
      </Box>
    );
  }
}
