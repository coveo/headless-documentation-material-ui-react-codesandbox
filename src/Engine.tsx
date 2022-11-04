import { buildSearchEngine, buildContext } from "@coveo/headless";

const headlessEngine = buildSearchEngine({
  configuration: {
    organizationId: "barcagroupproductionkwvdy6lp",
    accessToken: "xx5a7943ef-ea52-42e5-8742-51198cc651f7",
  },
});

buildContext(headlessEngine).add("website", "engineering");

export default headlessEngine;
