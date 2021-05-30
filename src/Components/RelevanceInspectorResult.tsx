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
import { Result } from "@coveo/headless";
import BugReportIcon from "@material-ui/icons/BugReport";
import RelevanceInspectorWindow from "../Components/RelevanceInspectorWindow";

interface IDebugProps {
  result: Result;
  index: number;
}

export default class RelevanceInspectorResult extends React.Component<
  IDebugProps,
  {}
> {
  private headlessRelevanceInspector: RelevanceInspectorType;
  private result: Result;
  private index: number;
  state: RelevanceInspectorState & {
    openModal: false;
  };

  constructor(props: IDebugProps) {
    super(props);
    this.result = props.result;
    this.index = props.index;
    this.headlessRelevanceInspector = buildRelevanceInspector(headlessEngine, {
      options: {
        automaticallyLogInformation: false
      }
    });
    this.state = {
      ...this.headlessRelevanceInspector.state,
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

  debug() {
    return this.headlessRelevanceInspector.state.isEnabled;
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

  getJson = () => {
    return this.headlessRelevanceInspector.state.rankingInformation[this.index]
      .ranking;
  };

  render() {
    return (
      <>
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
              expandAll={true}
              setOpen={this.applyDebugWindow}
              json={this.getJson()}
            ></RelevanceInspectorWindow>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
