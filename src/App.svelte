<script>
  import { route } from './lib/router.svelte.js';
  import Header from './lib/Header.svelte';
  import Footer from './lib/Footer.svelte';
  import About from './pages/About.svelte';
  import Projects from './pages/Projects.svelte';
  import LavaMesh from './pages/LavaMesh.svelte';
  import LavaMoney from './pages/LavaMoney.svelte';
  import Wellnest from './pages/Wellnest.svelte';
  import AgentCivilizations from './pages/AgentCivilizations.svelte';
  import Microsecond from './pages/Microsecond.svelte';
  import Reading from './pages/Reading.svelte';
  import DraftTheme from './pages/DraftTheme.svelte';
  import NotFound from './pages/NotFound.svelte';

  const routes = {
    '/': { component: About, title: 'Drew Pilat' },
    '/projects': { component: Projects, title: 'Projects — Drew Pilat' },
    '/projects/lavamesh': { component: LavaMesh, title: 'LavaMesh — Drew Pilat' },
    '/projects/lavamoney': { component: LavaMoney, title: 'LavaMoney — Drew Pilat' },
    '/projects/wellnest': { component: Wellnest, title: 'Wellnest — Drew Pilat' },
    '/projects/agent-civilizations': { component: AgentCivilizations, title: 'Agent Civilizations — Drew Pilat' },
    '/projects/microsecond': { component: Microsecond, title: 'The Anatomy of a Microsecond — Drew Pilat' },
    '/reading': { component: Reading, title: 'Reading — Drew Pilat' },
    '/draft-theme': { component: DraftTheme, title: 'Draft theme comparison' },
  };

  let match = $derived(routes[route.path] ?? { component: NotFound, title: 'Not found — Drew Pilat' });
  let Page = $derived(match.component);

  $effect(() => {
    document.title = match.title;
  });
</script>

<Header />

<main id="main">
  {#key route.path}
    <Page />
  {/key}
</main>

<Footer />
