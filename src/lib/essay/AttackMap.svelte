<script>
  // Attack map: animated arcs between named infrastructure boxes
  // events: array of { from, to, color, label }
  let { events = [], active = false } = $props();

  // Fixed layout positions (in SVG viewBox 0 0 600 300)
  const boxes = {
    openai:      { x: 80,  y: 120, label: 'OpenAI', color: '#5ce1ff', w: 100, h: 44 },
    artifactory: { x: 240, y: 60,  label: 'Artifactory', color: '#9e6ede', w: 120, h: 44 },
    huggingface: { x: 400, y: 180, label: 'Hugging Face', color: '#3ee07f', w: 130, h: 44 },
    cluster:     { x: 80,  y: 210, label: 'OAI Cluster', color: '#ff5d73', w: 110, h: 44 },
  };

  function arcPath(from, to) {
    const f = boxes[from];
    const t = boxes[to];
    if (!f || !t) return '';
    const x1 = f.x + f.w / 2;
    const y1 = f.y + f.h / 2;
    const x2 = t.x + t.w / 2;
    const y2 = t.y + t.h / 2;
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - 50;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  }
</script>

<div class="attack-map-wrap">
  <svg viewBox="0 0 600 300" class="attack-map">
    <!-- Infrastructure boxes -->
    {#each Object.entries(boxes) as [key, box]}
      <g>
        <rect
          x={box.x} y={box.y}
          width={box.w} height={box.h}
          rx="8"
          fill="rgba(0,0,0,0.6)"
          stroke={box.color}
          stroke-width="1.5"
          stroke-opacity="0.5"
        />
        <text
          x={box.x + box.w / 2} y={box.y + 26}
          text-anchor="middle"
          font-family="'IBM Plex Mono', monospace"
          font-size="11"
          fill={box.color}
          opacity="0.9"
        >{box.label}</text>
      </g>
    {/each}

    <!-- Attack arcs -->
    {#if active}
      {#each events as ev, i}
        <path
          d={arcPath(ev.from, ev.to)}
          fill="none"
          stroke={ev.color ?? '#ff5d73'}
          stroke-width="1.5"
          stroke-dasharray="6 4"
          stroke-linecap="round"
          opacity="0.7"
          style="animation: dash 1.5s linear infinite; animation-delay: {i * 0.25}s"
        />
        <!-- Arrowhead at target -->
        <circle
          cx={(boxes[ev.to]?.x ?? 0) + (boxes[ev.to]?.w ?? 0) / 2}
          cy={(boxes[ev.to]?.y ?? 0) + (boxes[ev.to]?.h ?? 0) / 2}
          r="4"
          fill={ev.color ?? '#ff5d73'}
          opacity="0.8"
          style="animation: pulse 1.2s ease-in-out infinite; animation-delay: {i * 0.25}s"
        />
      {/each}
    {/if}
  </svg>
</div>

<style>
  .attack-map-wrap {
    width: 100%;
    max-width: 620px;
    margin: 0 auto;
  }
  .attack-map {
    width: 100%;
    height: auto;
    display: block;
  }

  @keyframes dash {
    to { stroke-dashoffset: -40; }
  }
  @keyframes pulse {
    0%, 100% { r: 4; opacity: 0.8; }
    50% { r: 7; opacity: 0.4; }
  }
</style>
