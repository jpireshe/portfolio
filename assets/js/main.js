/**
* Template Name: iPortfolio
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * DVD-style bouncing background elements with mutual collision
   */
  (function() {
    window.addEventListener('load', function() {
      requestAnimationFrame(function() { requestAnimationFrame(initBounce); });
    });

    function initBounce() {
      const sidebar = document.getElementById('header');
      const cube = document.querySelector('.bg-cube');
      const name = document.querySelector('.bg-name');
      if (!cube || !name) return;

      function getArea() {
        const sw = (sidebar && window.innerWidth > 1199) ? sidebar.offsetWidth : 0;
        return { xMin: sw, xMax: window.innerWidth, yMin: 0, yMax: window.innerHeight };
      }

      function makeBody(el, speed, startX, startY) {
        const angle = Math.random() * Math.PI * 2;
        return {
          el,
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      }

      const a0 = getArea();
      const cubeBody = makeBody(cube, 0.4, a0.xMin + (a0.xMax - a0.xMin) * 0.75, window.innerHeight * 0.28);
      cubeBody.vx = 0.4 * Math.cos(25 * Math.PI / 180);
      cubeBody.vy = 0.4 * Math.sin(25 * Math.PI / 180);
      const bodies = [
        cubeBody,
        makeBody(name, 0.28, a0.xMin + name.offsetWidth / 2 + 40, window.innerHeight * 0.78),
      ];

      function tick() {
        const a = getArea();

        // Move and wall-bounce each body
        bodies.forEach(b => {
          b.x += b.vx;
          b.y += b.vy;
          const hw = b.el.offsetWidth  / 2;
          const hh = b.el.offsetHeight / 2;
          if (b.x - hw < a.xMin) { b.x = a.xMin + hw; b.vx =  Math.abs(b.vx); }
          if (b.x + hw > a.xMax) { b.x = a.xMax - hw; b.vx = -Math.abs(b.vx); }
          if (b.y - hh < a.yMin) { b.y = a.yMin + hh; b.vy =  Math.abs(b.vy); }
          if (b.y + hh > a.yMax) { b.y = a.yMax - hh; b.vy = -Math.abs(b.vy); }
        });

        // AABB collision between the two bodies
        const p = bodies[0], q = bodies[1];
        const overlapX = (p.el.offsetWidth  + q.el.offsetWidth)  / 2 - Math.abs(p.x - q.x);
        const overlapY = (p.el.offsetHeight + q.el.offsetHeight) / 2 - Math.abs(p.y - q.y);

        if (overlapX > 0 && overlapY > 0) {
          if (overlapX < overlapY) {
            // Colliding on X axis — swap vx, push apart
            [p.vx, q.vx] = [q.vx, p.vx];
            const push = overlapX / 2 + 1;
            if (p.x < q.x) { p.x -= push; q.x += push; }
            else            { p.x += push; q.x -= push; }
          } else {
            // Colliding on Y axis — swap vy, push apart
            [p.vy, q.vy] = [q.vy, p.vy];
            const push = overlapY / 2 + 1;
            if (p.y < q.y) { p.y -= push; q.y += push; }
            else            { p.y += push; q.y -= push; }
          }
        }

        bodies.forEach(b => {
          b.el.style.left = b.x + 'px';
          b.el.style.top  = b.y + 'px';
        });

        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  })();

})()