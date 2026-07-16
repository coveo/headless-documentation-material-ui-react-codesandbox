---
applyTo: "src/Components/**"
---

# Component Instructions

Components in this directory each wrap a single Coveo Headless controller.

## Pattern

1. Import the controller builder from `@coveo/headless`
2. Import the shared engine from `../Engine`
3. Build the controller instance at module level
4. Create a class component that subscribes to the controller in `componentDidMount`
5. Unsubscribe in `componentWillUnmount`
6. Render MUI components based on `controller.state`

## Rules

- Keep components focused on a single controller
- Use MUI components for all UI rendering
- Do not introduce hooks — use class components to match the documentation
- Keep logic minimal — this is a demo, not production code
- Type component state explicitly with a `State` type
