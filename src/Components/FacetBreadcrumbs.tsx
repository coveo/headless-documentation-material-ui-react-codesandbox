import React from "react";
import Button from "@material-ui/core/IconButton";
import {
  BreadcrumbManager as BreadcrumbManagerType,
  BreadcrumbManagerState,
  buildBreadcrumbManager
} from "@coveo/headless";
import { headlessEngine } from "../Engine";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ClearIcon from "@material-ui/icons/Clear";

// Currently, this component only displays breadcrumbs from basic facets.
export default class FacetBreadcrumbs extends React.Component {
  private headlessBreadcrumbManager: BreadcrumbManagerType;
  state: BreadcrumbManagerState;

  constructor(props: any) {
    super(props);

    this.headlessBreadcrumbManager = buildBreadcrumbManager(headlessEngine);

    this.state = this.headlessBreadcrumbManager.state;
  }

  componentDidMount() {
    this.headlessBreadcrumbManager.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessBreadcrumbManager.state);
  }

  getFacetBreadcrumbs() {
    let breadcrumbs = this.state.facetBreadcrumbs;
    return breadcrumbs.map((breadcrumb) => (
      <div key={breadcrumb.field}>
        <Typography>
          {breadcrumb.field.charAt(0).toUpperCase() + breadcrumb.field.slice(1)}
          :
        </Typography>
        {breadcrumb.values.map((value) => (
          <div key={breadcrumb.field + value.value.value}>
            <Link
              onClick={() => value.deselect()}
              variant="caption"
              underline="none"
            >
              {value.value.value}
              <ClearIcon fontSize="small" />
            </Link>
          </div>
        ))}
      </div>
    ));
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={10}>
          {this.getFacetBreadcrumbs()}
        </Grid>
        <Grid item xs={2}>
          {this.headlessBreadcrumbManager.hasBreadcrumbs() && (
            <Button
              size="small"
              onClick={this.headlessBreadcrumbManager.deselectAll}
            >
              {" "}
              Clear Filters
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}
