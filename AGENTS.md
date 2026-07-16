# AGENTS.md

## Project Summary

This is a **demo/documentation repository** showcasing [Coveo Headless](https://docs.coveo.com/en/headless/latest/) with Material UI (MUI) and React. It serves as an interactive code sample for the Coveo documentation site — users can fork it to learn how to build a search interface using Coveo's headless controllers.

This is not a production application. It has no tests, no backend, and no deployment pipeline beyond branch creation for version bumps.

## Tech Stack

- **Runtime:** Node.js v25 (see `.nvmrc`)
- **Framework:** React 19 with TypeScript
- **UI Library:** MUI (Material UI) v9
- **Search Engine:** Coveo Headless (`@coveo/headless`)
- **Build Tool:** Vite 8
- **Package Manager:** npm

## Setup

```bash
nvm use           # Switch to Node v25
npm install       # Install dependencies
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local dev server (Vite) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

There are no test or lint commands configured.

## Project Structure

```
src/
├── index.tsx          # App entry point, renders React root with MUI theme
├── App.tsx            # Main layout: tabs, search box, facets, result list, pager
├── Engine.tsx         # Coveo Headless engine configuration (org ID + API key)
├── theme.tsx          # MUI theme customization (colors, typography, spacing)
└── Components/
    ├── SearchBox.tsx       # Search input using Headless SearchBox controller
    ├── ResultList.tsx      # Renders search results
    ├── ResultLink.tsx      # Individual result link component
    ├── Facet.tsx           # Facet filter (brand, color, category)
    ├── FacetBreadcrumbs.tsx # Shows active facet selections
    ├── Pager.tsx           # Pagination controls
    ├── QuerySummary.tsx    # "Showing X results for Y" summary
    ├── ResultsPerPage.tsx  # Results per page selector
    ├── Sort.tsx            # Sort order selector
    └── Tab.tsx             # Tab-based content filtering
```

## Architecture Pattern

Each component in `src/Components/` follows the same pattern:
1. Import a Headless controller builder (e.g., `buildSearchBox`)
2. Instantiate the controller with the shared `headlessEngine` from `Engine.tsx`
3. Subscribe to controller state updates
4. Render MUI components based on controller state

The app uses **class components** (not hooks). This is intentional — it mirrors the documentation examples.

## Key Files

- **`src/Engine.tsx`** — Central engine config. The `accessToken` here is a public sample API key for the Coveo demo organization.
- **`.github/workflows/createNewCodeSandBoxDemo.yml`** — Automated workflow that creates a new branch when a new Headless version is released.
- **`renovate.json5`** — Dependency updates via Renovate using Coveo shared presets.

## Code Conventions

- Components use PascalCase filenames
- One component per file
- Class components with explicit state types
- MUI's `Grid`, `Box`, `Typography` for layout (no raw HTML/CSS)
- Imports from `@coveo/headless` use named exports
- No semicolons are omitted — semicolons are always used

## When Making Changes

- Keep components simple — this is documentation, not production code
- Don't add testing infrastructure (this is a demo)
- Don't abstract or over-engineer — clarity over DRY
- Match the existing class component pattern unless migrating the whole app
- Keep the single-engine, single-file-per-component structure
- If updating Headless API usage, check the [Headless migration guide](https://docs.coveo.com/en/headless/latest/)
