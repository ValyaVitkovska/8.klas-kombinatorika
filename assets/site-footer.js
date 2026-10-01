/* Общ авторски подпис в долната част на всяка страница — „Комбинаторика“, Валя Витковска.
   Употреба: <script src="(път)/assets/site-footer.js" defer></script>
   За тъмна страница: <script ... data-theme="dark"></script> */
(function () {
  var script = document.currentScript;
  var base = script ? script.src.replace(/[^\/]*$/, '') : 'assets/';
  var dark = script && script.getAttribute('data-theme') === 'dark';
  var TEXT = 'По идея и методическа разработка на Валя Витковска · Техническа помощ: AI';

  var css = document.createElement('style');
  css.textContent =
    '.vv-footer{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;' +
    'padding:22px 16px 26px;margin:0;text-align:center;font:600 14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;' +
    'color:#475569;background:rgba(255,255,255,.82);border-top:1px solid #e2e8f0;position:relative;z-index:5}' +
    '.vv-footer img{width:40px;height:40px;object-fit:contain;flex:none}' +
    '.vv-footer.vv-dark{color:#cbd5e1;background:#020713;border-top-color:rgba(148,163,184,.25)}' +
    '@media print{.vv-footer{display:none!important}}';
  document.head.appendChild(css);

  function mount() {
    if (document.querySelector('.vv-footer')) return;
    var f = document.createElement('footer');
    f.className = 'vv-footer' + (dark ? ' vv-dark' : '');
    f.setAttribute('data-no3d', '');
    var img = document.createElement('img');
    img.src = base + 'brand-mark.png';
    img.alt = 'Лого на Валя Витковска';
    var span = document.createElement('span');
    span.textContent = TEXT;
    f.appendChild(img);
    f.appendChild(span);
    document.body.appendChild(f);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
