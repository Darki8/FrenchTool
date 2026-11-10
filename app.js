(function () {
'use strict';

/* =========================================================
   Konstanten
   ========================================================= */
const TENSES = [
  { id: 'present', fr: 'le présent', de: 'Präsens' },
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
function owlSVG(mood = 'happy') {
  const body = '#1E88E5', dark = '#1565C0', ring = '#64B5F6', belly = '#BBDEFB', ink = '#1D2B3A', beak = '#FF9600';
  let eyes;
  // zufällige Verzögerung, damit nicht alle Eulen gleichzeitig blinzeln
  const delay = `style="animation-delay:-${(Math.random() * 4).toFixed(2)}s"`;
  if (mood === 'cheer') {
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
  return `<svg xmlns="http://www.w3.org/2000/svg" class="owl owl-${mood}" viewBox="0 0 120 124" aria-hidden="true">
    <ellipse cx="60" cy="119" rx="30" ry="4" fill="rgba(0,0,0,.08)"/>
    <g stroke="${beak}" stroke-width="4.5" stroke-linecap="round"><path d="M45 108 l-5 8 M45 108 v9 M45 108 l5 8"/><path d="M75 108 l-5 8 M75 108 v9 M75 108 l5 8"/></g>
    ${mood === 'cheer' ? wings : ''}
    <path d="M22 52 C22 31 29 17 35 9 L46 24 C55 20 65 20 74 24 L85 9 C91 17 98 31 98 52 L98 86 C98 104 82 112 60 112 C38 112 22 104 22 86 Z" fill="${body}"/>
    <ellipse cx="60" cy="86" rx="25" ry="21" fill="${belly}"/>
    <g stroke="${ring}" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M50 82 q4 4 8 0"/><path d="M62 82 q4 4 8 0"/><path d="M56 92 q4 4 8 0"/></g>
    ${mood === 'cheer' ? '' : wings}
    <circle cx="44" cy="52" r="18.5" fill="${ring}"/><circle cx="76" cy="52" r="18.5" fill="${ring}"/>
    ${eyes}${blush}
    <path d="M53 63 Q60 59 67 63 Q63 73 60 76 Q57 73 53 63Z" fill="${beak}"/>
  </svg>`;
}

/* =========================================================
   Speicher
   ========================================================= */
const KEY = 'hibou-verbes-v2';
const DEFAULTS = {
  settings: { set: 'stem', perSet: {}, ignoreAccents: false, sound: true, speak: true },
  custom: [],
  favs: [],
  stats: { xp: 0, streak: 0, lastDay: null, day: null, dayXP: 0, goal: 50, answered: 0, correct: 0, perVerb: {}, sessions: 0 },
};
let state = load();
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s) return {
      settings: { ...DEFAULTS.settings, ...s.settings, perSet: (s.settings && s.settings.perSet) || {} },
      custom: s.custom || [], favs: s.favs || [], stats: { ...DEFAULTS.stats, ...s.stats },
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
function promptSubject(q) { const s = subjectOf(q); return q.tense === 'subjonctif' ? QUE(s) : s; }
function phrase(q, forSpeech) {
  const alts = splitAlt(q.form);
  const first = (alts[0] || '').replace(/\([^)]*\)/g, '');
  const formTxt = forSpeech ? first : alts.join(' / ');
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
  const a = cleanAns(input, q), vs = expand(q.form);
  if (vs.includes(a)) return { ok: true };
  const sa = stripAcc(a);
  if (vs.some(v => stripAcc(v) === sa)) {
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
  updateHud();
  showScreen(tab);
}

/* =========================================================
   HOME – Set-Übersicht mit Lernmodi
   ========================================================= */
function renderHome() {
  const set = curSet(), goal = state.stats.goal, dx = dayXP(), n = setVerbs(set).length;
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
    </div>`;
}
$('#screen-home').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
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
  const modeName = setupMode === 'mc' ? 'Multiple Choice' : 'Bewertete Übung';
  if (setupStep === 2) {
    $('#screen-setup').innerHTML = `
      <p class="crumb">${esc(set.title)} · ${modeName}</p>
      <div class="card hero">
        <div class="hero-owl">${owlSVG('cheer')}</div>
        <div class="hero-text"><h2 style="margin:0 0 6px">Fast fertig!</h2><div class="bubble">Stell einen Timer ein – oder lass das Feld leer, um ohne Zeitlimit zu üben.</div></div>
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

function startSession(reviewItems) {
  const set = curSet(), c = cfg(set);
  const verbs = reviewItems ? [...new Map(reviewItems.map(q => [q.inf, q.v])).values()] : selectedPoolVerbs();
  if (!verbs.length) return toast('Wähle mindestens ein Verb aus.');
  const mins = reviewItems ? 0 : parseInt(c.timer, 10) || 0;
  S = {
    verbs, tenses: c.tenses.slice(), prons: c.pronouns.slice(), mode: setupMode,
    english: c.english, replace: c.replace,
    timed: mins > 0, timeTotal: mins * 60000,
    review: reviewItems ? shuffle(reviewItems) : null, reviewTotal: reviewItems ? reviewItems.length : 0,
    correct: 0, wrong: 0, answered: 0, combo: 0, best: 0, xp: 0,
    mistakes: [], retry: [], start: Date.now(), q: null, checked: false, lastKey: '', timer: null, done: false,
  };
  $('#screen-play').innerHTML = `
    <div class="play-top">
      <button class="icon-btn" id="quitBtn" title="Schließen">✕</button>
      <div class="bar big ${S.timed || S.review ? '' : 'hidden'}"><div class="bar-fill" id="progFill" style="width:${S.timed ? 100 : 0}%"></div></div>
      <div class="score-box"><span class="score-lbl">Punkte</span><b id="scoreTxt">0/0</b><span id="pctTxt">0%</span></div>
      <div class="play-meta" id="playMeta"></div>
    </div>
    <div class="play-tools">
      <button class="mini-btn" id="replayBtn">↻ Neu starten</button>
      <button class="mini-btn" id="endBtn">🏁 Beenden &amp; Ergebnis</button>
    </div>
    <div class="play-body" id="playBody"></div>
    <div class="play-foot" id="playFoot"></div>`;
  showScreen('play');
  S.timer = setInterval(tick, 250); tick();
  next();
}

function buildQ(v, tense, pron) {
  const pi = PRON_INDEX[pron];
  const subj = S.replace && REPLACE[pron] ? pick(REPLACE[pron]) : null;
  return { v, inf: v.inf, tense, pi, pron, subj, form: conjugate(v)[tense][pi] };
}
function randomQuestion() {
  let q = null;
  for (let k = 0; k < 30; k++) {
    q = buildQ(pick(S.verbs), pick(S.tenses), pick(S.prons));
    if (!q.form) continue;
    if (q.inf + q.tense + q.pi === S.lastKey && k < 29) continue;
    break;
  }
  return q;
}
function next() {
  if (!S || S.done) return;
  if (S.timed && Date.now() >= S.endAt) return finish();
  let q;
  const due = S.retry.findIndex(r => r.due <= S.answered);
  if (due >= 0) q = S.retry.splice(due, 1)[0];
  else if (S.review) { q = S.review.shift() || S.retry.shift(); if (!q) return finish(); }
  else q = randomQuestion();
  if (!q || !q.form) return finish();
  S.q = q; S.checked = false; S.lastKey = q.inf + q.tense + q.pi;
  renderQ();
}

function renderQ() {
  const q = S.q;
  let input;
  if (S.mode === 'mc') {
    S.choices = buildChoices(q);
    input = `<div class="choices">${S.choices.map((c, i) => `<button class="choice" data-choice="${i}"><span class="num">${i + 1}</span>${esc(displayForm(c))}</button>`).join('')}</div>`;
  } else {
    input = `<input class="answer" id="answer" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Konjugation eintippen…">
      <div class="accents">${ACCENTS.map(a => `<button data-acc="${a}" tabindex="-1">${a}</button>`).join('')}</div>`;
  }
  const verbTxt = S.english && q.v.de ? `${esc(q.v.de)}` : `${esc(q.inf)}`;
  $('#playBody').innerHTML = `
    <div class="prompt">
      <div class="prompt-owl" id="promptOwl">${owlSVG('think')}</div>
      <div class="bubble big">
        <div class="tense-badge">${tenseName(q.tense)}</div>
        <div class="prompt-line"><span class="pron">${esc(promptSubject(q))}</span> <span class="pverb">(${verbTxt})</span></div>
        ${S.english ? '' : `<div class="prompt-de">${esc(q.v.de || '')}</div>`}
      </div>
    </div>
    ${input}`;
  const foot = $('#playFoot');
  foot.className = 'play-foot';
  foot.innerHTML = `<button class="btn" id="skipBtn">Überspringen</button><button class="btn btn-primary" id="checkBtn" disabled>Prüfen</button>`;
  updateScore();
  const inp = $('#answer');
  if (inp) { inp.addEventListener('input', () => { $('#checkBtn').disabled = !inp.value.trim(); }); setTimeout(() => inp.focus(), 30); }
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
}

function check(skip) {
  if (!S || S.checked || S.done) return;
  const q = S.q;
  let ok = false, note = '', given = '';
  if (skip) given = '—';
  else if (S.mode === 'mc') {
    const sel = $('.choice.sel'); if (!sel) return;
    const i = +sel.dataset.choice; given = displayForm(S.choices[i]); ok = S.choices[i] === q.form;
  } else {
    given = $('#answer').value; if (!given.trim()) return;
    const r = evaluate(given, q); ok = r.ok; note = r.note || '';
  }
  S.checked = true; S.answered++;
  const pv = state.stats.perVerb[q.inf] || (state.stats.perVerb[q.inf] = { r: 0, w: 0 });
  state.stats.answered++;
  if (ok) {
    S.correct++; S.combo++; S.best = Math.max(S.best, S.combo); S.xp += XP_PER;
    pv.r++; state.stats.correct++; sound('ok');
    if (S.combo % 5 === 0) toast(`🔥 ${S.combo} richtige in Folge!`);
  } else {
    S.wrong++; S.combo = 0; pv.w++; sound('bad');
    if (!S.mistakes.some(m => m.inf === q.inf && m.tense === q.tense && m.pi === q.pi)) S.mistakes.push({ ...q, given });
    S.retry.push({ ...q, due: S.answered + 3 });
  }
  save();

  const inp = $('#answer');
  if (inp) { inp.disabled = true; inp.classList.add(ok ? 'ok' : 'bad'); }
  $$('.accents button').forEach(b => { b.disabled = true; });
  $$('.choice').forEach((b, i) => {
    b.disabled = true;
    if (S.choices[i] === q.form) b.classList.add('right');
    else if (b.classList.contains('sel')) b.classList.add('wrong');
    b.classList.remove('sel');
  });
  const po = $('#promptOwl');
  po.innerHTML = owlSVG(ok ? 'cheer' : 'sad');
  po.classList.remove('pop'); void po.offsetWidth; po.classList.add('pop');

  const foot = $('#playFoot');
  foot.className = 'play-foot ' + (ok ? 'ok' : 'bad');
  foot.innerHTML = `
    <div class="fb">
      <div class="fb-icon">${ok ? '✓' : '✕'}</div>
      <div>
        <div class="fb-title">${ok ? pick(PRAISE) : 'Sollte sein:'}</div>
        <div class="fb-answer">${esc(phrase(q))} <button class="speak" data-say="${esc(phrase(q, true))}" title="Anhören">🔊</button></div>
        ${note ? `<div class="fb-note">${esc(note)}</div>` : ''}
      </div>
    </div>
    <button class="btn ${ok ? 'btn-primary' : 'btn-danger'}" id="nextBtn">Weiter</button>`;
  if (state.settings.speak) speak(phrase(q, true));
  updateScore();
  setTimeout(() => { const n = $('#nextBtn'); if (n) n.focus(); }, 30);
}

function updateScore() {
  if (!S) return;
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
  const inp = $('#answer'); if (!inp || inp.disabled) return;
  const s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? inp.value.length;
  inp.value = inp.value.slice(0, s) + ch + inp.value.slice(e);
  inp.setSelectionRange(s + ch.length, s + ch.length);
  inp.focus(); inp.dispatchEvent(new Event('input'));
}

$('#screen-play').addEventListener('mousedown', e => { if (e.target.closest('[data-acc]')) e.preventDefault(); });
$('#screen-play').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || !S) return;
  if (b.dataset.acc) insertAtCursor(b.dataset.acc);
  else if (b.dataset.choice !== undefined) selectChoice(+b.dataset.choice);
  else if (b.dataset.say) speak(b.dataset.say);
  else if (b.id === 'checkBtn') check(false);
  else if (b.id === 'skipBtn') check(true);
  else if (b.id === 'nextBtn') next();
  else if (b.id === 'endBtn') finish();
  else if (b.id === 'replayBtn') { clearInterval(S.timer); S.done = true; startSession(); }
  else if (b.id === 'quitBtn') {
    confirmBox('Willst du wirklich gehen?', 'Dein Fortschritt in dieser Übung geht verloren.', 'Verlassen', () => {
      clearInterval(S.timer); S.done = true; S = null; go('home');
    }, 'Bleiben');
  }
});

document.addEventListener('keydown', e => {
  if (!$('#modal').classList.contains('hidden')) { if (e.key === 'Escape') closeModal(); return; }
  if (!S || S.done || !$('#screen-play').classList.contains('active') || e.repeat) return;
  if (e.key === 'Enter') { e.preventDefault(); S.checked ? next() : check(false); }
  else if (S.mode === 'mc' && !S.checked && /^[1-4]$/.test(e.key)) selectChoice(+e.key - 1);
});

function finish() {
  if (!S || S.done) return;
  S.done = true; clearInterval(S.timer);
  const acc = S.answered ? Math.round(S.correct / S.answered * 100) : 0;
  if (S.correct > 0) { addXP(S.xp); bumpStreak(); }
  state.stats.sessions++; save(); updateHud();
  const secs = S.timed ? Math.min(S.timeTotal, Date.now() - S.start) : Date.now() - S.start;
  const title = S.answered === 0 ? 'Keine Antworten' : acc === 100 ? 'Perfekt!' : acc >= 80 ? 'Super gemacht!' : acc >= 50 ? 'Gut gemacht!' : 'Nicht aufgeben!';
  const mistakes = S.mistakes;
  $('#screen-result').innerHTML = `
    <div class="result">
      ${owlSVG(acc >= 50 ? 'cheer' : 'happy')}
      <h1>${title}</h1>
      <p class="sub">Deine Ergebnisse · ${esc(curSet().title)}</p>
      <div class="tiles">
        <div class="tile"><div class="tile-h">Punkte</div><div class="tile-v">${S.correct}/${S.answered}</div></div>
        <div class="tile purple"><div class="tile-h">Genauigkeit</div><div class="tile-v">🎯 ${acc}%</div></div>
        <div class="tile gold"><div class="tile-h">XP</div><div class="tile-v">⚡ ${S.correct > 0 ? S.xp : 0}</div></div>
        <div class="tile orange"><div class="tile-h">Zeit</div><div class="tile-v">⏱ ${fmtTime(secs)}</div></div>
      </div>
      ${mistakes.length ? `<h3>Fehler</h3><div class="mistakes">${mistakes.map(m => `
        <div class="mistake">
          <div class="m-q"><small>${tenseName(m.tense)} · ${esc(m.inf)}</small>${esc(promptSubject(m))} …</div>
          <div class="m-a">${m.given && m.given !== '—' ? `<s>${esc(m.given)}</s>` : ''}${esc(phrase(m))}</div>
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
  if (acc >= 80 && S.answered >= 5) confetti();
}
$('#screen-result').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.id === 'rReview' && S) startSession(S.lastMistakes.map(({ given, due, ...q }) => q));
  else if (b.id === 'rAgain') startSession();
  else if (b.id === 'rHome') { S = null; go('home'); }
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
      <div class="chips small">${[...VERB_SETS.filter(s => s.verbs).map(s => [s.id, `${s.de} (${setVerbs(s).length})`]), ['all', 'Alle Verben'], ['mine', 'Meine']].map(([k, l]) => `<button class="chip ${vSetFilter === k ? 'on' : ''}" data-vf="${k}">${esc(l)}</button>`).join('')}</div>
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
    setTimeout(() => $('#bulkText', c).focus(), 30);
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
$('#favicon').href = 'data:image/svg+xml,' + encodeURIComponent(owlSVG('happy').replace(/class="[^"]*"/, ''));
$$('.tab').forEach(t => t.addEventListener('click', () => go(t.dataset.tab)));
$('.brand').addEventListener('click', () => go('home'));
go('home');
})();
