// Smooth scrolling animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .step, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Carousel functionality
let slideIndex = 1;
let autoPlayInterval;
const slideLabels = [
    "📱 Bot Home Interface",
    "🔍 Image Upload & Scan",
    "📊 Copyright Analysis Results",
    "📋 Detailed Copyright Report",
    "📚 Scan History & Archive",
    "⚙️ Bot Menu & Settings"
];

function showSlide(n) {
    const slides = document.getElementsByClassName("screenshot-item");
    const dots = document.getElementsByClassName("dot");
    const labelElement = document.getElementById("currentLabel");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");

    if (labelElement) {
        labelElement.textContent = slideLabels[slideIndex - 1];
    }
}

function changeSlide(n) {
    stopAutoPlay();
    showSlide(slideIndex += n);
    startAutoPlay();
}

function currentSlide(n) {
    stopAutoPlay();
    showSlide(slideIndex = n);
    startAutoPlay();
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function startAutoPlay() {
    stopAutoPlay(); // Prevents multiple intervals running
    autoPlayInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
}

// Initializing the carousel once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
    startAutoPlay();

    const carousel = document.querySelector('.screenshots-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
});
