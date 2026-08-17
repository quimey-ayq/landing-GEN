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

// 4. Lógica del Carrusel Principal (Slider)
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlideIndex = 0;
let slideIntervalTimer;

function showSlide(index) {
    // Quita la clase active de todos los slides y puntos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Asegura que el índice dé la vuelta si llega a los extremos
    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    // Activa el slide y punto actual
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
    resetIntervalTimer();
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
    resetIntervalTimer();
}

// Control mediante los botones de flechas
if(nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

// Control mediante los puntos inferiores
window.currentSlide = function(index) {
    showSlide(index);
    resetIntervalTimer();
}

// Reproducción automática cada 6 segundos
function startIntervalTimer() {
    slideIntervalTimer = setInterval(nextSlide, 6000);
}

// Reinicia el temporizador si el usuario hace clic manualmente
function resetIntervalTimer() {
    clearInterval(slideIntervalTimer);
    startIntervalTimer();
}

// Inicia el carrusel al cargar la página
startIntervalTimer();
