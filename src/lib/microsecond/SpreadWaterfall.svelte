<script>
  /**
   * Where the spread goes. Per share, the wholesaler gives back a fixed sliver of price
   * improvement and passes a fixed sliver to the broker; it keeps everything else.
   * The two slivers are illustrative, in the range brokers and wholesalers report.
   */
  const IMPROVE = 0.002; // $/share the customer saves versus the public price
  const PFOF = 0.0015; // $/share the broker is paid for the order

  const sizes = [10, 100, 1000, 10000];
  const stocks = [
    { label: "AAPL", sub: "1¢ spread", spread: 0.01 },
    { label: "Mid-cap", sub: "5¢", spread: 0.05 },
    { label: "Small-cap", sub: "15¢", spread: 0.15 },
    { label: "Thin stock", sub: "40¢", spread: 0.4 },
  ];

  let sizeIdx = $state(0);
  let stockIdx = $state(0);

  const shares = $derived(sizes[sizeIdx]);
  const spread = $derived(stocks[stockIdx].spread);

  // A round trip: the market maker buys from someone at the bid and sells to you at the ask.
  const pie = $derived(spread * shares);
  const you = $derived(Math.min(IMPROVE, spread) * shares);
  const broker = $derived(Math.min(PFOF, Math.max(0, spread - IMPROVE)) * shares);
  const house = $derived(Math.max(0, pie - you - broker));

  // Filled at the midpoint instead, you'd have saved half the spread per share.
  const missed = $derived(Math.max(0, (spread / 2 - IMPROVE) * shares));

  const pct = (v) => (pie > 0 ? (v / pie) * 100 : 0);
  const money = (v) => (v >= 100 ? `$${v.toFixed(0)}` : v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(3)}`);

  const verdict = $derived.by(() => {
    if (spread <= 0.01 && shares <= 100) return "On a liquid stock and a small order, this is pocket change for everyone. Nobody should lose sleep over it.";
    if (spread <= 0.01) return "Tight spread, so the pie is still small. But size adds up, and you pay it on every trade.";
    return "The wider the spread, the more the fixed improvement shrinks against it. This is where a limit order, which caps your price, starts to matter.";
  });
</script>

<div class="wf">
  <div class="picker">
    <span class="p-label">Order size</span>
    <div class="chips">
      {#each sizes as s, i}
        <button class="chip" class:on={sizeIdx === i} onclick={() => (sizeIdx = i)}>{s.toLocaleString()}</button>
      {/each}
    </div>
  </div>
  <div class="picker">
    <span class="p-label">Stock</span>
    <div class="chips">
      {#each stocks as s, i}
        <button class="chip" class:on={stockIdx === i} onclick={() => (stockIdx = i)}>
          {s.label}<em>{s.sub}</em>
        </button>
      {/each}
    </div>
  </div>

  <div class="pie-head">
    <span>THE SPREAD ON YOUR TRADE</span>
    <strong>{money(pie)}</strong>
  </div>

  <div class="bar" role="img" aria-label="How the spread splits between you, your broker and the wholesaler">
    <span class="seg you" style="width:{pct(you)}%"></span>
    <span class="seg broker" style="width:{pct(broker)}%"></span>
    <span class="seg house" style="width:{pct(house)}%"></span>
  </div>

  <div class="rows">
    <div class="row">
      <span class="dot you"></span><span class="who">You, as price improvement</span>
      <span class="amt">{money(you)}</span><span class="pc">{pct(you).toFixed(0)}%</span>
    </div>
    <div class="row">
      <span class="dot broker"></span><span class="who">Your broker, for the order</span>
      <span class="amt">{money(broker)}</span><span class="pc">{pct(broker).toFixed(0)}%</span>
    </div>
    <div class="row">
      <span class="dot house"></span><span class="who">The wholesaler, before costs</span>
      <span class="amt">{money(house)}</span><span class="pc">{pct(house).toFixed(0)}%</span>
    </div>
  </div>

  <div class="missed">
    <span>Up to this much better at the midpoint</span>
    <strong>{money(missed)}</strong>
  </div>

  <p class="verdict">{verdict}</p>
  <p class="fine">
    Illustrative. Assumes about 0.2¢ a share of price improvement and 0.15¢ a share paid to the broker; real
    numbers vary by broker, stock and quarter. The wholesaler's share pays for hedging and inventory risk before
    it is profit. Check your own broker's Rule 605 and 606 reports.
  </p>
</div>

<style>
  .wf {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .picker {
    display: grid;
    grid-template-columns: 5.2rem 1fr;
    align-items: center;
    gap: 0.6rem;
  }

  .p-label {
    font-size: 0.64rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7e9b89;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .chip {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #9fb3a7;
    font-family: var(--font-mono, monospace);
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.38rem 0.7rem;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .chip em {
    font-style: normal;
    font-weight: 400;
    margin-left: 0.4rem;
    color: #6f8579;
  }

  .chip:hover {
    border-color: rgba(62, 224, 127, 0.5);
    color: #d6e8db;
  }

  .chip.on {
    background: rgba(62, 224, 127, 0.16);
    border-color: #3ee07f;
    color: #7dffb3;
  }

  .chip.on em {
    color: #7dffb3;
    opacity: 0.8;
  }

  .pie-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 0.4rem;
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    color: #7e9b89;
  }

  .pie-head strong {
    font-size: 1.5rem;
    letter-spacing: 0;
    color: #fff;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .bar {
    display: flex;
    height: 30px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    overflow: hidden;
  }

  .seg {
    height: 100%;
    min-width: 2px;
    transition: width 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .seg.you,
  .dot.you {
    background: #3ee07f;
  }

  .seg.broker,
  .dot.broker {
    background: #ff9f43;
  }

  .seg.house,
  .dot.house {
    background: #5ce1ff;
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .row {
    display: grid;
    grid-template-columns: 0.6rem 1fr auto 3rem;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    font-size: 0.78rem;
  }

  .dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
  }

  .who {
    color: #c5d6cb;
  }

  .amt {
    color: #fff;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .pc {
    text-align: right;
    color: #7e9b89;
    font-variant-numeric: tabular-nums;
  }

  .missed {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.55rem 0.75rem;
    border: 1px dashed rgba(92, 225, 255, 0.45);
    font-size: 0.74rem;
    color: #8fdcf0;
  }

  .missed strong {
    color: #fff;
    font-variant-numeric: tabular-nums;
  }

  .verdict {
    margin: 0.2rem 0 0;
    font-size: 0.82rem;
    line-height: 1.55;
    color: #d6e8db;
  }

  .fine {
    margin: 0;
    font-size: 0.66rem;
    line-height: 1.55;
    color: #6f8579;
  }
</style>
