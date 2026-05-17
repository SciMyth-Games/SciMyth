/* ============================================
   SciMyth Games — Main JavaScript
   Full-Cycle Game Development Outsourcing
   ============================================ */

// ─── Starfield Canvas ───────────────────────────────
class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.nebulae = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.height = this.canvas.height = this.canvas.parentElement.offsetHeight;
  }

  init() {
    this.stars = [];
    const starCount = Math.min(Math.floor((this.width * this.height) / 2500), 500);
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: this.getStarColor(),
        parallaxFactor: Math.random() * 0.5 + 0.1,
      });
    }

    this.nebulae = [
      { x: this.width * 0.2, y: this.height * 0.3, radius: 300, color: 'rgba(0, 229, 255, 0.015)' },
      { x: this.width * 0.8, y: this.height * 0.6, radius: 350, color: 'rgba(255, 179, 0, 0.012)' },
      { x: this.width * 0.5, y: this.height * 0.8, radius: 250, color: 'rgba(224, 64, 251, 0.01)' },
    ];
  }

  getStarColor() {
    const colors = [
      '255, 255, 255',
      '200, 230, 255',
      '255, 240, 220',
      '180, 220, 255',
      '0, 229, 255',
      '255, 179, 0',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });

    document.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX / this.width - 0.5) * 2;
      this.mouseY = (e.clientY / this.height - 0.5) * 2;
    });

    setInterval(() => {
      if (Math.random() > 0.6) {
        this.shootingStars.push({
          x: Math.random() * this.width,
          y: 0,
          length: Math.random() * 120 + 60,
          speed: Math.random() * 8 + 5,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          life: 0,
        });
      }
    }, 3000);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const n of this.nebulae) {
      const gradient = this.ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
      gradient.addColorStop(0, n.color);
      gradient.addColorStop(1, 'transparent');
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    const time = Date.now() * 0.001;
    for (const star of this.stars) {
      const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.3 + 0.7;
      const px = star.x + this.mouseX * star.parallaxFactor * 15;
      const py = star.y + this.mouseY * star.parallaxFactor * 15;

      this.ctx.beginPath();
      this.ctx.arc(px, py, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${star.color}, ${star.opacity * twinkle})`;
      this.ctx.fill();

      if (star.radius > 1.2) {
        this.ctx.beginPath();
        this.ctx.arc(px, py, star.radius * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${star.color}, ${star.opacity * twinkle * 0.08})`;
        this.ctx.fill();
      }
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life += 1;
      s.opacity = Math.max(0, 1 - s.life / 60);

      if (s.opacity <= 0 || s.x > this.width || s.y > this.height) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const gradient = this.ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(s.x, s.y);
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ─── Navbar Scroll Effect ────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click (for non-dropdown links)
    navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── Scroll Reveal ───────────────────────────────────
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ─── Counter Animation ──────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ─── 3D Tilt Effect for Cards ──────────────────
function initTiltCards() {
  const cards = document.querySelectorAll('.game-card, .service-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -8;
      const tiltY = (x - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── Game Modal ─────────────────────────────────────
function initModals() {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;

  document.querySelectorAll('[data-game]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const gameId = trigger.dataset.game;
      populateModal(gameId);
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.querySelector('.modal-close')?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ─── Game Data ──────────────────────────────────────
const gamesData = {
  bubbleboom: {
    title: 'BubbleBoom',
    genre: 'Arcade • Casual',
    platform: 'WebGL / Browser',
    engine: 'Unity',
    year: '2024',
    team: 'Solo Development',
    description: 'A fast-paced arcade bubble shooter where strategy meets reflexes. Chain combos to create massive explosions and climb the leaderboard. Built as a browser-based game jam entry.',
    tags: ['Arcade', 'Casual'],
    category: 'jam',
    links: {
      itch: 'https://gamedev-adityajeet.itch.io/bubbleboom'
    }
  },
  realityrun: {
    title: 'Reality Run',
    genre: 'Endless Runner • Action',
    platform: 'PC',
    engine: 'Unreal Engine 5',
    year: '2024',
    team: 'Solo Development',
    description: 'An adrenaline-pumping endless runner built with Unreal Engine 5 and Blueprints. Dodge obstacles, collect power-ups, and push your limits in stunning environments.',
    tags: ['Action', 'Runner'],
    category: 'pc',
    links: {}
  },
  paintrunner: {
    title: 'Paint Runner',
    genre: 'Platformer • Casual',
    platform: 'Mobile / PC',
    engine: 'Unity',
    year: '2024',
    team: 'Team of 2',
    description: 'A colorful platformer where you paint the world as you run. Navigate tricky levels, unlock new colors, and create art through gameplay.',
    tags: ['Platformer', 'Mobile'],
    category: 'mobile',
    links: {}
  },
  realmrivals: {
    title: 'Realm Rivals',
    genre: 'Strategy • Multiplayer',
    platform: 'PC',
    engine: 'Unity',
    year: '2024',
    team: 'Team of 2',
    description: 'A competitive strategy game where mythic realms clash for dominance. Build armies, forge alliances, and conquer enemy territories in real-time battles.',
    tags: ['Strategy', 'Multiplayer'],
    category: 'pc',
    links: {}
  },
  indravsvritrasur: {
    title: 'Legend of Indra vs Vritrasur',
    genre: 'Action RPG • Mythology',
    platform: 'PC',
    engine: 'Unity',
    year: '2024',
    team: 'Solo Development',
    description: 'An epic action RPG inspired by ancient Vedic mythology. Play as Indra, the king of gods, and battle the mighty dragon Vritrasur in an unforgettable quest filled with divine weapons and cosmic battles.',
    tags: ['RPG', 'Mythology'],
    category: 'pc',
    links: {}
  },
  thelostcure: {
    title: 'The Lost Cure',
    genre: 'Survival Horror • Adventure',
    platform: 'PC',
    engine: 'Unity',
    year: '2024',
    team: 'Solo Development',
    description: 'A chilling survival horror experience. Navigate a quarantined research facility, solve puzzles, and uncover the mystery behind a devastating outbreak before it\'s too late.',
    tags: ['Horror', 'Adventure'],
    category: 'pc',
    links: {}
  },
  theshooter: {
    title: 'The Shooter',
    genre: 'FPS • Action',
    platform: 'PC',
    engine: 'Unity',
    year: '2024',
    team: 'Solo Development',
    description: 'An intense first-person shooter with tight gunplay and engaging level design. Take down enemies across diverse environments in this action-packed experience.',
    tags: ['FPS', 'Action'],
    category: 'pc',
    links: {}
  }
};

function populateModal(gameId) {
  const game = gamesData[gameId];
  if (!game) return;

  const modal = document.querySelector('.modal');
  if (!modal) return;

  modal.querySelector('.modal-game-title').textContent = game.title;
  modal.querySelector('.modal-genre').textContent = game.genre;
  modal.querySelector('.modal-desc').textContent = game.description;

  const metaItems = modal.querySelectorAll('.modal-meta-item');
  if (metaItems[0]) metaItems[0].querySelector('.meta-value').textContent = game.platform;
  if (metaItems[1]) metaItems[1].querySelector('.meta-value').textContent = game.engine;
  if (metaItems[2]) metaItems[2].querySelector('.meta-value').textContent = game.year;
  if (metaItems[3]) metaItems[3].querySelector('.meta-value').textContent = game.team;

  const actionsContainer = modal.querySelector('.modal-actions');
  if (actionsContainer) {
    actionsContainer.innerHTML = '';
    if (game.links.itch) {
      actionsContainer.innerHTML += `<a href="${game.links.itch}" target="_blank" rel="noopener" class="btn btn-primary">Play on itch.io ↗</a>`;
    }
    if (game.links.github) {
      actionsContainer.innerHTML += `<a href="${game.links.github}" target="_blank" rel="noopener" class="btn btn-secondary">GitHub ↗</a>`;
    }
    if (game.links.download) {
      actionsContainer.innerHTML += `<a href="${game.links.download}" target="_blank" rel="noopener" class="btn btn-gold">Download ↗</a>`;
    }
    if (!actionsContainer.innerHTML) {
      actionsContainer.innerHTML = `<span class="btn btn-outline" style="cursor: default; opacity: 0.5">Coming Soon</span>`;
    }
  }
}

// ─── Games / Portfolio Filter ───────────────────────
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      filterBtns.forEach(b => {
        if (b !== btn) b.setAttribute('aria-pressed', 'false');
      });

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s var(--ease-out) both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ─── FAQ / Career Accordion ──────────────────────────
function initAccordion() {
  // FAQ items
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // Career cards
  const careerCards = document.querySelectorAll('.career-card');
  careerCards.forEach(card => {
    const header = card.querySelector('.career-header');
    header?.addEventListener('click', () => {
      const wasActive = card.classList.contains('active');
      careerCards.forEach(c => c.classList.remove('active'));
      if (!wasActive) card.classList.add('active');
    });
  });
}

// ─── Testimonial Slider ─────────────────────────────
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!slider || !dots.length) return;

  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoPlayTimer;

  function goToSlide(index) {
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoPlay();
    });
  });

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  // Touch support
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(Math.min(currentSlide + 1, totalSlides - 1));
      } else {
        goToSlide(Math.max(currentSlide - 1, 0));
      }
      resetAutoPlay();
    }
  }, { passive: true });

  resetAutoPlay();
}

// ─── Back to Top Button ─────────────────────────────
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Contact Form Validation ────────────────────────
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const projectType = form.querySelector('#project-type')?.value;
    const message = form.querySelector('#message')?.value.trim();

    let valid = true;
    form.querySelectorAll('.form-error').forEach(el => el.remove());

    if (!name) { showError(form.querySelector('#name'), 'Name is required'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError(form.querySelector('#email'), 'Valid email is required'); valid = false; }
    if (!projectType) { showError(form.querySelector('#project-type'), 'Select a project type'); valid = false; }
    if (!message) { showError(form.querySelector('#message'), 'Message is required'); valid = false; }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });
}

function showError(input, message) {
  if (!input) return;
  const error = document.createElement('div');
  error.className = 'form-error';
  error.style.cssText = 'color: #ff5252; font-size: 0.78rem; margin-top: 6px; font-weight: 500;';
  error.textContent = message;
  input.parentElement.appendChild(error);
  input.style.borderColor = '#ff5252';
  input.addEventListener('focus', () => {
    input.style.borderColor = '';
    error.remove();
  }, { once: true });
}

// ─── Newsletter Form ────────────────────────────────
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (input && input.value.trim()) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  });
}

// ─── Smooth Scroll for Anchor Links ─────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── Initialize Everything ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Starfield
  const heroCanvas = document.querySelector('.hero-canvas');
  if (heroCanvas) {
    new Starfield(heroCanvas);
  }

  initNavbar();
  initScrollReveal();
  initCounters();
  initTiltCards();
  initModals();
  initFilter();
  initAccordion();
  initTestimonialSlider();
  initBackToTop();
  initContactForm();
  initNewsletter();
  initSmoothScroll();
});
