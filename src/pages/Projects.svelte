<script>
  import Mockup from '../lib/Mockup.svelte';

  // kind: 'browser' frames a screenshot in a minimal window; 'poster' frames artwork as-is.
  const projects = [
    {
      href: 'https://quant.drew.fun',
      external: true,
      title: 'lavaquant',
      blurb:
        'Alpha research lab. Write an expression, backtest it in seconds, check it against WorldQuant BRAIN and Numerai rules of thumb.',
      tags: [
        { label: 'Next.js', tone: 'cyan' },
        { label: 'FastAPI', tone: 'green' },
        { label: 'LightGBM', tone: 'orange' },
      ],
      kind: 'browser',
      label: 'Web app',
      url: 'quant.drew.fun',
      image: '/media/lavaquant/dashboard-crop.webp',
      alt: 'lavaquant dashboard: score dial, KPI strip and equity curve',
    },
    {
      href: '/projects/microsecond',
      title: 'The Anatomy of a Microsecond',
      blurb:
        'Where does your retail market order actually go? Payment for order flow, sub-penny internalization, microwave latency arbitrage, and the IEX speed bump — scrollytelling style.',
      tags: [
        { label: 'Active Development', tone: 'green' },
        { label: 'Visual Essay', tone: 'purple' },
        { label: 'Market Microstructure', tone: 'orange' },
        { label: 'Scrollytelling', tone: 'cyan' },
      ],
      kind: 'browser',
      label: 'Visual essay',
      url: 'drew.fun/projects/microsecond',
      alt: 'Order book ladder and routing diagram showing a retail order forking off-exchange',
      essayPreview: 'microsecond',
    },
    {
      href: '/projects/lavamesh',
      title: 'LavaMesh',
      blurb:
        'A free dashboard for a Headscale server. Nodes, keys, routes, ACLs, and health checks.',
      tags: [
        { label: 'TypeScript', tone: 'purple' },
        { label: 'Next.js', tone: 'cyan' },
        { label: 'Postgres', tone: 'orange' },
      ],
      kind: 'browser',
      label: 'Web app',
      url: 'lavamesh.com',
      image: '/media/lavamesh/landing-crop.webp',
      alt: 'LavaMesh landing page: Private networking, no compromise',
    },
    {
      href: '/projects/wellnest',
      title: 'Wellnest',
      blurb:
        'Co-founded a student mental-health app. Raised $800k. Wound down in 2022. I ran the company, not the codebase.',
      tags: [
        { label: 'Product', tone: 'pink' },
        { label: 'Fundraising', tone: 'orange' },
        { label: 'Operations', tone: 'purple' },
      ],
      kind: 'poster',
      label: 'Mobile app',
      image: '/media/wellnest/poster.webp',
      alt: 'Wellnest launch art: the app home screen and a mascot parachuting beside "Self-care that\'s fun"',
    },
  ];
</script>

<div class="page">
  <div class="wrap">
    <h1>Projects</h1>

    <div class="project-list">
      {#each projects as project (project.href)}
        <a
          href={project.href}
          class="project-card"
          target={project.external ? '_blank' : undefined}
          rel={project.external ? 'noopener noreferrer' : undefined}
        >
          {#if project.essayPreview === 'microsecond'}
            <!-- Animated order-routing preview for the microstructure essay -->
            <Mockup kind={project.kind} label={project.label} url={project.url} alt={project.alt}>
              <svg viewBox="0 14 320 176" class="ep-svg" role="img" aria-label={project.alt}>
                <circle cx="40" cy="100" r="10" fill="rgba(17,17,16,0.08)" stroke="#111110" stroke-width="1" />
                <text x="40" y="80" text-anchor="middle" font-family="monospace" font-size="7" fill="#6b6862">ORDER</text>
                {#each [[40, 100, 240, 40, '#111110'], [40, 100, 240, 90, '#6b6862'], [40, 100, 240, 140, '#a3a099'], [40, 100, 240, 170, '#111110']] as [x1, y1, x2, y2, c]}
                  <path d="M {x1},{y1} C {(x1 + x2) / 2},{y1} {(x1 + x2) / 2},{y2} {x2},{y2}" fill="none" stroke={c} stroke-width="1.4" stroke-dasharray="4 3" opacity="0.75">
                    <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
                  </path>
                {/each}
                <rect x="245" y="30" width="65" height="20" fill="none" stroke="#111110" stroke-width="1" />
                <text x="277" y="44" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#111110">CITADEL</text>
                <rect x="245" y="80" width="65" height="20" fill="none" stroke="#6b6862" stroke-width="1" />
                <text x="277" y="94" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#6b6862">VIRTU</text>
                <rect x="245" y="130" width="65" height="20" fill="none" stroke="#a3a099" stroke-width="1" />
                <text x="277" y="144" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#6b6862">2 SIGMA</text>
                <rect x="245" y="160" width="65" height="20" fill="none" stroke="#111110" stroke-width="1" stroke-dasharray="2 2" />
                <text x="277" y="174" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#111110">NASDAQ</text>
              </svg>
            </Mockup>
          {:else}
            <Mockup kind={project.kind} label={project.label} url={project.url} src={project.image} alt={project.alt} />
          {/if}
          <div class="project-body">
            <h2>{project.title}</h2>
            <p>{project.blurb}</p>
            <p class="project-meta">
              {project.tags.map((tag) => tag.label).join(' · ')}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>

  /* 2x2 grid. Scoped here so the shared card styles in app.css stay untouched. */
  .project-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .project-list .project-card {
    grid-template-columns: minmax(0, 1fr);
    align-content: start;
    align-items: start;
    gap: 1.1rem;
  }

  @media (max-width: 860px) {
    .project-list {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .ep-svg {
    width: 100%;
    height: auto;
    display: block;
    padding: 2% 3% 1%;
    background: #fff;
  }
</style>
