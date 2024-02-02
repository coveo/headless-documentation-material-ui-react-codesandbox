import { buildQueryExpression, TabOptions, TabProps } from "@coveo/headless";

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

export const intelProps: TabProps = {
  initialState: { isActive: false },
  options: intelOptions,
};

export const Amd_Props: TabProps = {
  initialState: { isActive: false },
  options: Amd_Options,
};

export const anyProps: TabProps = {
  initialState: { isActive: true },
  options: anyOptions,
};
