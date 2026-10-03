<script>
  /**
   * A real screenshot in a quiet browser window, floating on the page with no backdrop.
   * crop: fill a 16:10 box and clip the bottom (for grid thumbnails).
   */
  let { src, alt = '', url = '', crop = false } = $props();
</script>

<div class="bm" class:crop>
  <div class="bar">
    <span class="dots"><i></i><i></i><i></i></span>
    <span class="urlbar">{url}</span>
    <span class="spacer"></span>
  </div>
  <img {src} {alt} loading="lazy" decoding="async" />
</div>

<style>
  .bm {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: 14px;
    background: #090b12;
    box-shadow:
      0 0 0 1px rgba(17, 17, 16, 0.18),
      0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
      0 36px 70px -28px rgba(8, 10, 20, 0.55),
      0 14px 28px -14px rgba(8, 10, 20, 0.35);
    transition: transform 0.6s var(--ease), box-shadow 0.6s var(--ease);
  }

  .bm.crop {
    aspect-ratio: 16 / 10;
  }

  .bm:hover {
    transform: translateY(-3px);
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.6rem 0.85rem;
    background: #0d1018;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .dots {
    display: flex;
    gap: 6px;
    width: 3.2rem;
  }

  .dots i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.16);
  }

  .spacer {
    width: 3.2rem;
  }

  .urlbar {
    flex: 1;
    max-width: 40%;
    margin: 0 auto;
    padding: 0.22rem 0.7rem;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.05);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.04em;
    text-align: center;
    color: rgba(255, 255, 255, 0.42);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
