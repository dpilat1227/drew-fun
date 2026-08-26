<script>
  const API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const TABLE_ID = import.meta.env.VITE_AIRTABLE_TABLE_ID;

  const genreColors = {
    'sci-fi': '#51FFAD',
    fantasy: '#BA7AFE',
    'non-fiction': '#FFCB43',
    mystery: '#3357FF',
    biography: '#FF33A1',
  };

  const genres = ['all', 'sci-fi', 'fantasy', 'non-fiction', 'biography'];

  let books = $state([]);
  let status = $state('loading');
  let genre = $state('all');
  let sort = $state('desc');

  let visible = $derived(
    books
      .filter((b) => {
        if (genre === 'all') return true;
        return (b.fields.Genre || []).map((g) => g.trim().toLowerCase()).includes(genre);
      })
      .sort((a, b) => {
        const ra = parseFloat(a.fields.Rating || 0);
        const rb = parseFloat(b.fields.Rating || 0);
        return sort === 'desc' ? rb - ra : ra - rb;
      })
  );

  async function load() {
    if (!API_TOKEN || !BASE_ID || !TABLE_ID) {
      status = 'unconfigured';
      return;
    }
    status = 'loading';
    try {
      let records = [];
      let offset = null;
      do {
        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}${offset ? `?offset=${offset}` : ''}`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        records = [...records, ...data.records];
        offset = data.offset;
      } while (offset);
      books = records;
      status = 'ready';
    } catch (e) {
      console.error(e);
      status = 'error';
    }
  }

  load();
</script>

<div class="page">
  <div class="wrap">
    <span class="tech-label">Archive // reading</span>
    <h1 style="font-size:clamp(1.9rem,4vw,2.6rem);">Reading list</h1>
    <p class="lead" style="max-width:52ch;margin-top:1rem;">
      Everything I've finished, rated honestly. Synced from a spreadsheet I actually keep up
      to date.
    </p>

    <div class="controls" style="margin-top:2.5rem;">
      <div class="control-group">
        <span class="control-label">Genre</span>
        {#each genres as g (g)}
          <button class="chip" aria-pressed={genre === g} onclick={() => (genre = g)}>
            {g === 'all' ? 'All' : g}
          </button>
        {/each}
      </div>

      <div class="control-group">
        <span class="control-label">Sort</span>
        <select class="select" bind:value={sort} aria-label="Sort by rating">
          <option value="desc">Rating ↓</option>
          <option value="asc">Rating ↑</option>
        </select>
        <button class="chip" onclick={load} disabled={status === 'loading'}>
          {status === 'loading' ? 'Syncing' : 'Sync'}
        </button>
      </div>
    </div>

    {#if status === 'loading'}
      <p class="mono" style="color:var(--text-4);padding:3rem 0;">Loading…</p>
    {:else if status === 'error'}
      <div class="card">
        <span class="tech-label" style="color:var(--red);">Sync failed</span>
        <p style="font-size:0.94rem;color:var(--text-3);">
          Couldn't reach the books database. This is a client-side fetch, so a network block
          or an expired token will do it.
        </p>
        <button class="btn" onclick={load} style="margin-top:0.5rem;">Retry</button>
      </div>
    {:else if status === 'unconfigured'}
      <div class="card">
        <span class="tech-label">Not configured</span>
        <p style="font-size:0.94rem;color:var(--text-3);margin:0;">
          The Airtable credentials aren't set in this environment, so there's nothing to show.
        </p>
      </div>
    {:else}
      <p class="mono" style="font-size:0.72rem;color:var(--text-4);margin-bottom:0.75rem;">
        {visible.length} of {books.length} books
      </p>
      <div class="books-scroll">
        <table class="books">
          <thead>
            <tr>
              <th style="width:46%;">Title</th>
              <th style="width:26%;">Author</th>
              <th style="width:16%;">Genre</th>
              <th style="width:12%;">Rating</th>
            </tr>
          </thead>
          <tbody>
            {#each visible as book (book.id)}
              <tr>
                <td class="book-title">{book.fields.Title || 'Untitled'}</td>
                <td>{book.fields.Author || '—'}</td>
                <td>
                  {#if book.fields.Genre?.length}
                    {#each book.fields.Genre as g}
                      <span class="genre">
                        {g}
                        <span class="genre-dot" style="background:{genreColors[g.trim().toLowerCase()] || '#5e5e66'}"></span>
                      </span>
                    {/each}
                  {:else}
                    <span class="genre">—</span>
                  {/if}
                </td>
                <td><span class="rating">{book.fields.Rating ?? '—'}</span></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>
