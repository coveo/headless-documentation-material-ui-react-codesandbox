import { buildQueryExpression, TabOptions, TabProps } from "@coveo/headless";

const filterIntelProcessor = buildQueryExpression()
  .addStringField({
    field: "eng_processor",
    operator: "contains",
    values: ["Intel"],
  })
  .toQuerySyntax();

const filterAMDProcessor = buildQueryExpression()
  .addStringField({
    field: "eng_processor",
    operator: "contains",
    values: ["AMD"],
  })
  .toQuerySyntax();

const intelOptions: TabOptions = {
  id: "Intel",
  expression: filterIntelProcessor,
};

const AMD_Options: TabOptions = {
  id: "AMD",
  expression: filterAMDProcessor,
};

export const intelProps: TabProps = {
  initialState: { isActive: false },
  options: intelOptions,
};

export const AMD_Props: TabProps = {
  initialState: { isActive: false },
  options: AMD_Options,
};
