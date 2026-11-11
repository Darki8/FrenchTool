(function () {
'use strict';

/* =========================================================
   Konstanten
   ========================================================= */
const TENSES = [
  { id: 'present', fr: 'le présent', de: 'Präsens' },
  { id: 'imperatif', fr: "l'impératif", de: 'Befehlsform' },
  { id: 'passe', fr: 'le passé composé', de: 'Perfekt' },
  { id: 'imparfait', fr: "l'imparfait", de: 'Imperfekt' },
  { id: 'futur', fr: 'le futur simple', de: 'Futur I' },
  { id: 'futproche', fr: 'le futur proche', de: 'nahe Zukunft (aller + Inf.)' },
  { id: 'futant', fr: 'le futur antérieur', de: 'Futur II' },
  { id: 'conditionnel', fr: 'le conditionnel présent', de: 'Konditional I' },
  { id: 'condpasse', fr: 'le conditionnel passé', de: 'Konditional II' },
  { id: 'subjonctif', fr: 'le présent du subjonctif', de: 'Subjonctif' },
  { id: 'pqp', fr: 'le plus-que-parfait', de: 'Plusquamperfekt' },
];
const EDIT_TENSES = ['present', 'imparfait', 'futur', 'conditionnel', 'subjonctif'];
const PRON_LABELS = ['je', 'tu', 'il/elle/on', 'nous', 'vous', 'ils/elles'];
const PRONOUNS = ['je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles'];
const PRON_INDEX = { je: 0, tu: 1, il: 2, elle: 2, on: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const REPLACE = {
  il: ['Pierre', 'mon frère', 'le professeur', 'Marc'],
  elle: ['Marie', 'ma sœur', 'la directrice', 'Sophie'],
  ils: ['Pierre et Marc', 'mes parents', 'les garçons'],
  elles: ['Marie et Sophie', 'les filles', 'mes sœurs'],
  nous: ['Paul et moi', 'ma famille et moi'],
  vous: ['Marc et toi', 'toi et Marie'],
};
const ACCENTS = ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'û', 'ù', 'œ'];
const PRAISE = ['RICHTIG!', 'SUPER!', 'Très bien !', 'Parfait !', 'Excellent !', 'Bravo !', 'Genau!'];
const GROUP_LABEL = { irr: 'unregelmäßig', er: '-er', ir: '-ir', re: '-re', other: 'andere' };
const XP_PER = 10;
const TEST_N = 20;
const PI_PRONS = [['je'], ['tu'], ['il', 'elle', 'on'], ['nous'], ['vous'], ['ils', 'elles']];
// Outfits für Bleu – werden mit Gesamt-XP freigeschaltet
const OUTFITS = [
  { id: 'scarf', slot: 'neck', name: 'Roter Schal', xp: 50 },
  { id: 'beret', slot: 'head', name: 'Baskenmütze', xp: 150 },
  { id: 'glasses', slot: 'face', name: 'Brille', xp: 300 },
  { id: 'bow', slot: 'neck', name: 'Fliege', xp: 450 },
  { id: 'baguette', slot: 'hand', name: 'Baguette', xp: 600 },
  { id: 'crown', slot: 'head', name: 'Krone', xp: 1000 },
];

/* =========================================================
   Helfer
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const stripAcc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe');
const searchNorm = s => stripAcc(String(s || '').toLowerCase());
const toggleIn = (arr, x) => { const i = arr.indexOf(x); i >= 0 ? arr.splice(i, 1) : arr.push(x); };
const tenseName = id => TENSES.find(t => t.id === id).fr;
const fmtTime = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

/* =========================================================
   Die blaue Eule
   ========================================================= */
const isNight = () => { const h = new Date().getHours(); return h >= 21 || h < 6; };
const OWL_ITEMS = {
  beret: `<g transform="rotate(-10 60 20)"><ellipse cx="60" cy="21" rx="29" ry="9" fill="#26324A"/><ellipse cx="60" cy="17" rx="24" ry="7" fill="#33415E"/><path d="M60 11 q1 -6 5 -6" stroke="#26324A" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
  crown: `<g><path d="M40 26 L38 6 L49 16 L60 2 L71 16 L82 6 L80 26 Z" fill="#FFC800" stroke="#E5A800" stroke-width="2" stroke-linejoin="round"/><circle cx="60" cy="18" r="3" fill="#FF4B4B"/><circle cx="47" cy="21" r="2" fill="#1CB0F6"/><circle cx="73" cy="21" r="2" fill="#1CB0F6"/></g>`,
  nightcap: `<g><path d="M30 30 C36 10 70 2 88 16 C98 24 104 36 106 50 L99 49 C96 38 90 30 82 27 C66 22 46 24 30 30 Z" fill="#5C6BC0"/><path d="M28 31 Q60 17 92 29" stroke="#E8EAF6" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="104" cy="53" r="6" fill="#E8EAF6"/></g>`,
  glasses: `<g fill="none" stroke="#1D2B3A" stroke-width="3"><circle cx="44" cy="52" r="17"/><circle cx="76" cy="52" r="17"/><path d="M61 50 q-1 -4 -2 0" /><path d="M27 48 L21 44 M93 48 L99 44"/></g>`,
  shades: `<g class="owl-shades"><path d="M25 43 H62 V51 C62 63 54 68 44 68 C33 68 25 62 25 51 Z" fill="#111827"/><path d="M58 43 H95 V51 C95 62 87 68 76 68 C66 68 58 63 58 51 Z" fill="#111827"/><path d="M30 48 L38 48 M63 48 L71 48" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/><path d="M25 45 L19 41 M95 45 L101 41" stroke="#111827" stroke-width="3"/></g>`,
  scarf: `<g><path d="M27 76 Q60 92 93 76 L94 86 Q60 102 26 86 Z" fill="#E53935"/><path d="M70 88 L80 112 L71 114 L64 91 Z" fill="#C62828"/><path d="M34 82 L34 86 M46 86 L46 90 M58 88 L58 92" stroke="#FFCDD2" stroke-width="2"/></g>`,
  bow: `<g><path d="M60 80 L46 72 L46 88 Z M60 80 L74 72 L74 88 Z" fill="#E53935" stroke="#B71C1C" stroke-width="1.5" stroke-linejoin="round"/><circle cx="60" cy="80" r="4" fill="#B71C1C"/></g>`,
  baguette: `<g transform="rotate(28 100 88)"><rect x="94" y="54" width="13" height="58" rx="6.5" fill="#E0A458" stroke="#B5762F" stroke-width="1.5"/><path d="M97 64 l7 -4 M97 77 l7 -4 M97 90 l7 -4 M97 103 l7 -4" stroke="#B5762F" stroke-width="2" stroke-linecap="round"/></g>`,
};
const OWL_FIRE = `<g class="owl-fire"><path d="M18 112 C4 82 22 70 16 44 C32 58 34 32 46 16 C50 40 60 34 62 8 C68 30 76 36 78 16 C88 34 90 56 104 46 C98 70 116 84 102 112 Z" fill="#FF9600" opacity=".9"/><path d="M30 112 C22 88 36 80 32 62 C42 72 46 54 52 44 C56 60 64 56 68 40 C72 56 80 62 88 54 C86 74 100 86 90 112 Z" fill="#FFC800"/></g>`;
const OWL_ZZZ = `<g class="owl-zzz" font-family="Nunito, sans-serif" font-weight="900" fill="#84D8FF"><text x="88" y="34" font-size="13">z</text><text x="97" y="22" font-size="17">z</text><text x="107" y="8" font-size="21">Z</text></g>`;

/* mood: happy | think | cheer | sad | sleep
   opts: { shades, fire } (Combo) · { only: 'id' } (Vorschau) · { plain } (ohne Outfit) */
function owlSVG(mood = 'happy', opts = {}) {
  const body = '#1E88E5', dark = '#1565C0', ring = '#64B5F6', belly = '#BBDEFB', ink = '#1D2B3A', beak = '#FF9600';
  let eyes;
  // zufällige Verzögerung, damit nicht alle Eulen gleichzeitig blinzeln
  const delay = `style="animation-delay:-${(Math.random() * 4).toFixed(2)}s"`;
  // Outfit zusammenstellen
  const wear = { head: null, face: null, neck: null, hand: null };
  if (opts.only) { const o = OUTFITS.find(x => x.id === opts.only); if (o) wear[o.slot] = o.id; }
  else if (!opts.plain) {
    Object.assign(wear, (typeof state !== 'undefined' && state.settings.outfit) || {});
    if (isNight()) wear.head = 'nightcap';
  }
  if (opts.shades) wear.face = 'shades';
  if (mood === 'sleep') {
    eyes = `<path d="M34 53 Q44 61 54 53" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M66 53 Q76 61 86 53" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  } else if (mood === 'cheer') {
    eyes = `<circle cx="44" cy="52" r="15" fill="#fff"/><circle cx="76" cy="52" r="15" fill="#fff"/>
      <path d="M36 56 Q44 45 52 56" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M68 56 Q76 45 84 56" stroke="${ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  } else {
    const dx = mood === 'think' ? 4 : 0, dy = mood === 'sad' ? 4 : mood === 'think' ? -3 : 1;
    eyes = `<g class="owl-eyes" ${delay}><circle cx="44" cy="52" r="15" fill="#fff"/><circle cx="76" cy="52" r="15" fill="#fff"/>
      <g class="owl-pupils">
      <circle cx="${44 + dx}" cy="${52 + dy}" r="7.5" fill="${ink}"/><circle cx="${76 + dx}" cy="${52 + dy}" r="7.5" fill="${ink}"/>
      <circle cx="${46.5 + dx}" cy="${49 + dy}" r="2.5" fill="#fff"/><circle cx="${78.5 + dx}" cy="${49 + dy}" r="2.5" fill="#fff"/></g></g>`;
    if (mood === 'sad') eyes += `<path d="M30 33 L54 40" stroke="${dark}" stroke-width="5" stroke-linecap="round"/><path d="M90 33 L66 40" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>`;
  }
  const wingL = 'M23 62 C9 72 11 95 27 101 C27 88 27 74 23 62Z';
  const wingR = 'M97 62 C111 72 109 95 93 101 C93 88 93 74 97 62Z';
  const wings = mood === 'cheer'
    ? `<g transform="rotate(62 24 64)"><path class="owl-flap-l" d="${wingL}" fill="${dark}"/></g><g transform="rotate(-62 96 64)"><path class="owl-flap-r" d="${wingR}" fill="${dark}"/></g>`
    : `<path class="owl-wing-l" d="${wingL}" fill="${dark}"/><path class="owl-wing-r" d="${wingR}" fill="${dark}" ${delay}/>`;
  const blush = mood === 'happy' || mood === 'cheer'
    ? `<ellipse cx="31" cy="70" rx="5" ry="3" fill="#FF8FB1" opacity=".55"/><ellipse cx="89" cy="70" rx="5" ry="3" fill="#FF8FB1" opacity=".55"/>` : '';
  const item = slot => wear[slot] && OWL_ITEMS[wear[slot]] ? OWL_ITEMS[wear[slot]] : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" class="owl owl-${mood}${opts.fire ? ' on-fire' : ''}" viewBox="0 0 120 124" aria-hidden="true">
    ${opts.fire ? OWL_FIRE : ''}
    <ellipse cx="60" cy="119" rx="30" ry="4" fill="rgba(0,0,0,.08)"/>
    <g stroke="${beak}" stroke-width="4.5" stroke-linecap="round"><path d="M45 108 l-5 8 M45 108 v9 M45 108 l5 8"/><path d="M75 108 l-5 8 M75 108 v9 M75 108 l5 8"/></g>
    ${mood === 'cheer' ? wings : ''}
    <path d="M22 52 C22 31 29 17 35 9 L46 24 C55 20 65 20 74 24 L85 9 C91 17 98 31 98 52 L98 86 C98 104 82 112 60 112 C38 112 22 104 22 86 Z" fill="${body}"/>
    <ellipse cx="60" cy="86" rx="25" ry="21" fill="${belly}"/>
    <g stroke="${ring}" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M50 82 q4 4 8 0"/><path d="M62 82 q4 4 8 0"/><path d="M56 92 q4 4 8 0"/></g>
    ${item('neck')}
    ${mood === 'cheer' ? '' : wings}
    <circle cx="44" cy="52" r="18.5" fill="${ring}"/><circle cx="76" cy="52" r="18.5" fill="${ring}"/>
    ${eyes}${blush}
    <path d="M53 63 Q60 59 67 63 Q63 73 60 76 Q57 73 53 63Z" fill="${beak}"/>
    ${item('face')}${item('head')}${item('hand')}
    ${mood === 'sleep' ? OWL_ZZZ : ''}
  </svg>`;
}

/* =========================================================
   Speicher
   ========================================================= */
const KEY = 'hibou-verbes-v2';
const DEFAULTS = {
  settings: { set: 'stem', perSet: {}, ignoreAccents: false, sound: true, speak: true, outfit: {} },
  custom: [],
  vocab: {},
  favs: [],
  stats: { xp: 0, streak: 0, lastDay: null, day: null, dayXP: 0, goal: 50, answered: 0, correct: 0, perVerb: {}, perForm: {}, sessions: 0 },
};
let state = load();
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s) return {
      settings: { ...DEFAULTS.settings, ...s.settings, perSet: (s.settings && s.settings.perSet) || {} },
      vocab: s.vocab || {}, custom: s.custom || [], favs: s.favs || [], stats: { ...DEFAULTS.stats, perForm: {}, ...s.stats },
    };
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(DEFAULTS));
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }

const BUILTIN_SET = new Set(BUILTIN_VERBS.map(v => v.inf));
function allVerbs() {
  const m = new Map();
  BUILTIN_VERBS.forEach(v => m.set(v.inf, v));
  state.custom.forEach(v => m.set(v.inf, { ...v, custom: true, overrides: BUILTIN_SET.has(v.inf) }));
  return [...m.values()].sort((a, b) => a.inf.localeCompare(b.inf, 'fr'));
}
const getVerb = inf => allVerbs().find(v => v.inf === inf);

/* Sets */
const setById = id => VERB_SETS.find(s => s.id === id) || VERB_SETS[0];
const curSet = () => setById(state.settings.set);
function setVerbs(set) {
  const all = allVerbs();
  if (!set.verbs) return all;
  const ids = new Set(set.verbs);
  return all.filter(v => ids.has(v.inf) || (v.custom && (v.sets || []).includes(set.id)));
}
function cfg(set = curSet()) {
  const ps = state.settings.perSet;
  if (!ps[set.id]) ps[set.id] = {
    verbs: setVerbs(set).map(v => v.inf), pronouns: PRONOUNS.slice(), tenses: set.tenses.slice(),
    english: false, replace: false, include: 'all', timer: '',
  };
  return ps[set.id];
}

/* Datum / Serie / XP */
const dayStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); };
const currentStreak = () => (state.stats.lastDay === dayStr() || state.stats.lastDay === yesterday()) ? state.stats.streak : 0;
const dayXP = () => state.stats.day === dayStr() ? state.stats.dayXP : 0;
function addXP(n) { const s = state.stats; if (s.day !== dayStr()) { s.day = dayStr(); s.dayXP = 0; } s.dayXP += n; s.xp += n; }
function bumpStreak() { const s = state.stats, t = dayStr(); if (s.lastDay === t) return; s.streak = s.lastDay === yesterday() ? s.streak + 1 : 1; s.lastDay = t; }
function updateHud() { $('#hudStreak').textContent = '🔥 ' + currentStreak(); $('#hudXP').textContent = '⚡ ' + state.stats.xp; }

/* =========================================================
   Ton & Sprache
   ========================================================= */
let actx;
function sound(kind) {
  if (!state.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = kind === 'ok' ? [[784, 0], [1047, .09]] : kind === 'bad' ? [[233, 0], [185, .13]] : [[523, 0], [659, .1], [784, .2], [1047, .32]];
    notes.forEach(([f, t]) => {
      const o = actx.createOscillator(), g = actx.createGain(), st = actx.currentTime + t;
      o.type = kind === 'bad' ? 'triangle' : 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, st); g.gain.exponentialRampToValueAtTime(0.22, st + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, st + 0.28);
      o.connect(g).connect(actx.destination); o.start(st); o.stop(st + 0.3);
    });
  } catch (e) { /* ignore */ }
}
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/\([^)]*\)/g, ''));
    u.lang = 'fr-FR'; u.rate = 0.92;
    const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().startsWith('fr'));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  } catch (e) { /* ignore */ }
}
if ('speechSynthesis' in window) speechSynthesis.getVoices();

/* =========================================================
   Formen anzeigen / prüfen
   ========================================================= */
const subjectOf = q => q.subj || q.pron;
const QUE = s => (/^[aeiouyhéè]/i.test(s) ? "qu'" : 'que ') + s;
function promptSubject(q) { const s = subjectOf(q); return q.tense === 'subjonctif' ? QUE(s) : q.tense === 'imperatif' ? '(' + s + ')' : s; }
function phrase(q, forSpeech) {
  const alts = splitAlt(q.form);
  const first = (alts[0] || '').replace(/\([^)]*\)/g, '');
  const formTxt = forSpeech ? first : alts.join(' / ');
  if (q.tense === 'imperatif') return formTxt;   // Impératif ohne Subjekt
  const subj = subjectOf(q);
  let s = subj === 'je' && VOWEL_RE.test(first) ? "j'" + formTxt : subj + ' ' + formTxt;
  if (q.tense === 'subjonctif') s = QUE(s);
  return s;
}
const displayForm = f => splitAlt(f).join(' / ');
const cleanBasic = s => s.toLowerCase().replace(/[’`´]/g, "'").replace(/\s+/g, ' ').trim();
function cleanAns(s, q) {
  let a = cleanBasic(s).replace(/^(que |qu')/, '');
  if (q && q.subj && a.startsWith(q.subj.toLowerCase() + ' ')) a = a.slice(q.subj.length + 1);
  return a.replace(/^(je |j'|tu |il |elle |on |nous |vous |ils |elles )/, '').trim();
}
function expand(form) {
  const out = [];
  const rec = s => { const m = s.match(/\(([^)]*)\)/); if (!m) { out.push(s); return; } rec(s.replace(m[0], m[1])); rec(s.replace(m[0], '')); };
  splitAlt(form).forEach(rec);
  return [...new Set(out.map(cleanBasic))];
}
function evaluate(input, q) {
  // mit Subjekt („vous vous levez“) oder ohne („vous levez“ bei reflexiven Verben) – beides zählt
  const cands = [cleanAns(input, q), cleanBasic(input).replace(/^(que |qu')/, '')];
  const vs = expand(q.form);
  if (cands.some(a => vs.includes(a))) return { ok: true };
  const sas = cands.map(stripAcc);
  if (vs.some(v => sas.includes(stripAcc(v)))) {
    return state.settings.ignoreAccents ? { ok: true, note: 'Achte auf die Akzente!' } : { ok: false, note: 'Fast! Nur die Akzente stimmen nicht.' };
  }
  return { ok: false };
}

/* =========================================================
   Navigation
   ========================================================= */
function showScreen(name) {
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === 'screen-' + name));
  const tab = ['setup', 'list', 'result'].includes(name) ? 'home' : name;
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.body.classList.toggle('playing', name === 'play');
  window.scrollTo(0, 0);
}
function go(tab) {
  if (tab === 'home') renderHome();
  if (tab === 'verbs') renderVerbs();
  if (tab === 'stats') renderStats();
  if (tab === 'vocab') renderVocab();
  updateHud();
  showScreen(tab);
}

/* =========================================================
   HOME – Set-Übersicht mit Lernmodi
   ========================================================= */
function renderHome() {
  const set = curSet(), goal = state.stats.goal, dx = dayXP(), n = setVerbs(set).length, weak = weakItems(999).length;
  const greet = dx >= goal ? 'Tagesziel geschafft! Magnifique 🎉'
    : dx === 0 ? 'Bonjour ! Ich bin Bleu. Hier kannst du lernen und üben.'
    : `Weiter so! Noch ${goal - dx} XP bis zu deinem Tagesziel.`;
  $('#screen-home').innerHTML = `
    <div class="card hero">
      <div class="hero-owl">${owlSVG('happy')}</div>
      <div class="hero-text">
        <div class="bubble">${greet}</div>
        <div class="goal">
          <div class="goal-label"><b>Tagesziel</b><span>${Math.min(dx, goal)} / ${goal} XP</span></div>
          <div class="bar gold"><div class="bar-fill" style="width:${Math.min(100, dx / goal * 100)}%"></div></div>
        </div>
      </div>
    </div>

    <div class="sets">${VERB_SETS.map(s => `
      <button class="set-card ${s.id === set.id ? 'on' : ''}" data-set="${s.id}">
        <span class="set-ico">${s.ico || '📚'}</span>
        <span class="set-txt"><b>${esc(s.title)}</b><small>${esc(s.de)} · ${setVerbs(s).length} Verben</small></span>
      </button>`).join('')}
    </div>

    <div class="card">
      <h1 class="set-title">${esc(set.title)}</h1>
      <p class="hint">${esc(set.de)} · ${n} Verben · ${set.tenses.map(tenseName).join(', ')}</p>
      <div class="modes">
        <div class="mode-card">
          <div class="mode-ico">📋</div><b>Liste ansehen</b><small>Alle Formen auf einen Blick</small>
          <button class="btn btn-sm" data-start="list">Ansehen</button>
        </div>
        <div class="mode-card">
          <div class="mode-ico">🔘</div><b>Multiple Choice</b><small>Teste dein Gedächtnis</small>
          <button class="btn btn-sm btn-primary" data-start="mc">Start</button>
        </div>
        <div class="mode-card main">
          <div class="mode-ico">✍️</div><b>Bewertete Übung</b><small>Schreibe die richtige Konjugation</small>
          <button class="btn btn-sm btn-primary" data-start="type">Start</button>
        </div>
      </div>
      <button class="link" data-goto="verbs">+ Verben zu diesem Set hinzufügen</button>
    </div>

    <div class="card">
      <h2>Spezial-Training</h2>
      <div class="specials">
        <button class="special" data-special="weak"><span class="sp-ico">🎯</span><span><b>Meine Schwachstellen</b><small>${weak ? `${weak} Form${weak === 1 ? '' : 'en'}, die du oft falsch hast` : 'Noch keine Fehler gesammelt – super!'}</small></span></button>
        <button class="special" data-special="test"><span class="sp-ico">📝</span><span><b>Testmodus</b><small>${TEST_N} Fragen aus diesem Set, Note erst am Schluss</small></span></button>
        <button class="special" data-special="si"><span class="sp-ico">🧩</span><span><b>Si-Sätze</b><small>Phrase hypothétique, Typ 1 – 3</small></span></button>
        <button class="special" data-special="aux"><span class="sp-ico">🏥</span><span><b>avoir oder être?</b><small>Hilfsverb im passé composé – schnell antippen</small></span></button>
        <button class="special" data-special="past"><span class="sp-ico">🎞️</span><span><b>Imparfait, PC oder PQP?</b><small>Emploi des temps du passé – Lückensätze</small></span></button>
        <button class="special" data-goto="vocab"><span class="sp-ico">🃏</span><span><b>Wörter lernen</b><small>Vocabulaire EMP – ${VOCAB.length} Wörter in 28 Tranches</small></span></button>
      </div>
    </div>`;
}

/* Schwachstellen: Formen, die öfter falsch als (doppelt) richtig waren */
function weakItems(limit = 20) {
  return Object.entries(state.stats.perForm || {})
    .map(([k, x]) => ({ k, ...x, score: x.w * 2 - x.r }))
    .filter(x => x.w > 0 && x.score > 0)
    .sort((a, b) => b.score - a.score || (b.t || 0) - (a.t || 0))
    .map(x => {
      const [inf, tense, pi] = x.k.split('|'), v = getVerb(inf);
      if (!v || !TENSES.some(t => t.id === tense)) return null;
      const form = conjugate(v)[tense][+pi];
      return form ? { v, inf, tense, pi: +pi, pron: pick(PI_PRONS[+pi]), subj: null, form } : null;
    })
    .filter(Boolean).slice(0, limit);
}

$('#screen-home').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.special) {
    const sp = b.dataset.special;
    if (sp === 'weak') {
      const items = weakItems();
      if (!items.length) return toast('Du hast noch keine Schwachstellen. Übe zuerst ein paar Runden!');
      setupMode = 'type'; startSession(items, 'type');
    } else if (sp === 'test') { setupMode = 'test'; setupStep = 1; setupSearch = ''; renderSetup(); showScreen('setup'); }
    else startSession(null, sp);
    return;
  }
  if (b.dataset.set) { state.settings.set = b.dataset.set; save(); renderHome(); }
  else if (b.dataset.start === 'list') { listTense = curSet().tenses[0]; renderList(); showScreen('list'); }
  else if (b.dataset.start) { setupMode = b.dataset.start; setupStep = 1; setupSearch = ''; renderSetup(); showScreen('setup'); }
  else if (b.dataset.goto) { vSetFilter = state.settings.set; go(b.dataset.goto); }
});

/* =========================================================
   LISTE ANSEHEN (Konjugationstabelle des Sets)
   ========================================================= */
let listTense = 'present';
function renderList() {
  const set = curSet(), vs = setVerbs(set);
  $('#screen-list').innerHTML = `
    <div class="card-head"><button class="link" data-back>← Zurück</button></div>
    <h1 class="set-title">${esc(set.title)}</h1>
    <p class="hint">Konjugationstabelle · Klicke auf eine Form, um sie vorlesen zu lassen.</p>
    ${set.tenses.length > 1 ? `<div class="chips small" style="margin-bottom:16px">${set.tenses.map(t => `<button class="chip ${t === listTense ? 'on' : ''}" data-lt="${t}">${tenseName(t)}</button>`).join('')}</div>` : ''}
    <div class="ctable">${vs.map((v, n) => {
      const f = conjugate(v)[listTense];
      return `<div class="cbox"><h4>${n + 1}. ${esc(v.inf)} <small>${esc(v.de || '')}</small></h4>${f.map((form, i) => {
        if (!form) return '';
        const q = { pron: ['je', 'tu', 'il', 'nous', 'vous', 'ils'][i], tense: listTense, form };
        return `<button class="cline" data-say="${esc(phrase(q, true))}">${esc(phrase(q))}</button>`;
      }).join('')}</div>`;
    }).join('')}</div>`;
}
$('#screen-list').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.back !== undefined) go('home');
  else if (b.dataset.lt) { listTense = b.dataset.lt; renderList(); }
  else if (b.dataset.say) speak(b.dataset.say);
});

/* =========================================================
   SETUP – "Übung einrichten" (2 Schritte wie bei conjuguemos)
   ========================================================= */
let setupMode = 'type', setupStep = 1, setupSearch = '';
function checkbox(attrs, checked, label, extra = '') {
  return `<label class="ck"><input type="checkbox" ${attrs} ${checked ? 'checked' : ''}><span class="ck-box"></span><span class="ck-label">${label}</span>${extra}</label>`;
}
function renderSetup() {
  const set = curSet(), c = cfg(set), vs = setVerbs(set);
  const modeName = setupMode === 'mc' ? 'Multiple Choice' : setupMode === 'test' ? `Testmodus (${TEST_N} Fragen)` : 'Bewertete Übung';
  if (setupStep === 2) {
    $('#screen-setup').innerHTML = `
      <p class="crumb">${esc(set.title)} · ${modeName}</p>
      <div class="card hero">
        <div class="hero-owl">${owlSVG('cheer')}</div>
        <div class="hero-text"><h2 style="margin:0 0 6px">Fast fertig!</h2><div class="bubble">${setupMode === 'test' ? `Im Testmodus siehst du erst am Schluss, was richtig war – und bekommst eine Note. Bonne chance !` : 'Stell einen Timer ein – oder lass das Feld leer, um ohne Zeitlimit zu üben.'}</div></div>
      </div>
      <div class="card">
        <h2>Timer</h2>
        <div class="timer-row"><span>Zeit festlegen</span><input type="number" min="1" max="45" id="timerInput" value="${esc(c.timer)}" placeholder="–"><span>Min</span></div>
        <p class="hint" id="timerErr" style="color:var(--red-d);display:none">Die Zeit muss zwischen 1 und 45 Minuten liegen.</p>
        <div class="toggles">
          ${toggleHTML('ignoreAccents', 'Akzente ignorieren', 'parle = parlé wird als richtig gewertet')}
          ${toggleHTML('sound', 'Soundeffekte', 'Töne bei richtigen und falschen Antworten')}
          ${toggleHTML('speak', 'Aussprache vorlesen', 'Die Lösung wird auf Französisch vorgelesen')}
        </div>
      </div>
      <div class="start-bar two"><button class="btn" id="setupPrev">Zurück</button><button class="btn btn-primary" id="setupStart">Start</button></div>`;
    return;
  }
  const favs = new Set(state.favs), sel = new Set(c.verbs);
  const pool = c.include === 'fav' ? vs.filter(v => favs.has(v.inf)) : vs;
  const q = searchNorm(setupSearch);
  $('#screen-setup').innerHTML = `
    <p class="crumb">${esc(set.title)} · ${modeName}</p>
    <h1 class="set-title">Übung einrichten</h1>

    <div class="card">
      ${checkbox('data-opt="english"', c.english, 'Verben auf Deutsch anzeigen?', '<small class="ck-sub">Statt „acheter“ steht „kaufen“ in der Aufgabe</small>')}
      ${checkbox('data-opt="replace"', c.replace, 'Pronomen ersetzen?', '<small class="ck-sub">z.B. „Marie“ statt „elle“, „mes parents“ statt „ils“</small>')}
    </div>

    <div class="card">
      <h2>Wörter</h2>
      <div class="chips small">
        <button class="chip ${c.include === 'all' ? 'on' : ''}" data-include="all">Alle Verben</button>
        <button class="chip ${c.include === 'fav' ? 'on' : ''}" data-include="fav">★ Nur Lieblingsverben</button>
      </div>
      <h3>Verben <span class="count">${pool.filter(v => sel.has(v.inf)).length} / ${pool.length}</span></h3>
      ${pool.length ? checkbox('data-allverbs', pool.every(v => sel.has(v.inf)), '<b>Alle Verben</b>') : ''}
      ${vs.length > 12 ? `<input class="search" id="setupSearch" placeholder="🔍 Verb suchen…" value="${esc(setupSearch)}">` : ''}
      <div class="vlist">${pool.map((v, i) => {
        const hide = q && !searchNorm(v.inf).includes(q) && !searchNorm(v.de).includes(q);
        return `<div class="vline ${hide ? 'hidden' : ''}">${checkbox(`data-v="${esc(v.inf)}"`, sel.has(v.inf), `<span class="vnum">${i + 1}.</span> ${esc(v.inf)} <small>${esc(v.de || '')}</small>`)}
          <button class="star ${favs.has(v.inf) ? 'on' : ''}" data-fav="${esc(v.inf)}" title="Lieblingsverb">★</button></div>`;
      }).join('') || '<p class="hint">Du hast in diesem Set noch keine Lieblingsverben. Markiere Verben mit ★ unter „Alle Verben“.</p>'}</div>
    </div>

    <div class="card">
      <h2>Übungsdetails</h2>
      <h3>Pronomen</h3>
      ${checkbox('data-allpron', PRONOUNS.every(p => c.pronouns.includes(p)), '<b>Alle Pronomen</b>')}
      <div class="ck-grid">${PRONOUNS.map(p => checkbox(`data-p="${p}"`, c.pronouns.includes(p), p)).join('')}</div>
      <h3>Zeitformen</h3>
      ${checkbox('data-alltense', set.tenses.every(t => c.tenses.includes(t)), '<b>Alle Zeitformen</b>')}
      <div class="ck-grid">${set.tenses.map(t => checkbox(`data-t="${t}"`, c.tenses.includes(t), tenseName(t))).join('')}</div>
    </div>

    <p class="hint err" id="setupErr" style="display:none">Bitte wähle mindestens eine Zeitform, ein Pronomen und ein Verb aus.</p>
    <div class="start-bar two"><button class="btn" id="setupBack">Abbrechen</button><button class="btn btn-primary" id="setupNext">Weiter</button></div>`;
}
function toggleHTML(key, label, sub) {
  return `<label class="toggle"><span>${label}<small>${sub}</small></span>
    <span class="switch"><input type="checkbox" data-setting="${key}" ${state.settings[key] ? 'checked' : ''}><span class="slider"></span></span></label>`;
}
function selectedPoolVerbs() {
  const set = curSet(), c = cfg(set), favs = new Set(state.favs);
  return setVerbs(set).filter(v => c.verbs.includes(v.inf) && (c.include !== 'fav' || favs.has(v.inf)));
}
$('#screen-setup').addEventListener('change', e => {
  const t = e.target, set = curSet(), c = cfg(set);
  if (t.dataset.setting) { state.settings[t.dataset.setting] = t.checked; save(); return; }
  if (t.dataset.opt) c[t.dataset.opt] = t.checked;
  else if (t.dataset.v) toggleIn(c.verbs, t.dataset.v);
  else if (t.dataset.allverbs !== undefined) {
    const favs = new Set(state.favs);
    const pool = setVerbs(set).filter(v => c.include !== 'fav' || favs.has(v.inf)).map(v => v.inf);
    c.verbs = t.checked ? [...new Set([...c.verbs, ...pool])] : c.verbs.filter(i => !pool.includes(i));
  }
  else if (t.dataset.p) toggleIn(c.pronouns, t.dataset.p);
  else if (t.dataset.allpron !== undefined) c.pronouns = t.checked ? PRONOUNS.slice() : [];
  else if (t.dataset.t) toggleIn(c.tenses, t.dataset.t);
  else if (t.dataset.alltense !== undefined) c.tenses = t.checked ? set.tenses.slice() : [];
  else return;
  save(); const y = window.scrollY; renderSetup(); window.scrollTo(0, y);
});
$('#screen-setup').addEventListener('input', e => {
  if (e.target.id === 'setupSearch') {
    setupSearch = e.target.value; const q = searchNorm(setupSearch);
    $$('.vline').forEach(l => { l.classList.toggle('hidden', !!q && !searchNorm(l.textContent).includes(q)); });
  }
});
$('#screen-setup').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const c = cfg();
  if (b.dataset.include) { c.include = b.dataset.include; save(); renderSetup(); }
  else if (b.dataset.fav) { toggleIn(state.favs, b.dataset.fav); b.classList.toggle('on'); save(); if (c.include === 'fav') renderSetup(); }
  else if (b.id === 'setupBack') go('home');
  else if (b.id === 'setupNext') {
    if (!c.tenses.length || !c.pronouns.length || !selectedPoolVerbs().length) { $('#setupErr').style.display = 'block'; toast('Bitte wähle mindestens eine Zeitform, ein Pronomen und ein Verb aus.'); return; }
    setupStep = 2; renderSetup(); window.scrollTo(0, 0);
  }
  else if (b.id === 'setupPrev') { readTimer(); setupStep = 1; renderSetup(); }
  else if (b.id === 'setupStart') { if (readTimer()) startSession(); }
});
function readTimer() {
  const inp = $('#timerInput'); if (!inp) return true;
  const v = inp.value.trim(), c = cfg();
  if (v && (!(+v >= 1 && +v <= 45))) { $('#timerErr').style.display = 'block'; return false; }
  c.timer = v; save(); return true;
}

/* =========================================================
   ÜBEN (Bewertete Übung / Multiple Choice)
   ========================================================= */
let S = null;

/* mode: 'type' | 'mc' | 'test' | 'si' | 'aux' */
function startSession(reviewItems, mode = setupMode, opts = {}) {
  const set = curSet(), c = cfg(set);
  const special = mode === 'si' || mode === 'aux' || mode === 'past' || mode === 'card' || !!opts.vocab;
  const verbs = special ? [] : reviewItems
    ? [...new Map(reviewItems.filter(q => q.v).map(q => [q.inf, q.v])).values()]
    : selectedPoolVerbs();
  if (!special && !reviewItems && !verbs.length) return toast('Wähle mindestens ein Verb aus.');
  const test = mode === 'test' && !reviewItems;
  const mins = reviewItems || special ? 0 : parseInt(c.timer, 10) || 0;
  if (S) { clearInterval(S.timer); clearTimeout(S.idle); clearTimeout(S.typeT); }
  S = {
    verbs, tenses: c.tenses.slice(), prons: c.pronouns.slice(), mode: mode === 'test' ? 'type' : mode, test,
    english: c.english && !special, replace: c.replace && !special,
    timed: mins > 0, timeTotal: mins * 60000,
    review: reviewItems ? shuffle(reviewItems) : null, reviewTotal: reviewItems ? reviewItems.length : 0,
    correct: 0, wrong: 0, answered: 0, combo: 0, best: 0, xp: 0, used: new Set(),
    opts, vocab: !!opts.vocab, label: opts.label || '', vocGraded: new Set(),
    mistakes: [], retry: [], start: Date.now(), q: null, checked: false, lastKey: '', timer: null, done: false,
  };
  $('#screen-play').innerHTML = `
    <div class="play-top">
      <button class="icon-btn" id="quitBtn" title="Schließen">✕</button>
      <div class="bar big ${S.timed || S.review || S.test ? '' : 'hidden'}"><div class="bar-fill" id="progFill" style="width:${S.timed ? 100 : 0}%"></div></div>
      <div class="score-box"><span class="score-lbl">${S.test ? 'Frage' : 'Punkte'}</span><b id="scoreTxt">0/0</b><span id="pctTxt">0%</span></div>
      <div class="play-meta" id="playMeta"></div>
    </div>
    <div class="play-tools">
      <button class="mini-btn" id="replayBtn">↻ Neu starten</button>
      <button class="mini-btn" id="endBtn">🏁 ${S.test ? 'Test abgeben' : 'Beenden &amp; Ergebnis'}</button>
    </div>
    <div class="play-body" id="playBody"></div>
    <div class="play-foot" id="playFoot"></div>`;
  showScreen('play');
  S.timer = setInterval(tick, 250); tick();
  next();
}

/* ---------- Fragen bauen ---------- */
function buildQ(v, tense, pron) {
  const pi = PRON_INDEX[pron];
  const subj = S.replace && REPLACE[pron] ? pick(REPLACE[pron]) : null;
  return { v, inf: v.inf, tense, pi, pron, subj, form: conjugate(v)[tense][pi] };
}
function buildSiQ() {
  const t = pick([1, 2, 3]), T = SI_TYPES[t];
  for (let k = 0; k < 30; k++) {
    const [s1, i1, mid, s2, i2, end] = pick(SI_TEMPLATES);
    const v1 = getVerb(i1), v2 = getVerb(i2);
    if (!v1 || !v2) continue;
    const f1 = conjugate(v1)[T.si][PRON_INDEX[s1]], f2 = conjugate(v2)[T.main][PRON_INDEX[s2]];
    if (!f1 || !f2 || (i1 + t === S.lastKey && k < 29)) continue;
    return { kind: 'si', type: t, s1, s2, v: v1, v2, inf: i1, inf2: i2, mid, end, f1, f2, form: f1 + ' | ' + f2, tense: 'si' + t, pi: 0 };
  }
  return null;
}
let auxPool = null;
function buildAuxQ() {
  if (Math.random() < 0.3) {
    const [pron, inf, ctx, aux] = pick(AUX_CONTEXT), v = getVerb(inf), pi = PRON_INDEX[pron];
    if (v) {
      const full = `${AUX[aux].present[pi]} ${getPP(v)}${aux === 'être' ? (pi < 3 ? '(e)' : '(e)s') : ''}`;
      return { kind: 'aux', v, inf, pron, pi, tense: 'aux', ctx, form: aux, full, ctxAvoir: aux === 'avoir' };
    }
  }
  if (!auxPool) { const m = new Map(allVerbs().map(v => [v.inf, v])); auxPool = HEFT_PC.map(i => m.get(i)).filter(Boolean); }
  const v = pick(auxPool), pi = v.impers ? 2 : Math.floor(Math.random() * 6);
  return { kind: 'aux', v, inf: v.inf, pron: v.impers ? 'il' : pick(PI_PRONS[pi]), pi, tense: 'aux', ctx: '',
    form: v.refl || v.aux === 'être' ? 'être' : 'avoir', full: conjugate(v).passe[pi] };
}
function buildPastQ() {
  for (let k = 0; k < 20; k++) {
    const idx = Math.floor(Math.random() * PAST_SENTENCES.length);
    if ('past' + idx === S.lastKey && k < 19) continue;
    const [text, blanks] = PAST_SENTENCES[idx];
    return { kind: 'past', idx, text, blanks, inf: 'past' + idx, tense: '', pi: '', form: blanks.map(b => b[1]).join(' | ') };
  }
}
function randomQuestion() {
  if (S.mode === 'past') return buildPastQ();
  if (S.mode === 'si') return buildSiQ();
  if (S.mode === 'aux') return buildAuxQ();
  let q = null;
  for (let k = 0; k < 40; k++) {
    q = buildQ(pick(S.verbs), pick(S.tenses), pick(S.prons));
    if (!q.form) continue;
    const key = q.inf + q.tense + q.pi;
    if ((key === S.lastKey || (S.test && S.used.has(key))) && k < 39) continue;
    break;
  }
  if (q && S.test) S.used.add(q.inf + q.tense + q.pi);
  return q;
}
function next() {
  if (!S || S.done) return;
  if (S.timed && Date.now() >= S.endAt) return finish();
  if (S.test && S.answered >= TEST_N) return finish();
  let q;
  const due = S.test ? -1 : S.retry.findIndex(r => r.due <= S.answered);
  if (due >= 0) q = S.retry.splice(due, 1)[0];
  else if (S.review) { q = S.review.shift() || S.retry.shift(); if (!q) return finish(); }
  else q = randomQuestion();
  if (!q || !q.form) return finish();
  S.q = q; S.checked = false; S.lastKey = q.inf + q.tense + q.pi;
  renderQ();
}

/* ---------- Texte je Fragetyp ---------- */
const siOpen = s => (/^ils? /.test(s) ? "S'" : 'Si ') + s;
const tidy = s => s.replace(/\s+/g, ' ').replace(/ ,/g, ',').trim();
const pastFill = (q, fn) => q.text.replace(/\{(\d)\}/g, (m, i) => fn(q.blanks[+i], +i));
function qBadge(q) {
  if (q.kind === 'si') return SI_TYPES[q.type].name;
  if (q.kind === 'aux') return 'avoir oder être?';
  if (q.kind === 'past') return 'Imparfait, PC oder PQP?';
  if (q.kind === 'voc') return `Tranche ${q.it.t} · ${q.it.sec}`;
  return tenseName(q.tense);
}
function qPromptText(q) {
  if (q.kind === 'si') return tidy(`${siOpen(q.s1 + ' ___')} (${q.inf}) ${q.mid} ${q.s2} ___ (${q.inf2}) ${q.end}`);
  if (q.kind === 'aux') return tidy(`${q.pron} ___ (${q.inf}) ${q.ctx}`);
  if (q.kind === 'past') return pastFill(q, b => `___ (${b[0]})`);
  if (q.kind === 'voc') return q.q;
  return promptSubject(q) + ' …';
}
/* Was vorgelesen wird – bei Vokabeln immer das französische Wort */
function qSpeak(q) {
  if (q.kind === 'voc') return splitAlt(q.it.fr)[0].split(', ')[0].replace(/\([^)]*\)/g, '').replace(/\.\.\./g, '');
  return qAnswer(q, true);
}
function qAnswer(q, forSpeech) {
  if (q.kind === 'past') return pastFill(q, b => forSpeech ? b[1].replace(/\([^)]*\)/g, '') : b[1]);
  if (q.kind === 'voc') return q.form;
  if (q.kind === 'si') {
    const p1 = phrase({ pron: q.s1, form: q.f1, tense: '' }, forSpeech), p2 = phrase({ pron: q.s2, form: q.f2, tense: '' }, forSpeech);
    return tidy(`${siOpen(p1)} ${q.mid} ${p2} ${q.end}`);
  }
  if (q.kind === 'aux') return tidy(phrase({ pron: q.pron, form: q.full, tense: 'passe' }, forSpeech) + ' ' + q.ctx);
  return phrase(q, forSpeech);
}
function qTips(q) {
  if (q.kind === 'si') return [SI_TYPES[q.type].rule + '.', 'Im Si-Satz steht nie futur oder conditionnel!'];
  if (q.kind === 'aux') return [auxTip(q.v, q.ctxAvoir)];
  if (q.kind === 'past') return [...new Set(q.blanks.filter((b, i) => !q.okParts || !q.okParts[i]).map(b => PAST_RULES[b[2]]))];
  if (q.kind === 'voc') return q.it.note ? [q.it.note] : [];
  return ruleTips(q.v, q.tense, q.pi);
}

/* Freie Formen (Si-Sätze, Lückensätze) prüfen – mit oder ohne Subjektpronomen */
function evalForm(input, form) {
  const vs = expand(form), a1 = cleanBasic(input), a2 = cleanAns(input);
  if (vs.includes(a1) || vs.includes(a2)) return { ok: true };
  if (vs.some(v => stripAcc(v) === stripAcc(a1) || stripAcc(v) === stripAcc(a2))) {
    return state.settings.ignoreAccents ? { ok: true, note: 'Achte auf die Akzente!' } : { ok: false, note: 'Fast! Nur die Akzente stimmen nicht.' };
  }
  return { ok: false };
}

/* ---------- Eule während der Übung ---------- */
function setPromptOwl(mood, anim) {
  const po = $('#promptOwl'); if (!po || !S) return;
  const hot = !S.test && S.combo >= 5;
  po.innerHTML = owlSVG(mood, { shades: hot, fire: !S.test && S.combo >= 10 })
    + (!S.test && S.combo >= 3 ? `<span class="combo-badge">🔥 ${S.combo}</span>` : '');
  if (anim) { po.classList.remove('pop', 'salto'); void po.offsetWidth; po.classList.add(anim); }
}
function armIdle() {
  clearTimeout(S.idle);
  S.idle = setTimeout(() => { if (S && !S.done && !S.checked) { S.sleeping = true; setPromptOwl('sleep'); } }, 15000);
}
function wake() {
  if (!S || S.done) return;
  if (S.sleeping) { S.sleeping = false; setPromptOwl('think', 'pop'); }
  if (!S.checked) armIdle();
}
function onTyping() {
  wake();
  const po = $('#promptOwl'); if (!po) return;
  po.classList.add('typing');
  clearTimeout(S.typeT); S.typeT = setTimeout(() => po.classList.remove('typing'), 1500);
}

const answerInput = (id, ph) => `<input class="answer" id="${id}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${ph}">`;
const accentBar = () => `<div class="accents">${ACCENTS.map(a => `<button data-acc="${a}" tabindex="-1">${a}</button>`).join('')}</div>`;

function renderQ() {
  const q = S.q;
  let input, line, sub = '';
  if (q.kind === 'si') {
    line = `<div class="prompt-line si-line">${esc(siOpen(q.s1 + ' '))}<span class="blank">___¹</span> <span class="pverb">(${esc(q.inf)})</span> ${esc(q.mid)} ${esc(q.s2)} <span class="blank">___²</span> <span class="pverb">(${esc(q.inf2)})</span> ${esc(q.end)}</div>`;
    input = `<div class="si-inputs">
        <label class="si-in"><span>¹ Si-Satz <small>${esc(q.s1)} · ${esc(q.inf)}</small></span>${answerInput('answer', 'Verbform eintippen…')}</label>
        <label class="si-in"><span>² Hauptsatz <small>${esc(q.s2)} · ${esc(q.inf2)}</small></span>${answerInput('answer2', 'Verbform eintippen…')}</label>
      </div>${accentBar()}`;
  } else if (q.kind === 'aux') {
    S.choices = ['avoir', 'être'];
    line = `<div class="prompt-line"><span class="pron">${esc(q.pron)}</span> <span class="blank">___</span> <span class="pverb">(${esc(q.inf)})</span> ${esc(q.ctx)}</div>`;
    sub = `<div class="prompt-de">passé composé – welches Hilfsverb? ${q.v.de ? '· ' + esc(q.v.de) : ''}</div>`;
    input = `<div class="choices two">${S.choices.map((c, i) => `<button class="choice" data-choice="${i}"><span class="num">${i + 1}</span>${c}</button>`).join('')}</div>`;
  } else if (q.kind === 'past') {
    const sup = ['¹', '²', '³'];
    line = `<div class="prompt-line si-line">${pastFill(q, (b, i) => `<span class="blank">___${sup[i]}</span> <span class="pverb">(${esc(b[0])})</span>`)}</div>`;
    sub = '<div class="prompt-de">Imparfait, passé composé oder plus-que-parfait?</div>';
    input = `<div class="si-inputs">${q.blanks.map((b, i) => `<label class="si-in"><span>${sup[i]} <small>${esc(b[0])}</small></span>${answerInput(i ? 'answer' + (i + 1) : 'answer', 'Verbform eintippen…')}</label>`).join('')}</div>${accentBar()}`;
  } else if (q.kind === 'voc') {
    const toFr = q.dir === 'df';
    line = `<div class="prompt-line voc-word">${esc(q.q)}</div>`;
    sub = `<div class="prompt-de">${toFr ? 'Deutsch → Französisch' : 'Französisch → Deutsch'}${!toFr && q.it.note && q.it.note.length < 12 ? ' · ' + esc(q.it.note) : ''}</div>`;
    if (S.mode === 'card') {
      input = `<div class="flash" id="flash"><div class="flash-hint">Überlege dir die Antwort – dann umdrehen.</div>
        <div class="flash-back hidden" id="flashBack"><b>${esc(q.form)}</b>${q.it.note ? `<small>${esc(q.it.note)}</small>` : ''}</div></div>`;
    } else if (S.mode === 'mc') {
      S.choices = vocChoices(q);
      input = `<div class="choices">${S.choices.map((c, i) => `<button class="choice" data-choice="${i}"><span class="num">${i + 1}</span>${esc(c)}</button>`).join('')}</div>`;
    } else input = answerInput('answer', toFr ? 'Auf Französisch eintippen…' : 'Auf Deutsch eintippen…') + (toFr ? accentBar() : '');
  } else {
    if (S.mode === 'mc') {
      S.choices = buildChoices(q);
      input = `<div class="choices">${S.choices.map((c, i) => `<button class="choice" data-choice="${i}"><span class="num">${i + 1}</span>${esc(displayForm(c))}</button>`).join('')}</div>`;
    } else input = answerInput('answer', 'Konjugation eintippen…') + accentBar();
    const verbTxt = S.english && q.v.de ? esc(q.v.de) : esc(q.inf);
    line = `<div class="prompt-line"><span class="pron">${esc(promptSubject(q))}</span> <span class="pverb">(${verbTxt})</span></div>`;
    sub = S.english ? '' : `<div class="prompt-de">${esc(q.v.de || '')}</div>`;
  }
  $('#playBody').innerHTML = `
    <div class="prompt">
      <div class="prompt-owl" id="promptOwl"></div>
      <div class="bubble big">
        <div class="tense-badge">${esc(qBadge(q))}</div>
        ${line}${sub}
      </div>
    </div>
    ${input}`;
  setPromptOwl('think');
  const foot = $('#playFoot');
  foot.className = 'play-foot';
  foot.innerHTML = S.mode === 'card'
    ? `<span></span><button class="btn btn-primary" id="flipBtn">Umdrehen <small>(Leertaste)</small></button>`
    : `<button class="btn" id="skipBtn">Überspringen</button><button class="btn btn-primary" id="checkBtn" disabled>Prüfen</button>`;
  S.flipped = false;
  updateScore();
  const ins = $$('#playBody .answer');
  S.lastInput = ins[0] || null;
  ins.forEach(inp => {
    inp.addEventListener('input', () => { $('#checkBtn').disabled = ins.some(i => !i.value.trim()); onTyping(); });
    inp.addEventListener('focus', () => { S.lastInput = inp; });
  });
  if (ins[0]) setTimeout(() => ins[0].focus(), 30);
  armIdle();
}

function buildChoices(q) {
  const correct = q.form, forms = conjugate(q.v);
  const same = new Set(expand(correct));
  const isDup = (f, list) => list.includes(f) || expand(f).some(x => same.has(x));
  const distract = [];
  // typischer Fehler: Form ohne Stammänderung (achete, commencons, mangons, emploie→employe …)
  if (q.tense === 'present' && q.inf.endsWith('er') && !q.v.refl) {
    const naive = q.inf.slice(0, -2) + ['e', 'es', 'e', 'ons', 'ez', 'ent'][q.pi];
    if (!isDup(naive, distract)) distract.push(naive);
  }
  shuffle(forms[q.tense]).forEach(f => { if (f && distract.length < 3 && !isDup(f, distract)) distract.push(f); });
  for (const f of shuffle(Object.values(forms).flat())) { if (distract.length >= 3) break; if (f && !isDup(f, distract)) distract.push(f); }
  for (const v of shuffle(S.verbs)) {
    if (distract.length >= 3) break;
    const f = conjugate(v)[q.tense][q.pi];
    if (f && !isDup(f, distract)) distract.push(f);
  }
  return shuffle([correct, ...distract.slice(0, 3)]);
}
function selectChoice(i) {
  const btns = $$('.choice'); if (!btns[i] || S.checked) return;
  btns.forEach((b, j) => b.classList.toggle('sel', j === i));
  $('#checkBtn').disabled = false;
  if (S.q.kind === 'aux') check(false);   // Schnellspiel: sofort prüfen
}

function check(skip) {
  if (!S || S.checked || S.done) return;
  const q = S.q;
  let ok = false, note = '', given = '';
  if (skip) given = '—';
  else if (S.mode === 'card') { ok = !!S.cardOk; given = ok ? '' : '—'; }
  else if (q.kind === 'past') {
    const ins = $$('#playBody .answer'); if (ins.some(i => !i.value.trim())) return;
    const rs = q.blanks.map((b, i) => evalForm(ins[i].value, b[1]));
    q.okParts = rs.map(r => r.ok); ok = rs.every(r => r.ok); note = (rs.find(r => r.note) || {}).note || '';
    given = ins.map(i => i.value.trim()).join(' … ');
    ins.forEach((inp, i) => inp.classList.add(rs[i].ok ? 'ok' : 'bad'));
  }
  else if (q.kind === 'si') {
    const a1 = $('#answer').value, a2 = $('#answer2').value;
    if (!a1.trim() || !a2.trim()) return;
    const r1 = evalForm(a1, q.f1), r2 = evalForm(a2, q.f2);
    ok = r1.ok && r2.ok; note = r1.note || r2.note || '';
    given = `${a1.trim()} … ${a2.trim()}`;
    $('#answer').classList.add(r1.ok ? 'ok' : 'bad'); $('#answer2').classList.add(r2.ok ? 'ok' : 'bad');
  } else if (S.mode === 'mc' || q.kind === 'aux') {
    const sel = $('.choice.sel'); if (!sel) return;
    const i = +sel.dataset.choice; given = displayForm(S.choices[i]); ok = S.choices[i] === q.form;
  } else {
    given = $('#answer').value; if (!given.trim()) return;
    const r = q.kind === 'voc' ? vocEval(given, q) : evaluate(given, q); ok = r.ok; note = r.note || '';
  }
  S.checked = true; S.answered++;
  clearTimeout(S.idle); clearTimeout(S.typeT); S.sleeping = false;
  state.stats.answered++;
  if (!q.kind) {
    const pv = state.stats.perVerb[q.inf] || (state.stats.perVerb[q.inf] = { r: 0, w: 0 });
    const pf = state.stats.perForm[`${q.inf}|${q.tense}|${q.pi}`] || (state.stats.perForm[`${q.inf}|${q.tense}|${q.pi}`] = { r: 0, w: 0 });
    ok ? (pv.r++, pf.r++) : (pv.w++, pf.w++); pf.t = Date.now();
  }
  if (q.kind === 'voc' && !S.vocGraded.has(q.id)) { S.vocGraded.add(q.id); vocabGrade(q.id, ok);
  }
  if (ok) {
    S.correct++; S.combo++; S.best = Math.max(S.best, S.combo); S.xp += XP_PER; state.stats.correct++;
  } else {
    S.wrong++; S.combo = 0;
    if (!S.mistakes.some(m => m.inf === q.inf && m.tense === q.tense && m.pi === q.pi && m.form === q.form)) S.mistakes.push({ ...q, given });
    if (!S.test) S.retry.push({ ...q, due: S.answered + 3 });
  }
  save();

  // Testmodus: kein Feedback, direkt weiter
  if (S.test) { if (S.answered >= TEST_N) finish(); else next(); return; }
  // Karteikarten: Antwort war schon sichtbar – kurze Reaktion, dann direkt weiter
  if (S.mode === 'card') { sound(ok ? 'ok' : 'bad'); setPromptOwl(ok ? 'cheer' : 'sad', 'pop'); updateScore(); setTimeout(() => { if (S && !S.done && S.checked) next(); }, 450); return; }

  sound(ok ? 'ok' : 'bad');
  if (ok && S.combo === 5) toast('😎 5 richtige in Folge – Bleu holt die Sonnenbrille raus!');
  else if (ok && S.combo % 10 === 0) toast(`🔥 ${S.combo} in Folge – Salto!`);
  else if (ok && S.combo % 5 === 0) toast(`🔥 ${S.combo} richtige in Folge!`);

  $$('#playBody .answer').forEach(inp => { inp.disabled = true; if (!q.kind || q.kind === 'voc') inp.classList.add(ok ? 'ok' : 'bad'); });
  $$('.accents button').forEach(b => { b.disabled = true; });
  $$('.choice').forEach((b, i) => {
    b.disabled = true;
    if (S.choices[i] === q.form) b.classList.add('right');
    else if (b.classList.contains('sel')) b.classList.add('wrong');
    b.classList.remove('sel');
  });
  const po = $('#promptOwl'); if (po) po.classList.remove('typing');
  setPromptOwl(ok ? 'cheer' : 'sad', ok && S.combo >= 10 && S.combo % 10 === 0 ? 'salto' : 'pop');

  const tips = ok ? [] : qTips(q);
  const foot = $('#playFoot');
  foot.className = 'play-foot ' + (ok ? 'ok' : 'bad');
  foot.innerHTML = `
    <div class="fb">
      <div class="fb-icon">${ok ? '✓' : '✕'}</div>
      <div>
        <div class="fb-title">${ok ? pick(PRAISE) : 'Sollte sein:'}</div>
        <div class="fb-answer">${esc(qAnswer(q))} <button class="speak" data-say="${esc(qSpeak(q))}" title="Anhören">🔊</button></div>
        ${note ? `<div class="fb-note">${esc(note)}</div>` : ''}
        ${tips.length ? `<div class="fb-rule">💡 ${tips.slice(0, 3).map(esc).join('<br>')}</div>` : ''}
      </div>
    </div>
    <button class="btn ${ok ? 'btn-primary' : 'btn-danger'}" id="nextBtn">Weiter</button>`;
  if (state.settings.speak) speak(qSpeak(q));
  updateScore();
  setTimeout(() => { const n = $('#nextBtn'); if (n) n.focus(); }, 30);
}

function updateScore() {
  if (!S) return;
  if (S.test) {
    $('#scoreTxt').textContent = `${Math.min(S.answered + 1, TEST_N)}/${TEST_N}`;
    $('#pctTxt').textContent = '';
    $('#progFill').style.width = (S.answered / TEST_N * 100) + '%';
    return;
  }
  $('#scoreTxt').textContent = `${S.correct}/${S.answered}`;
  $('#pctTxt').textContent = (S.answered ? Math.round(S.correct / S.answered * 100) : 0) + '%';
  if (S.review) $('#progFill').style.width = Math.min(100, S.correct / S.reviewTotal * 100) + '%';
}
function tick() {
  if (!S || S.done) return;
  const meta = $('#playMeta');
  if (S.timed) {
    if (!S.endAt) S.endAt = Date.now() + S.timeTotal;
    const left = Math.max(0, S.endAt - Date.now());
    meta.textContent = '⏱ ' + fmtTime(left);
    meta.classList.toggle('low', left < 10000);
    $('#progFill').style.width = (left / S.timeTotal * 100) + '%';
    if (left <= 0) finish();
  } else {
    meta.textContent = '⏱ ' + fmtTime(Date.now() - S.start);
  }
}

function insertAtCursor(ch) {
  const inp = (S && S.lastInput) || $('#answer'); if (!inp || inp.disabled) return;
  const s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? inp.value.length;
  inp.value = inp.value.slice(0, s) + ch + inp.value.slice(e);
  inp.setSelectionRange(s + ch.length, s + ch.length);
  inp.focus(); inp.dispatchEvent(new Event('input'));
}

function flipCard() {
  if (!S || S.flipped || S.checked) return;
  S.flipped = true;
  const back = $('#flashBack'); if (back) back.classList.remove('hidden');
  const hint = $('.flash-hint'); if (hint) hint.classList.add('hidden');
  if (state.settings.speak) speak(qSpeak(S.q));
  $('#playFoot').innerHTML = '<button class="btn btn-danger" id="cardNo">✕ Nicht gewusst <small>(1)</small></button><button class="btn btn-primary" id="cardYes">✓ Gewusst <small>(2)</small></button>';
}
function stopSession() { if (S) { clearInterval(S.timer); clearTimeout(S.idle); clearTimeout(S.typeT); S.done = true; } }

$('#screen-play').addEventListener('mousedown', e => { if (e.target.closest('[data-acc]')) e.preventDefault(); });
$('#screen-play').addEventListener('click', e => {
  if (S && !S.done) wake();
  const b = e.target.closest('button'); if (!b || !S) return;
  if (b.dataset.acc) insertAtCursor(b.dataset.acc);
  else if (b.dataset.choice !== undefined) selectChoice(+b.dataset.choice);
  else if (b.dataset.say) speak(b.dataset.say);
  else if (b.id === 'checkBtn') check(false);
  else if (b.id === 'skipBtn') check(true);
  else if (b.id === 'nextBtn') next();
  else if (b.id === 'flipBtn') flipCard();
  else if (b.id === 'cardYes') { S.cardOk = true; check(false); }
  else if (b.id === 'cardNo') { S.cardOk = false; check(false); }
  else if (b.id === 'endBtn') finish();
  else if (b.id === 'replayBtn') { const m = S.test ? 'test' : S.mode, o = S.opts; stopSession(); if (o.again) o.again(); else startSession(null, m); }
  else if (b.id === 'quitBtn') {
    confirmBox('Willst du wirklich gehen?', 'Dein Fortschritt in dieser Übung geht verloren.', 'Verlassen', () => {
      const v = S.vocab; stopSession(); S = null; go(v ? 'vocab' : 'home');
    }, 'Bleiben');
  }
});

document.addEventListener('keydown', e => {
  if (!$('#modal').classList.contains('hidden')) { if (e.key === 'Escape') closeModal(); return; }
  if (!S || S.done || !$('#screen-play').classList.contains('active') || e.repeat) return;
  wake();
  if (S.mode === 'card') {
    if (S.checked) return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!S.flipped) return flipCard(); if (e.key === 'Enter') { S.cardOk = true; check(false); } return; }
    if (S.flipped && (e.key === '1' || e.key === '2')) { S.cardOk = e.key === '2'; check(false); }
    return;
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    if (S.checked) return next();
    const empty = $$('#playBody .answer').find(i => !i.value.trim());
    if (empty && (S.q.kind === 'si' || S.q.kind === 'past')) return empty.focus();
    check(false);
  }
  else if ((S.mode === 'mc' || S.mode === 'aux') && !S.checked && /^[1-4]$/.test(e.key)) selectChoice(+e.key - 1);
});

function finish() {
  if (!S || S.done) return;
  stopSession();
  const total = S.test ? TEST_N : S.answered;
  const acc = total ? Math.round(S.correct / total * 100) : 0;
  const xpBefore = state.stats.xp;
  if (S.correct > 0) { addXP(S.xp); bumpStreak(); }
  state.stats.sessions++; save(); updateHud();
  const unlocked = OUTFITS.filter(o => xpBefore < o.xp && state.stats.xp >= o.xp);
  const secs = S.timed ? Math.min(S.timeTotal, Date.now() - S.start) : Date.now() - S.start;
  // Schweizer Note 1–6, auf halbe Noten gerundet
  const grade = S.test ? Math.round((1 + 5 * S.correct / TEST_N) * 2) / 2 : null;
  const title = S.test
    ? (grade >= 5.5 ? 'Ausgezeichnet!' : grade >= 5 ? 'Sehr gut!' : grade >= 4 ? 'Bestanden!' : 'Weiter üben – du schaffst das!')
    : S.answered === 0 ? 'Keine Antworten' : acc === 100 ? 'Perfekt!' : acc >= 80 ? 'Super gemacht!' : acc >= 50 ? 'Gut gemacht!' : 'Nicht aufgeben!';
  const what = S.vocab ? S.label : S.mode === 'past' ? 'Imparfait, PC oder PQP?' : S.mode === 'si' ? 'Si-Sätze' : S.mode === 'aux' ? 'avoir oder être?' : (S.test ? 'Testmodus · ' : '') + curSet().title;
  const mistakes = S.mistakes;
  $('#screen-result').innerHTML = `
    <div class="result">
      ${owlSVG(acc >= 50 ? 'cheer' : 'happy')}
      <h1>${title}</h1>
      <p class="sub">Deine Ergebnisse · ${esc(what)}</p>
      <div class="tiles">
        ${S.test ? `<div class="tile gold"><div class="tile-h">Note</div><div class="tile-v">🎓 ${String(grade)}</div></div>` : ''}
        <div class="tile"><div class="tile-h">Punkte</div><div class="tile-v">${S.correct}/${total}</div></div>
        <div class="tile purple"><div class="tile-h">Genauigkeit</div><div class="tile-v">🎯 ${acc}%</div></div>
        ${S.test ? '' : `<div class="tile gold"><div class="tile-h">XP</div><div class="tile-v">⚡ ${S.correct > 0 ? S.xp : 0}</div></div>`}
        <div class="tile orange"><div class="tile-h">Zeit</div><div class="tile-v">⏱ ${fmtTime(secs)}</div></div>
      </div>
      ${S.best >= 5 && !S.test ? `<p class="sub">🔥 Beste Serie: ${S.best} richtige in Folge</p>` : ''}
      ${mistakes.length ? `<h3>Fehler</h3><div class="mistakes">${mistakes.map(m => `
        <div class="mistake">
          <div class="m-q"><small>${esc(qBadge(m))}${m.kind ? '' : ' · ' + esc(m.inf)}</small>${esc(qPromptText(m))}</div>
          <div class="m-a">${m.given && m.given !== '—' ? `<s>${esc(m.given)}</s>` : ''}${esc(qAnswer(m))}</div>
        </div>`).join('')}</div>` : ''}
      <div class="result-actions">
        ${mistakes.length ? `<button class="btn btn-gold" id="rReview">Fehler üben (${mistakes.length})</button>` : ''}
        <button class="btn" id="rAgain">↻ Nochmal</button>
        <button class="btn btn-primary" id="rHome">Fertig</button>
      </div>
    </div>`;
  S.lastMistakes = mistakes;
  showScreen('result');
  sound('end');
  if ((S.test ? grade >= 5 : acc >= 80 && S.answered >= 5)) confetti();
  if (unlocked.length) setTimeout(() => {
    toast(`🎁 Neues Outfit für Bleu: ${unlocked.map(o => o.name).join(', ')}! Zieh es unter „Fortschritt“ an.`);
    confetti();
  }, 900);
}
$('#screen-result').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.id === 'rReview' && S) startSession(S.lastMistakes.map(({ given, due, ...q }) => q), S.mode, S.opts);
  else if (b.id === 'rAgain' && S) { if (S.opts.again) S.opts.again(); else startSession(null, S.test ? 'test' : S.mode); }
  else if (b.id === 'rHome') { const v = S && S.vocab; S = null; go(v ? 'vocab' : 'home'); }
});

function confetti() {
  const box = document.createElement('div'); box.className = 'confetti';
  const colors = ['#1CB0F6', '#FFC800', '#FF4B4B', '#CE82FF', '#FF9600', '#84D8FF'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('i');
    c.style.left = Math.random() * 100 + '%';
    c.style.background = pick(colors);
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    c.style.animationDelay = (Math.random() * 0.7) + 's';
    box.appendChild(c);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5500);
}

/* =========================================================
   WÖRTER – Vocabulaire EMP (Karteikarten mit Leitner-System)
   ========================================================= */
const VOCAB = [], VOCAB_T = [];
(typeof VOCAB_RAW !== 'undefined' ? VOCAB_RAW : []).forEach(t => {
  const meta = { n: t.n, title: t.title, secs: [], items: [] };
  let sec = null, i = 0;
  t.text.split('\n').forEach(raw => {
    const line = raw.trim(); if (!line) return;
    if (line.startsWith('#')) { sec = { name: line.slice(1).trim(), items: [] }; meta.secs.push(sec); return; }
    const k = line.indexOf(' = '); if (k < 0) return;
    let de = line.slice(k + 3), note = '';
    const p = de.indexOf(' | '); if (p >= 0) { note = de.slice(p + 3).trim(); de = de.slice(0, p); }
    if (!sec) { sec = { name: 'Allgemein', items: [] }; meta.secs.push(sec); }
    const it = { id: t.n + ':' + (i++), t: t.n, sec: sec.name, fr: line.slice(0, k).trim(), de: de.trim(), note };
    sec.items.push(it); meta.items.push(it); VOCAB.push(it);
  });
  VOCAB_T.push(meta);
});

/* Leitner: Box 0–5, nächste Wiederholung nach 0/1/3/7/14/30 Tagen. Ab Box 3 gilt ein Wort als gelernt. */
const BOX_DAYS = [0, 1, 3, 7, 14, 30];
const dayNum = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); };
const vbox = id => (state.vocab[id] ? state.vocab[id].b : -1);
const vLearned = id => vbox(id) >= 3;
const vDue = id => !!state.vocab[id] && state.vocab[id].d <= dayNum();
function vocabGrade(id, ok) {
  const s = state.vocab[id] || { b: 0, d: 0, w: 0 };
  if (ok) s.b = Math.min(5, s.b + 1); else { s.b = 0; s.w = (s.w || 0) + 1; }
  s.d = dayNum() + BOX_DAYS[s.b];
  state.vocab[id] = s;
}

/* Antwort prüfen (deutsch: grosszügig, französisch: Artikel und Akzente zählen) */
const vnorm = s => cleanBasic(String(s)).replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/\.\.\.|…/g, ' ').replace(/[!?.,;:]+$/g, '').replace(/\s+/g, ' ').trim();
const DE_ART = /^(der|die|das|den|dem|des|ein|eine|einen|sich) /;
/* trennt an Kommas/Schrägstrichen – aber nicht innerhalb von Klammern: "spielen (Sport, Spiele)" bleibt ganz */
function splitTop(str, seps) {
  const out = []; let depth = 0, cur = '';
  for (const ch of String(str)) {
    if (ch === '(') depth++; else if (ch === ')') depth = Math.max(0, depth - 1);
    if (!depth && seps.includes(ch)) { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur);
  return out.map(x => x.trim()).filter(Boolean);
}
function vocEval(input, q) {
  const a = vnorm(input);
  if (q.dir === 'fd') {
    // Deutsch: jedes Synonym zählt, Artikel egal, Klammerteile optional, Umlaute grosszügig
    const vs = new Set();
    const add = p => {
      [p, ...expand(p)].forEach(x => {
        const y = stripAcc(vnorm(x));
        [y, y.replace(DE_ART, ''), y.replace(/\s*\([^)]*\)\s*/g, ' ').trim(), y.replace(/[()]/g, '')]
          .forEach(z => { if (z && !/^(der|die|das|den|dem|des)$/.test(z)) vs.add(z); });
      });
    };
    add(q.form);
    (q.alts || []).forEach(alt => { add(alt); splitTop(alt, ',;').forEach(add); });   // z.B. „der/die Bekannte“ als Ganzes
    splitTop(q.form, '/').forEach(alt => { add(alt); splitTop(alt, ',;').forEach(add); splitTop(alt, ',;/').forEach(add); alt.split(' oder ').forEach(add); });
    const has = s => { const y = stripAcc(vnorm(s)); return vs.has(y) || vs.has(y.replace(DE_ART, '')); };
    return { ok: has(input) || splitTop(input, ',;').every(has) || splitTop(input, ',;/').every(has) };
  }
  // Französisch: Artikel und Akzente zählen
  const vs = [vnorm(q.form), vnorm(q.form.replace(/\([^)]*\)/g, ''))];
  splitAlt(q.form).forEach(alt => {
    expand(alt).forEach(x => vs.push(vnorm(x)));
    const first = alt.split(', ')[0];                    // bei Adjektiven reicht die männliche Form
    if (first !== alt) expand(first).forEach(x => vs.push(vnorm(x)));
  });
  const parts = a.includes('/') ? a.split('/').map(x => x.trim()).filter(Boolean) : [a];   // „le frigidaire / le frigo“
  if (vs.includes(a) || parts.every(p => vs.includes(p))) return { ok: true };
  if (vs.some(x => stripAcc(x) === stripAcc(a))) {
    return state.settings.ignoreAccents ? { ok: true, note: 'Achte auf die Akzente!' } : { ok: false, note: 'Fast! Nur die Akzente stimmen nicht.' };
  }
  const ART = /^(le |la |l'|les |un |une )/;
  if (vs.some(x => ART.test(x) && x.replace(ART, '') === a)) return { ok: false, note: 'Fast! Der Artikel fehlt – lerne ihn immer mit.' };
  return { ok: false };
}
function vocChoices(q) {
  const key = q.dir === 'df' ? 'fr' : 'de';
  const okFor = x => !(q.alts || [q.form]).includes(x[key]) && x[q.dir === 'df' ? 'de' : 'fr'] !== q.q;
  const same = VOCAB.filter(x => x.t === q.it.t && okFor(x));
  const pool = shuffle(same.length >= 6 ? same : VOCAB.filter(okFor));
  const out = [];
  for (const x of pool) { if (out.length >= 3) break; if (!out.includes(x[key])) out.push(x[key]); }
  return shuffle([q.form, ...out]);
}

/* Fragen bauen: fällige zuerst, dann neue, dann unsichere, gelernte zuletzt */
function vocQ(it, dir) {
  const d = dir === 'mix' ? (Math.random() < 0.5 ? 'fd' : 'df') : dir;
  const pk = d === 'df' ? 'de' : 'fr', tk = d === 'df' ? 'fr' : 'de';
  // gleiche Abfrage, mehrere richtige Übersetzungen (z.B. die Sache → la chose / l'objet): alle zählen
  const alts = [...new Set(VOCAB.filter(x => x[pk] === it[pk]).map(x => x[tk]))];
  return { kind: 'voc', it, id: it.id, dir: d, inf: it.id + d, tense: 'voc', pi: 0, q: it[pk], form: alts.join(' / '), alts };
}
function vocPick(pool, count) {
  const score = it => { const s = state.vocab[it.id]; if (!s) return 1; if (s.d <= dayNum()) return 0; return 2 + s.b; };
  const sorted = shuffle(pool).sort((a, b) => score(a) - score(b));
  return count === 'all' ? sorted : sorted.slice(0, count);
}
function startVocab(pool, mode, dir, count, label) {
  const items = vocPick(pool, count).map(it => vocQ(it, dir));
  if (!items.length) return toast('Keine Wörter ausgewählt.');
  startSession(items, mode, { vocab: true, label, again: () => startVocab(pool, mode, dir, count, label) });
}

/* ---------- Übersicht ---------- */
let vocView = { t: null, secs: null, dir: 'fd', count: 20, search: '', showList: false };
function renderVocab() { if (vocView.t) renderVocTranche(); else renderVocHome(); }

function renderVocHome() {
  const learned = VOCAB.filter(it => vLearned(it.id)).length;
  const due = VOCAB.filter(it => vDue(it.id));
  const hard = VOCAB.filter(it => state.vocab[it.id] && state.vocab[it.id].w > 0 && state.vocab[it.id].b < 3);
  const pct = VOCAB.length ? Math.round(learned / VOCAB.length * 100) : 0;
  $('#screen-vocab').innerHTML = `
    <div class="card hero">
      <div class="hero-owl">${owlSVG(due.length ? 'think' : 'happy')}</div>
      <div class="hero-text">
        <div class="bubble">${learned ? `Du kannst schon <b>${learned}</b> von ${VOCAB.length} Wörtern.` : `Hier sind alle <b>${VOCAB.length}</b> Wörter aus dem Vocabulaire EMP. Wähle eine Tranche!`}
          ${due.length ? ` <b>${due.length}</b> Wörter sind heute zum Wiederholen fällig.` : ''}</div>
        <div class="goal"><div class="goal-label"><b>Gelernt</b><span>${pct}%</span></div><div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div></div>
        <div class="voc-actions">
          <button class="btn btn-primary btn-sm" id="vocDue" ${due.length ? '' : 'disabled'}>🔁 Fällige wiederholen (${due.length})</button>
          <button class="btn btn-gold btn-sm" id="vocHard" ${hard.length ? '' : 'disabled'}>🎯 Schwierige Wörter (${hard.length})</button>
        </div>
      </div>
    </div>
    <input class="search" id="vocSearch" placeholder="🔍 Wort suchen – französisch oder deutsch…" value="${esc(vocView.search)}">
    <div id="vocResults"></div>
    <div class="tranches">${VOCAB_T.map(t => {
      const n = t.items.length, l = t.items.filter(it => vLearned(it.id)).length, d = t.items.filter(it => vDue(it.id)).length;
      return `<button class="tr-card" data-tr="${t.n}">
        <span class="tr-num">${t.n}</span>
        <span class="tr-txt"><b>Tranche ${t.n}</b><small>${esc(t.title)}</small>
          <span class="bar mini"><span class="bar-fill" style="width:${n ? l / n * 100 : 0}%"></span></span>
          <small class="tr-meta">${l}/${n} gelernt${d ? ` · <span class="due">${d} fällig</span>` : ''}</small></span>
      </button>`;
    }).join('')}</div>`;
  renderVocResults();
}
function renderVocResults() {
  const box = $('#vocResults'); if (!box) return;
  const q = searchNorm(vocView.search);
  if (q.length < 2) { box.innerHTML = ''; return; }
  const res = VOCAB.filter(it => searchNorm(it.fr).includes(q) || searchNorm(it.de).includes(q)).slice(0, 40);
  box.innerHTML = `<div class="card">${res.length ? res.map(vocRow).join('') : '<p class="hint">Nichts gefunden.</p>'}</div>`;
}
function vocRow(it) {
  const b = vbox(it.id);
  return `<div class="wrow"><button class="speak" data-say="${esc(splitAlt(it.fr)[0])}" title="Anhören">🔊</button>
    <span class="vr-fr"><b>${esc(it.fr)}</b>${it.note ? `<small>${esc(it.note)}</small>` : ''}</span>
    <span class="vr-de">${esc(it.de)}</span>
    <span class="vr-box" title="${b < 0 ? 'noch nicht geübt' : 'Box ' + b + ' von 5'}">${[1, 2, 3, 4, 5].map(i => `<i class="${b >= i ? 'on' : ''}"></i>`).join('')}</span>
    <span class="vr-t">T${it.t}</span></div>`;
}

function renderVocTranche() {
  const t = VOCAB_T.find(x => x.n === vocView.t);
  if (!vocView.secs) vocView.secs = t.secs.map(s => s.name);
  const sel = t.secs.filter(s => vocView.secs.includes(s.name));
  const pool = sel.flatMap(s => s.items);
  const learned = pool.filter(it => vLearned(it.id)).length;
  const chip = (attr, on, label) => `<button class="chip ${on ? 'on' : ''}" ${attr}>${label}</button>`;
  $('#screen-vocab').innerHTML = `
    <div class="card-head"><button class="link" data-vback>← Alle Tranches</button></div>
    <h1 class="set-title">Tranche ${t.n}</h1>
    <p class="hint">${esc(t.title)} · ${t.items.length} Wörter</p>
    <div class="card">
      <h3>Themen <span class="count">${pool.length} Wörter · ${learned} gelernt</span></h3>
      <div class="chips small">${chip('data-vsecall', sel.length === t.secs.length, 'Alle')}${t.secs.map(s => chip(`data-vsec="${esc(s.name)}"`, vocView.secs.includes(s.name), `${esc(s.name)} <small>${s.items.length}</small>`)).join('')}</div>
      <h3>Richtung</h3>
      <div class="chips small">${[['fd', 'Französisch → Deutsch'], ['df', 'Deutsch → Französisch'], ['mix', 'Gemischt']].map(([k, l]) => chip(`data-vdir="${k}"`, vocView.dir === k, l)).join('')}</div>
      <h3>Wörter pro Runde</h3>
      <div class="chips small">${[[10, '10'], [20, '20'], [50, '50'], ['all', 'Alle']].map(([k, l]) => chip(`data-vcount="${k}"`, String(vocView.count) === String(k), l)).join('')}</div>
      <p class="hint">Zuerst kommen fällige und neue Wörter, gelernte zuletzt. Falsche Wörter kommen in der Runde nochmal.</p>
    </div>
    <div class="modes">
      <div class="mode-card main"><div class="mode-ico">🃏</div><b>Karteikarten</b><small>Umdrehen und selbst bewerten</small><button class="btn btn-sm btn-primary" data-vstart="card">Start</button></div>
      <div class="mode-card"><div class="mode-ico">🔘</div><b>Multiple Choice</b><small>Die richtige Übersetzung wählen</small><button class="btn btn-sm btn-primary" data-vstart="mc">Start</button></div>
      <div class="mode-card"><div class="mode-ico">✍️</div><b>Schreiben</b><small>Übersetzung eintippen</small><button class="btn btn-sm btn-primary" data-vstart="type">Start</button></div>
    </div>
    <div class="card">
      <div class="card-head"><h2>Wortliste</h2><button class="btn btn-sm" data-vlist>${vocView.showList ? 'Ausblenden' : 'Anzeigen'}</button></div>
      ${vocView.showList ? sel.map(s => `<h3>${esc(s.name)}</h3>${s.items.map(vocRow).join('')}`).join('') : '<p class="hint">Alle Wörter dieser Tranche mit deinem Lernstand (● = Box im Karteikasten).</p>'}
    </div>`;
}

$('#screen-vocab').addEventListener('input', e => {
  if (e.target.id === 'vocSearch') { vocView.search = e.target.value; renderVocResults(); }
});
$('#screen-vocab').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const t = vocView.t && VOCAB_T.find(x => x.n === vocView.t);
  if (b.dataset.say) return speak(b.dataset.say);
  if (b.dataset.tr) { vocView = { ...vocView, t: +b.dataset.tr, secs: null, showList: false }; renderVocab(); window.scrollTo(0, 0); }
  else if (b.dataset.vback !== undefined) { vocView.t = null; renderVocab(); }
  else if (b.id === 'vocDue') startVocab(VOCAB.filter(it => vDue(it.id)), 'card', vocView.dir, 'all', 'Fällige Wörter');
  else if (b.id === 'vocHard') startVocab(VOCAB.filter(it => state.vocab[it.id] && state.vocab[it.id].w > 0 && state.vocab[it.id].b < 3), 'card', vocView.dir, 50, 'Schwierige Wörter');
  else if (b.dataset.vsecall !== undefined) { vocView.secs = vocView.secs.length === t.secs.length ? [] : t.secs.map(s => s.name); renderVocab(); }
  else if (b.dataset.vsec) { toggleIn(vocView.secs, b.dataset.vsec); renderVocab(); }
  else if (b.dataset.vdir) { vocView.dir = b.dataset.vdir; renderVocab(); }
  else if (b.dataset.vcount) { vocView.count = b.dataset.vcount === 'all' ? 'all' : +b.dataset.vcount; renderVocab(); }
  else if (b.dataset.vlist !== undefined) { vocView.showList = !vocView.showList; renderVocab(); }
  else if (b.dataset.vstart) {
    const pool = t.secs.filter(s => vocView.secs.includes(s.name)).flatMap(s => s.items);
    startVocab(pool, b.dataset.vstart, vocView.dir, vocView.count, `Tranche ${t.n}`);
  }
});

/* =========================================================
   VERBEN VERWALTEN
   ========================================================= */
let vSetFilter = 'stem', vSearch = '';
function renderVerbs() {
  const vs = allVerbs();
  $('#screen-verbs').innerHTML = `
    <div class="card">
      <div class="card-head">
        <h2>Verben</h2>
        <div class="head-actions">
          <button class="btn btn-primary btn-sm" id="vNew">+ Neues Verb</button>
          <button class="btn btn-sm" id="vBulk">Mehrere hinzufügen</button>
        </div>
      </div>
      <p class="hint">${vs.length} Verben, davon ${state.custom.length} eigene. Regelmäßige Verben werden automatisch konjugiert, du kannst aber jede Form selbst anpassen. Neue Verben kannst du direkt dem Set <b>${esc(setById('stem').title)}</b> hinzufügen.</p>
      <div class="chips small">${[...VERB_SETS.filter(s => s.verbs).map(s => [s.id, `${s.title} (${setVerbs(s).length})`]), ['all', 'Alle Verben'], ['mine', 'Meine']].map(([k, l]) => `<button class="chip ${vSetFilter === k ? 'on' : ''}" data-vf="${k}">${esc(l)}</button>`).join('')}</div>
      <input class="search" id="vSearch" placeholder="🔍 Verb suchen…" value="${esc(vSearch)}">
      <div id="vList"></div>
      <div class="io">
        <button class="mini-btn" id="vExport">⬇ Eigene Verben exportieren</button>
        <label class="mini-btn">⬆ Importieren<input type="file" id="vImport" accept=".json,application/json" hidden></label>
      </div>
    </div>`;
  renderVerbList();
}
function renderVerbList() {
  const q = searchNorm(vSearch);
  let vs = vSetFilter === 'mine' ? allVerbs().filter(v => v.custom) : setVerbs(setById(vSetFilter));
  vs = vs.filter(v => !q || searchNorm(v.inf).includes(q) || searchNorm(v.de).includes(q));
  const stemSet = new Set(setVerbs(setById('stem')).map(v => v.inf));
  $('#vList').innerHTML = vs.map(v => {
    const g = verbGroup(v);
    return `<div class="vrow">
      <div class="vinfo"><b>${esc(v.inf)}</b><span>${esc(v.de || '—')}</span></div>
      <div class="vbadges"><span class="badge g-${g}">${GROUP_LABEL[g]}</span>${stemSet.has(v.inf) ? '<span class="badge g-er">Stammänd.</span>' : ''}${v.refl ? '<span class="badge g-ir">reflexiv</span>' : ''}${v.aux === 'être' ? '<span class="badge g-other">être</span>' : ''}${v.custom ? `<span class="badge mine">${v.overrides ? 'angepasst' : 'eigenes'}</span>` : ''}</div>
      <div class="vactions">
        <button class="mini-btn ${state.favs.includes(v.inf) ? 'on' : ''}" data-vfav="${esc(v.inf)}" title="Lieblingsverb">★</button>
        <button class="mini-btn" data-vview="${esc(v.inf)}" title="Konjugationstabelle">📋</button>
        <button class="mini-btn" data-vedit="${esc(v.inf)}" title="Bearbeiten">✏️</button>
        ${v.custom ? `<button class="mini-btn danger" data-vdel="${esc(v.inf)}" title="${v.overrides ? 'Auf Original zurücksetzen' : 'Löschen'}">${v.overrides ? '↺' : '🗑'}</button>` : ''}
      </div>
    </div>`;
  }).join('') || '<p class="empty">Keine Verben gefunden.</p>';
}
$('#screen-verbs').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.vf) { vSetFilter = b.dataset.vf; $$('[data-vf]').forEach(x => x.classList.toggle('on', x === b)); renderVerbList(); }
  else if (b.dataset.vfav) { toggleIn(state.favs, b.dataset.vfav); save(); renderVerbList(); }
  else if (b.dataset.vview) openTable(b.dataset.vview);
  else if (b.dataset.vedit) openEditor(b.dataset.vedit);
  else if (b.dataset.vdel) {
    const inf = b.dataset.vdel, isOv = BUILTIN_SET.has(inf);
    confirmBox(isOv ? 'Zurücksetzen?' : 'Verb löschen?', isOv ? `Deine Änderungen an „${esc(inf)}“ werden verworfen.` : `„${esc(inf)}“ wird endgültig gelöscht.`, isOv ? 'Zurücksetzen' : 'Löschen', () => {
      state.custom = state.custom.filter(v => v.inf !== inf);
      if (!isOv) Object.values(state.settings.perSet).forEach(c => { c.verbs = c.verbs.filter(i => i !== inf); });
      save(); renderVerbs(); toast(isOv ? 'Zurückgesetzt' : 'Gelöscht');
    });
  }
  else if (b.id === 'vNew') openEditor(null);
  else if (b.id === 'vBulk') openBulk();
  else if (b.id === 'vExport') exportCustom();
});
$('#screen-verbs').addEventListener('input', e => { if (e.target.id === 'vSearch') { vSearch = e.target.value; renderVerbList(); } });
$('#screen-verbs').addEventListener('change', e => { if (e.target.id === 'vImport' && e.target.files[0]) importCustom(e.target.files[0]); });

/* Verb in Sets aufnehmen und in der Übungsauswahl aktivieren */
function addToSets(inf, setIds) {
  VERB_SETS.forEach(s => {
    if (s.verbs && !setIds.includes(s.id)) return;
    const c = state.settings.perSet[s.id];
    if (c && !c.verbs.includes(inf)) c.verbs.push(inf);
  });
}
function setCheckboxes(selected) {
  return VERB_SETS.filter(s => s.verbs).map(s =>
    checkbox(`data-inset="${s.id}"`, selected.includes(s.id), `Zum Set „${esc(s.title)}“ hinzufügen`)).join('');
}

/* ---------- Modal ---------- */
function openModal(html, onMount) {
  $('#modalCard').innerHTML = html; $('#modal').classList.remove('hidden');
  if (onMount) onMount($('#modalCard'));
}
function closeModal() { $('#modal').classList.add('hidden'); $('#modalCard').innerHTML = ''; }
$('#modal').addEventListener('click', e => {
  if (e.target.id === 'modal' || e.target.closest('[data-close]')) closeModal();
  const say = e.target.closest('[data-say]'); if (say) speak(say.dataset.say);
});
function confirmBox(title, text, okLabel, onOk, cancelLabel = 'Abbrechen') {
  openModal(`<div class="confirm">${owlSVG('sad')}<h2>${title}</h2><p class="hint">${text}</p>
    <div class="modal-actions"><button class="btn" data-close>${cancelLabel}</button><button class="btn btn-danger" id="cfOk">${okLabel}</button></div></div>`,
    c => { $('#cfOk', c).onclick = () => { closeModal(); onOk(); }; });
}

/* ---------- Konjugationstabelle ---------- */
function openTable(inf) {
  const v = getVerb(inf); if (!v) return;
  const f = conjugate(v);
  openModal(`
    <div class="modal-head"><div><h2>${esc(v.inf)}</h2><small>${esc(v.de || '')} · Hilfsverb: ${v.aux} · Partizip: ${esc(getPP(v))}</small></div><button class="icon-btn" data-close>✕</button></div>
    <p class="hint">Tipp: Klicke auf eine Form, um sie dir vorlesen zu lassen.</p>
    <div class="ctable">${TENSES.map(t => `<div class="cbox"><h4>${t.fr}</h4>${f[t.id].map((form, i) => {
      if (!form) return '';
      const q = { pron: ['je', 'tu', 'il', 'nous', 'vous', 'ils'][i], tense: t.id, form };
      return `<button class="cline" data-say="${esc(phrase(q, true))}">${esc(phrase(q))}</button>`;
    }).join('')}</div>`).join('')}</div>
    <div class="modal-actions"><button class="btn" id="tEdit">✏️ Bearbeiten</button><button class="btn btn-primary" data-close>Schließen</button></div>`,
    c => { $('#tEdit', c).onclick = () => openEditor(inf); });
}

/* ---------- Editor ---------- */
function openEditor(inf) {
  const ex = inf ? getVerb(inf) : null;
  const forms = ex ? conjugate(ex) : null;
  const inSets = ex ? VERB_SETS.filter(s => s.verbs && setVerbs(s).some(v => v.inf === ex.inf)).map(s => s.id)
    : (vSetFilter !== 'all' && vSetFilter !== 'mine' ? [vSetFilter] : ['stem']);
  let manual = !!ex;
  const rows = PRON_LABELS.map((p, i) => `<tr><th>${p}</th>${EDIT_TENSES.map(t =>
    `<td><input data-t="${t}" data-i="${i}" value="${esc(forms ? forms[t][i] : '')}" spellcheck="false" autocomplete="off"></td>`).join('')}</tr>`).join('');
  openModal(`
    <div class="modal-head"><h2>${ex ? 'Verb bearbeiten' : 'Neues Verb'}</h2><button class="icon-btn" data-close>✕</button></div>
    ${ex && !ex.custom ? '<p class="hint">Das ist ein eingebautes Verb. Deine Änderungen werden als eigene Version gespeichert und können jederzeit mit ↺ zurückgesetzt werden.</p>' : ''}
    <div class="form-grid">
      <div class="field"><label>Infinitiv</label><input id="edInf" value="${esc(ex ? ex.inf : '')}" placeholder="z.B. jeter" spellcheck="false" autocomplete="off"></div>
      <div class="field"><label>Deutsch</label><input id="edDe" value="${esc(ex ? ex.de || '' : '')}" placeholder="z.B. werfen"></div>
      <div class="field"><label>Hilfsverb</label><select id="edAux"><option value="avoir">avoir</option><option value="être" ${ex && ex.aux === 'être' ? 'selected' : ''}>être</option></select></div>
      <div class="field"><label>Partizip (participe passé)</label><input id="edPP" value="${esc(ex ? getPP(ex) : '')}" placeholder="z.B. jeté" spellcheck="false" autocomplete="off"></div>
    </div>
    <div class="set-checks">${setCheckboxes(inSets)}</div>
    <div class="ed-bar">
      <p class="hint">Mehrere richtige Formen mit <b>/</b> trennen (z.B. <i>paie/paye</i>). Passé composé und Plus-que-parfait werden automatisch aus Hilfsverb und Partizip gebildet.</p>
      <button class="mini-btn" id="edAuto">🪄 Automatisch ausfüllen</button>
    </div>
    <div class="ftable-wrap"><table class="ftable"><thead><tr><th></th>${EDIT_TENSES.map(t => `<th>${tenseName(t)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>
    <div class="modal-actions"><button class="btn" data-close>Abbrechen</button><button class="btn btn-primary" id="edSave">Speichern</button></div>`,
  c => {
    const fInf = $('#edInf', c), fDe = $('#edDe', c), fAux = $('#edAux', c), fPP = $('#edPP', c);
    const cells = $$('input[data-t]', c);
    const fill = () => {
      const i = fInf.value.trim().toLowerCase(); if (!i) return;
      const tmp = { inf: i, aux: fAux.value };
      const fs = conjugate(tmp);
      cells.forEach(inp => { inp.value = fs[inp.dataset.t][+inp.dataset.i]; });
      fPP.value = getPP(tmp);
    };
    fInf.addEventListener('input', () => { if (!manual) fill(); });
    cells.forEach(i => i.addEventListener('input', () => { manual = true; }));
    fPP.addEventListener('input', () => { manual = true; });
    $('#edAuto', c).onclick = () => { if (!fInf.value.trim()) return toast('Gib zuerst einen Infinitiv ein.'); fill(); manual = false; };
    if (!ex) setTimeout(() => fInf.focus(), 30);

    $('#edSave', c).onclick = () => {
      const newInf = fInf.value.trim().toLowerCase();
      if (!newInf) return toast('Bitte gib einen Infinitiv ein.');
      if ((!ex || ex.inf !== newInf) && getVerb(newInf)) return toast(`„${newInf}“ gibt es schon – bearbeite es in der Liste.`);
      const fms = {};
      for (const t of EDIT_TENSES) fms[t] = [0, 1, 2, 3, 4, 5].map(i => $(`input[data-t="${t}"][data-i="${i}"]`, c).value.trim());
      if (Object.values(fms).some(a => a.some(x => !x))) return toast('Bitte fülle alle Formen aus.');
      const pp = fPP.value.trim(); if (!pp) return toast('Bitte gib das Partizip an.');
      const sets = $$('input[data-inset]', c).filter(x => x.checked).map(x => x.dataset.inset);
      const obj = { inf: newInf, de: fDe.value.trim(), aux: fAux.value, pp, forms: fms, sets };
      if (ex && ex.irr) obj.irr = true;
      if (ex && ex.custom && ex.inf !== newInf) {
        state.custom = state.custom.filter(v => v.inf !== ex.inf);
        Object.values(state.settings.perSet).forEach(cf => { cf.verbs = cf.verbs.map(i => i === ex.inf ? newInf : i); });
      }
      const idx = state.custom.findIndex(v => v.inf === newInf);
      if (idx >= 0) state.custom[idx] = obj; else state.custom.push(obj);
      addToSets(newInf, sets);
      save(); closeModal();
      if ($('#screen-verbs').classList.contains('active')) renderVerbs();
      toast(ex ? 'Gespeichert ✓' : `„${newInf}“ hinzugefügt ✓`);
    };
  });
}

/* ---------- Mehrere Verben ---------- */
function openBulk() {
  openModal(`
    <div class="modal-head"><h2>Mehrere Verben hinzufügen</h2><button class="icon-btn" data-close>✕</button></div>
    <p class="hint">Ein Verb pro Zeile im Format <b>Infinitiv ; Deutsch ; Hilfsverb</b>. Deutsch und Hilfsverb sind optional, Standard ist <i>avoir</i>. Die Formen werden automatisch erzeugt. Unregelmäßige Verben solltest du danach mit ✏️ kontrollieren.</p>
    <textarea id="bulkText" placeholder="jeter ; werfen&#10;appeler ; rufen&#10;payer ; bezahlen&#10;lever ; heben"></textarea>
    <div class="set-checks">${setCheckboxes(['stem'])}</div>
    <div class="modal-actions"><button class="btn" data-close>Abbrechen</button><button class="btn btn-primary" id="bulkSave">Hinzufügen</button></div>`,
  c => {
    setTimeout(() => { const t = $("#bulkText", c); if (t) t.focus(); }, 30);
    $('#bulkSave', c).onclick = () => {
      const sets = $$('input[data-inset]', c).filter(x => x.checked).map(x => x.dataset.inset);
      let added = 0, moved = 0;
      $('#bulkText', c).value.split('\n').forEach(line => {
        const parts = line.split(/[;\t|]/).map(s => s.trim());
        const inf = (parts[0] || '').toLowerCase(); if (!inf) return;
        const existing = getVerb(inf);
        if (existing) {
          // vorhandenes Verb nur dem Set hinzufügen
          const cv = state.custom.find(v => v.inf === inf);
          if (cv) cv.sets = [...new Set([...(cv.sets || []), ...sets])];
          else {
            const all = conjugate(existing), forms = {};
            EDIT_TENSES.forEach(t => { forms[t] = all[t]; });
            state.custom.push({ inf, de: existing.de || parts[1] || '', aux: existing.aux, pp: getPP(existing), forms, sets, ...(existing.irr ? { irr: true } : {}) });
          }
          addToSets(inf, sets); moved++; return;
        }
        const aux = /^(être|etre)$/i.test(parts[2] || '') ? 'être' : 'avoir';
        const tmp = { inf, aux }, all = conjugate(tmp), forms = {};
        EDIT_TENSES.forEach(t => { forms[t] = all[t]; });
        state.custom.push({ inf, de: parts[1] || '', aux, pp: getPP(tmp), forms, sets });
        addToSets(inf, sets); added++;
      });
      save(); closeModal(); renderVerbs();
      toast(`${added} neue Verben` + (moved ? ` · ${moved} vorhandene ins Set übernommen` : ''));
    };
  });
}

/* ---------- Export / Import ---------- */
function exportCustom() {
  if (!state.custom.length) return toast('Du hast noch keine eigenen Verben.');
  const blob = new Blob([JSON.stringify({ app: 'hibou', verbs: state.custom }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'hibou-verben.json'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function importCustom(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result), list = Array.isArray(d) ? d : d.verbs;
      if (!Array.isArray(list)) throw new Error();
      let n = 0;
      list.forEach(v => {
        if (!v || typeof v.inf !== 'string' || !v.inf.trim()) return;
        const obj = { inf: v.inf.trim().toLowerCase(), de: String(v.de || ''), aux: v.aux === 'être' ? 'être' : 'avoir' };
        if (v.pp) obj.pp = String(v.pp);
        if (v.irr) obj.irr = true;
        if (Array.isArray(v.sets)) obj.sets = v.sets.filter(s => typeof s === 'string');
        if (v.forms && typeof v.forms === 'object') {
          obj.forms = {};
          EDIT_TENSES.forEach(t => { if (Array.isArray(v.forms[t]) && v.forms[t].length === 6) obj.forms[t] = v.forms[t].map(String); });
        }
        const i = state.custom.findIndex(x => x.inf === obj.inf);
        if (i >= 0) state.custom[i] = obj; else state.custom.push(obj);
        addToSets(obj.inf, obj.sets || []);
        n++;
      });
      save(); renderVerbs(); toast(`${n} Verben importiert ✓`);
    } catch (e) { toast('Die Datei konnte nicht gelesen werden.'); }
  };
  r.readAsText(file);
}

/* =========================================================
   FORTSCHRITT
   ========================================================= */
let hardList = [];
function renderStats() {
  const s = state.stats, acc = s.answered ? Math.round(s.correct / s.answered * 100) : 0;
  const hard = Object.entries(s.perVerb)
    .map(([inf, x]) => ({ inf, ...x, n: x.r + x.w, rate: x.w / Math.max(1, x.r + x.w) }))
    .filter(h => h.n >= 3 && h.w > 0 && getVerb(h.inf))
    .sort((a, b) => b.rate - a.rate || b.w - a.w).slice(0, 8);
  hardList = hard.map(h => h.inf);
  const streak = currentStreak();
  $('#screen-stats').innerHTML = `
    <div class="card hero">
      <div class="hero-owl">${owlSVG(streak ? 'cheer' : 'happy')}</div>
      <div class="hero-text"><div class="bubble">${streak ? `Du übst seit <b>${streak} Tag${streak === 1 ? '' : 'en'}</b> in Folge. Formidable !` : 'Übe heute, um eine neue Serie zu starten!'}</div></div>
    </div>
    <div class="tiles">
      <div class="tile orange"><div class="tile-h">Tage-Serie</div><div class="tile-v">🔥 ${streak}</div></div>
      <div class="tile gold"><div class="tile-h">Gesamt-XP</div><div class="tile-v">⚡ ${s.xp}</div></div>
      <div class="tile"><div class="tile-h">Antworten</div><div class="tile-v">✏️ ${s.answered}</div></div>
      <div class="tile"><div class="tile-h">Wörter gelernt</div><div class="tile-v">🃏 ${VOCAB.filter(it => vLearned(it.id)).length}</div></div>
      <div class="tile purple"><div class="tile-h">Genauigkeit</div><div class="tile-v">🎯 ${acc}%</div></div>
    </div>
    <div class="card">
      <h2>Tagesziel</h2>
      <div class="chips">${[[20, 'Locker'], [50, 'Normal'], [100, 'Ernsthaft'], [200, 'Intensiv']].map(([g, l]) => `<button class="chip ${s.goal === g ? 'on' : ''}" data-goal="${g}">${l}<small>${g} XP pro Tag</small></button>`).join('')}</div>
    </div>
    <div class="card">
      <div class="card-head"><h2>Deine schwierigsten Verben</h2>${hard.length ? '<button class="btn btn-gold btn-sm" id="favHard">★ Als Lieblingsverben merken</button>' : ''}</div>
      ${hard.length ? hard.map(h => `<div class="hard"><b>${esc(h.inf)}</b><div class="bar"><div class="bar-fill" style="width:${Math.round(h.rate * 100)}%"></div></div><span>${h.w} / ${h.n} falsch</span></div>`).join('')
        : '<p class="hint">Noch nicht genug Daten. Übe ein paar Runden, dann zeigt dir Bleu hier, wo es noch hakt.</p>'}
      ${weakItems(999).length ? `<button class="btn btn-primary btn-sm" id="weakGo" style="margin-top:12px">🎯 Meine Schwachstellen üben (${weakItems(999).length} Formen)</button>` : ''}
    </div>
    <div class="card">
      <h2>Bleus Garderobe</h2>
      <p class="hint">Mit XP schaltest du neue Outfits frei. Klicke auf ein Outfit, um es an- oder auszuziehen.${isNight() ? ' 🌙 Es ist spät – Bleu trägt gerade seine Schlafmütze.' : ''}</p>
      <div class="wardrobe">${OUTFITS.map(o => {
        const open = s.xp >= o.xp, on = (state.settings.outfit || {})[o.slot] === o.id;
        return `<button class="ward ${on ? 'on' : ''} ${open ? '' : 'locked'}" data-outfit="${o.id}" ${open ? '' : 'disabled'}>
          ${owlSVG('happy', { only: o.id })}<b>${o.name}</b><small>${open ? (on ? 'angezogen ✓' : 'anziehen') : `🔒 ab ${o.xp} XP`}</small></button>`;
      }).join('')}</div>
    </div>
    <div class="card">
      <h2>Daten</h2>
      <p class="hint">Alles wird nur lokal in deinem Browser gespeichert.</p>
      <button class="btn btn-sm" id="resetStats">Fortschritt zurücksetzen</button>
    </div>`;
}
$('#screen-stats').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.goal) { state.stats.goal = +b.dataset.goal; save(); renderStats(); }
  else if (b.dataset.outfit) {
    const o = OUTFITS.find(x => x.id === b.dataset.outfit), of = state.settings.outfit || (state.settings.outfit = {});
    of[o.slot] = of[o.slot] === o.id ? null : o.id;
    state.settings.outfit = { ...of }; save();
    $('#brandOwl').innerHTML = owlSVG('happy');
    const y = window.scrollY; renderStats(); window.scrollTo(0, y);
  }
  else if (b.id === 'weakGo') { const items = weakItems(); if (items.length) { setupMode = 'type'; startSession(items, 'type'); } }
  else if (b.id === 'favHard') {
    state.favs = [...new Set([...state.favs, ...hardList])]; save();
    toast('Gemerkt! Wähle beim Einrichten „★ Nur Lieblingsverben“, um sie zu üben.');
  }
  else if (b.id === 'resetStats') {
    confirmBox('Fortschritt zurücksetzen?', 'XP, Serie und Statistiken werden gelöscht. Deine eigenen Verben bleiben erhalten.', 'Zurücksetzen', () => {
      state.stats = { ...JSON.parse(JSON.stringify(DEFAULTS.stats)), goal: state.stats.goal };
      save(); go('stats'); toast('Fortschritt zurückgesetzt');
    });
  }
});

/* =========================================================
   Start
   ========================================================= */
/* Eule anklicken → kleiner Hüpfer */
document.addEventListener('click', e => {
  const owl = e.target.closest('.owl'); if (!owl) return;
  owl.classList.remove('poke'); void owl.getBoundingClientRect(); owl.classList.add('poke');
  setTimeout(() => owl.classList.remove('poke'), 700);
});

/* ---------- Dark Mode Umschalter ---------- */
const darkMQ = window.matchMedia('(prefers-color-scheme: dark)');
function isDark() { const t = document.documentElement.dataset.theme; return t ? t === 'dark' : darkMQ.matches; }
function syncThemeBtn() { const d = isDark(); $('#themeBtn').textContent = d ? '☀️' : '🌙'; $('#themeBtn').title = d ? 'Heller Modus' : 'Dunkler Modus'; }
$('#themeBtn').onclick = () => {
  const t = isDark() ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('hibou-theme', t); } catch (e) {}
  syncThemeBtn();
};
darkMQ.addEventListener?.('change', syncThemeBtn);
syncThemeBtn();

$('#brandOwl').innerHTML = owlSVG('happy');
$('#favicon').href = 'data:image/svg+xml,' + encodeURIComponent(owlSVG('happy', { plain: true }).replace(/class="[^"]*"/, ''));
$$('.tab').forEach(t => t.addEventListener('click', () => go(t.dataset.tab)));
$('.brand').addEventListener('click', () => go('home'));
go('home');
})();
