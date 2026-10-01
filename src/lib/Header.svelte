<script>
  import ScrollProgress from './ScrollProgress.svelte';
  import { isActive } from './router.svelte.js';

  const links = [
    { href: '/', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/reading', label: 'Reading' },
  ];
</script>

<ScrollProgress />

<a href="#main" class="skip">Skip to content</a>

<header class="site-header no-print">
  <div class="nav-bar">
    <a href="/" class="brand">Drew Pilat</a>
    <nav class="site-nav" aria-label="Primary">
      {#each links as link (link.href)}
        <a href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
          {link.label}
        </a>
      {/each}
    </nav>
    <a href="mailto:dpilat@uchicago.edu" class="nav-mail">Email</a>
  </div>
</header>
