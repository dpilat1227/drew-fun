<script>
  import Mockup from '../lib/Mockup.svelte';
  import BrowserMock from '../lib/BrowserMock.svelte';

  const projects = [
    {
      href: '/projects/lavaquant',
      title: 'LavaQuant',
      blurb:
        'Alpha research lab. Write an expression, backtest it in seconds, check it against WorldQuant BRAIN and Numerai rules of thumb.',
      meta: ['Next.js', 'FastAPI', 'LightGBM'],
      label: 'Web app',
      image: '/media/lavaquant/app-window.webp',
      alt: 'LavaQuant dashboard: score dial, KPI strip and equity curve',
      browser: 'quant.drew.fun',
    },
    {
      href: '/projects/microsecond',
      title: 'The Anatomy of a Microsecond',
      blurb:
        'Where does your retail market order actually go? Payment for order flow, sub-penny internalization, microwave latency arbitrage, and the IEX speed bump — scrollytelling style.',
      meta: ['Visual essay', 'Market microstructure', 'Scrollytelling'],
      label: 'Visual essay',
      image: '/media/microsecond/cover.webp',
      bleed: true,
      hideLabel: true,
      alt: 'The essay\'s Rule 606 routing table: where a Robinhood market order goes, by wholesaler',
    },
    {
      href: '/projects/lavamesh',
      title: 'LavaMesh',
      blurb:
        'A free dashboard for a Headscale server. Nodes, keys, routes, ACLs, and health checks.',
      meta: ['TypeScript', 'Next.js', 'Postgres'],
      label: 'Web app',
      image: '/media/lavamesh/stage-window.webp',
      alt: 'LavaMesh node fleet dashboard',
      browser: 'lavamesh.app',
    },
    {
      href: '/projects/wellnest',
      title: 'Wellnest',
      blurb:
        'Co-founded a student mental-health app. Raised $800k. Wound down in 2022. I ran the company, not the codebase.',
      meta: ['Product', 'Fundraising', 'Operations'],
      label: 'Mobile app',
      image: '/media/wellnest/screens.webp',
      bleed: true,
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
          {#if project.browser}
            <BrowserMock crop src={project.image} alt={project.alt} url={project.browser} />
          {:else}
            <Mockup label={project.hideLabel ? '' : project.label} src={project.image} alt={project.alt} bleed={project.bleed} />
          {/if}
          <div class="project-body">
            <h2>{project.title}{#if project.external}<span class="ext" aria-hidden="true">↗</span>{/if}</h2>
            <p>{project.blurb}</p>
            <p class="project-meta">{project.meta.join(' · ')}</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Two-column grid with no card box: the thumbnail is the only container.
     Scoped here so the shared card styles in app.css stay untouched. */
  .project-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem 2rem;
  }

  .project-list .project-card,
  .project-list .project-card:hover {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-content: start;
    align-items: start;
    gap: 1.25rem;
    padding: 0;
    border: 0;
    background: transparent;
  }

  .project-body h2 {
    margin-bottom: 0.5rem;
  }

  .ext {
    display: inline-block;
    margin-left: 0.4rem;
    font-size: 0.6em;
    color: var(--text-4);
    transform: translateY(-0.25em);
    transition: transform 0.3s var(--ease), color 0.2s;
  }

  .project-card:hover .ext {
    color: var(--text-1);
    transform: translate(2px, -0.4em);
  }

  .project-card:hover h2 {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.3em;
  }

  @media (max-width: 860px) {
    .project-list {
      grid-template-columns: minmax(0, 1fr);
      gap: 2.5rem;
    }
  }
</style>
