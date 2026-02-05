import headlessEngine from "../Engine";
import { buildTab, TabProps, Tab as HeadlessTab, TabState } from "@coveo/headless";
import React from "react";
import { Tab as MaterialTab } from "@mui/material";

interface CoveoTabProps extends TabProps {
  value: number;
  onTabSelect: (index: number) => void;
}

export default class Tab extends React.Component<CoveoTabProps, TabState> {
  private headlessTab: HeadlessTab;

  constructor(props: CoveoTabProps) {
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

  handleClick = () => {
    this.headlessTab.select();
    this.props.onTabSelect(this.props.value);
  };

  render() {
    const isActive = this.headlessTab.state.isActive;
    return (
      <MaterialTab
        style={{ color: "blue" }}
        disabled={isActive}
        onClick={this.handleClick}
        label={this.props.options.id}
        value={this.props.value}
      />
    );
  }
}
