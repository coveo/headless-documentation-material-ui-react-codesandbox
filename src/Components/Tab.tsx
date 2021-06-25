/* eslint-disable no-use-before-define */
import React from "react";
import { Tab as MaterialUITab, TabProps } from "@material-ui/core/";
import { buildTab, Tab, TabState } from "@coveo/headless";
import { headlessEngine } from "../Engine";

interface ITabProps extends TabProps {
  id: string;
  expression: string;
  selected?: boolean;
}

export default class HeadlessTab extends React.Component<ITabProps, {}> {
  private headlessTab: Tab;
  state: TabState;

  constructor(props: any) {
    super(props);

    this.headlessTab = buildTab(headlessEngine, {
      options: {
        expression: this.props.expression,
        id: this.props.id,
      },
    });
    this.state = this.headlessTab.state;
  }

  componentDidMount() {
    this.headlessTab.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessTab.state);
  }

  selectTab = () => {
    this.headlessTab.select();
  };

  render() {
    return (
      <div onClick={this.selectTab}>
        <MaterialUITab {...this.props} />
      </div>
    );
  }
}
