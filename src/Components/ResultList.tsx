/* eslint-disable no-use-before-define */
import React from "react";
import List from "@material-ui/core/List";
import { Box } from "@material-ui/core";
import ResultLink from "./ResultLink";
import Divider from "@material-ui/core/Divider";
import { ListItem, ListItemText } from "@material-ui/core";
import {
  buildResultList,
  ResultList as ResultListType,
  ResultTemplatesManager,
  buildResultTemplatesManager,
  Result,
  ResultListState
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

export default class ResultList extends React.Component {
  private headlessResultList: ResultListType;
  private headlessResultTemplateManager: ResultTemplatesManager;
  state: ResultListState;

  constructor(props: any) {
    super(props);

    this.headlessResultList = buildResultList(headlessEngine, {
      options: {
        fieldsToInclude: ["date"]
      }
    });

    this.state = this.headlessResultList.state;

    this.headlessResultTemplateManager = buildResultTemplatesManager(
      headlessEngine
    );
    this.headlessResultTemplateManager.registerTemplates({
      conditions: [],
      content: (result: Result, index: number) => (
        <Box key={result.uniqueId}>
          {/* In this implementation, the ResultLink component is
           responsible for logging a 'click' event to Coveo UA */}
          <ResultLink result={result} />
          <ListItem disableGutters>
            <ListItemText secondary={this.getDate(result)} />
          </ListItem>
          <Divider />
        </Box>
      )
    });
  }

  componentDidMount() {
    this.headlessResultList.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessResultList.state);
  }

  componentWillUnmount() {
    this.headlessResultList.subscribe(() => {});
  }

  getDate(result: Result) {
    const date: Date = new Date(result.raw.date);
    return date.toLocaleDateString();
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
