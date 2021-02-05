/* eslint-disable no-use-before-define */
import React from "react";
import { Tab as MaterialUITab, TabProps } from "@material-ui/core/";
import { buildTab, ConfigurationActions, Tab, TabState } from "@coveo/headless";
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
      },
    });
    this.state = this.headlessTab.state;
    if (this.props.selected) {
      this.setOriginLevel2();
    }
  }

  componentDidMount() {
    this.headlessTab.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessTab.state);
  }

  selectTab = () => {
    this.setOriginLevel2();
    this.headlessTab.select();
  };

  setOriginLevel2 = () => {
    headlessEngine.dispatch(
      ConfigurationActions.setOriginLevel2({ originLevel2: this.props.id })
    );
  };

  render() {
    return (
      <div onClick={this.selectTab}>
        <MaterialUITab {...this.props} />
      </div>
    );
  }
}
