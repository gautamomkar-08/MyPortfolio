/**
 * ==========================================================================
 * Gautam Omkar Portfolio - Modern Interactive Script
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggle (Dark / Light Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const rootHtml = document.documentElement;

    // Load saved theme from localStorage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootHtml.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            showToast(`Switched to ${newTheme} mode`, 'info', 2000);
        });
    }

    function applyTheme(theme) {
        rootHtml.setAttribute('data-theme', theme);
        if (theme === 'light') {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    }

    // --- 2. Mobile Navigation Drawer ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu(isOpen) {
        if (!menuToggle || !mobileDrawer) return;
        const open = typeof isOpen === 'boolean' ? isOpen : !mobileDrawer.classList.contains('open');
        menuToggle.classList.toggle('open', open);
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileDrawer.classList.toggle('open', open);
        if (drawerBackdrop) {
            drawerBackdrop.classList.toggle('active', open);
        }
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => toggleMobileMenu());
    }

    if (drawerBackdrop) {
        drawerBackdrop.addEventListener('click', () => toggleMobileMenu(false));
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // --- 3. Dynamic Typewriter Effect in Hero ---
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        'Full Stack Web Applications',
        'Responsive Modern Interfaces',
        'High-Performance REST APIs',
        'Scalable MERN Architectures'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 90;

    function typeWriterEffect() {
        if (!typewriterElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 45;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at completion before deleting
            isDeleting = true;
            typeDelay = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 400;
        }

        setTimeout(typeWriterEffect, typeDelay);
    }

    if (typewriterElement) {
        typeWriterEffect();
    }

    // --- 4. Active Navigation Highlighting (Scroll Spy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
                mobileLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- 5. Floating Back-to-Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');

    function handleScrollFeatures() {
        if (!backToTopBtn) return;
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScrollFeatures, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 6. Project Category Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 7. Copy Email to Clipboard ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailLink = document.getElementById('email-text');

    if (copyEmailBtn && emailLink) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = emailLink.textContent.trim();
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                } else {
                    // Fallback
                    const tempInput = document.createElement('input');
                    tempInput.value = email;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }
                const originalText = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<span>Copied!</span>';
                copyEmailBtn.style.background = 'var(--success)';
                copyEmailBtn.style.color = '#ffffff';
                showToast('Email address copied to clipboard!', 'success');

                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.style.background = '';
                    copyEmailBtn.style.color = '';
                }, 2500);
            } catch (err) {
                showToast('Failed to copy email to clipboard', 'error');
            }
        });
    }

    // --- 8. CV Download Handler ---
    const cvBtn = document.getElementById('cv-btn');
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Curriculum Vitae request initiated!', 'info');
            // Navigate to contact or trigger direct resume download
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- 9. Toast Notification Helper ---
    function showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'error') icon = '⚠️';

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        // Animate entrance
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Automatically dismiss
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 350);
        }, duration);
    }

    // Expose for external usage if needed
    window.showPortfolioToast = showToast;

    // --- 10. Contact Form Submission with Backend Sync & Graceful Fallback ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const subjectInput = contactForm.querySelector('#subject');
            const messageInput = contactForm.querySelector('#message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Validation
            if (!name) {
                showToast('Please enter your name.', 'error');
                if (nameInput) nameInput.focus();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                if (emailInput) emailInput.focus();
                return;
            }

            if (!message || message.length < 5) {
                showToast('Please write a message with at least 5 characters.', 'error');
                if (messageInput) messageInput.focus();
                return;
            }

            // Set loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            const payload = { name, email, subject, message };
            const API_URL = 'http://localhost:5000/contact';

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `Server error: ${response.status}`);
                }

                const data = await response.json();
                showToast(data.message || 'Message sent successfully! I will reply soon.', 'success', 5000);
                contactForm.reset();

            } catch (error) {
                console.warn('Backend server unreachable or returned error:', error);
                
                // Smart Fallback: Offer direct mailto trigger so no messages are lost
                showToast('Backend server is offline. Opening your mail client as fallback...', 'info', 5000);
                
                const mailtoLink = `mailto:gautamomkar@example.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Hi Gautam,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
                
                setTimeout(() => {
                    window.location.href = mailtoLink;
                }, 1200);

            } finally {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }
        });
    }
});
