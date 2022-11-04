/* eslint-disable no-use-before-define */
import React from "react";
import {
  buildSearchBox,
  SearchBox as SearchBoxType,
  SearchBoxState,
} from "@coveo/headless";
import headlessEngine from "../Engine";
import {
  Autocomplete,
  Container,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";

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
            close: "</strong>",
          },
          correctionDelimiters: {
            open: "<i>",
            close: "</i>",
          },
        },
      },
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
        options={this.state.suggestions.map((s) => s.rawValue)}
        freeSolo
        style={{ width: "auto" }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => this.headlessSearchBox.submit()}
                >
                  <Search />
                </IconButton>
              ),
            }}
          />
        )}
      />
    );
  }
}
