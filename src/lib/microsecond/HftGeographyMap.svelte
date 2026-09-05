<script>
  /** @type {{ rainFade?: boolean }} */
  let { rainFade = $bindable(false) } = $props();

  const fiberMs = 14.5;
  const microwaveMs = $derived(rainFade ? 14.5 : 13.1);
  const deltaMs = $derived((fiberMs - microwaveMs).toFixed(1));
</script>

<div class="geo">
  <svg viewBox="0 0 480 260" class="geo-svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <filter id="hgm-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    <!-- Fiber route (railroad-following, curvy) -->
    <path
      d="M 400,60 C 320,90 220,70 150,150 C 110,190 90,210 70,205"
      class="route fiber-route"
    />
    <!-- Microwave route (straight line-of-sight relays) -->
    <path
      d="M 400,60 L 70,205"
      class="route microwave-route"
      class:degraded={rainFade}
    />
    {#each [1, 2, 3, 4] as i}
      <circle
        cx={400 - i * 66}
        cy={60 + i * 29}
        r="4"
        class="relay-tower"
        class:degraded={rainFade}
      />
    {/each}

    <!-- Aurora, IL (CME) -->
    <g class="city-node">
      <circle cx="400" cy="60" r="9" class="city-dot cme" filter="url(#hgm-glow)" />
      <text x="400" y="42" text-anchor="middle" class="city-label">AURORA, IL</text>
      <text x="400" y="30" text-anchor="middle" class="city-sub">CME E-MINI FUTURES</text>
    </g>

    <!-- Secaucus/Carteret, NJ (NY4) -->
    <g class="city-node">
      <circle cx="70" cy="205" r="9" class="city-dot nj" filter="url(#hgm-glow)" />
      <text x="70" y="230" text-anchor="middle" class="city-label">SECAUCUS, NJ</text>
      <text x="70" y="242" text-anchor="middle" class="city-sub">EQUINIX NY4</text>
    </g>
  </svg>

  <div class="geo-toggle">
    <label class="toggle-row">
      <input type="checkbox" bind:checked={rainFade} />
      <span>Weather / rain fade on microwave link</span>
    </label>
  </div>

  <div class="geo-readout">
    <div class="latency-card fiber">
      <span class="lat-label">Fiber (rail route)</span>
      <span class="lat-value">{fiberMs.toFixed(1)} ms</span>
    </div>
    <div class="latency-card microwave" class:degraded={rainFade}>
      <span class="lat-label">Microwave (line of sight)</span>
      <span class="lat-value">{microwaveMs.toFixed(1)} ms</span>
    </div>
  </div>

  <p class="geo-note">
    {#if rainFade}
      Rain and atmospheric moisture scatter the microwave signal, degrading it back to roughly
      fiber speed. Firms with only a microwave path just lost their <strong>{deltaMs} ms</strong> edge —
      and in this business, that's the whole business.
    {:else}
      The microwave beam travels through air at nearly the speed of light in vacuum — about
      50% faster than light bouncing through glass fiber. That <strong>{deltaMs} ms</strong> is worth
      hundreds of millions in infrastructure spend to firms trading the NJ/Chicago basis.
    {/if}
  </p>
</div>

<style>
  .geo {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .geo-svg {
    width: 100%;
    height: auto;
    display: block;
    background: radial-gradient(ellipse at center, rgba(18, 16, 32, 0.5), transparent 70%);
    border-radius: 12px;
  }

  .route {
    fill: none;
    stroke-width: 2;
  }

  .fiber-route {
    stroke: #ff9f43;
    stroke-dasharray: 5 4;
    opacity: 0.85;
  }

  .microwave-route {
    stroke: #5ce1ff;
    stroke-width: 2.2;
    opacity: 0.9;
    transition: stroke 0.3s, opacity 0.3s;
  }

  .microwave-route.degraded {
    stroke: #6b7385;
    stroke-dasharray: 3 3;
    opacity: 0.5;
  }

  .relay-tower {
    fill: #5ce1ff;
    stroke: #ffffff;
    stroke-width: 1;
    transition: fill 0.3s;
  }

  .relay-tower.degraded {
    fill: #6b7385;
  }

  .city-dot.cme {
    fill: #ff9f43;
  }
  .city-dot.nj {
    fill: #3ee07f;
  }

  .city-label {
    font-family: var(--font-mono, monospace);
    font-size: 8px;
    font-weight: 700;
    fill: #ffffff;
    letter-spacing: 0.05em;
  }

  .city-sub {
    font-family: var(--font-mono, monospace);
    font-size: 6.5px;
    fill: #8b95b2;
  }

  .geo-toggle {
    display: flex;
    justify-content: center;
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
    accent-color: #ff9f43;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  .geo-readout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }

  .latency-card {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.55rem 0.75rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .latency-card.fiber {
    border-color: rgba(255, 159, 67, 0.35);
  }

  .latency-card.microwave {
    border-color: rgba(92, 225, 255, 0.35);
  }

  .latency-card.microwave.degraded {
    border-color: rgba(107, 115, 133, 0.5);
  }

  .lat-label {
    font-size: 0.65rem;
    color: #8b95b2;
  }

  .lat-value {
    font-family: var(--font-mono, monospace);
    font-size: 1.1rem;
    font-weight: 800;
    color: #ffffff;
  }

  .geo-note {
    font-size: 0.78rem;
    line-height: 1.55;
    color: #c5cce0;
    margin: 0;
  }

  .geo-note strong {
    color: #5ce1ff;
  }
</style>
