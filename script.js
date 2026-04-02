/* Personal Portfolio | script.js | Project V1.4 | See DOCUMENTATION.docx */

document.addEventListener('DOMContentLoaded', function() {

      /* TYPING ANIMATION */
      var heroName  = document.getElementById('hero-name');
      var fullName  = 'Rohith Ram V';
      var typeIndex = 0;
      var cursorOn  = true;

      setInterval(function() {
        if (typeIndex >= fullName.length) {
          cursorOn = !cursorOn;
          heroName.textContent = fullName + (cursorOn ? '|' : '');
        }
      }, 500);

      function typeName() {
        heroName.textContent = fullName.slice(0, typeIndex) + '|';
        typeIndex++;
        if (typeIndex <= fullName.length) {
          setTimeout(typeName, 90);
        }
      }

      /* HERO LOAD ANIMATIONS */
      var els = [
        document.getElementById('hero-badge'),
        document.getElementById('hero-greeting'),
        document.getElementById('hero-title'),
        document.getElementById('hero-tagline'),
        document.getElementById('hero-stats'),
        document.getElementById('hero-cta'),
        null // hero-right removed
      ];

      els.forEach(function(el) { if (el) el.classList.add('hidden'); });

      setTimeout(function() { show(els[0]); }, 100);
      setTimeout(function() { show(els[1]); }, 300);
      setTimeout(typeName, 500);

      var after = 500 + fullName.length * 90 + 200;
      setTimeout(function() { show(els[2]); }, after);
      setTimeout(function() { show(els[3]); }, after + 180);
      setTimeout(function() { show(els[4]); }, after + 360);
      setTimeout(function() { show(els[5]); }, after + 540);
      setTimeout(function() { show(els[6]); }, after + 700);

      function show(el) {
        if (!el) return;
        el.classList.remove('hidden');
        el.classList.add('visible');
      }

      /* SKILL BARS */
      setTimeout(function() {
        document.querySelectorAll('.skill-fill').forEach(function(fill) {
          fill.style.width = fill.getAttribute('data-width') + '%';
        });
      }, 800);

      /* HAMBURGER */
      var hbg = document.getElementById('hamburger');
      var nav = document.getElementById('nav-links');
      if (hbg) {
        hbg.addEventListener('click', function() {
          hbg.classList.toggle('open');
          nav.classList.toggle('open');
        });
      }
      document.querySelectorAll('#nav-links a').forEach(function(a) {
        a.addEventListener('click', function() {
          hbg.classList.remove('open');
          nav.classList.remove('open');
        });
      });

      /* NAV HIGHLIGHT */
      var sections   = document.querySelectorAll('section');
      var navAnchors = document.querySelectorAll('#nav-links a');

      function highlightNav() {
        var scrollY = window.pageYOffset;
        sections.forEach(function(s) {
          var top = s.offsetTop - 90;
          if (scrollY >= top && scrollY < top + s.offsetHeight) {
            var id = s.getAttribute('id');
            navAnchors.forEach(function(a) {
              a.classList.remove('active');
              if (a.getAttribute('href') === '#' + id) a.classList.add('active');
            });
          }
        });
      }
      window.addEventListener('scroll', highlightNav);
      highlightNav();

      /* NAV CLICK FLASH */
      navAnchors.forEach(function(a) {
        a.addEventListener('click', function() {
          var t = document.getElementById(this.getAttribute('href').replace('#',''));
          if (!t) return;
          setTimeout(function() {
            t.classList.add('section-flash');
            setTimeout(function() { t.classList.remove('section-flash'); }, 600);
          }, 400);
        });
      });

      /* FORM VALIDATION */
      var form = document.getElementById('contact-form');
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          var n = document.getElementById('f-name');
          var em = document.getElementById('f-email');
          var q = document.getElementById('f-query');
          var en = document.getElementById('err-name');
          var ee = document.getElementById('err-email');
          var eq = document.getElementById('err-query');
          var ok = true;
          [n,em,q].forEach(function(el){ el.classList.remove('error'); });
          [en,ee,eq].forEach(function(el){ el.textContent=''; });
          document.getElementById('form-success').textContent = '';
          if (!n.value.trim()) { en.textContent='Name is required.'; n.classList.add('error'); ok=false; }
          if (!em.value.trim()) { ee.textContent='Email is required.'; em.classList.add('error'); ok=false; }
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) { ee.textContent='Enter a valid email.'; em.classList.add('error'); ok=false; }
          if (!q.value.trim()) { eq.textContent='Please enter a query.'; q.classList.add('error'); ok=false; }
          if (ok) {
            window.location.href = 'mailto:rohithramv@gmail.com?subject='+encodeURIComponent(q.value.trim())+'&body='+encodeURIComponent('From: '+n.value.trim()+'\n\n'+q.value.trim());
            document.getElementById('form-success').textContent = 'Opening your email client...';
            form.reset();
          }
        });
      }

    });

  /* ── TRAILING DOTS CURSOR ───────────────────────────────── */
  var TRAIL_COUNT = 8;
  var trailDots   = [];
  var positions   = [];
  var mouseX = 0, mouseY = 0;
  var isHovering = false;

  for (var i = 0; i < TRAIL_COUNT; i++) {
    var d = document.createElement('div');
    d.className = 'trail-dot';
    var size = Math.round(10 - i * 0.9);
    d.style.width   = size + 'px';
    d.style.height  = size + 'px';
    d.style.opacity = (1 - (i / TRAIL_COUNT) * 0.85);
    d.style.transition = 'none';
    document.body.appendChild(d);
    trailDots.push(d);
    positions.push({ x: 0, y: 0 });
  }

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    positions[0].x = mouseX;
    positions[0].y = mouseY;
    for (var i = 1; i < TRAIL_COUNT; i++) {
      positions[i].x += (positions[i - 1].x - positions[i].x) * 0.35;
      positions[i].y += (positions[i - 1].y - positions[i].y) * 0.35;
    }
    for (var i = 0; i < TRAIL_COUNT; i++) {
      trailDots[i].style.left = positions[i].x + 'px';
      trailDots[i].style.top  = positions[i].y + 'px';
      var s = isHovering ? Math.round(18 - i * 1.4) : Math.round(18 - i * 1.4);
      trailDots[i].style.width  = s + 'px';
      trailDots[i].style.height = s + 'px';
      if (isHovering) {
        trailDots[i].style.background = '#FFFFFF';
      } else {
        trailDots[i].style.background = '#58A6FF';
      }
    }
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  var hoverables = document.querySelectorAll('a, button, .project-card, .education-card, .skills-category, .cert-card, .card-stack');
  hoverables.forEach(function(el) {
    el.addEventListener('mouseenter', function() { isHovering = true; });
    el.addEventListener('mouseleave', function() { isHovering = false; });
  });


  /* ── SCROLL-IN ANIMATIONS ────────────────────────────────── */
  /* Uses IntersectionObserver to add in-view class when elements scroll into view */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  var animatedEls = document.querySelectorAll(
    '.section-title, .education-card, .project-card, .skills-category, .cert-card, #about-content, #contact-wrapper'
  );
  animatedEls.forEach(function(el) { observer.observe(el); });


  /* ── HEADER SHADOW ON SCROLL ─────────────────────────────── */
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 10) {
      document.getElementById('site-header').classList.add('scrolled');
    } else {
      document.getElementById('site-header').classList.remove('scrolled');
    }
  });

