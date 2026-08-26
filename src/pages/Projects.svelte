<script>
  const projects = [
    {
      href: '/projects/lavamesh',
      title: 'LavaMesh',
      blurb:
        "Headscale dashboard. Nodes, keys, routes, ACLs, audit log, alerting. Sole engineer. Write-up includes the parts that don't work.",
      tags: [
        { label: 'Next.js', tone: 'purple' },
        { label: 'TypeScript', tone: 'cyan' },
        { label: 'Postgres', tone: 'green' },
        { label: 'Redis', tone: 'orange' },
        { label: 'Fly.io', tone: 'pink' },
      ],
      image: '/media/lavamesh/landing-hero.webp',
      alt: 'LavaMesh marketing landing page with product visualization',
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
      image: '/media/wellnest/iphone.webp',
      alt: 'Wellnest app on an iPhone, home screen with daily cards',
    },
  ];
</script>

<div class="page">
  <div class="wrap">
    <h1>Projects</h1>
    <p class="lead" style="max-width:36ch;margin-top:0.75rem;">
      Drafts aren't listed.
    </p>

    <div class="project-list">
      {#each projects as project (project.href)}
        <a href={project.href} class="project-card">
          <div class="project-shot">
            <img src={project.image} alt={project.alt} />
          </div>
          <div class="project-body">
            <h2>{project.title}</h2>
            <p>{project.blurb}</p>
            <div class="tag-row" style="margin-top:1rem;">
              {#each project.tags as tag (tag.label)}
                <span class="tag tag-{tag.tone}">{tag.label}</span>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
