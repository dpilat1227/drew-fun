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

export const route = {
  get path() {
    return path;
  },
};

export function navigate(to, { replace = false } = {}) {
  const next = normalize(to);
  if (next === path) return;
  if (replace) history.replaceState({}, '', next);
  else history.pushState({}, '', next);
  path = next;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('popstate', () => {
  path = normalize(window.location.pathname);
});

/**
 * Intercepts same-origin left-clicks so internal <a href> links route without a
 * full page load, while modifier-clicks and external links behave normally.
 */
window.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const anchor = e.target.closest?.('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
  if (!href.startsWith('/') || href.startsWith('//')) return;
  e.preventDefault();
  navigate(href);
});

export function isActive(prefix) {
  if (prefix === '/') return path === '/';
  return path === prefix || path.startsWith(`${prefix}/`);
}
