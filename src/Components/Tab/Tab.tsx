import headlessEngine from "../../Engine";
import { buildTab, TabProps, Tab as HeadlessTab } from "@coveo/headless";
import React from "react";
import "./Tab.css";
export default class Tab extends React.Component<TabProps> {
  private headlessTab: HeadlessTab;
  constructor(props: any) {
    super(props);
    this.headlessTab = buildTab(headlessEngine, props);
    this.state = this.headlessTab.state;
  }

  componentDidMount() {
    this.headlessTab.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessTab.state);
  }

  render() {
    return (
      <button
        className="tabBar"
        disabled={this.headlessTab.state.isActive}
        onClick={() => {
          this.headlessTab.select();
        }}
      >
        {this.props.options.id}
      </button>
    );
  }
}
