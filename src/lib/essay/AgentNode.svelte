<script>
  // Props: x, y (%), tone, label, dead, pulsing
  let {
    x = 50,
    y = 50,
    tone = 'purple',
    label = '',
    dead = false,
    pulsing = false,
    size = 10,
  } = $props();

  const colors = {
    purple: '#9e6ede',
    red: '#ff5d73',
    orange: '#ff9f43',
    cyan: '#5ce1ff',
    green: '#3ee07f',
    gray: '#333344',
  };

  let color = $derived(dead ? colors.gray : (colors[tone] ?? colors.purple));
</script>

<g class="agent-node" class:dead class:pulsing transform="translate({x},{y})">
  {#if pulsing && !dead}
    <circle r={size * 2.5} fill={color} opacity="0.08">
      <animate attributeName="r" values="{size * 1.5};{size * 3.5};{size * 1.5}" dur="2.2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.12;0;0.12" dur="2.2s" repeatCount="indefinite" />
    </circle>
  {/if}
  <circle r={size} fill={color} opacity={dead ? 0.25 : 0.9} />
  <circle r={size * 0.5} fill="white" opacity={dead ? 0.06 : 0.25} />
  {#if label}
    <text
      y={size + 13}
      text-anchor="middle"
      font-family="'IBM Plex Mono', monospace"
      font-size="9"
      fill={dead ? '#444' : color}
      opacity={dead ? 0.5 : 0.9}
    >{label}</text>
  {/if}
</g>

<style>
  .agent-node {
    transition: opacity 0.8s ease;
  }
  .dead {
    opacity: 0.35;
  }
</style>
