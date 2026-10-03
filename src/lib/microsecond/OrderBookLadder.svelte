<script>
  /**
   * L3 limit order book ladder. Shows NBBO + the sub-penny internalizer fill.
   * @type {{ filled?: boolean }}
   */
  let { filled = $bindable(false) } = $props();

  const asks = [
    { px: "195.03", sz: 820 },
    { px: "195.02", sz: 1140 },
    { px: "195.01", sz: 640 },
    { px: "195.00", sz: 2200 },
  ];
  const bids = [
    { px: "194.99", sz: 1980 },
    { px: "194.98", sz: 910 },
    { px: "194.97", sz: 1330 },
    { px: "194.96", sz: 560 },
  ];
  const maxSz = 2200;
</script>

<div class="ladder">
  <div class="ladder-header">
    <span class="ladder-title">NASDAQ · AAPL · NBBO</span>
    <button class="fill-toggle" onclick={() => (filled = !filled)}>
      {filled ? "↺ Reset book" : "▶ Route retail order"}
    </button>
  </div>

  <div class="ladder-rows asks">
    {#each asks as row}
      <div class="ladder-row">
        <span class="depth-bar ask" style="width: {(row.sz / maxSz) * 100}%"></span>
        <span class="row-sz">{row.sz}</span>
        <span class="row-px ask-px">{row.px}</span>
      </div>
    {/each}
  </div>

  <div class="nbbo-divider">
    <span class="nbbo-label">NBBO SPREAD · $0.01</span>
    <span class="nbbo-value">194.99 / 195.00</span>
  </div>

  {#if filled}
    <div class="fill-row">
      <span class="fill-badge">INTERNALIZED FILL</span>
      <span class="fill-px">$194.998</span>
      <span class="fill-detail">10 sh · $0.002 better than the public ask</span>
    </div>
    <div class="mid-row">
      <span>MIDPOINT $194.995</span>
      <span>$0.003 a share better than your fill, $0.03 on this trade</span>
    </div>
  {/if}

  <div class="ladder-rows bids">
    {#each bids as row}
      <div class="ladder-row">
        <span class="depth-bar bid" style="width: {(row.sz / maxSz) * 100}%"></span>
        <span class="row-sz">{row.sz}</span>
        <span class="row-px bid-px">{row.px}</span>
      </div>
    {/each}
  </div>

  <p class="ladder-note">
    {#if filled}
      The wholesaler never touched this book. It sold you shares from its own inventory at
      <strong>194.998</strong> and kept the rest of the spread. Retail flow rarely knows
      something the market doesn't, so that's close to risk-free.
    {:else}
      This is the public book in Carteret, NJ. Your order for 10 AAPL never reaches it.
    {/if}
  </p>
</div>

<style>
  .ladder {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: var(--font-mono, monospace);
  }

  .ladder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.35rem;
  }

  .ladder-title {
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    color: #8b95b2;
  }

  .fill-toggle {
    background: rgba(62, 224, 127, 0.14);
    border: 1px solid rgba(62, 224, 127, 0.45);
    color: #7dffb3;
    font-family: var(--font-mono, monospace);
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.35rem 0.7rem;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .fill-toggle:hover {
    background: rgba(62, 224, 127, 0.24);
  }

  .ladder-rows {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .ladder-row {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 3.5rem 4.5rem;
    align-items: center;
    height: 24px;
    padding: 0 0.5rem;
    font-size: 0.78rem;
  }

  .depth-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 4px;
    opacity: 0.22;
  }

  .depth-bar.ask {
    background: #ff5d73;
  }

  .depth-bar.bid {
    background: #3ee07f;
  }

  .row-sz {
    position: relative;
    color: #8b95b2;
    text-align: right;
    padding-right: 0.5rem;
  }

  .row-px {
    position: relative;
    font-weight: 700;
    text-align: right;
  }

  .ask-px {
    color: #ff8a9a;
  }

  .bid-px {
    color: #6ff0a5;
  }

  .nbbo-divider {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.6rem;
    background: rgba(255, 255, 255, 0.04);
    border-top: 1px dashed rgba(255, 255, 255, 0.15);
    border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
    margin: 0.15rem 0;
  }

  .nbbo-label {
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    color: #8b95b2;
  }

  .nbbo-value {
    font-size: 0.78rem;
    font-weight: 700;
    color: #ffffff;
  }

  .fill-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(255, 159, 67, 0.1);
    border: 1px solid rgba(255, 159, 67, 0.4);
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    margin: 0.2rem 0;
    animation: fillPop 0.3s ease-out;
    flex-wrap: wrap;
  }

  @keyframes fillPop {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: none; }
  }

  .mid-row {
    display: flex;
    justify-content: space-between;
    gap: 0.6rem;
    flex-wrap: wrap;
    padding: 0.35rem 0.75rem;
    border: 1px dashed rgba(92, 225, 255, 0.45);
    border-radius: 6px;
    font-size: 0.64rem;
    color: #8fdcf0;
  }

  .fill-badge {
    font-size: 0.6rem;
    font-weight: 800;
    color: #ff9f43;
    letter-spacing: 0.06em;
  }

  .fill-px {
    font-size: 0.95rem;
    font-weight: 800;
    color: #ffffff;
  }

  .fill-detail {
    font-size: 0.65rem;
    color: #c5cce0;
  }

  .ladder-note {
    font-family: var(--font-sans, sans-serif);
    font-size: 0.78rem;
    line-height: 1.55;
    color: #c5cce0;
    margin: 0.4rem 0 0;
  }

  .ladder-note strong {
    color: #ff9f43;
  }
</style>
