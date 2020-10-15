/* eslint-disable no-use-before-define */
import React from "react";
import List from "@material-ui/core/List";
import { ListItem, ListItemText, Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {
  buildResultList,
  ResultTemplatesManager,
  Result,
  ResultListState,
  ResultList as ResultListType
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

type Template = (result: Result) => any;

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export default class ResultList extends React.Component {
  private headlessResultList: ResultListType;
  private headlessResultTemplateManager: ResultTemplatesManager<Template>;
  state: ResultListState;

  constructor(props: any) {
    super(props);

    this.headlessResultList = buildResultList(headlessEngine);

    this.state = this.headlessResultList.state;

    this.headlessResultTemplateManager = new ResultTemplatesManager<Template>(
      headlessEngine
    );
    this.headlessResultTemplateManager.registerTemplates({
      conditions: [],
      content: (result: Result) => (
        <Box key={result.uniqueId}>
          <ListItem disableGutters>
            <ListItemLink disableGutters href={result.clickUri} target="_blank">
              <ListItemText primary={result.title} secondary={result.excerpt} />
            </ListItemLink>
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

  render() {
    return (
      <List>
        {this.state.results.map((result: Result) => {
          const template = this.headlessResultTemplateManager.selectTemplate(
            result
          );
          return template ? template(result) : null;
        })}
      </List>
    );
  }
}
