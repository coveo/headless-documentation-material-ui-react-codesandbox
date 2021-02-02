/* eslint-disable no-use-before-define */
import React from "react";
import List from "@material-ui/core/List";
import { Box } from "@material-ui/core";
import ResultLink from "./ResultLink";
import Divider from "@material-ui/core/Divider";
import {
  buildResultList,
  ResultList as ResultListType,
  ResultTemplatesManager,
  buildResultTemplatesManager,
  Result,
  ResultListState,
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

export default class ResultList extends React.Component {
  private headlessResultList: ResultListType;
  private headlessResultTemplateManager: ResultTemplatesManager;
  state: ResultListState;

  constructor(props: any) {
    super(props);

    this.headlessResultList = buildResultList(headlessEngine);

    this.state = this.headlessResultList.state;

    this.headlessResultTemplateManager = buildResultTemplatesManager(
      headlessEngine
    );
    this.headlessResultTemplateManager.registerTemplates({
      conditions: [],
      content: (result: Result) => (
        <Box key={result.uniqueId}>
          <ResultLink result={result} />
          <Divider />
        </Box>
      ),
    });
  }

  componentDidMount() {
    this.headlessResultList.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessResultList.state);
  }

  render() {
    return (
      <List>
        {this.state.results.map((result: Result) => {
          const template: any = this.headlessResultTemplateManager.selectTemplate(
            result
          );
          return template(result);
        })}
      </List>
    );
  }
}
