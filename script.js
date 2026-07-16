// Toggle mobile navigation menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- Scroll Animation Tracker ---

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Check if the element has entered the screen
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            // Optional: Stop observing once animated so it doesn't re-animate
            observer.unobserve(entry.target); 
        }
    });
}, {
    // Triggers when 15% of the element is visible on screen
    threshold: 0.15 
});

// Select all elements with the hidden class and start tracking them
const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));
// --- Sticky Navbar Shadow Effect ---
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    // If user scrolls down more than 20 pixels, add the shadow class
    if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
// --- Typing Text Animation Logic ---
const words = ["Web Developer.", "Designer.", "Problem Solver.", "Tech Enthusiast."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTarget = document.getElementById("typing-text");

function typeAnimation() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        // Remove characters
        typingTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        typingTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Adjust typing speeds
    let typingSpeed = isDeleting ? 50 : 100;

    // Word is fully typed out
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at the end of the word
        isDeleting = true;
    } 
    // Word is completely erased
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Move to next word
        typingSpeed = 500; // Small break before starting next word
    }

    setTimeout(typeAnimation, typingSpeed);
}

// Initialise the typewriter loop on page load
document.addEventListener("DOMContentLoaded", () => {
    typeAnimation();
});

// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
const currentTheme = localStorage.getItem('theme');

// Check for saved user preference
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        darkModeToggle.textContent = '☀️ Light Mode';
    }
}

// Handle the click event
darkModeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        darkModeToggle.textContent = '🌙 Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkModeToggle.textContent = '☀️ Light Mode';
    }
});
