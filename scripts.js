// scripts.js

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Typing effect for the main title
    const title = document.getElementById('title');
    let originalText = title.innerText;
    title.innerText = '';

    let index = 0;

    const type = () => {
        if (index < originalText.length) {
            title.innerHTML += originalText[index] === ' ' ? '&nbsp;' : originalText[index];
            index++;
            setTimeout(type, 100);
        } else {
            title.innerHTML = originalText;
            title.classList.remove('typing-caret');
        }
    };

    title.classList.add('typing-caret');
    type();

    // Project scroll effect
    document.querySelectorAll('.code-window a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: 'smooth'
                });
                target.style.display = 'block';
            }
        });
    });
});

// Apply animations when elements come into view
function applyAnimations() {
    const titles = document.querySelectorAll('.section-title');
    const paragraphs = document.querySelectorAll('.paragraph');
    const progressBars = document.querySelectorAll('.progress-fill');
    const otherElements = document.querySelectorAll('.hero img, .hero-text p, .project-panel');

    titles.forEach(title => {
        if (isInViewport(title)) {
            title.classList.add('fade-in');
            title.style.transform = 'translateY(0)';
        }
    });

    paragraphs.forEach(paragraph => {
        if (isInViewport(paragraph)) {
            paragraph.classList.add('fade-in');
        }
    });

    progressBars.forEach(bar => {
        if (isInViewport(bar)) {
            const level = bar.getAttribute('data-level');
            bar.style.width = level; // Set width directly
        }
    });

    otherElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('fade-in');
        }
    });
}

// Fade in elements on page load
function fadeInOnLoad() {
    const elements = document.querySelectorAll('.section-title, .paragraph, .hero img, .project-panel, .hero-text p');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// Event listeners for scroll and resize to apply animations
window.addEventListener('scroll', applyAnimations);
window.addEventListener('resize', applyAnimations);

// Initial check and fade-in on load
document.addEventListener('DOMContentLoaded', () => {
    applyAnimations();
    fadeInOnLoad();
});
