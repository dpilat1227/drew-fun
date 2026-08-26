<script>
  import Figure from '../lib/Figure.svelte';

  const M = '/media/lavamesh';
</script>

<div class="page">
  <div class="wrap">
    <a href="/projects" class="mono back-link">← Projects</a>

    <header class="case-head">
      <span class="tech-label">Control plane · networking</span>
      <h1>LavaMesh</h1>
      <p class="lead" style="max-width:22ch;margin-top:1.1rem;">
        Headscale, with a console. And the jobs that watch it when nobody is looking.
      </p>
      <p style="max-width:58ch;color:var(--text-3);margin-top:1.1rem;">
        A management dashboard for <a href="https://headscale.net" target="_blank" rel="noopener noreferrer">Headscale</a>,
        the open-source implementation of Tailscale's coordination server. Node fleet, users,
        pre-auth keys, subnet routing, access-control policy, audit logging and alerting.
        Sole engineer.
      </p>

      <div class="meta-grid">
        <table class="data-table">
          <tbody>
            <tr><td>Role</td><td>Sole engineer and designer</td></tr>
            <tr><td>Built</td><td>August 2026</td></tr>
            <tr><td>Scale</td><td>~12,700 lines of TypeScript · 79 components · 23 API routes</td></tr>
          </tbody>
        </table>
        <table class="data-table">
          <tbody>
            <tr><td>Stack</td><td>Next.js 16, React 19, TypeScript, Tailwind 4</td></tr>
            <tr><td>Data</td><td>Postgres + Prisma 7, Redis, Headscale REST API</td></tr>
            <tr><td>Infra</td><td>Vercel, Fly.io Machines API, Stripe, Resend</td></tr>
          </tbody>
        </table>
      </div>

      <div class="cta-row">
        <a href="https://github.com/dpilat1227/lavamesh" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Source on GitHub →</a>
        <a href="https://lavamesh.com" target="_blank" rel="noopener noreferrer" class="btn">Product site</a>
        <a href="#walkthrough" class="btn">Watch the walkthrough</a>
      </div>
    </header>

    <div class="case-shell">
      <nav class="toc no-print" aria-label="Case study">
        <a href="#problem">01 Problem</a>
        <a href="#walkthrough">02 Walkthrough</a>
        <a href="#interface">03 Interface</a>
        <a href="#engineering">04 Engineering</a>
        <a href="#status">05 Status</a>
        <a href="#retrospective">06 Retrospective</a>
      </nav>
      <div>

    <hr class="rule" />

    <!-- ── Problem ──────────────────────────────────────────────────────── -->
    <section class="prose" id="problem">
      <span class="tech-label">01 · The problem</span>
      <h2>A control server with no console</h2>
      <p>
        Tailscale builds a mesh VPN on WireGuard. The clients are excellent and the
        coordination server — the component that decides which machines exist and who may
        talk to whom — is proprietary, hosted in the US, and billed per seat. Headscale
        reimplements that coordination server as open source, so you can point the official
        Tailscale clients at infrastructure you own.
      </p>
      <p>
        What Headscale deliberately does not ship is an interface. Registering a machine,
        approving a subnet route, or rotating a key all happen through
        <code>headscale</code> subcommands over SSH. That's fine for one server and tedious
        across a dozen, and it means anything you'd want to notice — a node that dropped
        three days ago, a pre-auth key expiring tomorrow — is something you have to remember
        to go and look for.
      </p>
      <p>
        LavaMesh is the console: a web UI over Headscale's REST API, plus the scheduled jobs
        that watch for the things a dashboard can't tell you unless someone is looking at it.
      </p>
    </section>

    <!-- ── Walkthrough ──────────────────────────────────────────────────── -->
    <section id="walkthrough">
      <span class="tech-label">02 · Walkthrough</span>
      <h2>Seventy seconds of the real thing</h2>
      <p style="max-width:58ch;color:var(--text-3);">
        Recorded against a running instance. Every action changes real state: the node is
        tagged, a pending subnet route is approved, a pre-auth key is minted, and the audit
        log at the end contains exactly those events.
      </p>

      <figure style="margin-top:1.75rem;">
        <div class="video-frame">
          <video controls preload="metadata" poster="{M}/walkthrough-poster.webp" playsinline>
            <source src="{M}/walkthrough.webm" type="video/webm" />
            <source src="{M}/walkthrough.mp4" type="video/mp4" />
            Your browser can't play embedded video — the MP4 is
            <a href="{M}/walkthrough.mp4">here</a>.
          </video>
        </div>
        <figcaption>
          <b>Note</b> — the fleet shown is a demo dataset served by a stand-in control server, so
          the screenshots have something to manage. The dashboard code is unmodified.
        </figcaption>
      </figure>
    </section>

    <!-- ── Interface ────────────────────────────────────────────────────── -->
    <section id="interface">
      <span class="tech-label">03 · Interface</span>
      <h2>What it does</h2>

      <div class="figures">
        <Figure
          src="{M}/dashboard.webp"
          alt="LavaMesh node fleet: 9 of 12 nodes online, table of nodes with mesh IPs and status"
          label="Node fleet"
          caption="Every machine registered with the control server, with online state derived from Headscale's last-seen timestamps. The right rail surfaces what needs attention — expired keys, nodes that have gone quiet — so the operator doesn't have to scan the table for it."
        />

        <Figure
          src="{M}/dashboard-node-inspector.webp"
          alt="Node inspector panel showing addresses, owner, tags and destructive actions"
          label="Node inspector"
          caption="Rename, expire (force reauthentication without deleting the registration), or revoke a node. Expiry and revocation are different operations with very different consequences, so they're presented as such rather than as one 'remove' button."
        />

        <Figure
          src="{M}/dashboard-add-node.webp"
          alt="Add Node to Mesh modal with user assignment, token expiry and ephemeral toggle"
          label="Provisioning"
          caption="A one-time install token, scoped to a user, with an expiry and an ephemeral flag. The output is a curl command. Headscale's native flow is mint a pre-auth key, SSH to the machine, and run the Tailscale client against your coordination server by hand."
        />

        <Figure
          src="{M}/routes.webp"
          alt="Subnet routing page with exit nodes and subnet routes, some approved and some pending"
          label="Subnet routing"
          caption="Nodes advertise routes; an administrator has to approve them before traffic flows. Exit nodes are separated from subnet routes because approving 0.0.0.0/0 sends all of a client's traffic through that machine, which is not the same decision as sharing one LAN."
        />

        <Figure
          src="{M}/keys.webp"
          alt="Pre-auth keys table with reusable, ephemeral, status and expiry columns"
          label="Pre-auth keys"
          caption="Keys aggregated across every user, since Headscale's API only lists them one user at a time. Reusable and ephemeral are shown explicitly — an ephemeral key produces nodes that delete themselves when they disconnect, which is the right default for CI runners and the wrong one for a laptop."
        />

        <Figure
          src="{M}/settings.webp"
          alt="Settings page showing exit node status, MagicDNS, ACL policy and team count"
          label="Network settings"
          caption="Exit node, MagicDNS, and ACL status as independent cards. If Headscale is unreachable, those values render as an em-dash with a banner naming the failed calls — not as 'Off', which would be a lie."
        />

        <Figure
          src="{M}/settings-acl-policy.webp"
          alt="Access control policy editor containing HuJSON policy document"
          label="Access control"
          caption="Headscale's policy is a HuJSON document — JSON with comments and trailing commas. The editor reads and writes it directly rather than abstracting it away, because the comments are usually the only documentation of why a rule exists."
        />

        <Figure
          src="{M}/audit.webp"
          alt="Audit log listing key generation, key expiry, user creation and deletion events"
          label="Audit log"
          caption="Every mutation the dashboard performs is appended to a capped Redis list, searchable and exportable as CSV. Finding that this had never displayed a single event is described further down."
        />
      </div>

      <div class="figure-grid" style="margin-top:2rem;">
        <Figure
          src="{M}/command-palette.webp"
          alt="Command palette overlay for jumping between pages"
          label="Command palette"
          caption="⌘K navigation."
        />
        <Figure
          src="{M}/users.webp"
          alt="Users page listing Headscale users and their device counts"
          label="Users"
          caption="Headscale namespaces, with the devices each one owns."
        />
      </div>

      <div class="mobile-row">
        <div>
          <span class="tech-label">Responsive</span>
          <h3>It works on a phone</h3>
          <p style="font-size:0.95rem;color:var(--text-3);">
            Approving a route or revoking a key is exactly the sort of thing you end up doing
            from a phone, so the fleet table collapses to a stacked layout and the sidebar
            becomes a drawer rather than being hidden.
          </p>
        </div>
        <div class="phones">
          <div class="figure phone"><img src="{M}/mobile-dashboard.webp" alt="LavaMesh dashboard on a phone" loading="lazy" /></div>
          <div class="figure phone"><img src="{M}/mobile-landing.webp" alt="LavaMesh marketing page on a phone" loading="lazy" /></div>
        </div>
      </div>
    </section>

    <!-- ── Engineering ──────────────────────────────────────────────────── -->
    <section class="prose" id="engineering">
      <span class="tech-label">04 · Engineering</span>
      <h2>The parts worth talking about</h2>

      <h3>Surviving Headscale's API drift</h3>
      <p>
        Headscale renamed <code>/api/v1/machine</code> to <code>/api/v1/node</code> in 0.23
        and people run everything from 0.22 upward. Rather than pinning a version, the fetch
        wrapper attempts the requested endpoint and, on a 404 for a machine-family path,
        retries once against the aliased path — then normalises the response so both
        <code>machines</code> and <code>nodes</code> are populated regardless of which
        generation answered. One build works across the range, and the compatibility shim
        lives in one function instead of leaking into every caller.
      </p>

      <h3>Degrading without lying</h3>
      <p>
        This is the piece I'd defend hardest. The settings page fans out to eight independent
        sources with <code>Promise.allSettled</code>. The tempting implementation substitutes
        a default for anything that fails — but a failed DNS call then renders as
        “MagicDNS: Off”, which is a confident false statement about someone's network
        configuration. So failures are collected by name: the stat shows an em-dash instead of
        a value, and a banner says exactly which calls couldn't be reached.
      </p>
      <div class="callout">
        <span class="tech-label">The principle</span>
        <p>
          An empty state and a broken state look identical unless you go out of your way to
          distinguish them. A dashboard that can't tell the difference will eventually tell
          someone their exit node is off when it's actually unreachable.
        </p>
      </div>

      <h3>Tenant-aware data access</h3>
      <p>
        The hosted tier gives each tenant its own Headscale instance on Fly.io, so the fetch
        wrapper resolves the caller's tenant and routes to that instance's URL and key. The
        guard matters more than the routing: only a record that is <code>active</code>
        <em>and</em> has both a URL and an API key wins. Without that, a half-provisioned row
        with an empty key would shadow the environment configuration and take down the
        dashboard for a self-hosted user who never asked for the hosted tier.
      </p>

      <h3>Scheduled monitoring</h3>
      <p>
        Six cron jobs cover the things nobody is watching: offline-node detection and subnet
        route failover every five minutes, uptime sampling every fifteen, key expiry every six
        hours, config snapshots nightly. Each keeps dedupe state in Redis, because an alert
        that fires every five minutes for the same offline node is indistinguishable from
        having no alerting at all.
      </p>

      <h3>Auth at the edge</h3>
      <p>
        Next 16 renamed the middleware convention from <code>middleware.ts</code> to
        <code>proxy.ts</code>, and that file redirects unauthenticated requests before any
        page renders. The interesting part is the matcher: it has to exclude Next's generated
        metadata routes, which are served without file extensions, or signed-out visitors get
        redirected to the login page when the browser requests the favicon.
      </p>

      <h3>A bug I found while writing this page</h3>
      <p>
        Capturing screenshots for this write-up, the audit log came back empty. Redis
        contained fourteen correctly-formed events. The list helper was calling
        <code>JSON.parse</code> on each entry, and both callers — the audit log and the config
        backups — parsed the result again. The second parse coerced an object to
        <code>"[object Object]"</code>, threw, and every event was silently dropped by the
        <code>.filter(Boolean)</code> that was meant to skip malformed rows.
      </p>
      <p>
        So the headline paid feature had never displayed a single event, and config backups
        could never be listed or restored. It's a one-line fix in the helper. It survived
        because there are no tests, and because the failure mode was an empty state that looks
        exactly like a new installation.
      </p>
    </section>

    <!-- ── Honest status ────────────────────────────────────────────────── -->
    <section class="prose" id="status">
      <span class="tech-label">05 · Status</span>
      <h2>What's real, and what isn't</h2>
      <p>
        Portfolio pages tend to imply everything works. Here is the actual line.
      </p>

      <div class="status-block">
        <span class="badge badge-green badge-dot">Working</span>
        <p>
          Node, user, pre-auth key, subnet route, ACL policy and DNS management against a live
          Headscale API. Password and magic-link authentication. Audit logging, webhook and
          email alerting, config snapshots, CSV export, developer API keys, ⌘K navigation,
          responsive layouts.
        </p>
      </div>

      <div class="status-block">
        <span class="badge badge-amber">Scaffolded</span>
        <p>
          Per-tenant Headscale provisioning on Fly.io. The provisioning path and Stripe
          webhook exist and the state machine is modelled, but it isn't production-ready and
          the hosted checkout is disabled behind a flag. The public API proxy also still
          routes to the global credentials rather than per-tenant ones.
        </p>
      </div>

      <div class="status-block">
        <span class="badge">Not built</span>
        <p>
          Cryptographic licence validation. The paid tier is unlocked by the presence of any
          sufficiently long string, which is a placeholder and not a paywall. There are also
          no automated tests anywhere in the codebase — which is how the audit log bug above
          lived undetected in the feature I charged for.
        </p>
      </div>
    </section>

    <!-- ── The mistake ──────────────────────────────────────────────────── -->
    <section class="prose" id="retrospective">
      <span class="tech-label">06 · Retrospective</span>
      <h2>I built it before I checked whether it was needed</h2>
      <p>
        I put a pricing page with live payment links on this before talking to a single
        potential customer. Then I did the competitive research I should have done in week
        one.
      </p>
      <p>
        <a href="https://github.com/tale/headplane" target="_blank" rel="noopener noreferrer">Headplane</a>
        is MIT-licensed, actively maintained, and more capable than the tier I was charging
        for. It has OIDC single sign-on, browser-based SSH into nodes, and native management
        of Headscale's ACL tags. There are roughly ten other free Headscale UIs behind it. The
        market I had priced into was already served, for nothing, by better software.
      </p>
      <p>
        The detail that stung was the feature I was proudest of. My visual ACL builder
        resolved dashboard labels into literal IPv4 addresses and inlined them into the
        policy, which drifts silently the moment a node's address changes. Headplane uses
        Headscale's native <code>tag:</code> primitives and gets it right. I had built a worse
        version of a free feature and put it behind a paywall.
      </p>
      <p>
        The audience was wrong too, in a way that's obvious in hindsight. Somebody
        self-hosting a coordination server has already chosen to run their own
        infrastructure specifically to avoid a per-seat bill. Selling them a subscription to
        administer their subscription-avoidance tool inverts the reason they showed up.
      </p>

      <div class="callout">
        <span class="tech-label">What I'd do differently</span>
        <p>
          Search for the free version first — an afternoon of reading would have saved three
          weeks. Talk to fifteen people in the target segment before writing product code, and
          write down what result would make me stop <em>before</em> seeing any of it. Ask
          “who already solved this?” before “what should this cost?”
        </p>
      </div>

      <p>
        What I'd keep is the engineering and, oddly, the honesty. The degraded banners, the
        example data labelled as example data, the code comments that admit what a function
        can't guarantee — those were the instincts worth having, and they're why finding the
        audit log bug was a matter of reading rather than archaeology.
      </p>
      <p>
        The dashboard is free. I am not going to spend more money finding a buyer for a
        problem that already has a free, better solution. The work stands as engineering,
        which is the honest use of it.
      </p>
    </section>

    <hr class="rule" />

    <section>
      <span class="tech-label">Appendix // marketing site</span>
      <h2 style="font-size:1.35rem;">The product site</h2>
      <p style="max-width:56ch;color:var(--text-3);">
        Built alongside the app: landing page, comparison table, pricing, blog and SEO
        surface. Also where the pricing mistake above is most visible.
      </p>
      <div class="figure-grid" style="margin-top:1.5rem;">
        <Figure src="{M}/landing-hero.webp" alt="LavaMesh marketing landing page hero" label="Landing" caption="Hero and product preview." />
        <Figure src="{M}/landing-pricing.webp" alt="LavaMesh pricing section with Community, Pro and Cloud tiers" label="Pricing" caption="$149 lifetime for Pro, $39/month for a hosted tier still marked coming soon. Both numbers were set before any customer conversation." />
      </div>
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

  #walkthrough {
    scroll-margin-top: 5.5rem;
  }

  .figures {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 2rem;
  }

  .mobile-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    margin-top: 3.5rem;
  }

  .phones {
    display: flex;
    gap: 1.25rem;
  }

  .phone {
    flex: 1;
    max-width: 220px;
  }

  .phone img {
    display: block;
    width: 100%;
    height: auto;
  }

  .status-block {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 1.25rem;
    align-items: start;
    padding: 1.15rem 0;
    border-top: 1px solid var(--border-1);
  }

  .status-block:last-of-type {
    border-bottom: 1px solid var(--border-1);
  }

  .status-block p {
    font-size: 0.95rem;
    color: var(--text-3);
    margin: 0;
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
      gap: 0;
    }

    .mobile-row {
      gap: 1.75rem;
    }

    .status-block {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }

    section {
      padding-top: 2.75rem;
    }

    .figures {
      gap: 2.25rem;
    }
  }
</style>
