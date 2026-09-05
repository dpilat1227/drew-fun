<script>
  let p = $state(0);

  function onScroll() {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    p = max > 0 ? Math.min(1, el.scrollTop / max) : 0;
  }
</script>

<svelte:window onscroll={onScroll} />

<div class="bar" style="transform: scaleX({p})" aria-hidden="true"></div>

<style>
  .bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #9e6ede, #ff5d73, #ff9f43);
    box-shadow: 0 0 12px rgba(158, 110, 222, 0.5);
    transform-origin: 0 50%;
    z-index: 80;
    pointer-events: none;
  }
</style>
