import {
  buildInteractiveResult,
  InteractiveResult,
  Result
} from "@coveo/headless";
import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { headlessEngine } from "../Engine";

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

interface ILinkProps {
  result: Result;
}

export default class ResultLink extends React.Component<ILinkProps, {}> {
  private interactiveResult: InteractiveResult;
  private result: Result;

  constructor(props: ILinkProps) {
    super(props);
    this.result = props.result;
    this.interactiveResult = buildInteractiveResult(headlessEngine, {
      options: { result: props.result }
    });
  }

  render() {
    return (
      <ListItem disableGutters>
        <ListItemLink
          disableGutters
          href={this.result.clickUri}
          target="_blank"
          onClick={() => this.interactiveResult.select()}
        >
          <ListItemText
            primary={this.result.title}
            secondary={this.result.excerpt}
          />
        </ListItemLink>
      </ListItem>
    );
  }
}
