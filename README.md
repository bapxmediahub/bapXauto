# bapXauto

`bapXauto` is a ChatGPT/Codex app for agencies and solo businesses that need one command center for client reporting, billing checks, social and Meta insights, website operations, recommendations, and approval-gated communication.

The product name is case-sensitive: use `bapXauto` exactly.

## Current State

- Canonical repository: `bapxmediahub/bapXauto`
- Current branch: `codex/bapxauto-ui-command-center`
- Product phase: UI-first command center prototype
- App direction: ChatGPT Apps SDK `interactive-decoupled` app with a React widget and small MCP tools
- Backend state: no live custom MCP server yet
- Safety state: external actions stay human-approval-gated
- Official logo asset: `src/assets/bapx-logo.png`

The current UI is a Vite + React dashboard that models:

- client workflow queue
- Gmail report and invoice evidence
- Drive/Sheets, Calendar, Data Analytics, Creative Production, and Product Design lanes
- approval-gated Gmail draft action
- reporting, billing, insights, recommendations, audit trail, and future MCP command areas

## Operating Rules

- GitHub issues are the source of truth for product work.
- Implementation should happen on scoped branches and land through pull requests.
- Research and audit findings must become GitHub issues before implementation.
- Use existing Codex plugins, skills, and GitHub open-source MCPs before building custom integrations.
- Treat Postiz and similar tools as competitor or gap references only.
- Do not claim live sending, posting, billing, Meta, or MCP capabilities until they exist and are verified.

## Installed Codex Lanes

The current product plan assumes these existing Codex/plugin lanes are wired first:

- Gmail: mailbox workflow discovery, evidence, and draft communication
- Google Drive / Sheets: reports, invoices, assets, and source data
- Google Calendar: review cadence and approval scheduling
- Data Analytics: KPI checks, reports, dashboards, and recommendations
- Creative Production: campaign and content recommendations
- Product Design: UI/UX concepting and product flow review
- GitHub: issues, pull requests, review, and project maintenance

## GitHub Issues

Track and maintain product work in GitHub Issues:

[https://github.com/bapxmediahub/bapXauto/issues](https://github.com/bapxmediahub/bapXauto/issues)

## Local Development

Install dependencies:

```powershell
npm.cmd install
```

Run the app:

```powershell
npm.cmd run dev -- --port 5173
```

Build:

```powershell
npm.cmd run build
```

Use `npm.cmd` on Windows because PowerShell may block `npm.ps1`.

## Verification Status

Latest subagent browser audit:

- `npm.cmd install`: completed
- `npm.cmd run build`: passed
- Browser verification: passed at `1280x800` and `390x844`
- UI smoke checks: search, client selection, approval gate, Gmail draft enabled/disabled state, sidebar navigation
- Follow-up issues created: #8 and #9
- Issue #8 responsive/accessibility fixes: implemented by worker subagent and build-verified
- Issue #9 nav/action honesty fixes: implemented locally with view summaries and visible prototype-safe status feedback

## Architecture Direction

Recommended app archetype: `interactive-decoupled`.

Planned shape:

- read-only data tools return `structuredContent`
- render tools attach ChatGPT widget resources only when UI is needed
- mutating tools are split from read tools
- publishing, email sending, invoice sending, billing updates, ad/campaign changes, and client-facing communication require human approval
- future custom MCP/server name remains `bapx-automation`

## OSS MCP Research Direction

Evaluate GitHub open-source options before custom work:

- Google Workspace and Analytics MCPs for reporting and client data
- Search Console MCPs for SEO/reporting
- Stripe and QuickBooks MCPs for billing
- WordPress and Lighthouse MCPs for website management/audits
- Meta Ads and Instagram/Facebook MCPs for social and ads workflows
- Activepieces or n8n only when repeatable background automation is needed

## Next CTO Priorities

1. Create a draft PR for the UI shell with build/browser proof.
2. Use CodeRabbit review if CLI/auth is available.
3. Continue architecture work from issues #3 through #7 before creating custom MCP code.
4. Evaluate OSS MCP candidates in issue #6 before creating `bapx-automation`.
