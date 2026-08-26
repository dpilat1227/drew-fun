<script>
  import { isActive } from './router.svelte.js';

  const links = [
    { href: '/', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/reading', label: 'Reading' },
  ];
</script>

<header class="site-header no-print">
  <div class="header-inner">
    <a href="/" class="brand">Drew Pilat</a>
    <nav class="site-nav" aria-label="Primary">
      {#each links as link (link.href)}
        <a href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
          {link.label}
        </a>
      {/each}
    </nav>
  </div>
</header>
