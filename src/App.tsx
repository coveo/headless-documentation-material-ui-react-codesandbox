import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SearchBox from "./Components/SearchBox";
import QuerySummary from "./Components/QuerySummary";
import ResultList from "./Components/ResultList";
import Pager from "./Components/Pager";
import ResultsPerPage from "./Components/ResultsPerPage";
import { AnalyticsActions, SearchActions } from "@coveo/headless";
import { headlessEngine } from "./Engine";

export default class App extends React.Component {
  componentDidMount() {
    const { dispatch } = headlessEngine;
    const action = SearchActions.executeSearch(
      AnalyticsActions.logInterfaceLoad()
    ) as any;
    dispatch(action);
  }

  render() {
    return (
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Coveo Headless + Material UI
          </Typography>
          <SearchBox />
          <QuerySummary />
          <ResultList />
          <Box my={4}>
            <Grid container>
              <Grid item xs={6}>
                <Pager />
              </Grid>
              <Grid item xs={6}>
                <ResultsPerPage />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
}
