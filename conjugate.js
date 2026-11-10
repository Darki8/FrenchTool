/* =========================================================
   Konjugations-Engine
   Jede Form ist ein String. Mehrere richtige Antworten werden mit "/"
   getrennt (z.B. "paie/paye"), optionale Teile stehen in Klammern
   (z.B. "suis allé(e)").
   ========================================================= */

const VOWEL_RE = /^[aeiouyhâàäéèêëîïôöûùüœæ]/i;
const CONS = '[^aeiouyéèêëîïôûâàù]';
const ELER_ETER_GRAVE = ['acheter', 'racheter', 'geler', 'congeler', 'dégeler', 'surgeler',
  'peler', 'modeler', 'harceler', 'haleter', 'crocheter', 'ciseler', 'marteler', 'démanteler'];

const AUX = {
  avoir: { present: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
           imparfait: ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'],
           futur: ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'],
           conditionnel: ['aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient'] },
  être:  { present: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
           imparfait: ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'],
           futur: ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'],
           conditionnel: ['serais', 'serais', 'serait', 'serions', 'seriez', 'seraient'] },
};
const ALLER = ['vais', 'vas', 'va', 'allons', 'allez', 'vont'];
const REFL = ['me', 'te', 'se', 'nous', 'vous', 'se'];
const IMP_END = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const FUT_END = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];

function splitAlt(f) { return String(f || '').split('/').map(s => s.trim()).filter(Boolean); }
function uniqJoin(arr) { return [...new Set(arr)].join('/'); }

function verbGroup(v) {
  if (v.irr) return 'irr';
  if (v.inf.endsWith('er')) return 'er';
  if (v.inf.endsWith('ir')) return 'ir';
  if (v.inf.endsWith('re')) return 're';
  return 'other';
}

/* Stämme der -er-Verben inkl. Rechtschreib-Besonderheiten */
function erStems(inf) {
  const stem = inf.slice(0, -2);
  let strong = [stem], fut = [inf];
  if (/[ou]yer$/.test(inf)) {                       // employer → emploie
    const s = stem.slice(0, -1) + 'i'; strong = [s]; fut = [s + 'er'];
  } else if (/ayer$/.test(inf)) {                    // payer → paie / paye
    const s = stem.slice(0, -1) + 'i'; strong = [s, stem]; fut = [s + 'er', inf];
  } else if (new RegExp('é(' + CONS + '+)$').test(stem)) {   // préférer → préfère
    strong = [stem.replace(new RegExp('é(' + CONS + '+)$'), 'è$1')];
  } else if (new RegExp('[^aeiouyéèêë]e' + CONS + '$').test(stem)) {
    let s;
    if (/e[lt]er$/.test(inf) && !ELER_ETER_GRAVE.includes(inf)) s = stem + stem.slice(-1); // appeler → appelle
    else s = stem.replace(new RegExp('e(' + CONS + ')$'), 'è$1');                          // acheter → achète
    strong = [s]; fut = [s + 'er'];
  }
  let nous = stem;
  if (stem.endsWith('c')) nous = stem.slice(0, -1) + 'ç';  // commençons
  else if (stem.endsWith('g')) nous = stem + 'e';           // mangeons
  return { stem, strong, fut, nous };
}

/* Stamm + Endung, mit ç/ge-Korrektur vor "i" */
function joinEnd(stem, end) {
  if (end[0] === 'i' || end[0] === 'e') {
    if (stem.endsWith('ç')) stem = stem.slice(0, -1) + 'c';
    else if (stem.endsWith('ge')) stem = stem.slice(0, -1);
  }
  return stem + end;
}

function computePresent(v) {
  if (v.present) return v.present;
  const inf = v.inf;
  if (inf.endsWith('er')) {
    const { stem, strong, nous } = erStems(inf);
    const sf = e => uniqJoin(strong.map(s => s + e));
    return [sf('e'), sf('es'), sf('e'), nous + 'ons', stem + 'ez', sf('ent')];
  }
  const s = inf.slice(0, -2);
  if (inf.endsWith('ir')) return [s + 'is', s + 'is', s + 'it', s + 'issons', s + 'issez', s + 'issent'];
  if (inf.endsWith('re')) return [s + 's', s + 's', s, s + 'ons', s + 'ez', s + 'ent'];
  return [s + 's', s + 's', s + 't', s + 'ons', s + 'ez', s + 'ent'];
}

function computeImparfait(v) {
  const nous = splitAlt(computePresent(v)[3])[0] || '';
  const stem = v.imp || nous.replace(/ons$/, '');
  return IMP_END.map(e => joinEnd(stem, e));
}

function futStems(v) {
  if (v.fut) return [v.fut];
  const inf = v.inf;
  if (inf.endsWith('er')) return erStems(inf).fut;
  if (inf.endsWith('re')) return [inf.slice(0, -1)];
  if (inf.endsWith('oir')) return [inf.slice(0, -3) + 'r'];
  return [inf];
}

function computeSubj(v) {
  if (v.subj) return v.subj;
  const p = computePresent(v);
  const ils = splitAlt(p[5]).map(f => f.replace(/ent$/, ''));
  const imp = computeImparfait(v);
  const f = e => uniqJoin(ils.map(s => s + e));
  return [f('e'), f('es'), f('e'), imp[3], imp[4], f('ent')];
}

function getPP(v) {
  if (v.pp) return v.pp;
  const inf = v.inf, s = inf.slice(0, -2);
  if (inf.endsWith('er')) return s + 'é';
  if (inf.endsWith('ir')) return s + 'i';
  return s + 'u';
}

function compound(v, auxForms) {
  const pp = getPP(v);
  const etre = v.aux === 'être';
  return auxForms.map((a, i) => uniqJoin(splitAlt(pp).map(p =>
    `${a} ${etre ? p + (i < 3 ? '(e)' : '(e)s') : p}`)));
}

/* Reflexivpronomen vor eine Form setzen (me/m', te/t', se/s') */
function withRefl(i, form) {
  const p = REFL[i];
  return uniqJoin(splitAlt(form).map(f => (p.length === 2 && VOWEL_RE.test(f)) ? p[0] + "'" + f : p + ' ' + f));
}
const baseInf = inf => inf.replace(/^(se |s')/, '');

/* Gibt alle Zeitformen als Arrays mit 6 Formen zurück */
function conjugate(v) {
  if (v.refl) return conjugateRefl(v);
  const F = v.forms || {};
  const aux = AUX[v.aux === 'être' ? 'être' : 'avoir'];
  const present = F.present || computePresent(v);
  const vv = F.present ? { ...v, present } : v;
  const stems = futStems(vv);
  const out = {
    present,
    passe: compound(vv, aux.present),
    imparfait: F.imparfait || computeImparfait(vv),
    futur: F.futur || FUT_END.map(e => uniqJoin(stems.map(s => s + e))),
    conditionnel: F.conditionnel || IMP_END.map(e => uniqJoin(stems.map(s => s + e))),
    subjonctif: F.subjonctif || computeSubj(vv),
    pqp: compound(vv, aux.imparfait),
    futproche: ALLER.map(a => a + ' ' + v.inf),
    futant: compound(vv, aux.futur),
    condpasse: compound(vv, aux.conditionnel),
  };
  // unpersönliche Verben (il faut, il pleut): nur die 3. Person Singular
  if (v.impers) for (const k in out) out[k] = out[k].map((f, i) => i === 2 ? f : '');
  return out;
}

/* Reflexive Verben: Grundverb konjugieren, dann Pronomen davor (immer mit être) */
function conjugateRefl(v) {
  const base = baseInf(v.inf);
  const r = conjugate({ ...v, inf: base, refl: false, forms: null, aux: 'être' });
  const out = {};
  for (const k in r) out[k] = r[k].map((f, i) => f ? withRefl(i, f) : '');
  out.futproche = ALLER.map((a, i) => a + ' ' + withRefl(i, base));
  const F = v.forms || {};
  for (const k in F) if (Array.isArray(F[k]) && F[k].length === 6) out[k] = F[k];
  return out;
}
