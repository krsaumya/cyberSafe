// ============================================================
// navigation.js — Navbar, smooth scrolling, mobile toggle
// ============================================================

export function setupNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
}

export function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}
