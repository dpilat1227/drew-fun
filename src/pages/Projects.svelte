<script>
  const featured = {
    href: '/projects/lavamesh',
    eyebrow: 'Control plane // networking',
    title: 'LavaMesh',
    blurb:
      'A management dashboard for Headscale, the open-source Tailscale control server. Node fleet, users, pre-auth keys, subnet routing, ACL policy, audit logging and alerting. Designed, built, and deployed as sole engineer.',
    stack: 'Next.js 16 · React 19 · TypeScript · Postgres · Prisma · Redis · Stripe · Fly.io',
    status: 'Shipped',
    statusKind: 'green',
    image: '/media/lavamesh/dashboard.webp',
    alt: 'LavaMesh node fleet dashboard',
  };

  const others = [
    {
      href: '/projects/wellnest',
      eyebrow: 'Consumer product // company',
      title: 'Wellnest',
      blurb:
        'Co-founded a mental health app for students. Raised $800k pre-seed, ran product and operations, signed university partnerships, held a 5.0 App Store rating. Wound down in 2022. I ran the company; I did not write the production code.',
      stack: 'Product · Fundraising · Partnerships',
      status: '2019 — 2022',
      statusKind: 'neutral',
      image: '/media/wellnest/app-home.webp',
      alt: 'Wellnest app home screen',
    },
  ];
</script>

<div class="page">
  <div class="wrap">
    <span class="tech-label">Repository // work</span>
    <h1 style="font-size:clamp(1.9rem,4vw,2.6rem);">Projects</h1>
    <p class="lead" style="max-width:56ch;margin-top:1rem;">
      Things that shipped. Drafts, staged prototypes, and “coming soon” cards are
      not listed here.
    </p>

    <hr class="rule" />

    <a href={featured.href} class="feature card-link">
      <div class="feature-media">
        <img src={featured.image} alt={featured.alt} loading="lazy" decoding="async" />
      </div>
      <div class="feature-body">
        <span class="tech-label">{featured.eyebrow}</span>
        <div class="feature-title">
          <h2 style="margin-bottom:0;">{featured.title}</h2>
          <span class="badge badge-green badge-dot">{featured.status}</span>
        </div>
        <p style="color:var(--text-2);margin-top:0.9rem;">{featured.blurb}</p>
        <p class="mono" style="font-size:0.74rem;color:var(--text-4);margin-top:1rem;">{featured.stack}</p>
        <span class="read-more mono">Read the case study →</span>
      </div>
    </a>

    <div class="other-grid">
      {#each others as p (p.title)}
        <a href={p.href} class="card card-link">
          {#if p.image}
            <div class="other-media">
              <img src={p.image} alt={p.alt} loading="lazy" decoding="async" />
            </div>
          {/if}
          <span class="tech-label">{p.eyebrow}</span>
          <div class="feature-title">
            <h3 style="margin-bottom:0;">{p.title}</h3>
            <span class="badge {p.statusKind === 'green' ? 'badge-green' : ''}">{p.status}</span>
          </div>
          <p style="font-size:0.94rem;color:var(--text-3);margin-top:0.75rem;">{p.blurb}</p>
          <p class="mono" style="font-size:0.72rem;color:var(--text-4);margin-top:0.9rem;">{p.stack}</p>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .feature {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 0;
    background: var(--bg-raised);
    border: 1px solid var(--border-1);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.3s var(--ease);
  }

  .feature:hover {
    border-color: var(--border-gold);
    transform: none;
  }

  .feature-media {
    background: var(--bg-sunken);
    border-right: 1px solid var(--border-1);
    overflow: hidden;
  }

  .feature-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
  }

  .feature-body {
    padding: 2.25rem;
  }

  .feature-title {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .read-more {
    display: inline-block;
    margin-top: 1.5rem;
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gold-bright);
  }

  .other-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .other-media {
    height: 210px;
    margin: -1.6rem -1.6rem 1.4rem;
    border-bottom: 1px solid var(--border-1);
    background: var(--bg-sunken);
    overflow: hidden;
  }

  .other-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  @media (max-width: 860px) {
    .feature {
      grid-template-columns: 1fr;
    }

    .feature-media {
      border-right: none;
      border-bottom: 1px solid var(--border-1);
      max-height: 240px;
    }

    .feature-body {
      padding: 1.6rem;
    }

    .other-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
