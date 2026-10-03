<script>
  /**
   * A composed product visual: a dark stage with a soft glow, a tilted app window, and a few
   * floating pieces of the real UI layered over it. Everything is cut from real screenshots.
   *
   * floats: [{ src, alt, style, crop? }]
   *   style: absolute position, e.g. "left:4%; top:60%; width:50%"
   *   crop:  { iw, ih, x, y, w, h } shows just that pixel region of a bigger image
   */
  let { theme = 'ember', label = '', main, alt = '', floats = [], tilt = 0.7 } = $props();
</script>

<div class="stage {theme}" style="--tilt:{tilt}">
  {#if label}<span class="tag">{label}</span>{/if}
  <div class="glow"></div>
  <div class="dots"></div>

  <div class="win">
    <div class="bar"><i></i><i></i><i></i></div>
    <img src={main} {alt} loading="lazy" decoding="async" />
  </div>

  {#each floats as f, i (f.src + i)}
    <div class="float f{i}" style={f.style}>
      {#if f.crop}
        <div class="cropbox" style="aspect-ratio:{f.crop.w}/{f.crop.h}">
          <img
            src={f.src}
            alt={f.alt ?? ''}
            loading="lazy"
            decoding="async"
            style="width:{(f.crop.iw / f.crop.w) * 100}%; left:{(-f.crop.x / f.crop.w) * 100}%; top:{(-f.crop.y / f.crop.h) * 100}%"
          />
        </div>
      {:else}
        <img src={f.src} alt={f.alt ?? ''} loading="lazy" decoding="async" />
      {/if}
    </div>
  {/each}
</div>

<style>
  .stage {
    --accent: 255, 122, 26;
    --accent2: 255, 61, 110;
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 10;
    background: #09090b;
    border: 1px solid #1c1c20;
    isolation: isolate;
  }

  .stage.ember {
    --accent: 255, 122, 26;
    --accent2: 255, 61, 110;
  }

  .stage.lava {
    --accent: 255, 106, 40;
    --accent2: 214, 52, 28;
  }

  .glow {
    position: absolute;
    inset: 0;
    z-index: -2;
    background:
      radial-gradient(60% 70% at 88% 6%, rgba(var(--accent), 0.34), transparent 70%),
      radial-gradient(55% 60% at 4% 100%, rgba(var(--accent2), 0.22), transparent 70%);
  }

  .dots {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: radial-gradient(rgba(255, 255, 255, 0.11) 1px, transparent 1.2px);
    background-size: 22px 22px;
    -webkit-mask-image: radial-gradient(75% 85% at 70% 35%, #000, transparent 85%);
    mask-image: radial-gradient(75% 85% at 70% 35%, #000, transparent 85%);
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
    left: 11%;
    top: 15%;
    width: 94%;
    border-radius: 10px;
    overflow: hidden;
    background: #0b0b0e;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 50px 90px -20px rgba(0, 0, 0, 0.85),
      0 0 80px -20px rgba(var(--accent), 0.45);
    transform: perspective(1500px) rotateY(calc(-13deg * var(--tilt))) rotateX(calc(5deg * var(--tilt))) rotateZ(calc(0.6deg * var(--tilt)));
    transform-origin: 0% 50%;
    transition: transform 0.7s var(--ease);
  }

  .bar {
    display: flex;
    gap: 5px;
    padding: 7px 10px;
    background: #121216;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  .bar i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.16);
  }

  .win img {
    display: block;
    width: 100%;
    height: auto;
  }

  .float {
    position: absolute;
    border-radius: 9px;
    overflow: hidden;
    background: #0b0b0e;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.12),
      0 30px 60px -16px rgba(0, 0, 0, 0.9),
      0 0 50px -18px rgba(var(--accent), 0.4);
    transform: perspective(1500px) rotateY(calc(-9deg * var(--tilt))) rotateX(calc(3deg * var(--tilt)));
    transition: transform 0.7s var(--ease);
    z-index: 3;
  }

  .float img {
    display: block;
    width: 100%;
    height: auto;
  }

  .cropbox {
    position: relative;
    overflow: hidden;
  }

  .cropbox img {
    position: absolute;
    max-width: none;
    height: auto;
  }

  /* On hover the scene settles toward the viewer */
  .stage:hover .win {
    transform: perspective(1500px) rotateY(calc(-7deg * var(--tilt))) rotateX(calc(2deg * var(--tilt))) translateY(-6px);
  }

  .stage:hover .float {
    transform: perspective(1500px) rotateY(calc(-4deg * var(--tilt))) rotateX(calc(1deg * var(--tilt))) translateY(-8px);
  }

  @media (prefers-reduced-motion: reduce) {
    .win,
    .float {
      transition: none;
    }
  }
</style>
