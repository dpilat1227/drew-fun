<script>
  /**
   * Product mockup: a rounded browser window with quiet chrome, and an optional phone
   * overlapping it, on a dark canvas with a soft glow. The screenshots are the real UI;
   * the frame just makes them read as a product instead of a screen grab.
   */
  let { theme = 'ember', label = '', main, alt = '', phone = '', phoneAlt = '', url = '' } = $props();
</script>

<div class="stage {theme}">
  {#if label}<span class="tag">{label}</span>{/if}
  <div class="glow"></div>

  <div class="win" class:solo={!phone}>
    <div class="bar">
      <span class="dots"><i></i><i></i><i></i></span>
      <span class="urlbar">{url}</span>
    </div>
    <img src={main} {alt} loading="lazy" decoding="async" />
  </div>

  {#if phone}
    <div class="phone">
      <img src={phone} alt={phoneAlt} loading="lazy" decoding="async" />
    </div>
  {/if}
</div>

<style>
  .stage {
    --accent: 255, 122, 26;
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #07090f;
    border: 1px solid #1a1d27;
    isolation: isolate;
  }

  .stage.ember {
    --accent: 255, 122, 26;
  }

  .stage.lava {
    --accent: 255, 96, 40;
  }

  .glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(70% 80% at 62% 8%, rgba(var(--accent), 0.26), transparent 70%),
      radial-gradient(50% 60% at 6% 108%, rgba(var(--accent), 0.14), transparent 70%);
  }

  .tag {
    position: absolute;
    top: 0.9rem;
    left: 1.1rem;
    z-index: 5;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  .win {
    position: absolute;
    left: 5%;
    top: 13%;
    width: 80%;
    border-radius: 14px 14px 0 0;
    overflow: hidden;
    background: #0b0d14;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.09),
      0 40px 80px -24px rgba(0, 0, 0, 0.9),
      0 0 90px -30px rgba(var(--accent), 0.35);
    transition: transform 0.6s var(--ease);
  }

  .win.solo {
    left: 8%;
    width: 84%;
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.5rem 0.75rem;
    background: #0e1119;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .dots {
    display: flex;
    gap: 5px;
  }

  .dots i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);
  }

  .urlbar {
    flex: 1;
    max-width: 46%;
    margin: 0 auto;
    padding: 0.18rem 0.6rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.04em;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
  }

  .win img {
    display: block;
    width: 100%;
    height: auto;
  }

  .phone {
    position: absolute;
    right: 4.5%;
    top: 30%;
    width: 21%;
    border-radius: 9% / 4.4%;
    padding: 1.3%;
    background: #05060a;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.16),
      0 40px 70px -20px rgba(0, 0, 0, 0.95),
      0 0 60px -20px rgba(var(--accent), 0.35);
    transition: transform 0.6s var(--ease);
  }

  .phone img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8% / 3.8%;
  }

  .stage:hover .win {
    transform: translateY(-5px);
  }

  .stage:hover .phone {
    transform: translateY(-9px);
  }

  @media (prefers-reduced-motion: reduce) {
    .win,
    .phone {
      transition: none;
    }
  }
</style>
