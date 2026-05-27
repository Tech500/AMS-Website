/* ── Anchorage Makerspace — Shared Nav JS ── */

(function () {
  /* Load shared nav.html into <nav> element */
  var nav = document.querySelector('nav');
  if (nav) {
    fetch('assets/nav.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        nav.outerHTML = html;
        initNav();
      })
      .catch(function () {
        /* If fetch fails (e.g. file:// protocol), fall back to inline nav */
        initNav();
      });
  } else {
    initNav();
  }

  function initNav() {
    /* Highlight the nav link matching the current page */
    var links   = document.querySelectorAll('.nav-links a');
    var current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });

    /* Mobile hamburger toggle */
    var burger  = document.getElementById('nav-burger');
    var navList = document.getElementById('nav-list');
    if (burger && navList) {
      burger.addEventListener('click', function () {
        navList.classList.toggle('open');
      });
      navList.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navList.classList.remove('open');
        });
      });
    }
  }
})();
