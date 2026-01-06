document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            follower.animate({
                left: e.clientX - 10 + 'px',
                top: e.clientY - 10 + 'px'
            }, { duration: 500, fill: "forwards" });
        });
    }

    // Reveal animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title, .experience-card, .skill-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Experience Slider Logic
    const slider = document.querySelector('.experience-slider');
    if (slider) {
        const slides = document.querySelectorAll('.experience-card');
        const prevBtn = document.querySelector('.prev-nav');
        const nextBtn = document.querySelector('.next-nav');
        let currentIndex = 0;

        function updateSlider() {
            // Translate the slider track
            // Assuming each slide is 100% width + 30px gap.
            // Actually, with flex gap, we need to be careful.
            // Best to calculate width of slide + gap
            const slideWidth = slides[0].offsetWidth;
            const gap = 30; // matched css gap
            const offset = -(currentIndex * (slideWidth + gap));
            slider.style.transform = `translateX(${offset}px)`;

            // Optional: Opacity effects for focus
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.style.opacity = '1';
                    slide.style.transform = 'scale(1)';
                } else {
                    slide.style.opacity = '0.5';
                    slide.style.transform = 'scale(0.95)';
                }
            });
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        // Initialize
        updateSlider();

        // Handle resize
        window.addEventListener('resize', updateSlider);
    }


    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
