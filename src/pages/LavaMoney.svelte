<script>
  import Figure from '../lib/Figure.svelte';

  const M = '/media/lavamoney';
</script>

<div class="page">
  <div class="wrap">
    <a href="/projects" class="mono back-link">← Projects</a>

    <header class="case-head">
      <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
        <span class="tech-label">Personal finance · Mobile &amp; Systems</span>
        <span class="badge badge-green badge-dot" style="font-size:0.72rem;letter-spacing:0.06em;">Active Development</span>
      </div>
      <h1>LavaMoney</h1>
      <p class="lead" style="max-width:32ch;margin-top:1.1rem;">
        Personal finance, built local-first.
      </p>
      <p style="max-width:62ch;color:#cbd5e1;font-size:1.05rem;line-height:1.75;margin-top:1rem;">
        I started LavaMoney to learn native mobile architecture and financial data engineering from the inside — building a fast, private wealth and budget tracker across iOS, Android, and web. What began as an exploratory project to master local-first state and real bank APIs turned into an app I rely on daily, matching the structural elegance of Copilot Money while keeping financial data on-device. Now preparing for public TestFlight beta. Sole engineer.
      </p>

      <div class="meta-grid">
        <table class="data-table">
          <tbody>
            <tr><td>Role</td><td>Sole engineer and designer</td></tr>
            <tr><td>Status</td><td>Active development · preparing beta launch</td></tr>
            <tr><td>Scale</td><td>~12,600 lines of TypeScript · 60+ components · cross-platform</td></tr>
          </tbody>
        </table>
        <table class="data-table">
          <tbody>
            <tr><td>Mobile</td><td>React Native 0.86, Expo SDK 57, Expo Router, TypeScript</td></tr>
            <tr><td>Data</td><td>Plaid Link SDK, local AsyncStorage, custom SVG charts</td></tr>
            <tr><td>Web / API</td><td>Next.js, Prisma 7, Postgres, Vercel</td></tr>
          </tbody>
        </table>
      </div>

      <div class="cta-row">
        <a href="https://github.com/dpilat1227/lava-money" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Source on GitHub →</a>
        <a href="https://www.lavamoney.io" target="_blank" rel="noopener noreferrer" class="btn">Live Web Demo</a>
        <a href="#engineering" class="btn">Engineering highlights</a>
      </div>
    </header>

    <div class="case-shell" style="margin-top: 3.5rem;">
      <nav class="toc no-print" aria-label="Case study">
        <a href="#problem">01 Approach</a>
        <a href="#interface">02 Interface</a>
        <a href="#engineering">03 Engineering</a>
        <a href="#status">04 Status</a>
      </nav>
      <div>

    <!-- ── Problem & Approach ─────────────────────────────────────────── -->
    <section class="prose" id="problem" style="padding-top: 0;">
      <span class="tech-label">01 · Approach</span>
      <h2>Your money, your data, your call</h2>
      <p>
        Most modern personal finance tools force an uncomfortable trade-off. Mainstream SaaS trackers require handing banking credentials and full transaction histories over to centralized cloud servers where data is stored, analyzed, and monetized. Offline spreadsheets protect privacy, but lack live bank sync, automatic categorization, and modern mobile ergonomics.
      </p>
      <p>
        LavaMoney bridges the gap with a <strong>local-first architecture</strong>:
      </p>
      <ul class="bullets" style="margin-top:1rem;margin-bottom:1.5rem;">
        <li>
          <strong>Real bank linking via Plaid</strong> on iOS and Android for seamless OAuth synchronization, paired with an ephemeral relay architecture that avoids storing personal financial databases in the cloud.
        </li>
        <li>
          <strong>First-class manual accounts &amp; CSV import</strong> so users who prefer not to link banks get the exact same rich analytics, charts, and budget tracking without compromise.
        </li>
        <li>
          <strong>Instant, private compute:</strong> Net worth trends, spend ceilings, and recurring bill detections are calculated directly on-device in TypeScript.
        </li>
      </ul>
    </section>

    <!-- ── Interface ────────────────────────────────────────────────────── -->
    <section id="interface">
      <span class="tech-label">02 · Interface</span>
      <h2>Designed for clarity and momentum</h2>
      <p style="max-width:62ch;color:#cbd5e1;font-size:1.02rem;line-height:1.75;margin-bottom:2.5rem;">
        Built around dark-mode aesthetics with high-contrast amber and green indicators. Native gestures, pull-to-refresh, and fluid screen transitions powered by Expo Router and native tab navigation.
      </p>

      <div class="phone-showcase">
        <div class="phone-card">
          <div class="phone-mock">
            <img src="{M}/networth-caption-fixed.png" alt="LavaMoney Net Worth screen showing balance and driver analysis" loading="lazy" />
          </div>
          <div class="phone-info">
            <span class="tech-label">Net Worth &amp; Driver Analysis</span>
            <h3>Uncontained hero with root-cause attribution</h3>
            <p>
              Rather than just displaying a passive balance, the hero calculates the mathematical driver behind net worth shifts — surfacing whether movement stemmed from checking account inflow, savings appreciation, or credit card payoff.
            </p>
          </div>
        </div>

        <div class="phone-card">
          <div class="phone-mock">
            <img src="{M}/home-accounts-after.png" alt="LavaMoney accounts overview with live sync statuses" loading="lazy" />
          </div>
          <div class="phone-info">
            <span class="tech-label">Accounts Ledger</span>
            <h3>Unified linked &amp; manual tracking</h3>
            <p>
              Accounts are grouped with live sync status indicators, balance trends, and institution badges. Manual balances can be updated in seconds or reconciled via CSV statements.
            </p>
          </div>
        </div>

        <div class="phone-card">
          <div class="phone-mock">
            <img src="{M}/trends-after.png" alt="LavaMoney spending trends with combo boundary-line and bar charts" loading="lazy" />
          </div>
          <div class="phone-info">
            <span class="tech-label">Spend Ceilings &amp; Trends</span>
            <h3>Combo boundary-line visualization</h3>
            <p>
              Custom-built SVG charts plot daily cumulative spending against monthly spend ceilings and historical averages, providing instant visual feedback on burn rate.
            </p>
          </div>
        </div>

        <div class="phone-card">
          <div class="phone-mock">
            <img src="{M}/recurring-status-check.png" alt="LavaMoney recurring bills and subscription audit" loading="lazy" />
          </div>
          <div class="phone-info">
            <span class="tech-label">Recurring Detection</span>
            <h3>Automated subscription audit</h3>
            <p>
              Heuristic frequency detection across historical transaction cadences identifies recurring subscriptions, estimates monthly burn, and highlights overdue or unexpected charges.
            </p>
          </div>
        </div>
      </div>

      <div style="margin-top: 4.5rem;">
        <span class="tech-label">Cross-platform · Web Demo</span>
        <h3 style="font-size:1.35rem;font-weight:600;color:#fff;margin:0.75rem 0 0.85rem;">Public web demo &amp; landing site</h3>
        <p style="max-width:62ch;color:#cbd5e8;font-size:1.02rem;line-height:1.75;margin-bottom:2rem;">
          To allow immediate exploration without requiring an App Store download or account creation, a companion Next.js web application serves a full interactive sandbox loaded with realistic sample history.
        </p>
        <Figure
          src="{M}/landing-hero.png"
          alt="LavaMoney marketing page and interactive web application"
          label="LavaMoney.io"
          caption="The marketing surface and interactive sandbox demo, hosted at lavamoney.io."
        />
      </div>
    </section>

    <!-- ── Engineering ──────────────────────────────────────────────────── -->
    <section class="prose" id="engineering">
      <span class="tech-label">03 · Engineering</span>
      <h2>Architecture &amp; systems design</h2>

      <h3>Local-first state &amp; privacy boundary</h3>
      <p>
        The app state is managed using a pure TypeScript reducer pattern wrapped in React Context, persisting locally to <code>AsyncStorage</code>. Instead of maintaining a central database containing users' sensitive transactions, the server tier acts purely as an authenticated relay for Plaid token exchange. Once synchronized, transaction data resides securely on the device, eliminating remote data exposure risks.
      </p>

      <h3>Analytical driver attribution</h3>
      <p>
        A key UX differentiator is answering <em>why</em> balances changed. Rather than leaving the user to calculate balance changes across multiple statements, the analysis engine slices chronological snapshots and performs variance decomposition across accounts. If net worth climbs 3% in a quarter, the engine isolates the largest positive variance contributor and formats a plain-English explanation (e.g., <em>"Up 3% over the last 6 months — mostly from Everyday Checking, which grew $2.1k in that span"</em>).
      </p>

      <div class="callout">
        <span class="tech-label">The Principle</span>
        <p>
          Data density without interpretation creates cognitive fatigue. Financial software should transform raw numbers into actionable attribution without requiring users to build their own pivot tables.
        </p>
      </div>

      <h3>Robust CSV reconciliation</h3>
      <p>
        Supporting manual tracking requires handling messy real-world bank exports. The client-side CSV parser features automatic column detection that maps diverse bank header conventions (accounting for separated debit/credit columns, inverted sign conventions, and non-standard date formats). Imported rows are deduplicated against existing ledger items and presented in a pre-commit verification review before altering the balance history.
      </p>

      <h3>Explainable recurrence heuristics</h3>
      <p>
        Instead of relying on opaque machine learning categorization that often hallucinates false subscriptions, LavaMoney uses a deterministic, explainable rules engine. The algorithm clusters transactions by normalized merchant signatures, analyzes interval variance (weekly, bi-weekly, monthly, annual), and checks for amount consistency to surface active subscriptions and alert when a regular bill has not cleared.
      </p>

      <h3>Hand-rolled SVG charting engine</h3>
      <p>
        Rather than introducing heavy third-party charting libraries that introduce bundle bloat and frame drops during mobile gestures, all visual charts are custom-crafted using <code>react-native-svg</code>. Mathematical bezier curves, linear gradient masks, and dynamic bar heights are computed directly from state vectors, maintaining fluid 60fps scrolling performance.
      </p>
    </section>

    <!-- ── Status ────────────────────────────────────────────────────────── -->
    <section class="prose" id="status">
      <span class="tech-label">04 · Status</span>
      <h2>Where it stands</h2>
      <p>
        LavaMoney is in active development and preparing for community beta testing. Current progress:
      </p>

      <div class="status-block">
        <span class="badge badge-green badge-dot">Working</span>
        <p>
          Full iOS &amp; Android app built on Expo SDK 57, Plaid OAuth integration, local ledger persistence, CSV parser, budget progress rings, spend ceiling analytics, recurring bill detector, and live web demo.
        </p>
      </div>

      <div class="status-block">
        <span class="badge badge-amber">In progress</span>
        <p>
          Packaging TestFlight external beta builds, refining SQLite migration for multi-year retention, and finalizing App Store listing assets.
        </p>
      </div>
    </section>

    <div class="foot-nav">
      <a href="/projects" class="btn">← All projects</a>
      <div style="display:flex;gap:0.7rem;flex-wrap:wrap;">
        <a href="https://www.lavamoney.io" target="_blank" rel="noopener noreferrer" class="btn">Live Web Demo</a>
        <a href="https://github.com/dpilat1227/lava-money" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Source on GitHub →</a>
      </div>
    </div>

      </div>
    </div>
  </div>
</div>

<style>
  .back-link {
    display: inline-block;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-4);
    border-bottom: none;
    margin-bottom: 2rem;
  }

  .back-link:hover {
    color: var(--accent);
  }

  .case-head {
    max-width: 900px;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 3rem;
    margin-top: 2.5rem;
  }

  .cta-row {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  section {
    padding: 3.75rem 0 0;
    scroll-margin-top: 5.5rem;
  }

  .phone-showcase {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3.5rem 2.5rem;
    margin-top: 3rem;
  }

  .phone-card {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%), #0c0e18;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 26px;
    padding: 2.25rem;
    box-shadow:
      0 28px 70px -15px rgba(0, 0, 0, 0.85),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    transition:
      transform 0.3s var(--ease),
      border-color 0.3s var(--ease),
      box-shadow 0.3s var(--ease);
  }

  .phone-card:hover {
    transform: translateY(-4px);
    border-color: rgba(158, 110, 222, 0.35);
    box-shadow:
      0 35px 80px -15px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(158, 110, 222, 0.25),
      0 0 35px rgba(158, 110, 222, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.18);
  }

  .phone-mock {
    border-radius: 24px;
    overflow: hidden;
    background: radial-gradient(
      circle at 50% 30%,
      rgba(158, 110, 222, 0.16) 0%,
      rgba(8, 10, 16, 0.95) 75%
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .phone-mock img {
    display: block;
    width: 100%;
    max-width: 290px;
    height: auto;
    margin: 0 auto;
    border-radius: 28px;
    border: 2px solid rgba(255, 255, 255, 0.18);
    box-shadow:
      0 24px 50px -12px rgba(0, 0, 0, 0.9),
      0 0 25px rgba(158, 110, 222, 0.15);
  }

  .phone-info {
    display: flex;
    flex-direction: column;
  }

  .phone-info .tech-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--accent-bright);
    text-transform: uppercase;
    background: rgba(158, 110, 222, 0.14);
    border: 1px solid rgba(158, 110, 222, 0.32);
    padding: 0.22rem 0.65rem;
    border-radius: 6px;
    align-self: flex-start;
    margin-bottom: 0.75rem;
  }

  .phone-info h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.35;
    letter-spacing: -0.02em;
    margin: 0 0 0.85rem;
  }

  .phone-info p {
    font-size: 0.98rem;
    color: #cdd5e8;
    line-height: 1.75;
    margin: 0;
  }

  .status-block {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 1.25rem;
    align-items: start;
    padding: 1.15rem 0;
    border-top: 1px solid var(--border-1);
  }

  .status-block:last-of-type {
    border-bottom: 1px solid var(--border-1);
  }

  .status-block p {
    font-size: 0.95rem;
    color: var(--text-3);
    margin: 0;
  }

  .foot-nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 4.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-1);
  }

  @media (max-width: 860px) {
    .meta-grid,
    .phone-showcase {
      grid-template-columns: 1fr;
      gap: 2.25rem;
    }

    .phone-card {
      padding: 1.5rem;
      gap: 1.5rem;
    }

    .phone-mock {
      padding: 1rem 0.75rem;
    }

    .phone-mock img {
      max-width: 260px;
    }

    .status-block {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }

    section {
      padding-top: 2.75rem;
    }
  }
</style>
