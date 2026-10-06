/* Apply the preference before rendering; no storage is required to use the toggle. */
(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('mz-theme'); } catch (_) { /* Storage may be disabled. */ }
  if (preference !== 'light' && preference !== 'dark') preference = null;
  const apply = theme => {
    root.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const dark = theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.querySelector('.theme-label').textContent = dark ? 'Day mode' : 'Night mode';
    button.querySelector('.theme-symbol').textContent = dark ? '☀' : '☾';
    button.hidden = false;
  };
  apply(preference || (media.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('mz-theme', preference); } catch (_) { /* Keep the in-memory choice. */ }
      apply(preference);
    });
  });
  media.addEventListener('change', event => { if (!preference) apply(event.matches ? 'dark' : 'light'); });
})();
