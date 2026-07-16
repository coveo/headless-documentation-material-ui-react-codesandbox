# Coveo Headless + Material UI + React

An interactive demo showcasing how to build a search interface using [Coveo Headless](https://docs.coveo.com/en/headless/latest/) with [Material UI](https://mui.com/) and React.

This repo serves as a companion code sample for the [Coveo documentation](https://docs.coveo.com/en/headless/latest/). Fork it to experiment with Headless controllers in a pre-configured environment.

## Prerequisites

- [Node.js v25](https://nodejs.org/) (see `.nvmrc`)
- npm

## Getting Started

```bash
nvm use
npm install
npm run dev
```

Open the local URL printed in your terminal to see the search interface.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Serve the production build locally |

## Project Structure

```
src/
├── index.tsx          # Entry point — React root with MUI ThemeProvider
├── App.tsx            # Main layout: tabs, search, facets, results, pager
├── Engine.tsx         # Coveo Headless engine configuration
├── theme.tsx          # MUI theme (colors, typography, spacing)
└── Components/        # One component per Headless controller
    ├── SearchBox.tsx
    ├── ResultList.tsx
    ├── ResultLink.tsx
    ├── Facet.tsx
    ├── FacetBreadcrumbs.tsx
    ├── Pager.tsx
    ├── QuerySummary.tsx
    ├── ResultsPerPage.tsx
    ├── Sort.tsx
    └── Tab.tsx
```

## How It Works

Each component wraps a Coveo Headless controller and renders its state using Material UI. The shared search engine is instantiated in `src/Engine.tsx` and connects to the Coveo sample organization.

Components use class-based React to align with the documentation examples.

## Related Resources

- [Coveo Headless Documentation](https://docs.coveo.com/en/headless/latest/)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/)
- [Coveo Headless GitHub](https://github.com/coveo/ui-kit/tree/master/packages/headless)
