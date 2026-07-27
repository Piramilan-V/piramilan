/* ============================================================
   METHNA Portfolio — Interactive JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Copyright Year ----------
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Typing Animation ----------
  const typingEl = document.getElementById('typingText');
  const titles = [
    'Civil CAD Designer',
    'Nature-Inspired Engineer',
    'AutoCAD & Civil 3D Specialist',
    'Biomimetic Design Thinker'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const current = titles[titleIndex];

    if (!isDeleting) {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else {
        typingSpeed = 80;
      }
    } else {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 400; // Pause before next word
      }
    }
    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- Back to Top ----------
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Mobile Menu ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Active Nav Link ----------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      const link = navLinks.querySelector(`a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Skill Bar Animation ----------
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---------- Smooth Scroll for All Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Initial State ----------
  handleScroll();
});

// ---------- FAQ Accordion ----------
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains('active');

  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    item.querySelector('.faq-answer').style.maxHeight = null;
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add('active');
    const answer = faqItem.querySelector('.faq-answer');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ---------- Contact Form Handler ----------
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.querySelector('#formName').value;
  const email = form.querySelector('#formEmail').value;
  const subject = form.querySelector('#formSubject').value;
  const message = form.querySelector('#formMessage').value;

  // Build mailto link
  const mailtoSubject = encodeURIComponent(subject || 'Project Inquiry from Portfolio');
  const mailtoBody = encodeURIComponent(
    `Hi Piramilan,\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`
  );
  const mailtoLink = `mailto:piraminathan811@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Open email client
  window.location.href = mailtoLink;

  // Show success feedback
  const btn = form.querySelector('.form-submit');
  const originalText = btn.innerHTML;
  btn.innerHTML = '✓ Opening Email Client...';
  btn.style.background = '#4ade80';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
  }, 3000);
}
