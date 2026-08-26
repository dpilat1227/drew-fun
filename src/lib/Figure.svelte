<script>
  let { src, alt, caption = '', label = '' } = $props();
  let zoomed = $state(false);

  function onKey(e) {
    if (e.key === 'Escape') zoomed = false;
  }

  $effect(() => {
    document.body.style.overflow = zoomed ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={onKey} />

<figure>
  <div class="figure">
    <button type="button" class="zoom" onclick={() => (zoomed = true)} aria-label={`Enlarge image: ${alt}`}>
      <img {src} {alt} loading="lazy" decoding="async" />
    </button>
  </div>
  {#if caption}
    <figcaption>
      {#if label}<b>{label}</b> — {/if}{caption}
    </figcaption>
  {/if}
</figure>

{#if zoomed}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label={alt}>
    <button type="button" class="backdrop" onclick={() => (zoomed = false)} aria-label="Close enlarged image"></button>
    <img {src} {alt} />
  </div>
{/if}

<style>
  .zoom {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    cursor: zoom-in;
  }

  .zoom img {
    display: block;
    width: 100%;
    height: auto;
    transition: opacity 0.25s var(--ease);
  }

  .zoom:hover img {
    opacity: 0.9;
  }

  .backdrop {
    position: absolute;
    inset: 0;
    border: none;
    background: none;
    cursor: zoom-out;
    padding: 0;
  }

  .lightbox img {
    position: relative;
    z-index: 1;
    pointer-events: none;
  }
</style>
