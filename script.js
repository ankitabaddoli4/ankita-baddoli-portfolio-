const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const scrollTop = document.getElementById("scrollTop");
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
        menuBtn?.setAttribute("aria-expanded", "false");
    });
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const updateActiveNav = () => {
    let current = "home";

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top <= 150) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
};

window.addEventListener("scroll", () => {
    updateActiveNav();

    if (window.scrollY > 500) {
        scrollTop?.classList.add("show");
    } else {
        scrollTop?.classList.remove("show");
    }
});

scrollTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        const targetId = anchor.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
});

updateActiveNav();
