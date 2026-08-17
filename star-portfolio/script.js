/* =========================================================
   STAR · PORTFOLIO SCRIPT
   Mobile nav · smooth scroll · scroll reveal · skill bars
   active nav highlight · sticky navbar shadow · back-to-top
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Sticky navbar shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Back-to-top button ---------- */
  const toTop = document.getElementById('toTop');
  const onScrollTop = () => {
    toTop.classList.toggle('show', window.scrollY > 480);
  };
  window.addEventListener('scroll', onScrollTop, { passive: true });
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const skillBars  = document.querySelectorAll('.skill-bar');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        /* animate skill bars once their section is visible */
        if (entry.target.classList.contains('skills-grid')) {
          skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level') || '0';
            const fill = bar.querySelector('.skill-fill');
            if (fill) fill.style.width = level + '%';
          });
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Active nav-link highlight while scrolling ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navByHash = new Map();
  document.querySelectorAll('.nav-link').forEach(link => {
    navByHash.set(link.getAttribute('href'), link);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = navByHash.get('#' + entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Copy-to-clipboard on contact pills with data-copy ---------- */
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      const value = el.getAttribute('data-copy');
      if (!value || value.startsWith('[')) return; // skip unfilled placeholders
      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(value.replace(/[[\]]/g, ''));
      }
    });
  });

});
