// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {

    /* ==========================================================================
       1. BOUTON RETOUR EN HAUT (SCROLL TO TOP)
       ========================================================================== */
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            // Utilisation de window.scrollY (plus moderne que pageYOffset)
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       2. MENU BURGER MOBILE
       ========================================================================== */
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.toggle('is-open');
            burgerBtn.classList.toggle('is-open', isOpen);
            burgerBtn.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        });

        // Fermer le menu quand un lien est cliqué
        mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-phone-btn').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('is-open');
                burgerBtn.classList.remove('is-open');
                burgerBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(e) {
            if (!burgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('is-open');
                burgerBtn.classList.remove('is-open');
                burgerBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /* ==========================================================================
       3. EFFET D'APPARITION INFINI (ALLER-RETOUR À CHAQUE SCROLL)
       ========================================================================== */
    // On cible absolument toutes les classes d'apparition de la page
    const revealElements = document.querySelectorAll('.scroll-reveal, section, .visible-effect');

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'élément entre sur l'écran (en descendant ou en remontant)
                entry.target.classList.add('is-visible', 'visible');
            } else {
                // L'élément sort de l'écran : on retire les classes pour pouvoir rejouer l'effet
                entry.target.classList.remove('is-visible', 'visible');
            }
        });
    }, {
        root: null,          // Relatif à la fenêtre d'affichage (viewport)
        threshold: 0.1,      // Déclenche l'effet dès que 10% de l'élément est visible
        rootMargin: "-20px 0px -20px 0px" // Permet de déclencher l'effet proprement au scroll
    });

    // Activer l'observateur sur chaque élément cible
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    grabCursor: true, // Affiche une icône de main au survol
    speed: 700,       // Ralentit la transition pour la rendre plus fluide (en ms)
    autoplay: {
        delay: 1000, 
        disableOnInteraction: false,
        pauseOnMouseEnter: false, // Très pro : s'arrête si l'utilisateur survole
    },
    // Ajoute une transition fluide à la courbe d'animation
    // On peut configurer cela via CSS, mais le 'speed' est la clé ici
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});