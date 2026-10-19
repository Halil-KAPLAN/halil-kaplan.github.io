// Picks English or Turkish: saved choice, then ?lang=, then the browser language.
(function () {
  var root = document.documentElement;
  var param = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('ps-lang'); } catch (e) {}
  var lang = param || saved || ((navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en');
  if (lang !== 'tr') lang = 'en';

  function apply(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === l));
    });
  }

  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-lang'));
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        try { localStorage.setItem('ps-lang', b.dataset.lang); } catch (e) {}
        apply(b.dataset.lang);
      });
    });
  });
})();
