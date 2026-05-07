/* =============================================
   PARAS MOHAN — PORTFOLIO SCRIPT
============================================= */

// ── Custom Cursor ──────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let rx = mx, ry = my;

// Instantly move dot to mouse
document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

// Ring follows with smooth lag
(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = Math.round(rx) + 'px';
  ring.style.top = Math.round(ry) + 'px';
  requestAnimationFrame(animateRing);
})();

// Scale up on hover
document.querySelectorAll('a, button, .proj-card, .tl-card, .stat-card, .edu-card, .chip').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
    cursor.style.background = '#00d4ff';
    ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    ring.style.borderColor = 'rgba(0,212,255,1)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = '#ffffff';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(255,255,255,0.7)';
  });
});

// ── Nav Scroll ─────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// ── Smooth Nav Links ───────────────────────
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Active Nav ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(l => {
    l.style.color = l.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}

// ── Scroll Reveal ──────────────────────────
const revealTargets = document.querySelectorAll(
  '.about-grid, .timeline-item, .edu-card, .proj-card, .skill-group, .contact-card, .contact-form, .stat-card, .aws-services, .coursework-strip'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 0);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Staggered reveals for grids
function staggerReveal(selector, delay = 80) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll(selector);
        children.forEach((child, i) => {
          child.classList.add('reveal');
          setTimeout(() => child.classList.add('visible'), i * delay);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  return obs;
}

// Stagger proj cards
const projGrid = document.querySelector('.projects-grid');
if (projGrid) {
  const pObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.proj-card').forEach((card, i) => {
          setTimeout(() => { card.classList.add('reveal'); card.classList.add('visible'); }, i * 100);
        });
        pObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  pObs.observe(projGrid);
}

// ── Skill Bar Animate ──────────────────────
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.sk-fill').forEach((bar, i) => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, i * 80 + 200);
        });
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  skillObs.observe(skillsSection);
}

// ── Role Typewriter ────────────────────────
const roles = ['DevOps Engineer', 'Cloud Enthusiast', 'Docker Expert', 'WordPress Dev', 'Linux Sysadmin'];
let roleIdx = 0;
const roleEl = document.getElementById('role-text');

function typeRole() {
  const next = roles[roleIdx % roles.length];
  let i = 0;
  roleEl.textContent = '';
  const typing = setInterval(() => {
    roleEl.textContent += next[i];
    i++;
    if (i === next.length) {
      clearInterval(typing);
      setTimeout(() => {
        eraseRole();
      }, 2000);
    }
  }, 80);
}

function eraseRole() {
  let text = roleEl.textContent;
  const erasing = setInterval(() => {
    text = text.slice(0, -1);
    roleEl.textContent = text;
    if (text.length === 0) {
      clearInterval(erasing);
      roleIdx++;
      setTimeout(typeRole, 300);
    }
  }, 40);
}

setTimeout(typeRole, 1200);

// ── Form Submit ────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.submit-btn');
  const success = document.getElementById('form-success');
  btn.querySelector('span').textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    e.target.reset();
    btn.querySelector('span').textContent = 'Send Message';
    btn.disabled = false;
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1400);
}

// ── Chip hover glow ────────────────────────
document.querySelectorAll('.chip.aws').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.boxShadow = '0 0 16px rgba(255,153,0,0.2)';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.boxShadow = '';
  });
});

// ── Page Load ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);   
});