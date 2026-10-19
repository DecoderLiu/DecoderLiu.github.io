(() => {
  // Preserve shared links to sections that used to live on the homepage.
  const followMovedSection = () => {
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const destination = document.getElementById(id)?.dataset.movedTo;
    if (destination) window.location.replace(destination);
  };
  window.addEventListener('hashchange', followMovedSection);
  followMovedSection();
})();
