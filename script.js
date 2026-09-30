// Nav: rand bij scrollen
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Mobiel menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.mobile-menu');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.hidden = open;
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  menu.hidden = true;
}));

// Reveal bij scrollen
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

// Tellers in de stats-balk
const counters = document.querySelectorAll('[data-count]');
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countIO.observe(c));

// Jaartal in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contactformulier: opent e-mailprogramma (vervang later door echte backend, bv. Formspree)
// openMail staat op window zodat tests hem kunnen vervangen
window.openMail = window.openMail || (url => { window.location.href = url; });

function handleSubmit(e) {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent(`Kennismaking aanvraag — ${f.naam.value}`);
  const body = encodeURIComponent(`Naam: ${f.naam.value}\nE-mail: ${f.email.value}\n\n${f.bericht.value}`);
  window.openMail(`mailto:info@sill-vyan.nl?subject=${subject}&body=${body}`);
  f.querySelector('.form-note').hidden = false;
  return false;
}
