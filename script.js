const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-links a')];

toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the bottom-nav item that matches the section currently on screen.
const sections = [
  document.getElementById('home'),
  document.getElementById('journey'),
  document.getElementById('skills'),
  document.getElementById('contact')
].filter(Boolean);

const setActive = (id) => {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

setActive('home');

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

  if (visible.length) setActive(visible[0].target.id);
}, {
  root: null,
  rootMargin: '-20% 0px -55% 0px',
  threshold: [0.05, 0.2, 0.5, 0.8]
});

sections.forEach(section => observer.observe(section));
