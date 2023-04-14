import { buildSearchEngine, buildContext, getOrganizationEndpoints } from "@coveo/headless";

const headlessEngine = buildSearchEngine({
  configuration: {
    organizationId: "barcagroupproductionkwvdy6lp",
    accessToken: "xx5a7943ef-ea52-42e5-8742-51198cc651f7",
    organizationEndpoints: getOrganizationEndpoints('barcagroupproductionkwvdy6lp')
  },
});

buildContext(headlessEngine).add("website", "engineering");

export default headlessEngine;
