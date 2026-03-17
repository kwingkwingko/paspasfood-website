// ============================================
// PaspasFood Website — Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── App Screenshot Theme Toggle (Light/Dark) ──
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('pf-screenshot-theme') || 'dark';
    applyScreenshotTheme(savedTheme);
    updateToggleIcon(themeToggle, savedTheme);

    themeToggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-screenshot-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyScreenshotTheme(next);
      updateToggleIcon(themeToggle, next);
      localStorage.setItem('pf-screenshot-theme', next);
    });
  }

  function applyScreenshotTheme(theme) {
    document.body.setAttribute('data-screenshot-theme', theme);
    document.querySelectorAll('img[data-dark][data-light]').forEach(img => {
      img.src = 'img/' + img.getAttribute('data-' + theme);
    });
  }

  function updateToggleIcon(btn, theme) {
    const icon = btn.querySelector('.theme-icon');
    const label = btn.querySelector('.theme-label');
    if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }
});
