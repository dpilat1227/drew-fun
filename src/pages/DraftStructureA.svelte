<script>
  import { onMount } from "svelte";

  // ── Boot sequence ───────────────────────────────────────────────────────────
  const bootLines = [
    "[ OK ] mounting /career",
    "[ OK ] loading education.log ... 2 records",
    "[ OK ] loading experience.log ... 3 records",
    "[ OK ] indexing skills.db ... 24 entries",
    "[ OK ] resolving status: OPEN_TO_WORK",
    "$ whoami",
    "drew_pilat — M.S. Computer Science, University of Chicago",
  ];
  let bootedLines = $state(0);
  let bootDone = $state(false);

  onMount(() => {
    let i = 0;
    const step = () => {
      i += 1;
      bootedLines = i;
      if (i < bootLines.length) {
        setTimeout(step, i < 4 ? 140 : 260);
      } else {
        setTimeout(() => (bootDone = true), 400);
      }
    };
    setTimeout(step, 200);
  });

  function skipBoot() {
    bootedLines = bootLines.length;
    bootDone = true;
  }

  // ── Live status bar ─────────────────────────────────────────────────────────
  let clock = $state("");
  const gradDate = new Date("2027-06-01T00:00:00");

  function fmtClock() {
    const d = new Date();
    return d.toLocaleTimeString("en-US", {
      timeZone: "America/Chicago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  onMount(() => {
    clock = fmtClock();
    const t = setInterval(() => (clock = fmtClock()), 1000);
    return () => clearInterval(t);
  });

  const daysToGrad = Math.max(
    0,
    Math.ceil((gradDate.getTime() - Date.now()) / 86400000),
  );

  // ── Process list ("Currently") ──────────────────────────────────────────────
  const processes = [
    { pid: "01", name: "focus.exe", status: "RUNNING", detail: "Quant engineering, healthcare startups, data viz, sci-fi" },
    { pid: "02", name: "stack.exe", status: "RUNNING", detail: "TypeScript · Python · C++ · SQL" },
    { pid: "03", name: "building.exe", status: "RUNNING", detail: "React Native (Expo) · Next.js · Postgres · Prisma · Redis" },
    { pid: "04", name: "infra.exe", status: "RUNNING", detail: "Vercel · Fly.io · Docker · WireGuard" },
    { pid: "05", name: "search.exe", status: "LISTENING", detail: "Internships (2026) · full-time (2027)" },
  ];

  // ── Node map data (education + experience) ──────────────────────────────────
  // Hand-positioned, small orbit cluster: two "education" nodes feed into three
  // "experience" nodes, which feed into a "now" node.
  const nodes = [
    {
      id: "michigan",
      kind: "education",
      x: 130,
      y: 90,
      label: "U. MICHIGAN",
      role: "B.B.A., Ross School of Business",
      date: "2016 — 2020",
      notes: ["Specializations: Financial Markets, Entrepreneurial Law"],
      tags: [],
      bullets: [],
    },
    {
      id: "wellnest",
      kind: "experience",
      x: 130,
      y: 260,
      label: "WELLNEST",
      role: "Co-Founder & COO",
      date: "2019 — 2022",
      notes: [],
      tags: [
        { label: "Founder / COO", tone: "pink" },
        { label: "VC-Backed", tone: "green" },
        { label: "Mental Health", tone: "purple" },
        { label: "Digital Health", tone: "cyan" },
      ],
      bullets: [
        ["Fundraising", "Raised $800,000 in pre-seed funding from venture firms and angel investors."],
        ["Partnerships", "Signed institutional partnerships with UPenn and Boston University."],
        ["Product", "Ran product for a consumer mindfulness app that held a 5.0 App Store rating. Wound down in 2022."],
      ],
    },
    {
      id: "jumpstart",
      kind: "experience",
      x: 340,
      y: 380,
      label: "JUMPSTART HEALTH",
      role: "Investment Associate",
      date: "2022 — 2023",
      notes: [],
      tags: [
        { label: "Venture Capital · Early Stage", tone: "green" },
        { label: "Healthcare Startups", tone: "cyan" },
      ],
      bullets: [
        ["Diligence", "Evaluated 200+ investment opportunities and presented memos to the Investment Committee."],
        ["Portfolio strategy", "Analysed historical fund data to inform deployment strategy."],
        ["Research", "Mapped market trends across the healthcare startup ecosystem."],
      ],
    },
    {
      id: "benzinga",
      kind: "experience",
      x: 560,
      y: 260,
      label: "BENZINGA",
      role: "Chief of Staff",
      date: "2023 — 2025",
      notes: [],
      tags: [
        { label: "Product", tone: "purple" },
        { label: "Strategy & Ops", tone: "orange" },
        { label: "Business Building", tone: "cyan" },
      ],
      bullets: [
        ["Predictive analytics", "Built churn models in Python with Tableau dashboards used by customer success to prioritise at-risk subscribers. Reported 85% accuracy and a 20% lift in CLV."],
        ["Product", "Led development and launch of a data product that generated $500,000+ after release."],
        ["Quantitative work", "Engineered factor-based models for Benzinga Quant to rank equities on volatility and momentum signals."],
        ["Growth operations", "Launched and ran the P&L for a virtual events line of business that did $350,000+ in 2024."],
        ["Marketing", "Rebuilt mobile app acquisition around an attribution model, cutting CAC 33%."],
      ],
    },
    {
      id: "uchicago",
      kind: "now",
      x: 460,
      y: 90,
      label: "U. CHICAGO",
      role: "M.S. Computer Science",
      date: "Expected 2027",
      notes: [
        "Specialization: High Performance Computing",
        "Coursework: Discrete Mathematics, Python for Data Science, Algorithms, Databases",
      ],
      tags: [],
      bullets: [],
    },
  ];

  // Directed edges (from -> to) drawn as connecting lines.
  const edges = [
    ["michigan", "wellnest"],
    ["wellnest", "jumpstart"],
    ["jumpstart", "benzinga"],
    ["benzinga", "uchicago"],
  ];

  function nodeById(id) {
    return nodes.find((n) => n.id === id);
  }

  let selectedNode = $state(null);
  let hoveredNode = $state(null);

  function selectNode(n) {
    selectedNode = selectedNode?.id === n.id ? null : n;
  }

  onMount(() => {
    document.body.classList.add("immersive");
    return () => document.body.classList.remove("immersive");
  });
</script>

<svelte:head>
  <title>Draft structure A — not for indexing</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="dash">
  <div class="draft-banner">
    <span>DRAFT — private, not linked from the live site · structural prototype A</span>
    <a href="/">&larr; back to real site</a>
  </div>

  <!-- Full-width live status bar (diegetic chrome, not a normal nav) -->
  <header class="status-bar">
    <div class="status-inner">
      <div class="status-cluster">
        <span class="status-dot"></span>
        <span class="status-label">drew_pilat</span>
        <span class="status-sep">//</span>
        <span class="status-value">OPEN_TO_WORK</span>
      </div>
      <div class="status-cluster">
        <span class="status-key">UPTIME</span>
        <span class="status-value">{daysToGrad}d to graduation</span>
      </div>
      <div class="status-cluster">
        <span class="status-key">CHI</span>
        <span class="status-value mono">{clock}</span>
      </div>
      <div class="status-cluster">
        <a href="/projects" class="status-link">Projects</a>
        <a href="/reading" class="status-link">Reading</a>
        <a href="/Drew_Pilat_Resume.pdf" download class="status-link primary">Resume</a>
      </div>
    </div>
  </header>

  {#if !bootDone}
    <div class="boot-screen">
      <div class="boot-lines">
        {#each bootLines.slice(0, bootedLines) as line, i}
          <div class="boot-line" class:cmd={line.startsWith("$")}>{line}</div>
        {/each}
        <span class="boot-cursor" aria-hidden="true"></span>
      </div>
      <button class="boot-skip" onclick={skipBoot}>skip &rarr;</button>
    </div>
  {:else}
    <main class="dash-main">
      <section class="dash-hero">
        <span class="hero-id">SYSTEM // DREW_PILAT // STATUS: ONLINE</span>
        <h1 class="hero-name">Drew Pilat</h1>
        <p class="hero-lead">
          M.S. Computer Science, University of Chicago — graduating Spring 2027.
          Interested in quant finance, precision medicine, and early-to-late stage startups.
        </p>
      </section>

      <div class="dash-grid">
        <!-- Process list sidebar -->
        <aside class="proc-panel">
          <div class="panel-head">
            <span class="panel-title">/currently</span>
            <span class="panel-count">{processes.length} processes</span>
          </div>
          <div class="proc-list">
            {#each processes as p}
              <div class="proc-row">
                <span class="proc-pid">{p.pid}</span>
                <div class="proc-body">
                  <div class="proc-top">
                    <span class="proc-name">{p.name}</span>
                    <span
                      class="proc-status"
                      class:listening={p.status === "LISTENING"}
                      >{p.status}</span
                    >
                  </div>
                  <p class="proc-detail">{p.detail}</p>
                </div>
              </div>
            {/each}
          </div>
        </aside>

        <!-- Interactive node map -->
        <div class="node-panel">
          <div class="panel-head">
            <span class="panel-title">/career-graph</span>
            <span class="panel-count">{nodes.length} nodes</span>
          </div>

          <div class="node-stage">
            <svg viewBox="0 0 690 460" class="node-svg" preserveAspectRatio="xMidYMid meet">
              {#each edges as [fromId, toId]}
                {@const from = nodeById(fromId)}
                {@const to = nodeById(toId)}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  class="edge-line"
                  class:edge-active={selectedNode?.id === from.id || selectedNode?.id === to.id}
                />
              {/each}

              {#each nodes as n}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <g
                  class="node-group"
                  class:kind-education={n.kind === "education"}
                  class:kind-experience={n.kind === "experience"}
                  class:kind-now={n.kind === "now"}
                  class:node-active={selectedNode?.id === n.id}
                  transform="translate({n.x}, {n.y})"
                  onclick={() => selectNode(n)}
                  onmouseenter={() => (hoveredNode = n)}
                  onmouseleave={() => (hoveredNode = null)}
                >
                  <circle r="36" class="node-hit-area" />
                  <circle r="26" class="node-ring" />
                  <circle r="9" class="node-core" />
                  <text y="46" text-anchor="middle" class="node-label">{n.label}</text>
                </g>
              {/each}
            </svg>

            {#if selectedNode || hoveredNode}
              {@const active = selectedNode || hoveredNode}
              {@const pinned = selectedNode !== null}
              <div class="dossier" class:pinned>
                <div class="dossier-head">
                  <span class="dossier-label">{active.label}</span>
                  <span class="dossier-date">{active.date}</span>
                  {#if pinned}
                    <button class="dossier-close" onclick={() => (selectedNode = null)} aria-label="Close">×</button>
                  {/if}
                </div>
                <div class="dossier-role">{active.role}</div>
                {#each active.notes as note}
                  <p class="dossier-note">{note}</p>
                {/each}
                {#if active.tags.length}
                  <div class="dossier-tags">
                    {#each active.tags as tag}
                      <span class="dossier-tag tag-{tag.tone}">{tag.label}</span>
                    {/each}
                  </div>
                {/if}
                {#if active.bullets.length}
                  <ul class="dossier-bullets">
                    {#each active.bullets as [label, text]}
                      <li><strong>{label}:</strong> {text}</li>
                    {/each}
                  </ul>
                {/if}
                <div class="dossier-tip">
                  {pinned ? "Click × or another node to switch" : "Click node to pin dossier"}
                </div>
              </div>
            {:else}
              <div class="node-hint">
                <span class="hint-pulse"></span>
                Click any node to inspect
              </div>
            {/if}
          </div>
        </div>
      </div>
    </main>
  {/if}
</div>

<style>
  .dash {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 55% 35% at 15% -5%, rgba(158, 110, 222, 0.22), transparent 55%),
      radial-gradient(ellipse 40% 28% at 90% 8%, rgba(92, 225, 255, 0.1), transparent 50%),
      #030304;
    color: #d6dae4;
    font-family: var(--font-sans);
  }

  .draft-banner {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background: #ff9f43;
    color: #1a0e00;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 0.45rem 1rem;
  }

  .draft-banner a {
    color: #1a0e00;
    border-bottom-color: rgba(26, 14, 0, 0.4);
  }

  /* ── Status bar (persistent diegetic chrome) ────────────────────────────── */
  .status-bar {
    position: sticky;
    top: 2.6rem;
    z-index: 60;
    background: rgba(6, 6, 10, 0.85);
    backdrop-filter: saturate(160%) blur(20px);
    border-bottom: 1px solid rgba(158, 110, 222, 0.25);
  }

  .status-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.65rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .status-cluster {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.03em;
  }

  .status-cluster:last-child {
    margin-left: auto;
    gap: 1rem;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3ee07f;
    box-shadow: 0 0 8px #3ee07f;
  }

  .status-label {
    color: #ffffff;
    font-weight: 600;
  }

  .status-sep {
    opacity: 0.4;
  }

  .status-key {
    opacity: 0.5;
    text-transform: uppercase;
    font-size: 0.66rem;
  }

  .status-value {
    color: #c4a3f5;
  }

  .status-value.mono {
    color: #dfe3ec;
  }

  .status-link {
    color: #8b95b2;
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 0.8rem;
    text-decoration: none;
  }

  .status-link:hover {
    color: #ffffff;
  }

  .status-link.primary {
    background: #9e6ede;
    color: #ffffff;
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
  }

  /* ── Boot screen ─────────────────────────────────────────────────────────── */
  .boot-screen {
    min-height: calc(100vh - 6rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
  }

  .boot-lines {
    font-family: var(--font-mono);
    font-size: 0.92rem;
    line-height: 1.9;
  }

  .boot-line {
    color: #8ee6ac;
  }

  .boot-line.cmd {
    color: #c4a3f5;
    margin-top: 0.5rem;
  }

  .boot-cursor {
    display: inline-block;
    width: 8px;
    height: 1rem;
    background: #c4a3f5;
    animation: blink 1s steps(1) infinite;
    vertical-align: text-bottom;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .boot-skip {
    align-self: flex-start;
    margin-top: 2rem;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #8b95b2;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    cursor: pointer;
  }

  .boot-skip:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* ── Dashboard main ──────────────────────────────────────────────────────── */
  .dash-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
  }

  .dash-hero {
    padding-bottom: 2.5rem;
  }

  .hero-id {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    color: #ffc078;
    margin-bottom: 0.85rem;
  }

  .hero-name {
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #ffffff;
    margin: 0 0 0.75rem;
  }

  .hero-lead {
    max-width: 50ch;
    font-size: 1.02rem;
    line-height: 1.65;
    color: #b5bccb;
    margin: 0;
  }

  .dash-grid {
    display: grid;
    grid-template-columns: minmax(260px, 300px) 1fr;
    gap: 1.75rem;
    align-items: start;
  }

  .panel-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
    font-family: var(--font-mono);
  }

  .panel-title {
    font-size: 0.8rem;
    font-weight: 700;
    color: #c4a3f5;
    letter-spacing: 0.04em;
  }

  .panel-count {
    font-size: 0.66rem;
    opacity: 0.5;
  }

  /* ── Process list panel ──────────────────────────────────────────────────── */
  .proc-panel {
    position: sticky;
    top: 8rem;
    background: rgba(10, 12, 20, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.25rem;
  }

  .proc-list {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .proc-row {
    display: flex;
    gap: 0.65rem;
  }

  .proc-pid {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    opacity: 0.4;
    padding-top: 0.15rem;
  }

  .proc-body {
    flex: 1;
    min-width: 0;
  }

  .proc-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
  }

  .proc-name {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: #ffffff;
  }

  .proc-status {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: #3ee07f;
    letter-spacing: 0.03em;
  }

  .proc-status.listening {
    color: #ffc078;
  }

  .proc-detail {
    font-size: 0.82rem;
    color: #9aa3b8;
    line-height: 1.45;
    margin: 0.2rem 0 0;
  }

  /* ── Node map panel ──────────────────────────────────────────────────────── */
  .node-panel {
    background: rgba(10, 12, 20, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.25rem;
  }

  .node-stage {
    position: relative;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 12px;
    overflow: hidden;
    min-height: 460px;
  }

  .node-svg {
    width: 100%;
    height: 460px;
    display: block;
  }

  .edge-line {
    stroke: rgba(158, 110, 222, 0.25);
    stroke-width: 1.5;
    transition: stroke 0.3s;
  }

  .edge-line.edge-active {
    stroke: rgba(196, 163, 245, 0.75);
    stroke-width: 2;
  }

  .node-group {
    cursor: pointer;
  }

  .node-hit-area {
    fill: transparent;
  }

  .node-ring {
    fill: none;
    stroke: rgba(255, 255, 255, 0.15);
    stroke-width: 1.5;
    transition: stroke 0.25s, r 0.25s;
  }

  .node-core {
    fill: #9e6ede;
    transition: fill 0.25s, r 0.25s;
  }

  .kind-education .node-core {
    fill: #5ce1ff;
  }

  .kind-now .node-core {
    fill: #ffc078;
  }

  .node-group:hover .node-ring,
  .node-active .node-ring {
    stroke: rgba(255, 255, 255, 0.5);
    r: 30;
  }

  .node-active .node-core {
    r: 11;
  }

  .node-label {
    fill: #b5bccb;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .node-active + .node-label,
  .node-active .node-label {
    fill: #ffffff;
  }

  /* ── Dossier / hint overlays ─────────────────────────────────────────────── */
  .dossier {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
    max-width: 360px;
    margin-left: auto;
    background: rgba(6, 6, 10, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(158, 110, 222, 0.35);
    border-radius: 14px;
    padding: 1.1rem 1.25rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  }

  .dossier.pinned {
    border-color: rgba(158, 110, 222, 0.6);
  }

  .dossier-head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .dossier-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #c4a3f5;
  }

  .dossier-date {
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    opacity: 0.6;
  }

  .dossier-close {
    background: transparent;
    border: none;
    color: #8b95b2;
    font-size: 1rem;
    cursor: pointer;
    line-height: 1;
    padding: 0;
  }

  .dossier-role {
    font-size: 0.95rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.4rem;
  }

  .dossier-note {
    font-size: 0.8rem;
    color: #9aa3b8;
    margin: 0 0 0.2rem;
  }

  .dossier-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: 0.4rem 0 0.6rem;
  }

  .dossier-tag {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
  }

  .tag-purple { background: rgba(158, 110, 222, 0.18); color: #d4b8ff; }
  .tag-orange { background: rgba(255, 159, 67, 0.18); color: #ffc078; }
  .tag-cyan { background: rgba(92, 225, 255, 0.15); color: #7eecff; }
  .tag-green { background: rgba(62, 224, 127, 0.15); color: #5eeba0; }
  .tag-pink { background: rgba(255, 122, 162, 0.18); color: #ff9fbd; }

  .dossier-bullets {
    list-style: none;
    margin: 0 0 0.6rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .dossier-bullets li {
    font-size: 0.78rem;
    line-height: 1.45;
    color: #c1c7d6;
  }

  .dossier-bullets li strong {
    color: #ffffff;
  }

  .dossier-tip {
    font-size: 0.68rem;
    color: #6b7488;
    font-style: italic;
  }

  .node-hint {
    position: absolute;
    left: 50%;
    bottom: 1.25rem;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: #6b7488;
  }

  .hint-pulse {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9e6ede;
    animation: pulse 1.8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.4); }
  }

  @media (max-width: 900px) {
    .dash-grid {
      grid-template-columns: 1fr;
    }
    .proc-panel {
      position: static;
    }
    .status-inner {
      gap: 1rem;
    }
    .status-cluster:last-child {
      margin-left: 0;
    }
  }
</style>
