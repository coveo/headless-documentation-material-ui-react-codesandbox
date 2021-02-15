import React from "react";
import { headlessEngine } from "../Engine";
import {
  CategoryFacet as CategoryFacetType,
  CategoryFacetState,
  buildCategoryFacet,
  CategoryFacetValue
} from "@coveo/headless";

// import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

const hoveredStyle = {
  cursor: "pointer",
  color: "primary"
};

interface ICategoryFacetProps {
  title: string;
  field: string;
  subtitle?: string;
}

export default class CategoryFacet extends React.Component<
  ICategoryFacetProps,
  {}
> {
  public static defaultProps = {
    subtitle: "All Categories"
  };

  private headlessCategoryFacet: CategoryFacetType;
  state: CategoryFacetState & {
    inputValue: "";
  };

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

  toggleSelect(value: CategoryFacetValue) {
    this.headlessCategoryFacet.toggleSelect(value);
  }

  showMore() {
    this.headlessCategoryFacet.showMoreValues();
  }

  showLess() {
    this.headlessCategoryFacet.showLessValues();
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
          {this.props.subtitle}
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
      <div
        key={value.value}
        onClick={() => this.headlessCategoryFacet.toggleSelect(value)}
      >
        <Box position="relative" left={align}>
          <Typography align="left" style={hoveredStyle}>
            {value.value} ({value.numberOfResults})
          </Typography>
        </Box>
      </div>
    ));
  }


  getShowMore() {
    return (
      <Button
        onClick={() => {
          this.showMore();
        }}
      >
        Show More
      </Button>
    );
  }

  getShowLess() {
    return (
      <Button
        onClick={() => {
          this.showLess();
        }}
      >
        Show Less
      </Button>
    );
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
        {this.state.canShowMoreValues && this.getShowMore()}
        {this.state.canShowLessValues && this.getShowLess()}
      </Box>
    );
  }
}
