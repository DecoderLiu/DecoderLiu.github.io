(() => {
  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-navigation');
  if (!button || !nav) return;

  const header = button.closest('header');
  const mobile = window.matchMedia('(max-width: 880px)');
  const updateHeaderOffset = () => {
    document.documentElement.style.setProperty('--header-offset', `${header.getBoundingClientRect().height + 16}px`);
  };
  const close = () => {
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    updateHeaderOffset();
  };

  button.hidden = false;
  header.setAttribute('data-nav-enhanced', '');
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    updateHeaderOffset();
  });

  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && button.getAttribute('aria-expanded') === 'true') {
      close();
      button.focus();
    }
  });

  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    close();
    // Move keyboard focus to the destination before hiding its navigation link.
    const url = new URL(link.href, window.location.href);
    if (url.origin === location.origin && url.pathname === location.pathname && url.hash) {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (target) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });

  mobile.addEventListener('change', () => {
    if (mobile.matches && nav.contains(document.activeElement)) button.focus();
    if (!mobile.matches && document.activeElement === button) nav.querySelector('a')?.focus();
    close();
  });
  if ('ResizeObserver' in window) new ResizeObserver(updateHeaderOffset).observe(header);
  updateHeaderOffset();
})();
