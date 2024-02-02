import React from "react";
import SearchBox from "./Components/SearchBox";
import QuerySummary from "./Components/QuerySummary";
import ResultList from "./Components/ResultList";
import Pager from "./Components/Pager";
import Facet from "./Components/Facet";
import ResultsPerPage from "./Components/ResultsPerPage";
import FacetBreadcrumbs from "./Components/FacetBreadcrumbs";
import { loadSearchAnalyticsActions, loadSearchActions } from "@coveo/headless";
import headlessEngine from "./Engine";
import Sort from "./Components/Sort";
import { Box, Container, Grid, Typography } from "@mui/material";
import TabBar, { intelProps, Amd_Props, anyProps } from "./Components/Tab/Tab";
import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import test from "./Test";
// import Test from "./Test";
import Tab from "@mui/material/Tab";

export default class App extends React.Component<
  any,
  { currentTabIndex: number }
> {
  // currentTabIndex = 0;

  constructor(props: any) {
    super(props);
    // this.setState({
    //   currentTabIndex: 0,
    // });
    this.state = { currentTabIndex: 1 };
    console.log(this.state.currentTabIndex);
    console.log(3418952304956234);
  }

  componentDidMount() {
    const { logInterfaceLoad } = loadSearchAnalyticsActions(headlessEngine);
    const { executeSearch } = loadSearchActions(headlessEngine);

    headlessEngine.dispatch(executeSearch(logInterfaceLoad()));
  }

  handleTabChange = (e: any, tabIndex: number) => {
    // this.currentTabIndex = tabIndex;
    this.setState({
      currentTabIndex: tabIndex,
    });
    console.log("index: ", this.state.currentTabIndex);
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

        <Tabs
          value={this.state.currentTabIndex}
          onChange={this.handleTabChange}
        >
          <Tab label="1" />
          <Tab label="2" />
        </Tabs>

        <Tabs
          value={this.state.currentTabIndex}
          onChange={this.handleTabChange}
        >
          <Tab label="0" />
          <Tab label="1" />
          <Tab label="2" />
          <Tab label="3" />

          <TabBar
            initialState={anyProps.initialState!}
            options={anyProps.options!}
          />
          <TabBar
            initialState={intelProps.initialState!}
            options={intelProps.options!}
          />
          <TabBar
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
