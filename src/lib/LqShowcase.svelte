<script>
  import { onDestroy } from 'svelte';
  import { inview } from './inview.js';

  let { href = 'https://quant.drew.fun' } = $props();

  // A loop of the guided builder: flip two switches and watch the formula rewrite itself.
  const frames = [
    { neutral: false, smooth: false },
    { neutral: true, smooth: false },
    { neutral: true, smooth: true },
    { neutral: false, smooth: true },
  ];
  let i = $state(0);
  let timer;

  function start() {
    timer = setInterval(() => (i = (i + 1) % frames.length), 2300);
  }
  onDestroy(() => clearInterval(timer));

  const f = $derived(frames[i]);
  const expr = $derived.by(() => {
    let e = '-ts_delta(close, 5)';
    if (f.smooth) e = `ts_decay_linear(${e}, 5)`;
    e = `rank(${e})`;
    if (f.neutral) e = `group_neutralize(${e}, sector)`;
    return e;
  });

  const html = $derived(
    expr
      .replace(/([a-z_]+)(?=\()/g, '<b>$1</b>')
      .replace(/\b(close|sector)\b/g, '<u>$1</u>')
      .replace(/\b(\d+)\b/g, '<s>$1</s>'),
  );

  function inviewStart(node) {
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        start();
        io.disconnect();
      }
    });
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }
</script>

<section class="show" use:inview={0.2} use:inviewStart>
  <div class="copy">
    <p class="eyebrow">Learn</p>
    <h3>Build your own, starting from an idea</h3>
    <p class="lead">
      Pick a hunch, set a window, flip a switch. The formula writes itself and explains each piece, so the next one you write
      yourself.
    </p>
    <a class="go" {href} target="_blank" rel="noopener noreferrer">Try it in the app <span aria-hidden="true">→</span></a>
  </div>

  <div class="mock" aria-label="The guided alpha builder">
    <div class="panel">
      <div class="sec">1 · Pick an idea</div>
      <div class="ideas">
        <span class="on">Losers bounce back</span><span>Winners keep winning</span><span>Calm beats jumpy</span><span>Crowded moves fade</span>
      </div>

      <div class="sec">2 · Tune it</div>
      <div class="seg"><span>3d</span><span class="on">5d</span><span>10d</span><span>21d</span></div>

      <div class="sec">3 · Clean it up</div>
      <div class="tog"><span>Rank across stocks</span><i class="sw on"><b></b></i></div>
      <div class="tog"><span>Remove the sector effect</span><i class="sw" class:on={f.neutral}><b></b></i></div>
      <div class="tog"><span>Smooth it to trade less</span><i class="sw" class:on={f.smooth}><b></b></i></div>

      <div class="sec">4 · Your alpha</div>
      <div class="out">{@html html}</div>
      <div class="run">▶ Run it</div>
    </div>
  </div>
</section>

<style>
  .show {
    margin-top: 1.1rem;
    border-radius: 22px;
    background: #07090f;
    color: #eef0f6;
    font-family: var(--font-sans);
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 1.5rem;
    padding: clamp(1.4rem, 3vw, 2.2rem) clamp(1.4rem, 3vw, 2.2rem) 0;
    overflow: hidden;
    min-height: 28rem;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  }

  .copy {
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
  }

  .eyebrow {
    margin: 0 0 0.9rem;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7f8aa6;
  }

  h3 {
    color: #eef0f6;
    margin: 0 0 0.9rem;
    max-width: 14ch;
    font-size: clamp(1.7rem, 3.4vw, 2.5rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    font-weight: 700;
  }

  .lead {
    margin: 0;
    max-width: 30ch;
    font-size: 0.98rem;
    line-height: 1.55;
    color: #7f8aa6;
  }

  .go {
    margin-top: auto;
    align-self: flex-start;
    padding: 0.7rem 1.1rem;
    border-radius: 11px;
    background: #ff7a1a;
    color: #fff;
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 0;
    box-shadow: 0 10px 30px -10px rgba(255, 122, 26, 0.7);
    transition: transform 0.3s var(--ease), filter 0.3s;
  }

  .go:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    color: #fff;
  }

  .mock {
    align-self: end;
    margin-right: calc(-1 * clamp(1.4rem, 3vw, 2.2rem));
  }

  .panel {
    padding: 1.1rem 1.2rem 0;
    border-radius: 16px 0 0 0;
    background: #0a0f1d;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.07) inset;
    font-size: 0.74rem;
    color: #aab4cd;
    height: 25.5rem;
    overflow: hidden;
  }

  .sec {
    margin: 0.85rem 0 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #66718e;
  }

  .sec:first-child {
    margin-top: 0;
  }

  .ideas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .ideas span {
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 0.68rem;
  }

  .ideas .on {
    border-color: rgba(255, 138, 61, 0.7);
    color: #ffb36b;
    background: rgba(255, 138, 61, 0.1);
  }

  .seg {
    display: inline-flex;
    padding: 2px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #070a14;
  }

  .seg span {
    padding: 0.2rem 0.8rem;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.66rem;
  }

  .seg .on {
    background: #1b2236;
    color: #fff;
  }

  .tog {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.6rem;
    margin-bottom: 0.3rem;
    border-radius: 9px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.02);
    color: #d4daea;
  }

  .sw {
    position: relative;
    width: 1.9rem;
    height: 1.05rem;
    border-radius: 999px;
    background: #2a3248;
    transition: background 0.4s;
  }

  .sw b {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.4s var(--ease);
  }

  .sw.on {
    background: #ff7a1a;
  }

  .sw.on b {
    transform: translateX(0.85rem);
  }

  .out {
    padding: 0.55rem 0.7rem;
    border-radius: 9px;
    border: 1px solid rgba(255, 138, 61, 0.28);
    background: #060912;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: #cbd3e6;
    white-space: nowrap;
    overflow: hidden;
  }

  .out :global(b) {
    font-weight: 400;
    color: #ffb36b;
  }

  .out :global(u) {
    text-decoration: none;
    color: #5eead4;
  }

  .out :global(s) {
    text-decoration: none;
    color: #ff8f6b;
  }

  .run {
    margin-top: 0.55rem;
    display: inline-block;
    padding: 0.35rem 0.9rem;
    border-radius: 8px;
    background: #ff7a1a;
    color: #fff;
    font-weight: 600;
  }

  @media (max-width: 860px) {
    .show {
      grid-template-columns: 1fr;
    }

    .mock {
      margin-right: calc(-1 * clamp(1.4rem, 3vw, 2.2rem));
      margin-left: 0;
    }
  }
</style>
