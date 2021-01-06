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

  getSelectedValues(key: string, objId: string) {
    const selectedValuesObj: object = this.state[key][objId]["values"];
    const selectedValues: Array<string> = [];
    for (let selectedKey in selectedValuesObj) {
      selectedValues.push(selectedValuesObj[selectedKey]);
    }

    return selectedValues;
  }

  render() {
    let breadcrumbs: object = {};
    for (let key in this.state) {
      const fieldObjs = this.state[key];

      for (let objId in fieldObjs) {
        if (!fieldObjs[objId]) {
          continue;
        }
        const field: string = fieldObjs[objId]["field"];

        breadcrumbs[field] = this.getSelectedValues(key, objId);
      }
    }

    return (
      <Grid container>
        <Grid item xs={10}>
          {Object.keys(breadcrumbs).map((keyName, i) => (
            <div key={keyName}>
              <Typography>
                {keyName.charAt(0).toUpperCase() + keyName.slice(1)}:
              </Typography>
              {breadcrumbs[keyName].map((value) => (
                <div key={keyName + value.value.value}>
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
          ))}
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
