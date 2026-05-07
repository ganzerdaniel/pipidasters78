(function () {
function pageHome() {
  const heroCards = [
    { label: 'Каталог', value: money(45000), meta: 'Стартовые программы для Junior и middle‑команд' },
    { label: 'Подписка', value: money(state.kztLive) + ' / мес', meta: 'База задач, prompt‑рутеры и templates' },
    { label: 'Стартапы', value: '120+', meta: 'Локальные AI‑сервисы и рекламные витрины Казахстана' }
  ];
  return `
    <section class="hero-layout">
      <article class="hero-card glass stack">
        <div class="pill">🚀 первая AI‑платформа в Казахстане</div>
        <h1 class="section-title">Укрощай <span class="gradient">любой ИИ</span> и собирай MVP быстрее рынка</h1>
        <p class="lead">Огромный single‑file интерфейс с курсами, стартапами, prompt‑лабораторией, соцстраницами, настройками и переходами между “страницами” без единого дополнительного файла. Всё в <strong>main.html</strong>.</p>
        <div class="row">
          ${liquidButton('Смотреть курсы — от 45 000 ₸', 'route', 'courses')}
          <a class="outline-btn" href="#lab">Открыть Prompt Lab →</a>
        </div>
        <div class="ticker">
          <span class="ticker-badge">Live KZT: ${money(state.kztLive)} / мес</span>
          <span>Активно пользователей онлайн: <strong id="liveViewer">${state.viewer}</strong></span>
          <span>Обновления витрины: каждые 6 сек</span>
        </div>
        <div class="hero-kpi-grid">
          ${heroCards.map(c => `
            <div class="metric glass">
              <div class="label">${c.label}</div>
              <div class="value">${c.value}</div>
              <div class="meta">${c.meta}</div>
            </div>
          `).join('')}
        </div>
      </article>

      <aside class="hero-card glass hero-visual">
        <div class="row space-between">
          <div>
            <div class="eyebrow">Neon command center</div>
            <h3 class="card-title" style="font-size:1.5rem;margin-top:8px;">Живой интерфейс AI HUB</h3>
          </div>
          <span class="soft-badge">single file mode</span>
        </div>

        <div class="grid-2">
          <div class="panel glass">
            <div class="eyebrow">Task Engine</div>
            <div class="card-copy">Плохой запрос → системная роль → формат → ограничения → точный результат.</div>
            <div class="progress" style="margin-top:14px;"><i style="--p:86%"></i></div>
          </div>
          <div class="panel glass">
            <div class="eyebrow">Ad Matrix</div>
            <div class="card-copy">Glow‑карточки стартапов с ценами в ₸ и мягкой реакцией на курсор.</div>
            <div class="badge-row" style="margin-top:14px;"><span class="soft-badge">KZT</span><span class="soft-badge">Cursor Glow</span><span class="soft-badge">Filters</span></div>
          </div>
        </div>

        <div class="terminal">
          <div class="terminal-top">
            <div class="terminal-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
            <div class="eyebrow">hero/live-preview</div>
            <div class="soft-badge">motion ready</div>
          </div>
          <div class="terminal-body">
            <div class="code">Роль: Senior AI Product Architect\nЗадача: Собрать платформу AI‑стартапов и prompt‑курсов для рынка Казахстана.\nУсловие: Glassmorphism + Cyber‑Brutalism, цены в ₸, много внутренних экранов, соц‑страницы и плавные переходы между страницами.\nФормат: Готовый визуальный single-file сайт.</div>
            <div class="processing"><div class="bars"><span></span><span></span><span></span><span></span></div> Генерация интерфейса, микро-переходов и неоновых состояний...</div>
          </div>
        </div>

        <div class="mini-chart" aria-hidden="true">
          ${[36,42,64,58,86,72,90,82,76,98,88,100].map(v => `<span style="height:${v}%"></span>`).join('')}
        </div>
      </aside>
    </section>

    <section class="stack" style="margin-top:18px;">
      <div class="row space-between">
        <div>
          <div class="eyebrow">Экосистема</div>
          <h2 class="subsection-title">Что уже встроено в этот main.html</h2>
        </div>
        <a class="outline-btn" href="#socials">Открыть соц‑вселенную →</a>
      </div>
      <div class="feature-grid">
        ${[
          ['Многостраничность без файлов','Внутренний роутинг на hash‑маршрутах с анимацией переходов.'],
          ['Настройки интерфейса','Смена темы, акцентной палитры, плотности UI и режима анимаций.'],
          ['Контент под KZ‑рынок','Курсы, AI‑стартапы, локальные кейсы, Наурыз, Kaspi и B2B‑сценарии.']
        ].map(([t,d]) => `<article class="card glass"><h3 class="card-title">${t}</h3><p class="card-copy">${d}</p></article>`).join('')}
      </div>
    </section>
  `;
}

function pageCourses() {
  const filtered = courses.filter(c => (state.courseLevel === 'all' || c.level === state.courseLevel) && `${c.title} ${c.tag} ${c.desc}`.toLowerCase().includes(state.courseSearch.toLowerCase()));
  return `
    <section class="stack">
      <div class="row space-between">
        <div>
          <div class="eyebrow">Каталог курсов</div>
          <h1 class="subsection-title">Прокачка prompt engineering в тенге</h1>
          <p class="section-copy">Фильтруй по уровню, смотри реальные локальные ценовые сценарии и покупай через single‑file UI с жидкими кнопками.</p>
        </div>
        <div class="row">
          <button class="tab-btn ${state.courseLevel==='all'?'active':''}" data-level="all">Все</button>
          <button class="tab-btn ${state.courseLevel==='Junior'?'active':''}" data-level="Junior">Junior</button>
          <button class="tab-btn ${state.courseLevel==='Middle'?'active':''}" data-level="Middle">Middle</button>
        </div>
      </div>

      <div class="panel glass row space-between" style="align-items:flex-start;">
        <div class="stack" style="flex:1;min-width:260px;">
          <label class="eyebrow">Поиск по курсам</label>
          <input id="courseSearch" value="${escapeAttr(state.courseSearch)}" placeholder="например: kaspi, sales, gpt" style="width:100%;padding:16px 18px;border-radius:18px;border:1px solid var(--line);background:color-mix(in srgb, var(--panel-2) 84%, transparent);color:var(--text);font:inherit;" />
        </div>
        <div class="metric glass" style="min-width:240px;">
          <div class="label">Диапазон рынка</div>
          <div class="value">35 000 ₸ — 150 000 ₸</div>
          <div class="meta">Позиционирование под локальный KZ‑рынок и B2B‑сегмент.</div>
        </div>
      </div>

      <div class="grid-3">
        ${filtered.map(c => `
          <article class="card glass card-glow" data-glow style="--glow:${c.glow};">
            <div class="eyebrow">${c.level} · ${c.tag}</div>
            <h3 class="card-title" style="margin-top:10px;font-size:1.35rem;">${c.title}</h3>
            <p class="card-copy">${c.desc}</p>
            <div class="gallery-tile" style="margin:14px 0 16px; aspect-ratio: 16/10;">
              <div class="gallery-caption"><strong>${c.visual || 'AI Visual'}</strong><br><span style="color:#c8d7f7;opacity:.8;">Динамический визуал прямо внутри карточки</span></div>
            </div>
            <div class="row space-between" style="align-items:flex-end;">
              <div>
                <div class="price">${money(c.price)}</div>
                ${c.oldPrice ? `<div class="strike">${money(c.oldPrice)}</div>` : ''}
              </div>
              <div class="soft-badge">★ ${c.rating}</div>
            </div>
            <div class="progress" style="margin:14px 0 16px;"><i style="--p:${c.progress}%"></i></div>
            <div class="row space-between">
              <span class="card-copy">Готовность набора: ${c.progress}%</span>
              ${liquidButton(`Купить за ${money(c.price)}`, 'buy', c.title)}
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function pageStartups() {
  const filtered = startups.filter(s => `${s.title} ${s.category} ${s.desc} ${s.slogan}`.toLowerCase().includes(state.startupSearch.toLowerCase()));
  return `
    <section class="stack">
      <div class="row space-between">
        <div>
          <div class="eyebrow">Ad Matrix</div>
          <h1 class="subsection-title">Витрина инноваций и AI‑стартапов</h1>
          <p class="section-copy">Карточки живут на клиенте, glow следует за курсором, а цены остаются в тенге. Внутри — локальные кейсы, API и сервисы для Казахстана.</p>
        </div>
        <a class="outline-btn" href="#pricing">Рекламные слоты →</a>
      </div>

      <div class="panel glass row space-between">
        <div class="stack" style="flex:1;min-width:260px;">
          <label class="eyebrow">Поиск по стартапам</label>
          <input id="startupSearch" value="${escapeAttr(state.startupSearch)}" placeholder="например: voice, api, kaspi" style="width:100%;padding:16px 18px;border-radius:18px;border:1px solid var(--line);background:color-mix(in srgb, var(--panel-2) 84%, transparent);color:var(--text);font:inherit;" />
        </div>
        <div class="badge-row">
          <span class="soft-badge">KZ market focus</span>
          <span class="soft-badge">Cursor-follow glow</span>
          <span class="soft-badge">Modular cards</span>
        </div>
      </div>

      <div class="grid-3">
        ${filtered.map(s => `
          <article class="card glass card-glow" data-glow style="--glow:${s.glow};min-height:280px;display:grid;gap:12px;align-content:space-between;">
            <div>
              <div class="eyebrow">${s.category}</div>
              <h3 class="card-title" style="margin-top:10px;font-size:1.4rem;">${s.title}</h3>
              <p class="card-copy">${s.desc}</p>
              <div class="gallery-tile" style="aspect-ratio: 16/9; margin-top:14px;">
                <div class="gallery-caption"><strong>${s.slogan}</strong></div>
              </div>
            </div>
            <div class="row space-between">
              <div class="price">${s.price}</div>
              <button class="icon-btn" data-action="toast" data-payload="Открыт слот: ${s.title}">→</button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function pageLab() {
  const ex = taskExamples[state.taskIndex];
  return `
    <section class="stack">
      <div>
        <div class="eyebrow">Task Engine</div>
        <h1 class="subsection-title">Почувствуй мощь <span class="gradient">правильной</span> постановки задач</h1>
        <p class="section-copy">Обычный запрос превращается в профессиональную задачу с ролью, форматом, контекстом и требованиями к результату. Всё происходит внутри одной страницы с мягкой анимацией.</p>
      </div>

      <div class="grid-2">
        <article class="terminal">
          <div class="terminal-top">
            <div class="terminal-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
            <div class="eyebrow">input.task</div>
            <div class="soft-badge">обычный запрос</div>
          </div>
          <div class="terminal-body">
            <div class="code muted">${ex.bad}</div>
            <div class="row space-between">
              ${liquidButton(state.taskProcessing ? 'Анализируем...' : 'УЛУЧШИТЬ ЗАДАЧУ ₸', 'transform', '')}
              <span class="card-copy">Mode: KZ Prompt Upgrade</span>
            </div>
          </div>
        </article>

        <article class="terminal">
          <div class="terminal-top">
            <div class="terminal-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>
            <div class="eyebrow">output.prompt</div>
            <div class="soft-badge">pro result</div>
          </div>
          <div class="terminal-body">
            ${state.taskProcessing ? `
              <div class="processing"><div class="bars"><span></span><span></span><span></span><span></span></div> Нормализуем контекст, усиливаем роль, добавляем формат и ограничения...</div>
              <div class="progress"><i style="--p:68%"></i></div>
            ` : state.taskShowGood ? `
              <div class="code">${ex.good}</div>
              <div class="panel glass" style="padding:14px; background: color-mix(in srgb, var(--ok) 11%, transparent); border-color: color-mix(in srgb, var(--ok) 18%, var(--line));">
                <strong style="color:color-mix(in srgb, var(--ok) 78%, white);">⚡ ${ex.benefit}</strong>
              </div>
            ` : `<div class="code muted">Нажми на кнопку слева, чтобы увидеть магию системной роли и структуры prompt engineering...</div>`}
          </div>
        </article>
      </div>

      <div class="row" style="justify-content:center;">
        ${taskExamples.map((_, i) => `<button class="chip ${state.taskIndex===i?'active':''}" data-task-index="${i}" style="border-radius:999px;padding:10px 12px;${state.taskIndex===i?'background:color-mix(in srgb, var(--accent) 22%, transparent);':''}">${i+1}</button>`).join('')}
      </div>

      <div class="grid-3">
        ${[
          ['Системная роль','Определяет, кем является модель и как она должна мыслить.'],
          ['Контекст и ограничения','Добавляет бизнес‑рамки, локальные особенности и критерии качества.'],
          ['Формат ответа','Требует таблицу, JSON, сценарий, оффер или готовый контент‑план.']
        ].map(([t,d]) => `<article class="card glass"><h3 class="card-title">${t}</h3><p class="card-copy">${d}</p></article>`).join('')}
      </div>
    </section>
  `;
}

function pageSocials() {
  return `
    <section class="stack">
      <div class="row space-between">
        <div>
          <div class="eyebrow">Social Universe</div>
          <h1 class="subsection-title">Внутренние соцстраницы внутри сайта</h1>
          <p class="section-copy">Клик по карточке открывает детальный экран соцсети внутри сайта: стиль, метрики, контент‑потоки, CTA и внешняя рабочая ссылка на реальную платформу.</p>
        </div>
        <button class="outline-btn" data-action="toast" data-payload="Соц‑вселенная готова к просмотру">Проверить all socials</button>
      </div>

      <div class="social-grid">
        ${socials.map(s => `
          <article class="social-card glass card-glow" data-social="${s.id}" data-glow style="--glow:${extractGradientColor(s.color)};">
            <div class="social-logo" style="background:${s.color};">${s.icon}</div>
            <div>
              <div class="eyebrow">${s.handle}</div>
              <h3 class="card-title" style="margin-top:10px;font-size:1.28rem;">${s.name}</h3>
              <p class="card-copy">${s.tagline}</p>
            </div>
            <div class="badge-row">${s.stats.map(st => `<span class="soft-badge">${st}</span>`).join('')}</div>
          </article>
        `).join('')}
      </div>

      <div>
        <div class="eyebrow">Brand gallery</div>
        <h2 class="subsection-title" style="font-size:2rem;">Визуальные миры бренда</h2>
      </div>
      <div class="gallery-grid">
        ${[
          'Neon Growth Dashboard','AI Campus Event Visual','Prompt Lab Interface','Startup Matrix Wall',
          'Kaspi Commerce Pulse','Voice AI Studio','Almaty Brutalist Reel','Enterprise Control Room'
        ].map(t => `<div class="gallery-tile"><div class="gallery-caption"><strong>${t}</strong><br><span style="opacity:.78;">Анимированный декоративный визуал внутри одной страницы</span></div></div>`).join('')}
      </div>
    </section>
  `;
}

function pagePricing() {
  const plans = [
    { name:'Базовый', price: state.planYearly ? 79000 : 8900, unit: state.planYearly ? '/ год' : '/ мес', desc:'База задач, prompt‑шаблоны, еженедельные обновления.', perks:['200 prompt credits','Доступ к 1 команде','Базовая аналитика'] },
    { name:'Pro', price: state.planYearly ? 490000 : 45900, unit: state.planYearly ? '/ год' : '/ мес', desc:'Каталог стартапов, prompt‑лаборатория, коммерческие сценарии.', perks:['Безлимитные коллекции','5 рабочих пространств','Рекламные витрины'] },
    { name:'Enterprise', price: state.planYearly ? 2900000 : 290000, unit: state.planYearly ? '/ год' : '/ мес', desc:'Корпоративная библиотека промптов, роли, SSO, AI governance.', perks:['Локальный onboarding','SLA и audit log','Брендированные зоны'] }
  ];
  return `
    <section class="stack">
      <div class="row space-between">
        <div>
          <div class="eyebrow">Тарифы и монетизация</div>
          <h1 class="subsection-title">Планы для студентов, студий и enterprise</h1>
          <p class="section-copy">Переключай месяц/год, сравнивай выгоду и смотри слоты для размещения стартапов и обучения.</p>
        </div>
        <div class="row">
          <span class="card-copy">Помесячно</span>
          <button class="toggle ${state.planYearly ? 'on' : ''}" id="planToggle"><i></i></button>
          <span class="card-copy">Годовая оплата</span>
        </div>
      </div>

      <div class="grid-3">
        ${plans.map((p, idx) => `
          <article class="card glass" style="display:grid;gap:16px;${idx===1?'box-shadow:0 0 0 1px color-mix(in srgb, var(--accent) 24%, var(--line)), var(--shadow);':''}">
            <div class="row space-between">
              <div>
                <div class="eyebrow">${idx===1?'популярный план':'план'}</div>
                <h3 class="card-title" style="font-size:1.5rem;margin-top:10px;">${p.name}</h3>
              </div>
              ${idx===1?'<span class="soft-badge">TOP</span>':''}
            </div>
            <div class="price" style="font-size:2rem;">${money(p.price)} <span style="font-size:1rem;color:var(--muted);font-weight:700;">${p.unit}</span></div>
            <p class="card-copy">${p.desc}</p>
            <ul class="mega-list">${p.perks.map(x => `<li class="mega-link">${x}</li>`).join('')}</ul>
            ${liquidButton(`Выбрать ${p.name}`, 'buy', p.name)}
          </article>
        `).join('')}
      </div>

      <div class="grid-2">
        <article class="card glass">
          <div class="eyebrow">Платёжный шлюз</div>
          <h3 class="card-title" style="font-size:1.4rem;margin-top:10px;">Kaspi / Halyk placeholders</h3>
          <p class="card-copy">Внутри single‑file UI это демонстрационный gateway‑screen с локальными ценами и понятными пакетами.</p>
          <table>
            <thead><tr><th>Метод</th><th>Статус</th><th>Валюта</th></tr></thead>
            <tbody>
              <tr><td>Kaspi Pay</td><td>Готов для интеграции</td><td>KZT</td></tr>
              <tr><td>Halyk Epay</td><td>Плейсхолдер</td><td>KZT</td></tr>
              <tr><td>Invoice / B2B</td><td>Enterprise</td><td>KZT</td></tr>
            </tbody>
          </table>
        </article>
        <article class="card glass">
          <div class="eyebrow">Рекламные слоты</div>
          <h3 class="card-title" style="font-size:1.4rem;margin-top:10px;">Размещение стартапов</h3>
          <p class="card-copy">Витрина, featured‑лента, видео‑интеграции, карточки соц‑каналов и спонсорские блоки.</p>
          <div class="badge-row" style="margin:16px 0;">
            <span class="soft-badge">от 95 000 ₸ / слот</span>
            <span class="soft-badge">KZ аудитория</span>
            <span class="soft-badge">AI founders</span>
          </div>
          <a class="outline-btn" href="#contact">Обсудить размещение →</a>
        </article>
      </div>
    </section>
  `;
}

function pageContact() {
  return `
    <section class="stack">
      <div>
        <div class="eyebrow">Контакты</div>
        <h1 class="subsection-title">Связь, FAQ и операционная зона</h1>
        <p class="section-copy">Последний слой single‑file интерфейса: карта контакта, форма интереса, FAQ и статус систем.</p>
      </div>

      <div class="grid-2">
        <article class="card glass stack">
          <div class="eyebrow">Head office</div>
          <h3 class="card-title" style="font-size:1.5rem;">Алматы, пр. Аль‑Фараби, 77/7</h3>
          <div class="card-copy">info@aihub.kz<br>+7 (707) AI‑PROMPT<br>Пн–Сб · 10:00–19:00</div>
          <div class="gallery-tile" style="aspect-ratio:16/10;">
            <div class="gallery-caption"><strong>AI HUB Campus</strong><br><span style="opacity:.78;">Локация представлена как интерактивный визуальный модуль</span></div>
          </div>
          <div class="row">
            ${liquidButton('Написать менеджеру', 'toast', 'Менеджер AI HUB уже готов ответить')}
            <button class="outline-btn" data-action="route" data-payload="socials">Открыть соц‑каналы</button>
          </div>
        </article>

        <article class="card glass stack">
          <div class="eyebrow">FAQ</div>
          <div class="faq-item"><button class="faq-q">Можно ли использовать сайт без сборки?<span>+</span></button><div class="faq-a">Да. Этот интерфейс полностью живёт в одном main.html и открывается напрямую в браузере.</div></div>
          <div class="faq-item"><button class="faq-q">Есть ли многостраничные переходы?<span>+</span></button><div class="faq-a">Да. Навигация работает как SPA‑роутер на hash‑маршрутах с анимацией появления и ухода страниц.</div></div>
          <div class="faq-item"><button class="faq-q">Можно ли менять тему и акценты?<span>+</span></button><div class="faq-a">Да. Встроена панель настроек с палитрой, темой, плотностью интерфейса и управлением анимациями.</div></div>
          <div class="faq-item"><button class="faq-q">Есть ли рабочие ссылки на соцсети?<span>+</span></button><div class="faq-a">Да. У каждой внутренней соц‑страницы есть кнопка перехода на реальную платформу: Telegram, Instagram, LinkedIn, YouTube и GitHub.</div></div>
        </article>
      </div>

      <div class="grid-3">
        ${[
          ['Системы в норме','Все UI‑модули активны, реакция элементов включена.'],
          ['Контент обновляется','Живой счётчик и динамика метрик меняются на клиенте.'],
          ['Single-file ready','Для просмотра достаточно открыть main.html двойным кликом.']
        ].map(([t,d]) => `<article class="card glass"><h3 class="card-title">${t}</h3><p class="card-copy">${d}</p></article>`).join('')}
      </div>
    </section>
  `;
}

  const pages = {
    home: pageHome,
    courses: pageCourses,
    startups: pageStartups,
    lab: pageLab,
    socials: pageSocials,
    pricing: pagePricing,
    contact: pageContact
  };

  window.pageHome = pageHome;
  window.pageCourses = pageCourses;
  window.pageStartups = pageStartups;
  window.pageLab = pageLab;
  window.pageSocials = pageSocials;
  window.pagePricing = pagePricing;
  window.pageContact = pageContact;
  window.pages = pages;
})();
