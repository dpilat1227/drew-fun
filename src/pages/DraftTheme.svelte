<script>
  import { onMount } from "svelte";
  import Clock from "../lib/Clock.svelte";

  const validThemes = ["violet", "green", "merged"];
  const initialParam = new URLSearchParams(window.location.search).get("theme");

  /** @type {'violet' | 'green' | 'merged'} */
  let theme = $state(validThemes.includes(initialParam) ? initialParam : "merged");

  const now = [
    { k: "Focus", v: "Quantitative engineering, healthcare startups, data visualization & reading sci-fi" },
    { k: "Languages", v: "TypeScript, Python, C++, SQL" },
    { k: "Building", v: "React Native (Expo), Next.js, Postgres, Prisma, Redis" },
    { k: "Infra", v: "Vercel, Fly.io, Docker, WireGuard" },
    { k: "Looking for", v: "Internships (2026) · full-time (2027)" },
  ];

  const education = [
    {
      org: "University of Chicago",
      date: "Expected 2027",
      role: "M.S. Computer Science",
      notes: [
        "Specialization: High Performance Computing",
        "Coursework: Discrete Mathematics, Python for Data Science, Algorithms, Databases",
      ],
    },
    {
      org: "University of Michigan",
      date: "2016 — 2020",
      role: "B.B.A., Ross School of Business",
      notes: ["Specializations: Financial Markets, Entrepreneurial Law"],
    },
  ];

  const experience = [
    {
      org: "Benzinga",
      date: "2023 — 2025",
      role: "Chief of Staff",
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
      org: "Jumpstart Health Investors",
      date: "2022 — 2023",
      role: "Investment Associate",
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
      org: "Wellnest",
      date: "2019 — 2022",
      role: "Co-Founder & COO",
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
  ];

  const themes = [
    { id: "violet", label: "Violet" },
    { id: "green", label: "Green" },
    { id: "merged", label: "Merged" },
  ];

  onMount(() => {
    document.body.classList.add("immersive");
    return () => {
      document.body.classList.remove("immersive");
    };
  });
</script>

<svelte:head>
  <title>Draft theme comparison — not for indexing</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="draft-shell" data-theme={theme}>
  <div class="draft-banner">
    <span>DRAFT — private, not linked from the live site</span>
    <a href="/">&larr; back to real site</a>
  </div>

  <div class="draft-switcher" role="tablist" aria-label="Theme variant">
    {#each themes as t}
      <button
        class="switch-btn"
        class:active={theme === t.id}
        role="tab"
        aria-selected={theme === t.id}
        onclick={() => (theme = t.id)}
      >
        {t.label}
      </button>
    {/each}
  </div>

  <header class="draft-nav">
    <div class="draft-nav-inner">
      <span class="draft-brand">Drew Pilat</span>
      <nav class="draft-nav-links">
        <a class="active">About</a>
        <a>Projects</a>
        <a>Reading</a>
      </nav>
      <div class="draft-nav-end">
        <span class="draft-clock"><Clock /></span>
        <span class="draft-mail">Email</span>
      </div>
    </div>
  </header>

  <main class="draft-main">
    <section class="draft-hero">
      <span class="draft-id-line">OPERATOR // DREW PILAT // M.S. CS, UCHICAGO</span>
      <h1 class="draft-name">Drew Pilat</h1>
      <p class="draft-lead">
        M.S. Computer Science, University of Chicago — graduating Spring 2027.
        Interested in quant finance, precision medicine, and early-to-late stage startups.
      </p>
      <div class="draft-cta-row">
        <a href="/Drew_Pilat_Resume.pdf" class="draft-btn draft-btn-primary">Resume</a>
        <a href="/projects" class="draft-btn">Projects</a>
      </div>
    </section>

    <div class="draft-split">
      <aside class="draft-currently-col">
        <div class="draft-section-head"><span class="head-num">01</span> CURRENTLY</div>
        <div class="draft-stat-list">
          {#each now as row}
            <div class="draft-stat-pill">
              <span class="stat-dot"></span>
              <div class="stat-body">
                <span class="stat-k">{row.k}</span>
                <span class="stat-v">{row.v}</span>
              </div>
            </div>
          {/each}
        </div>
      </aside>

      <div class="draft-timeline-col">
        <div class="draft-section-head"><span class="head-num">02</span> EDUCATION</div>
        {#each education as item, i}
          <div class="draft-card">
            <div class="draft-card-head">
              <span class="draft-rec">No. {String(i + 1).padStart(2, "0")}</span>
              <span class="draft-date">{item.date}</span>
            </div>
            <div class="draft-org">{item.org}</div>
            <div class="draft-role">{item.role}</div>
            {#each item.notes as note}
              <p class="draft-note">{note}</p>
            {/each}
          </div>
        {/each}

        <div class="draft-section-head" style="margin-top: 3rem;"><span class="head-num">03</span> EXPERIENCE</div>
        {#each experience as job, i}
          <div class="draft-card">
            <div class="draft-card-head">
              <span class="draft-rec">No. {String(i + 1).padStart(2, "0")}</span>
              <span class="draft-date">{job.date}</span>
            </div>
            <div class="draft-org">{job.org}</div>
            <div class="draft-role">{job.role}</div>
            <div class="draft-tags">
              {#each job.tags as tag}
                <span class="draft-tag draft-tag-{tag.tone}">{tag.label}</span>
              {/each}
            </div>
            <ul class="draft-bullets">
              {#each job.bullets as [label, text]}
                <li><strong>{label}:</strong> {text}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>

<style>
  /* ── Shared shell / layout (theme-independent) ─────────────────────────── */
  .draft-shell {
    min-height: 100vh;
    background: #000000;
    color: #d6dae4;
    font-family: var(--font-sans);
    position: relative;
    padding-bottom: 6rem;
    transition: background 0.3s;
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

  .draft-switcher {
    position: fixed;
    top: 2.6rem;
    right: 1.25rem;
    z-index: 99;
    display: flex;
    gap: 0.3rem;
    background: rgba(10, 10, 14, 0.9);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 999px;
    padding: 0.3rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  }

  .switch-btn {
    background: transparent;
    border: none;
    color: #8b95b2;
    font-family: var(--font-sans);
    font-size: 0.76rem;
    font-weight: 600;
    padding: 0.4rem 0.85rem;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .switch-btn:hover {
    color: #ffffff;
  }

  .switch-btn.active {
    background: #ffffff;
    color: #000000;
  }

  .draft-nav-inner {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .draft-nav-links {
    display: flex;
    gap: 0.3rem;
    flex: 1;
  }

  .draft-nav-end {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .draft-mail {
    font-size: 0.78rem;
    font-weight: 600;
    cursor: default;
  }

  .draft-main {
    max-width: 1180px;
    margin: 0 auto;
    padding: 3rem 2rem 0;
  }

  .draft-hero {
    padding-bottom: 2.5rem;
  }

  .draft-id-line {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    margin-bottom: 0.85rem;
  }

  .draft-name {
    font-size: clamp(2rem, 4vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #ffffff;
    margin: 0 0 0.75rem;
  }

  .draft-lead {
    max-width: 46ch;
    font-size: 1.02rem;
    line-height: 1.65;
    color: #b5bccb;
    margin: 0 0 1.4rem;
  }

  .draft-cta-row {
    display: flex;
    gap: 0.7rem;
  }

  .draft-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.62rem 1.15rem;
    font-size: 0.84rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: #ffffff;
    cursor: pointer;
    transition: all 0.2s;
  }

  .draft-split {
    display: grid;
    grid-template-columns: minmax(260px, 300px) 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  .draft-currently-col {
    position: sticky;
    top: 5.5rem;
  }

  .draft-section-head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    margin-bottom: 1.25rem;
  }

  .head-num {
    opacity: 0.55;
  }

  .draft-stat-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .draft-stat-pill {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.65rem 0.8rem;
  }

  .stat-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-top: 0.4rem;
    flex-shrink: 0;
  }

  .stat-body {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .stat-k {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  .stat-v {
    font-size: 0.85rem;
    line-height: 1.4;
    color: #dfe3ec;
  }

  .draft-card {
    padding: 1.4rem 1.6rem;
    margin-bottom: 1.15rem;
  }

  .draft-card-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
  }

  .draft-rec {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    opacity: 0.5;
    letter-spacing: 0.08em;
  }

  .draft-date {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    opacity: 0.75;
  }

  .draft-org {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.65;
    margin-bottom: 0.3rem;
  }

  .draft-role {
    font-size: 1.15rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  .draft-note {
    font-size: 0.88rem;
    color: #9aa3b8;
    margin: 0 0 0.15rem;
  }

  .draft-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.5rem 0 0.9rem;
  }

  .draft-tag {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.22rem 0.55rem;
    border-radius: 999px;
  }

  .draft-bullets {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .draft-bullets li {
    position: relative;
    padding-left: 1rem;
    font-size: 0.92rem;
    line-height: 1.55;
    color: #c1c7d6;
  }

  .draft-bullets li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.65em;
    width: 4px;
    height: 1px;
    background: currentColor;
    opacity: 0.5;
  }

  .draft-bullets li strong {
    color: #ffffff;
  }

  @media (max-width: 860px) {
    .draft-split {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .draft-currently-col {
      position: static;
    }
    .draft-switcher {
      top: auto;
      bottom: 1rem;
      right: 1rem;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     THEME: VIOLET — Agent Civilizations DNA
     Rounded glass cards, purple/gold/red/cyan glow, floating pill nav,
     gradient progress bar, sans-serif headings.
     ═══════════════════════════════════════════════════════════════════════ */

  .draft-shell[data-theme="violet"] {
    background:
      radial-gradient(ellipse 60% 40% at 15% -5%, rgba(158, 110, 222, 0.28), transparent 55%),
      radial-gradient(ellipse 45% 30% at 90% 5%, rgba(92, 225, 255, 0.12), transparent 50%),
      #000000;
  }

  .draft-shell[data-theme="violet"] .draft-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    padding: 1rem 0 0;
  }

  .draft-shell[data-theme="violet"] .draft-nav-inner {
    background: rgba(8, 8, 8, 0.88);
    backdrop-filter: saturate(160%) blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    padding: 0.4rem 0.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
    position: relative;
    max-width: fit-content;
  }

  .draft-shell[data-theme="violet"] .draft-nav-inner::after {
    content: "";
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: -1px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, #9e6ede, #ff5d73, #ff9f43);
    opacity: 0.6;
  }

  .draft-shell[data-theme="violet"] .draft-brand {
    font-weight: 600;
    color: #c5cce0;
    font-size: 0.9rem;
    padding: 0 0.5rem;
  }

  .draft-shell[data-theme="violet"] .draft-nav-links a {
    color: #8b95b2;
    font-size: 0.82rem;
    font-weight: 500;
    padding: 0.42rem 0.9rem;
    border-radius: 999px;
    cursor: default;
  }

  .draft-shell[data-theme="violet"] .draft-nav-links a.active {
    color: #c4a3f5;
    background: rgba(158, 110, 222, 0.18);
  }

  .draft-shell[data-theme="violet"] .draft-mail {
    background: #9e6ede;
    color: #fff;
    border-radius: 999px;
    padding: 0.42rem 1.05rem;
    margin-right: 0.25rem;
  }

  .draft-shell[data-theme="violet"] .draft-id-line {
    color: #ffc078;
  }

  .draft-shell[data-theme="violet"] .draft-btn {
    border-radius: 999px;
    background: transparent;
  }

  .draft-shell[data-theme="violet"] .draft-btn-primary {
    background: #9e6ede;
    border-color: #9e6ede;
  }

  .draft-shell[data-theme="violet"] .draft-section-head {
    color: #c4a3f5;
  }

  .draft-shell[data-theme="violet"] .stat-dot {
    background: #ff9f43;
    box-shadow: 0 0 6px #ff9f43;
  }

  .draft-shell[data-theme="violet"] .draft-stat-pill {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
  }

  .draft-shell[data-theme="violet"] .draft-card {
    background: rgba(10, 12, 20, 0.72);
    backdrop-filter: saturate(180%) blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }

  .draft-shell[data-theme="violet"] .draft-card:hover {
    border-color: rgba(158, 110, 222, 0.45);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(158, 110, 222, 0.12);
    transform: translateY(-2px);
  }

  .draft-shell[data-theme="violet"] .draft-tag-purple { background: rgba(158, 110, 222, 0.18); color: #d4b8ff; }
  .draft-shell[data-theme="violet"] .draft-tag-orange { background: rgba(255, 159, 67, 0.18); color: #ffc078; }
  .draft-shell[data-theme="violet"] .draft-tag-cyan { background: rgba(92, 225, 255, 0.15); color: #7eecff; }
  .draft-shell[data-theme="violet"] .draft-tag-green { background: rgba(62, 224, 127, 0.15); color: #5eeba0; }
  .draft-shell[data-theme="violet"] .draft-tag-pink { background: rgba(255, 122, 162, 0.18); color: #ff9fbd; }

  /* ═══════════════════════════════════════════════════════════════════════
     THEME: GREEN — Microsecond DNA
     Sharp receipt-slip cards, monospace headings, phosphor green,
     ticker-tape full-width nav bar.
     ═══════════════════════════════════════════════════════════════════════ */

  .draft-shell[data-theme="green"] {
    background-color: #000000;
    background-image:
      repeating-linear-gradient(0deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px),
      repeating-linear-gradient(90deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px);
    font-family: var(--font-mono);
  }

  .draft-shell[data-theme="green"] .draft-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: #050706;
    border-bottom: 1px solid rgba(62, 224, 127, 0.35);
  }

  .draft-shell[data-theme="green"] .draft-nav-inner {
    padding: 0.7rem 2rem;
  }

  .draft-shell[data-theme="green"] .draft-brand {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #7dffb3;
    text-shadow: 0 0 8px rgba(62, 224, 127, 0.5);
  }

  .draft-shell[data-theme="green"] .draft-nav-links a {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #5c7768;
    padding: 0.3rem 0.7rem;
    border: 1px solid transparent;
    cursor: default;
  }

  .draft-shell[data-theme="green"] .draft-nav-links a.active {
    color: #7dffb3;
    border: 1px solid rgba(62, 224, 127, 0.35);
  }

  .draft-shell[data-theme="green"] .draft-mail {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #ff9f43;
    border: 1px solid rgba(255, 159, 67, 0.4);
    padding: 0.3rem 0.7rem;
  }

  .draft-shell[data-theme="green"] .draft-id-line {
    color: #ff9f43;
  }

  .draft-shell[data-theme="green"] .draft-name {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: -0.01em;
  }

  .draft-shell[data-theme="green"] .draft-btn {
    border-radius: 2px;
    background: transparent;
    font-family: var(--font-mono);
    font-size: 0.76rem;
    letter-spacing: 0.03em;
  }

  .draft-shell[data-theme="green"] .draft-btn-primary {
    background: #3ee07f;
    border-color: #3ee07f;
    color: #06120a;
  }

  .draft-shell[data-theme="green"] .draft-section-head {
    color: #7dffb3;
  }

  .draft-shell[data-theme="green"] .stat-dot {
    background: #ff9f43;
    box-shadow: 0 0 6px #ff9f43;
    border-radius: 0;
  }

  .draft-shell[data-theme="green"] .draft-stat-pill {
    background: rgba(62, 224, 127, 0.03);
    border: 1px solid rgba(62, 224, 127, 0.15);
    border-radius: 0;
  }

  .draft-shell[data-theme="green"] .draft-card {
    background: #060a08;
    border: 1px solid rgba(62, 224, 127, 0.18);
    border-radius: 2px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85);
    position: relative;
    transition: border-color 0.2s;
  }

  .draft-shell[data-theme="green"] .draft-card::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 1.6rem;
    right: 1.6rem;
    height: 5px;
    background-image: radial-gradient(circle, #000 2px, transparent 2.1px);
    background-size: 12px 5px;
  }

  .draft-shell[data-theme="green"] .draft-card:hover {
    border-color: rgba(62, 224, 127, 0.5);
  }

  .draft-shell[data-theme="green"] .draft-role,
  .draft-shell[data-theme="green"] .draft-org,
  .draft-shell[data-theme="green"] .stat-v {
    font-family: var(--font-mono);
  }

  .draft-shell[data-theme="green"] .draft-tag {
    border-radius: 0;
    border: 1px solid currentColor;
    background: transparent !important;
  }

  .draft-shell[data-theme="green"] .draft-tag-purple { color: #b98fee; }
  .draft-shell[data-theme="green"] .draft-tag-orange { color: #ff9f43; }
  .draft-shell[data-theme="green"] .draft-tag-cyan { color: #5ce1ff; }
  .draft-shell[data-theme="green"] .draft-tag-green { color: #3ee07f; }
  .draft-shell[data-theme="green"] .draft-tag-pink { color: #ff5d73; }

  /* ═══════════════════════════════════════════════════════════════════════
     THEME: MERGED — glass-card structure + mono telemetry precision
     ═══════════════════════════════════════════════════════════════════════ */

  .draft-shell[data-theme="merged"] {
    background:
      radial-gradient(ellipse 55% 35% at 12% -5%, rgba(158, 110, 222, 0.16), transparent 55%),
      radial-gradient(ellipse 40% 28% at 92% 4%, rgba(62, 224, 127, 0.08), transparent 50%),
      #000000;
    background-image:
      repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 34px),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 34px);
  }

  .draft-shell[data-theme="merged"] .draft-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(5, 5, 8, 0.85);
    backdrop-filter: saturate(160%) blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 1px 0 rgba(158, 110, 222, 0.15);
  }

  .draft-shell[data-theme="merged"] .draft-nav-inner {
    padding: 0.75rem 2rem;
  }

  .draft-shell[data-theme="merged"] .draft-brand {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #ffffff;
  }

  .draft-shell[data-theme="merged"] .draft-nav-links a {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8b95b2;
    padding: 0.4rem 0.85rem;
    border-radius: 8px;
    cursor: default;
  }

  .draft-shell[data-theme="merged"] .draft-nav-links a.active {
    color: #c4a3f5;
    background: rgba(158, 110, 222, 0.14);
  }

  .draft-shell[data-theme="merged"] .draft-mail {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    background: rgba(62, 224, 127, 0.12);
    color: #7dffb3;
    border: 1px solid rgba(62, 224, 127, 0.35);
    padding: 0.32rem 0.75rem;
    border-radius: 8px;
  }

  .draft-shell[data-theme="merged"] .draft-id-line {
    color: #7dffb3;
  }

  .draft-shell[data-theme="merged"] .draft-btn {
    border-radius: 8px;
    background: transparent;
    font-family: var(--font-mono);
    font-size: 0.78rem;
  }

  .draft-shell[data-theme="merged"] .draft-btn-primary {
    background: #9e6ede;
    border-color: #9e6ede;
  }

  .draft-shell[data-theme="merged"] .draft-section-head {
    color: #ffffff;
  }

  .draft-shell[data-theme="merged"] .head-num {
    color: #7dffb3;
    font-weight: 700;
    opacity: 1;
  }

  .draft-shell[data-theme="merged"] .stat-dot {
    background: #7dffb3;
    box-shadow: 0 0 6px #3ee07f;
  }

  .draft-shell[data-theme="merged"] .draft-stat-pill {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
  }

  .draft-shell[data-theme="merged"] .draft-card {
    background: rgba(10, 12, 20, 0.75);
    backdrop-filter: saturate(170%) blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .draft-shell[data-theme="merged"] .draft-card:hover {
    border-color: rgba(158, 110, 222, 0.4);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 28px rgba(158, 110, 222, 0.1);
  }

  .draft-shell[data-theme="merged"] .draft-card-head {
    padding-bottom: 0.4rem;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
    margin-bottom: 0.75rem;
  }

  .draft-shell[data-theme="merged"] .draft-rec,
  .draft-shell[data-theme="merged"] .draft-date,
  .draft-shell[data-theme="merged"] .draft-org {
    font-family: var(--font-mono);
  }

  .draft-shell[data-theme="merged"] .draft-rec {
    color: #7dffb3;
    opacity: 0.9;
  }

  .draft-shell[data-theme="merged"] .draft-tag {
    border-radius: 6px;
  }

  .draft-shell[data-theme="merged"] .draft-tag-purple { background: rgba(158, 110, 222, 0.16); color: #d4b8ff; }
  .draft-shell[data-theme="merged"] .draft-tag-orange { background: rgba(255, 159, 67, 0.16); color: #ffc078; }
  .draft-shell[data-theme="merged"] .draft-tag-cyan { background: rgba(92, 225, 255, 0.14); color: #7eecff; }
  .draft-shell[data-theme="merged"] .draft-tag-green { background: rgba(62, 224, 127, 0.14); color: #5eeba0; }
  .draft-shell[data-theme="merged"] .draft-tag-pink { background: rgba(255, 122, 162, 0.16); color: #ff9fbd; }
</style>
