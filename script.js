
/* =========================================
   ANKITA BADDOLI — PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* Current year in footer */
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* Mobile navigation */
    const menuButton = document.getElementById("menuBtn");
    const navigation = document.getElementById("nav");

    if (menuButton && navigation) {
        function closeMenu() {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        }

        menuButton.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        /* Close the menu if the user clicks outside it */
        document.addEventListener("click", function (event) {
            const clickedInsideMenu = navigation.contains(event.target);
            const clickedButton = menuButton.contains(event.target);

            if (!clickedInsideMenu && !clickedButton) {
                closeMenu();
            }
        });

        /* Close the mobile menu when resizing to desktop */
        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });

        /* Escape key closes the menu */
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    /* Smooth scrolling for internal links */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                /* Update the address bar without a full page reload */
                if (history.replaceState) {
                    history.replaceState(null, "", targetId);
                }
            }
        });
    });

    /* Reveal elements as they enter the viewport */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        /* Fallback for older browsers */
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    /* Active navigation link based on the visible section */
    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        '.nav a[href^="#"]'
    );

    if ("IntersectionObserver" in window && sections.length && navLinks.length) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;

                        navLinks.forEach(function (link) {
                            const isActive =
                                link.getAttribute("href") === "#" + sectionId;

                            link.classList.toggle("active", isActive);

                            if (isActive) {
                                link.setAttribute("aria-current", "location");
                            } else {
                                link.removeAttribute("aria-current");
                            }
                        });
                    }
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    /* Back-to-top button */
    const scrollTopButton = document.getElementById("scrollTop");

    if (scrollTopButton) {
        function updateScrollButton() {
            scrollTopButton.classList.toggle(
                "visible",
                window.scrollY > 350
            );
        }

        window.addEventListener(
            "scroll",
            updateScrollButton,
            { passive: true }
        );

        updateScrollButton();

        scrollTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });
        });
    }

    /* Profile image fallback */
    const profileImage = document.querySelector(".profile-photo");

    if (profileImage) {
        profileImage.addEventListener("error", function () {
            console.error(
                "Profile image could not be loaded. Check that images/profile.jpg exists."
            );
            profileImage.alt = "Profile photo unavailable. Please check images/profile.jpg.";
        });
    }

    /* Add a subtle hover effect to cards using CSS transitions */
    const cards = document.querySelectorAll(
        ".skill-card, .project-card, .contact-card"
    );

    cards.forEach(function (card) {
        card.addEventListener("focusin", function () {
            card.classList.add("card-focused");
        });

        card.addEventListener("focusout", function () {
            card.classList.remove("card-focused");
        });
    });

    console.log("Ankita's portfolio initialized successfully.");
});
