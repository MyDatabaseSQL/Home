(function () {
  'use strict';
  var root = document.documentElement;

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { }
  });

  var links = document.getElementById('nav-links');
  var menuBtn = document.getElementById('menu-btn');
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var dlg = document.getElementById('lightbox');
  var img = dlg.querySelector('img');
  var cap = dlg.querySelector('.lb-cap');
  var idx = 0;
  function show(i) {
    idx = (i + shots.length) % shots.length;
    img.src = shots[idx].dataset.full;
    img.alt = shots[idx].dataset.title;
    cap.textContent = shots[idx].dataset.title;
  }
  shots.forEach(function (s, i) {
    s.addEventListener('click', function () { show(i); dlg.showModal(); });
  });
  dlg.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
