(function () {
function money(v) {
  return new Intl.NumberFormat('ru-RU').format(v) + ' ₸';
}

function rootStyle() {
  document.documentElement.style.setProperty('--accent', state.accent);
  document.documentElement.style.setProperty('--accent-2', state.accent2);
  document.documentElement.style.setProperty('--accent-3', state.accent3);
  document.body.classList.toggle('light', state.theme === 'light');
  if (state.reducedMotion) document.body.style.scrollBehavior = 'auto';
}

function link(route, label) {
  return `<a class="navlink ${state.route===route?'active':''}" href="#${route}">${label}</a>`;
}

function cardMouseFX() {
  document.querySelectorAll('[data-glow]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

function liquidButton(label, action = 'toast', payload = '') {
  return `
  <div class="liquid-container">
    <button class="liquid-button" data-action="${action}" data-payload="${payload}">
      <span class="label">${label}</span>
      <span class="drop"></span>
      <span class="drop d2"></span>
      <span class="drop d3"></span>
    </button>
  </div>`;
}



function megaMenuContent() {
  return `
    <div class="mega-grid">
      <div class="mega-card">
        <div class="eyebrow">AI HUB Suite</div>
        <h4>Огромный single‑file сайт</h4>
        <p>Hero, Ad Matrix, Task Engine, Liquid Buttons, внутренние соцсети, многостраничность, настройки и динамические виджеты — всё внутри одного main.html.</p>
        <div class="badge-row">
          <span class="soft-badge">No build</span><span class="soft-badge">Open in browser</span><span class="soft-badge">SPA transitions</span>
        </div>
      </div>
      <div class="mega-card">
        <h4>Разделы</h4>
        <div class="stack">
          ${navItems.slice(0,4).map(([id, label]) => `<a class="mega-link" href="#${id}">${label}</a>`).join('')}
        </div>
      </div>
      <div class="mega-card">
        <h4>Ещё внутри</h4>
        <div class="stack">
          ${navItems.slice(4).map(([id, label]) => `<a class="mega-link" href="#${id}">${label}</a>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderNav() {
  document.getElementById('navlinks').innerHTML = navItems.map(([id, label]) => link(id, label)).join('');
  document.getElementById('megaPanel').innerHTML = megaMenuContent();
}

function renderSettings() {
  const drawer = document.getElementById('settingsDrawer');
  const presets = [
    ['#56a8ff','#8b5cf6','#22d3ee'],
    ['#ff6ea8','#8b5cf6','#ff8a00'],
    ['#31d0aa','#56a8ff','#22d3ee'],
    ['#f59e0b','#fb7185','#56a8ff']
  ];
  drawer.innerHTML = `
    <div class="stack">
      <div class="row space-between">
        <div>
          <div class="eyebrow">Настройки</div>
          <h3 class="card-title" style="font-size:1.5rem;margin-top:10px;">Тонкая настройка интерфейса</h3>
        </div>
        <button class="icon-btn" id="closeSettings">✕</button>
      </div>

      <article class="panel glass stack">
        <div class="row space-between"><span>Тема</span><button class="toggle ${state.theme==='light'?'on':''}" id="themeToggle"><i></i></button></div>
        <div class="row space-between"><span>Снижение анимаций</span><button class="toggle ${state.reducedMotion?'on':''}" id="motionToggle"><i></i></button></div>
        <div class="row space-between"><span>Плотность UI</span><button class="chip" id="densityBtn">${state.density}</button></div>
      </article>

      <article class="panel glass stack">
        <div class="eyebrow">Акцентные палитры</div>
        <div class="color-swatches">
          ${presets.map((p, i) => `<button class="swatch ${state.accent===p[0]&&state.accent2===p[1]?'active':''}" data-preset="${i}" style="background:linear-gradient(135deg,${p[0]},${p[1]},${p[2]});"></button>`).join('')}
        </div>
      </article>

      <article class="panel glass stack">
        <div class="eyebrow">Информация</div>
        <div class="card-copy">Все изменения сохраняются в localStorage. После перезагрузки браузера тема, палитра и режим движения останутся такими же.</div>
        ${liquidButton('Сохранить ощущение интерфейса', 'toast', 'Настройки сохранены локально')}
      </article>
    </div>
  `;
}

function openSettings() {
  state.settingsOpen = true;
  renderSettings();
  document.getElementById('settingsDrawer').classList.add('open');
  document.getElementById('drawerBackdrop').classList.add('open');
  bindDrawer();
}

function closeSettings() {
  state.settingsOpen = false;
  document.getElementById('settingsDrawer').classList.remove('open');
  document.getElementById('drawerBackdrop').classList.remove('open');
}

function openModal(html) {
  document.getElementById('modal').innerHTML = html;
  document.getElementById('modal').classList.add('open');
  document.getElementById('modalBackdrop').classList.add('open');
  document.getElementById('modal').querySelectorAll('[data-close-modal]').forEach(b => b.addEventListener('click', closeModal));
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('modalBackdrop').classList.remove('open');
}

function socialModal(id) {
  const s = socials.find(x => x.id === id);
  if (!s) return '';
  return `
    <div class="stack">
      <div class="row space-between">
        <div class="row">
          <div class="social-logo" style="background:${s.color};width:64px;height:64px;border-radius:22px;">${s.icon}</div>
          <div>
            <div class="eyebrow">${s.handle}</div>
            <h3 class="card-title" style="font-size:1.9rem;margin:6px 0 0;">${s.name}</h3>
          </div>
        </div>
        <button class="icon-btn" data-close-modal>✕</button>
      </div>

      <article class="panel glass stack">
        <p class="card-copy" style="font-size:1rem;">${s.tagline}</p>
        <div class="badge-row">${s.stats.map(st => `<span class="soft-badge">${st}</span>`).join('')}</div>
        <div class="grid-2">
          <div class="stack">
            ${s.sections.map(sec => `<div class="mega-link">${sec}</div>`).join('')}
          </div>
          <div class="gallery-tile" style="min-height:260px;">
            <div class="gallery-caption"><strong>${s.name} inside AI HUB</strong><br><span style="opacity:.78;">Внутренняя сочная соц‑страница с отдельным настроением, цветом и CTA.</span></div>
          </div>
        </div>
        <div class="row">
          <a class="outline-btn" href="${s.ext}" target="_blank" rel="noopener noreferrer">Открыть реальный ${s.name} ↗</a>
          ${liquidButton('Подписаться внутри сценария', 'toast', `Подписка на ${s.name} добавлена в wish‑flow`) }
        </div>
      </article>
    </div>
  `;
}

function escapeAttr(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function extractGradientColor(gradient) {
  const m = gradient.match(/#([0-9a-fA-F]{6})/);
  return m ? `#${m[1]}` : '#56a8ff';
}

window.money = money;
window.liquidButton = liquidButton;
window.escapeAttr = escapeAttr;
window.extractGradientColor = extractGradientColor;
window.triggerTransform = triggerTransform;

function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2400);
}

function go(route) {
  location.hash = route;
}

function attachActionBinds(scope = document) {
  scope.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', e => {
      const action = el.dataset.action;
      const payload = el.dataset.payload || '';
      if (action === 'toast') showToast(payload || 'Готово');
      if (action === 'route') go(payload);
      if (action === 'buy') showToast(`Открыт сценарий покупки: ${payload}`);
      if (action === 'transform') triggerTransform();
    });
  });
}

function bindDrawer() {
  const drawer = document.getElementById('settingsDrawer');
  drawer.querySelector('#closeSettings')?.addEventListener('click', closeSettings);
  drawer.querySelector('#themeToggle')?.addEventListener('click', () => { toggleTheme(); renderSettings(); bindDrawer(); });
  drawer.querySelector('#motionToggle')?.addEventListener('click', () => { state.reducedMotion = !state.reducedMotion; localStorage.setItem('aih_motion', state.reducedMotion ? 'reduced' : 'full'); renderSettings(); bindDrawer(); showToast(state.reducedMotion ? 'Анимации уменьшены' : 'Анимации включены'); });
  drawer.querySelector('#densityBtn')?.addEventListener('click', () => { state.density = state.density === 'cozy' ? 'compact' : 'cozy'; localStorage.setItem('aih_density', state.density); showToast(`Плотность UI: ${state.density}`); renderSettings(); bindDrawer(); });
  drawer.querySelectorAll('[data-preset]').forEach(btn => btn.addEventListener('click', () => {
    const presets = [
      ['#56a8ff','#8b5cf6','#22d3ee'],
      ['#ff6ea8','#8b5cf6','#ff8a00'],
      ['#31d0aa','#56a8ff','#22d3ee'],
      ['#f59e0b','#fb7185','#56a8ff']
    ];
    const p = presets[Number(btn.dataset.preset)];
    [state.accent, state.accent2, state.accent3] = p;
    localStorage.setItem('aih_accent', p[0]); localStorage.setItem('aih_accent2', p[1]); localStorage.setItem('aih_accent3', p[2]);
    rootStyle(); renderRoute(false); openSettings();
  }));
  attachActionBinds(drawer);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('aih_theme', state.theme);
  rootStyle();
  renderRoute(false);
}

function triggerTransform() {
  if (state.taskProcessing) return;
  state.taskProcessing = true;
  state.taskShowGood = false;
  renderRoute(false);
  setTimeout(() => {
    state.taskProcessing = false;
    state.taskShowGood = true;
    renderRoute(false);
    showToast('Prompt усилен и структурирован');
  }, 1500);
}

function bindPageFeatures() {
  cardMouseFX();
  attachActionBinds();
  document.querySelectorAll('[data-level]').forEach(btn => btn.addEventListener('click', () => { state.courseLevel = btn.dataset.level; renderRoute(false); }));
  document.getElementById('courseSearch')?.addEventListener('input', e => { state.courseSearch = e.target.value; renderRoute(false); });
  document.getElementById('startupSearch')?.addEventListener('input', e => { state.startupSearch = e.target.value; renderRoute(false); });
  document.getElementById('planToggle')?.addEventListener('click', () => { state.planYearly = !state.planYearly; renderRoute(false); });
  document.querySelectorAll('[data-task-index]').forEach(btn => btn.addEventListener('click', () => { state.taskIndex = Number(btn.dataset.taskIndex); state.taskShowGood = false; state.taskProcessing = false; renderRoute(false); }));
  document.querySelectorAll('[data-social]').forEach(card => card.addEventListener('click', () => openModal(socialModal(card.dataset.social))));
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });
  const lv = document.getElementById('liveViewer');
  if (lv) lv.textContent = state.viewer;
}

function renderRoute(animated = true) {
  const view = document.getElementById('routeView');
  const doRender = () => {
    const page = (pages[state.route] || pages.home)();
    view.innerHTML = page;
    view.classList.remove('leaving');
    if (animated && !state.reducedMotion) {
      view.classList.remove('entering');
      void view.offsetWidth;
      view.classList.add('entering');
    }
    bindPageFeatures();
    renderNav();
  };
  if (animated && !state.reducedMotion) {
    view.classList.add('leaving');
    setTimeout(doRender, 180);
  } else doRender();
}

function setRouteFromHash() {
  const hash = (location.hash || '#home').replace('#','');
  state.route = pages[hash] ? hash : 'home';
  renderRoute(true);
  closeMenu();
}

function openMenu() {
  state.menuOpen = true;
  document.getElementById('megaPanel').classList.add('open');
}
function closeMenu() {
  state.menuOpen = false;
  document.getElementById('megaPanel').classList.remove('open');
}

function bootstrap() {
  rootStyle();
  renderNav();
  renderRoute(false);

  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('drawerBackdrop').addEventListener('click', closeSettings);
  document.getElementById('modalBackdrop').addEventListener('click', closeModal);
  document.getElementById('menuToggle').addEventListener('click', () => state.menuOpen ? closeMenu() : openMenu());
  document.getElementById('navlinks').addEventListener('mouseenter', closeMenu);
  document.addEventListener('click', e => {
    const mega = document.getElementById('megaPanel');
    if (state.menuOpen && !mega.contains(e.target) && !document.getElementById('menuToggle').contains(e.target)) closeMenu();
  });
  window.addEventListener('hashchange', setRouteFromHash);

  const cursor = document.getElementById('cursor');
  window.addEventListener('pointermove', e => {
    if (state.reducedMotion) return;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  window.addEventListener('pointerdown', () => cursor.style.opacity = '.98');
  window.addEventListener('pointerup', () => cursor.style.opacity = '.78');

  setInterval(() => {
    state.kztLive += Math.round((Math.random() - 0.4) * 160);
    state.kztLive = Math.max(7900, Math.min(9800, state.kztLive));
    state.viewer += Math.round((Math.random() - 0.48) * 8);
    state.viewer = Math.max(178, Math.min(368, state.viewer));
    if (state.route === 'home') {
      document.querySelectorAll('.ticker-badge').forEach(el => el.textContent = `Live KZT: ${money(state.kztLive)} / мес`);
      const v = document.getElementById('liveViewer');
      if (v) v.textContent = state.viewer;
    }
  }, 2600);
}

bootstrap();
  
})();
