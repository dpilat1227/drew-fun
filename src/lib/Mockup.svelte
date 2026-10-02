<script>
  /**
   * Shared project thumbnail: one artifact on a light canvas, anchored to the right and bottom
   * edges so it bleeds off. Two layers only (canvas, artifact), no extra chrome.
   * Pass children (a snippet) instead of `src` to render custom content.
   */
  let { src = '', alt = '', label = '', fill = false, children } = $props();
</script>

<div class="mock" class:fill>
  {#if label}<span class="tag">{label}</span>{/if}
  <div class="art">
    {#if children}
      {@render children()}
    {:else}
      <img {src} {alt} loading="lazy" decoding="async" />
    {/if}
  </div>
</div>

<style>
  .mock {
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: var(--bg-sunken);
    border: 1px solid var(--border-1);
  }

  .mock.fill {
    aspect-ratio: auto;
    height: 100%;
    min-height: 21rem;
  }

  .tag {
    position: absolute;
    top: 0.9rem;
    left: 1.1rem;
    z-index: 2;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-3);
  }

  .art {
    position: absolute;
    top: 17%;
    left: 9%;
    right: 0;
    border: 1px solid var(--border-2);
    border-right: 0;
    background: #fff;
    box-shadow: -6px 18px 48px -18px rgba(17, 17, 16, 0.55);
    transition: transform 0.55s var(--ease);
  }

  .mock:hover .art {
    transform: translate(-4px, -5px);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  @media (max-width: 800px) {
    .mock.fill {
      min-height: 0;
      height: auto;
      aspect-ratio: 16 / 10;
    }
  }
</style>
