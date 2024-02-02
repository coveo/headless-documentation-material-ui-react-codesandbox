import headlessEngine from "../Engine";
import {
  buildTab,
  TabProps,
  Tab as HeadlessTab,
  buildQueryExpression,
  TabOptions,
} from "@coveo/headless";
import React from "react";
import Tab from "@mui/material/Tab";
export default class TabBar extends React.Component<TabProps> {
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
      <Tab
        style={{ color: "blue" }}
        disabled={this.headlessTab.state.isActive}
        onClick={() => {
          this.headlessTab.select();
        }}
        label={this.props.options.id}
      />
    );
  }
}

const filterIntelProcessor = buildQueryExpression()
  .addStringField({
    field: "eng_processor",
    operator: "contains",
    values: ["Intel"],
  })
  .toQuerySyntax();

const filterAmdProcessor = buildQueryExpression()
  .addStringField({
    field: "eng_processor",
    operator: "contains",
    values: ["AMD"],
  })
  .toQuerySyntax();

const noFilter = buildQueryExpression()
  .addStringField({
    field: "store_name",
    operator: "contains",
    values: ["Barca"],
  })
  .toQuerySyntax();

const intelOptions: TabOptions = {
  id: "Intel",
  expression: filterIntelProcessor,
};

const Amd_Options: TabOptions = {
  id: "AMD",
  expression: filterAmdProcessor,
};

const anyOptions: TabOptions = {
  id: "Any",
  expression: noFilter,
};

export const intelProps: TabProps = {
  initialState: { isActive: false },
  options: intelOptions,
};

export const Amd_Props: TabProps = {
  initialState: { isActive: false },
  options: Amd_Options,
};

export const anyProps: TabProps = {
  initialState: { isActive: true },
  options: anyOptions,
};
