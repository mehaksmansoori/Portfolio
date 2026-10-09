const menuButton = document.querySelector('.mobile-menu');
const menu = document.querySelector('.nav-menu');
function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMenu(); menuButton.focus(); }
});
window.addEventListener('resize', () => { if (window.innerWidth > 1050) closeMenu(); });
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => closeMenu());
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
}
const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
  let current = sections[0].id;
  sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) current = section.id; });
  document.querySelectorAll('.nav-link').forEach(link => {
    const active = link.hash === '#' + current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { passive: true });
document.querySelector('.contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const data = new FormData(this);
  const body = `${data.get('message')}\n\nFrom: ${data.get('name')}\nEmail: ${data.get('email')}`;
  window.location.href = `mailto:mehak076bteceai23@igdtuw.ac.in?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(body)}`;
});
