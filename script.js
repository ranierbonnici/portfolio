/**
 * Interactive features: Cursor spotlight, scroll spy, smooth scrolling
 */

// ===========================
// Cursor Spotlight Effect
// ===========================
function initSpotlightEffect() {
    // Only enable on desktop devices (non-touch)
    if (window.matchMedia('(min-width: 768px)').matches && !('ontouchstart' in window)) {
        document.body.classList.add('spotlight-active');

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Update CSS custom properties
            document.body.style.setProperty('--mouse-x', `${mouseX}px`);
            document.body.style.setProperty('--mouse-y', `${mouseY}px`);
        });
    }
}

// ===========================
// Scroll Spy Navigation
// ===========================
function initScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Options for Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===========================
// Smooth Scrolling
// ===========================
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===========================
// Card Hover Effects Enhancement
// ===========================
function initCardEffects() {
    const cards = document.querySelectorAll('.experience-card, .project-card');

    cards.forEach(card => {
        // Make entire card clickable if it has a link
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on a link directly
            if (e.target.tagName !== 'A') {
                const link = card.querySelector('.card-title a');
                if (link) {
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                }
            }
        });

        // Add cursor pointer style
        const hasLink = card.querySelector('.card-title a');
        if (hasLink) {
            card.style.cursor = 'pointer';
        }
    });
}

// ===========================
// Initialize on DOM Ready
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing portfolio website...');

    // Initialize all features
    initSpotlightEffect();
    initScrollSpy();
    initSmoothScrolling();
    initCardEffects();

    console.log('Portfolio website initialized successfully!');
});

// ===========================
// Handle Window Resize
// ===========================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize spotlight effect on resize (in case viewport changes)
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        const isTouchDevice = 'ontouchstart' in window;

        if (isDesktop && !isTouchDevice) {
            document.body.classList.add('spotlight-active');
        } else {
            document.body.classList.remove('spotlight-active');
        }
    }, 250);
});
