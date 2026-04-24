// --- Sticky Navbar & Back to Top ---
const navbar = document.getElementById('navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// --- Mobile Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and times
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// --- Active Link Switching on Scroll ---
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// --- Scroll Reveal Animations ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// --- Typing Animation ---
const typingText = document.querySelector('.typing-text');
const roles = ["Web Developer", "Designer", "Freelancer", "Student", "AI/ML Project Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after a small delay
setTimeout(typeEffect, 1500);

// --- Certificate Modal ---
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-modal");

function openModal(imgSrc) {
    modal.style.display = "block";
    modalImg.src = imgSrc;
    // Prevent scrolling behind modal
    document.body.style.overflow = "hidden";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// --- Contact Form to WhatsApp ---
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Default WhatsApp number (Replace with your actual number)
    const waNumber = "916364156092"; 
    
    // Format message
    const formattedMessage = `*New Contact Inquiry*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    
    // Create WhatsApp URL
    const waUrl = `https://wa.me/${waNumber}?text=${formattedMessage}`;
    
    // Open in new tab
    window.open(waUrl, '_blank');
    
    // Reset form
    contactForm.reset();
});

// --- Particles Background (Simple CSS based implementation via JS) ---
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random styles
        const size = Math.random() * 5 + 2;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--gold);
            border-radius: 50%;
            left: ${xPos}%;
            top: ${yPos}%;
            opacity: ${opacity};
            animation: float ${animationDuration}s ${animationDelay}s infinite linear;
            box-shadow: 0 0 ${size*2}px var(--gold);
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add CSS keyframes dynamically for particles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();
