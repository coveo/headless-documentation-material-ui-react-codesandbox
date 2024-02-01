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

const noFilter = buildQueryExpression()
  .addStringField({
    field: "",
    operator: "contains",
    values: [""],
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

const allOptions: TabOptions = {
  id: "All",
  expression: noFilter,
};

export const intelProps: TabProps = {
  initialState: { isActive: false },
  options: intelOptions,
};

export const AMD_Props: TabProps = {
  initialState: { isActive: false },
  options: AMD_Options,
};

export const allProps: TabProps = {
  initialState: { isActive: false },
  options: allOptions,
};
