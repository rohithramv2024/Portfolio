/* Personal Portfolio | script.js | Project V1.3 | See DOCUMENTATION.docx */

document.addEventListener('DOMContentLoaded', function() {

  /* ── 1. ON LOAD ANIMATION ────────────────────────────────── */
  /* Transition lives in CSS on the element itself.
     Double requestAnimationFrame guarantees the browser has
     fully painted .hidden before we swap to .visible. */

  var heroElements = [
    document.getElementById('hero-greeting'),
    document.getElementById('hero-name'),
    document.getElementById('hero-title'),
    document.getElementById('hero-tagline'),
    document.getElementById('hero-cta')
  ];

  for (var i = 0; i < heroElements.length; i++) {
    if (heroElements[i]) {
      heroElements[i].classList.add('hidden');
    }
  }

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      for (var i = 0; i < heroElements.length; i++) {
        (function(el, delay) {
          if (!el) return;
          setTimeout(function() {
            el.classList.remove('hidden');
            el.classList.add('visible');
          }, delay);
        })(heroElements[i], i * 200);
      }
    });
  });


  /* ── 2. ACTIVE NAV HIGHLIGHTING ──────────────────────────── */
  var sections = document.querySelectorAll('section');
  var navLinks = document.querySelectorAll('#main-nav a');

  function highlightNav() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var sectionTop = section.offsetTop - 80;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        var id = section.getAttribute('id');

        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].classList.remove('active');
          if (navLinks[j].getAttribute('href') === '#' + id) {
            navLinks[j].classList.add('active');
          }
        }
      }
    }
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

});
