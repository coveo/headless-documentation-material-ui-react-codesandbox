/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  buildSearchBox,
  SearchBox as SearchBoxType,
  SearchBoxState
} from "@coveo/headless";
import { headlessEngine } from "../Engine";

export default class SearchBox extends React.Component {
  private headlessSearchBox: SearchBoxType;
  state: SearchBoxState;

  constructor(props: any) {
    super(props);

    this.headlessSearchBox = buildSearchBox(headlessEngine, {
      options: {
        highlightOptions: {
          notMatchDelimiters: {
            open: "<strong>",
            close: "</strong>"
          },
          correctionDelimiters: {
            open: "<i>",
            close: "</i>"
          }
        }
      }
    });
    this.state = this.headlessSearchBox.state;
  }

  componentDidMount() {
    this.headlessSearchBox.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessSearchBox.state);
  }

  render() {
    return (
      <Autocomplete
        inputValue={this.state.value}
        onInputChange={(_, newInputValue) => {
          this.headlessSearchBox.updateText(newInputValue);
        }}
        onChange={() => {
          this.headlessSearchBox.submit();
        }}
        options={this.state.suggestions}
        getOptionLabel={(option) => {
          return typeof option === "object" ? option.rawValue : option;
        }}
        renderOption={(option) => {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: option.highlightedValue }}
            ></div>
          );
        }}
        freeSolo
        style={{ width: "auto" }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            variant="outlined"
            size="small"
          />
        )}
      />
    );
  }
}
