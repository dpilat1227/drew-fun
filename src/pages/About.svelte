<script>
  const education = [
    {
      org: 'University of Chicago',
      date: 'Expected 2027',
      role: 'M.S. Computer Science',
      notes: 'High Performance Computing. Algorithms, databases, discrete math.',
    },
    {
      org: 'University of Michigan',
      date: '2016 — 2020',
      role: 'B.B.A., Ross School of Business',
      notes: 'Financial markets and entrepreneurial law.',
    },
  ];

  const experience = [
    {
      org: 'Benzinga',
      date: '2023 — 2025',
      role: 'Chief of Staff',
      bullets: [
        'Churn models in Python, and the dashboards customer success used to rank who was about to cancel.',
        'Factor models for Benzinga Quant. Ranked equities on volatility and momentum.',
        'A data product that did $500k+ after launch.',
      ],
    },
    {
      org: 'Jumpstart Health Investors',
      date: '2022 — 2023',
      role: 'Investment Associate',
      bullets: [
        'Diligence memos on 200+ healthcare companies for the investment committee.',
        'Used the fund\'s history to decide where the next checks went.',
        'Worked with portfolio companies on fundraising and product.',
      ],
    },
    {
      org: 'Wellnest',
      date: '2019 — 2022',
      role: 'Co-Founder & COO',
      bullets: [
        'Raised $800k pre-seed.',
        'Partnerships with UPenn and Boston University.',
        'Consumer mindfulness app. 5.0 on the App Store. Wound it down in 2022.',
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
      <p class="kicker">
        Interested in software that can get an edge in markets, and in making trading faster. Also interested in precision medicine and healthcare startups.
      </p>
      <div class="cta-row">
        <a href="/Drew_Pilat_Resume.pdf" download class="btn btn-primary">Resume</a>
        <a href="mailto:dpilat@uchicago.edu" class="btn">Email</a>
      </div>
    </section>

    <section class="band">
      <div class="section-head">Education</div>
      {#each education as item (item.org)}
        <article class="fact">
          <div class="fact-top">
            <h2>{item.org}</h2>
            <span class="fact-date">{item.date}</span>
          </div>
          <p class="fact-sub">{item.role}</p>
          <p class="note">{item.notes}</p>
        </article>
      {/each}
    </section>

    <section class="band">
      <div class="section-head">Experience</div>
      {#each experience as job (job.org)}
        <article class="fact">
          <div class="fact-top">
            <h2>{job.org}</h2>
            <span class="fact-date">{job.date}</span>
          </div>
          <p class="fact-sub">{job.role}</p>
          <ul class="bullets">
            {#each job.bullets as text}
              <li>{text}</li>
            {/each}
          </ul>
        </article>
      {/each}
    </section>

    <section class="contact no-print">
      <p class="eyebrow">Contact</p>
      <p class="contact-line">
        <a href="mailto:dpilat@uchicago.edu">dpilat@uchicago.edu</a>
        <a href="https://github.com/dpilat1227" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/drew-pilat/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
      <p class="looking">Looking for internships in 2026, and full-time in 2027.</p>
    </section>
  </div>
</div>

<style>
  .home {
    padding-top: 1.5rem;
  }

  .hero {
    max-width: 40rem;
    padding: 4.5rem 0 5rem;
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 1.25rem;
  }

  .kicker {
    max-width: 38rem;
    margin-top: 1.5rem;
    font-size: 16px;
    line-height: 1.65;
    color: var(--text-1);
  }

  .band {
    margin-top: 4.75rem;
  }

  .fact + .fact {
    margin-top: 2.75rem;
  }

  .fact-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
  }

  .fact-top h2 {
    font-size: clamp(1.65rem, 2.8vw, 2.05rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.05;
    margin: 0;
  }

  .fact-date {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--text-4);
    white-space: nowrap;
  }

  .fact-sub {
    margin: 0.45rem 0 0;
    font-family: var(--font-sans);
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.25;
    color: var(--text-1);
  }

  .fact .bullets {
    margin-top: 0.85rem;
  }

  .cta-row {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: 1.75rem;
  }

  .note {
    font-size: 0.95rem;
    color: var(--text-3);
    margin: 0.25rem 0 0;
  }

  .contact {
    padding: 2.5rem 0 1rem;
    border-top: 1px solid var(--border-1);
    margin-top: 3rem;
  }

  .contact-line {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin: 0;
  }

  .looking {
    margin-top: 0.85rem;
    color: var(--text-3);
    font-size: 0.95rem;
  }

  @media (max-width: 800px) {
    .hero {
      padding-top: 2.5rem;
    }

    .fact-top {
      flex-wrap: wrap;
      gap: 0.25rem 1rem;
    }
  }
</style>
