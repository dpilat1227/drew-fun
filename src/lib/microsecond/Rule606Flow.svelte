<script>
  // SEC Rule 606 quarterly disclosure data is public — these figures are
  // illustrative composites in the ballpark of what brokers actually report.
  const brokers = {
    robinhood: {
      label: "Robinhood",
      offExchangePct: 92,
      routes: [
        { name: "Citadel Securities", pct: 45, color: "#9e6ede" },
        { name: "Virtu Americas", pct: 30, color: "#ff9f43" },
        { name: "Two Sigma Securities", pct: 12, color: "#5ce1ff" },
        { name: "Jane Street", pct: 5, color: "#ff5d73" },
        { name: "Lit exchanges", pct: 8, color: "#3ee07f" },
      ],
    },
    schwab: {
      label: "Schwab",
      offExchangePct: 78,
      routes: [
        { name: "Citadel Securities", pct: 38, color: "#9e6ede" },
        { name: "Virtu Americas", pct: 24, color: "#ff9f43" },
        { name: "UBS Securities", pct: 10, color: "#5ce1ff" },
        { name: "Jane Street", pct: 6, color: "#ff5d73" },
        { name: "Lit exchanges", pct: 22, color: "#3ee07f" },
      ],
    },
    fidelity: {
      label: "Fidelity",
      offExchangePct: 51,
      routes: [
        { name: "Citadel Securities", pct: 22, color: "#9e6ede" },
        { name: "Virtu Americas", pct: 18, color: "#ff9f43" },
        { name: "Jane Street", pct: 8, color: "#ff5d73" },
        { name: "NYSE/Nasdaq direct", pct: 3, color: "#5ce1ff" },
        { name: "Lit exchanges", pct: 49, color: "#3ee07f" },
      ],
    },
  };

  /** @type {{ broker?: string }} */
  let { broker = $bindable("robinhood") } = $props();
  const active = $derived(brokers[broker]);
</script>

<div class="flow">
  <div class="broker-picker">
    {#each Object.entries(brokers) as [key, b]}
      <button
        class="broker-btn"
        class:active={broker === key}
        onclick={() => (broker = key)}
      >
        {b.label}
      </button>
    {/each}
  </div>

  <div class="flow-diagram">
    <div class="flow-source">
      <span class="node-label">Your order</span>
      <span class="node-sub">10 sh AAPL</span>
    </div>

    <div class="flow-lines">
      {#each active.routes as r}
        <div class="flow-line" style="flex: {r.pct}">
          <span class="line-track" style="background: {r.color};"></span>
        </div>
      {/each}
    </div>

    <div class="flow-targets">
      {#each active.routes as r}
        <div class="target-row" style="flex: {r.pct}">
          <span class="target-dot" style="background: {r.color};"></span>
          <span class="target-name">{r.name}</span>
          <span class="target-pct" style="color: {r.color};">{r.pct}%</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="off-exchange-stat">
    <span class="stat-num">{active.offExchangePct}%</span>
    <span class="stat-label">of {active.label}'s market orders never touch a public exchange</span>
  </div>
</div>

<style>
  .flow {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .broker-picker {
    display: flex;
    gap: 0.5rem;
  }

  .broker-btn {
    flex: 1;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #8b95b2;
    font-family: var(--font-sans, sans-serif);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.5rem 0.6rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .broker-btn:hover {
    border-color: rgba(255, 255, 255, 0.28);
    color: #ffffff;
  }

  .broker-btn.active {
    background: rgba(62, 224, 127, 0.14);
    border-color: #3ee07f;
    color: #7dffb3;
  }

  .flow-diagram {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .flow-source {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    align-self: center;
  }

  .node-label {
    font-size: 0.82rem;
    font-weight: 700;
    color: #ffffff;
  }

  .node-sub {
    font-family: var(--font-mono, monospace);
    font-size: 0.62rem;
    color: #8b95b2;
  }

  .flow-lines {
    display: flex;
    flex-direction: column;
    gap: 2px;
    height: 30px;
  }

  .flow-line {
    display: flex;
    align-items: center;
  }

  .line-track {
    display: block;
    width: 100%;
    height: 3px;
    border-radius: 2px;
    opacity: 0.6;
  }

  .flow-targets {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .target-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 0.4rem 0.65rem;
  }

  .target-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .target-name {
    flex: 1;
    font-size: 0.78rem;
    color: #d0d5e5;
  }

  .target-pct {
    font-family: var(--font-mono, monospace);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .off-exchange-stat {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 159, 67, 0.08);
    border-left: 3px solid #ff9f43;
    border-radius: 0 10px 10px 0;
    padding: 0.65rem 0.9rem;
  }

  .stat-num {
    font-family: var(--font-mono, monospace);
    font-size: 1.6rem;
    font-weight: 800;
    color: #ff9f43;
  }

  .stat-label {
    font-size: 0.78rem;
    line-height: 1.4;
    color: #c5cce0;
  }
</style>
