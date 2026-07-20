document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor tracking
    const cursorBlob = document.querySelector('.cursor-blob');

    document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            cursorBlob.style.left = e.clientX + 'px';
            cursorBlob.style.top = e.clientY + 'px';
        });
    });

    // Interactive cursor state
    const interactables = document.querySelectorAll('a, button, .theme-toggle, .service-card, .social-icon');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorBlob.style.width = '150px';
            cursorBlob.style.height = '150px';
            cursorBlob.style.opacity = '0.5';
        });

        el.addEventListener('mouseleave', () => {
            cursorBlob.style.width = '300px';
            cursorBlob.style.height = '300px';
            cursorBlob.style.opacity = '0.3';
        });
    });

    // Theme Toggle implementation
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Check local storage for persistent theme
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('portfolioTheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('portfolioTheme', 'light');
        }
    });

    // Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scroll Background Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Set active link based on scroll section viewing
    const sections = document.querySelectorAll('section');

    const setActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Add staggered animation delay for grid cards
                if (entry.target.classList.contains('service-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-header, .service-card, .contact-container');
    animatedElements.forEach(el => observer.observe(el));

    // Async Form Submission Simulation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const icon = btn.querySelector('i');
            const textSpan = btn.querySelector('span');
            const originalText = textSpan.innerText;

            // Loading UI state
            textSpan.innerText = 'Sending...';
            icon.className = 'fas fa-spinner fa-spin';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Simulate network request
            setTimeout(() => {
                // Success UI state
                textSpan.innerText = 'Sent Successfully!';
                icon.className = 'fas fa-check';
                btn.style.background = '#10b981'; // Success tailwind green
                btn.style.boxShadow = '0 10px 20px -10px #10b981';
                contactForm.reset(); // clear form

                // Revert to original UI after 3 seconds
                setTimeout(() => {
                    textSpan.innerText = originalText;
                    icon.className = 'fas fa-paper-plane';
                    btn.style.background = ''; // Use css var gradient
                    btn.style.boxShadow = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }
});
