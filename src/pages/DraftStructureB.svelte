<script>
  import { onMount } from "svelte";

  let activeStep = $state(0);
  let isMobile = $state(false);

  // ── Chapters: career told as a guided sequence ─────────────────────────────
  const chapters = [
    {
      era: "2016 — 2020 · ANN ARBOR, MI",
      title: "Origins",
      subtitle: "B.B.A., Ross School of Business, University of Michigan.",
      body: "Specialized in Financial Markets and Entrepreneurial Law — the two threads that end up running through everything after this.",
      tag: "EDUCATION",
      nodeId: "michigan",
      stat: "SPECIALIZATION: FINANCIAL MARKETS · ENTREPRENEURIAL LAW",
    },
    {
      era: "2019 — 2022 · REMOTE",
      title: "Building Wellnest",
      subtitle: "Co-Founder & COO of a VC-backed mental health startup.",
      body: "Raised $800,000 in pre-seed funding from venture firms and angel investors, signed institutional partnerships with UPenn and Boston University, and ran product for a consumer mindfulness app that held a 5.0 App Store rating.",
      takeaway: "Wound down in 2022 — but it's where I learned that a 5.0 rating and a partnership logo don't pay the bills by themselves.",
      tag: "FOUNDER / COO",
      nodeId: "wellnest",
      stat: "$800K RAISED · 5.0★ APP STORE RATING",
    },
    {
      era: "2022 — 2023 · HEALTHCARE VC",
      title: "Investing at Jumpstart",
      subtitle: "Investment Associate, Jumpstart Health Investors.",
      body: "Evaluated 200+ investment opportunities and presented memos to the Investment Committee, analyzed historical fund data to inform deployment strategy, and mapped market trends across the healthcare startup ecosystem.",
      tag: "VENTURE CAPITAL",
      nodeId: "jumpstart",
      stat: "200+ DEALS EVALUATED",
    },
    {
      era: "2023 — 2025 · FINTECH MEDIA",
      title: "Operating at Benzinga",
      subtitle: "Chief of Staff — product, strategy, and P&L ownership.",
      body: "Led a data product that generated $500,000+ after release, built churn models with 85% accuracy that lifted CLV 20%, engineered factor-based equity ranking models for Benzinga Quant, and ran the P&L for a virtual events line that did $350,000+ in 2024.",
      takeaway: "Also rebuilt mobile acquisition around an attribution model, cutting CAC 33% — the closest I got to doing quant work and growth ops in the same week.",
      tag: "CHIEF OF STAFF",
      nodeId: "benzinga",
      stat: "$500K+ PRODUCT · $350K+ P&L · CAC −33%",
    },
    {
      era: "EXPECTED 2027 · CHICAGO, IL",
      title: "Now: UChicago",
      subtitle: "M.S. Computer Science, specializing in High Performance Computing.",
      body: "Coursework in Discrete Mathematics, Python for Data Science, Algorithms, and Databases. Looking for internships in 2026 and full-time roles in 2027 — quant finance, precision medicine, and early-to-late stage startups.",
      tag: "CURRENT",
      nodeId: "uchicago",
      stat: "OPEN TO: INTERNSHIPS (2026) · FULL-TIME (2027)",
    },
  ];

  // ── Node positions for the synced orbit diagram ─────────────────────────────
  const nodePositions = {
    michigan: { x: 90, y: 300 },
    wellnest: { x: 230, y: 150 },
    jumpstart: { x: 400, y: 300 },
    benzinga: { x: 560, y: 150 },
    uchicago: { x: 700, y: 300 },
  };
  const nodeOrder = ["michigan", "wellnest", "jumpstart", "benzinga", "uchicago"];

  function scrollyStep(node, stepIndex) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeStep = stepIndex;
        });
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }

  function scrollToStep(stepIndex) {
    const cards = document.querySelectorAll(".chapter-wrapper");
    if (cards[stepIndex]) {
      cards[stepIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  onMount(() => {
    document.body.classList.add("immersive");
    const checkMobile = () => (isMobile = window.innerWidth < 960);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleKeydown = (e) => {
      if (e.target instanceof HTMLInputElement) return;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) {
        if (activeStep < chapters.length - 1) {
          e.preventDefault();
          scrollToStep(activeStep + 1);
        }
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        if (activeStep > 0) {
          e.preventDefault();
          scrollToStep(activeStep - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("keydown", handleKeydown);
      document.body.classList.remove("immersive");
    };
  });
</script>

<svelte:head>
  <title>Draft structure B — not for indexing</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="instrument">
  <div class="draft-banner">
    <span>DRAFT — private, not linked from the live site · structural prototype B</span>
    <a href="/">&larr; back to real site</a>
  </div>

  <!-- Ticker-tape HUD, same convention as the visual essays -->
  <aside class="tape-hud" aria-label="Reading progress">
    <div class="tape-content">
      <a href="/" class="tape-back">&lt; DREW.FUN</a>
      <span class="tape-divider">//</span>
      <span class="tape-title">CAREER TIMELINE</span>
      <span class="tape-cursor" aria-hidden="true"></span>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        class="tape-meter"
        role="progressbar"
        aria-valuenow={activeStep + 1}
        aria-valuemin="1"
        aria-valuemax={chapters.length}
        onclick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          const targetIdx = Math.min(
            chapters.length - 1,
            Math.max(0, Math.floor(ratio * chapters.length)),
          );
          scrollToStep(targetIdx);
        }}
      >
        {#each chapters as _, i}
          <span class="meter-tick" class:lit={i <= activeStep}></span>
        {/each}
      </div>
      <span class="tape-counter">[ {String(activeStep + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")} ]</span>
    </div>
  </aside>

  <div class="scrolly-wrapper">
    <!-- LEFT: narrative chapters -->
    <div class="scroll-track">
      <section class="chapter-wrapper intro-wrapper">
        <div class="slip-card intro-card">
          <span class="slip-rec">START</span>
          <h1 class="intro-title">Drew Pilat</h1>
          <p class="intro-lead">
            M.S. Computer Science, University of Chicago — graduating Spring 2027.
            Scroll to walk through how I got here.
          </p>
          <div class="intro-cta">
            <a href="/Drew_Pilat_Resume.pdf" download class="intro-btn primary">Resume</a>
            <a href="/projects" class="intro-btn">Projects</a>
          </div>
        </div>
      </section>

      {#each chapters as ch, idx}
        <section class="chapter-wrapper" use:scrollyStep={idx}>
          <div class="slip-card" class:active-card={activeStep === idx}>
            <div class="slip-head">
              <span class="slip-rec">No. {String(idx + 1).padStart(2, "0")}</span>
              <span class="slip-era">{ch.era}</span>
            </div>
            <span class="slip-tag">{ch.tag}</span>
            <h2 class="slip-title">{ch.title}</h2>
            <h3 class="slip-subtitle">{ch.subtitle}</h3>
            <p class="slip-prose">{ch.body}</p>
            {#if ch.takeaway}
              <div class="slip-takeaway">
                <span class="takeaway-mark">&gt;</span>
                <p>{ch.takeaway}</p>
              </div>
            {/if}
            {#if ch.stat}
              <div class="slip-stat">
                <span class="stat-dot"></span>
                <span>{ch.stat}</span>
              </div>
            {/if}
          </div>
        </section>
      {/each}
    </div>

    <!-- RIGHT: sticky synced stage -->
    {#if !isMobile}
      <div class="sticky-stage-col">
        <div class="sticky-viewport">
          <div class="stage-bezel">
            <div class="stage-screen">
              <div class="readout-strip">
                <span class="readout-dot"></span>
                <span class="readout-text">
                  {#if activeStep === -1}
                    CAREER TIMELINE · READY
                  {:else}
                    {chapters[activeStep].tag} · {chapters[activeStep].era}
                  {/if}
                </span>
              </div>

              <div class="stage-body">
                <svg viewBox="0 0 790 400" class="timeline-svg" preserveAspectRatio="xMidYMid meet">
                  <!-- base connecting line through all nodes -->
                  <line x1="90" y1="300" x2="700" y2="300" class="base-line" />

                  {#each nodeOrder as id, i}
                    {@const pos = nodePositions[id]}
                    {@const chapterIdx = chapters.findIndex((c) => c.nodeId === id)}
                    {@const isActive = chapterIdx === activeStep}
                    {@const isPast = chapterIdx < activeStep}
                    <line
                      x1={pos.x}
                      y1="300"
                      x2={pos.x}
                      y2={pos.y}
                      class="drop-line"
                      class:lit={isActive || isPast}
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isActive ? 13 : 8}
                      class="timeline-node"
                      class:active={isActive}
                      class:past={isPast}
                    />
                    <text x={pos.x} y="330" text-anchor="middle" class="timeline-label" class:lit={isActive || isPast}>
                      {chapters[chapterIdx].title.toUpperCase()}
                    </text>
                  {/each}

                  <!-- animated pulse ring on the active node -->
                  {#if activeStep >= 0}
                    {@const activePos = nodePositions[chapters[activeStep].nodeId]}
                    <circle
                      cx={activePos.x}
                      cy={activePos.y}
                      r="20"
                      class="pulse-ring"
                    />
                  {/if}
                </svg>

                {#if activeStep >= 0}
                  <div class="stat-overlay">
                    <span class="overlay-label">{chapters[activeStep].tag}</span>
                    <span class="overlay-stat">{chapters[activeStep].stat}</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .instrument {
    background-color: #000000;
    background-image:
      repeating-linear-gradient(0deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px),
      repeating-linear-gradient(90deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px);
    color: #d6dae4;
    min-height: 100vh;
    font-family: var(--font-mono);
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

  /* ── Ticker-tape HUD ─────────────────────────────────────────────────────── */
  .tape-hud {
    position: sticky;
    top: 2.6rem;
    z-index: 90;
    background: #050706;
    border-bottom: 1px solid rgba(62, 224, 127, 0.35);
  }

  .tape-content {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0.7rem 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .tape-back {
    color: #7dffb3;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-decoration: none;
    flex-shrink: 0;
  }

  .tape-divider {
    opacity: 0.3;
    flex-shrink: 0;
  }

  .tape-title {
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    flex-shrink: 0;
  }

  .tape-cursor {
    display: inline-block;
    width: 6px;
    height: 12px;
    background: #7dffb3;
    animation: blink 1.1s steps(1) infinite;
    flex-shrink: 0;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .tape-meter {
    flex: 1;
    display: flex;
    gap: 3px;
    cursor: pointer;
    padding: 0.5rem 0;
  }

  .meter-tick {
    flex: 1;
    height: 3px;
    background: rgba(62, 224, 127, 0.15);
    transition: background 0.2s;
  }

  .meter-tick.lit {
    background: #3ee07f;
    box-shadow: 0 0 6px rgba(62, 224, 127, 0.6);
  }

  .tape-counter {
    font-size: 0.7rem;
    color: #ff9f43;
    flex-shrink: 0;
  }

  /* ── Layout ──────────────────────────────────────────────────────────────── */
  .scrolly-wrapper {
    display: grid;
    grid-template-columns: minmax(320px, 480px) 1fr;
    max-width: 1440px;
    margin: 0 auto;
  }

  .scroll-track {
    padding: 2rem 2.5rem 40vh;
  }

  .chapter-wrapper {
    min-height: 70vh;
    display: flex;
    align-items: center;
  }

  .intro-wrapper {
    min-height: 50vh;
  }

  .slip-card {
    background: #060a08;
    border: 1px solid rgba(62, 224, 127, 0.18);
    border-radius: 2px;
    padding: 1.6rem 1.8rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    transition: border-color 0.25s;
    width: 100%;
  }

  .slip-card.active-card {
    border-color: rgba(62, 224, 127, 0.5);
  }

  .intro-card {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
  }

  .intro-title {
    font-size: clamp(1.8rem, 4vw, 2.4rem);
    color: #ffffff;
    margin: 0.5rem 0 0.75rem;
    letter-spacing: -0.01em;
  }

  .intro-lead {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #9aa3b8;
    max-width: 42ch;
    margin: 0 0 1.4rem;
  }

  .intro-cta {
    display: flex;
    gap: 0.6rem;
  }

  .intro-btn {
    display: inline-flex;
    padding: 0.55rem 1.05rem;
    font-size: 0.78rem;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid rgba(62, 224, 127, 0.35);
    color: #7dffb3;
    border-radius: 2px;
  }

  .intro-btn.primary {
    background: #3ee07f;
    border-color: #3ee07f;
    color: #06120a;
  }

  .slip-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .slip-rec {
    font-size: 0.62rem;
    opacity: 0.5;
    letter-spacing: 0.08em;
  }

  .slip-era {
    font-size: 0.66rem;
    color: #ff9f43;
    letter-spacing: 0.04em;
  }

  .slip-tag {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #7dffb3;
    border: 1px solid rgba(62, 224, 127, 0.35);
    padding: 0.15rem 0.5rem;
    margin-bottom: 0.6rem;
  }

  .slip-title {
    font-size: 1.4rem;
    color: #ffffff;
    margin: 0 0 0.3rem;
    letter-spacing: -0.01em;
  }

  .slip-subtitle {
    font-size: 0.85rem;
    font-weight: 400;
    color: #7dffb3;
    margin: 0 0 0.9rem;
  }

  .slip-prose {
    font-size: 0.86rem;
    line-height: 1.65;
    color: #b5bccb;
    margin: 0 0 1rem;
  }

  .slip-takeaway {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-left: 2px solid #ff9f43;
    padding: 0.6rem 0.8rem;
    margin-bottom: 1rem;
  }

  .takeaway-mark {
    color: #ff9f43;
  }

  .slip-takeaway p {
    font-size: 0.82rem;
    line-height: 1.55;
    color: #dfe3ec;
    margin: 0;
  }

  .slip-stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.66rem;
    letter-spacing: 0.03em;
    color: #ff9f43;
  }

  .stat-dot {
    width: 5px;
    height: 5px;
    background: #ff9f43;
    box-shadow: 0 0 5px #ff9f43;
  }

  /* ── Sticky stage ────────────────────────────────────────────────────────── */
  .sticky-stage-col {
    position: relative;
  }

  .sticky-viewport {
    position: sticky;
    top: 8rem;
    padding: 2rem;
    height: calc(100vh - 10rem);
    display: flex;
    align-items: center;
  }

  .stage-bezel {
    width: 100%;
    background: #050706;
    border: 1px solid rgba(62, 224, 127, 0.25);
    border-radius: 4px;
    padding: 0.5rem;
  }

  .stage-screen {
    background: #020403;
    border-radius: 2px;
    overflow: hidden;
  }

  .readout-strip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-bottom: 1px solid rgba(62, 224, 127, 0.15);
  }

  .readout-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3ee07f;
    box-shadow: 0 0 6px #3ee07f;
  }

  .readout-text {
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    color: #7dffb3;
  }

  .stage-body {
    position: relative;
    padding: 1rem;
  }

  .timeline-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .base-line {
    stroke: rgba(62, 224, 127, 0.15);
    stroke-width: 1;
  }

  .drop-line {
    stroke: rgba(62, 224, 127, 0.12);
    stroke-width: 1;
    transition: stroke 0.3s;
  }

  .drop-line.lit {
    stroke: rgba(62, 224, 127, 0.4);
  }

  .timeline-node {
    fill: #051007;
    stroke: rgba(62, 224, 127, 0.35);
    stroke-width: 1.5;
    transition: all 0.3s;
  }

  .timeline-node.past {
    fill: #0c2214;
    stroke: rgba(62, 224, 127, 0.6);
  }

  .timeline-node.active {
    fill: #3ee07f;
    stroke: #7dffb3;
  }

  .timeline-label {
    fill: rgba(62, 224, 127, 0.3);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.03em;
    transition: fill 0.3s;
  }

  .timeline-label.lit {
    fill: #7dffb3;
  }

  .pulse-ring {
    fill: none;
    stroke: #3ee07f;
    stroke-width: 1.5;
    opacity: 0.6;
    animation: ring-pulse 2s ease-out infinite;
  }

  @keyframes ring-pulse {
    0% { r: 13; opacity: 0.7; }
    100% { r: 34; opacity: 0; }
  }

  .stat-overlay {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 1rem 1.25rem;
  }

  .overlay-label {
    font-size: 0.6rem;
    color: #ff9f43;
    letter-spacing: 0.06em;
  }

  .overlay-stat {
    font-size: 0.76rem;
    color: #dfe3ec;
    letter-spacing: 0.02em;
  }

  @media (max-width: 960px) {
    .scrolly-wrapper {
      grid-template-columns: 1fr;
    }
    .sticky-stage-col {
      display: none;
    }
    .scroll-track {
      padding: 1.5rem 1.25rem 4rem;
    }
    .chapter-wrapper {
      min-height: auto;
      padding: 1rem 0;
    }
  }
</style>
