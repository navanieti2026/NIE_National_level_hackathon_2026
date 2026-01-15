/* =====================================================
   AVATAAR Hackathon - JavaScript
   ===================================================== */

// ==================== CONFIGURATION ====================
// Change this date to set the hackathon start date
const TARGET_DATE = new Date('2026-03-04T09:00:00');

// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');

function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll);

// ==================== MOBILE MENU TOGGLE ====================
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
let isMobileMenuOpen = false;

function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
  
  if (isMobileMenuOpen) {
    mobileMenu.classList.add('open');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.remove('open');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}

// ==================== SMOOTH SCROLLING ====================
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Close mobile menu if open
  if (isMobileMenuOpen) {
    toggleMobileMenu();
  }
}

// ==================== COUNTDOWN TIMER ====================
function updateCountdown() {
  const now = new Date().getTime();
  const target = TARGET_DATE.getTime();
  const difference = target - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  } else {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
  }
}

// Initialize countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== SCHEDULE DAY TABS ====================
let activeDay = 0;

function setActiveDay(dayIndex) {
  activeDay = dayIndex;
  
  // Update tab buttons
  const tabs = document.querySelectorAll('.day-tab');
  tabs.forEach((tab, index) => {
    if (index === dayIndex) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // Show/hide day events
  const dayEvents = document.querySelectorAll('.day-events');
  dayEvents.forEach((events, index) => {
    if (index === dayIndex) {
      events.classList.remove('hidden');
    } else {
      events.classList.add('hidden');
    }
  });
}

// ==================== FAQ ACCORDION ====================
function toggleFaq(trigger) {
  const faqItem = trigger.parentElement;
  const isOpen = faqItem.classList.contains('open');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('open');
  });
  
  // Open clicked item if it wasn't already open
  if (!isOpen) {
    faqItem.classList.add('open');
  }
}

// ==================== SECTION REVEAL ON SCROLL ====================
function revealSections() {
  const sections = document.querySelectorAll('.section-animate');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// ==================== PARTICLE BACKGROUND ====================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const colors = ['#00d4ff', '#8b5cf6', '#06b6d4', '#a855f7'];
const particleCount = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function drawGrid() {
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 50;

  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  drawGrid();
  
  // Update and draw particles
  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap around edges
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    // Draw particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Draw connections to nearby particles
    particles.slice(index + 1).forEach(other => {
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = particle.color;
        ctx.globalAlpha = (1 - distance / 150) * 0.2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  });

  requestAnimationFrame(animateParticles);
}

// Initialize particles
resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

// ==================== INITIAL SETUP ====================
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial scroll check for header
  handleScroll();
  
  // Trigger initial reveal check
  revealSections();
});