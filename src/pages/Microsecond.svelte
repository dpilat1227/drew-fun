<script>
  import { onMount } from "svelte";
  import TimeScrubber from "../lib/microsecond/TimeScrubber.svelte";
  import OrderBookLadder from "../lib/microsecond/OrderBookLadder.svelte";
  import Rule606Flow from "../lib/microsecond/Rule606Flow.svelte";
  import HftGeographyMap from "../lib/microsecond/HftGeographyMap.svelte";
  import SpeedBumpRace from "../lib/microsecond/SpeedBumpRace.svelte";
  import SpreadWaterfall from "../lib/microsecond/SpreadWaterfall.svelte";

  // ── Scrollytelling Step State ──────────────────────────────────────────────
  let activeStep = $state(0);
  let isMobile = $state(false);

  // Beat 1 interactive state
  let orderSubmitted = $state(false);
  let orderSubmitting = $state(false);
  let scrubberValue = $state(0);

  // Beat 2/3/4/6 component-local bound state, lifted here so the stage readout
  // strip can react to it.
  let broker = $state("robinhood");
  let bookFilled = $state(false);
  let rainFade = $state(false);
  let speedBumpOn = $state(true);

  // Beat 5 (lit exchange / toxic order) local animation phase
  let litPhase = $state(0); // 0 = order sent, 1 = first clip fills, 2 = HFT detects, 3 = price jumps

  function submitOrder() {
    if (orderSubmitting) return;
    orderSubmitted = false;
    orderSubmitting = true;
    setTimeout(() => {
      orderSubmitting = false;
      orderSubmitted = true;
    }, 650);
  }

  function advanceLitPhase() {
    litPhase = (litPhase + 1) % 4;
  }

  // ── Narrative Beats ─────────────────────────────────────────────────────────
  const narrativeSteps = [
    {
      act: "T + 0 MS",
      title: "Free isn't free",
      subtitle: "You tap Buy. No commission. Someone still got paid.",
      body: "You buy 10 shares of Apple. A spinner runs for about 40 milliseconds, then a green checkmark. No fee, no commission. But at least three companies handled your order in that time, and none of them did it for free.",
      takeaway: "Slow 40 milliseconds down a million times and it becomes a full day. Drag the slider. Plenty happens in that day.",
      sowhat: "If you aren't paying, the money is coming from somewhere else. This follows it.",
      stat: "40 MS TO YOU · 40,000,000 NS TO A MACHINE",
    },
    {
      act: "T + 5 MS · RULE 606",
      title: "Your order never reaches an exchange",
      subtitle: "Your broker sells it first.",
      body: "Your broker doesn't send the order to the NYSE or Nasdaq. A wholesaler like Citadel Securities or Virtu pays the broker a fraction of a cent a share for the right to fill it. That's payment for order flow, or PFOF. Brokers have to say where they send orders (SEC Rule 606). Almost nobody reads it.",
      takeaway: "Click through the three brokers. Where your order goes depends on who you trade with.",
      sowhat: "The commission didn't go away. It moved to the other side of the trade.",
      stat: "MOST RETAIL ORDERS ARE FILLED OFF-EXCHANGE",
    },
    {
      act: "T + 8 MS · NY4 SECAUCUS",
      title: "You do get a better price",
      subtitle: "Just not as much better as there is to get.",
      body: "The order lands in a data center in Secaucus, New Jersey. The best public prices are $194.99 to sell and $195.00 to buy. The wholesaler fills you at $194.998, a fifth of a cent better than the public price. That's real. It's called price improvement, and it's why brokers can say they beat the market. Press the button to route the order.",
      takeaway: "They can afford it because you're easy to fill. Ten shares from a retail account almost never means you know something the market doesn't.",
      sowhat: "You save about 2 cents. The wholesaler keeps most of the other 8 on the same trade.",
      stat: "$0.002 BETTER THAN THE PUBLIC ASK · $0.008 LEFT OVER PER SHARE",
    },
    {
      act: "T + 12–25 MS · THE CHICAGO RACE",
      title: "A race to a field in Illinois",
      subtitle: "Apple's price is partly set 700 miles away.",
      body: "To quote you a safe price, the wholesaler has to know what Apple is worth right now. Part of that comes from S&P 500 futures, which trade at the CME's data center in Aurora, Illinois. A move there has to reach New Jersey before anyone can act on it. Trading firms built microwave towers in a near-straight line across the Midwest to get there first. Fiber takes the long way: about 13 milliseconds round trip. Microwave takes about 8.",
      takeaway: "Rain weakens microwaves and the edge disappears. Flip the switch on the map.",
      sowhat: "The public price you're compared against is built by firms racing like this. One study found the profit window between futures and stocks shrank from about 97 ms in 2005 to about 7 ms in 2011 (Budish, Cramton & Shim).",
      stat: "ROUND TRIP: FIBER ~13 MS · MICROWAVE ~8 MS",
    },
    {
      act: "T + 26–35 MS · CARTERET, NJ",
      title: "When a big order shows up",
      subtitle: "A pension fund can't hide. Fast traders see it coming.",
      body: "A pension fund needs 500,000 shares. No wholesaler wants that much risk, so the order goes to a public exchange, in pieces. Fast traders watch for the first piece. When it prints, they cancel their old prices and post higher ones. A few microseconds later the next piece arrives and the price has already moved against the fund.",
      takeaway: "Nobody broke a rule. The fund lost a race it didn't know it was in. This is called latency arbitrage.",
      sowhat: "It makes honest public prices expensive to maintain, which is why someone eventually built a fix.",
      stat: "A FEW μS TO REACT · THE ASK REPRICES MID-FILL",
    },
    {
      act: "T + 36–39 MS · IEX",
      title: "The speed bump",
      subtitle: "A coil of fiber built to waste time.",
      body: "IEX is a stock exchange that delays every order by 350 microseconds, in and out. It does it with about 38 miles of fiber coiled in a box, nicknamed the Magic Shoebox. To a person, 350 microseconds is nothing. To a trading firm it's long enough that IEX can update its own prices before anyone can race them.",
      takeaway: "Everyone gets the same delay, so being fastest stops paying. The SEC approved IEX as an exchange in 2016. Toggle the bump and run the race.",
      sowhat: "It shows this is a design problem, not a law of nature. Most of the market still runs without one.",
      stat: "350 μS DELAY · SAME FOR EVERYONE",
    },
    {
      act: "T = 40 MS · EPILOGUE",
      title: "Who got paid",
      subtitle: "\"Bought 10 AAPL at $194.998.\" Ping.",
      body: "Your phone buzzes. You paid two cents less than the public price. Your broker got paid for sending the order. The wholesaler earned a spread on thousands of orders like yours. Nobody broke a rule.",
      takeaway: "The real argument is whether you'd have done even better on a public exchange, and whether pulling most small orders off those exchanges leaves public prices worse for everyone. Economists disagree.",
      sowhat: "In 2020 Robinhood paid $65 million to settle SEC charges that it misled customers about how it made money from routing their orders.",
      stat: "YOU +2¢ · BROKER +PFOF · WHOLESALER +SPREAD · PUBLIC BOOK −VOLUME",
    },
  ];

  // The coda is one more beat, with its own visualization.
  const TOTAL = narrativeSteps.length + 1;

  // ── Scrollytelling Intersection Observer Action ───────────────────────────
  /**
   * @param {HTMLElement} node
   * @param {number} stepIndex
   */
  function scrollyStep(node, stepIndex) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeStep = stepIndex;
          }
        });
      },
      { rootMargin: "-25% 0px -25% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function scrollToStep(stepIndex) {
    const cards = document.querySelectorAll(".step-card-wrapper");
    if (cards[stepIndex]) {
      cards[stepIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  onMount(() => {
    document.body.classList.add("immersive");

    const checkMobile = () => {
      isMobile = window.innerWidth < 960;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleKeydown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) {
        if (activeStep < TOTAL - 1) {
          e.preventDefault();
          scrollToStep(activeStep + 1);
        }
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        if (activeStep > 0) {
          e.preventDefault();
          scrollToStep(activeStep - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("keydown", handleKeydown);
      document.body.classList.remove("immersive");
    };
  });
</script>

<svelte:head>
  <title>The Anatomy of a Microsecond — A Visual Essay by Drew Pilat</title>
  <meta
    name="description"
    content="Where does your retail market order actually go? A scrollytelling visual essay on payment for order flow, internalization, HFT microwave networks, and IEX's speed bump."
  />
</svelte:head>

<div class="visual-essay">
  <!-- Ticker-tape HUD -->
  <aside class="tape-hud" aria-label="Reading progress">
    <div class="tape-content">
      <a href="/projects" class="tape-back">&lt; PROJECTS</a>
      <span class="tape-divider">//</span>
      <span class="tape-title">ANATOMY OF A MICROSECOND</span>
      <span class="tape-cursor" aria-hidden="true"></span>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        class="tape-meter"
        role="progressbar"
        aria-valuenow={activeStep + 1}
        aria-valuemin="1"
        aria-valuemax={TOTAL}
        onclick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          const targetIdx = Math.min(TOTAL - 1, Math.max(0, Math.floor(ratio * TOTAL)));
          scrollToStep(targetIdx);
        }}
      >
        {#each Array(TOTAL) as _, i}
          <span class="meter-tick" class:lit={i <= activeStep}></span>
        {/each}
      </div>
      <span class="tape-counter">[ {String(activeStep + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")} ]</span>
    </div>
  </aside>

  <!-- TWO-COLUMN SCROLLYTELLING CONTAINER -->
  <div class="scrolly-wrapper">
    <!-- LEFT COLUMN: Scrollable Narrative Track -->
    <div class="scroll-track">
      {#each narrativeSteps as step, idx}
        <section class="step-card-wrapper" use:scrollyStep={idx}>
          <div class="slip-card" class:active-card={activeStep === idx}>
            <div class="slip-perf top" aria-hidden="true"></div>

            <div class="slip-head">
              <span class="slip-rec">No. {String(idx + 1).padStart(2, "0")}</span>
              <span class="slip-act">{step.act}</span>
            </div>

            <h2 class="slip-title">{step.title}</h2>
            <h3 class="slip-subtitle">{step.subtitle}</h3>

            <p class="slip-prose">{step.body}</p>

            {#if step.takeaway}
              <div class="slip-takeaway">
                <span class="takeaway-mark">&gt;</span>
                <p>{step.takeaway}</p>
              </div>
            {/if}

            {#if step.sowhat}
              <p class="slip-sowhat"><span>SO WHAT</span>{step.sowhat}</p>
            {/if}

            {#if step.stat}
              <div class="slip-stat">
                <span class="stat-dot"></span>
                <span>{step.stat}</span>
              </div>
            {/if}

            <!-- Mobile: interactive controls inline under the card that owns them -->
            {#if isMobile}
              <div class="mobile-inline-stage">
                {#if idx === 0}
                  <div class="order-card">
                    <div class="order-row">
                      <span>AAPL</span><span>10 sh @ $195.00</span>
                    </div>
                    <button class="order-submit" onclick={submitOrder} disabled={orderSubmitting}>
                      {#if orderSubmitting}Submitting…{:else if orderSubmitted}✓ Filled{:else}Submit Order{/if}
                    </button>
                  </div>
                  <TimeScrubber bind:value={scrubberValue} />
                {:else if idx === 1}
                  <Rule606Flow bind:broker />
                {:else if idx === 2}
                  <OrderBookLadder bind:filled={bookFilled} />
                {:else if idx === 3}
                  <HftGeographyMap bind:rainFade />
                {:else if idx === 5}
                  <SpeedBumpRace bind:withSpeedBump={speedBumpOn} />
                {/if}
              </div>
            {/if}

            <div class="slip-perf bottom" aria-hidden="true"></div>
          </div>
        </section>
      {/each}

      <!-- Coda / Sources Card -->
      <section class="step-card-wrapper final-wrapper" use:scrollyStep={narrativeSteps.length}>
        <div class="slip-card coda-card" class:active-card={activeStep === narrativeSteps.length}>
          <div class="slip-perf top" aria-hidden="true"></div>
          <div class="slip-head">
            <span class="slip-rec">EOD</span>
            <span class="slip-act">DEBRIEF</span>
          </div>
          <h2 class="slip-title">So does it matter?</h2>
          <h3 class="slip-subtitle">For 10 shares of Apple, no. For the system, maybe.</h3>
          <p class="slip-prose">
            You saved a couple of cents and risked nothing. It starts to matter with bigger orders, thinner
            stocks, and millions of people doing it every day. The market didn't break. It got optimized,
            sub-penny by sub-penny, by people who read the rules closely. Change the numbers and see who
            ends up with what.
          </p>

          {#if isMobile}
            <div class="mobile-inline-stage"><SpreadWaterfall /></div>
          {/if}

          <div class="ledger-compare">
            <div class="lc-col expected">
              <span class="lc-tag">WHAT YOU IMAGINE</span>
              <p>Your order travels to NYSE or Nasdaq and trades against the public order book, same as everyone else's.</p>
            </div>
            <div class="lc-col actual">
              <span class="lc-tag">WHAT ACTUALLY HAPPENS</span>
              <p>Your broker sells the right to see your order to a wholesaler, who fills you from its own inventory a fraction of a cent better than the public price, and keeps the rest of the spread.</p>
            </div>
          </div>

          <div class="slip-todo">
            <span class="lc-tag">WHAT YOU CAN DO</span>
            <ul>
              <li>Check the spread before you trade. A wide spread means more is at stake.</li>
              <li>On thin stocks, use a limit order. It caps the price you'll pay.</li>
              <li>Read your broker's Rule 605 report (how well it fills you) and Rule 606 report (who it sells to).</li>
            </ul>
          </div>

          <div class="coda-links">
            <a href="https://www.sec.gov/rules/final/2005/34-51808.pdf" target="_blank" rel="noopener" class="coda-btn">
              SEC RULE 606 DISCLOSURE REQUIREMENTS ↗
            </a>
            <a href="https://iextrading.com/docs/IEX%20Fair%20Access.pdf" target="_blank" rel="noopener" class="coda-btn">
              IEX SPEED BUMP / "MAGIC SHOEBOX" ↗
            </a>
            <a href="/projects" class="coda-btn primary">&lt; RETURN TO PROJECTS</a>
          </div>

          <div class="tech-colophon">
            <span class="colophon-label">TECH SPEC</span>
            <p class="colophon-text">
              Svelte 5 scrollytelling with intersection-observer narrative triggers, a sticky CRT-style
              visual stage, and six bespoke interactive components: TimeScrubber, OrderBookLadder,
              Rule606Flow, HftGeographyMap, SpeedBumpRace, and SpreadWaterfall.
            </p>
          </div>
          <div class="slip-perf bottom" aria-hidden="true"></div>
        </div>
      </section>
    </div>

    <!-- RIGHT COLUMN: Sticky CRT Visual Stage (desktop only) -->
    {#if !isMobile}
      <div class="sticky-stage-col">
        <div class="sticky-viewport">
          <div class="crt-bezel">
            <div class="crt-screen">
              <div class="crt-scanline" aria-hidden="true"></div>

              <div class="readout-strip">
                <span class="readout-dot" class:alert={activeStep === 4}></span>
                <span class="readout-text">
                  {#if activeStep === 0}
                    ORDER ROUTER · AWAITING SUBMISSION
                  {:else if activeStep === 1}
                    RULE 606 ROUTING TABLE · {broker.toUpperCase()}
                  {:else if activeStep === 2}
                    L3 BOOK · NASDAQ CARTERET
                  {:else if activeStep === 3}
                    NJ ⇄ AURORA, IL LATENCY ARB
                  {:else if activeStep === 4}
                    ALERT: TOXIC FLOW DETECTED · PHASE {litPhase + 1}/4
                  {:else if activeStep === 5}
                    IEX SPEED BUMP SIMULATOR
                  {:else if activeStep === 6}
                    TRADE CONFIRMED · WHO GOT PAID
                  {:else}
                    THE SPREAD · SPLIT THREE WAYS
                  {/if}
                </span>
              </div>

              <div class="crt-body">
                {#if activeStep === 0}
                  <div class="stage-block">
                    <div class="order-card">
                      <div class="order-card-header">
                        <span class="order-ticker">AAPL</span>
                        <span class="order-price">$195.00</span>
                      </div>
                      <div class="order-row"><span>Quantity</span><span>10 shares</span></div>
                      <div class="order-row"><span>Order type</span><span>Market</span></div>
                      <button class="order-submit" onclick={submitOrder} disabled={orderSubmitting}>
                        {#if orderSubmitting}
                          <span class="spinner"></span> Submitting…
                        {:else if orderSubmitted}
                          ✓ Filled at $194.998
                        {:else}
                          Submit Order
                        {/if}
                      </button>
                    </div>
                    <TimeScrubber bind:value={scrubberValue} />
                  </div>
                {:else if activeStep === 1}
                  <div class="stage-block">
                    <Rule606Flow bind:broker />
                  </div>
                {:else if activeStep === 2}
                  <div class="stage-block">
                    <OrderBookLadder bind:filled={bookFilled} />
                  </div>
                {:else if activeStep === 3}
                  <div class="stage-block">
                    <HftGeographyMap bind:rainFade />
                  </div>
                {:else if activeStep === 4}
                  <div class="stage-block toxic-flow-block">
                    <svg viewBox="0 0 400 220" class="toxic-svg" preserveAspectRatio="xMidYMid meet">
                      <line x1="30" y1="180" x2="370" y2="180" class="axis-line" />
                      <text x="30" y="196" class="axis-label">ORDER STARTS FILLING</text>
                      <text x="370" y="196" text-anchor="end" class="axis-label">MICROSECONDS LATER</text>

                      <!-- Ask price line: flat, then jumps -->
                      <path
                        d={litPhase < 2
                          ? "M 30,120 L 370,120"
                          : "M 30,120 L 200,120 L 210,70 L 370,70"}
                        class="ask-line"
                      />
                      <text x="34" y="112" class="ask-label">ASK $195.00</text>
                      {#if litPhase >= 2}
                        <text x="220" y="62" class="ask-label jumped">ASK $195.04</text>
                      {/if}

                      <!-- Institutional fill blocks growing over time -->
                      {#each Array(litPhase >= 1 ? Math.min(litPhase * 3 + 2, 10) : 0) as _, i}
                        <rect x={40 + i * 30} y={165 - (i % 3) * 4} width="22" height="15" rx="1" class="fill-block" />
                      {/each}

                      {#if litPhase >= 2}
                        <g class="sniffer-alert">
                          <circle cx="205" cy="90" r="18" class="sniffer-ring" />
                          <text x="205" y="94" text-anchor="middle" class="sniffer-text">HFT</text>
                        </g>
                      {/if}
                    </svg>
                    <div class="phase-desc-row">
                      <p class="phase-desc">
                        {#if litPhase === 0}
                          <strong>1. Order sent:</strong> Pension fund routes 500,000 shares to the lit exchange at the NBBO ask, $195.00.
                        {:else if litPhase === 1}
                          <strong>2. First clip fills:</strong> The initial 1,000-share slice prints publicly, leaving a footprint.
                        {:else if litPhase === 2}
                          <strong>3. Sniffer reacts:</strong> Within a few microseconds, fast traders spot the pattern and cancel their resting quotes.
                        {:else}
                          <strong>4. Price jumps:</strong> The ask reprices to $195.04 before the rest of the 500,000-share order can fill at the old price.
                        {/if}
                      </p>
                      <button class="sim-btn primary" onclick={advanceLitPhase}>
                        {litPhase === 3 ? "↺ RESTART" : "NEXT →"}
                      </button>
                    </div>
                  </div>
                {:else if activeStep === 5}
                  <div class="stage-block">
                    <SpeedBumpRace bind:withSpeedBump={speedBumpOn} />
                  </div>
                {:else if activeStep === 6}
                  <div class="stage-block epilogue-block">
                    <div class="phone-notif">
                      <span class="notif-badge">AAPL</span>
                      <span class="notif-text">Bought 10 shares at $194.998</span>
                    </div>
                    <div class="ledger">
                      <div class="ledger-row"><span>You</span><span class="ledger-good">saved $0.02</span></div>
                      <div class="ledger-row"><span>Your broker</span><span class="ledger-good">earned PFOF</span></div>
                      <div class="ledger-row"><span>The internalizer</span><span class="ledger-good">kept $0.008 spread</span></div>
                      <div class="ledger-row"><span>The public book</span><span class="ledger-bad">lost volume</span></div>
                    </div>
                  </div>
                {:else}
                  <div class="stage-block">
                    <SpreadWaterfall />
                  </div>
                {/if}
              </div>
            </div>
            <div class="crt-bezel-label">
              <span>MKT-DATA TERM · CH 4</span>
              <span class="bezel-led"></span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* ── Core Container: black terminal, phosphor green ────────────────────── */
  .visual-essay {
    --term-green: #3ee07f;
    --term-green-bright: #7dffb3;
    --term-amber: #ff9f43;
    --term-red: #ff5d73;
    --term-cyan: #5ce1ff;
    background-color: #000000;
    background-image:
      repeating-linear-gradient(0deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px),
      repeating-linear-gradient(90deg, rgba(62, 224, 127, 0.035) 0px, rgba(62, 224, 127, 0.035) 1px, transparent 1px, transparent 34px);
    color: #d6e8db;
    position: relative;
    min-height: 100vh;
    font-family: var(--font-mono, "IBM Plex Mono", ui-monospace, monospace);
  }

  /* ── Ticker-Tape HUD ────────────────────────────────────────────────────── */
  .tape-hud {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 90;
    background: #050706;
    border-bottom: 1px solid rgba(62, 224, 127, 0.35);
    box-shadow: 0 1px 0 rgba(62, 224, 127, 0.12);
  }

  .tape-content {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0.7rem 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
  }

  .tape-back {
    color: #7e9b89;
    text-decoration: none;
    font-weight: 700;
    white-space: nowrap;
    transition: color 0.2s;
  }
  .tape-back:hover {
    color: var(--term-green-bright);
  }

  .tape-divider {
    color: rgba(62, 224, 127, 0.4);
  }

  .tape-title {
    color: var(--term-green-bright);
    font-weight: 700;
    white-space: nowrap;
    text-shadow: 0 0 8px rgba(62, 224, 127, 0.5);
  }

  .tape-cursor {
    width: 7px;
    height: 13px;
    background: var(--term-green-bright);
    animation: blink 1s step-end infinite;
    flex-shrink: 0;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }

  .tape-meter {
    flex: 1;
    display: flex;
    gap: 3px;
    cursor: pointer;
    padding: 0.4rem 0;
  }

  .meter-tick {
    flex: 1;
    height: 5px;
    background: rgba(62, 224, 127, 0.12);
    border: 1px solid rgba(62, 224, 127, 0.25);
    transition: background 0.3s;
  }

  .meter-tick.lit {
    background: var(--term-green);
    box-shadow: 0 0 6px rgba(62, 224, 127, 0.7);
  }

  .tape-counter {
    color: var(--term-amber);
    font-weight: 700;
    white-space: nowrap;
  }

  /* ── Two-Column Scrollytelling Grid ────────────────────────────────────── */
  .scrolly-wrapper {
    display: grid;
    grid-template-columns: 440px 1fr;
    gap: 2rem;
    max-width: 1440px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
  }

  .scroll-track {
    position: relative;
    z-index: 20;
  }

  .step-card-wrapper {
    min-height: 90vh;
    display: flex;
    align-items: center;
    padding: 4rem 0;
  }

  /* ── Trade-slip narrative cards ─────────────────────────────────────────── */
  .slip-card {
    width: 100%;
    background: #060a08;
    border: 1px solid rgba(62, 224, 127, 0.18);
    border-radius: 3px;
    padding: 1.75rem 2rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85);
    opacity: 0.4;
    transform: translateY(10px);
    transition: all 0.4s ease;
    position: relative;
  }

  .slip-card.active-card {
    opacity: 1;
    transform: none;
    border-color: rgba(62, 224, 127, 0.55);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(62, 224, 127, 0.08);
  }

  .slip-sowhat {
    margin: 0.9rem 0 0;
    font-size: 0.86rem;
    line-height: 1.6;
    color: #f0d9b8;
  }

  .slip-sowhat span {
    display: inline-block;
    margin-right: 0.6rem;
    padding: 0.08rem 0.4rem;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: #0a0a0a;
    background: #ff9f43;
  }

  .slip-todo {
    margin-top: 1.2rem;
    padding: 0.9rem 1rem;
    border: 1px solid rgba(62, 224, 127, 0.25);
    background: rgba(62, 224, 127, 0.04);
  }

  .slip-todo ul {
    margin: 0.6rem 0 0;
    padding-left: 1.1rem;
    font-size: 0.84rem;
    line-height: 1.6;
    color: #d6e8db;
  }

  .slip-todo li + li {
    margin-top: 0.3rem;
  }

  .slip-perf {
    height: 6px;
    margin: 0 -2rem;
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.9) 2.5px, transparent 2.6px);
    background-size: 14px 6px;
    background-position: center;
    opacity: 0.7;
  }

  .slip-perf.top {
    margin-bottom: 1.1rem;
    margin-top: -1.75rem;
  }

  .slip-perf.bottom {
    margin-top: 1.1rem;
    margin-bottom: -1.75rem;
  }

  .slip-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.9rem;
  }

  .slip-rec {
    font-size: 0.66rem;
    color: #5c7768;
    letter-spacing: 0.1em;
  }

  .slip-act {
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: var(--term-amber);
    border: 1px solid rgba(255, 159, 67, 0.35);
    padding: 0.15rem 0.45rem;
  }

  .slip-title {
    font-family: var(--font-sans, sans-serif);
    font-size: 1.7rem;
    font-weight: 700;
    color: #eef7f0;
    line-height: 1.2;
    margin: 0 0 0.3rem 0;
    letter-spacing: -0.02em;
  }

  .slip-subtitle {
    font-family: var(--font-sans, sans-serif);
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--term-green-bright);
    margin: 0 0 1.1rem 0;
    line-height: 1.4;
  }

  .slip-prose {
    font-family: var(--font-sans, sans-serif);
    font-size: 0.95rem;
    line-height: 1.7;
    color: #b9c9bd;
    margin: 0 0 1.1rem 0;
  }

  .slip-takeaway {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    background: rgba(62, 224, 127, 0.05);
    border-left: 2px solid var(--term-green);
    padding: 0.75rem 0.9rem;
    font-family: var(--font-sans, sans-serif);
    font-size: 0.85rem;
    line-height: 1.55;
    color: #d7e8dc;
    margin-bottom: 1.1rem;
  }

  .slip-takeaway p {
    margin: 0;
  }

  .takeaway-mark {
    color: var(--term-green);
    font-weight: 700;
  }

  .slip-stat {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(255, 159, 67, 0.3);
    padding: 0.3rem 0.65rem;
    font-size: 0.64rem;
    letter-spacing: 0.03em;
    color: var(--term-amber);
  }

  .stat-dot {
    width: 5px;
    height: 5px;
    background: var(--term-amber);
    box-shadow: 0 0 6px var(--term-amber);
  }

  .mobile-inline-stage {
    margin-top: 1.5rem;
    padding-top: 1.1rem;
    border-top: 1px dashed rgba(62, 224, 127, 0.25);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Coda card */
  .ledger-compare {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin: 1.15rem 0;
  }

  .lc-col {
    padding: 0.8rem 0.9rem;
    font-family: var(--font-sans, sans-serif);
    font-size: 0.78rem;
    line-height: 1.5;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .lc-col.actual {
    border-color: rgba(255, 159, 67, 0.3);
    background: rgba(255, 159, 67, 0.05);
  }

  .lc-tag {
    display: block;
    font-family: var(--font-mono, monospace);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    margin-bottom: 0.4rem;
    color: #7e9b89;
  }

  .lc-col.actual .lc-tag {
    color: var(--term-amber);
  }

  .lc-col p {
    margin: 0;
    color: #c3d3c7;
  }

  .coda-links {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    margin-top: 1.15rem;
  }

  .coda-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 1rem;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-decoration: none;
    background: transparent;
    border: 1px solid rgba(62, 224, 127, 0.3);
    color: #d7e8dc;
    transition: all 0.2s ease;
  }

  .coda-btn:hover {
    border-color: var(--term-green);
    background: rgba(62, 224, 127, 0.08);
    color: var(--term-green-bright);
  }

  .coda-btn.primary {
    background: var(--term-green);
    border-color: var(--term-green);
    color: #06120a;
  }

  .coda-btn.primary:hover {
    background: var(--term-green-bright);
    color: #06120a;
  }

  .tech-colophon {
    margin-top: 1.4rem;
    padding-top: 1.1rem;
    border-top: 1px dashed rgba(62, 224, 127, 0.2);
  }

  .colophon-label {
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    color: rgba(255, 159, 67, 0.55);
    display: block;
    margin-bottom: 0.4rem;
  }

  .colophon-text {
    font-size: 0.7rem;
    line-height: 1.6;
    color: rgba(214, 232, 219, 0.4);
    margin: 0;
  }

  .final-wrapper {
    padding-bottom: 8rem;
  }

  /* ── Right Column: Sticky CRT Terminal Stage ───────────────────────────── */
  .sticky-stage-col {
    position: relative;
  }

  .sticky-viewport {
    position: sticky;
    top: 64px;
    height: calc(100vh - 84px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .crt-bezel {
    width: 100%;
    height: 100%;
    max-height: 820px;
    background: #0a0d0a;
    border: 1px solid rgba(62, 224, 127, 0.25);
    border-radius: 10px;
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  }

  .crt-screen {
    flex: 1;
    position: relative;
    background: #020402;
    border: 1px solid rgba(62, 224, 127, 0.3);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 0 60px rgba(62, 224, 127, 0.06);
  }

  .crt-scanline {
    position: absolute;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(180deg, transparent, rgba(62, 224, 127, 0.06), transparent);
    animation: scan 6s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes scan {
    from { top: -40%; }
    to { top: 100%; }
  }

  .readout-strip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.1rem;
    border-bottom: 1px solid rgba(62, 224, 127, 0.18);
    position: relative;
    z-index: 2;
  }

  .readout-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--term-green);
    box-shadow: 0 0 8px var(--term-green);
    flex-shrink: 0;
  }

  .readout-dot.alert {
    background: var(--term-red);
    box-shadow: 0 0 10px var(--term-red);
    animation: alertBlink 1s infinite;
  }

  @keyframes alertBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .readout-text {
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    color: var(--term-green-bright);
    text-shadow: 0 0 6px rgba(62, 224, 127, 0.4);
  }

  .crt-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.4rem 2rem;
    overflow-y: auto;
    position: relative;
    z-index: 2;
  }

  .crt-bezel-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: #4d6659;
  }

  .bezel-led {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--term-amber);
    box-shadow: 0 0 5px var(--term-amber);
  }

  .stage-block {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Order card (Beat 1) */
  .order-card {
    background: rgba(62, 224, 127, 0.03);
    border: 1px solid rgba(62, 224, 127, 0.25);
    border-radius: 4px;
    padding: 1.2rem 1.3rem;
  }

  .order-card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.75rem;
  }

  .order-ticker {
    font-size: 1.05rem;
    font-weight: 800;
    color: #eef7f0;
  }

  .order-price {
    font-size: 1.05rem;
    color: var(--term-green-bright);
  }

  .order-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-sans, sans-serif);
    font-size: 0.8rem;
    color: #b9c9bd;
    padding: 0.35rem 0;
    border-top: 1px dashed rgba(62, 224, 127, 0.15);
  }

  .order-submit {
    width: 100%;
    margin-top: 1rem;
    padding: 0.7rem;
    border-radius: 2px;
    border: 1px solid var(--term-green);
    background: var(--term-green);
    color: #06120a;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;
  }

  .order-submit:hover:not(:disabled) {
    background: var(--term-green-bright);
    box-shadow: 0 0 16px rgba(62, 224, 127, 0.4);
  }

  .order-submit:disabled {
    opacity: 0.85;
    cursor: default;
  }

  .spinner {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid rgba(6, 18, 10, 0.35);
    border-top-color: #06120a;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Toxic flow (Beat 5) */
  .toxic-flow-block {
    max-width: 460px;
  }

  .toxic-svg {
    width: 100%;
    height: auto;
    background: rgba(62, 224, 127, 0.02);
    border: 1px solid rgba(62, 224, 127, 0.12);
  }

  .axis-line {
    stroke: rgba(214, 232, 219, 0.15);
    stroke-width: 1;
  }

  .axis-label {
    font-size: 7px;
    fill: #7e9b89;
  }

  .ask-line {
    fill: none;
    stroke: var(--term-red);
    stroke-width: 2;
    transition: d 0.3s;
  }

  .ask-label {
    font-size: 8px;
    fill: #ff8a9a;
  }

  .ask-label.jumped {
    fill: #ff334f;
    font-weight: 700;
  }

  .fill-block {
    fill: var(--term-green);
    opacity: 0.75;
  }

  .sniffer-ring {
    fill: none;
    stroke: var(--term-amber);
    stroke-width: 1.5;
    stroke-dasharray: 3 3;
    animation: sniffSpin 3s linear infinite;
  }

  @keyframes sniffSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .sniffer-text {
    font-size: 8px;
    font-weight: 800;
    fill: var(--term-amber);
  }

  .phase-desc-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .phase-desc {
    font-family: var(--font-sans, sans-serif);
    font-size: 0.8rem;
    line-height: 1.5;
    color: #d7e8dc;
    margin: 0;
  }

  .phase-desc strong {
    color: #ffadb8;
  }

  .sim-btn {
    align-self: flex-start;
    padding: 0.4rem 0.8rem;
    border-radius: 2px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    border: 1px solid var(--term-red);
    background: transparent;
    color: var(--term-red);
    transition: all 0.2s;
  }

  .sim-btn.primary:hover {
    background: var(--term-red);
    color: #170406;
    box-shadow: 0 0 12px rgba(255, 93, 115, 0.5);
  }

  /* Epilogue block */
  .epilogue-block {
    max-width: 380px;
  }

  .phone-notif {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(62, 224, 127, 0.05);
    border: 1px solid rgba(62, 224, 127, 0.25);
    border-radius: 4px;
    padding: 0.7rem 0.9rem;
  }

  .notif-badge {
    font-size: 0.62rem;
    font-weight: 800;
    background: rgba(62, 224, 127, 0.18);
    color: var(--term-green-bright);
    padding: 0.2rem 0.5rem;
  }

  .notif-text {
    font-family: var(--font-sans, sans-serif);
    font-size: 0.82rem;
    color: #eef7f0;
  }

  .ledger {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .ledger-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-sans, sans-serif);
    font-size: 0.82rem;
    color: #b9c9bd;
    padding: 0.5rem 0.7rem;
    background: rgba(62, 224, 127, 0.02);
    border: 1px solid rgba(62, 224, 127, 0.1);
  }

  .ledger-good {
    color: var(--term-green-bright);
    font-weight: 700;
  }

  .ledger-bad {
    color: #ff8a9a;
    font-weight: 700;
  }

  /* ── Mobile ─────────────────────────────────────────────────────────────── */
  @media (max-width: 960px) {
    .scrolly-wrapper {
      grid-template-columns: 1fr;
      padding: 0.5rem 1rem;
      gap: 1rem;
    }

    .tape-content {
      padding: 0.6rem 1rem;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tape-title {
      display: none;
    }

    .tape-meter {
      order: 3;
      flex-basis: 100%;
    }

    .step-card-wrapper {
      min-height: auto;
      padding: 2.5rem 0;
    }

    .slip-title {
      font-size: 1.45rem;
    }

    .slip-card {
      padding: 1.4rem 1.5rem;
    }

    .slip-perf {
      margin: 0 -1.5rem;
    }

    .slip-perf.top {
      margin-top: -1.4rem;
    }

    .slip-perf.bottom {
      margin-bottom: -1.4rem;
    }

    .ledger-compare {
      grid-template-columns: 1fr;
    }
  }
</style>
