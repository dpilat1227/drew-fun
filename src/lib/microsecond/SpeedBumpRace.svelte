<script>
  /** @type {{ withSpeedBump?: boolean }} */
  let { withSpeedBump = $bindable(true) } = $props();
  let racing = $state(false);
  let progress = $state(0); // 0 - 100
  /** @type {any} */
  let raf = null;

  function runRace() {
    if (racing) return;
    racing = true;
    progress = 0;
    const start = performance.now();
    const durationMs = 2600;
    function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      progress = t * 100;
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        racing = false;
      }
    }
    raf = requestAnimationFrame(tick);
  }

  // HFT reaches ~35% (where it would front-run) almost instantly;
  // the speed bump forces it to wait at the 350µs gate.
  const hftX = $derived(withSpeedBump ? Math.min(progress, 35) : Math.min(progress * 1.4, 92));
  const investorX = $derived(Math.min(progress, 92));
  const hftBlocked = $derived(withSpeedBump && progress >= 35 && progress < 40);
</script>

<div class="race">
  <div class="race-controls">
    <label class="toggle-row">
      <input type="checkbox" bind:checked={withSpeedBump} />
      <span>IEX 350μs speed bump active</span>
    </label>
    <button class="race-btn" onclick={runRace} disabled={racing}>
      {racing ? "Racing…" : "▶ Run the race"}
    </button>
  </div>

  <div class="track-group">
    <div class="track-row">
      <span class="track-label hft">HFT sniffer</span>
      <div class="track">
        {#if withSpeedBump}
          <div class="speed-bump-gate" style="left: 35%"></div>
        {/if}
        <div class="runner hft-runner" style="left: {hftX}%" class:blocked={hftBlocked}></div>
      </div>
    </div>

    <div class="track-row">
      <span class="track-label investor">Investor order</span>
      <div class="track">
        {#if withSpeedBump}
          <div class="speed-bump-gate" style="left: 35%"></div>
        {/if}
        <div class="runner investor-runner" style="left: {investorX}%"></div>
      </div>
    </div>
  </div>

  <p class="race-note">
    {#if withSpeedBump}
      The 38-mile coil of fiber inside IEX's rack delays every incoming order by exactly
      <strong>350 microseconds</strong> — including the HFT's. By the time the sniffer's
      cancel-and-requote reaches the market, the investor's order has already cleared at the
      real NBBO.
    {:else}
      Without the speed bump, the HFT sees the investor's first fill on another exchange,
      cancels its quotes, and reprices before the rest of the investor's order arrives —
      classic latency arbitrage.
    {/if}
  </p>
</div>

<style>
  .race {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .race-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .toggle-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.78rem;
    color: #c5cce0;
    cursor: pointer;
  }

  .toggle-row input {
    accent-color: #5ce1ff;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .race-btn {
    background: rgba(62, 224, 127, 0.14);
    border: 1px solid #3ee07f;
    color: #7dffb3;
    font-family: var(--font-mono, monospace);
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.9rem;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .race-btn:hover:not(:disabled) {
    background: rgba(62, 224, 127, 0.26);
  }

  .race-btn:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .track-group {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .track-row {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    align-items: center;
    gap: 0.5rem;
  }

  .track-label {
    font-family: var(--font-mono, monospace);
    font-size: 0.66rem;
    font-weight: 700;
  }

  .track-label.hft {
    color: #ff5d73;
  }

  .track-label.investor {
    color: #3ee07f;
  }

  .track {
    position: relative;
    height: 22px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: visible;
  }

  .speed-bump-gate {
    position: absolute;
    top: -3px;
    bottom: -3px;
    width: 3px;
    background: repeating-linear-gradient(
      45deg,
      #ff9f43,
      #ff9f43 3px,
      transparent 3px,
      transparent 6px
    );
    z-index: 2;
  }

  .runner {
    position: absolute;
    top: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transform: translateX(-50%);
    transition: left 0.05s linear;
    box-shadow: 0 0 8px currentColor;
  }

  .hft-runner {
    background: #ff5d73;
    color: #ff5d73;
  }

  .hft-runner.blocked {
    animation: bumpShake 0.15s infinite;
    background: #ff334f;
  }

  @keyframes bumpShake {
    0%, 100% { transform: translateX(-50%); }
    50% { transform: translateX(-56%); }
  }

  .investor-runner {
    background: #3ee07f;
    color: #3ee07f;
  }

  .race-note {
    font-size: 0.78rem;
    line-height: 1.55;
    color: #c5cce0;
    margin: 0;
  }

  .race-note strong {
    color: #ff9f43;
  }
</style>
