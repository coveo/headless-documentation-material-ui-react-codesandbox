import React from "react";
import {
  Sort as SortType,
  SortState,
  buildSort,
  buildRelevanceSortCriterion,
  buildDateSortCriterion,
  SortOrder,
  SortByRelevancy,
  SortByDate
} from "@coveo/headless";
import { headlessEngine } from "../Engine";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

export default class Sort extends React.Component {
  private headlessSort: SortType;
  state: SortState;
  relevanceSortCriterion: SortByRelevancy = buildRelevanceSortCriterion();
  dateDescendingSortCriterion: SortByDate = buildDateSortCriterion(
    SortOrder.Descending
  );
  dateAscendingSortCriterion: SortByDate = buildDateSortCriterion(
    SortOrder.Ascending
  );

  constructor(props: any) {
    super(props);

    this.headlessSort = buildSort(headlessEngine, {
      initialState: {
        criterion: this.relevanceSortCriterion
      }
    });

    this.state = this.headlessSort.state;
  }

  componentDidMount() {
    this.headlessSort.subscribe(() => this.updateState());
  }

  updateState() {
    this.setState(this.headlessSort.state);
  }

  handleChange(event: any) {
    switch (event.target.value) {
      case "relevance":
        this.headlessSort.sortBy(this.relevanceSortCriterion);
        break;
      case "datedescending":
        this.headlessSort.sortBy(this.dateDescendingSortCriterion);
        break;
      default:
        this.headlessSort.sortBy(this.dateAscendingSortCriterion);
        break;
    }
  }

  render() {
    return (
      <FormControl>
        <NativeSelect onChange={(event: any) => this.handleChange(event)}>
          <option value="relevance">Relevance</option>
          <option value="datedescending">Date Descending</option>
          <option value="dateascending">Date Ascending</option>
        </NativeSelect>
      </FormControl>
    );
  }
}
