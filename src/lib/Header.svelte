<script>
  import { isActive } from './router.svelte.js';
  import Clock from './Clock.svelte';
  import ScrollProgress from './ScrollProgress.svelte';

  const links = [
    { href: '/', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/reading', label: 'Reading' },
  ];
</script>

<ScrollProgress />

<a href="#main" class="skip">Skip to content</a>

<header class="site-header no-print">
  <div class="header-inner">
    <a href="/" class="brand">Drew</a>
    <nav class="site-nav" aria-label="Primary">
      {#each links as link (link.href)}
        <a href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
          {link.label}
        </a>
      {/each}
    </nav>
    <div class="header-end">
      <Clock />
    </div>
  </div>
</header>
