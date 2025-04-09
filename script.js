        // Aktív menüpont kiemelése
        document.addEventListener("DOMContentLoaded", () => {
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll("nav ul li a");
            navLinks.forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.parentElement.classList.add("active");
                }
            });
        });