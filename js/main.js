(function ($) {
    "use strict";

    // =============================================
    //  SPINNER
    // =============================================
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 300);
    };
    spinner();

    // =============================================
    //  WOW.js init
    // =============================================
    new WOW().init();

    // =============================================
    //  STICKY NAVBAR with glass morphism
    // =============================================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 60) {
            $('.navbar').addClass('sticky-top shadow-sm navbar-glass');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm navbar-glass');
        }
    });

    // =============================================
    //  HERO CAROUSEL
    // =============================================
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        autoplayTimeout: 6000,
        smartSpeed: 800,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });

    // =============================================
    //  BLOG / ATTRACTION CAROUSEL
    // =============================================
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 2 },
            1200: { items: 3 }
        }
    });

    // =============================================
    //  TESTIMONIAL CAROUSEL
    // =============================================
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 2 },
            1200: { items: 3 }
        }
    });

    // =============================================
    //  COUNTER UP
    // =============================================
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });

    // =============================================
    //  BACK TO TOP
    // =============================================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1200, 'easeInOutExpo');
        return false;
    });

    // =============================================
    //  SCROLL-REVEAL with blur de-blur
    // =============================================
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add('revealed');
        });
    }

    // =============================================
    //  PARALLAX (lightweight)
    // =============================================
    var parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.pageYOffset;
            parallaxElements.forEach(function (el) {
                var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
                el.style.transform = 'translateY(' + (scrollTop * speed) + 'px)';
            });
        }, { passive: true });
    }

    // =============================================
    //  3D TILT EFFECT on cards
    // =============================================
    var tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -4;
            var rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // =============================================
    //  ANIMATED COUNTER (custom)
    // =============================================
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count')) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 2000;
        var startTime = null;

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var current = Math.floor(easeOut(progress) * target);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    var counters = document.querySelectorAll('[data-count]');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) {
            counterObserver.observe(c);
        });
    }

    // =============================================
    //  SMOOTH SECTION ANCHORS
    // =============================================
    $('a[href*="#"]:not([href="#"])').on('click', function (e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            && location.hostname === this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'easeInOutExpo');
            }
        }
    });

    // =============================================
    //  LAZY LOAD IMAGES (native)
    // =============================================
    document.querySelectorAll('img[data-src]').forEach(function (img) {
        img.setAttribute('loading', 'lazy');
        var dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            img.setAttribute('src', dataSrc);
        }
    });

})(jQuery);
