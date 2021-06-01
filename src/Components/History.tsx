import React, { Component } from "react";
import {
  buildHistoryManager,
  HistoryManager as HeadlessHistoryManager,
  HistoryManagerState,
  Unsubscribe
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

class History extends Component<{}, HistoryManagerState> {
  private controller!: HeadlessHistoryManager;
  private unsubscribe: Unsubscribe = () => {};

  componentDidMount() {
    this.controller = buildHistoryManager(headlessEngine);
    this.updateState();

    this.unsubscribe = this.controller.subscribe(() => this.updateState());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  private updateState() {
    this.setState(this.controller.state);
  }

  render() {
    if (!this.state) {
      return null;
    }

    return (
      <div>
        <button
          disabled={this.state.past.length === 0}
          onClick={() => this.controller.back()}
        >
          Back
        </button>
        <button
          disabled={this.state.future.length === 0}
          onClick={() => this.controller.forward()}
        >
          Forward
        </button>
      </div>
    );
  }
}

export default History;
