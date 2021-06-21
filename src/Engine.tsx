import { buildSearchEngine, getSampleSearchEngineConfiguration } from "@coveo/headless";

export const headlessEngine = buildSearchEngine({
  configuration: getSampleSearchEngineConfiguration()
});