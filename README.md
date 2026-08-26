# drew.fun

Personal site. Svelte 5 + Vite, deployed on Vercel.

```bash
npm install
npm run dev
```

Routes are client-side (`src/lib/router.svelte.js`). `vercel.json` rewrites unknown paths to `index.html` so `/projects/lavamesh` works on a hard refresh.

The reading list is an Airtable fetch. Credentials live in Vercel env (`VITE_AIRTABLE_*`), not in the repo.
