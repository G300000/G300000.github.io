// ============================================================
//   SHEUN GEORREL TABUZO — PORTFOLIO  v2
//   Features:
//   1. Mobile Navigation Toggle
//   2. Active Nav Link on Scroll
//   3. Header Shadow on Scroll
//   4. Scroll Reveal Animations (staggered)
//   5. Progress Bar Animations
//   6. Contact Form Validation + Alert
//   7. Typing Effect on Greeting
// ============================================================


// ---- 1. MOBILE NAV TOGGLE ----
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.innerHTML = isOpen ? '&#x2715;' : '&#9776;';
    menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.innerHTML = '&#9776;';
    });
});


// ---- 2. ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

function updateNav() {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 110) current = sec.id;
    });
    navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', updateNav);


// ---- 3. HEADER SHADOW ----
const header = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// ---- 4. SCROLL REVEAL (staggered inside each group) ----
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver((entries) => {
    // Group siblings to stagger them
    const groups = {};
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const parent = entry.target.parentElement;
        const key = parent ? parent.className : 'root';
        if (!groups[key]) groups[key] = [];
        groups[key].push(entry.target);
    });

    Object.values(groups).forEach(group => {
        group.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
                revealObs.unobserve(el);
            }, i * 110);
        });
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => revealObs.observe(el));


// ---- 5. PROGRESS BAR ANIMATION ----
const skillsSec = document.getElementById('skills');

const progressObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.progress-fill').forEach((fill, i) => {
            setTimeout(() => {
                fill.style.width = fill.getAttribute('data-width') + '%';
            }, 150 + i * 120);
        });
        progressObs.unobserve(entry.target);
    });
}, { threshold: 0.25 });

if (skillsSec) progressObs.observe(skillsSec);


// ---- 6. CONTACT FORM VALIDATION + ALERT ----
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameEl    = document.getElementById('name');
    const emailEl   = document.getElementById('email');
    const messageEl = document.getElementById('message');

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const message = messageEl.value.trim();

    // Check empty fields
    if (!name || !email || !message) {
        alert('⚠️ Please fill in all fields before submitting.');
        if (!name) nameEl.focus();
        else if (!email) emailEl.focus();
        else messageEl.focus();
        return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('⚠️ Please enter a valid email address.\nExample: yourname@email.com');
        emailEl.focus();
        return;
    }

    // Check message length
    if (message.length < 10) {
        alert('⚠️ Your message is too short. Please write at least 10 characters.');
        messageEl.focus();
        return;
    }

    // Success
    alert(`✅ Thank you for contacting me, ${name}!\n\nI'll get back to you at ${email} as soon as possible. 🚀`);
    contactForm.reset();
});


// ---- 7. TYPING EFFECT ----
const greetingEl = document.getElementById('greetingText');

if (greetingEl) {
    const text = greetingEl.textContent;
    greetingEl.textContent = '';
    greetingEl.style.opacity = '1';
    let i = 0;

    function type() {
        if (i < text.length) {
            greetingEl.textContent += text.charAt(i++);
            setTimeout(type, 60);
        }
    }
    setTimeout(type, 700);
}


// ---- CONSOLE EASTER EGG ----
console.log('%c 👋 Hi there! Welcome to Sheun Georrel Tabuzo\'s Portfolio ', 'background:#00d4aa;color:#080d1a;font-size:13px;font-weight:bold;padding:6px 10px;border-radius:4px');
console.log('%c 🚀 Built with HTML · CSS · JavaScript ', 'color:#00d4aa;font-size:11px');
console.log('%c 🎓 BS Computer Science · PUP · Latin Honors ', 'color:#8fa0c0;font-size:11px');
