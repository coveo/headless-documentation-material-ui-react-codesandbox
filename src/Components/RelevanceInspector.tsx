/* eslint-disable no-use-before-define */
import React from "react";
import {
  buildRelevanceInspector,
  RelevanceInspector as RelevanceInspectorType,
  RelevanceInspectorState,
  Unsubscribe
} from "@coveo/headless";
import { headlessEngine } from "../Engine";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography
} from "@material-ui/core";

export default class RelevanceInspector extends React.Component {
  private headlessRelevanceInspector: RelevanceInspectorType;

  state: RelevanceInspectorState;
  unsubscribe!: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.headlessRelevanceInspector = buildRelevanceInspector(headlessEngine, {
      options: {
        automaticallyLogInformation: false
      }
    });
    this.state = this.headlessRelevanceInspector.state;
  }

  componentDidMount() {
    this.unsubscribe = this.headlessRelevanceInspector.subscribe(() =>
      this.updateState()
    );
  }

  componentDidUpdate() {
    if (this.state.isEnabled) {
      console.info("Debug info: ", this.state);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateState() {
    this.setState(this.headlessRelevanceInspector.state);
  }

  switchDebug = () => {
    if (this.state.isEnabled) {
      this.headlessRelevanceInspector.disable();
    } else {
      this.headlessRelevanceInspector.enable();
    }
  };

  render() {
    return (
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Debug info: </Grid>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isEnabled}
                  onChange={this.switchDebug}
                  name="checkDebug"
                />
              }
              label=""
            />
          </FormGroup>
        </Grid>
      </Typography>
    );
  }
}
