document.addEventListener('DOMContentLoaded', function () {

    let navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    window.toggleMenu = function () {
        let menu = document.getElementById('mobileMenu');
        menu.classList.toggle('open');
    };

    document.addEventListener('click', function (e) {
        let menu   = document.getElementById('mobileMenu');
        let toggle = document.getElementById('menuToggle');
        if (
            menu.classList.contains('open') &&
            !menu.contains(e.target) &&
            !toggle.contains(e.target)
        ) {
            menu.classList.remove('open');
        }
    });

    let reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        reveals.forEach(function (el) {
            el.style.opacity   = '0';
            el.style.transform = 'translateY(28px)';
            el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        });

        let revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    let sections = document.querySelectorAll('section[id]');
    let navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(function (sec) {
            if (window.scrollY >= sec.offsetTop - 130) {
            current = sec.id;
            }
        });
        navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--green-mid)';
            } else {
                link.style.color = '';
            }
        });
    });

    window.claimSample = function () {
        let emailInput = document.getElementById('ctaEmail');
        let msg        = document.getElementById('ctaMsg');
        let email      = emailInput.value.trim();

        if (!email || !email.includes('@')) {
            emailInput.style.borderColor = '#ff6b6b';
            emailInput.focus();
            return;
        }

        emailInput.style.borderColor = 'var(--green-accent)';
        emailInput.value = '';
        msg.style.display = 'block';

        setTimeout(function () {
            emailInput.style.borderColor = '';
        }, 2000);
    };

    window.handleContact = function (btn) {
        let msg            = document.getElementById('contactMsg');
        msg.style.display  = 'block';
        btn.textContent    = 'Message Sent ✓';
        btn.style.background = 'var(--green-mid)';
        btn.disabled       = true;
    };

});