/* ==========================================================================
   LA-MI MALATANG — Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- HEADER SCROLL BEHAVIOR ----------
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // ---------- MOBILE MENU ----------
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('open');
        if (mobileOverlay) mobileOverlay.classList.toggle('open');
        if (navToggle) navToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    const closeMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
        if (navToggle) navToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    if (navToggle) navToggle.addEventListener('click', toggleMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                closeMobileMenu();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- SCROLL REVEAL ANIMATIONS ----------
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- COUNTER NUMBER ANIMATION ----------
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const startTime = Date.now();

        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = prefix + target.toLocaleString() + suffix;
            }
        }
        requestAnimationFrame(update);
    }

    // ---------- PRICE CALCULATOR ----------
    const calcSlider = document.getElementById('calcSlider');
    const calcWeight = document.getElementById('calcWeight');
    const calcPrice = document.getElementById('calcPrice');
    const calcPresets = document.querySelectorAll('.calculator__preset');
    const PRICE_PER_100G = 35; // Easily editable price

    if (calcSlider) {
        const updateCalculator = (weight) => {
            const price = (weight / 100) * PRICE_PER_100G;
            if (calcWeight) {
                calcWeight.innerHTML = `${weight}<span> g</span>`;
            }
            if (calcPrice) {
                calcPrice.innerHTML = `฿${price.toFixed(0)} <span>THB</span>`;
            }
            // Update slider track
            const percent = ((weight - 100) / (1000 - 100)) * 100;
            calcSlider.style.background = `linear-gradient(to right, var(--clr-primary) ${percent}%, #E2E8F0 ${percent}%)`;
            // Update active preset
            calcPresets.forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.weight) === weight);
            });
        };

        calcSlider.addEventListener('input', (e) => {
            updateCalculator(parseInt(e.target.value));
        });

        calcPresets.forEach(btn => {
            btn.addEventListener('click', () => {
                const weight = parseInt(btn.dataset.weight);
                calcSlider.value = weight;
                updateCalculator(weight);
            });
        });

        // Initial
        updateCalculator(parseInt(calcSlider.value));
    }

    // ---------- CATEGORY TABS (Menu & Promotions) ----------
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryItems = document.querySelectorAll('[data-category]');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.filter;

            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter items with animation
            categoryItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = '';
                    item.style.animation = 'fadeInUp 0.4s ease both';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ---------- SEARCH FUNCTIONALITY ----------
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.ingredient-card');
            cards.forEach(card => {
                const name = card.querySelector('.ingredient-card__name')?.textContent.toLowerCase() || '';
                const nameEn = card.querySelector('.ingredient-card__name-en')?.textContent.toLowerCase() || '';
                if (name.includes(query) || nameEn.includes(query) || query === '') {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ---------- BRANCH FILTER ----------
    const branchProvince = document.getElementById('branchProvince');
    const branchDistrict = document.getElementById('branchDistrict');
    const branchCards = document.querySelectorAll('.branch-card');

    if (branchProvince) {
        branchProvince.addEventListener('change', () => {
            const prov = branchProvince.value;
            branchCards.forEach(card => {
                if (prov === 'all' || card.dataset.province === prov) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease both';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ---------- ACTIVE NAV LINK HIGHLIGHTING ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80}px 0px 0px 0px` });

    sections.forEach(section => navObserver.observe(section));

    // ---------- PARALLAX SUBTLE EFFECT ON HERO ----------
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // ---------- IMAGE LAZY LOADING ----------
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
    // ---------- REAL REVIEWS LIGHTBOX MODAL ----------
    const reviewCards = document.querySelectorAll('.real-review-card');
    if (reviewCards.length > 0) {
        // Create modal container if not present
        let modal = document.getElementById('reviewModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'reviewModal';
            modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;animation:fadeIn 0.25s ease;';
            modal.innerHTML = `
                <div style="position:relative;max-width:90vw;max-height:90vh;display:flex;align-items:center;justify-content:center;">
                    <img id="reviewModalImg" src="" alt="Review Detail" style="max-width:100%;max-height:85vh;border-radius:12px;box-shadow:0 20px 50px rgba(0,0,0,0.5);object-fit:contain;background:#fff;padding:10px;">
                    <button id="reviewModalClose" style="position:absolute;top:-45px;right:0;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;line-height:1;">&times;</button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const modalImg = document.getElementById('reviewModalImg');
        const modalClose = document.getElementById('reviewModalClose');

        reviewCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('img');
                if (img && modalImg) {
                    modalImg.src = img.src;
                    modal.style.display = 'flex';
                    document.body.classList.add('no-scroll');
                }
            });
        });

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        };

        if (modal) modal.addEventListener('click', closeModal);
        if (modalClose) modalClose.addEventListener('click', closeModal);
    }
});
