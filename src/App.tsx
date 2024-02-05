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

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { currentTabIndex: 0 };
  }

  componentDidMount() {
    const { logInterfaceLoad } = loadSearchAnalyticsActions(headlessEngine);
    const { executeSearch } = loadSearchActions(headlessEngine);

    headlessEngine.dispatch(executeSearch(logInterfaceLoad()));
  }

  handleTabChange = (e: any, tabIndex: number) => {
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
        <Tabs onChange={this.handleTabChange}>
          <Tab
            initialState={anyProps.initialState!}
            options={anyProps.options!}
          />
          <Tab
            initialState={intelProps.initialState!}
            options={intelProps.options!}
          />
          <Tab
            initialState={Amd_Props.initialState!}
            options={Amd_Props.options!}
          />
        </Tabs>
        <SearchBox />
        <Box my={1}>
          <FacetBreadcrumbs />
          <Grid container>
            <Grid item xs={4}>
              <Facet title="Brand" field="ec_brand" />
              <Facet title="Processor" field="eng_processor" />
              <Facet title="Store name" field="store_name" />
            </Grid>
            <Grid item xs={8}>
              <Grid container my={3} alignItems="center">
                <Grid item xs={8}>
                  <QuerySummary />
                </Grid>
                <Grid item xs={4}>
                  <Sort />
                </Grid>
              </Grid>
              <ResultList />
              <Box my={4}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Pager />
                  </Grid>
                  <Grid item xs={6}>
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

const filterIntelProcessor = buildQueryExpression()
  .addStringField({
    field: "eng_processor",
    operator: "contains",
    values: ["Intel"],
  })
  .toQuerySyntax();

const filterAmdProcessor = buildQueryExpression()
  .addStringField({
    field: "eng_processor",
    operator: "contains",
    values: ["AMD"],
  })
  .toQuerySyntax();

const noFilter = buildQueryExpression()
  .addStringField({
    field: "store_name",
    operator: "contains",
    values: ["Barca"],
  })
  .toQuerySyntax();

const intelOptions: TabOptions = {
  id: "Intel",
  expression: filterIntelProcessor,
};

const Amd_Options: TabOptions = {
  id: "AMD",
  expression: filterAmdProcessor,
};

const anyOptions: TabOptions = {
  id: "Any",
  expression: noFilter,
};

const intelProps: TabProps = {
  initialState: { isActive: false },
  options: intelOptions,
};

const Amd_Props: TabProps = {
  initialState: { isActive: false },
  options: Amd_Options,
};

const anyProps: TabProps = {
  initialState: { isActive: true },
  options: anyOptions,
};
