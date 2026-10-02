<script>
  /**
   * Shared project thumbnail: a framed artifact on a light canvas, bleeding off the bottom edge.
   * kind="browser" wraps the content in a minimal window; kind="poster" frames an image as-is.
   * Pass children (a snippet) instead of `src` to render custom content, like an SVG.
   */
  let { kind = 'browser', src = '', alt = '', url = '', label = '', fill = false, bare = false, children } = $props();
</script>

<div class="mock" class:fill class:bare>
  {#if label}<span class="tag">{label}</span>{/if}

  {#if kind === 'browser'}
    <div class="win">
      <div class="bar">
        <i></i><i></i><i></i>
        {#if url}<span class="url">{url}</span>{/if}
      </div>
      {#if children}
        <div class="view">{@render children()}</div>
      {:else}
        <img {src} {alt} loading="lazy" decoding="async" />
      {/if}
    </div>
  {:else}
    <div class="poster">
      <img {src} {alt} loading="lazy" decoding="async" />
    </div>
  {/if}
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

  .mock.bare {
    border: 0;
  }

  .mock.fill {
    aspect-ratio: auto;
    height: 100%;
    min-height: 21rem;
  }

  .tag {
    position: absolute;
    top: 0.85rem;
    left: 1rem;
    z-index: 2;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-4);
  }

  .win,
  .poster {
    position: absolute;
    top: 17%;
    left: 8%;
    right: 8%;
    background: #fff;
    border: 1px solid var(--border-2);
    box-shadow:
      0 34px 60px -30px rgba(17, 17, 16, 0.5),
      0 2px 6px rgba(17, 17, 16, 0.08);
    transition: transform 0.5s var(--ease);
  }

  .mock:hover .win,
  .mock:hover .poster {
    transform: translateY(-5px);
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 22px;
    padding: 0 10px;
    border-bottom: 1px solid var(--border-1);
    background: #fff;
  }

  .bar i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid var(--border-2);
  }

  .url {
    margin-left: 8px;
    font-family: var(--font-mono);
    font-size: 9.5px;
    letter-spacing: 0.02em;
    color: var(--text-4);
  }

  img,
  .view {
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
