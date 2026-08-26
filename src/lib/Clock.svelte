<script>
  let now = $state(new Date());

  $effect(() => {
    const id = setInterval(() => {
      now = new Date();
    }, 1000);
    return () => clearInterval(id);
  });

  let clock = $derived(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now)
  );
</script>

<time class="clock mono" datetime={now.toISOString()} title="Chicago">
  <span class="clock-city">CHI</span>
  {clock}
</time>

<style>
  .clock {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    color: var(--text-4);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .clock-city {
    color: var(--text-3);
    margin-right: 0.55rem;
  }
</style>
