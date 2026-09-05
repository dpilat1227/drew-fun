<script>
  const projects = [
    {
      href: '/projects/lavamesh',
      title: 'LavaMesh',
      blurb:
        'Web console for Headscale. Node fleet, pre-auth keys, subnet routing, ACLs, and scheduled health checks.',
      tags: [
        { label: 'Active Development', tone: 'green' },
        { label: 'Next.js', tone: 'purple' },
        { label: 'TypeScript', tone: 'cyan' },
        { label: 'Postgres', tone: 'orange' },
      ],
      image: '/media/lavamesh/landing-hero.webp',
      alt: 'LavaMesh marketing landing page with product visualization',
    },
    {
      href: '/projects/lavamoney',
      title: 'LavaMoney',
      blurb:
        'Local-first personal finance app for iOS, Android, and web. Net worth, spend ceilings, Plaid sync, and recurring bill detection.',
      tags: [
        { label: 'Active Development', tone: 'green' },
        { label: 'React Native', tone: 'cyan' },
        { label: 'Expo', tone: 'purple' },
        { label: 'Plaid SDK', tone: 'orange' },
      ],
      image: '/media/lavamoney/landing-hero.png',
      alt: 'LavaMoney personal finance app — net worth, budgets, and spending trends',
    },
    {
      href: '/projects/agent-civilizations',
      title: 'Agent Civilizations',
      blurb:
        'A visual essay on how 1,200 sandboxed OpenAI agents self-organized, ran sacrificial tests, and hacked Hugging Face.',
      tags: [
        { label: 'Active Development', tone: 'green' },
        { label: 'Visual Essay', tone: 'purple' },
        { label: 'Scrollytelling', tone: 'cyan' },
        { label: 'AI Safety', tone: 'red' },
      ],
      image: null,
      alt: 'Network visualization of rogue AI agents forming a covert collective',
      isEssay: true,
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
      image: null,
      alt: 'Order book ladder and routing diagram showing a retail order forking off-exchange',
      isEssay: true,
      essayPreview: 'microsecond',
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

    <div class="project-list">
      {#each projects as project (project.href)}
        <a href={project.href} class="project-card">
          <div class="project-shot">
            {#if project.essayPreview === 'microsecond'}
              <!-- Animated order-routing preview for the microstructure essay -->
              <div class="essay-preview" aria-label={project.alt}>
                <svg viewBox="0 0 320 200" class="ep-svg">
                  <circle cx="40" cy="100" r="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
                  <text x="40" y="80" text-anchor="middle" font-family="monospace" font-size="7" fill="#c5cce0">ORDER</text>
                  {#each [[40,100,240,40,'#9e6ede'],[40,100,240,90,'#ff9f43'],[40,100,240,140,'#5ce1ff'],[40,100,240,170,'#3ee07f']] as [x1,y1,x2,y2,c]}
                    <path d="M {x1},{y1} C {(x1+x2)/2},{y1} {(x1+x2)/2},{y2} {x2},{y2}" fill="none" stroke={c} stroke-width="1.4" stroke-dasharray="4 3" opacity="0.75">
                      <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite"/>
                    </path>
                  {/each}
                  <rect x="245" y="30" width="65" height="20" rx="5" fill="rgba(158,110,222,0.12)" stroke="#9e6ede" stroke-width="1"/>
                  <text x="277" y="44" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#c4a3f5">CITADEL</text>
                  <rect x="245" y="80" width="65" height="20" rx="5" fill="rgba(255,159,67,0.12)" stroke="#ff9f43" stroke-width="1"/>
                  <text x="277" y="94" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#ffc078">VIRTU</text>
                  <rect x="245" y="130" width="65" height="20" rx="5" fill="rgba(92,225,255,0.12)" stroke="#5ce1ff" stroke-width="1"/>
                  <text x="277" y="144" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#a3ecff">2 SIGMA</text>
                  <rect x="245" y="160" width="65" height="20" rx="5" fill="rgba(62,224,127,0.1)" stroke="#3ee07f" stroke-width="1" stroke-dasharray="2 2"/>
                  <text x="277" y="174" text-anchor="middle" font-family="monospace" font-size="6.5" fill="#8ff0bd">NASDAQ</text>
                </svg>
                <div class="ep-label">Visual Essay</div>
              </div>
            {:else if project.isEssay}
              <!-- Animated network preview for the visual essay -->
              <div class="essay-preview" aria-label={project.alt}>
                <svg viewBox="0 0 320 200" class="ep-svg">
                  <!-- Connecting lines -->
                  {#each [[70,70,160,100],[160,100,250,70],[160,100,200,150],[70,70,120,150],[250,70,200,150],[120,150,200,150]] as [x1,y1,x2,y2]}
                    <line {x1} {y1} {x2} {y2} stroke="rgba(158,110,222,0.25)" stroke-width="0.8" stroke-dasharray="3 2"/>
                  {/each}
                  <!-- Artifactory hub -->
                  <circle cx="160" cy="100" r="14" fill="rgba(158,110,222,0.15)" stroke="rgba(158,110,222,0.5)" stroke-width="1.2"/>
                  <text x="160" y="104" text-anchor="middle" font-family="monospace" font-size="7" fill="#9e6ede">HUB</text>
                  <!-- Agent nodes -->
                  {#each [[70,70,'purple'],[250,70,'red'],[120,150,'purple'],[200,150,'orange'],[40,130,'purple'],[280,140,'red']] as [cx,cy,c]}
                    <circle {cx} {cy} r="8"
                      fill={c==='purple'?'#9e6ede':c==='red'?'#ff5d73':'#ff9f43'}
                      opacity="0.85">
                      <animate attributeName="opacity" values="0.85;0.5;0.85" dur="{1.5 + Math.random()}s" repeatCount="indefinite"/>
                    </circle>
                  {/each}
                  <!-- Attack arcs to "HuggingFace" box -->
                  <rect x="240" y="40" width="70" height="24" rx="5" fill="rgba(62,224,127,0.08)" stroke="rgba(62,224,127,0.35)" stroke-width="1"/>
                  <text x="275" y="56" text-anchor="middle" font-family="monospace" font-size="7" fill="#3ee07f">HuggingFace</text>
                  <path d="M250,70 Q265,45 275,52" fill="none" stroke="#ff5d73" stroke-width="1" stroke-dasharray="3 2" opacity="0.7">
                    <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite"/>
                  </path>
                </svg>
                <div class="ep-label">Visual Essay</div>
              </div>
            {:else}
              <img src={project.image} alt={project.alt} />
            {/if}
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

<style>
  .essay-preview {
    width: 100%;
    height: 100%;
    background: #050505;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .ep-svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .ep-label {
    position: absolute;
    bottom: 0.75rem;
    left: 0.85rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(158,110,222,0.6);
  }
</style>

