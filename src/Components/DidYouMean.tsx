import React, { Component } from "react";
import { headlessEngine } from "../Engine";
import { buildDidYouMean } from "@coveo/headless";

class DidYouMean extends Component {
  constructor(props) {
    super(props);
    this.headlessDidYouMean = buildDidYouMean(headlessEngine);
    this.state = this.headlessDidYouMean.state;
  }

  componentDidMount() {
    this.headlessDidYouMean.subscribe(() => {
      this.setState(this.headlessDidYouMean.state);
    });
  }

  render() {
    if (this.state.hasQueryCorrection) {
      return (
        <div>
          Text was corrected to:{" "}
          <b>{this.state.queryCorrection.correctedQuery}</b>
        </div>
      );
    }
    if (this.state.wasAutomaticallyCorrected) {
      return (
        <div>
          <p>
            No results for{" "}
            <b>{this.state.queryCorrection.wordCorrection[0].originalWord}</b>
          </p>
          <p>
            Query was automatically corrected to{" "}
            <b>{this.state.wordCorrection.correctedWord}</b>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DidYouMean;
