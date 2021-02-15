import { Result, ResultAnalyticsActions } from "@coveo/headless";
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
  private result: Result;
  private wasOpened: Boolean;

  constructor(props: ILinkProps) {
    super(props);
    this.result = props.result;
    this.wasOpened = false;
  }

  onOpen = () => {
    if (this.wasOpened) {
      return;
    }
    this.wasOpened = true;
    headlessEngine.dispatch(
      ResultAnalyticsActions.logDocumentOpen(this.result)
    );
  };

  render() {
    return (
      <ListItem disableGutters>
        <ListItemLink
          disableGutters
          href={this.result.clickUri}
          target="_blank"
          onClick={this.onOpen}
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
