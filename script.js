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
  const recipient = 'mehak076bteceai23@igdtuw.ac.in';
  const subject = String(data.get('subject')).trim();
  const body = `${String(data.get('message')).trim()}\r\n\r\nFrom: ${String(data.get('name')).trim()}\r\nEmail: ${String(data.get('email')).trim()}`;
  const status = document.querySelector('#draft-status');
  if (data.get('draft-provider') === 'gmail') {
    const params = new URLSearchParams({ view: 'cm', fs: '1', to: recipient, su: subject, body });
    const draft = window.open(`https://mail.google.com/mail/?${params}`, '_blank');
    if (draft) {
      draft.opener = null;
      status.textContent = 'Gmail opened in a new tab. Sign in if needed, then review and send your draft. Your message has not been sent yet.';
    } else {
      status.textContent = 'The browser blocked the new tab. Allow pop-ups for this site and try again, or choose your email app. Your entries are still here.';
    }
  } else {
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'An email-app draft was requested. If nothing opened, choose Gmail instead. Your message has not been sent yet.';
  }
});
