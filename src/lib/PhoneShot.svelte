<script>
  /** An iPhone screenshot in a dark bezel, with the same label + caption as Figure. */
  let { src, alt, caption = '', label = '', small = false } = $props();
</script>

<figure class="phone-fig" class:small>
  <div class="bezel">
    <img {src} {alt} loading="lazy" decoding="async" />
  </div>
  {#if caption || label}
    <figcaption>
      {#if label}<span class="fig-badge">{label}</span>{/if}
      {#if caption}<span class="fig-text">{caption}</span>{/if}
    </figcaption>
  {/if}
</figure>

<style>
  .phone-fig {
    margin: 0;
    max-width: 280px;
  }

  .bezel {
    background: #1d1d1f;
    border-radius: 38px;
    padding: 10px;
    box-shadow: 0 30px 50px -24px rgba(17, 17, 16, 0.4);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 28px;
  }

  figcaption {
    margin-top: 1.1rem;
    padding: 0;
  }

  .small .bezel {
    border-radius: 24px;
    padding: 6px;
    box-shadow: 0 18px 30px -18px rgba(17, 17, 16, 0.4);
  }

  .small img {
    border-radius: 18px;
  }

  .small figcaption {
    margin-top: 0.7rem;
  }

  .small .fig-badge {
    margin: 0;
    font-size: 0.66rem;
    padding: 0.18rem 0.5rem;
  }

  .fig-badge {
    display: block;
    width: fit-content;
    margin: 0 0 0.5rem;
  }
</style>
