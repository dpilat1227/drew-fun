<script>
  import { onMount } from "svelte";
  import Clock from "../lib/Clock.svelte";

  const validThemes = ["violet", "green", "merged"];
  const validLayouts = ["bento", "sidebar", "editorial"];
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get("theme");
  const layoutParam = params.get("layout");

  /** @type {'violet' | 'green' | 'merged'} */
  let theme = $state(validThemes.includes(themeParam) ? themeParam : "merged");
  /** @type {'bento' | 'sidebar' | 'editorial'} */
  let layout = $state(validLayouts.includes(layoutParam) ? layoutParam : "bento");

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

  // Editorial ledger reads chronologically: education first, then experience
  // in the order it already appears (reverse-chronological, resume convention).
  const ledgerEntries = [
    ...education.map((e) => ({ ...e, kind: "EDUCATION" })),
    ...experience.map((e) => ({ ...e, kind: "EXPERIENCE" })),
  ];

  const themes = [
    { id: "violet", label: "Violet" },
    { id: "green", label: "Green" },
    { id: "merged", label: "Merged" },
  ];
  const layouts = [
    { id: "bento", label: "Bento" },
    { id: "sidebar", label: "Sidebar" },
    { id: "editorial", label: "Editorial" },
  ];

  onMount(() => {
    document.body.classList.add("immersive");
    return () => document.body.classList.remove("immersive");
  });
</script>

<svelte:head>
  <title>Draft theme comparison — not for indexing</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="draft-shell" data-theme={theme} data-layout={layout}>
  <div class="draft-banner">
    <span>DRAFT — private, not linked from the live site</span>
    <a href="/">&larr; back to real site</a>
  </div>

  <div class="draft-switcher">
    <div class="switch-group" role="tablist" aria-label="Layout variant">
      <span class="switch-group-label">Layout</span>
      {#each layouts as l}
        <button
          class="switch-btn"
          class:active={layout === l.id}
          role="tab"
          aria-selected={layout === l.id}
          onclick={() => (layout = l.id)}
        >
          {l.label}
        </button>
      {/each}
    </div>
    <div class="switch-group" role="tablist" aria-label="Theme variant">
      <span class="switch-group-label">Theme</span>
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
  </div>

  {#if layout !== "sidebar"}
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
          <a class="t-btn t-btn-primary">Resume</a>
        </div>
      </div>
    </header>
  {/if}

  <!-- ═══════════════════════════════ BENTO LAYOUT ═══════════════════════════ -->
  {#if layout === "bento"}
    <main class="bento-main">
      <div class="bento-grid">
        <section class="t-card bento-hero">
          <span class="t-kicker">OPERATOR // DREW PILAT // M.S. CS, UCHICAGO</span>
          <h1 class="t-heading bento-name">Drew Pilat</h1>
          <p class="t-lead">
            M.S. Computer Science, University of Chicago — graduating Spring 2027.
            Interested in quant finance, precision medicine, and early-to-late stage startups.
          </p>
          <div class="bento-cta">
            <a href="/Drew_Pilat_Resume.pdf" download class="t-btn t-btn-primary">Resume</a>
            <a href="/projects" class="t-btn">Projects</a>
          </div>
        </section>

        <aside class="t-card bento-currently">
          <h2 class="t-section-label">Currently</h2>
          <div class="bento-stat-list">
            {#each now as row}
              <div class="bento-stat">
                <span class="bento-stat-k">{row.k}</span>
                <span class="bento-stat-v">{row.v}</span>
              </div>
            {/each}
          </div>
        </aside>

        <section class="t-card bento-education">
          <h2 class="t-section-label">Education</h2>
          {#each education as item}
            <div class="bento-entry">
              <div class="bento-entry-head">
                <span class="bento-org">{item.org}</span>
                <span class="bento-date">{item.date}</span>
              </div>
              <div class="bento-role">{item.role}</div>
              {#each item.notes as note}
                <p class="t-muted-sm">{note}</p>
              {/each}
            </div>
          {/each}
        </section>

        <section class="t-card bento-exp bento-wellnest">
          <div class="bento-entry-head">
            <span class="bento-org">{experience[2].org}</span>
            <span class="bento-date">{experience[2].date}</span>
          </div>
          <div class="bento-role">{experience[2].role}</div>
          <div class="t-tag-row">
            {#each experience[2].tags as tag}
              <span class="t-tag t-tag-{tag.tone}">{tag.label}</span>
            {/each}
          </div>
          <ul class="bento-bullets">
            {#each experience[2].bullets as [label, text]}
              <li><strong>{label}:</strong> {text}</li>
            {/each}
          </ul>
        </section>

        <section class="t-card bento-exp bento-jumpstart">
          <div class="bento-entry-head">
            <span class="bento-org">{experience[1].org}</span>
            <span class="bento-date">{experience[1].date}</span>
          </div>
          <div class="bento-role">{experience[1].role}</div>
          <div class="t-tag-row">
            {#each experience[1].tags as tag}
              <span class="t-tag t-tag-{tag.tone}">{tag.label}</span>
            {/each}
          </div>
          <ul class="bento-bullets">
            {#each experience[1].bullets as [label, text]}
              <li><strong>{label}:</strong> {text}</li>
            {/each}
          </ul>
        </section>

        <section class="t-card bento-exp bento-benzinga">
          <div class="bento-entry-head">
            <span class="bento-org">{experience[0].org}</span>
            <span class="bento-date">{experience[0].date}</span>
          </div>
          <div class="bento-role">{experience[0].role}</div>
          <div class="t-tag-row">
            {#each experience[0].tags as tag}
              <span class="t-tag t-tag-{tag.tone}">{tag.label}</span>
            {/each}
          </div>
          <ul class="bento-bullets">
            {#each experience[0].bullets as [label, text]}
              <li><strong>{label}:</strong> {text}</li>
            {/each}
          </ul>
        </section>
      </div>
    </main>
  {/if}

  <!-- ═══════════════════════════════ SIDEBAR LAYOUT ═════════════════════════ -->
  {#if layout === "sidebar"}
    <div class="sidebar-wrap">
      <aside class="sidebar-rail">
        <div class="rail-brand">Drew Pilat</div>
        <div class="rail-status">
          <span class="rail-status-dot"></span>
          Open to work · <Clock />
        </div>
        <nav class="rail-nav">
          <a href="#currently">Currently</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
        </nav>
        <div class="rail-cta">
          <a href="/Drew_Pilat_Resume.pdf" download class="t-btn t-btn-primary">Resume</a>
          <a href="/projects" class="t-btn">Projects</a>
        </div>
      </aside>

      <main class="sidebar-doc">
        <section class="doc-hero">
          <span class="t-kicker">OPERATOR // DREW PILAT // M.S. CS, UCHICAGO</span>
          <h1 class="t-heading doc-name">Drew Pilat</h1>
          <p class="t-lead">
            M.S. Computer Science, University of Chicago — graduating Spring 2027.
            Interested in quant finance, precision medicine, and early-to-late stage startups.
          </p>
        </section>

        <div class="t-rule"></div>

        <section id="currently" class="doc-section">
          <h2 class="t-section-label">Currently</h2>
          <div class="doc-rows">
            {#each now as row}
              <div class="doc-row">
                <span class="doc-k">{row.k}</span>
                <span class="doc-v">{row.v}</span>
              </div>
            {/each}
          </div>
        </section>

        <div class="t-rule"></div>

        <section id="education" class="doc-section">
          <h2 class="t-section-label">Education</h2>
          {#each education as item, i}
            <div class="doc-entry">
              <div class="doc-entry-head">
                <span class="doc-org">{item.org}</span>
                <span class="doc-date">{item.date}</span>
              </div>
              <div class="doc-role">{item.role}</div>
              {#each item.notes as note}
                <p class="t-muted-sm">{note}</p>
              {/each}
            </div>
            {#if i < education.length - 1}<div class="t-rule thin"></div>{/if}
          {/each}
        </section>

        <div class="t-rule"></div>

        <section id="experience" class="doc-section">
          <h2 class="t-section-label">Experience</h2>
          {#each experience as job, i}
            <div class="doc-entry">
              <div class="doc-entry-head">
                <span class="doc-org">{job.org}</span>
                <span class="doc-date">{job.date}</span>
              </div>
              <div class="doc-role">{job.role}</div>
              <div class="t-tag-row">
                {#each job.tags as tag}
                  <span class="t-tag t-tag-{tag.tone}">{tag.label}</span>
                {/each}
              </div>
              <ul class="doc-bullets">
                {#each job.bullets as [label, text]}
                  <li><strong>{label}:</strong> {text}</li>
                {/each}
              </ul>
            </div>
            {#if i < experience.length - 1}<div class="t-rule thin"></div>{/if}
          {/each}
        </section>
      </main>
    </div>
  {/if}

  <!-- ═══════════════════════════════ EDITORIAL LAYOUT ═══════════════════════ -->
  {#if layout === "editorial"}
    <main class="editorial-main">
      <section class="editorial-hero">
        <span class="t-kicker">OPERATOR // DREW PILAT // M.S. CS, UCHICAGO</span>
        <h1 class="t-heading editorial-name">Drew Pilat</h1>
        <p class="editorial-lead">
          M.S. Computer Science, University of Chicago — graduating Spring 2027.
          Interested in quant finance, precision medicine, and early-to-late stage startups.
        </p>
        <div class="editorial-cta">
          <a href="/Drew_Pilat_Resume.pdf" download class="t-btn t-btn-primary">Resume</a>
          <a href="/projects" class="t-btn">Projects</a>
        </div>
      </section>

      <div class="editorial-strip">
        {#each now as row}
          <div class="strip-chip">
            <span class="strip-k">{row.k}</span>
            <span class="strip-v">{row.v}</span>
          </div>
        {/each}
      </div>

      <div class="editorial-ledger">
        {#each ledgerEntries as entry, i}
          <div class="ledger-row">
            <div class="ledger-date-col">
              <span class="ledger-kind">{entry.kind}</span>
              <span class="ledger-date">{entry.date}</span>
            </div>
            <div class="ledger-content">
              <div class="ledger-org">{entry.org}</div>
              <h3 class="ledger-role">{entry.role}</h3>

              {#if entry.notes}
                {#each entry.notes as note}
                  <p class="t-muted-sm">{note}</p>
                {/each}
              {/if}

              {#if entry.tags}
                <div class="t-tag-row">
                  {#each entry.tags as tag}
                    <span class="t-tag t-tag-{tag.tone}">{tag.label}</span>
                  {/each}
                </div>
              {/if}

              {#if entry.bullets}
                <blockquote class="ledger-pullquote">
                  {entry.bullets[0][1]}
                </blockquote>
                {#if entry.bullets.length > 1}
                  <ul class="ledger-bullets">
                    {#each entry.bullets.slice(1) as [label, text]}
                      <li><strong>{label}:</strong> {text}</li>
                    {/each}
                  </ul>
                {/if}
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </main>
  {/if}
</div>

<style>
  /* ═══════════════════════════════════════════════════════════════════════
     SHELL / BANNER / SWITCHER  (layout- and theme-independent)
     ═══════════════════════════════════════════════════════════════════════ */
  .draft-shell {
    min-height: 100vh;
    color: #d6dae4;
    font-family: var(--font-sans);
    position: relative;
    padding-bottom: 6rem;
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
    flex-direction: column;
    gap: 0.4rem;
    background: rgba(10, 10, 14, 0.92);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    padding: 0.5rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  }

  .switch-group {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .switch-group-label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6b7488;
    width: 3.4rem;
    flex-shrink: 0;
  }

  .switch-btn {
    background: transparent;
    border: none;
    color: #8b95b2;
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.35rem 0.65rem;
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

  /* ═══════════════════════════════════════════════════════════════════════
     SHARED TOKEN-DRIVEN UTILITIES (used by all three layouts)
     ═══════════════════════════════════════════════════════════════════════ */
  .t-card {
    background: var(--t-surface);
    backdrop-filter: var(--t-blur);
    border: 1px solid var(--t-border);
    border-radius: var(--t-radius);
    padding: 1.5rem 1.75rem;
    transition: border-color 0.25s, box-shadow 0.25s;
  }

  .t-card:hover {
    border-color: var(--t-border-hover);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px var(--t-glow);
  }

  .t-kicker {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    color: var(--t-kicker-color);
    margin-bottom: 0.85rem;
  }

  .t-heading {
    font-family: var(--t-heading-font);
    font-weight: 700;
    color: var(--t-heading-color);
    letter-spacing: -0.02em;
  }

  .t-lead {
    max-width: 50ch;
    font-size: 1rem;
    line-height: 1.65;
    color: var(--t-muted);
    margin: 0;
  }

  .t-muted-sm {
    font-size: 0.85rem;
    color: var(--t-muted);
    line-height: 1.45;
    margin: 0 0 0.2rem;
  }

  .t-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.1rem;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid var(--t-border);
    border-radius: var(--t-radius-sm);
    color: var(--t-heading-color);
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
  }

  .t-btn:hover {
    border-color: var(--t-border-hover);
  }

  .t-btn-primary {
    background: var(--t-accent);
    border-color: var(--t-accent);
    color: var(--t-accent-contrast);
  }

  .t-section-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--t-accent-bright);
    margin: 0 0 1rem;
  }

  .t-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.5rem 0 0.8rem;
  }

  .t-tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    padding: 0.2rem 0.55rem;
    border-radius: var(--t-radius-sm);
  }

  .t-tag-purple { background: rgba(158, 110, 222, 0.18); color: #d4b8ff; }
  .t-tag-orange { background: rgba(255, 159, 67, 0.18); color: #ffc078; }
  .t-tag-cyan { background: rgba(92, 225, 255, 0.15); color: #7eecff; }
  .t-tag-green { background: rgba(62, 224, 127, 0.15); color: #5eeba0; }
  .t-tag-pink { background: rgba(255, 122, 162, 0.18); color: #ff9fbd; }

  .draft-shell[data-theme="green"] .t-tag {
    background: transparent !important;
    border: 1px solid currentColor;
    border-radius: 0;
  }

  .t-rule {
    height: 1px;
    background: var(--t-rule);
    margin: 2rem 0;
  }

  .t-rule.thin {
    margin: 1.5rem 0;
    opacity: 0.6;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     SHARED NAV (bento + editorial)
     ═══════════════════════════════════════════════════════════════════════ */
  .draft-nav {
    position: sticky;
    top: 2.6rem;
    z-index: 60;
    background: var(--t-surface);
    backdrop-filter: var(--t-blur);
    border-bottom: 1px solid var(--t-border);
  }

  .draft-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.85rem 2rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .draft-brand {
    font-family: var(--t-heading-font);
    font-weight: 700;
    color: var(--t-heading-color);
    font-size: 0.9rem;
  }

  .draft-nav-links {
    display: flex;
    gap: 0.3rem;
    flex: 1;
  }

  .draft-nav-links a {
    color: var(--t-muted);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    border-radius: var(--t-radius-sm);
    cursor: default;
    text-decoration: none;
  }

  .draft-nav-links a.active {
    color: var(--t-accent-bright);
    background: var(--t-glow);
  }

  .draft-nav-end {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     THEME TOKENS
     ═══════════════════════════════════════════════════════════════════════ */
  .draft-shell[data-theme="violet"] {
    background:
      radial-gradient(ellipse 60% 40% at 15% -5%, rgba(158, 110, 222, 0.28), transparent 55%),
      radial-gradient(ellipse 45% 30% at 90% 5%, rgba(92, 225, 255, 0.12), transparent 50%),
      #000000;
    --t-surface: rgba(10, 12, 20, 0.72);
    --t-surface-solid: rgba(10, 12, 20, 0.92);
    --t-border: rgba(255, 255, 255, 0.1);
    --t-border-hover: rgba(158, 110, 222, 0.45);
    --t-radius: 20px;
    --t-radius-sm: 999px;
    --t-accent: #9e6ede;
    --t-accent-bright: #c4a3f5;
    --t-accent-contrast: #ffffff;
    --t-heading-color: #ffffff;
    --t-heading-font: var(--font-sans);
    --t-kicker-color: #ffc078;
    --t-muted: #9aa3b8;
    --t-glow: rgba(158, 110, 222, 0.15);
    --t-rule: rgba(255, 255, 255, 0.12);
    --t-blur: blur(20px) saturate(180%);
  }

  .draft-shell[data-theme="green"] {
    background-color: #000000;
    background-image:
      repeating-linear-gradient(0deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px),
      repeating-linear-gradient(90deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px);
    --t-surface: #060a08;
    --t-surface-solid: #060a08;
    --t-border: rgba(62, 224, 127, 0.18);
    --t-border-hover: rgba(62, 224, 127, 0.5);
    --t-radius: 2px;
    --t-radius-sm: 2px;
    --t-accent: #3ee07f;
    --t-accent-bright: #7dffb3;
    --t-accent-contrast: #06120a;
    --t-heading-color: #ffffff;
    --t-heading-font: var(--font-mono);
    --t-kicker-color: #ff9f43;
    --t-muted: #9aa3b8;
    --t-glow: rgba(62, 224, 127, 0.12);
    --t-rule: rgba(62, 224, 127, 0.25);
    --t-blur: none;
  }

  .draft-shell[data-theme="merged"] {
    background:
      radial-gradient(ellipse 55% 35% at 12% -5%, rgba(158, 110, 222, 0.16), transparent 55%),
      radial-gradient(ellipse 40% 28% at 92% 4%, rgba(62, 224, 127, 0.08), transparent 50%),
      #000000;
    background-image:
      repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 34px),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 34px);
    --t-surface: rgba(10, 12, 20, 0.78);
    --t-surface-solid: rgba(10, 12, 20, 0.92);
    --t-border: rgba(255, 255, 255, 0.1);
    --t-border-hover: rgba(158, 110, 222, 0.4);
    --t-radius: 12px;
    --t-radius-sm: 8px;
    --t-accent: #9e6ede;
    --t-accent-bright: #c4a3f5;
    --t-accent-contrast: #ffffff;
    --t-heading-color: #ffffff;
    --t-heading-font: var(--font-sans);
    --t-kicker-color: #7dffb3;
    --t-muted: #9aa3b8;
    --t-glow: rgba(158, 110, 222, 0.12);
    --t-rule: rgba(255, 255, 255, 0.12);
    --t-blur: blur(18px) saturate(170%);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     LAYOUT: BENTO GRID
     ═══════════════════════════════════════════════════════════════════════ */
  .bento-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2.5rem 2rem 4rem;
  }

  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "hero hero hero hero"
      "currently education education benzinga"
      "currently wellnest jumpstart benzinga";
    gap: 1.1rem;
  }

  .bento-hero { grid-area: hero; }
  .bento-currently { grid-area: currently; display: flex; flex-direction: column; }
  .bento-education { grid-area: education; }
  .bento-wellnest { grid-area: wellnest; }
  .bento-jumpstart { grid-area: jumpstart; }
  .bento-benzinga { grid-area: benzinga; overflow-y: auto; }

  .bento-name {
    font-size: clamp(2rem, 4vw, 2.6rem);
    margin: 0 0 0.75rem;
  }

  .bento-cta {
    display: flex;
    gap: 0.7rem;
    margin-top: 1.4rem;
  }

  .bento-stat-list {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    flex: 1;
  }

  .bento-stat {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .bento-stat-k {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--t-accent-bright);
  }

  .bento-stat-v {
    font-size: 0.85rem;
    line-height: 1.4;
    color: #dfe3ec;
  }

  .bento-entry {
    margin-bottom: 1rem;
  }

  .bento-entry:last-child {
    margin-bottom: 0;
  }

  .bento-entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.3rem;
  }

  .bento-org {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--t-muted);
  }

  .bento-date {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    color: var(--t-muted);
  }

  .bento-role {
    font-size: 1.02rem;
    font-weight: 700;
    color: var(--t-heading-color);
    margin-bottom: 0.3rem;
  }

  .bento-bullets {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .bento-bullets li {
    font-size: 0.82rem;
    line-height: 1.5;
    color: #c1c7d6;
  }

  .bento-bullets li strong {
    color: var(--t-heading-color);
  }

  @media (max-width: 900px) {
    .bento-grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        "hero"
        "currently"
        "education"
        "wellnest"
        "jumpstart"
        "benzinga";
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     LAYOUT: FIXED SIDEBAR DOSSIER
     ═══════════════════════════════════════════════════════════════════════ */
  .sidebar-wrap {
    display: grid;
    grid-template-columns: minmax(220px, 280px) 1fr;
    max-width: 1200px;
    margin: 0 auto;
  }

  .sidebar-rail {
    position: sticky;
    top: 0;
    height: 100vh;
    padding: 3rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-right: 1px solid var(--t-border);
  }

  .rail-brand {
    font-family: var(--t-heading-font);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--t-heading-color);
  }

  .rail-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--t-muted);
  }

  .rail-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--t-accent);
    box-shadow: 0 0 6px var(--t-accent);
    flex-shrink: 0;
  }

  .rail-nav {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .rail-nav a {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--t-muted);
    text-decoration: none;
  }

  .rail-nav a:hover {
    color: var(--t-heading-color);
  }

  .rail-cta {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-top: auto;
  }

  .rail-cta .t-btn {
    justify-content: center;
  }

  .sidebar-doc {
    padding: 3rem 2.5rem 6rem;
    max-width: 720px;
  }

  .doc-hero {
    margin-bottom: 0;
  }

  .doc-name {
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin: 0 0 0.75rem;
  }

  .doc-section h2 {
    margin-top: 0;
  }

  .doc-rows {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .doc-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 1rem;
  }

  .doc-k {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--t-accent-bright);
  }

  .doc-v {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #dfe3ec;
  }

  .doc-entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.3rem;
  }

  .doc-org {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--t-muted);
  }

  .doc-date {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--t-muted);
  }

  .doc-role {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--t-heading-color);
    margin-bottom: 0.4rem;
  }

  .doc-bullets {
    list-style: none;
    margin: 0.4rem 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .doc-bullets li {
    font-size: 0.9rem;
    line-height: 1.55;
    color: #c1c7d6;
  }

  .doc-bullets li strong {
    color: var(--t-heading-color);
  }

  @media (max-width: 860px) {
    .sidebar-wrap {
      grid-template-columns: 1fr;
    }
    .sidebar-rail {
      position: static;
      height: auto;
      border-right: none;
      border-bottom: 1px solid var(--t-border);
      padding: 2rem 1.5rem;
    }
    .sidebar-doc {
      padding: 2rem 1.5rem 4rem;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     LAYOUT: EDITORIAL LEDGER
     ═══════════════════════════════════════════════════════════════════════ */
  .editorial-main {
    max-width: 900px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }

  .editorial-hero {
    margin-bottom: 2.5rem;
  }

  .editorial-name {
    font-size: clamp(2.6rem, 6vw, 4rem);
    margin: 0 0 1.1rem;
    line-height: 1;
  }

  .editorial-lead {
    max-width: 56ch;
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--t-muted);
    margin: 0 0 1.6rem;
  }

  .editorial-cta {
    display: flex;
    gap: 0.7rem;
  }

  .editorial-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1.4rem;
    padding: 1.4rem 0;
    border-top: 1px solid var(--t-rule);
    border-bottom: 1px solid var(--t-rule);
    margin-bottom: 3rem;
  }

  .strip-chip {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 160px;
  }

  .strip-k {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--t-accent-bright);
  }

  .strip-v {
    font-size: 0.8rem;
    color: var(--t-muted);
    line-height: 1.4;
  }

  .editorial-ledger {
    display: flex;
    flex-direction: column;
  }

  .ledger-row {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 2rem;
    padding: 2.2rem 0;
    border-bottom: 1px solid var(--t-rule);
  }

  .ledger-row:last-child {
    border-bottom: none;
  }

  .ledger-date-col {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .ledger-kind {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    color: var(--t-accent-bright);
  }

  .ledger-date {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--t-muted);
  }

  .ledger-org {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--t-muted);
    margin-bottom: 0.3rem;
  }

  .ledger-role {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--t-heading-color);
    margin: 0 0 0.6rem;
    font-family: var(--t-heading-font);
  }

  .ledger-pullquote {
    font-size: 1.05rem;
    line-height: 1.55;
    color: #dfe3ec;
    font-style: italic;
    border-left: 2px solid var(--t-accent);
    padding-left: 1rem;
    margin: 0.9rem 0;
  }

  .ledger-bullets {
    list-style: none;
    margin: 0.5rem 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ledger-bullets li {
    font-size: 0.88rem;
    line-height: 1.55;
    color: #b5bccb;
  }

  .ledger-bullets li strong {
    color: var(--t-heading-color);
  }

  @media (max-width: 700px) {
    .ledger-row {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }
  }
</style>
