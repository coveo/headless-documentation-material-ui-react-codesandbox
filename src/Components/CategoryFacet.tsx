import React from "react";
import { headlessEngine } from "../Engine";
import {
  CategoryFacet as CategoryFacetType,
  CategoryFacetState,
  buildCategoryFacet
} from "@coveo/headless";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const hoveredStyle = {
  cursor: "pointer",
  color: "primary"
};

interface ICategoryFacetProps {
  title: string;
  field: string;
  // basePath: [];
}

export default class CategoryFacet extends React.Component<
  ICategoryFacetProps,
  {}
> {
  private headlessCategoryFacet: CategoryFacetType;
  state: CategoryFacetState;

  constructor(props: any) {
    super(props);

    this.headlessCategoryFacet = buildCategoryFacet(headlessEngine, {
      options: {
        numberOfValues: 3,
        field: this.props.field,
        delimitingCharacter: "|"
      }
    });

    this.state = this.headlessCategoryFacet.state;
  }
  componentDidMount() {
    this.headlessCategoryFacet.subscribe(() => this.updateState());
  }

  componentWillUnmount() {
    this.headlessCategoryFacet.subscribe(() => {});
  }

  updateState() {
    this.setState(this.headlessCategoryFacet.state);
  }

  //sends left position offset value to getValues <Box> depending on state
  parentAlign() {
    return this.state.hasActiveValues ? "20%" : "0%";
  }

  getClearButton() {
    if (!this.state.hasActiveValues) {
      return null;
    }
    return (
      <div onClick={() => this.headlessCategoryFacet.deselectAll()}>
        <Typography>
          <IconButton edge="start" size="small">
            <ChevronLeftIcon />
          </IconButton>
          All Categories
        </Typography>
      </div>
    );
  }

  getParents() {
    const parents = this.state.parents;

    return parents.map((parent, i) => {
      const isLast = i === parents.length - 1;
      return (
        <div
          onClick={() =>
            !isLast && this.headlessCategoryFacet.toggleSelect(parent)
          }
        >
          <Typography align="left" color="textSecondary" style={hoveredStyle}>
            {!isLast && (
              <IconButton edge="start" size="small">
                <ChevronLeftIcon />
              </IconButton>
            )}
            {parent.value}
          </Typography>
        </div>
      );
    });
  }

  getValues() {
    //variable to recieve position offset
    const align = this.parentAlign();

    return this.state.values.map((value) => (
      <div key={value.value} onClick={() => this.headlessCategoryFacet.toggleSelect(value)}>
        <Box position="relative" left={align}>
          <Typography align="left" style={hoveredStyle}>
            {value.value} ({value.numberOfResults})
          </Typography>
        </Box>
      </div>
    ));
  }

  render() {
    return (
      <Box mt={5} mr={3} p={1} bgcolor="#5D7289">
        <Box mb={1}>
          <FormLabel component="legend" color="primary">
            {this.props.title}
          </FormLabel>
        </Box>
        {this.getClearButton()}
        {this.getParents()}
        {this.getValues()}
      </Box>
    );
  }
}
