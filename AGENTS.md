# Rules for agents working in this repo

This is a throwaway trial project. Keep changes small.

## Project rules

- Plain Node, zero dependencies. Do not add anything to `package.json` beyond scripts.
- Code must run on Node 22. Tests use `node --test`; run `npm test` before you finish.
- One module per file under `src/`, one test file per module under `test/`. Modules do not import each other.
- Work only on the files your order names. Do not touch `ops/`, `.github/`, `.config/` or `AGENTS.md`.
- Add a test for every behaviour you add or change. Do not weaken or delete existing tests.
- Each worktree has its own `.env` with a `PORT`; never commit `.env`.
- If an order is unclear, ask the owner instead of guessing.

<!--
The heading below must stay exactly "## 审查要点" ("review points").
agent-autoloop v1.8.3 plugins/delivery/review.ts reads only that heading from AGENTS.md on main;
an English heading is not accepted.
-->

## 审查要点

Review points (English):

- The change stays inside the files the order names; no edits to `ops/`, `.github/`, `.config/`, `AGENTS.md` or `package.json`.
- No runtime dependencies added; code runs on Node 22.
- Every changed behaviour has a test, and no existing test was removed or weakened.
- Errors are thrown with the documented error types (TypeError, RangeError, SyntaxError), not swallowed.
- No secrets, ports or `.env` content committed.
