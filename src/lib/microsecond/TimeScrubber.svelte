<script>
  /**
   * Logarithmic time-dilation scrubber.
   * Human time (1s, 100ms) -> Machine time (1ms, 10μs, 100ns).
   * @type {{ value?: number }}
   */
  let { value = $bindable(0) } = $props();

  const scale = [
    { label: "1 s", sub: "A finger tap registering", regime: "human" },
    { label: "100 ms", sub: "A camera shutter click", regime: "human" },
    { label: "40 ms", sub: "Your order confirmation", regime: "human" },
    { label: "1 ms", sub: "A housefly wingbeat", regime: "border" },
    { label: "10 μs", sub: "Light travels 3 km", regime: "machine" },
    { label: "100 ns", sub: "One tick of the matching engine", regime: "machine" },
  ];

  const current = $derived(scale[value]);
</script>

<div class="scrubber">
  <div class="scrubber-readout">
    <span class="readout-value">{current.label}</span>
    <span class="readout-sub">{current.sub}</span>
  </div>

  <input
    type="range"
    min="0"
    max={scale.length - 1}
    step="1"
    bind:value
    class="scrubber-range"
    class:machine={current.regime === "machine"}
    aria-label="Time dilation scrubber"
  />

  <div class="scrubber-ticks">
    {#each scale as tick, i}
      <button
        class="tick"
        class:active={value === i}
        class:machine-tick={tick.regime === "machine"}
        onclick={() => (value = i)}
      >
        {tick.label}
      </button>
    {/each}
  </div>

  <p class="scrubber-caption">
    {#if current.regime === "human"}
      To you, this feels instant. Nothing worth reacting to happens at this speed.
    {:else if current.regime === "border"}
      This is the crossover point — where the order stops being a thought and starts being a race.
    {:else}
      Down here, the 40&nbsp;ms round trip is an eternity. An algorithm gets thousands of decisions in the time it takes your phone to draw a checkmark.
    {/if}
  </p>
</div>

<style>
  .scrubber {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .scrubber-readout {
    display: flex;
    align-items: baseline;
    gap: 0.65rem;
  }

  .readout-value {
    font-family: var(--font-mono, monospace);
    font-size: 2rem;
    font-weight: 800;
    color: #ff9f43;
    letter-spacing: -0.02em;
    transition: color 0.3s;
  }

  .readout-sub {
    font-size: 0.82rem;
    color: #8b95b2;
  }

  .scrubber-range {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(90deg, #5ce1ff 0%, #5ce1ff 55%, #ff5d73 55%, #ff9f43 100%);
    cursor: pointer;
  }

  .scrubber-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid #ff9f43;
    box-shadow: 0 0 12px rgba(255, 159, 67, 0.6);
    cursor: pointer;
  }

  .scrubber-range::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid #ff9f43;
    cursor: pointer;
  }

  .scrubber-ticks {
    display: flex;
    justify-content: space-between;
    gap: 0.3rem;
  }

  .tick {
    flex: 1;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #8b95b2;
    font-family: var(--font-mono, monospace);
    font-size: 0.62rem;
    padding: 0.35rem 0.2rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tick:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }

  .tick.active {
    background: rgba(255, 159, 67, 0.16);
    border-color: #ff9f43;
    color: #ff9f43;
    font-weight: 700;
  }

  .tick.machine-tick.active {
    background: rgba(92, 225, 255, 0.16);
    border-color: #5ce1ff;
    color: #5ce1ff;
  }

  .scrubber-caption {
    font-size: 0.82rem;
    line-height: 1.55;
    color: #c5cce0;
    margin: 0;
  }

  @media (max-width: 600px) {
    .scrubber-ticks {
      flex-wrap: wrap;
    }
    .tick {
      flex: 1 1 30%;
    }
  }
</style>
