<script>
  import PhoneShot from '../lib/PhoneShot.svelte';

  const M = '/media/lavatasks';
</script>

<div class="page">
  <div class="wrap">
    <a href="/projects" class="mono back-link">← Projects</a>

    <header class="case-head">
      <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
        <span class="tech-label">Productivity</span>
        <span class="badge badge-green badge-dot" style="font-size:0.72rem;letter-spacing:0.06em;">TestFlight beta</span>
      </div>
      <h1>Lava Tasks</h1>
      <p class="lead" style="max-width:36rem;margin-top:1.1rem;">
        A calm task app for iPhone. Tasks, lists, habits and goals in one place.
      </p>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:1rem;">
        There are no ads and no points, and it doesn't need an account. Everything stays on the phone. It isn't on the App Store yet.
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
          <dd>TestFlight beta</dd>
        </div>
        <div>
          <dt>Data</dt>
          <dd>On the phone. No account.</dd>
        </div>
        <div>
          <dt>Scale</dt>
          <dd>~26,000 lines of TypeScript</dd>
        </div>
        <div>
          <dt>Server</dt>
          <dd>None. Updates come from Expo.</dd>
        </div>
      </dl>

      <div class="cta-row">
        <a href="https://lavatasks.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Product site →</a>
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
      <h2>One quiet line per task</h2>
      <p>
        Type "Call the vet tomorrow 9am" and it reads the day and the time. Groceries sort themselves into aisles and can be read by store. Habits fill a grid you can watch build. Goals say, in words, whether you're ahead or behind.
      </p>
      <p>
        It was made for two people sharing a list. Sharing isn't built yet, so the beta is the one-person version.
      </p>
    </section>

    <section id="screens">
      <span class="tech-label">02 · Screens</span>
      <h2>What it looks like</h2>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:0.6rem;">
        The current build, in a browser, on sample data. The browser draws Inter. The phone uses its own type.
      </p>

      <div class="phone-grid">
        <PhoneShot
          src="{M}/tasks.webp"
          alt="Lava Tasks: today's page, with one overdue task and three due today"
          label="Today"
          caption="Overdue sits on top, with a Postpone button."
        />
        <PhoneShot
          src="{M}/add.webp"
          alt="Lava Tasks quick add: the words 'tomorrow 9am' highlighted in orange"
          label="Quick add"
          caption="The words it understood turn orange. Here, &quot;tomorrow 9am&quot;."
        />
        <PhoneShot
          src="{M}/lists.webp"
          alt="Lava Tasks lists: groceries, a trip and home projects, each in its own color"
          label="Lists"
          caption="Each list gets its own color."
        />
        <PhoneShot
          src="{M}/groceries.webp"
          alt="Lava Tasks grocery list, sorted by aisle"
          label="Groceries"
          caption="Sorted by aisle. The filters above are for stores."
        />
        <PhoneShot
          src="{M}/habits.webp"
          alt="Lava Tasks habits: one grid per habit"
          label="Habits"
          caption="One grid per habit. The rows under it are earlier weeks."
        />
        <PhoneShot
          src="{M}/goals.webp"
          alt="Lava Tasks goals: each marked behind, on track or ahead"
          label="Goals"
          caption="Each goal says whether it's ahead, on track or behind."
        />
      </div>
    </section>

    <section class="prose" id="engineering">
      <span class="tech-label">03 · Notes</span>
      <h2>A few things that mattered</h2>

      <h3>Quick add only takes words it's sure of</h3>
      <p>
        The parser pulls out a day, a time, "every Tuesday" and a few others, and leaves the rest as the title. It shows what it understood, and each piece can be tapped to say no. A wrong guess costs one tap, which is better than a mangled title.
      </p>

      <h3>Groceries file themselves</h3>
      <p>
        Type "oat milk" and it lands under Dairy. Type "peanut butter" and it lands under Pantry. Whole phrases are checked before single words, because "butter" alone gets one of those wrong. Aisles are in the order you'd walk the store.
      </p>

      <h3>An update froze the app</h3>
      <p>
        Twice, just after I sent an update, the app froze. It restarted the moment a download finished, even with the add box open, and the old box stayed over the new app, invisible, and took every touch. Now it only restarts on its own in the first 2.5 seconds, with nothing open. Otherwise it waits until the app is put away. I never reproduced it, so the fix is the cause that fits both reports.
      </p>
    </section>

    <div class="foot-nav">
      <a href="/projects" class="btn">← All projects</a>
      <div style="display:flex;gap:0.7rem;flex-wrap:wrap;">
        <a href="/projects/lavamoney" class="btn">Lava Money →</a>
        <a href="https://lavatasks.com" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Product site →</a>
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
