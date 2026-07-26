// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Navbar: scrolled state + mobile toggle
// ============================================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function setNavScrolled() {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
}
setNavScrolled();
window.addEventListener('scroll', setNavScrolled, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Scroll progress bar
// ============================================================
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ============================================================
// Active nav link on scroll (scrollspy)
// ============================================================
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(section => spyObserver.observe(section));

// ============================================================
// Scroll reveal (fade-up)
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

// ============================================================
// Animated stat counters
// ============================================================
const statNumbers = document.querySelectorAll('.hero-stat-num');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10) || 0;
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNumbers.forEach(animateCount);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const heroStats = document.getElementById('heroStats');
if (heroStats) statsObserver.observe(heroStats);

// ============================================================
// Typing effect in hero code editor
// ============================================================
const typedCodeEl = document.getElementById('typedCode');

const codeLines = [
  'const developer = {',
  '  name: "Mirza Arsalan",',
  '  role: "Front-End Developer",',
  '  status: "CS Student",',
  '  stack: ["HTML", "CSS", "JS"],',
  '  learning: "React",',
  '  openTo: "Internships"',
  '};',
];

function typeCode() {
  if (!typedCodeEl) return;
  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function typeChar() {
    if (lineIndex >= codeLines.length) return;
    const currentLine = codeLines[lineIndex];

    if (charIndex < currentLine.length) {
      output += currentLine[charIndex];
      charIndex++;
      typedCodeEl.textContent = output;
      setTimeout(typeChar, 18 + Math.random() * 22);
    } else {
      output += '\n';
      lineIndex++;
      charIndex = 0;
      typedCodeEl.textContent = output;
      setTimeout(typeChar, 120);
    }
  }
  typeChar();
}

const typeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeCode();
      typeObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

if (typedCodeEl) typeObserver.observe(typedCodeEl);

// ============================================================
// Scroll to top button
// ============================================================
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 480);
}
window.addEventListener('scroll', toggleScrollTop, { passive: true });
toggleScrollTop();

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
