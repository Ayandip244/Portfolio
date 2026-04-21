const typed = new Typed(".text", {
    strings: [
        "CSE Student",
        "Frontend Developer",
        "Cyber Security Enthusiast",
        "Problem Solver",
        "C++ Programmer"
    ],
    typeSpeed: 70,
    backSpeed: 45,
    backDelay: 1800,
    loop: true
});

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
    updateActiveNav();
});

function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "";

    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navbar.classList.toggle("open");
});

// Close menu on nav link click
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navbar.classList.remove("open");
    });
});

const revealEls = document.querySelectorAll(
    ".about-container, .skills-container, .cert-grid, .portfolio-card, .contact-container, .stat-box, .cert-card"
);

revealEls.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children if applicable
            setTimeout(() => {
                entry.target.classList.add("visible");
            }, 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute("data-width");
            fill.style.width = width + "%";
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector(".btn-box");
        btn.textContent = "Sending...";
        btn.style.opacity = "0.7";

        // Collect form data
        const formData = {
            name: contactForm.querySelector('input[placeholder="Your Name"]').value,
            email: contactForm.querySelector('input[placeholder="Your Email"]').value,
            subject: contactForm.querySelector('input[placeholder="Subject"]').value,
            message: contactForm.querySelector('textarea').value
        };

        // Send to Google Sheet
        fetch("https://script.google.com/macros/s/AKfycbzRLK_8L8hrz3P9rcVA9pWmA6etzK-b1jrZTP5djqAwj9JeYJJtDKWuEz31anH311Q/exec", {
            method: "POST",
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(() => {
            formMsg.textContent = "✓ Message sent! Saved in sheet.";
            formMsg.className = "form-msg success";
            contactForm.reset();

            btn.textContent = "Send Message";
            btn.style.opacity = "1";

            // Re-add icon
            const icon = document.createElement("i");
            icon.className = "bx bx-send";
            btn.appendChild(icon);

            setTimeout(() => {
                formMsg.textContent = "";
                formMsg.className = "form-msg";
            }, 5000);
        })
        .catch(() => {
            formMsg.textContent = "❌ Failed to send message.";
            formMsg.className = "form-msg error";

            btn.textContent = "Send Message";
            btn.style.opacity = "1";

            const icon = document.createElement("i");
            icon.className = "bx bx-send";
            btn.appendChild(icon);
        });
    });
}

// ===== FOOTER YEAR =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== CURSOR GLOW (subtle) =====
const glow = document.createElement("div");
glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,238,255,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top  = e.clientY + "px";
});

// ===== SMOOTH SCROLL for older browsers =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});
