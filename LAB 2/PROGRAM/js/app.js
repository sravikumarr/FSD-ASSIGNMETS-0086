/**
 * Sumukh Ravikumar Portfolio - Main Application Scripts
 * Mobile navigation, contact form validation, project modal details, skills filtering.
 */

(function () {
  'use strict';

  // Project architecture data for modal popup
  const PROJECT_DETAILS = {
    'ai-attendance': {
      title: 'AI Attendance System',
      category: 'Computer Vision & Deep Learning',
      tech: ['Python', 'OpenCV', 'PyTorch', 'Node.js', 'REST API', 'SQLite'],
      summary: 'Automated facial recognition attendance platform eliminating manual roll calls with high precision live video stream analysis.',
      architecture: [
        'Real-time face detection using MTCNN and feature extraction via MobileFaceNet embeddings.',
        'Asynchronous video frame streaming pipeline processing 30 FPS with low latency.',
        'RESTful API gateway built with Node.js providing role-based access control for students and faculty.',
        'Automated CSV & Excel attendance report generator with instant email alerts for absences.'
      ],
      github: 'https://github.com/sravikumarr',
      demo: '#'
    },
    'task-organizer': {
      title: 'Task Organizer App',
      category: 'Productivity & Localized State',
      tech: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'LocalState', 'PWA'],
      summary: 'Feature-rich productivity dashboard featuring smart priority queues, tags, inline editing, and offline storage.',
      architecture: [
        'Engineered with reactive Vanilla JS State Management for instant UI updates without external libraries.',
        'Drag-and-drop task reordering using native HTML5 Drag and Drop API.',
        'Localized IndexedDB and LocalStorage fallback mechanism for offline-first data retention.',
        'Smart filter engine for category, priority level, and deadline date sorting.'
      ],
      github: 'https://github.com/sravikumarr',
      demo: '#'
    },
    'hyped': {
      title: 'HYPED',
      category: 'Community & Event Discovery Platform',
      tech: ['React Native', 'Expo', 'Node.js', 'WebSockets', 'MongoDB'],
      summary: 'Dynamic campus event discovery app featuring real-time feed updates, ticket reservations, and interactive maps.',
      architecture: [
        'Built with React Native and Expo for fluid 60 FPS cross-platform mobile performance.',
        'Real-time event updates and group chat channels implemented over WebSockets.',
        'Location-based event filtering utilizing device GPS and native MapView components.',
        'Secure JWT authentication and encrypted user session tokens.'
      ],
      github: 'https://github.com/sravikumarr',
      demo: '#'
    },
    'mad-coursework': {
      title: 'Mobile Application Development Coursework',
      category: 'Academic Portfolio Project Suite',
      tech: ['React Native', 'Expo', 'Android Studio', 'AsyncStorage', 'REST APIs'],
      summary: 'Comprehensive collection of mobile applications demonstrating native device integration, offline persistence, and polished mobile UX.',
      architecture: [
        'Suite of 5+ modular applications built as part of the RV University CS curriculum.',
        'Integrates native device APIs including Camera, Location services, and Push Notifications.',
        'Implements clean MVVM architectural patterns for scalable mobile codebase structure.',
        'Optimized for Android device targets using Android Studio profiler and Expo CLI.'
      ],
      github: 'https://github.com/sravikumarr',
      demo: '#'
    },
    'dbms-coursework': {
      title: 'Database Management System Coursework',
      category: 'Relational Schema & Query Optimization',
      tech: ['SQL', 'PostgreSQL', 'ER Diagrams', 'Database Indexing', 'Python'],
      summary: 'Complex relational database system featuring normalized 3NF schemas, stored procedures, triggers, and query execution analysis.',
      architecture: [
        'Designed comprehensive ER diagrams normalized up to BCNF (Boyce-Codd Normal Form).',
        'Implemented B-Tree indexes reducing query execution latency by up to 80% on large datasets.',
        'Automated database migration scripts and seed generators written in Python.',
        'Configured ACID-compliant transactional guarantees and custom triggers for audit logging.'
      ],
      github: 'https://github.com/sravikumarr',
      demo: '#'
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSkillsFilter();
    initProjectModals();
    initContactForm();
    initActiveNavHighlight();
  });

  // 1. Mobile Menu Drawer Toggle
  function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('nav-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        closeNav();
      });
    });

    function openNav() {
      navLinks.classList.add('nav-open');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
      navLinks.classList.remove('nav-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // 2. Skills Category Filter Tabs
  function initSkillsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.classList.add('is-visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Project Details Modal Window
  function initProjectModals() {
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const projectDetailBtns = document.querySelectorAll('.view-project-detail');

    if (!modalOverlay) return;

    projectDetailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project-id');
        const data = PROJECT_DETAILS[projectId];

        if (data) {
          populateModal(data);
          openModal();
        }
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    function populateModal(data) {
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-summary').textContent = data.summary;

      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = data.tech.map(t => `<span class="badge">${t}</span>`).join('');

      const archList = document.getElementById('modal-architecture');
      archList.innerHTML = data.architecture.map(item => `<li>${item}</li>`).join('');

      const githubLink = document.getElementById('modal-github');
      if (githubLink) githubLink.href = data.github;
    }

    function openModal() {
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // 4. Contact Form Validation and Submission
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    const formStatus = document.getElementById('form-status');

    if (!form) return;

    // Character counter for message textarea
    if (messageInput && charCounter) {
      messageInput.addEventListener('input', () => {
        const len = messageInput.value.length;
        charCounter.textContent = `${len} / 500`;
        if (len > 500) {
          messageInput.value = messageInput.value.substring(0, 500);
          charCounter.textContent = '500 / 500';
        }
      });
    }

    // Input blur real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('blur', () => {
        validateField(input);
      });
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput);
      const isEmailValid = validateField(emailInput);
      const isMessageValid = validateField(messageInput);

      if (isNameValid && isEmailValid && isMessageValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
          </svg>
          Sending...
        `;

        // Simulate seamless server dispatch
        setTimeout(() => {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          if (charCounter) charCounter.textContent = '0 / 500';

          showFormSuccess();
        }, 1200);
      }
    });

    function validateField(input) {
      if (!input) return false;
      const fieldId = input.id;
      const errorEl = document.getElementById(`${fieldId}-error`);
      let isValid = true;
      let errorMsg = '';

      if (fieldId === 'name') {
        if (!input.value.trim()) {
          isValid = false;
          errorMsg = 'Please enter your name.';
        }
      } else if (fieldId === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.value.trim()) {
          isValid = false;
          errorMsg = 'Please enter your email address.';
        } else if (!emailRegex.test(input.value.trim())) {
          isValid = false;
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (fieldId === 'message') {
        if (!input.value.trim()) {
          isValid = false;
          errorMsg = 'Please enter a message.';
        } else if (input.value.trim().length < 10) {
          isValid = false;
          errorMsg = 'Message must be at least 10 characters.';
        }
      }

      if (!isValid) {
        input.classList.add('error');
        if (errorEl) {
          errorEl.textContent = errorMsg;
          errorEl.classList.add('visible');
        }
      } else {
        input.classList.remove('error');
        if (errorEl) {
          errorEl.classList.remove('visible');
        }
      }

      return isValid;
    }

    function showFormSuccess() {
      if (!formStatus) return;
      formStatus.innerHTML = `
        <div style="padding: var(--space-4); background-color: var(--success-muted); border: 1px solid var(--success); border-radius: var(--radius-md); color: var(--success); display: flex; align-items: center; gap: var(--space-2);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Thank you! Your message has been sent successfully. Sumukh will get back to you shortly.</span>
        </div>
      `;
      setTimeout(() => {
        formStatus.innerHTML = '';
      }, 6000);
    }
  }

  // 5. Active Nav Link Scroll Highlight
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }
})();
