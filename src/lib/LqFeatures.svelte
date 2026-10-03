<script>
  import { inview } from './inview.js';

  // Sample numbers: the same ones the app shows on first load. They are not live results.
  const parts = [
    ['Sharpe', 20, 30],
    ['IC-IR', 14, 25],
    ['IC strength', 9, 15],
    ['Hit rate', 5, 10],
    ['Drawdown', 5, 10],
    ['Turnover', 4, 10],
  ];

  const years = [
    ['2020', 1.94],
    ['2021', 1.73],
    ['2022', 0.04],
    ['2023', 1.99],
    ['2024', 3.1],
  ];

  // Real backtests from the Known alphas tab: US large-cap sample, 2020 to 2024, before costs.
  const known = [
    ['Where the day closed', 0.94],
    ['1-day reversal', 0.88],
    ['Low volatility', -0.53],
    ['Quarterly momentum', -0.57],
  ];

  const R = 54;
  const C = 2 * Math.PI * R;
  const ringTarget = C * (1 - 0.57);
</script>

<section class="lqf" use:inview={0.15}>
  <p class="eyebrow">What's inside</p>
  <h2>Test it. Understand it.<br />Improve it.</h2>

  <div class="grid">
    <!-- 1 · Explain -->
    <article class="card wide side">
      <div class="copy">
        <h3>Know what your formula does</h3>
        <p>Every expression is explained one step at a time, in plain English. Click a number to try another.</p>
      </div>
      <div class="viz explain">
        <div class="expr"><b>rank</b>(-<b>ts_delta</b>(<u>close</u>, <s>5</s>))</div>
        <ol>
          <li style="--d: 0.5s">
            <span class="n">1</span>
            <div><code><b>ts_delta</b>(<u>close</u>, <s>5</s>)</code><small>per stock, over time</small><p>How much the closing price changed over 5 days.</p></div>
          </li>
          <li style="--d: 0.9s">
            <span class="n">2</span>
            <div><code>-<b>ts_delta</b>(<u>close</u>, <s>5</s>)</code><small>math</small><p>Flips the sign: losers now score high.</p></div>
          </li>
          <li style="--d: 1.3s">
            <span class="n">3</span>
            <div><code><b>rank</b>(-<b>ts_delta</b>(<u>close</u>, <s>5</s>))</code><small>across stocks</small><p>One score per stock per day, -1 to +1.</p></div>
          </li>
        </ol>
        <div class="chips" style="--d: 1.7s"><span>2</span><span>3</span><span class="on">5</span><span>10</span></div>
      </div>
    </article>

    <!-- 2 · Score -->
    <article class="card wide stack">
      <div class="copy">
        <h3>A score you can read</h3>
        <p>Six measures, one score, and every point accounted for. Nothing is hidden in the total.</p>
      </div>
      <div class="viz score">
        <div class="ring">
          <svg viewBox="0 0 128 128" aria-hidden="true">
            <circle cx="64" cy="64" r={R} class="track" />
            <circle cx="64" cy="64" r={R} class="arc" style="--c: {C}; --t: {ringTarget}" />
          </svg>
          <div class="mid"><b>57</b><span>/100</span><em>PROMISING</em></div>
        </div>
        <ul>
          {#each parts as [name, got, max], i}
            <li style="--d: {0.4 + i * 0.12}s">
              <span>{name}</span><span class="v">{got}/{max}</span>
              <i style="--w: {(got / max) * 100}%"></i>
            </li>
          {/each}
        </ul>
      </div>
    </article>

    <!-- 3 · Coach -->
    <article class="card wide side">
      <div class="copy">
        <h3>Ask the coach what to try next</h3>
        <p>One change at a time, with a reason and a prediction. It works offline, and with AI if you add a key.</p>
      </div>
      <div class="viz chat">
        <div class="bubble me" style="--d: 0.4s">What should I try next?</div>
        <div class="bubble bot" style="--d: 1.1s">
          <b>Smooth it to trade less</b>
          <code><b>rank</b>(<b>ts_decay_linear</b>(-<b>ts_delta</b>(<u>close</u>, <s>5</s>), <s>5</s>))</code>
          <small>Expect: turnover falls. IC and Sharpe dip slightly. The question is whether they dip less than turnover does.</small>
          <span class="run">▶ Run</span>
        </div>
      </div>
    </article>

    <!-- 4 · By year -->
    <article class="card narrow stack">
      <div class="copy">
        <h3>Year by year</h3>
        <p>One great year can hide four bad ones.</p>
      </div>
      <div class="viz years">
        <div class="head"><span>Year</span><span>Sharpe</span></div>
        {#each years as [y, s], i}
          <div class="row" class:bad={s < 0.5} style="--d: {0.3 + i * 0.12}s">
            <span>{y}</span>
            <span class="bar"><i style="--w: {(s / 3.2) * 100}%"></i></span>
            <span class="v">{s.toFixed(2)}</span>
          </div>
        {/each}
      </div>
    </article>

    <!-- 5 · Known alphas -->
    <article class="card narrow stack">
      <div class="copy">
        <h3>Famous alphas, tested</h3>
        <p>35 known ideas on real data. Many lose money.</p>
      </div>
      <div class="viz known">
        {#each known as [name, s], i}
          <div class="row" style="--d: {0.3 + i * 0.14}s">
            <span class="nm">{name}</span>
            <span class="div"><i class:neg={s < 0} style="--w: {(Math.abs(s) / 1) * 50}%; {s < 0 ? 'right' : 'left'}: 50%"></i></span>
            <span class="v" class:neg={s < 0}>{s > 0 ? '+' : '−'}{Math.abs(s).toFixed(2)}</span>
          </div>
        {/each}
        <small>Sharpe, US large caps, 2020 to 2024, before costs</small>
      </div>
    </article>
  </div>
</section>

<style>
  .lqf {
    --navy: #07090f;
    --card: #0b1020;
    --line: rgba(255, 255, 255, 0.07);
    --txt: #eef0f6;
    --mut: #7f8aa6;
    --orange: #ff8a3d;
    --teal: #5eead4;
    position: relative;
    margin-top: 1.75rem;
    padding: clamp(1.6rem, 4vw, 3rem) clamp(1rem, 3vw, 2.2rem) clamp(1.6rem, 3vw, 2.4rem);
    border-radius: 22px;
    background: var(--navy);
    color: var(--txt);
    font-family: var(--font-sans);
  }

  .eyebrow {
    margin: 0 0 0.8rem;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--mut);
  }

  h2 {
    margin: 0 auto 2rem;
    text-align: center;
    font-size: clamp(2rem, 4.6vw, 3.4rem);
    line-height: 1.04;
    letter-spacing: -0.035em;
    font-weight: 700;
    color: #eceff7;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .card {
    position: relative;
    overflow: hidden;
    min-height: 19rem;
    border-radius: 20px;
    background: linear-gradient(180deg, #0c1224, #090d1b);
    box-shadow: 0 0 0 1px var(--line) inset;
    padding: 1.6rem 1.7rem;
    display: grid;
    gap: 1rem;
  }

  .wide {
    grid-column: span 6;
  }

  .narrow {
    grid-column: span 3;
  }

  .side {
    grid-template-columns: 0.8fr 1.2fr;
    align-items: start;
  }

  .stack {
    grid-template-rows: auto 1fr;
  }

  .copy h3 {
    margin: 0 0 0.55rem;
    font-size: 1.3rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
    font-weight: 600;
    color: var(--txt);
  }

  .copy p {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.5;
    color: var(--mut);
  }

  .viz {
    position: relative;
    min-width: 0;
  }

  code,
  .expr {
    font-family: var(--font-mono);
    background: none;
    border: 0;
    padding: 0;
  }

  b {
    font-weight: 400;
    color: #ffb36b;
  }

  u {
    text-decoration: none;
    color: var(--teal);
  }

  s {
    text-decoration: none;
    color: #ff8f6b;
  }

  /* entrance animation, once, when the section scrolls into view */
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .explain li,
  .explain .chips,
  .bubble,
  .score li,
  .years .row,
  .known .row {
    opacity: 0;
  }

  .lqf:global(.in) .explain li,
  .lqf:global(.in) .explain .chips,
  .lqf:global(.in) .bubble,
  .lqf:global(.in) .score li,
  .lqf:global(.in) .years .row,
  .lqf:global(.in) .known .row {
    animation: rise 0.7s var(--ease) both;
    animation-delay: var(--d, 0s);
  }

  /* 1 · explain */
  .explain {
    margin: 0 -1.7rem -1.6rem 0;
    padding: 0.9rem 1rem 1rem;
    border-radius: 14px 0 0 0;
    background: #0a0f1d;
    box-shadow: 0 0 0 1px var(--line) inset;
    font-size: 0.72rem;
  }

  .explain .expr {
    padding: 0.55rem 0.7rem;
    border-radius: 9px;
    background: #060912;
    font-size: 0.82rem;
    color: #cbd3e6;
  }

  .explain ol {
    margin: 0.9rem 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.75rem;
  }

  .explain li {
    display: grid;
    grid-template-columns: 1.3rem 1fr;
    gap: 0.6rem;
  }

  .n {
    display: grid;
    place-items: center;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: #cbd3e6;
  }

  .explain code {
    font-size: 0.74rem;
    color: #cbd3e6;
  }

  .explain small {
    margin-left: 0.6rem;
    font-size: 0.62rem;
    color: #7f8aa6;
  }

  .explain li p {
    margin: 0.25rem 0 0;
    font-size: 0.74rem;
    line-height: 1.4;
    color: #8f9ab6;
  }

  .chips {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.9rem;
  }

  .chips span {
    padding: 0.18rem 0.5rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    font-family: var(--font-mono);
    font-size: 0.66rem;
    color: #aeb8d2;
  }

  .chips .on {
    border-color: rgba(255, 138, 61, 0.7);
    color: #ffb36b;
  }

  /* 2 · score */
  .score {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1.6rem;
    padding-top: 0.4rem;
  }

  .ring {
    position: relative;
    width: 9.6rem;
    height: 9.6rem;
  }

  .ring svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .ring circle {
    fill: none;
    stroke-width: 8;
  }

  .ring .track {
    stroke: rgba(255, 255, 255, 0.08);
  }

  .ring .arc {
    stroke: #ffc857;
    stroke-linecap: round;
    stroke-dasharray: var(--c);
    stroke-dashoffset: var(--c);
    transition: stroke-dashoffset 1.6s var(--ease) 0.3s;
  }

  .lqf:global(.in) .ring .arc {
    stroke-dashoffset: var(--t);
  }

  .mid {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    text-align: center;
  }

  .mid b {
    font-size: 2.5rem;
    line-height: 1;
    font-weight: 600;
    color: #fff;
  }

  .mid span {
    position: absolute;
    left: calc(50% + 1.25rem);
    top: 2.6rem;
    font-size: 0.62rem;
    color: #7f8aa6;
  }

  .mid em {
    margin-top: 0.35rem;
    font-style: normal;
    font-size: 0.56rem;
    letter-spacing: 0.2em;
    font-weight: 700;
    color: #ffc857;
  }

  .score ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.6rem;
  }

  .score li {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: #8f9ab6;
    padding-bottom: 0.4rem;
  }

  .score li .v {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: #6f7a96;
  }

  .score li i {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 0;
    border-radius: 2px;
    background: #ffc857;
    transition: width 1.2s var(--ease) 0.5s;
  }

  .score li::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.07);
  }

  .lqf:global(.in) .score li i {
    width: var(--w);
  }

  /* 3 · chat */
  .chat {
    display: grid;
    gap: 0.7rem;
    align-content: start;
    padding-top: 0.2rem;
  }

  .bubble {
    max-width: 92%;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .bubble.me {
    justify-self: end;
    background: #1c4fd8;
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .bubble.bot {
    background: #0e1528;
    box-shadow: 0 0 0 1px var(--line) inset;
    border-bottom-left-radius: 4px;
    color: #c4cce0;
    display: grid;
    gap: 0.45rem;
  }

  .bubble.bot b {
    color: #fff;
    font-weight: 600;
  }

  .bubble code {
    display: block;
    padding: 0.4rem 0.55rem;
    border-radius: 7px;
    background: #060912;
    font-size: 0.68rem;
    color: #cbd3e6;
    overflow-x: auto;
    white-space: nowrap;
  }

  .bubble code b {
    color: #ffb36b;
    font-weight: 400;
  }

  .bubble small {
    font-size: 0.7rem;
    color: #8f9ab6;
  }

  .run {
    justify-self: start;
    padding: 0.22rem 0.6rem;
    border-radius: 6px;
    background: #ff7a1a;
    font-size: 0.66rem;
    font-weight: 700;
    color: #fff;
  }

  /* 4 · years */
  .years {
    display: grid;
    gap: 0.5rem;
    align-content: start;
  }

  .years .head,
  .years .row {
    display: grid;
    grid-template-columns: 2.4rem 1fr 2.6rem;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #8f9ab6;
  }

  .years .head {
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5f6a86;
    grid-template-columns: 2.4rem 1fr;
  }

  .years .head span:last-child {
    text-align: right;
  }

  .years .bar {
    display: block;
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.07);
    overflow: hidden;
  }

  .years .bar i {
    display: block;
    height: 100%;
    width: 0;
    border-radius: 3px;
    background: #3ddc97;
    transition: width 1s var(--ease) 0.5s;
  }

  .lqf:global(.in) .years .bar i {
    width: var(--w);
  }

  .years .bad .bar i {
    background: #ff5470;
  }

  .years .v {
    text-align: right;
    color: #dfe4f2;
  }

  .years .bad .v {
    color: #ff7d93;
  }

  /* 5 · known */
  .known {
    display: grid;
    gap: 0.6rem;
    align-content: start;
  }

  .known .row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.25rem;
    font-size: 0.72rem;
    color: #aab4cd;
  }

  .known .row {
    grid-template-columns: 1fr auto;
  }

  .known .nm {
    grid-row: 1;
  }

  .known .v {
    grid-row: 1;
    grid-column: 2;
  }

  .known .div {
    grid-row: 2;
    grid-column: 1 / -1;
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.07);
  }

  .known .div::after {
    content: '';
    position: absolute;
    left: 50%;
    top: -2px;
    bottom: -2px;
    width: 1px;
    background: rgba(255, 255, 255, 0.28);
  }

  .known .div i {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    border-radius: 3px;
    background: #3ddc97;
    transition: width 1s var(--ease) 0.6s;
  }

  .lqf:global(.in) .known .div i {
    width: var(--w);
  }

  .known .div i.neg {
    background: #ff5470;
  }

  .known .v {
    font-family: var(--font-mono);
    color: #3ddc97;
  }

  .known .v.neg {
    color: #ff7d93;
  }

  .known small {
    margin-top: 0.2rem;
    font-size: 0.6rem;
    line-height: 1.4;
    color: #5f6a86;
  }

  @media (max-width: 980px) {
    .wide,
    .narrow {
      grid-column: span 12;
    }

    .side {
      grid-template-columns: 1fr;
    }

    .explain {
      margin-right: 0;
      border-radius: 14px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .explain li,
    .explain .chips,
    .bubble,
    .score li,
    .years .row,
    .known .row {
      opacity: 1;
      animation: none !important;
    }
  }
</style>
