<script>
  const now = [
    { k: 'Focus', v: 'Infrastructure, networking, backend' },
    { k: 'Languages', v: 'TypeScript, Python, C++, SQL' },
    { k: 'Building', v: 'Next.js, React, Postgres, Prisma, Redis' },
    { k: 'Infra', v: 'Vercel, Fly.io, Docker, WireGuard' },
    { k: 'Looking for', v: 'Internships and full-time' },
  ];

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
      tags: [
        { label: 'Product', tone: 'purple' },
        { label: 'Quant', tone: 'cyan' },
        { label: 'Ops', tone: 'orange' },
      ],
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
      tags: [{ label: 'Investing', tone: 'green' }],
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
      tags: [{ label: 'Company', tone: 'pink' }],
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

<div class="page home">
  <div class="wrap">
    <div class="print-only" style="text-align:center;margin-bottom:14pt;border-bottom:1px solid #000;padding-bottom:8pt;">
      <h1 style="font-size:18pt;margin:0;">Drew Pilat</h1>
      <p style="font-size:9.5pt;margin:2pt 0 0;">dpilat@uchicago.edu · (248) 231-9562 · linkedin.com/in/drew-pilat · drew.fun</p>
    </div>

    <section class="hero no-print">
      <h1 class="display-name">Drew Pilat</h1>
      <p class="lead kicker">
        UChicago CS. Looking for internships and full-time.
      </p>
      <div class="cta-row">
        <a href="/Drew_Pilat_Resume.pdf" download class="btn btn-primary">Résumé</a>
        <a href="/projects/lavamesh" class="btn">LavaMesh</a>
      </div>
    </section>

    <div class="split">
      <aside class="no-print">
        <span class="tech-label">Currently</span>
        <table class="data-table">
          <tbody>
            {#each now as row (row.k)}
              <tr><td>{row.k}</td><td>{row.v}</td></tr>
            {/each}
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
            {#if job.tags}
              <div class="tag-row" style="margin:0.35rem 0 0.85rem;">
                {#each job.tags as tag (tag.label)}
                  <span class="tag tag-{tag.tone}">{tag.label}</span>
                {/each}
              </div>
            {/if}
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
  .home {
    padding-top: 0.5rem;
  }

  .hero {
    padding: 1.75rem 0 2.75rem;
  }

  .kicker {
    max-width: 36ch;
    margin-top: 0.7rem;
    font-size: 1.05rem;
    color: var(--text-2);
  }

  .cta-row {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: 1.4rem;
  }

  .split {
    display: grid;
    grid-template-columns: minmax(260px, 320px) 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  .split aside {
    position: sticky;
    top: 5.5rem;
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
  }

  @media print {
    .split {
      display: block;
    }

    .home {
      padding: 0;
    }
  }
</style>
