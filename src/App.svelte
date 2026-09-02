<script>
  import { route } from './lib/router.svelte.js';
  import Header from './lib/Header.svelte';
  import Footer from './lib/Footer.svelte';
  import About from './pages/About.svelte';
  import Projects from './pages/Projects.svelte';
  import LavaMesh from './pages/LavaMesh.svelte';
  import Wellnest from './pages/Wellnest.svelte';
  import AgentCivilizations from './pages/AgentCivilizations.svelte';
  import Reading from './pages/Reading.svelte';
  import NotFound from './pages/NotFound.svelte';

  const routes = {
    '/': { component: About, title: 'Drew Pilat — Software Engineer' },
    '/projects': { component: Projects, title: 'Projects — Drew Pilat' },
    '/projects/lavamesh': { component: LavaMesh, title: 'LavaMesh — Drew Pilat' },
    '/projects/wellnest': { component: Wellnest, title: 'Wellnest — Drew Pilat' },
    '/projects/agent-civilizations': { component: AgentCivilizations, title: 'Agent Civilizations — Drew Pilat' },
    '/reading': { component: Reading, title: 'Reading — Drew Pilat' },
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
