/**
 * Minimal history-based router.
 *
 * Vercel rewrites every unknown path to index.html (see vercel.json), so deep
 * links like /projects/lavamesh land here and resolve client-side.
 */

const normalize = (p) => {
  const trimmed = p.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

let path = $state(normalize(window.location.pathname));

if (window.location.hash) {
  requestAnimationFrame(() => {
    document.querySelector(window.location.hash)?.scrollIntoView();
  });
}

export const route = {
  get path() {
    return path;
  },
};

function apply(url, { replace = false } = {}) {
  const next = normalize(url.pathname);
  const dest = `${url.pathname}${url.hash}`;
  if (replace) history.replaceState({}, '', dest);
  else if (`${window.location.pathname}${window.location.hash}` !== dest) {
    history.pushState({}, '', dest);
  }
  path = next;
  if (url.hash) {
    requestAnimationFrame(() => {
      document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' });
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

export function navigate(to, opts = {}) {
  const url = new URL(to, window.location.origin);
  if (normalize(url.pathname) === path && !url.hash) return;
  apply(url, opts);
}

window.addEventListener('popstate', () => {
  path = normalize(window.location.pathname);
});

window.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const anchor = e.target.closest?.('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
  if (href.startsWith('#')) return;
  if (!href.startsWith('/') || href.startsWith('//')) return;
  e.preventDefault();
  navigate(href);
});

export function isActive(prefix) {
  if (prefix === '/') return path === '/';
  return path === prefix || path.startsWith(`${prefix}/`);
}
