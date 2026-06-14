import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileText,
  FolderOpen,
  Inbox,
  LayoutDashboard,
  Mail,
  Palette,
  ReceiptText,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users,
  WandSparkles,
} from 'lucide-react';
import './styles.css';
import bapxLogo from './assets/bapx-logo.png';

const clients = [
  {
    name: 'Flexi Feet',
    email: 'flexifeetsdnbhd@gmail.com',
    owner: 'BAPX Ops',
    status: 'Needs approval',
    health: 88,
    evidence: 'Monthly Reports + Invoice for Digital Marketing Services',
    report: 'Month Report _ Flexi Happy Feet_March 2025.pdf',
    invoice: 'INV008315.pdf',
    drive: 'Linked',
    calendar: 'Review Jun 30',
    analytics: '+14% reach',
    billing: 'Matched',
    next: 'Approve Gmail draft',
  },
  {
    name: 'Wellness Yash',
    email: 'wellnesswithdryash@gmail.com',
    owner: 'Client Success',
    status: 'Draft ready',
    health: 82,
    evidence: 'Monthly Reports sent with PDF invoices',
    report: 'Monthly report_wellness yashjuly.pdf',
    invoice: 'INV008338.pdf',
    drive: 'Linked',
    calendar: 'Review Jul 01',
    analytics: '+9% profile actions',
    billing: 'Matched',
    next: 'Review recommendation',
  },
  {
    name: 'Nebo Lifestyle Clinic',
    email: 'nebolifestyleclinic@gmail.com',
    owner: 'Reports',
    status: 'Missing report',
    health: 64,
    evidence: 'Monthly Reports & Bills',
    report: 'Not found for current month',
    invoice: 'NEBO-BILL DECEMBER.pdf',
    drive: 'Needs folder',
    calendar: 'Unscheduled',
    analytics: 'Snapshot stale',
    billing: 'Bill found',
    next: 'Link Drive folder',
  },
  {
    name: 'Clair Veda',
    email: 'clairvedaayurclinic@gmail.com',
    owner: 'Analytics',
    status: 'Needs review',
    health: 77,
    evidence: 'Reports, invoice summary, bill format',
    report: 'Monthly Report - April 2025_Clair Veda.pdf',
    invoice: '2025-04-01-2025-05-01_Invoice_summary.pdf',
    drive: 'Linked',
    calendar: 'Review Jun 28',
    analytics: '+21% engagement',
    billing: 'Multiple invoices',
    next: 'Resolve invoice set',
  },
  {
    name: 'Sri Sai',
    email: 'Srisai2018@gmail.com',
    owner: 'BAPX Ops',
    status: 'Ready to send',
    health: 91,
    evidence: 'December report + invoice packet',
    report: 'December2024 Report_Sri Sai Furniture_Coimbaore.pdf',
    invoice: 'INV008281.pdf',
    drive: 'Linked',
    calendar: 'Review Jun 29',
    analytics: 'Search Console linked',
    billing: 'Matched',
    next: 'Create Gmail draft',
  },
];

const plugins = [
  { name: 'Gmail', icon: Mail, state: 'Connected', detail: '8750 inbox messages, sent reports found', accent: 'green' },
  { name: 'Google Drive / Sheets', icon: FolderOpen, state: 'Ready', detail: 'Client folders and report assets lane', accent: 'blue' },
  { name: 'Google Calendar', icon: CalendarDays, state: 'Ready', detail: 'Monthly review cadence and approval holds', accent: 'blue' },
  { name: 'Data Analytics', icon: BarChart3, state: 'Ready', detail: 'KPI, source checks, report narratives', accent: 'green' },
  { name: 'Creative Production', icon: Palette, state: 'Ready', detail: 'Campaign ideas and creative recommendations', accent: 'amber' },
  { name: 'Product Design', icon: LayoutDashboard, state: 'Ready', detail: 'UI flows, dashboard review, prototypes', accent: 'blue' },
];

const recommendations = [
  {
    title: 'Flexi Feet: convert high-engagement foot care posts into a paid retargeting angle',
    evidence: 'Report packet and billing history verified in sent Gmail; analytics mock shows reach lift.',
    owner: 'Creative Production',
    risk: 'Needs client approval before ad spend change',
  },
  {
    title: 'Clair Veda: split monthly PDF and invoice summary before sending',
    evidence: 'Multiple invoices and report attachments appear in the same monthly thread.',
    owner: 'Gmail + Drive',
    risk: 'Avoid wrong billing attachment',
  },
  {
    title: 'Nebo: block draft email until Drive report folder is linked',
    evidence: 'Gmail shows bill and monthly report names, but current mocked run lacks source folder.',
    owner: 'Drive + Data Analytics',
    risk: 'Incomplete evidence trail',
  },
];

const journeys = [
  {
    title: 'Monthly client reporting',
    prompt: 'Prepare this month\'s client report packet, verify evidence, and draft the approval checklist.',
    lanes: 'Gmail + Drive/Sheets + Data Analytics',
    approval: 'Draft only until owner approves attachments and narrative.',
  },
  {
    title: 'Billing and invoice status',
    prompt: 'Match this client\'s invoice, report packet, billing status, and any send blockers.',
    lanes: 'Gmail + Drive/Sheets + future billing MCP',
    approval: 'No invoice sending or payment status changes without review.',
  },
  {
    title: 'Social and Meta insights',
    prompt: 'Summarize social performance and recommend the next campaign angle with evidence.',
    lanes: 'Data Analytics + Creative Production + Meta MCP research',
    approval: 'Recommendations only; ad spend or publishing stays blocked.',
  },
  {
    title: 'Website audit workflow',
    prompt: 'Audit the client website for priority fixes and convert findings into tasks.',
    lanes: 'Product Design + Browser QA + Lighthouse/WordPress MCP research',
    approval: 'Create tasks only; no website edits until explicitly approved.',
  },
  {
    title: 'Client communication',
    prompt: 'Draft a client-ready update explaining report status, invoice status, and next actions.',
    lanes: 'Gmail + Calendar + Drive evidence',
    approval: 'Gmail drafts only; sending remains a human action.',
  },
];

const commands = [
  { command: 'inspect_mail_workflow', status: 'Ready', description: 'Summarize sent Gmail report packets by client.' },
  { command: 'list_clients', status: 'Ready', description: 'Return active client registry and setup health.' },
  { command: 'draft_monthly_report', status: 'Approval gated', description: 'Generate report draft with evidence and caveats.' },
  { command: 'create_gmail_draft', status: 'Blocked', description: 'Create Gmail draft only after owner approval.' },
];

const audit = [
  'Gmail sent history scanned for monthly reports and invoices.',
  'Recurring clients mapped from report packets.',
  'Human approval gate applied to report emails.',
  'Future MCP name reserved: bapx-automation.',
];

const viewSummaries = {
  Command: 'Full agency operations cockpit across reporting, billing, insights, approvals, and plugin lanes.',
  Clients: 'Client registry focus: account health, owners, connected assets, and next workflow steps.',
  'Mail Review': 'Gmail evidence focus: report packets, invoice attachments, and safe draft preparation.',
  Reports: 'Reporting focus: source checks, report readiness, missing assets, and narrative generation.',
  Billing: 'Billing focus: invoice matching, pending finance checks, and send-blocking risk review.',
  Calendar: 'Calendar focus: review cadence, approval holds, and monthly client reporting deadlines.',
  'Drive Assets': 'Drive and Sheets focus: linked folders, report files, invoice sources, and client evidence.',
  Insights: 'Analytics focus: social, website, Search Console, and recommendation signals.',
  Agents: 'Agent handoff focus: future MCP commands, subagent tasks, and audit-ready automation contracts.',
};

const actionMessages = {
  'June 2026': 'Calendar lane selected. Live calendar writes are not enabled in this UI prototype.',
  'Sync plugins': 'Plugin sync is a planned integration. Current screen shows available Codex lanes only.',
  'New run': 'New automation runs require the future tool surface and owner approval gates.',
  'Mail evidence': 'Mail evidence is represented from Gmail workflow discovery; live mailbox opening is not wired here.',
  'Open report': 'Report opening will route through Drive/Docs once source files are connected.',
  'Create Gmail draft': 'Draft creation is approval-gated and will use Gmail only after the backend/tool contract exists.',
};

function statusClass(status) {
  if (status.includes('Ready') || status.includes('Matched') || status.includes('Connected')) return 'good';
  if (status.includes('Missing') || status.includes('Blocked') || status.includes('Needs') || status.includes('stale')) return 'warn';
  return 'info';
}

function App() {
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [approved, setApproved] = useState(false);
  const [activeView, setActiveView] = useState('Command');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('Issue #9: actions show prototype-safe status instead of pretending to run live integrations.');

  const filteredClients = useMemo(() => {
    const value = query.toLowerCase();
    return clients.filter((client) => `${client.name} ${client.email} ${client.status}`.toLowerCase().includes(value));
  }, [query]);

  const draftEnabled = approved && selectedClient.status !== 'Missing report';
  const currentSummary = viewSummaries[activeView];

  const showActionNotice = (action) => {
    setNotice(actionMessages[action]);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img className="brand-logo" src={bapxLogo} alt="bapXauto official logo" />
          <div className="brand-copy">
            <strong>bapXauto</strong>
            <span>Codex command ops</span>
          </div>
        </div>
        <nav className="nav-list" aria-label="Primary">
          {[
            [LayoutDashboard, 'Command'],
            [Users, 'Clients'],
            [Inbox, 'Mail Review'],
            [FileText, 'Reports'],
            [ReceiptText, 'Billing'],
            [CalendarDays, 'Calendar'],
            [FolderOpen, 'Drive Assets'],
            [BarChart3, 'Insights'],
            [Bot, 'Agents'],
          ].map(([Icon, label]) => (
            <button
              key={label}
              className={activeView === label ? 'active' : ''}
              onClick={() => {
                setActiveView(label);
                setNotice(`${label} view selected. ${viewSummaries[label]}`);
              }}
              aria-label={`Open ${label} view`}
              aria-current={activeView === label ? 'page' : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-card">
          <ShieldCheck size={18} />
          <strong>Human approval</strong>
          <span>Emails, billing, Meta changes, and recommendations stay blocked until reviewed.</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="search-box">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search clients, reports, invoices" />
          </div>
          <button className="ghost-button" onClick={() => showActionNotice('June 2026')} aria-label="Open June 2026 calendar view"><CalendarDays size={16} /> June 2026</button>
          <button className="ghost-button" onClick={() => showActionNotice('Sync plugins')} aria-label="Sync connected plugins"><Activity size={16} /> Sync plugins</button>
          <button className="primary-button" onClick={() => showActionNotice('New run')} aria-label="Start a new approval run"><Sparkles size={16} /> New run</button>
        </header>

        <section className="hero-row">
          <div>
            <p className="section-label">{activeView}</p>
            <h1>Client Automation Command</h1>
            <p>{currentSummary}</p>
          </div>
          <div className="mcp-card">
            <Database size={20} />
            <div>
              <span>Future MCP</span>
              <strong>bapx-automation</strong>
            </div>
          </div>
        </section>

        <section className="metric-grid" aria-label="Workflow summary">
          {[
            ['Active clients', '18', '+5 discovered from Gmail'],
            ['Reports due', '7', '3 ready, 4 need source checks'],
            ['Draft emails', '12', 'Approval gate active'],
            ['Billing pending', '5', 'Invoices need matching'],
            ['Plugin health', '6/6', 'Codex companion lanes ready'],
          ].map(([label, value, note]) => (
            <article className="metric-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <section className="status-banner" role="status" aria-live="polite">
          <ShieldCheck size={17} />
          <span>{notice}</span>
        </section>

        <section className="content-grid">
          <div className="panel queue-panel">
            <div className="panel-head">
              <div>
                <h2>Monthly workflow queue</h2>
                <p>Seeded from sent Gmail report and invoice packets.</p>
              </div>
              <button className="ghost-button compact" onClick={() => showActionNotice('Mail evidence')} aria-label="Review mail evidence"><Mail size={15} /> Mail evidence</button>
            </div>
            <div className="client-table">
              <div className="table-row table-header">
                <span>Client</span><span>Report</span><span>Billing</span><span>Health</span><span>Next</span>
              </div>
              {filteredClients.map((client) => (
                <button
                  key={client.name}
                  className={`table-row ${selectedClient.name === client.name ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedClient(client);
                    setApproved(false);
                  }}
                  aria-label={`Select ${client.name}. ${client.status}. Next step: ${client.next}`}
                >
                  <span>
                    <strong>{client.name}</strong>
                    <small>{client.email}</small>
                  </span>
                  <span><b className={`chip ${statusClass(client.status)}`}>{client.status}</b></span>
                  <span>{client.billing}</span>
                  <span>{client.health}%</span>
                  <span>{client.next}<ChevronRight size={15} /></span>
                </button>
              ))}
            </div>
          </div>

          <aside className="panel detail-panel">
            <div className="panel-head">
              <div>
                <h2>{selectedClient.name}</h2>
                <p>{selectedClient.evidence}</p>
              </div>
              <span className={`chip ${statusClass(selectedClient.status)}`}>{selectedClient.status}</span>
            </div>
            <div className="timeline">
              {[
                ['Gmail evidence', selectedClient.evidence, CheckCircle2],
                ['Drive assets', selectedClient.drive, selectedClient.drive === 'Needs folder' ? TriangleAlert : CheckCircle2],
                ['Analytics snapshot', selectedClient.analytics, selectedClient.analytics.includes('stale') ? TriangleAlert : BarChart3],
                ['Report file', selectedClient.report, FileText],
                ['Invoice match', selectedClient.invoice, ReceiptText],
              ].map(([label, value, Icon]) => (
                <div className="timeline-item" key={label}>
                  <Icon size={17} />
                  <div>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <label className="approval-toggle">
              <input type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} />
              <span>Owner reviewed evidence and approves draft actions</span>
            </label>
            <div className="detail-actions">
              <button className="primary-button" disabled={!draftEnabled} onClick={() => showActionNotice('Create Gmail draft')} aria-label={`Create Gmail draft for ${selectedClient.name}`}><Send size={16} /> Create Gmail draft</button>
              <button className="ghost-button" onClick={() => showActionNotice('Open report')} aria-label={`Open report for ${selectedClient.name}`}><FileText size={16} /> Open report</button>
            </div>
          </aside>
        </section>

        <section className="lower-grid">
          <div className="panel">
            <div className="panel-head">
              <div>
                <h2>Plugin control</h2>
                <p>Codex companion capabilities available to the product workflow.</p>
              </div>
            </div>
            <div className="plugin-grid">
              {plugins.map((plugin) => {
                const Icon = plugin.icon;
                return (
                  <article className="plugin-card" key={plugin.name}>
                    <Icon size={18} />
                    <div>
                      <strong>{plugin.name}</strong>
                      <span>{plugin.detail}</span>
                    </div>
                    <b className={`dot ${plugin.accent}`} />
                  </article>
                );
              })}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <h2>Recommendations needing approval</h2>
                <p>Data-backed suggestions, not automatic actions.</p>
              </div>
            </div>
            <div className="recommendation-list">
              {recommendations.map((item) => (
                <article className="recommendation" key={item.title}>
                  <Sparkles size={17} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.evidence}</span>
                    <small>{item.owner} · {item.risk}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel journey-panel">
          <div className="panel-head">
            <div>
              <h2>MVP journeys and golden prompts</h2>
              <p>Operator-ready starting points for ChatGPT and Codex agents, mapped to existing lanes before custom MCP work.</p>
            </div>
            <span className="chip info">Issue #13</span>
          </div>
          <div className="journey-grid">
            {journeys.map((journey) => (
              <article className="journey-card" key={journey.title}>
                <WandSparkles size={18} />
                <div>
                  <strong>{journey.title}</strong>
                  <span>{journey.prompt}</span>
                  <small>{journey.lanes}</small>
                  <b>Approval gate: {journey.approval}</b>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lower-grid command-row">
          <div className="panel">
            <div className="panel-head">
              <div>
                <h2>Agent handoff</h2>
                <p>Future `bapx-automation` MCP commands, shown as a design contract only.</p>
              </div>
            </div>
            <div className="command-list">
              {commands.map((command) => (
                <article className="command-item" key={command.command}>
                  <Bot size={17} />
                  <div>
                    <strong>{command.command}</strong>
                    <span>{command.description}</span>
                  </div>
                  <b className={`chip ${statusClass(command.status)}`}>{command.status}</b>
                </article>
              ))}
            </div>
          </div>
          <div className="panel audit-panel">
            <div className="panel-head">
              <div>
                <h2>Audit log</h2>
                <p>Every automation decision keeps an evidence trail.</p>
              </div>
            </div>
            {audit.map((entry, index) => (
              <div className="audit-item" key={entry}>
                <Clock3 size={15} />
                <span>{entry}</span>
                <small>{index + 1}m ago</small>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
