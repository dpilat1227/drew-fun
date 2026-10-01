<script>
  import Figure from '../lib/Figure.svelte';

  const M = '/media/lavamesh';
</script>

<div class="page">
  <div class="wrap">
    <a href="/projects" class="mono back-link">← Projects</a>

    <header class="case-head">
      <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
        <span class="tech-label">Networking</span>
        <span class="badge badge-green badge-dot" style="font-size:0.72rem;letter-spacing:0.06em;">Active</span>
      </div>
      <h1>LavaMesh</h1>
      <p class="lead" style="max-width:36rem;margin-top:1.1rem;">
        A dashboard for a Headscale server. Nodes, keys, routes, ACLs.
      </p>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:1rem;">
        Headscale is the open-source Tailscale coordination server. It doesn't ship a real web UI, so I built one. I started it to learn networking. I still use it.
      </p>

      <div class="meta-grid">
        <table class="data-table">
          <tbody>
            <tr><td>Role</td><td>Sole engineer</td></tr>
            <tr><td>Status</td><td>Active · looking for beta users</td></tr>
            <tr><td>Scale</td><td>~12,700 lines of TypeScript</td></tr>
          </tbody>
        </table>
        <table class="data-table">
          <tbody>
            <tr><td>Stack</td><td>Next.js, React, TypeScript</td></tr>
            <tr><td>Data</td><td>Postgres, Prisma, Redis, Headscale API</td></tr>
            <tr><td>Infra</td><td>Vercel, Fly.io</td></tr>
          </tbody>
        </table>
      </div>

      <div class="cta-row">
        <a href="https://github.com/dpilat1227/lavamesh" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Source on GitHub →</a>
        <a href="https://lavamesh.com" target="_blank" rel="noopener noreferrer" class="btn">Product site</a>
        <a href="#walkthrough" class="btn">Walkthrough</a>
      </div>
    </header>

    <section id="walkthrough" class="lead-walk">
      <span class="tech-label">01 · Walkthrough</span>
      <h2>A minute on a running instance</h2>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:0.6rem;">
        Tag a node, approve a route, mint a key. The audit log at the end is those three things. The fleet in the video is demo data. The dashboard code is the real one.
      </p>

      <figure style="margin-top:1.75rem;">
        <div class="video-frame">
          <video controls preload="metadata" poster="{M}/walkthrough-poster.webp" playsinline>
            <source src="{M}/walkthrough.webm" type="video/webm" />
            <source src="{M}/walkthrough.mp4" type="video/mp4" />
            Your browser can't play embedded video. The MP4 is
            <a href="{M}/walkthrough.mp4">here</a>.
          </video>
        </div>
      </figure>
    </section>

    <div class="case-shell">
      <nav class="toc no-print" aria-label="Case study">
        <a href="#walkthrough">01 Walkthrough</a>
        <a href="#site">02 Site</a>
        <a href="#problem">03 Problem</a>
        <a href="#interface">04 Interface</a>
        <a href="#engineering">05 Notes</a>
      </nav>
      <div>

    <section id="site">
      <span class="tech-label">02 · Site</span>
      <h2>lavamesh.com</h2>
      <p style="max-width:40rem;color:var(--text-3);font-size:0.95rem;line-height:1.65;margin-top:0.6rem;">
        Landing page, plus a comparison against Tailscale and against Headscale with a community UI.
      </p>
      <div class="figure-grid" style="margin-top:1.5rem;">
        <Figure src="{M}/landing-hero.webp" alt="LavaMesh landing page" label="Landing" caption="The homepage." chrome={false} />
        <Figure src="{M}/landing-compare.png" alt="Comparison of LavaMesh, Tailscale, and Headscale plus a community UI" label="Comparison" caption="Tailscale, Headscale with a free UI, and LavaMesh." chrome={false} />
      </div>
    </section>

    <section class="prose" id="problem">
      <span class="tech-label">03 · The problem</span>
      <h2>Headscale has no console</h2>
      <p>
        Adding a machine, approving a route, or rotating a key is SSH and a CLI. Fine for two nodes. Annoying at twenty. If a node drops, you notice when you go look.
      </p>
      <p>
        LavaMesh talks to Headscale's API. It also runs a few jobs so you hear about a dead node without logging in.
      </p>
    </section>

    <section id="interface">
      <span class="tech-label">04 · Interface</span>
      <h2>What it does</h2>

      <div class="figures">
        <Figure
          src="{M}/dashboard.webp"
          alt="LavaMesh node fleet"
          label="Node fleet"
          caption="Every machine on the server, and whether it's online."
        />

        <Figure
          src="{M}/dashboard-node-inspector.webp"
          alt="Node inspector"
          label="Node inspector"
          caption="Rename, expire, or revoke. Those are different actions, so they aren't one button."
        />

        <Figure
          src="{M}/dashboard-add-node.webp"
          alt="Add node modal"
          label="Provisioning"
          caption="An install token and a curl command. Headscale's own flow is mint a key, SSH in, and run the client by hand."
        />

        <Figure
          src="{M}/routes.webp"
          alt="Subnet routing page"
          label="Routes"
          caption="Routes need approval before traffic flows. Exit nodes are separate. Approving 0.0.0.0/0 sends all of a client's traffic through that machine."
        />

        <Figure
          src="{M}/keys.webp"
          alt="Pre-auth keys"
          label="Keys"
          caption="Pre-auth keys across users. Ephemeral keys delete the node when it disconnects. Good for CI, bad for a laptop."
        />

        <Figure
          src="{M}/settings.webp"
          alt="Network settings"
          label="Settings"
          caption="If Headscale can't be reached, the value stays blank and the page names the call that failed. It does not show Off."
        />

        <Figure
          src="{M}/settings-acl-policy.webp"
          alt="ACL policy editor"
          label="ACLs"
          caption="The policy is HuJSON, comments and all. The editor saves it as-is. The comments are usually why a rule exists."
        />

        <Figure
          src="{M}/audit.webp"
          alt="Audit log"
          label="Audit log"
          caption="Every change goes into a Redis list. Searchable, exportable as CSV."
        />
      </div>

      <div class="figure-grid" style="margin-top:2rem;">
        <Figure
          src="{M}/command-palette.webp"
          alt="Command palette"
          label="Command palette"
          caption="⌘K."
        />
        <Figure
          src="{M}/users.webp"
          alt="Users page"
          label="Users"
          caption="Headscale users, and the devices each one owns."
        />
      </div>

      <div class="mobile-row">
        <div>
          <span class="tech-label">Phone</span>
          <h3>It works on a phone</h3>
          <p>
            Approving a route or revoking a key is the thing you end up doing from your phone. The table stacks. The sidebar becomes a drawer.
          </p>
        </div>
        <div class="phones">
          <div class="phone"><img src="{M}/mobile-dashboard.webp" alt="LavaMesh dashboard on a phone" loading="lazy" /></div>
          <div class="phone"><img src="{M}/mobile-landing.webp" alt="LavaMesh site on a phone" loading="lazy" /></div>
        </div>
      </div>
    </section>

    <section class="prose" id="engineering">
      <span class="tech-label">05 · Notes</span>
      <h2>A few things that mattered</h2>

      <h3>Headscale renamed an endpoint</h3>
      <p>
        In 0.23, <code>/api/v1/machine</code> became <code>/api/v1/node</code>. People still run 0.22. The fetch wrapper tries the path you asked for and, on a 404, tries the other one. One build covers both.
      </p>

      <h3>A failed call is not "Off"</h3>
      <p>
        The settings page hits several Headscale endpoints. If DNS fails and you substitute a default, the page says MagicDNS is off. That might be wrong. Failures stay blank, and a banner names which calls didn't answer.
      </p>

      <h3>Alerts that don't repeat</h3>
      <p>
        Cron checks for offline nodes and expiring keys. Redis remembers what already fired, so the same dead node doesn't email you every five minutes.
      </p>
    </section>

    <div class="foot-nav">
      <a href="/projects" class="btn">← All projects</a>
      <div style="display:flex;gap:0.7rem;flex-wrap:wrap;">
        <a href="https://lavamesh.com" target="_blank" rel="noopener noreferrer" class="btn">Product site</a>
        <a href="https://github.com/dpilat1227/lavamesh" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Source →</a>
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

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 3rem;
    margin-top: 2.5rem;
  }

  .cta-row {
    display: flex;
    gap: 0.7rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .lead-walk {
    max-width: 900px;
  }

  section {
    padding: 3.75rem 0 0;
    scroll-margin-top: 5.5rem;
  }

  #walkthrough {
    scroll-margin-top: 5.5rem;
  }

  .figures {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    margin-top: 2.25rem;
  }

  .mobile-row {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 3rem;
    align-items: center;
    margin-top: 4.5rem;
  }

  .mobile-row h3 {
    font-size: 1.6rem;
    margin-top: 0.45rem;
  }

  .mobile-row p {
    max-width: 34ch;
    color: var(--text-3);
    font-size: 0.95rem;
    line-height: 1.65;
    margin-top: 0.75rem;
  }

  .phones {
    display: flex;
    gap: 1.75rem;
    justify-content: center;
    align-items: flex-end;
    background: #f3f3f1;
    padding: 2.75rem 2rem 0;
  }

  .phone {
    flex: 1;
    max-width: 230px;
    background: #1d1d1f;
    border-radius: 32px 32px 0 0;
    padding: 12px 10px 0;
    box-shadow: 0 30px 50px rgba(17, 17, 16, 0.16);
  }

  .phone img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 22px 22px 0 0;
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
    .mobile-row {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .phones {
      padding: 2rem 1.25rem 0;
      gap: 1rem;
    }

    .phone {
      max-width: 180px;
    }

    section {
      padding-top: 2.75rem;
    }

    .figures {
      gap: 2.5rem;
    }
  }
</style>
