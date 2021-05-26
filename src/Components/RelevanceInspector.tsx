/* eslint-disable no-use-before-define */
import React from "react";
import {
  AnalyticsActions,
  buildRelevanceInspector,
  RelevanceInspector as RelevanceInspectorType,
  RelevanceInspectorState,
  SearchActions
} from "@coveo/headless";
import { headlessEngine } from "../Engine";
import {
  Avatar,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography
} from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";
import RelevanceInspectorWindow from "../Components/RelevanceInspectorWindow";

export default class RelevanceInspector extends React.Component {
  private headlessRelevanceInspector: RelevanceInspectorType;
  private hideExecuteQuery: boolean;

  state: RelevanceInspectorState & {
    executeQueryOnChange: true;
    openModal: false;
  };

  constructor(props: any) {
    super(props);
    this.headlessRelevanceInspector = buildRelevanceInspector(headlessEngine, {
      options: {
        automaticallyLogInformation: false
      }
    });
    this.hideExecuteQuery = true;
    this.state = {
      ...this.headlessRelevanceInspector.state,
      executeQueryOnChange: true,
      openModal: false
    };
  }

  componentDidMount() {
    this.headlessRelevanceInspector.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessRelevanceInspector.state);
  }

  avatarStyle = {
    width: "30px",
    height: "30px"
  };

  setDebug(debug: boolean) {
    if (debug) {
      this.headlessRelevanceInspector.enable();
    } else {
      this.headlessRelevanceInspector.disable();
    }
    if (this.state.executeQueryOnChange) {
      headlessEngine.dispatch(
        SearchActions.executeSearch(AnalyticsActions.logInterfaceLoad())
      );
    }
  }

  switchDebug = () => {
    if (this.debug()) {
      this.setDebug(false);
    } else {
      this.setDebug(true);
    }
  };

  switchExecuteQuery = () => {
    if (this.state.executeQueryOnChange) {
      this.setState({ executeQueryOnChange: false });
    } else {
      this.setState({ executeQueryOnChange: true });
    }
  };

  debug() {
    return this.headlessRelevanceInspector.state.isEnabled;
  }

  getExecuteQueryControl() {
    if (!this.hideExecuteQuery) {
      return (
        <FormControlLabel
          control={
            <Switch
              checked={this.state.executeQueryOnChange}
              onChange={this.switchExecuteQuery}
              name="checkDebugExecute"
            />
          }
          label="Execute Query"
        />
      );
    }
  }

  setDebugWindow() {
    if (this.state.openModal) {
      this.setState({ openModal: false });
    } else {
      this.setState({ openModal: true });
    }
  }

  applyDebugWindow = (open: boolean) => {
    if (open) {
      this.setState({ openModal: true });
    } else {
      this.setState({ openModal: false });
    }
  };

  render() {
    return (
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Debug Info: </Grid>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.headlessRelevanceInspector.state.isEnabled}
                  onChange={this.switchDebug}
                  name="checkDebug"
                />
              }
              label=""
            />
            {this.getExecuteQueryControl()}
          </FormGroup>
        </Grid>
        {this.headlessRelevanceInspector.state.isEnabled ? (
          <>
            <Avatar style={this.avatarStyle}>
              <BugReportIcon
                onClick={(e) => {
                  this.setDebugWindow();
                }}
              />
            </Avatar>
            <RelevanceInspectorWindow
              open={this.state.openModal}
              setOpen={this.applyDebugWindow}
              json={this.headlessRelevanceInspector.state}
            ></RelevanceInspectorWindow>
          </>
        ) : (
          <></>
        )}
      </Typography>
    );
  }
}
