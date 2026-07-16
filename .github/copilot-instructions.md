# Copilot Instructions

This is a documentation demo repo for Coveo Headless + Material UI + React. It is not a production application.

## Context

- The repo demonstrates Coveo Headless controllers rendered with MUI components
- It targets the Coveo sample organization (`barcagroupproductionkwvdy6lp`) with a public API key
- Components use class-based React (intentional, matches documentation style)
- There are no tests, linters, or formatters configured — this is a code sample

## Code Style

- One React component per file in `src/Components/`
- PascalCase file and component names
- Always use semicolons
- Use MUI layout components (`Grid`, `Box`, `Container`) instead of raw HTML
- Named imports from `@coveo/headless`
- TypeScript strict mode enabled

## Review Guidelines

- Ensure changes keep the code simple and readable (this is documentation)
- Flag unnecessary abstractions or over-engineering
- Verify Headless API usage matches current `@coveo/headless` version
- Components should follow the existing pattern: build controller → subscribe → render state
