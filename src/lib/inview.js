/** Adds class "in" the first time the element scrolls into view, so CSS can run an entrance animation once. */
export function inview(node, threshold = 0.25) {
  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('in');
    return {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          node.classList.add('in');
          io.disconnect();
        }
      }
    },
    { threshold },
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}
