<script>
  import { onMount } from 'svelte';

  // Svelte 5 active tab state
  let activeTab = $state('about');

  // Reading List Airtable Configurations
  const AIRTABLE_API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const TABLE_ID = import.meta.env.VITE_AIRTABLE_TABLE_ID;

  const genreColorDictionary = {
    'sci-fi': '#51FFAD',
    'fantasy': '#BA7AFE',
    'non-fiction': '#FFCB43',
    'mystery': '#3357FF',
    'biography': '#FF33A1'
  };

  let books = $state([]);
  let fetchStatus = $state('idle'); // 'idle' | 'loading' | 'success' | 'error'

  // Filter & Sort States
  let selectedGenre = $state('all');
  let ratingSortOrder = $state('desc'); // 'desc' | 'asc'

  // Svelte 5 Derived Filtered & Sorted Book List
  let filteredBooks = $derived(
    books
      .filter(book => {
        if (selectedGenre === 'all') return true;
        const genres = book.fields.Genre || [];
        return genres.map(g => g.trim().toLowerCase()).includes(selectedGenre);
      })
      .sort((a, b) => {
        const ratingA = parseFloat(a.fields.Rating || 0);
        const ratingB = parseFloat(b.fields.Rating || 0);
        return ratingSortOrder === 'desc' ? ratingB - ratingA : ratingA - ratingB;
      })
  );

  async function fetchBooks() {
    fetchStatus = 'loading';
    try {
      let allRecords = [];
      let offset = null;

      do {
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_ID}${offset ? `?offset=${offset}` : ''}`;
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${AIRTABLE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        allRecords = [...allRecords, ...data.records];
        offset = data.offset;
      } while (offset);

      books = allRecords;
      fetchStatus = 'success';
    } catch (error) {
      console.error('Error fetching books:', error);
      fetchStatus = 'error';
    }
  }

  function handleTabChange(tabName) {
    activeTab = tabName;
    if (tabName === 'reading' && books.length === 0) {
      fetchBooks();
    }
  }

  onMount(() => {
    if (activeTab === 'reading') {
      fetchBooks();
    }
  });
</script>

<!-- Header & Tab Navigation -->
<header>
  <div class="header-container">
    <div 
      class="logo" 
      onclick={() => handleTabChange('about')}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTabChange('about'); } }}
      role="button" 
      tabindex="0"
    >
      Drew Pilat
    </div>
    
    <ul class="nav-tabs">
      <li>
        <button 
          class={activeTab === 'about' ? 'active' : ''} 
          onclick={() => handleTabChange('about')}
        >
          About me
        </button>
      </li>
      <li>
        <button 
          class={activeTab === 'projects' ? 'active' : ''} 
          onclick={() => handleTabChange('projects')}
        >
          Projects
        </button>
      </li>
      <li>
        <button 
          class={activeTab === 'essays' ? 'active' : ''} 
          onclick={() => handleTabChange('essays')}
        >
          Essays
        </button>
      </li>
      <li>
        <button 
          class={activeTab === 'reading' ? 'active' : ''} 
          onclick={() => handleTabChange('reading')}
        >
          Reading List
        </button>
      </li>
    </ul>
  </div>
</header>

<!-- Main Wrapper -->
<main class="container" style="padding-top: 3rem; padding-bottom: 5rem;">

  <!-- ABOUT ME TAB PANEL -->
  <div class="tab-content-panel {activeTab === 'about' ? 'active' : ''}" id="about">
    <!-- Printable Resume Header -->
    <div class="resume-print-header" style="display: none;">
      <h1>Drew Pilat</h1>
      <p>dpilat@uchicago.edu • (248) 231-9562 • linkedin.com/in/drew-pilat/</p>
    </div>

    <div class="grid-2">
      <!-- Bio / Profile Overview Column -->
      <div>
        <span class="tech-label">BIOGRAPHY // PROFILE</span>
        <h2 style="font-family: var(--font-display); font-weight: 700; border-bottom: none; margin-top: 0; margin-bottom: 1.5rem;">
          Hi, I'm Drew.
        </h2>
        <p class="lead" style="margin-bottom: 1.5rem;">
          I analyze systems, write interactive code, and design visual essays explaining quantitative finance, computing, and social sentiment.
        </p>
        <p>
          I am currently pursuing a Master of Science in Computer Science at the University of Chicago, specializing in High Performance Computing.
        </p>
        <p style="margin-bottom: 2.5rem;">
          This space serves as a platform to display visual stories on microsecond HFT latency, machine learning shifting, and correlation matrices, alongside my interactive resume and personal reading list.
        </p>

        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem;">
          <div class="card" style="padding: 1.5rem 0;">
            <span class="tech-label">SUMMARY // DATA_POINTS</span>
            <table class="tech-table">
              <tbody>
                <tr>
                  <td class="label">Focus</td>
                  <td class="val">High Performance Computing, Financial Engineering</td>
                </tr>
                <tr>
                  <td class="label">Location</td>
                  <td class="val">Chicago, IL</td>
                </tr>
                <tr>
                  <td class="label">Stack</td>
                  <td class="val">Python, C++, Svelte, D3.js, WebGL, SQL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <a href="/Drew_Pilat_Resume.pdf" download="Drew_Pilat_Resume.pdf" class="btn btn-primary" style="width: 100%; justify-content: center; font-family: var(--font-mono); text-decoration: none;">
          Download PDF Resume
        </a>
      </div>

      <!-- Experience & Education Column -->
      <div>
        <!-- Education Section -->
        <div class="resume-section">
          <div class="resume-section-header">Education</div>
          <div class="timeline" style="margin-top: 0.5rem; gap: 2rem; margin-bottom: 2rem;">
            <div class="timeline-item">
              <div class="resume-meta-row">
                <div class="timeline-company">University of Chicago</div>
                <div class="timeline-date">Expected 2027</div>
              </div>
              <div class="timeline-title">Master of Science in Computer Science</div>
              <p style="font-size: 0.9rem; margin-bottom: 0.25rem; color: var(--text-main);">
                Specialization: High Performance Computing
              </p>
              <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 0;">
                Coursework: Discrete Mathematics, Python for Data Science, Algorithms, Databases
              </p>
            </div>

            <div class="timeline-item">
              <div class="resume-meta-row">
                <div class="timeline-company">University of Michigan</div>
                <div class="timeline-date">2016 — 2020</div>
              </div>
              <div class="timeline-title">Bachelor of Business Administration</div>
              <p style="font-size: 0.9rem; margin-bottom: 0.25rem; color: var(--text-main);">
                Stephen M. Ross School of Business
              </p>
              <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 0;">
                Specializations: Financial Markets, Entrepreneurial Law
              </p>
            </div>
          </div>
        </div>

        <!-- Experience Section -->
        <div class="resume-section">
          <div class="resume-section-header">Experience</div>
          <div class="timeline" style="margin-top: 0.5rem;">
            <!-- Benzinga -->
            <div class="timeline-item">
              <div class="resume-meta-row">
                <div class="timeline-company">Benzinga</div>
                <div class="timeline-date">2023 — 2025</div>
              </div>
              <div class="timeline-title">Chief of Staff</div>
              <ul class="timeline-bullets">
                <li>
                  <strong>Predictive Analytics:</strong> Developed ML models in Python and Tableau dashboards to predict churn with 85% accuracy, increasing CLV by 20% and directly mitigating attrition risk.
                </li>
                <li>
                  <strong>Product Innovation:</strong> Led the end-to-end development and launch of a high-revenue mining product, generating $500,000+ since inception.
                </li>
                <li>
                  <strong>Algorithm Development:</strong> Engineered factor-based models for Benzinga Quant to analyze market volatility and rank high-probability stocks using quantitative signals.
                </li>
                <li>
                  <strong>Growth Operations:</strong> Launched and scaled the Virtual Events vertical to drive $350,000+ in 2024 revenue.
                </li>
                <li>
                  <strong>Strategic Marketing:</strong> Optimized mobile app product and marketing strategy via attribution models, resulting in a 33% reduction in CAC.
                </li>
              </ul>
            </div>

            <!-- Jumpstart Health Investors -->
            <div class="timeline-item">
              <div class="resume-meta-row">
                <div class="timeline-company">Jumpstart Health Investors</div>
                <div class="timeline-date">2022 — 2023</div>
              </div>
              <div class="timeline-title">Investment Associate</div>
              <ul class="timeline-bullets">
                <li>
                  <strong>Due Diligence:</strong> Evaluated 200+ potential investment opportunities, performing rigorous risk assessments and presenting memos to the Investment Committee.
                </li>
                <li>
                  <strong>Portfolio Strategy:</strong> Leveraged historical investment data to derive actionable insights, shaping future fund deployment strategies.
                </li>
                <li>
                  <strong>Market Research:</strong> Conducted exhaustive industry research to identify market trends and potential systemic risks within the healthcare startup ecosystem.
                </li>
              </ul>
            </div>

            <!-- Wellnest -->
            <div class="timeline-item">
              <div class="resume-meta-row">
                <div class="timeline-company">Wellnest</div>
                <div class="timeline-date">2019 — 2022</div>
              </div>
              <div class="timeline-title">Co-Founder & Chief Operating Officer</div>
              <ul class="timeline-bullets">
                <li>
                  <strong>Fundraising:</strong> Successfully raised $800,000 in pre-seed funding from top-tier venture capital firms and angel investors.
                </li>
                <li>
                  <strong>Strategic Partnerships:</strong> Forged institutional partnerships with UPenn and Boston University to establish sustainable revenue streams.
                </li>
                <li>
                  <strong>Product Strategy:</strong> Pioneered product initiatives, integrating game design to reduce mindfulness routine time-to-value while keeping a 5.0 App Store rating.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Skills Section (Only visible on Print layout) -->
        <div class="resume-section" style="display: none; page-break-before: avoid;">
          <div class="resume-section-header">Skills</div>
          <div class="skills-print-row">
            <strong>Programming:</strong> Python (NumPy, Pandas, Scikit-learn, SciPy, Matplotlib), C++, SQL, Unix/Linux, Git
          </div>
          <div class="skills-print-row">
            <strong>Data/Finance:</strong> Financial Modeling, Quantitative Risk Management (VaR, Stress Testing), Tableau, Factor-based Modeling, Derivatives Pricing, M&A Due Diligence, Multivariate Testing, Time-Series Analysis
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PROJECTS TAB PANEL -->
  <div class="tab-content-panel {activeTab === 'projects' ? 'active' : ''}" id="projects">
    <div style="max-width: var(--max-width); margin: 0 auto;">
      <span class="tech-label">REPOSITORY // OPEN SOURCE</span>
      <h2 style="margin-top: 0; margin-bottom: 1rem;">Code & Tools</h2>
      <p class="lead" style="margin-bottom: 3rem;">
        Experimental prototypes and developer packages under active development.
      </p>

      <div class="essay-grid">
        <!-- Project Card 1 -->
        <div class="essay-card">
          <div>
            <!-- Visual Abstract Graphic -->
            <div class="abstract-container">
              <div class="quants-cluster-abstract" style="padding: 1.25rem; font-family: var(--font-mono); font-size: 0.72rem; color: #51FFAD; line-height: 1.4; display: flex; flex-direction: column; justify-content: center; height: 100%;">
                <div>$ ./hft_sim --route CHI-NY</div>
                <div style="color: var(--text-dim);">[PING] CHI_EXCHANGE -> NY_EXCHANGE...</div>
                <div>rtt: 4.120 ms (delta -1.25 µs)</div>
                <div style="color: var(--gold);">latency limit: OPTIMAL</div>
              </div>
            </div>
            <span class="tech-label">SIMULATOR // SYSTEM_ENGINEERING</span>
            <div class="essay-title">hft-latency-tool</div>
            <p>
              High-frequency trading network transit model, evaluating round-trip microsecond delay limits across global fiber-optic and microwave paths.
            </p>
          </div>
          <div class="essay-meta">
            Status: <span>STAGED / COMPILE_OK</span> // C++ + WASM
          </div>
        </div>

        <!-- Project Card 2 -->
        <div class="essay-card">
          <div>
            <div class="abstract-container">
              <div class="quants-cluster-abstract" style="padding: 1.25rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold-bright); line-height: 1.4; display: flex; flex-direction: column; justify-content: center; height: 100%;">
                <div>[STREAM] ingesting r/wallstreetbets...</div>
                <div>jobs: active (workers: 16)</div>
                <div style="color: var(--text-dim);">queue: 41.2 MB // throughput: 8.4k msg/s</div>
                <div style="color: #BA7AFE;">status: INDEXING [||||||||  ] 68%</div>
              </div>
            </div>
            <span class="tech-label">CRAWLER // INGESTION_PIPELINE</span>
            <div class="essay-title">sentiment-indexer</div>
            <p>
              Distributed Reddit and Twitter feed scraper and analytics engine, processing real-time word frequency clusters for social-sentiment trading.
            </p>
          </div>
          <div class="essay-meta">
            Status: <span>BUILDING / 68%</span> // Python + Redis
          </div>
        </div>

        <!-- Project Card 3 -->
        <div class="essay-card">
          <div>
            <div class="abstract-container">
              <div class="quants-cluster-abstract" style="padding: 1.25rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; display: flex; flex-direction: column; justify-content: center; height: 100%;">
                <div>[MATRIX] size: [4 x 4] // sigma: 0.125</div>
                <div>[ 0.85  -0.12   0.04   0.31 ]</div>
                <div>[-0.12   0.62   0.15  -0.08 ]</div>
                <div style="color: var(--gold-dim);">[STAGED] weights calculated...</div>
              </div>
            </div>
            <span class="tech-label">MATHEMATICS // ALGORITHMS</span>
            <div class="essay-title">portfolio-parity-sdk</div>
            <p>
              Linear algebra package for real-time asset weight optimization under historical volatility and correlation shock scenarios.
            </p>
          </div>
          <div class="essay-meta">
            Status: <span>PLANNING / INIT</span> // Rust + WASM
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ESSAYS TAB PANEL (Overhauled Figma/Apple Grid Layout) -->
  <div class="tab-content-panel {activeTab === 'essays' ? 'active' : ''}" id="essays">
    <div style="max-width: var(--max-width); margin: 0 auto;">
      <span class="tech-label">JOURNAL // VISUAL ESSAYS</span>
      <h2 style="margin-top: 0; margin-bottom: 1rem;">Interactive Stories</h2>
      <p class="lead" style="margin-bottom: 3rem;">
        Bespoke visualizations analyzing physical infrastructure, market dynamics, and qualitative role transitions.
      </p>

      <div class="essay-grid">
        <!-- Essay Card 1 -->
        <div class="essay-card">
          <div>
            <!-- Visual Abstract Graphic -->
            <div class="abstract-container">
              <div class="network-map-abstract">
                <div class="network-line"></div>
                <div class="network-node node-chicago" title="Chicago"></div>
                <div class="network-node node-ny" title="New York"></div>
                <div class="network-node node-london" title="London"></div>
                <div class="network-node node-tokyo" title="Tokyo"></div>
                <div class="pulse-ring"></div>
              </div>
            </div>
            <span class="tech-label">NETMAP // HIGH_FREQUENCY_TRADING</span>
            <div class="essay-title">The Latency Map</div>
            <p>
              An interactive global map showing the physical infrastructure of high-frequency trading (fiber optic routes, microwave towers) connecting major exchanges (Chicago, NY, London, Tokyo) and the estimated cost to shave one microsecond off the round trip.
            </p>
          </div>
          <div class="essay-meta">
            Status: <span>DRAFT</span> // D3.js + Leaflet
          </div>
        </div>

        <!-- Essay Card 2 -->
        <div class="essay-card">
          <div>
            <div class="abstract-container">
              <div class="sentiment-chart-abstract">
                <div class="chart-bar" style="height: 20%;"></div>
                <div class="chart-bar" style="height: 35%;"></div>
                <div class="chart-bar" style="height: 25%;"></div>
                <div class="chart-bar spike" style="height: 85%;"></div>
                <div class="chart-bar" style="height: 50%;"></div>
                <div class="chart-bar" style="height: 40%;"></div>
                <div class="chart-bar spike" style="height: 95%;"></div>
                <div class="chart-bar" style="height: 30%;"></div>
              </div>
            </div>
            <span class="tech-label">NLP // SOCIAL_SENTIMENT</span>
            <div class="essay-title">The Evolution of Sentiment</div>
            <p>
              A project analyzing the transition from "news-based" algorithmic trading to "social-sentiment" trading, visualizing the correlation between specific subreddits/Twitter feeds and sudden price spikes in micro-cap stocks.
            </p>
          </div>
          <div class="essay-meta">
            Status: <span>DRAFT</span> // Canvas API + WebSocket
          </div>
        </div>

        <!-- Essay Card 3 -->
        <div class="essay-card">
          <div>
            <div class="abstract-container">
              <div class="quants-cluster-abstract">
                <div class="cluster-circle circle-math">MATH</div>
                <div class="cluster-circle circle-ml">ML/AI</div>
                <div class="cluster-circle circle-phys">PHYS</div>
                <div class="cluster-circle circle-cloud">CLOUD</div>
              </div>
            </div>
            <span class="tech-label">CLUSTERING // QUANT_CAREERS</span>
            <div class="essay-title">The Language of Quants</div>
            <p>
              A cluster visualization of job descriptions for quantitative roles over the last decade, showing the shift from pure mathematics and physics PhD requirements to a heavy bias toward machine learning and cloud infrastructure skills.
            </p>
          </div>
          <div class="essay-meta">
            Status: <span>DRAFT</span> // NLP + D3 Force
          </div>
        </div>

        <!-- Essay Card 4 -->
        <div class="essay-card">
          <div>
            <div class="abstract-container">
              <div class="matrix-heatmap-abstract">
                <div class="matrix-cell corr-high"></div>
                <div class="matrix-cell corr-mid"></div>
                <div class="matrix-cell corr-low"></div>
                <div class="matrix-cell corr-mid"></div>
                <div class="matrix-cell corr-low"></div>
                <div class="matrix-cell corr-high"></div>
                
                <div class="matrix-cell corr-mid"></div>
                <div class="matrix-cell corr-high"></div>
                <div class="matrix-cell corr-mid"></div>
                <div class="matrix-cell corr-low"></div>
                <div class="matrix-cell corr-high"></div>
                <div class="matrix-cell corr-mid"></div>
                
                <div class="matrix-cell corr-low"></div>
                <div class="matrix-cell corr-mid"></div>
                <div class="matrix-cell corr-high"></div>
                <div class="matrix-cell corr-high"></div>
                <div class="matrix-cell corr-mid"></div>
                <div class="matrix-cell corr-low"></div>
                
                <div class="matrix-cell corr-high"></div>
                <div class="matrix-cell corr-low"></div>
                <div class="matrix-cell corr-mid"></div>
                <div class="matrix-cell corr-high"></div>
                <div class="matrix-cell corr-low"></div>
                <div class="matrix-cell corr-high"></div>
              </div>
            </div>
            <span class="tech-label">HEATMAP // PORTFOLIO_THEORY</span>
            <div class="essay-title">The Correlation Matrix of Everything</div>
            <p>
              An interactive heatmap showing how the correlation between seemingly unrelated assets (e.g., crypto, commodities, tech stocks) has tightened over the last decade due to multi-asset risk-parity algorithms.
            </p>
          </div>
          <div class="essay-meta">
            Status: <span>DRAFT</span> // WebGL Heatmaps
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- READING LIST TAB PANEL -->
  <div class="tab-content-panel {activeTab === 'reading' ? 'active' : ''}" id="reading">
    <div style="max-width: var(--max-width); margin: 0 auto;">
      <!-- Minimal Header -->
      <span class="tech-label">ARCHIVE // READING LIST</span>
      <h2 style="margin-top: 0; margin-bottom: 2rem;">Reading List</h2>

      <!-- Figma/Apple Controls Panel -->
      <div class="controls-panel">
        <div class="filter-group">
          <span class="filter-label">Genre:</span>
          <button class="chip {selectedGenre === 'all' ? 'active' : ''}" onclick={() => selectedGenre = 'all'}>All</button>
          <button class="chip {selectedGenre === 'sci-fi' ? 'active' : ''}" onclick={() => selectedGenre = 'sci-fi'}>Sci-Fi</button>
          <button class="chip {selectedGenre === 'fantasy' ? 'active' : ''}" onclick={() => selectedGenre = 'fantasy'}>Fantasy</button>
          <button class="chip {selectedGenre === 'non-fiction' ? 'active' : ''}" onclick={() => selectedGenre = 'non-fiction'}>Non-Fiction</button>
          <button class="chip {selectedGenre === 'biography' ? 'active' : ''}" onclick={() => selectedGenre = 'biography'}>Biography</button>
        </div>
        
        <div class="filter-group">
          <span class="filter-label">Sort:</span>
          <select class="select-sort" bind:value={ratingSortOrder}>
            <option value="desc">Rating: High to Low</option>
            <option value="asc">Rating: Low to High</option>
          </select>
          
          <button class="btn" onclick={fetchBooks} disabled={fetchStatus === 'loading'} style="margin-left: 0.5rem; padding: 0.35rem 0.75rem;">
            {#if fetchStatus === 'loading'}
              Syncing...
            {:else}
              Sync
            {/if}
          </button>
        </div>
      </div>

      {#if fetchStatus === 'loading'}
        <div style="text-align: center; padding: 5rem 0; font-family: var(--font-mono); color: var(--gold);">
          <div style="margin-bottom: 1rem;">[CONNECTING_TO_AIRTABLE]</div>
          <p style="font-size: 0.85rem; color: var(--text-dim);">Downloading indices...</p>
        </div>
      {:else}
        {#if fetchStatus === 'error'}
          <div class="card" style="border-color: red; padding: 2.5rem; text-align: center;">
            <span class="tech-label" style="color: red;">TRANSMISSION_ERROR</span>
            <p style="margin-top: 0.5rem; color: var(--text-main);">
              Failed to connect to the books database. Check token status or reload.
            </p>
            <button class="btn" onclick={fetchBooks} style="margin-top: 1rem;">Retry Sync</button>
          </div>
        {:else}
          <div class="books-container" style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
            <table class="books-table">
              <thead>
                <tr>
                  <th style="width: 48%;">Title</th>
                  <th style="width: 25%;">Author</th>
                  <th style="width: 15%;">Genre</th>
                  <th style="width: 12%; text-align: right;">Rating</th>
                </tr>
              </thead>
              <tbody>
                {#each filteredBooks as book}
                  <tr>
                    <td class="title">{book.fields.Title || 'Unknown Title'}</td>
                    <td>{book.fields.Author || 'Unknown Author'}</td>
                    <td>
                      {#if book.fields.Genre && book.fields.Genre.length > 0}
                        {#each book.fields.Genre as genre}
                          <span class="genre-tag">
                            {genre}
                            <span 
                              class="genre-dot" 
                              style="background-color: {genreColorDictionary[genre.trim().toLowerCase()] || 'gray'}"
                            ></span>
                          </span>
                        {/each}
                      {:else}
                        <span class="genre-tag">UNASSIGNED <span class="genre-dot" style="background-color: gray;"></span></span>
                      {/if}
                    </td>
                    <td style="text-align: right;">
                      {#if book.fields.Rating}
                        <span class="rating-badge">{book.fields.Rating}</span>
                      {:else}
                        <span style="color: var(--text-dim);">--</span>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</main>

<!-- Footer -->
<footer>
  <div class="footer-container">
    <div class="footer-content">
      <div>© {new Date().getFullYear()} drew.fun // ALL TRANSMISSIONS LOGGED</div>
      <div style="color: var(--gold); font-size: 0.65rem; font-family: var(--font-mono);">
        DESIGN_INFLUENCE // MIDJOURNEY_MEDICAL // SVELTE_5_ACTIVE
      </div>
    </div>
  </div>
</footer>
