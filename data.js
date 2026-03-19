(function () {
const state = {
  route: (location.hash || '#home').replace('#', ''),
  theme: localStorage.getItem('aih_theme') || 'dark',
  accent: localStorage.getItem('aih_accent') || '#56a8ff',
  accent2: localStorage.getItem('aih_accent2') || '#8b5cf6',
  accent3: localStorage.getItem('aih_accent3') || '#22d3ee',
  currency: localStorage.getItem('aih_currency') || 'KZT',
  reducedMotion: localStorage.getItem('aih_motion') === 'reduced',
  menuOpen: false,
  settingsOpen: false,
  taskIndex: 0,
  taskProcessing: false,
  taskShowGood: false,
  courseLevel: 'all',
  courseSearch: '',
  startupSearch: '',
  planYearly: false,
  activeSocial: null,
  kztLive: 8900,
  viewer: 241,
  notifications: true,
  density: localStorage.getItem('aih_density') || 'cozy'
};

const navItems = [
  ['home', 'Главная'],
  ['courses', 'Курсы'],
  ['startups', 'Стартапы'],
  ['lab', 'Prompt Lab'],
  ['socials', 'Соцсети'],
  ['pricing', 'Тарифы'],
  ['contact', 'Контакты']
];

const courses = [
  { title: 'AI-Архитектор: От идеи до MVP', level: 'Middle', price: 85000, oldPrice: 120000, rating: 4.9, progress: 92, tag: 'Claude · GPT · Midjourney', desc: 'Глубокое погружение в бизнес-процессы, автоматизацию и проектирование AI-сервисов.', visual: 'Неоновая сборка механизма', glow: '#56a8ff' },
  { title: 'Промпт-инжиниринг для разработчиков', level: 'Middle', price: 55000, oldPrice: 0, rating: 4.8, progress: 88, tag: 'API · Refactor · Docs', desc: 'Автоматизация кода, рефакторинг, тесты и техдок через API и системные роли.', visual: 'Самопечатающийся код', glow: '#8b5cf6' },
  { title: 'Промпты для тендерных заявок', level: 'Junior', price: 75000, oldPrice: 0, rating: 4.7, progress: 81, tag: 'B2G · Docs · KZ', desc: 'Шаблоны промптов и логика оформления сложных тендерных заявок для локального рынка.', glow: '#22d3ee' },
  { title: 'Нейро-сотрудники для отделов продаж', level: 'Middle', price: 120000, oldPrice: 150000, rating: 5.0, progress: 96, tag: 'Sales AI · CRM · Scripts', desc: 'Проектирование AI-агентов для лидогенерации, скриптов и прогрева базы.', glow: '#31d0aa' },
  { title: 'AI-контент для Kaspi-магазина', level: 'Junior', price: 45000, oldPrice: 65000, rating: 4.6, progress: 75, tag: 'Kaspi · Cards · SEO', desc: 'Карточки товаров, баннеры, описания и AI-аналитика ассортимента.', glow: '#f59e0b' },
  { title: 'Prompt Design для брендов Казахстана', level: 'Junior', price: 39000, oldPrice: 0, rating: 4.5, progress: 72, tag: 'Brand Voice · Local', desc: 'Локальные культурные коды, Наурыз, Almaty vibe, tone-of-voice и визуальный стиль.', glow: '#fb7185' }
];

const startups = [
  { title: 'Astana-GPT Helper', category: 'Сервис', price: '4 900 ₸ / мес', slogan: 'Твой личный бухгалтер в кармане.', desc: 'Локализованный помощник по бухгалтерии и налогам РК.', glow: '#56a8ff' },
  { title: 'Qazaq-Voice AI', category: 'Озвучка', price: '12 500 ₸ / 100к символов', slogan: 'Твой контент заговорит на родном языке.', desc: 'Озвучка на казахском и русском с чистой локальной фонетикой.', glow: '#8b5cf6' },
  { title: 'AI-аналитика Kaspi-магазина', category: 'Аналитика', price: '15 900 ₸ / мес', slogan: 'Рост метрик без ручной рутины.', desc: 'AI-панель по карточкам, продажам, воронке и сезонным промо.', glow: '#22d3ee' },
  { title: 'NLP Kazakh-GPT API', category: 'API', price: '0.5 ₸ / запрос', slogan: 'Локальная языковая точность.', desc: 'API для казахского и русского текста, тональности и извлечения сущностей.', glow: '#f59e0b' },
  { title: 'Alatau Vision', category: 'CV', price: '38 000 ₸ / мес', slogan: 'Компьютерное зрение для ритейла.', desc: 'Отслеживание полок, очередей и визуального мерчендайзинга.', glow: '#31d0aa' },
  { title: 'Prompt Desk Enterprise', category: 'B2B', price: '290 000 ₸ / мес', slogan: 'Управление корпоративной библиотекой промптов.', desc: 'Роли, шаблоны, доступы, аналитика эффективности и workflow-пакеты.', glow: '#fb7185' }
];

const taskExamples = [
  {
    bad: 'Напиши пост про ИИ',
    good: 'Роль: SMM-стратег. Задача: Написать виральный пост для Instagram кофейни в Астане. Цель: Рассказать об использовании ИИ для создания рецептов кофе. Тон: Дружелюбный, экспертный. Обязательно используй локальный сленг и призыв к действию.',
    benefit: 'Результат на 400% точнее'
  },
  {
    bad: 'Сделай картинку робота',
    good: 'Prompt: Futuristic android in Brutalist Almaty architecture setting, cinematic lighting, hyper-realistic, neon accents, Soviet-wave aesthetic, shot on 35mm lens, billboard-grade composition, editorial mood.',
    benefit: 'Экономия генераций и сильнее арт-дирекшн'
  },
  {
    bad: 'Составь план для кофейни',
    good: 'Роль: Эксперт по стратегическому маркетингу в Казахстане. Задача: Составить контент-план на месяц для кофейни в Алматы. Условие: Учесть Наурыз, использовать культурные коды и сленг города. Формат: Таблица (Дата | Тема | Текст поста | Промпт для картинки).',
    benefit: 'Структура для реального бизнеса, а не общий текст'
  }
];

const socials = [
  {
    id: 'telegram', name: 'Telegram', handle: '@aih_kz', ext: 'https://telegram.org/',
    color: 'linear-gradient(135deg,#229ED9,#56a8ff)', icon: '✈',
    tagline: 'Оперативные анонсы, инсайды и prompt drops.',
    stats: ['41K подписчиков', 'ER 9.8%', 'Ежедневные подборки'],
    sections: ['Новости рынка AI Казахстана', 'Промпт-паки недели', 'Вакансии и стажировки', 'Анонсы вебинаров']
  },
  {
    id: 'instagram', name: 'Instagram', handle: '@aih.kz', ext: 'https://www.instagram.com/',
    color: 'linear-gradient(135deg,#ff6ea8,#ff8a00,#8b5cf6)', icon: '◎',
    tagline: 'Рилсы, карусели и визуальный storytelling для бренда.',
    stats: ['58K подписчиков', 'Просмотры Reels 220K+', 'Визуальные кейсы'],
    sections: ['Карусели про prompt engineering', 'Backstage AI-съёмок', 'UGC студенты / кейсы', 'Visual drop library']
  },
  {
    id: 'linkedin', name: 'LinkedIn', handle: 'AI HUB Kazakhstan', ext: 'https://www.linkedin.com/',
    color: 'linear-gradient(135deg,#0A66C2,#22d3ee)', icon: 'in',
    tagline: 'B2B витрина, вакансии и экспертный бренд.',
    stats: ['12K followers', 'B2B лиды 18%', 'Enterprise stories'],
    sections: ['Партнёрские кейсы', 'AI для enterprise', 'Thought leadership', 'Recruiting funnels']
  },
  {
    id: 'youtube', name: 'YouTube', handle: 'AI HUB KZ', ext: 'https://www.youtube.com/',
    color: 'linear-gradient(135deg,#ff2d55,#ff4d4d)', icon: '▶',
    tagline: 'Видеоразборы, live-показы и длинные туториалы.',
    stats: ['27K подписчиков', 'Средний watchtime 11:32', '2 longform / week'],
    sections: ['Разборы AI-стартапов', 'Prompt Engineering show', 'Tutorials', 'AI market commentary']
  },
  {
    id: 'github', name: 'GitHub', handle: 'github.com', ext: 'https://github.com/',
    color: 'linear-gradient(135deg,#64748b,#111827)', icon: '{ }',
    tagline: 'Open-source шаблоны, boilerplates и демо-интеграции.',
    stats: ['9 open repos', '1.3K stars', 'Dev community'],
    sections: ['Starter kits', 'Prompt routers', 'Frontend playgrounds', 'API examples']
  }
];

  window.state = state;
  window.navItems = navItems;
  window.courses = courses;
  window.startups = startups;
  window.taskExamples = taskExamples;
  window.socials = socials;
})();
