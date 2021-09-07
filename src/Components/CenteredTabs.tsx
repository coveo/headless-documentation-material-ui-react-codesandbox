import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";

export default class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue });
  };

  render() {
    return (
      <Paper>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          centered
        >
          {this.props.children}
        </Tabs>
      </Paper>
    );
  }
}
