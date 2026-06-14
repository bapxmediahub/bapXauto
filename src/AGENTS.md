# Frontend Source

## Purpose

Owns the React frontend for the `bapXauto` command center.

## Ownership

- Keep UI source, mock data, local state, and frontend-only helpers in this subtree.
- Root `AGENTS.md` owns repo-wide DOX rules.

## Local Contracts

- Build a usable internal operations UI, not a marketing landing page.
- Present `bapXauto` as a ChatGPT/Codex app command center for agencies and solo businesses, not only a standalone dashboard.
- Model the product around existing Codex plugins: Gmail, Google Drive/Sheets, Google Calendar, Data Analytics, Creative Production, and Product Design.
- Treat `bapx-automation` as a future MCP/API layer only; do not claim live backend capability until it exists and no suitable GitHub open-source MCP/plugin/skill covers the gap.
- Keep report delivery, billing, recommendations, Meta actions, and email sending human-approval-gated.

## Work Guidance

- Use dense but readable dashboard patterns: tables, queues, status chips, detail panels, audit logs, and action bars.
- Use local mock data until a real backend/MCP exists.
- Search GitHub open-source MCPs and existing Codex plugins/skills before adding new integration UI or backend assumptions.
- Keep components focused and reusable.
- Avoid Postiz cloning; competitor tools may inform gaps only.

## Verification

- Run `npm.cmd run build`.
- Run browser verification against the local app for desktop and mobile-sized viewports.

## Child DOX Index

- No child AGENTS.md files exist yet.
