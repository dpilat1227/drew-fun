<script>
  import Figure from "../lib/Figure.svelte";
</script>

<div class="page">
  <div class="wrap">
    <a href="/projects" class="mono back-link">← Projects</a>

    <header class="case-head">
      <span class="tech-label">Mental health · Digital health · VC-backed</span>
      <h1>Wellnest</h1>
      <p class="lead" style="max-width:58ch;margin-top:1.1rem;">
        A student mental-health app I co-founded and ran as COO from 2019 to
        2022. We raised $800k pre-seed, signed university partnerships, and
        shipped a consumer app that held a 5.0 App Store rating. We wound it
        down in 2022.
      </p>

      <div class="meta-grid">
        <table class="data-table">
          <tbody>
            <tr><td>Role</td><td>Co-founder &amp; COO</td></tr>
            <tr><td>Years</td><td>2019 — 2022</td></tr>
            <tr><td>Outcome</td><td>Wound down</td></tr>
          </tbody>
        </table>
        <table class="data-table">
          <tbody>
            <tr
              ><td>What I did</td><td
                >Fundraising, partnerships, product, operations</td
              ></tr
            >
            <tr><td>What I didn't</td><td>Write the production codebase</td></tr
            >
            <tr><td>Raised</td><td>$800,000 pre-seed</td></tr>
          </tbody>
        </table>
      </div>
    </header>

    <hr class="rule" />

    <section>
      <span class="tech-label">01 // Product</span>
      <h2>What it was</h2>
      <p style="max-width:58ch;color:var(--text-3);">
        Daily journaling and mood check-ins, with a game-design loop meant to
        shorten the time it took a student to get value out of a mindfulness
        routine. Partnerships with UPenn and Boston University were the
        distribution, not the App Store.
      </p>

      <div class="phone-row">
        <Figure
          src="/media/wellnest/app-home.webp"
          alt="Wellnest home screen: daily conversation card, quick note and mood check"
          label="Home"
          caption="The daily loop. This is a screenshot of the shipped app, not a mock."
          chrome={false}
        />
        <Figure
          src="/media/wellnest/promo.webp"
          alt="Wellnest promotional artwork"
          label="Brand"
          caption="Launch creative. The company is closed; this is here because it existed."
          chrome={false}
        />
      </div>
    </section>

    <section class="prose">
      <span class="tech-label">02 // Honest line</span>
      <h2>This is not my engineering proof</h2>
      <p>
        I ran the company. I did not write the production code. Listing Wellnest
        as a software project would be the same mistake as listing a draft essay
        as a published one. It's on this site because I spent three years on it
        and a hiring manager will Google it anyway.
      </p>
      <p>
        The engineering write-ups are
        <a href="/projects/lavamesh">LavaMesh</a> and
        <a href="/projects/lavamoney">LavaMoney</a>.
      </p>
    </section>

    <div class="foot-nav">
      <a href="/projects" class="btn">← All projects</a>
      <div style="display:flex;gap:0.7rem;flex-wrap:wrap;">
        <a href="/projects/lavamoney" class="btn">LavaMoney →</a>
        <a href="/projects/lavamesh" class="btn btn-primary">LavaMesh →</a>
      </div>
    </div>
  </div>
</div>

<style>
  .back-link {
    display: inline-block;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-4);
    border-bottom: none;
    margin-bottom: 2rem;
  }

  .back-link:hover {
    color: var(--accent);
  }

  .case-head {
    max-width: 900px;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 3rem;
    margin-top: 2.5rem;
  }

  section {
    padding: 3.75rem 0 0;
  }

  .phone-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 280px));
    gap: 2rem;
    margin-top: 2rem;
    justify-content: start;
  }

  .foot-nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 4.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-1);
  }

  @media (max-width: 860px) {
    .meta-grid,
    .phone-row {
      grid-template-columns: 1fr;
    }

    section {
      padding-top: 2.75rem;
    }
  }
</style>
