import React from "react";
import SearchBox from "./Components/SearchBox";
import QuerySummary from "./Components/QuerySummary";
import ResultList from "./Components/ResultList";
import Pager from "./Components/Pager";
import Facet from "./Components/Facet";
import ResultsPerPage from "./Components/ResultsPerPage";
import FacetBreadcrumbs from "./Components/FacetBreadcrumbs";
import {
  loadSearchAnalyticsActions,
  loadSearchActions,
  buildQueryExpression,
  TabOptions,
  TabProps,
} from "@coveo/headless";
import headlessEngine from "./Engine";
import Sort from "./Components/Sort";
import { Box, Container, Grid, Typography } from "@mui/material";
import Tab from "./Components/Tab";
import Tabs from "@mui/material/Tabs";

type AppState = {
  currentTabIndex: number;
};

export default class App extends React.Component<{}, AppState> {
  state: AppState = { currentTabIndex: 0 };

  componentDidMount() {
    const { logInterfaceLoad } = loadSearchAnalyticsActions(headlessEngine);
    const { executeSearch } = loadSearchActions(headlessEngine);

    headlessEngine.dispatch(executeSearch(logInterfaceLoad()));
  }

  handleTabSelect = (tabIndex: number) => {
    this.setState({
      currentTabIndex: tabIndex,
    });
  };

  render() {
    return (
      <Container maxWidth="xl">
        <Box my={3}>
          <Typography
            align="center"
            color="text.primary"
            variant="h2"
            component="h2"
            gutterBottom
          >
            Coveo Headless + Material UI
          </Typography>
        </Box>
        <Tabs value={this.state.currentTabIndex}>
          <Tab
            initialState={allProps.initialState!}
            options={allProps.options!}
            value={0}
            onTabSelect={this.handleTabSelect}
          />
          <Tab
            initialState={accessoriesProps.initialState!}
            options={accessoriesProps.options!}
            value={1}
            onTabSelect={this.handleTabSelect}
          />
          <Tab
            initialState={skisBoardsProps.initialState!}
            options={skisBoardsProps.options!}
            value={2}
            onTabSelect={this.handleTabSelect}
          />
        </Tabs>
        <SearchBox />
        <Box my={1}>
          <FacetBreadcrumbs />
          <Grid container spacing={2}>
            <Grid size={4}>
              <Facet title="Brand" field="ec_brand" />
              <Facet title="Color" field="ec_colors" />
              <Facet title="Category" field="ec_category" />
            </Grid>
            <Grid size={8}>
              <Grid container my={3} alignItems="center">
                <Grid size={8}>
                  <QuerySummary />
                </Grid>
                <Grid size={4}>
                  <Sort />
                </Grid>
              </Grid>
              <ResultList />
              <Box my={4}>
                <Grid container alignItems="center">
                  <Grid size={6}>
                    <Pager />
                  </Grid>
                  <Grid size={6}>
                    <ResultsPerPage />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }
}

const filterAccessories = buildQueryExpression()
  .addStringField({
    field: "ec_category",
    operator: "contains",
    values: ["Accessories"],
  })
  .toQuerySyntax();

const filterSkisBoards = buildQueryExpression()
  .addStringField({
    field: "ec_category",
    operator: "contains",
    values: ["Skis"],
  })
  .toQuerySyntax();

const noFilter = "";

const accessoriesOptions: TabOptions = {
  id: "Accessories",
  expression: filterAccessories,
};

const skisBoardsOptions: TabOptions = {
  id: "Skis & Boards",
  expression: filterSkisBoards,
};

const allOptions: TabOptions = {
  id: "All",
  expression: noFilter,
};

const accessoriesProps: TabProps = {
  initialState: { isActive: false },
  options: accessoriesOptions,
};

const skisBoardsProps: TabProps = {
  initialState: { isActive: false },
  options: skisBoardsOptions,
};

const allProps: TabProps = {
  initialState: { isActive: true },
  options: allOptions,
};
