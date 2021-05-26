/* eslint-disable no-use-before-define */
import React from "react";
import {
  buildRelevanceInspector,
  RelevanceInspector as RelevanceInspectorType,
  RelevanceInspectorState
} from "@coveo/headless";
import { headlessEngine } from "../Engine";
import { Avatar } from "@material-ui/core";
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
  _isMounted = false;
  private headlessRelevanceInspector: RelevanceInspectorType;
  state: RelevanceInspectorState & {
    openModal: false;
  };

  constructor(props: IDebugProps) {
    super(props);
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
    this._isMounted = true;
    this.headlessRelevanceInspector.subscribe(() => this.updateState());
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.headlessRelevanceInspector.subscribe(() => {});
  }

  updateState() {
    if (this._isMounted) {
      this.setState(this.headlessRelevanceInspector.state);
    }
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
    return this.headlessRelevanceInspector.state.rankingInformation;
  };

  render() {
    return (
      <>
        {this.headlessRelevanceInspector.state.isEnabled ? (
          <>
            <Avatar style={this.avatarStyle}>
              <BugReportIcon
                onClick={() => {
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
