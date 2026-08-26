<script>
  const featured = {
    href: '/projects/lavamesh',
    index: '01',
    eyebrow: 'Control plane',
    title: 'LavaMesh',
    blurb:
      'A management dashboard for Headscale. Node fleet, users, pre-auth keys, subnet routing, ACL policy, audit logging and alerting. Sole engineer. The write-up includes the parts that do not work.',
    stack: 'Next.js · TypeScript · Postgres · Redis · Fly.io',
    image: '/media/lavamesh/dashboard.webp',
    alt: 'LavaMesh node fleet dashboard',
  };

  const other = {
    href: '/projects/wellnest',
    index: '02',
    eyebrow: 'Company',
    title: 'Wellnest',
    blurb:
      'Co-founded a student mental-health app. Raised $800k, signed UPenn and Boston University, 5.0 App Store rating. Wound down in 2022. I ran the company. I did not write the production code.',
    stack: 'Product · Fundraising · Operations',
    image: '/media/wellnest/app-home.webp',
    alt: 'Wellnest app home screen',
  };
</script>

<div class="page">
  <div class="wrap">
    <span class="tech-label">Work that shipped</span>
    <h1>Projects</h1>
    <p class="lead" style="max-width:36ch;margin-top:1rem;">
      Drafts and “coming soon” are not listed.
    </p>
  </div>

  <a href={featured.href} class="film film-bleed" aria-label="LavaMesh case study">
    <img src={featured.image} alt={featured.alt} />
    <div class="film-veil"></div>
    <div class="film-meta">
      <div>
        <span class="tech-label" style="color: rgba(228,197,122,0.85); margin-bottom: 0.35rem;">{featured.index} · {featured.eyebrow}</span>
        <h2>{featured.title}</h2>
        <p class="film-blurb">{featured.blurb}</p>
        <p class="mono film-stack">{featured.stack}</p>
      </div>
    </div>
  </a>

  <div class="wrap">
    <a href={other.href} class="second">
      <div class="second-media">
        <img src={other.image} alt={other.alt} />
      </div>
      <div class="second-body">
        <span class="tech-label">{other.index} · {other.eyebrow}</span>
        <h2 style="margin-bottom:0.6rem;">{other.title}</h2>
        <p style="color:var(--text-3);">{other.blurb}</p>
        <p class="mono" style="font-size:0.72rem;color:var(--text-4);margin-top:1rem;">{other.stack}</p>
      </div>
    </a>
  </div>
</div>

<style>
  .film-blurb {
    max-width: 46ch;
    margin-top: 0.75rem;
    color: rgba(244, 239, 230, 0.78);
    font-size: 0.95rem;
    line-height: 1.55;
  }

  .film-stack {
    margin-top: 0.85rem;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: rgba(244, 239, 230, 0.45);
  }

  .second {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2.5rem;
    align-items: center;
    margin-top: 4rem;
    color: inherit;
    border-bottom: none;
    transition: opacity 0.3s var(--ease);
  }

  .second:hover {
    opacity: 0.88;
    color: inherit;
  }

  .second-media {
    border: 1px solid var(--border-1);
    border-radius: 14px;
    overflow: hidden;
    background: var(--bg-sunken);
    height: 340px;
  }

  .second-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .second-body {
    max-width: 46ch;
  }

  @media (max-width: 860px) {
    .second {
      grid-template-columns: 1fr;
      gap: 1.25rem;
      margin-top: 2.5rem;
    }

    .second-media {
      height: 240px;
    }
  }
</style>
