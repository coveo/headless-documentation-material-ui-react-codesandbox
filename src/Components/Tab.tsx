import headlessEngine from "../Engine";
import {
  buildQueryExpression,
  buildTab,
  TabOptions,
  TabProps,
  Tab as HeadlessTab,
  TabInitialState,
} from "@coveo/headless";
import { PropsWithChildren } from "react";
import React from "react";

export interface ITabProps {
  initialState: TabInitialState;
  options: TabOptions;
}
export default class Tab extends React.Component<ITabProps> {
  //   PropsWithChildren<{}>
  private headlessTab: HeadlessTab;
  constructor(props: any) {
    super(props);
    this.headlessTab = buildTab(headlessEngine, props);
    this.state = this.headlessTab.state;
  }

  componentDidMount() {
    this.headlessTab.subscribe(() => this.updateState());
    // this.setState({isActive: true})
  }

  updateState() {
    this.setState(this.headlessTab.state);
  }

  render() {
    return (
      <button
        // disabled={this.componentDidMount()}
        disabled={this.headlessTab.state.isActive}
        onClick={() => {
          this.headlessTab.select();
        }}
      >
        {/* {this.props.children} */}
      </button>
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

const filterAMDProcessor = buildQueryExpression()
  .addStringField({
    field: "eng_processor",
    operator: "contains",
    values: ["AMD"],
  })
  .toQuerySyntax();

const intelOptions: TabOptions = {
  id: "intel",
  expression: filterIntelProcessor,
};

const AMD_Options: TabOptions = {
  id: "AMD",
  expression: filterAMDProcessor,
};

export const intelProps: TabProps = {
  initialState: { isActive: false },
  options: intelOptions,
};

const AMD_Props: TabProps = {
  initialState: { isActive: false },
  options: AMD_Options,
};

//  buildTab(headlessEngine, intelProps);
// export const AMD_Tab: HeadlessTab = buildTab(headlessEngine, AMD_Props);
