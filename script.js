// 1. Efecto Transparente / Color en Navbar al hacer Scroll
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Menú Hamburguesa para móviles
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 3. Animaciones Fade-Up y Scale-In al hacer Scroll
const animatedElements = document.querySelectorAll('.fade-up, .scale-in');
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));