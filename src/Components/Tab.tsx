import headlessEngine from "../Engine";
import {
  buildQueryExpression,
  buildTab,
  TabOptions,
  TabProps,
  Tab as HeadlessTab,
} from "@coveo/headless";

import { useState, useEffect, PropsWithChildren } from "react";
import React from "react";

interface CustomProps extends PropsWithChildren {
  controller: HeadlessTab;
}

export const Tab: React.FC<CustomProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () =>
      controller.subscribe(() => {
        setState(controller.state);
      }),
    [controller]
  );

  return (
    <button
      disabled={state.isActive}
      onClick={() => {
        controller.select();
      }}
    >
      {props.children}
    </button>
  );
};

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
  id: "intel",
  expression: filterIntelProcessor,
};

const AMD_Options: TabOptions = {
  id: "AMD",
  expression: filterAMDProcessor,
};

const intelProps: TabProps = {
  initialState: { isActive: false },
  options: intelOptions,
};

const AMD_Props: TabProps = {
  initialState: { isActive: false },
  options: AMD_Options,
};

export const intelTab: HeadlessTab = buildTab(headlessEngine, intelProps);
export const AMD_Tab: HeadlessTab = buildTab(headlessEngine, AMD_Props);
