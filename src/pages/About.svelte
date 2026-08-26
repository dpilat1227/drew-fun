<script>
  const education = [
    {
      org: 'University of Chicago',
      date: 'Expected 2027',
      role: 'M.S. Computer Science',
      notes: [
        'Specialization: High Performance Computing',
        'Coursework: Discrete Mathematics, Python for Data Science, Algorithms, Databases',
      ],
    },
    {
      org: 'University of Michigan',
      date: '2016 — 2020',
      role: 'B.B.A., Ross School of Business',
      notes: ['Specializations: Financial Markets, Entrepreneurial Law'],
    },
  ];

  const experience = [
    {
      org: 'Benzinga',
      date: '2023 — 2025',
      role: 'Chief of Staff',
      bullets: [
        [
          'Predictive analytics',
          'Built churn models in Python with Tableau dashboards used by customer success to prioritise at-risk subscribers. Reported 85% accuracy and a 20% lift in CLV.',
        ],
        [
          'Product',
          'Led development and launch of a data product that generated $500,000+ after release.',
        ],
        [
          'Quantitative work',
          'Engineered factor-based models for Benzinga Quant to rank equities on volatility and momentum signals.',
        ],
        [
          'Growth operations',
          'Launched and ran the P&L for a virtual events line of business that did $350,000+ in 2024.',
        ],
        [
          'Marketing',
          'Rebuilt mobile app acquisition around an attribution model, cutting CAC 33%.',
        ],
      ],
    },
    {
      org: 'Jumpstart Health Investors',
      date: '2022 — 2023',
      role: 'Investment Associate',
      bullets: [
        [
          'Diligence',
          'Evaluated 200+ investment opportunities and presented memos to the Investment Committee.',
        ],
        [
          'Portfolio strategy',
          'Analysed historical fund data to inform deployment strategy.',
        ],
        [
          'Research',
          'Mapped market trends across the healthcare startup ecosystem.',
        ],
      ],
    },
    {
      org: 'Wellnest',
      date: '2019 — 2022',
      role: 'Co-Founder & COO',
      bullets: [
        [
          'Fundraising',
          'Raised $800,000 in pre-seed funding from venture firms and angel investors.',
        ],
        [
          'Partnerships',
          'Signed institutional partnerships with UPenn and Boston University.',
        ],
        [
          'Product',
          'Ran product for a consumer mindfulness app that held a 5.0 App Store rating. Wound down in 2022.',
        ],
      ],
    },
  ];
</script>

<div class="page">
  <div class="wrap">
    <div class="print-only" style="text-align:center;margin-bottom:14pt;border-bottom:1px solid #000;padding-bottom:8pt;">
      <h1 style="font-size:18pt;margin:0;">Drew Pilat</h1>
      <p style="font-size:9.5pt;margin:2pt 0 0;">dpilat@uchicago.edu · (248) 231-9562 · linkedin.com/in/drew-pilat · drew.fun</p>
    </div>

    <div class="hero no-print">
      <span class="tech-label">Chicago, IL · looking for software engineering</span>
      <h1>Drew Pilat</h1>
      <p class="lead" style="margin-top:1.25rem;max-width:46ch;">
        I build software. I spent six years on the operating side of companies —
        founding, investing, running product — and I am now a CS masters student
        at UChicago writing the systems instead of specifying them.
      </p>
      <p style="max-width:52ch;color:var(--text-3);font-size:0.965rem;">
        The thing to look at is LavaMesh: a Headscale control panel I designed and
        shipped myself. The write-up includes the parts that don't work.
      </p>

      <div style="display:flex;gap:0.7rem;flex-wrap:wrap;margin-top:2rem;">
        <a href="/projects/lavamesh" class="btn btn-gold">LavaMesh case study →</a>
        <a href="/Drew_Pilat_Resume.pdf" download class="btn">Résumé (PDF)</a>
        <a href="mailto:dpilat@uchicago.edu" class="btn">Email</a>
      </div>
    </div>

    <a href="/projects/lavamesh" class="feature-strip card-link no-print">
      <div class="feature-strip-media">
        <img src="/media/lavamesh/dashboard.webp" alt="LavaMesh node fleet dashboard" />
      </div>
      <div class="feature-strip-body">
        <span class="tech-label">Latest project</span>
        <div class="feature-title">
          <h2 style="margin-bottom:0;font-size:1.45rem;">LavaMesh</h2>
          <span class="badge badge-green badge-dot">Shipped</span>
        </div>
        <p style="color:var(--text-3);margin-top:0.75rem;font-size:0.95rem;">
          Dashboard for Headscale: node fleet, keys, subnet routes, ACL policy,
          audit log, alerting. Next.js, Postgres, Redis, Fly.io. Sole engineer.
        </p>
        <span class="read-more mono">Read the case study →</span>
      </div>
    </a>

    <hr class="rule" />

    <div class="split">
      <aside class="no-print">
        <span class="tech-label">Currently</span>
        <table class="data-table">
          <tbody>
            <tr><td>Focus</td><td>Infrastructure, networking, backend</td></tr>
            <tr><td>Languages</td><td>TypeScript, Python, C++, SQL</td></tr>
            <tr><td>Building with</td><td>Next.js, React, Postgres, Prisma, Redis</td></tr>
            <tr><td>Infra</td><td>Vercel, Fly.io, Docker, WireGuard</td></tr>
            <tr><td>Looking for</td><td>Software engineering internships and full-time</td></tr>
          </tbody>
        </table>
      </aside>

      <div>
        <div class="section-head">Education</div>
        {#each education as item (item.org)}
          <div class="entry">
            <div class="entry-meta">
              <span class="entry-org">{item.org}</span>
              <span class="entry-date">{item.date}</span>
            </div>
            <div class="entry-role">{item.role}</div>
            {#each item.notes as note}
              <p style="font-size:0.92rem;color:var(--text-3);margin-bottom:0.2rem;">{note}</p>
            {/each}
          </div>
        {/each}

        <div class="section-head" style="margin-top:3.5rem;">Experience</div>
        {#each experience as job (job.org)}
          <div class="entry">
            <div class="entry-meta">
              <span class="entry-org">{job.org}</span>
              <span class="entry-date">{job.date}</span>
            </div>
            <div class="entry-role">{job.role}</div>
            <ul class="bullets">
              {#each job.bullets as [label, text]}
                <li><strong>{label}:</strong> {text}</li>
              {/each}
            </ul>
          </div>
        {/each}

        <div class="section-head" style="margin-top:3.5rem;">Skills</div>
        <table class="data-table">
          <tbody>
            <tr><td>Programming</td><td>TypeScript, Python (NumPy, Pandas, scikit-learn), C++, SQL, Bash</td></tr>
            <tr><td>Web</td><td>React, Next.js, Svelte, Node, REST APIs, Prisma, Postgres, Redis</td></tr>
            <tr><td>Systems</td><td>Linux, Docker, WireGuard, networking, CI/CD</td></tr>
            <tr><td>Quantitative</td><td>Time-series analysis, factor modelling, risk (VaR, stress testing), Tableau</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style>
  .hero {
    padding-top: 1.5rem;
  }

  .feature-strip {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    margin-top: 3.25rem;
    background: var(--bg-raised);
    border: 1px solid var(--border-1);
    border-radius: 12px;
    overflow: hidden;
    color: inherit;
  }

  .feature-strip:hover {
    border-color: var(--border-gold);
    transform: none;
  }

  .feature-strip-media {
    background: var(--bg-sunken);
    border-right: 1px solid var(--border-1);
    min-height: 220px;
    overflow: hidden;
  }

  .feature-strip-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
  }

  .feature-strip-body {
    padding: 1.75rem 1.85rem;
  }

  .feature-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .read-more {
    display: inline-block;
    margin-top: 1.15rem;
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gold-bright);
  }

  .split {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 4rem;
    align-items: start;
  }

  .split aside {
    position: sticky;
    top: 6rem;
  }

  .split aside :global(.data-table tr) {
    display: block;
    padding: 0.7rem 0;
  }

  .split aside :global(.data-table td) {
    display: block;
    padding: 0;
  }

  .split aside :global(.data-table td:first-child) {
    width: auto;
    padding-bottom: 0.28rem;
    white-space: normal;
  }

  @media (max-width: 900px) {
    .split {
      grid-template-columns: 1fr;
      gap: 2.75rem;
    }

    .split aside {
      position: static;
    }

    .feature-strip {
      grid-template-columns: 1fr;
    }

    .feature-strip-media {
      border-right: none;
      border-bottom: 1px solid var(--border-1);
      max-height: 200px;
      min-height: 0;
    }
  }

  @media print {
    .split {
      display: block;
    }
  }
</style>
