<script>
  import Mockup from '../lib/Mockup.svelte';

  const education = [
    {
      org: 'University of Chicago',
      date: 'Expected 2027',
      role: 'M.S. Computer Science',
      notes: 'High Performance Computing. Parallel programming, cloud computing, databases, algorithms, discrete math.',
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
        'Built a churn model for Benzinga Pro and the Tableau dashboard customer success used to rank who was about to cancel. 85% accuracy; CLV rose 20%.',
        'Built Benzinga Quant: a multi-factor model behind a daily long/short watchlist and a per-stock scorecard of factor drivers like momentum and mean reversion.',
        'Wrote the companion newsletter on which quant strategies were working and which were decaying.',
        'Led development and launch of a mining product that has generated $500K+ since inception.',
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
        'Paid partnerships with UPenn and Boston University.',
        'Consumer mindfulness app. 5.0 on the App Store. Wound down in 2022.',
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

    <section class="band no-print">
      <div class="section-head">Featured project</div>
      <article class="featured">
        <div class="feat-copy">
          <h2>lavaquant</h2>
          <p class="fact-sub">Alpha research lab</p>
          <p class="feat-text">
            Write an alpha, backtest it in seconds, check it against WorldQuant BRAIN and Numerai rules of thumb.
          </p>
          <p class="feat-meta">Next.js · FastAPI · LightGBM</p>
          <div class="cta-row">
            <a href="https://quant.drew.fun" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Live demo</a>
            <a href="https://github.com/dpilat1227/lavaquant" target="_blank" rel="noopener noreferrer" class="btn">Source</a>
          </div>
        </div>
        <a class="feat-shot" href="https://quant.drew.fun" target="_blank" rel="noopener noreferrer" aria-label="Open the lavaquant demo">
          <Mockup
            fill
            label="Web app"
            src="/media/lavaquant/dashboard-crop.webp"
            alt="lavaquant dashboard: score dial, KPI strip and equity curve"
          />
        </a>
      </article>
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
      <p class="looking">Looking for full-time roles starting in 2027.</p>
    </section>
  </div>
</div>

<style>
  .home {
    padding-top: 1.5rem;
  }

  .hero {
    max-width: 40rem;
    padding: 4.5rem 0 1.5rem;
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

  .featured {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 2.5rem;
    align-items: stretch;
  }

  .feat-copy {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
  }

  .feat-copy h2 {
    font-size: clamp(1.65rem, 2.8vw, 2.05rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.05;
    margin: 0;
  }

  .feat-text {
    margin: 1rem 0 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-1);
  }

  .feat-meta {
    margin: 0.85rem 0 0;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--text-4);
  }

  .feat-copy .cta-row {
    margin-top: auto;
    padding-top: 1.75rem;
  }

  .feat-shot {
    display: block;
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

    .featured {
      grid-template-columns: minmax(0, 1fr);
    }

    .featured {
      gap: 1.5rem;
    }

    .feat-copy {
      padding: 0;
    }
  }
</style>
