<script>
  import PhoneShot from '../lib/PhoneShot.svelte';

  const M = '/media/lavamoney';
</script>

<div class="page">
  <div class="wrap">
    <a href="/projects" class="mono back-link">← Projects</a>

    <header class="case-head">
      <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
        <span class="tech-label">Personal finance</span>
        <span class="badge badge-green badge-dot" style="font-size:0.72rem;letter-spacing:0.06em;">In App Review</span>
      </div>
      <h1>Lava Money</h1>
      <p class="lead" style="max-width:36rem;margin-top:1.1rem;">
        A spending tracker for iPhone. It compares what you spend with what you usually spend.
      </p>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:1rem;">
        Most money apps start with a budget you have to make up. This one starts with your own past weeks. I built the app, the charts and the small server behind it.
      </p>

      <dl class="spec">
        <div>
          <dt>Role</dt>
          <dd>Sole engineer and designer</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>Expo, React Native, TypeScript</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>Submitted · waiting on App Store review</dd>
        </div>
        <div>
          <dt>Data</dt>
          <dd>On the phone. Plaid if you link a bank.</dd>
        </div>
        <div>
          <dt>Scale</dt>
          <dd>~60,000 lines of TypeScript</dd>
        </div>
        <div>
          <dt>Server</dt>
          <dd>Next.js, Prisma, Postgres, Vercel</dd>
        </div>
      </dl>

      <div class="cta-row">
        <a href="https://lavamoney.io" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Product site →</a>
        <a href="#screens" class="btn">Screens</a>
      </div>
    </header>

    <div class="case-shell">
      <nav class="toc no-print" aria-label="Case study">
        <a href="#idea">01 Idea</a>
        <a href="#screens">02 Screens</a>
        <a href="#engineering">03 Notes</a>
      </nav>
      <div>

    <section class="prose" id="idea">
      <span class="tech-label">01 · The idea</span>
      <h2>No budget to set up</h2>
      <p>
        Open the app and the first thing you see is this week against your other weeks. Tap a charge and it shows the other times you went to that place, with a dashed line for your usual. A charge can be $21 over. It can also be fine.
      </p>
      <p>
        You can still set budgets. The app proposes a limit for each category from your last six months, and shows how many of those months it would have held. A weekly review shows what moved. Rent, bills and subscriptions are found in your history and put on a calendar.
      </p>
      <p>
        You can link a bank through Plaid, add accounts by hand, import a CSV, or look around on sample data first. There is no Lava Money account.
      </p>
    </section>

    <section id="screens">
      <span class="tech-label">02 · Screens</span>
      <h2>What it looks like</h2>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:0.6rem;">
        These are from the app's web build, on a made-up household. None of the numbers are mine.
      </p>

      <div class="phone-grid">
        <PhoneShot
          src="{M}/spending.webp"
          alt="Lava Money spending screen: a week's total and six months of weekly bars"
          label="Spending"
          caption="Six months of weeks. The bright bar is the one picked."
        />
        <PhoneShot
          src="{M}/charge.webp"
          alt="Lava Money charge page: an Uber charge against its usual"
          label="A charge"
          caption="Uber, $53.46. The dots are the 27 other visits. The dashed line is the usual."
        />
        <PhoneShot
          src="{M}/budgets.webp"
          alt="Lava Money budgets: what is left in October, with the month so far drawn against the budget"
          label="Budgets"
          caption="$796 left in October, with the month so far drawn against the budget."
        />
        <PhoneShot
          src="{M}/coming-up.webp"
          alt="Lava Money Coming up: a calendar with a dot under each day something is due"
          label="Coming up"
          caption="Rent, bills and subscriptions on the days they're due. The app finds them in the charges."
        />
        <PhoneShot
          src="{M}/cash-flow.webp"
          alt="Lava Money cash flow: money in against money out, split into rent, spending and saved"
          label="Cash flow"
          caption="Money in against money out, split into rent, spending and saved."
        />
        <PhoneShot
          src="{M}/review.webp"
          alt="Lava Money weekly review: where the week's money went, by category"
          label="Weekly review"
          caption="One page of the weekly review. It can be shared as a picture, amounts optional."
        />
      </div>
    </section>

    <section class="prose" id="engineering">
      <span class="tech-label">03 · Notes</span>
      <h2>A few things that mattered</h2>

      <h3>Usual is a median</h3>
      <p>
        One $412 week shouldn't move your usual, so it's a median, not a mean. The range around it is meant to hold about 80% of ordinary weeks. With four to eleven weeks of history it comes from the median absolute deviation in log space, with multipliers I tuned by simulation. At twelve it reads the range straight from the data. With fewer than four there's no verdict.
      </p>

      <h3>The server never holds your transactions</h3>
      <p>
        Plaid's secret key can't live in an app, so there is a server. It passes your transactions to the phone and forgets them. It keeps an encrypted connection token, a random device ID, the bank's name and the state of the connection. There are no user accounts. The phone is the database.
      </p>

      <h3>A subscription is a tag, not a category</h3>
      <p>
        Disney+ is entertainment. It's also a subscription. When "Subscriptions" was a category, charges from one place ended up in two buckets, and a page could show a Bill tag, a Subscriptions chip and two links that disagreed. Now a charge keeps its category, and a repeating one is tagged a subscription or a bill. The app guesses. You can change it.
      </p>
    </section>

    <div class="foot-nav">
      <a href="/projects" class="btn">← All projects</a>
      <div style="display:flex;gap:0.7rem;flex-wrap:wrap;">
        <a href="/projects/lavatasks" class="btn">Lava Tasks →</a>
        <a href="https://lavamoney.io" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Product site →</a>
      </div>
    </div>

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
    color: var(--text-1);
  }

  .case-head {
    max-width: 900px;
  }

  .cta-row {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  section {
    padding: 3.75rem 0 0;
    scroll-margin-top: 5.5rem;
  }

  .phone-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3.25rem 2.25rem;
    margin-top: 2.25rem;
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
    section {
      padding-top: 2.75rem;
    }

    .phone-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2.5rem 1.25rem;
    }
  }
</style>
