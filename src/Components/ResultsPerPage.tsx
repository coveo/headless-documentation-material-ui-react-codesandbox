/* eslint-disable no-use-before-define */
import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import {
  buildResultsPerPage,
  ResultsPerPageState,
  ResultsPerPage as ResultPerPageType
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

export default class ResultsPerPage extends React.Component {
  private headlessResultsPerPage: ResultPerPageType;
  state: ResultsPerPageState;

  constructor(props: any) {
    super(props);

    this.headlessResultsPerPage = buildResultsPerPage(headlessEngine, {
      initialState: { numberOfResults: 3 }
    });

    this.state = this.headlessResultsPerPage.state;
  }

  componentDidMount() {
    this.headlessResultsPerPage.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessResultsPerPage.state);
  }

  render() {
    return (
      <FormControl component="fieldset">
        <Typography>Results per page</Typography>
        <RadioGroup
          row
          name="test"
          defaultValue="3"
          onChange={(event) => {
            this.headlessResultsPerPage.set(parseInt(event.target.value, 10));
          }}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
      </FormControl>
    );
  }
}
