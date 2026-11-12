/* ==========================================================================
   MONO — логика онлайн магазина
   --------------------------------------------------------------------------
   ✏️✏️✏️  КАК НАСТРОИТЬ МАГАЗИН ПОД СЕБЯ — шпаргалка  ✏️✏️✏️

   ВСЁ ОСНОВНОЕ — ВНИЗУ, В ДВУХ СЕКЦИЯХ:

   ① CONFIG (секция «1. НАСТРОЙКИ МАГАЗИНА»)
      • brand        — название магазина. Подставится АВТОМАТИЧЕСКИ
                       в шапку, футер и прелоадер.
      • heroBadge / heroTitle / heroSubtitle — тексты главной страницы
                       ('\\n' внутри heroTitle = перенос строки).
      • currency     — символ валюты (₽, $, €…).
      • delivery     — способы доставки: название, описание, цена.
      • payments     — способы оплаты: название, описание.
      • promos       — промокоды: 'КОД' → процент скидки.

   ② PRODUCTS (секция «2. СПИСОК ТОВАРОВ»)
      Каждый товар: name, image, price, oldPrice, rating, sold, hit,
      isNew, category, description, details, specs.
      • image — путь к фото ('img/foto1.jpg' или ссылка https://...).
        Пусто '' → будет красивая пронумерованная заглушка.
      • oldPrice — старая (зачёркнутая) цена или null.
      • hit / isNew — значки «ХИТ» и «NEW» на фото.

   ③ CATEGORIES — список категорий (чипсы фильтров, плитки на главной).
      Названия должны совпадать с полем category у товаров!

   ④ REVIEWS — отзывы на странице товара.

   ТАКЖЕ вручную меняются (помечены комментарием ✏️ в index.html):
      • <title> и meta description;
      • контакты и копирайт в футере;
      • слоган в выдвижном меню.

   В style.css первой строкой в :root лежит --accent — акцентный цвет
   (сейчас кислотно-лаймовый; можно заменить или поставить тон-в-тон).

   ─────────────────────────────────────────────────────────────────────────
   Фишки дизайна: тема-инверсия, кастомный курсор, магнетизм кнопок,
   аура из частиц в герое, 3D-наклон карточек, проявление при скролле,
   прелоадер, звуковые «тики».
   Дальше идёт технический код — менять не обязательно.
   ========================================================================== */

/* ==========================================================================
   1. НАСТРОЙКИ МАГАЗИНА  ← ✏️ ВПИШИ СЮДА СВОЁ
   ========================================================================== */

const CONFIG = {
  brand: 'MONO',

  heroBadge: 'Онлайн магазин · новое поколение',
  heroTitle: 'Магазин, в котором\n каждая деталь имеет значение',
  heroSubtitle: 'Минимализм, качество и честные цены. Все новинки — на одной витрине.',

  currency: '₽',

  /* Стоимость доставки (используется при оформлении заказа) */
  delivery: [
    { id: 'courier', title: 'Курьером',   sub: 'Доставка до двери, 1–2 дня',   price: 300 },
    { id: 'pickup',  title: 'Самовывоз',  sub: 'Из пункта выдачи, завтра',     price: 0 },
    { id: 'post',    title: 'Почтой',     sub: 'Срок 3–7 дней, по стране',     price: 250 },
  ],

  /* Способы оплаты */
  payments: [
    { id: 'card', title: 'Картой онлайн', sub: 'Visa · Mastercard · МИР' },
    { id: 'sbp',  title: 'СБП',           sub: 'Оплата по QR-коду или по номеру телефона' },
    { id: 'cash', title: 'При получении', sub: 'Наличными или картой курьеру' },
  ],

  /* Промокоды: КОД → скидка в процентах */
  promos: { MONO10: 10, BLACK15: 15 },
};

/* ==========================================================================
   2. СПИСОК ТОВАРОВ  ← ВПИШИ СЮДА СВОИ ТОВАРЫ
   --------------------------------------------------------------------------
   Поля каждого товара:
     id          — уникальный номер (не меняй)
     name        — название
     image       — путь к фото ('img/foto1.jpg' или https://...). '' = заглушка
     price       — цена
     oldPrice    — старая цена (зачёркнутая) или null
     rating      — оценка 0–5
     sold        — сколько раз купили
     hit         — true → значок «ХИТ»
     isNew       — true → значок «NEW»
     category    — категория
     description — краткое описание
     details     — развёрнутое описание
     specs       — характеристики [{ k: 'Название', v: 'Значение' }]
   ========================================================================== */

/* ✏️ Категории — используются в фильтрах каталога и плитках на главной.
   ВАЖНО: названия должны совпадать с полем category у товаров из PRODUCTS. */
const CATEGORIES = ['Электроника', 'Аксессуары', 'Стиль', 'Для дома'];

const NEUTRAL_DESC = 'Нейтральное описание товара. Замените его в файле app.js — поле description.';
const NEUTRAL_DETAILS = 'Развёрнутое описание товара.\nЗдесь можно рассказать всё: из чего сделан, для кого подходит, как использовать и чем он лучше других. Все тексты меняются в файле app.js, массив PRODUCTS.';

const PRODUCTS = [
  { id: 1,  name: 'Товар №1',  image: '', price: 4990,  oldPrice: 6990,  rating: 4.8, sold: 1240, hit: true,  isNew: false, category: 'Электроника', description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Характеристика 2', v: 'Значение' }, { k: 'Гарантия', v: '12 месяцев' }] },
  { id: 2,  name: 'Товар №2',  image: '', price: 12990, oldPrice: null,  rating: 4.9, sold: 860,  hit: true,  isNew: true,  category: 'Электроника', description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Характеристика 2', v: 'Значение' }, { k: 'Гарантия', v: '12 месяцев' }] },
  { id: 3,  name: 'Товар №3',  image: '', price: 3490,  oldPrice: null,  rating: 4.5, sold: 2100, hit: false, isNew: false, category: 'Стиль',       description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Материал', v: 'Значение' }] },
  { id: 4,  name: 'Товар №4',  image: '', price: 2490,  oldPrice: 3290,  rating: 4.6, sold: 1740, hit: false, isNew: true,  category: 'Аксессуары',  description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Гарантия', v: '6 месяцев' }] },
  { id: 5,  name: 'Товар №5',  image: '', price: 8990,  oldPrice: null,  rating: 4.7, sold: 640,  hit: true,  isNew: false, category: 'Электроника', description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Гарантия', v: '12 месяцев' }] },
  { id: 6,  name: 'Товар №6',  image: '', price: 1590,  oldPrice: null,  rating: 4.3, sold: 3200, hit: false, isNew: false, category: 'Аксессуары',  description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Материал', v: 'Значение' }] },
  { id: 7,  name: 'Товар №7',  image: '', price: 5990,  oldPrice: 7490,  rating: 4.8, sold: 980,  hit: false, isNew: true,  category: 'Для дома',    description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Гарантия', v: '24 месяца' }] },
  { id: 8,  name: 'Товар №8',  image: '', price: 2190,  oldPrice: null,  rating: 4.4, sold: 1560, hit: false, isNew: false, category: 'Стиль',       description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Материал', v: 'Значение' }] },
  { id: 9,  name: 'Товар №9',  image: '', price: 7490,  oldPrice: null,  rating: 4.9, sold: 520,  hit: true,  isNew: true,  category: 'Для дома',    description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Гарантия', v: '24 месяца' }] },
  { id: 10, name: 'Товар №10', image: '', price: 1090,  oldPrice: 1590,  rating: 4.2, sold: 4100, hit: false, isNew: false, category: 'Аксессуары',  description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Материал', v: 'Значение' }] },
  { id: 11, name: 'Товар №11', image: '', price: 3990,  oldPrice: null,  rating: 4.6, sold: 1120, hit: false, isNew: false, category: 'Стиль',       description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }] },
  { id: 12, name: 'Товар №12', image: '', price: 6790,  oldPrice: 8290,  rating: 4.7, sold: 760,  hit: false, isNew: true,  category: 'Электроника', description: NEUTRAL_DESC, details: NEUTRAL_DETAILS, specs: [{ k: 'Характеристика 1', v: 'Значение' }, { k: 'Гарантия', v: '12 месяцев' }] },
];

/* Нейтральные отзывы (можно отредактировать или удалить) */
/* ✏️ Отзывы на странице товара: имя, дата, текст, оценка (1–5) */
const REVIEWS = [
  { name: 'Покупатель А', date: 'Недавно', text: 'Нейтральный текст отзыва. Замените его в файле app.js, массив REVIEWS.', rating: 5 },
  { name: 'Покупатель Б', date: 'Ранее',   text: 'Нейтральный текст отзыва. Замените его в файле app.js, массив REVIEWS.', rating: 4 },
];

/* ==========================================================================
   Дальше — технический код. Менять не обязательно.
   ========================================================================== */

/* ---------- иконки ---------- */
const ICONS = {
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8-6.1-3.6-6.1 3.6 1.5-6.8L2.2 9l6.9-.7L12 2z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.7-9.3-9.3C1.4 7.9 3.6 4.5 7 4.5c2.2 0 3.9 1.3 5 3 1.1-1.7 2.8-3 5-3 3.4 0 5.6 3.4 4.3 6.7-1.8 4.6-9.3 9.3-9.3 9.3z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5C6 5 3 12 3 12s3 7 9 7 9-7 9-7-3-7-9-7z"/><circle cx="12" cy="12" r="2.5"/></svg>',
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M4 18l6-5 4 3.5 3-2.5 3 2.5"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><path d="M14 6l-6 6 6 6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 13.6-5.7L20 8.5M20 12a8 8 0 0 1-13.6 5.7L4 15.5"/><path d="M20 4v4.5h-4.5M4 20v-4.5h4.5"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/></svg>',
};

/* ---------- утилиты ---------- */
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

const formatMoney = (n) => `${Number(n).toLocaleString('ru-RU')} ${CONFIG.currency}`;

let toastTimer = null;
function showToast(text, accent = false) {
  const t = $('#toast');
  t.textContent = text;
  t.classList.toggle('toast--accent', accent);
  t.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2400);
}

/* сохранение / чтение localStorage */
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

const finePointer = matchMedia('(pointer: fine)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   ПРЕЛОАДЕР (логотип при загрузке)
   ========================================================================== */
const preloader = $('#preloader');
document.body.classList.add('preloading');

function hidePreloader() {
  if (!preloader || preloader.classList.contains('is-done')) return;
  preloader.classList.add('is-done');
  document.body.classList.remove('preloading');
  setTimeout(() => preloader.remove(), 700);
}
addEventListener('load', () => setTimeout(hidePreloader, 550)); // небольшая пауза, чтобы логотип успел «прозвучать»
setTimeout(hidePreloader, 2500); // страховка, если что-то грузится слишком долго

/* ==========================================================================
   ЗВУК: аккуратные «тики» на кнопках (WebAudio, без файлов)
   ========================================================================== */
let audioCtx = null;
let soundOn = load('mono-sound', true);

function getAudioCtx() {
  if (!soundOn) return null;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch { return null; }
}

/* короткий тихий «тик»: синус с быстрым спадом и лёгким случайным питчем */
function playTick(freq = 2100, vol = .045, dur = .045) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq * (0.94 + Math.random() * 0.12), t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + dur);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/* двойной мягкий «динь» для важных действий (заказ оформлен и т.п.) */
function playSuccess() {
  playTick(1300, .05, .07);
  setTimeout(() => playTick(1850, .05, .1), 90);
}

const TICK_SEL = '.btn, .icon-btn, .chip-f, .card__fav, .pdp__fav, .pdp__thumb, ' +
                 '.qty button, .cart-item__remove, .drawer__link, .drawer__sound, ' +
                 '.promo button, .burger, .link-btn, .check';

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest(TICK_SEL)) playTick();
}, { passive: true });

/* ==========================================================================
   ТЕМА: тёмная / светлая (инверсия) — кнопка в шапке
   ========================================================================== */
function applyTheme(t) {
  document.body.classList.toggle('light', t === 'light');
  save('mono-theme', t);
}
applyTheme(load('mono-theme', 'dark'));

/* ==========================================================================
   МАГНЕТИЗМ КНОПОК (курсор — обычный системный)
   ========================================================================== */
if (finePointer && !reducedMotion) {
  /* кнопки слегка «притягиваются» к курсору */
  let magBtn = null;
  document.addEventListener('pointermove', (e) => {
    const btn = e.target.closest('.btn');
    if (btn !== magBtn) {
      if (magBtn) magBtn.style.transform = '';
      magBtn = btn;
    }
    if (btn) {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * .16}px, ${dy * .28}px)`;
    }
  });
}

/* ==========================================================================
   3D-НАКЛОН КАРТОЧЕК + БЛИК ЗА КУРСОРОМ
   ========================================================================== */
if (finePointer && !reducedMotion) {
  const tiltSel = '.card__media, .cat-tile, .pdp__media';

  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest(tiltSel);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(py - .5) * -9}deg) rotateY(${(px - .5) * 11}deg)`;
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  });
  document.addEventListener('pointerout', (e) => {
    const el = e.target.closest(tiltSel);
    if (el && !el.contains(e.relatedTarget)) el.style.transform = '';
  });
}

/* ==========================================================================
   ПРОЯВЛЕНИЕ БЛОКОВ ПРИ СКРОЛЛЕ
   ========================================================================== */
const REVEAL_SEL = '.section-head, .stat, .cat-tile, .filters, .summary, .panel, ' +
                   '.profile-head, .order, .empty, .pdp__media-wrap, .pdp__info, .review, .success';

const revealObserver = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (en.isIntersecting) {
      en.target.classList.add('is-in');
      revealObserver.unobserve(en.target);
    }
  }
}, { threshold: .1 });

function bindReveals() {
  document.querySelectorAll(REVEAL_SEL).forEach((el, i) => {
    if (el.classList.contains('reveal') || el.classList.contains('is-in')) return;
    el.classList.add('reveal');
    el.style.setProperty('--rd', `${Math.min((i % 8) * .05, .35)}s`);
    el.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'opacity') return;
      el.classList.remove('reveal', 'is-in');
      el.style.removeProperty('--rd');
      el.removeEventListener('transitionend', handler);
    });
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   АУРА: живые частицы в герое (реагируют на курсор)
   ========================================================================== */
function initAura() {
  const hero = document.querySelector('.hero');
  if (!hero || reducedMotion) return;
  const canvas = hero.querySelector('.hero__aura');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0, h = 0;
  const resize = () => {
    const r = hero.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = r.width; h = r.height;
    canvas.width = Math.max(1, w * dpr);
    canvas.height = Math.max(1, h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  addEventListener('resize', resize);

  const N = 70;
  const pts = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), vx: 0, vy: 0 }));
  let mx = -9999, my = -9999, t = 0;

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', () => { mx = -9999; my = -9999; });

  (function frame() {
    if (!hero.isConnected) return;                 // герой пересоздан — стоп
    requestAnimationFrame(frame);
    if (screens.home.hidden) return;               // экран не виден — пропускаем кадр
    t += 1;
    ctx.clearRect(0, 0, w, h);
    const isLight = document.body.classList.contains('light');
    const rgb = isLight ? '0,0,0' : '255,255,255';
    const aLine = isLight ? .42 : .22, aDot = isLight ? .6 : .35;

    for (const p of pts) {
      const x = p.x * w, y = p.y * h;
      /* «поле ветра» — плавные вихри */
      const a = Math.sin(y * .011 + t * .01) + Math.cos(x * .009 - t * .008);
      p.vx += Math.cos(a * Math.PI) * .03;
      p.vy += Math.sin(a * Math.PI) * .03;

      /* отталкивание от курсора */
      const dx = x - mx, dy = y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < 160 * 160) {
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d / 160) * .9;
        p.vx += dx / d * f;
        p.vy += dy / d * f;
      }

      p.vx *= .94; p.vy *= .94;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > 1.6) { p.vx *= 1.6 / sp; p.vy *= 1.6 / sp; }
      p.x += p.vx / w; p.y += p.vy / h;
      if (p.x < 0) p.x += 1; if (p.x > 1) p.x -= 1;
      if (p.y < 0) p.y += 1; if (p.y > 1) p.y -= 1;

      const nx = p.x * w, ny = p.y * h;
      ctx.strokeStyle = `rgba(${rgb},${aLine})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(nx - p.vx * 7, ny - p.vy * 7);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.fillStyle = `rgba(${rgb},${aDot})`;
      ctx.beginPath();
      ctx.arc(nx, ny, 1.2, 0, 7);
      ctx.fill();
    }
  })();
}

/* ---------- заглушка вместо фото: детерминированный градиент ---------- */
function gradientFor(id, variant = 0) {
  const base = 14 + ((id * 7 + variant * 9) % 22);
  const spot = 8 + ((id * 5 + variant * 13) % 14);
  const angle = 130 + variant * 45;
  return `linear-gradient(${angle}deg, hsl(0 0% ${base + spot}%), hsl(0 0% ${base - 6}%))`;
}

function mediaHTML(p, variant = 0) {
  const img = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">` : '';
  return `
    <div class="ph" style="background:${gradientFor(p.id, variant)}">
      ${ICONS.photo}
      <span>Фото товара</span>
      <span class="ph__num">${String(p.id).padStart(2, '0')}</span>
    </div>
    ${img}`;
}

function salePercent(p) {
  return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
}

/* ==========================================================================
   СОСТОЯНИЕ (localStorage)
   ========================================================================== */
let cart     = load('mono-cart', []);       // [{id, qty}]
let favs     = load('mono-fav', []);        // [id]
let orders   = load('mono-orders', []);     // [order]
let profile  = load('mono-profile', { name: '', phone: '', email: '', address: '' });
let promo    = load('mono-promo', null);
let lastOrder = load('mono-last-order', null);

let currentView = 'home';
let currentProductId = null;

/* фильтры каталога */
const filters = { query: '', cat: 'Все', sort: 'popular', min: '', max: '', saleOnly: false, hitOnly: false };

/* состояние оформления заказа */
const checkout = { step: 1, delivery: 'courier', payment: 'card' };

/* ==========================================================================
   КОРЗИНА / ИЗБРАННОЕ
   ========================================================================== */
const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
const cartSubtotal = () => cart.reduce((s, i) => {
  const p = PRODUCTS.find(x => x.id === i.id);
  return p ? s + p.price * i.qty : s;
}, 0);
const promoPercent = () => (promo && CONFIG.promos[promo]) || 0;
const promoDiscount = () => Math.round(cartSubtotal() * promoPercent() / 100);

function addToCart(id, silent = false) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty += 1; else cart.push({ id, qty: 1 });
  save('mono-cart', cart);
  renderBadges(true);
  if (!silent) showToast('Товар добавлен в корзину');
  if (currentView === 'cart') renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  save('mono-cart', cart);
  renderBadges();
  if (currentView === 'cart') renderCart();
}

function setQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(id);
  save('mono-cart', cart);
  renderBadges();
  if (currentView === 'cart') renderCart();
}

function toggleFav(id) {
  favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  save('mono-fav', favs);
  renderBadges();
  const on = favs.includes(id);
  showToast(on ? 'Добавлено в избранное ♥' : 'Удалено из избранного', on);
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => b.classList.toggle('is-active', on));
  if (currentView === 'favorites') renderFavorites();
}

function renderBadges(bump = false) {
  const n = cartCount();
  const cartEl = $('#headerCartCount');
  cartEl.textContent = n;
  cartEl.hidden = n === 0;
  if (bump) { cartEl.classList.remove('bump'); void cartEl.offsetWidth; cartEl.classList.add('bump'); }

  const favEl = $('#favCount');
  favEl.textContent = favs.length;
  favEl.hidden = favs.length === 0;

  const cartBadge = $('#drawerCartBadge');
  cartBadge.textContent = n; cartBadge.hidden = n === 0;
  const favBadge = $('#drawerFavBadge');
  favBadge.textContent = favs.length; favBadge.hidden = favs.length === 0;
}

/* ==========================================================================
   РЕНДЕР КАРТОЧКИ ТОВАРА
   ========================================================================== */
function cardHTML(p, i = 0) {
  const isFav = favs.includes(p.id);
  const sale = salePercent(p);
  const badges = [
    p.hit ? '<span class="badge-hit">Хит</span>' : '',
    p.isNew ? '<span class="badge-sale">NEW</span>' : '',
    sale ? `<span class="badge-sale">−${sale}%</span>` : '',
  ].join('');

  return `
    <article class="card" style="--d:${Math.min(i * 0.04, .5)}s">
      <a class="card__media" href="#product-${p.id}" aria-label="${esc(p.name)}">
        <span class="card__badges">${badges}</span>
        ${mediaHTML(p)}
      </a>
      <button class="card__fav ${isFav ? 'is-active' : ''}" data-fav="${p.id}" aria-label="В избранное">${ICONS.heart}</button>
      <div class="card__body">
        <span class="card__cat">${esc(p.category)}</span>
        <a class="card__name" href="#product-${p.id}">${esc(p.name)}</a>
        <div class="card__row">
          <span class="rating">${ICONS.star} ${p.rating.toFixed(1)}</span>
          <span class="sold">${p.sold.toLocaleString('ru-RU')} покупок</span>
        </div>
        <div class="card__row">
          <span class="card__price">${p.oldPrice ? `<s>${formatMoney(p.oldPrice)}</s>` : ''}${formatMoney(p.price)}</span>
        </div>
        <div class="card__actions">
          <button class="btn btn--light" data-buy="${p.id}">Купить</button>
          <button class="btn btn--ghost btn--icon" data-add="${p.id}" aria-label="В корзину">${ICONS.cart}</button>
        </div>
      </div>
    </article>`;
}

/* ==========================================================================
   ЭКРАН: ГЛАВНАЯ
   ========================================================================== */
function renderHome() {
  const [t1, t2] = CONFIG.heroTitle.split('\n');
  const hits = PRODUCTS.filter(p => p.hit);
  const fresh = PRODUCTS.filter(p => p.isNew);
  const top = [...PRODUCTS].sort((a, b) => b.sold - a.sold).slice(0, 4);

  const marqueeItems = Array(8).fill(
    'Доставка от 1 дня <b>•</b> Гарантия качества <b>•</b> Возврат 14 дней <b>•</b> Оплата при получении <b>•</b>'
  ).join('');

  const cats = CATEGORIES.map((c, i) => `
    <a class="cat-tile" data-goto-cat="${esc(c)}" href="#catalog" style="--d:${i * .06}s">
      <span class="cat-tile__count">${PRODUCTS.filter(p => p.category === c).length} товаров</span>
      <span class="cat-tile__name">${esc(c)}</span>
      <span class="cat-tile__arrow">${ICONS.arrow}</span>
    </a>`).join('');

  const orbitList = [...hits, ...PRODUCTS.filter(p => !p.hit)].slice(0, 8);
  const orbitItems = orbitList.map((p, i) => `
    <a class="orbit__item" href="#product-${p.id}" style="--a:${(360 / orbitList.length) * i}deg" draggable="false">
      <span class="orbit__media">${mediaHTML(p)}</span>
      <span class="orbit__name">${esc(p.name)}</span>
      <span class="orbit__price">${formatMoney(p.price)}</span>
    </a>`).join('');

  screens.home.innerHTML = `
    <div class="container">

      <section class="hero">
        <span class="hero__watermark" aria-hidden="true">${esc(CONFIG.brand)}</span>
        <canvas class="hero__aura" aria-hidden="true"></canvas>
        <span class="hero__eyebrow">${esc(CONFIG.heroBadge)}</span>
        <h1 class="hero__title">${esc(t1)}<em>${esc(t2)}</em></h1>
        <p class="hero__subtitle">${esc(CONFIG.heroSubtitle)}</p>
        <div class="hero__cta">
          <a class="btn btn--light" href="#catalog">Смотреть каталог ${ICONS.arrow}</a>
          <a class="btn btn--ghost" href="#product-${hits[0]?.id ?? 1}">Хит продаж</a>
        </div>
        <div class="orbit" id="orbit" aria-label="Карусель товаров — потяните, чтобы повернуть">
          <div class="orbit__ring" id="orbitRing">${orbitItems}</div>
        </div>
        <div class="hero__chips">
          <span class="hero__chip">${ICONS.truck} Быстрая доставка</span>
          <span class="hero__chip">${ICONS.shield} Гарантия 12 месяцев</span>
          <span class="hero__chip">${ICONS.refresh} Возврат 14 дней</span>
        </div>
      </section>

      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">${marqueeItems}</div>
      </div>

      <div class="stats">
        <div class="stat glass"><p class="stat__num">12<i>+</i></p><p class="stat__label">товаров на витрине</p></div>
        <div class="stat glass"><p class="stat__num">10K<i>+</i></p><p class="stat__label">довольных покупателей</p></div>
        <div class="stat glass"><p class="stat__num">4.8<i>/5</i></p><p class="stat__label">средняя оценка</p></div>
      </div>

      <div class="section-head"><h2>Категории</h2><a href="#catalog">Весь каталог →</a></div>
      <div class="cats">${cats}</div>

      <div class="section-head"><h2>Хиты продаж</h2><a href="#catalog">Показать все →</a></div>
      <div class="grid">${top.map((p, i) => cardHTML(p, i)).join('')}</div>

      ${fresh.length ? `
      <div class="section-head"><h2>Новинки</h2><a href="#catalog">Показать все →</a></div>
      <div class="grid">${fresh.map((p, i) => cardHTML(p, i)).join('')}</div>` : ''}
    </div>`;

  initAura();
  initWheel();
}

/* ==========================================================================
   ЭКРАН: КАТАЛОГ (+ фильтры, поиск, сортировка)
   ========================================================================== */
function filteredProducts() {
  let list = [...PRODUCTS];

  if (filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q));
  }
  if (filters.cat !== 'Все') list = list.filter(p => p.category === filters.cat);
  if (filters.min !== '' && !isNaN(+filters.min)) list = list.filter(p => p.price >= +filters.min);
  if (filters.max !== '' && !isNaN(+filters.max)) list = list.filter(p => p.price <= +filters.max);
  if (filters.saleOnly) list = list.filter(p => p.oldPrice);
  if (filters.hitOnly) list = list.filter(p => p.hit);

  switch (filters.sort) {
    case 'cheap':    list.sort((a, b) => a.price - b.price); break;
    case 'expensive':list.sort((a, b) => b.price - a.price); break;
    case 'rating':   list.sort((a, b) => b.rating - a.rating); break;
    case 'new':      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id); break;
    default:         list.sort((a, b) => b.sold - a.sold);
  }
  return list;
}

function renderCatalog() {
  const list = filteredProducts();
  const chips = ['Все', ...CATEGORIES].map(c =>
    `<button class="chip-f ${filters.cat === c ? 'is-active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');

  screens.catalog.innerHTML = `
    <div class="container">
      <div class="section-head"><h2>Каталог</h2><span>${list.length} из ${PRODUCTS.length} товаров</span></div>

      <div class="filters glass">
        <div class="filters__row">
          <div class="chips">${chips}</div>
        </div>
        <div class="filters__row">
          <div class="filters__group">
            <span class="filters__label">Цена</span>
            <input class="field field--price" id="priceMin" type="number" min="0" placeholder="от" value="${esc(filters.min)}">
            <input class="field field--price" id="priceMax" type="number" min="0" placeholder="до" value="${esc(filters.max)}">
          </div>
          <div class="filters__group">
            <span class="filters__label">Сортировка</span>
            <select class="field" id="sortSelect">
              <option value="popular" ${filters.sort === 'popular' ? 'selected' : ''}>Популярные</option>
              <option value="cheap" ${filters.sort === 'cheap' ? 'selected' : ''}>Сначала дешёвые</option>
              <option value="expensive" ${filters.sort === 'expensive' ? 'selected' : ''}>Сначала дорогие</option>
              <option value="rating" ${filters.sort === 'rating' ? 'selected' : ''}>По рейтингу</option>
              <option value="new" ${filters.sort === 'new' ? 'selected' : ''}>Новинки</option>
            </select>
          </div>
          <label class="check">
            <input type="checkbox" id="saleOnly" ${filters.saleOnly ? 'checked' : ''}>
            <span class="check__box">${ICONS.check}</span> Со скидкой
          </label>
          <label class="check">
            <input type="checkbox" id="hitOnly" ${filters.hitOnly ? 'checked' : ''}>
            <span class="check__box">${ICONS.check}</span> Только хиты
          </label>
          <button class="link-btn" data-reset-filters>Сбросить</button>
        </div>
      </div>

      ${list.length
        ? `<div class="grid">${list.map((p, i) => cardHTML(p, i)).join('')}</div>`
        : `<div class="empty">
             <div class="empty__icon">${ICONS.box}</div>
             <p class="big">Ничего не найдено</p>
             <p>Попробуйте изменить фильтры или сбросить их.</p>
             <button class="btn btn--light" data-reset-filters>Сбросить фильтры</button>
           </div>`}
    </div>`;
}

/* ==========================================================================
   ЭКРАН: СТРАНИЦА ТОВАРА
   ========================================================================== */
function renderProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) { location.hash = '#catalog'; return; }

  const sale = salePercent(p);
  const isFav = favs.includes(p.id);
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const variants = [0, 1, 2]; // ракурсы заглушки-«галереи»

  const reviews = REVIEWS.map(r => `
    <div class="review">
      <div class="review__head">
        <span class="review__avatar">${esc(r.name[0] || 'П')}</span>
        <div><p class="review__name">${esc(r.name)}</p><p class="review__date">${esc(r.date)}</p></div>
        <span class="rating" style="margin-left:auto">${ICONS.star} ${r.rating}.0</span>
      </div>
      <p>${esc(r.text)}</p>
    </div>`).join('');

  screens.product.innerHTML = `
    <div class="container">
      <a class="back-link" href="#catalog">${ICONS.back} Назад в каталог</a>

      <article class="pdp">
        <div class="pdp__media-wrap">
          <div class="pdp__media" id="pdpMedia" style="position:relative">
            <button class="pdp__fav ${isFav ? 'is-active' : ''}" data-fav="${p.id}" aria-label="В избранное">${ICONS.heart}</button>
            ${mediaHTML(p, 0)}
          </div>
          <div class="pdp__thumbs">
            ${variants.map(v => `
              <button class="pdp__thumb ${v === 0 ? 'is-active' : ''}" data-thumb="${v}" style="position:relative" aria-label="Фото ${v + 1}">
                ${mediaHTML(p, v)}
              </button>`).join('')}
          </div>
        </div>

        <div class="pdp__info">
          <p class="pdp__cat">${esc(p.category)}</p>
          <h1 class="pdp__title">${esc(p.name)}</h1>

          <div class="pdp__meta">
            <span class="chip chip--accent">${ICONS.star} ${p.rating.toFixed(1)} из 5</span>
            <span class="chip">${ICONS.eye} ${p.sold.toLocaleString('ru-RU')} покупок</span>
            ${p.isNew ? '<span class="chip">NEW</span>' : ''}
          </div>

          <div class="pdp__price-row">
            <p class="pdp__price">${p.oldPrice ? `<s>${formatMoney(p.oldPrice)}</s>` : ''}${formatMoney(p.price)}</p>
            ${sale ? `<span class="badge-sale--big">−${sale}%</span>` : ''}
          </div>

          <p class="pdp__desc">${esc(p.description)}</p>

          <div class="pdp__actions">
            <button class="btn btn--light" data-buy="${p.id}">Купить сейчас</button>
            <button class="btn btn--ghost" data-add="${p.id}">В корзину ${ICONS.cart}</button>
          </div>

          <div class="pdp__delivery glass">
            <div class="pdp__delivery-row">${ICONS.truck} Доставка курьером — от 300 ${CONFIG.currency}, 1–2 дня</div>
            <div class="pdp__delivery-row">${ICONS.box} Самовывоз из пункта выдачи — бесплатно</div>
            <div class="pdp__delivery-row">${ICONS.shield} Гарантия и возврат в течение 14 дней</div>
          </div>

          <div class="pdp__details">
            <h3>Описание</h3>
            <p>${esc(p.details)}</p>
          </div>

          <div class="pdp__details">
            <h3>Характеристики</h3>
            <ul class="pdp__specs">
              ${(p.specs || []).map(s => `<li><span>${esc(s.k)}</span><b>${esc(s.v) || '—'}</b></li>`).join('')}
            </ul>
          </div>

          <div class="pdp__details">
            <h3>Отзывы</h3>
            ${reviews}
          </div>
        </div>
      </article>

      ${related.length ? `
      <div class="section-head"><h2>Похожие товары</h2></div>
      <div class="grid">${related.map((rp, i) => cardHTML(rp, i)).join('')}</div>` : ''}
    </div>`;
}

/* ==========================================================================
   ЭКРАН: ИЗБРАННОЕ
   ========================================================================== */
function renderFavorites() {
  const list = PRODUCTS.filter(p => favs.includes(p.id));

  screens.favorites.innerHTML = `
    <div class="container">
      <a class="back-link" href="#home">${ICONS.back} На главную</a>
      <div class="section-head"><h2>Избранное</h2><span>${list.length} товаров</span></div>
      ${list.length
        ? `<div class="grid">${list.map((p, i) => cardHTML(p, i)).join('')}</div>`
        : `<div class="empty">
             <div class="empty__icon">${ICONS.heart}</div>
             <p class="big">Пока ничего не добавлено</p>
             <p>Нажимайте на сердечко у товара — и он появится здесь.</p>
             <a class="btn btn--light" href="#catalog">Перейти в каталог</a>
           </div>`}
    </div>`;
}

/* ==========================================================================
   ЭКРАН: КОРЗИНА
   ========================================================================== */
function renderCart() {
  cart = cart.filter(i => PRODUCTS.some(p => p.id === i.id)); // чистим «мёртвые» id
  const n = cartCount();

  if (n === 0) {
    promo = null; save('mono-promo', null);
    screens.cart.innerHTML = `
      <div class="container">
        <a class="back-link" href="#catalog">${ICONS.back} В каталог</a>
        <div class="empty">
          <div class="empty__icon">${ICONS.cart}</div>
          <p class="big">В корзине пока пусто</p>
          <p>Добавьте товары из каталога — и они появятся здесь.</p>
          <a class="btn btn--light" href="#catalog">Перейти к товарам</a>
        </div>
      </div>`;
    return;
  }

  const items = cart.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return `
      <div class="cart-item">
        <a href="#product-${p.id}" class="cart-item__img">${mediaHTML(p)}</a>
        <div>
          <a class="cart-item__name" href="#product-${p.id}">${esc(p.name)}</a>
          <p class="cart-item__price">${formatMoney(p.price)} за шт. · ${esc(p.category)}</p>
          <div class="qty">
            <button data-minus="${p.id}" aria-label="Меньше">−</button>
            <span class="qty__num">${i.qty}</span>
            <button data-plus="${p.id}" aria-label="Больше">+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <span class="cart-item__total">${formatMoney(p.price * i.qty)}</span>
          <button class="cart-item__remove" data-remove="${p.id}" aria-label="Удалить">${ICONS.trash}</button>
        </div>
      </div>`;
  }).join('');

  const discount = promoDiscount();
  const total = cartSubtotal() - discount;

  screens.cart.innerHTML = `
    <div class="container">
      <a class="back-link" href="#catalog">${ICONS.back} В каталог</a>
      <div class="section-head"><h2>Корзина</h2><span>${n} шт.</span></div>

      <div class="cart-wrap">
        <div class="cart-list">${items}</div>

        <aside class="summary glass">
          <h3>Итог</h3>
          <div class="summary__row"><span>Товаров</span><b>${n} шт.</b></div>
          <div class="summary__row"><span>Сумма</span><b>${formatMoney(cartSubtotal())}</b></div>
          ${discount ? `<div class="summary__row summary__row--discount"><span>Промокод ${esc(promo)}</span><b>−${formatMoney(discount)}</b></div>` : ''}
          <div class="summary__row"><span>Доставка</span><b>при оформлении</b></div>
          <div class="summary__total"><span>Итого</span><b>${formatMoney(total)}</b></div>

          <div class="promo">
            <input class="field" id="promoInput" type="text" placeholder="Промокод" value="${esc(promo || '')}">
            <button data-apply-promo>Применить</button>
          </div>
          ${discount ? '<p class="promo__ok">Промокод активен — скидка применена ✓</p>' : ''}

          <br>
          <button class="btn btn--light btn--block" data-goto-checkout>Оформить заказ</button>
        </aside>
      </div>
    </div>`;
}

/* ==========================================================================
   ЭКРАН: ОФОРМЛЕНИЕ ЗАКАЗА (3 шага)
   ========================================================================== */
function deliveryOption() { return CONFIG.delivery.find(d => d.id === checkout.delivery); }

function checkoutTotals() {
  const discount = promoDiscount();
  const del = deliveryOption();
  return {
    subtotal: cartSubtotal(),
    discount,
    deliveryPrice: del ? del.price : 0,
    total: cartSubtotal() - discount + (del ? del.price : 0),
  };
}

function stepHTML(active) {
  const names = ['Получатель', 'Оплата', 'Проверка'];
  return `<div class="steps">${names.map((n, i) => {
    const s = i + 1;
    const cls = s === active ? 'is-active' : (s < active ? 'is-done' : '');
    return `
      ${i ? '<span class="step__line"></span>' : ''}
      <div class="step ${cls}">
        <span class="step__dot">${s < active ? '✓' : s}</span>
        <span class="step__name">${n}</span>
      </div>`;
  }).join('')}</div>`;
}

function renderCheckout() {
  if (cartCount() === 0) { location.hash = '#cart'; return; }

  const t = checkoutTotals();
  const prefill = (field) => esc(profile[field] || '');
  let body = '';

  if (checkout.step === 1) {
    body = `
      <div class="panel glass">
        <h3>Данные получателя</h3>
        <div class="form-grid">
          <label class="field-label">Имя и фамилия
            <input class="field" data-ck="name" type="text" placeholder="Иван Иванов" value="${prefill('name')}">
          </label>
          <label class="field-label">Телефон
            <input class="field" data-ck="phone" type="tel" placeholder="+7 900 000-00-00" value="${prefill('phone')}">
          </label>
          <label class="field-label">E-mail (для чека)
            <input class="field field--full" data-ck="email" type="email" placeholder="you@mail.ru" value="${prefill('email')}">
          </label>
        </div>

        <h3 style="margin-top:26px">Доставка</h3>
        <div class="opt-list">
          ${CONFIG.delivery.map(d => `
            <label class="opt ${checkout.delivery === d.id ? 'is-checked' : ''}">
              <input type="radio" name="delivery" value="${d.id}" ${checkout.delivery === d.id ? 'checked' : ''}>
              <span class="opt__radio"></span>
              <span class="opt__body"><span class="opt__title">${d.title}</span><span class="opt__sub">${d.sub}</span></span>
              <span class="opt__price">${d.price ? '+' + formatMoney(d.price) : 'бесплатно'}</span>
            </label>`).join('')}
        </div>

        <div class="form-grid" style="margin-top:18px">
          <label class="field-label">Адрес (город, улица, дом, квартира)
            <input class="field field--full" data-ck="address" type="text" placeholder="Москва, ул. Примерная, д. 1, кв. 2" value="${prefill('address')}">
          </label>
        </div>
      </div>
      <div class="checkout-nav">
        <a class="btn btn--ghost" href="#cart">Назад в корзину</a>
        <button class="btn btn--light" data-ck-next>Далее</button>
      </div>`;
  }

  if (checkout.step === 2) {
    body = `
      <div class="panel glass">
        <h3>Способ оплаты</h3>
        <div class="opt-list">
          ${CONFIG.payments.map(pm => `
            <label class="opt ${checkout.payment === pm.id ? 'is-checked' : ''}">
              <input type="radio" name="payment" value="${pm.id}" ${checkout.payment === pm.id ? 'checked' : ''}>
              <span class="opt__radio"></span>
              <span class="opt__body"><span class="opt__title">${pm.title}</span><span class="opt__sub">${pm.sub}</span></span>
            </label>`).join('')}
        </div>
      </div>
      <div class="checkout-nav">
        <button class="btn btn--ghost" data-ck-back>Назад</button>
        <button class="btn btn--light" data-ck-next>Далее</button>
      </div>`;
  }

  if (checkout.step === 3) {
    const del = deliveryOption();
    const pay = CONFIG.payments.find(x => x.id === checkout.payment);
    body = `
      <div class="panel glass">
        <h3>Проверьте заказ</h3>
        <div class="review-block">
          <div class="review-block__head"><span class="review-block__title">Получатель</span><button class="link-btn" data-ck-edit="1">Изменить</button></div>
          <p>${esc(profile.name || '—')} · ${esc(profile.phone || '—')}</p>
          <small>${esc(profile.email || 'e-mail не указан')}</small>
        </div>
        <div class="review-block">
          <div class="review-block__head"><span class="review-block__title">Доставка</span><button class="link-btn" data-ck-edit="1">Изменить</button></div>
          <p>${esc(del.title)} — ${del.price ? formatMoney(del.price) : 'бесплатно'}</p>
          <small>${esc(profile.address || 'адрес не указан')}</small>
        </div>
        <div class="review-block">
          <div class="review-block__head"><span class="review-block__title">Оплата</span><button class="link-btn" data-ck-edit="2">Изменить</button></div>
          <p>${esc(pay.title)}</p>
        </div>
        <div class="review-block">
          <div class="review-block__head"><span class="review-block__title">Товары (${cartCount()} шт.)</span><a class="link-btn" href="#cart">Изменить</a></div>
          ${cart.map(i => {
            const p = PRODUCTS.find(x => x.id === i.id);
            return `<p>${esc(p.name)} × ${i.qty} — ${formatMoney(p.price * i.qty)}</p>`;
          }).join('')}
        </div>
      </div>
      <div class="checkout-nav">
        <button class="btn btn--ghost" data-ck-back>Назад</button>
        <button class="btn btn--accent" data-ck-confirm>Подтвердить заказ · ${formatMoney(t.total)}</button>
      </div>`;
  }

  screens.checkout.innerHTML = `
    <div class="container">
      <a class="back-link" href="#cart">${ICONS.back} В корзину</a>
      <div class="section-head"><h2>Оформление заказа</h2></div>
      ${stepHTML(checkout.step)}

      <div class="checkout-wrap">
        <div>${body}</div>

        <aside class="summary glass">
          <h3>Ваш заказ</h3>
          <div class="summary__row"><span>Товары (${cartCount()} шт.)</span><b>${formatMoney(t.subtotal)}</b></div>
          ${t.discount ? `<div class="summary__row summary__row--discount"><span>Скидка</span><b>−${formatMoney(t.discount)}</b></div>` : ''}
          <div class="summary__row"><span>Доставка</span><b>${t.deliveryPrice ? formatMoney(t.deliveryPrice) : 'бесплатно'}</b></div>
          <div class="summary__total"><span>Итого</span><b>${formatMoney(t.total)}</b></div>
        </aside>
      </div>
    </div>`;
}

/* сохранить поля оформления + профиль */
function bindCheckoutInputs() {
  document.querySelectorAll('[data-ck]').forEach(inp => {
    inp.addEventListener('input', () => {
      profile[inp.dataset.ck] = inp.value;
      save('mono-profile', profile);
    });
  });
  document.querySelectorAll('input[name="delivery"]').forEach(r => {
    r.addEventListener('change', () => {
      checkout.delivery = r.value;
      renderCheckout(); bindCheckoutInputs();
    });
  });
  document.querySelectorAll('input[name="payment"]').forEach(r => {
    r.addEventListener('change', () => {
      checkout.payment = r.value;
      renderCheckout(); bindCheckoutInputs();
    });
  });
}

/* ==========================================================================
   ЭКРАН: УСПЕШНЫЙ ЗАКАЗ
   ========================================================================== */
function renderSuccess() {
  const o = lastOrder;
  if (!o) { location.hash = '#home'; return; }

  screens.success.innerHTML = `
    <div class="container">
      <div class="success glass">
        <div class="success__icon">${ICONS.check}</div>
        <h1>Заказ оформлен!</h1>
        <p>Спасибо за покупку. Мы свяжемся с вами для подтверждения.</p>
        <div class="success__num">Заказ № ${esc(o.id)}</div>
        <div class="success__rows">
          <div class="summary__row"><span>Дата</span><b>${esc(o.date)}</b></div>
          <div class="summary__row"><span>Товары</span><b>${o.itemsCount} шт.</b></div>
          <div class="summary__row"><span>Доставка</span><b>${esc(o.deliveryTitle)}</b></div>
          <div class="summary__row"><span>Оплата</span><b>${esc(o.paymentTitle)}</b></div>
          <div class="summary__total"><span>Итого</span><b>${formatMoney(o.total)}</b></div>
        </div>
        <div class="success__actions">
          <a class="btn btn--light" href="#profile">Мои заказы</a>
          <a class="btn btn--ghost" href="#catalog">Продолжить покупки</a>
        </div>
      </div>
    </div>`;
}

/* ==========================================================================
   ЭКРАН: ПРОФИЛЬ
   ========================================================================== */
function renderProfile() {
  const initial = (profile.name || 'Г').trim()[0].toUpperCase();

  const ordersHTML = orders.length ? [...orders].reverse().map(o => `
    <div class="order">
      <div class="order__head">
        <span class="order__id">№ ${esc(o.id)}</span>
        <span class="order__status">${esc(o.status)}</span>
      </div>
      <p class="order__items">${esc(o.itemsShort)}</p>
      <div class="order__foot">
        <span>${esc(o.date)}</span>
        <span>${esc(o.deliveryTitle)} · ${esc(o.paymentTitle)}</span>
        <b>${formatMoney(o.total)}</b>
      </div>
    </div>`).join('')
    : `<div class="empty">
         <div class="empty__icon">${ICONS.box}</div>
         <p class="big">Заказов пока нет</p>
         <p>Оформите первый заказ — он появится здесь.</p>
         <a class="btn btn--light" href="#catalog">В каталог</a>
       </div>`;

  screens.profile.innerHTML = `
    <div class="container">
      <div class="section-head"><h2>Профиль</h2></div>

      <div class="profile-head glass">
        <div class="profile-avatar">${esc(initial)}</div>
        <div>
          <p class="profile-name">${esc(profile.name || 'Гость')}</p>
          <p class="profile-sub">${esc(profile.phone || 'Телефон не указан')} · ${esc(profile.email || 'e-mail не указан')}</p>
        </div>
        <button class="btn btn--ghost" style="margin-left:auto" data-scroll-to="profileForm">Редактировать</button>
      </div>

      <div class="cart-wrap">
        <div>
          <div class="panel glass" id="profileForm" style="margin-bottom:26px">
            <h3>Личные данные</h3>
            <div class="form-grid">
              <label class="field-label">Имя и фамилия
                <input class="field" data-prof="name" type="text" value="${esc(profile.name)}" placeholder="Иван Иванов">
              </label>
              <label class="field-label">Телефон
                <input class="field" data-prof="phone" type="tel" value="${esc(profile.phone)}" placeholder="+7 900 000-00-00">
              </label>
              <label class="field-label">E-mail
                <input class="field" data-prof="email" type="email" value="${esc(profile.email)}" placeholder="you@mail.ru">
              </label>
              <label class="field-label">Адрес доставки
                <input class="field field--full" data-prof="address" type="text" value="${esc(profile.address)}" placeholder="Город, улица, дом">
              </label>
            </div>
            <br>
            <button class="btn btn--light" data-save-profile>Сохранить</button>
          </div>
        </div>

        <div>
          <div class="panel glass">
            <h3>История заказов</h3>
            ${ordersHTML}
          </div>
        </div>
      </div>
    </div>`;

  /* сохранить профиль */
  document.querySelectorAll('[data-prof]').forEach(inp => {
    inp.addEventListener('input', () => { profile[inp.dataset.prof] = inp.value; });
  });
}

/* ==========================================================================
   ПОИСК
   ========================================================================== */
const searchInput = $('#searchInput');
const searchPanel = $('#searchPanel');

function renderSearchPanel() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchPanel.hidden = true; return; }

  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)).slice(0, 6);

  searchPanel.innerHTML = matches.length
    ? matches.map(p => `
        <button class="search__item" data-search-id="${p.id}">
          <span class="search__thumb" style="background:${gradientFor(p.id)}">${String(p.id).padStart(2, '0')}</span>
          <span><span class="search__name">${esc(p.name)}</span><br><span class="search__cat">${esc(p.category)} · ${formatMoney(p.price)}</span></span>
        </button>`).join('')
    : `<div class="search__empty">Ничего не найдено по «${esc(searchInput.value.trim())}»</div>`;
  searchPanel.hidden = false;
}

function applySearch() {
  filters.query = searchInput.value.trim();
  filters.cat = 'Все';
  searchPanel.hidden = true;
  searchInput.blur();
  if (location.hash === '#catalog') renderCatalog();
  else location.hash = '#catalog';
}

searchInput.addEventListener('input', renderSearchPanel);
searchInput.addEventListener('focus', renderSearchPanel);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') applySearch();
  if (e.key === 'Escape') { searchPanel.hidden = true; searchInput.blur(); }
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('#searchBox')) searchPanel.hidden = true;
});
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    searchInput.focus();
  }
});

/* ==========================================================================
   РОУТИНГ
   ========================================================================== */
const screens = {
  home: $('#screen-home'),
  catalog: $('#screen-catalog'),
  product: $('#screen-product'),
  favorites: $('#screen-favorites'),
  cart: $('#screen-cart'),
  checkout: $('#screen-checkout'),
  success: $('#screen-success'),
  profile: $('#screen-profile'),
};

function navigate() {
  const hash = location.hash || '#home';
  let view = 'home';

  if (hash.startsWith('#product-')) {
    const id = parseInt(hash.replace('#product-', ''), 10);
    if (PRODUCTS.some(p => p.id === id)) {
      currentProductId = id;
      view = 'product';
      renderProduct(id);
    } else view = 'home';
  } else {
    const map = {
      '#home': 'home', '#catalog': 'catalog', '#favorites': 'favorites',
      '#cart': 'cart', '#checkout': 'checkout', '#success': 'success', '#profile': 'profile',
    };
    view = map[hash] || 'home';
  }

  if (view === 'catalog') renderCatalog();
  if (view === 'favorites') renderFavorites();
  if (view === 'cart') renderCart();
  if (view === 'checkout') { checkout.step = 1; renderCheckout(); bindCheckoutInputs(); }
  if (view === 'success') renderSuccess();
  if (view === 'profile') renderProfile();
  if (view === 'home') renderHome();

  currentView = view;
  for (const [name, el] of Object.entries(screens)) el.hidden = name !== view;

  document.querySelectorAll('.drawer__link').forEach(a =>
    a.classList.toggle('drawer__link--active', a.dataset.nav === view));

  toggleDrawer(false);
  searchPanel.hidden = true;
  window.scrollTo({ top: 0, behavior: 'instant' });
  renderBadges();
  bindReveals();
}

/* ==========================================================================
   ВЫДВИЖНОЕ МЕНЮ
   ========================================================================== */
const drawer = $('#drawer');
const drawerOverlay = $('#drawerOverlay');
const burgerBtn = $('#burgerBtn');

function toggleDrawer(force) {
  const open = force ?? !drawer.classList.contains('is-open');
  drawer.classList.toggle('is-open', open);
  drawerOverlay.classList.toggle('is-open', open);
  burgerBtn.classList.toggle('is-open', open);
  burgerBtn.setAttribute('aria-expanded', open);
}

burgerBtn.addEventListener('click', () => toggleDrawer());
drawerOverlay.addEventListener('click', () => toggleDrawer(false));

/* ==========================================================================
   ОБРАБОТЧИКИ СОБЫТИЙ
   ========================================================================== */
document.addEventListener('click', (e) => {
  const buy   = e.target.closest('[data-buy]');
  const add   = e.target.closest('[data-add]');
  const fav   = e.target.closest('[data-fav]');
  const plus  = e.target.closest('[data-plus]');
  const minus = e.target.closest('[data-minus]');
  const rem   = e.target.closest('[data-remove]');
  const thumb = e.target.closest('[data-thumb]');
  const catEl = e.target.closest('[data-goto-cat]');
  const searchItem = e.target.closest('[data-search-id]');

  if (buy)   { addToCart(Number(buy.dataset.buy), true); location.hash = '#checkout'; return; }
  if (add)   { addToCart(Number(add.dataset.add)); return; }
  if (fav)   { toggleFav(Number(fav.dataset.fav)); return; }
  if (plus)  { setQty(Number(plus.dataset.plus), 1); return; }
  if (minus) { setQty(Number(minus.dataset.minus), -1); return; }
  if (rem)   { removeFromCart(Number(rem.dataset.remove)); showToast('Товар удалён из корзины'); return; }
  if (searchItem) {
    searchPanel.hidden = true;
    location.hash = `#product-${searchItem.dataset.searchId}`;
    return;
  }
  if (thumb) {
    const v = Number(thumb.dataset.thumb);
    const media = $('#pdpMedia');
    const p = PRODUCTS.find(x => x.id === currentProductId);
    if (media && p) {
      const ph = media.querySelector('.ph');
      if (ph) ph.style.background = gradientFor(p.id, v);
      document.querySelectorAll('.pdp__thumb').forEach(t => t.classList.toggle('is-active', t === thumb));
    }
    return;
  }
  if (catEl) {
    filters.cat = catEl.dataset.gotoCat;
    filters.query = '';
    searchInput.value = '';
    return; // ссылка сама ведёт на #catalog
  }

  /* --- каталог --- */
  const chip = e.target.closest('[data-cat]');
  if (chip) {
    filters.cat = chip.dataset.cat;
    renderCatalog();
    return;
  }
  if (e.target.closest('[data-reset-filters]')) {
    Object.assign(filters, { query: '', cat: 'Все', sort: 'popular', min: '', max: '', saleOnly: false, hitOnly: false });
    searchInput.value = '';
    renderCatalog();
    return;
  }

  /* --- корзина --- */
  if (e.target.closest('[data-apply-promo]')) {
    const code = ($('#promoInput')?.value || '').trim().toUpperCase();
    if (code && CONFIG.promos[code]) {
      promo = code; save('mono-promo', promo);
      showToast(`Промокод применён: −${CONFIG.promos[code]}%`, true);
      playSuccess();
    } else {
      promo = null; save('mono-promo', promo);
      showToast('Такого промокода нет (попробуйте MONO10)');
    }
    renderCart();
    return;
  }
  if (e.target.closest('[data-goto-checkout]')) { location.hash = '#checkout'; return; }

  /* --- оформление --- */
  if (e.target.closest('[data-ck-next]')) {
    if (checkout.step === 1 && (!profile.name.trim() || !profile.phone.trim())) {
      showToast('Заполните имя и телефон');
      return;
    }
    checkout.step = Math.min(checkout.step + 1, 3);
    renderCheckout(); bindCheckoutInputs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (e.target.closest('[data-ck-back]')) {
    checkout.step = Math.max(checkout.step - 1, 1);
    renderCheckout(); bindCheckoutInputs();
    return;
  }
  const edit = e.target.closest('[data-ck-edit]');
  if (edit) {
    checkout.step = Number(edit.dataset.ckEdit);
    renderCheckout(); bindCheckoutInputs();
    return;
  }
  if (e.target.closest('[data-ck-confirm]')) {
    const t = checkoutTotals();
    const del = deliveryOption();
    const pay = CONFIG.payments.find(x => x.id === checkout.payment);
    const order = {
      id: 'MONO-' + String(Date.now()).slice(-6),
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      itemsCount: cartCount(),
      itemsShort: cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id);
        return `${p.name} × ${i.qty}`;
      }).join(', '),
      subtotal: t.subtotal, discount: t.discount, deliveryPrice: t.deliveryPrice,
      deliveryTitle: del.title, paymentTitle: pay.title,
      total: t.total,
      customer: { ...profile },
      status: 'В обработке',
    };
    orders.push(order); save('mono-orders', orders);
    lastOrder = order; save('mono-last-order', lastOrder);
    cart = []; promo = null;
    save('mono-cart', cart); save('mono-promo', null);
    renderBadges();
    checkout.step = 1;
    playSuccess();
    location.hash = '#success';
    return;
  }

  /* --- профиль --- */
  if (e.target.closest('[data-save-profile]')) {
    save('mono-profile', profile);
    showToast('Данные профиля сохранены', true);
    renderProfile();
    return;
  }
  const scrollTo = e.target.closest('[data-scroll-to]');
  if (scrollTo) {
    const el = document.getElementById(scrollTo.dataset.scrollTo);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
});

/* «input»/«change» для фильтров каталога */
document.addEventListener('input', (e) => {
  if (currentView !== 'catalog') return;
  if (e.target.id === 'priceMin') { filters.min = e.target.value; scheduleCatalogUpdate(); }
  if (e.target.id === 'priceMax') { filters.max = e.target.value; scheduleCatalogUpdate(); }
});
document.addEventListener('change', (e) => {
  if (currentView !== 'catalog') return;
  if (e.target.id === 'sortSelect') { filters.sort = e.target.value; renderCatalog(); }
  if (e.target.id === 'saleOnly')   { filters.saleOnly = e.target.checked; renderCatalog(); }
  if (e.target.id === 'hitOnly')    { filters.hitOnly = e.target.checked; renderCatalog(); }
});

/* перерисовка каталога с задержкой при вводе цены */
let catalogTimer = null;
function scheduleCatalogUpdate() {
  clearTimeout(catalogTimer);
  catalogTimer = setTimeout(() => {
    if (currentView === 'catalog') renderCatalog();
  }, 450);
}

/* кнопки шапки */
$('#logoLink').addEventListener('click', () => { location.hash = '#home'; });
$('#headerCartBtn').addEventListener('click', () => { location.hash = '#cart'; });
$('#favBtn').addEventListener('click', () => { location.hash = '#favorites'; });
$('#profileBtn').addEventListener('click', () => { location.hash = '#profile'; });
$('#themeBtn').addEventListener('click', () => {
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(next);
  showToast(next === 'light' ? 'Светлая тема включена' : 'Тёмная тема включена', next === 'light');
});

/* переключатель звука в меню */
const soundBtn = $('#soundBtn');
function renderSoundBtn() {
  if (!soundBtn) return;
  soundBtn.classList.toggle('is-off', !soundOn);
  const label = soundBtn.querySelector('span');
  if (label) label.textContent = soundOn ? 'Звук: вкл' : 'Звук: выкл';
}
soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  save('mono-sound', soundOn);
  renderSoundBtn();
  if (soundOn) playTick(1700, .05, .06); // подтверждение включения
});
renderSoundBtn();

/* Esc — закрыть меню */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleDrawer(false);
});

/* ==========================================================================
   СТАРТ
   ========================================================================== */
/* название магазина: шапка, футер и прелоадер берут его из CONFIG.brand */
document.querySelectorAll('.logo__text').forEach(el => { el.textContent = CONFIG.brand; });
const preloaderBrand = $('#preloaderBrand');
if (preloaderBrand) preloaderBrand.textContent = CONFIG.brand;
window.addEventListener('hashchange', navigate);
navigate();


/* ==========================================================================
   3D-КОЛЕСО ТОВАРОВ В ГЕРОЕ (плавное, с гашением дрожания руки)
   ========================================================================== */
function initWheel() {
  const hero = document.querySelector('.hero'), ring = $('#orbitRing'), orbit = $('#orbit');
  if (!hero || !ring || !orbit) return;

  const AUTO = reducedMotion ? 0 : 0.14;   // скорость автовращения
  const DEAD = 4;                           // «мёртвая зона», px: дрожание меньше этого игнорируется
  const EASE = 0.045;                       // меньше = плавнее и «тяжелее» наклон за мышью

  let rot = 0, rotTarget = 0, inertia = 0, drag = false, lastX = 0, moved = 0;
  // наклон кольца: база -5°, амплитуда ±7° — раньше было -8° ±10°,
  // из-за сильного наклона передние карточки проваливались к плашкам
  let tilt = -5, tiltTarget = -5, lastPX = null, lastPY = null;

  const down = (e) => { drag = true; moved = 0; lastX = e.clientX; inertia = 0; orbit.classList.add('is-drag'); };
  const up = () => { drag = false; orbit.classList.remove('is-drag'); };
  const move = (e) => {
    if (drag) {
      const dx = e.clientX - lastX; lastX = e.clientX;
      moved += Math.abs(dx); rotTarget += dx * 0.35; inertia = dx * 0.12;
    }
    if (e.pointerType === 'touch') return; // на телефоне наклона за «мышью» нет — только вращение
    if (lastPX !== null && Math.hypot(e.clientX - lastPX, e.clientY - lastPY) < DEAD) return;
    lastPX = e.clientX; lastPY = e.clientY;
    const r = hero.getBoundingClientRect();
    const ny = Math.max(-.5, Math.min(.5, (e.clientY - r.top) / r.height - .5));
    tiltTarget = -5 + ny * -6;
  };
  orbit.addEventListener('pointerdown', down);
  orbit.addEventListener('click', (e) => { if (moved > 6) e.preventDefault(); }, true);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointermove', move);

  (function loop() {
    if (!ring.isConnected) {                // ушли с главной — снимаем слушатели и стоп
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointermove', move);
      return;
    }
    if (!drag) { rotTarget += AUTO + inertia; inertia *= 0.95; }
    rot  += (rotTarget - rot) * 0.12;
    tilt += (tiltTarget - tilt) * EASE;
    ring.style.transform = `rotateX(${tilt}deg) rotateY(${rot}deg)`;
    requestAnimationFrame(loop);
  })();
}

