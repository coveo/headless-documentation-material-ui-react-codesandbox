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
import {
  Tab,
  intelTab as IntelTabController,
  AMD_Tab as AMD_TabController,
} from "./Components/Tab";
export default class App extends React.Component {
  componentDidMount() {
    const { logInterfaceLoad } = loadSearchAnalyticsActions(headlessEngine);
    const { executeSearch } = loadSearchActions(headlessEngine);

    headlessEngine.dispatch(executeSearch(logInterfaceLoad()));
  }

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
        <div>
          ici?
          <Tab controller={IntelTabController}>
            {/* <span className="material-symbols-outlined">barefoot</span> */}
            Intel
          </Tab>
          <Tab controller={AMD_TabController}>
            {/* <span className="material-symbols-outlined">apparel</span> */}
            AMD
          </Tab>
        </div>
        <SearchBox />
        <Box my={1}>
          <FacetBreadcrumbs />
          <Grid container>
            <Grid item xs={4}>
              <Facet title="Brand" field="ec_brand" />
              <Facet title="Frequencies" field="eng_frequencies" />
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
