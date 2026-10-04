<script>
  import BrowserMock from '../lib/BrowserMock.svelte';
  import LqFeatures from '../lib/LqFeatures.svelte';
  import LqShowcase from '../lib/LqShowcase.svelte';
</script>

<div class="page">
  <div class="wrap">
    <a href="/projects" class="mono back-link">← Projects</a>

    <header class="case-head">
      <span class="tech-label">Markets</span>
      <h1>LavaQuant</h1>
      <p class="lead" style="max-width:36rem;margin-top:1.1rem;">
        A tool for writing an alpha, backtesting it, and submitting it to WorldQuant BRAIN.
      </p>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:1rem;">
        I use BRAIN. Submitting from their site is a slow loop when you're trying things. I wanted that loop on my own machine, on their API, so I could submit faster and learn faster.
      </p>

      <dl class="spec">
        <div>
          <dt>Role</dt>
          <dd>Sole engineer</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>Next.js, FastAPI, LightGBM</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>Active. I use it.</dd>
        </div>
        <div>
          <dt>Data</dt>
          <dd>Yahoo Finance locally. BRAIN on submit.</dd>
        </div>
        <div>
          <dt>Infra</dt>
          <dd>Vercel, Railway</dd>
        </div>
      </dl>

      <div class="cta-row">
        <a href="https://quant.drew.fun" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Open the app →</a>
        <a href="https://github.com/dpilat1227/lavaquant" target="_blank" rel="noopener noreferrer" class="btn">Source</a>
      </div>
    </header>

    <section>
      <span class="tech-label">01 · A run</span>
      <h2>Type an expression, hit run</h2>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:0.6rem;">
        You get IC, Sharpe, drawdown, and a chart. The screen on first load is sample data. A backtest is the real numbers.
      </p>
      <div class="shot">
        <BrowserMock
          src="/media/lavaquant/app-window.webp"
          alt="LavaQuant dashboard with a score, summary stats, and an equity curve"
          url="quant.drew.fun"
        />
        <p class="shot-caption">A run. Local prices are a Yahoo sample, so this number is not a BRAIN score.</p>
      </div>
    </section>

    <section class="features">
      <LqFeatures />
      <LqShowcase />
    </section>

    <section class="prose">
      <span class="tech-label">03 · The two scores</span>
      <h2>BRAIN's book is not this sample</h2>
      <p>
        Local prices come from Yahoo. BRAIN's data is not that sample, so the numbers will not match. The submit button is there so I can see both. Returns are gross of costs. The fit checks are my rules of thumb, not WorldQuant's or Numerai's official bar.
      </p>
    </section>

    <div class="foot-nav">
      <a href="/projects" class="btn">← All projects</a>
      <a href="https://quant.drew.fun" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Open the app →</a>
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
    color: var(--text-1);
  }

  .case-head {
    max-width: 900px;
  }

  .cta-row {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  section {
    padding: 3.75rem 0 0;
  }

  .shot-caption {
    margin: 0.8rem 0 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-4);
  }

  .features {
    padding-top: 2.5rem;
  }

  .shot {
    max-width: none;
    margin-top: 1.75rem;
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
    section {
      padding-top: 2.75rem;
    }
  }
</style>
