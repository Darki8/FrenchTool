/* =========================================================
   Regel-Tipps (nach den Blättern im Heft), Si-Sätze und
   „avoir oder être?“-Aufgaben
   ========================================================= */

const MIR_TIR_VIR = ['dormir', 'endormir', 'mentir', 'partir', 'sentir', 'sortir', 'servir'];
const COCOS = ['ouvrir', 'couvrir', 'offrir', 'souffrir', 'cueillir'];
const TRANSITIVE_ETRE = ['monter', 'descendre', 'sortir', 'rentrer', 'retourner'];

function regularPP(inf) {
  if (inf.endsWith('er')) return inf.slice(0, -2) + 'é';
  if (inf.endsWith('ir')) return inf.slice(0, -2) + 'i';
  return inf.slice(0, -2) + 'u';
}
const REFL_TIP = "Reflexiv: me, te, se, nous, vous, se steht vor dem Verb – vor Vokal m', t', s' (je m'endors).";

function presentTips(v, pi) {
  const inf = baseInf(v.inf), tips = [];
  if (v.impers) return ['Unpersönliches Verb: gibt es nur mit « il » (il faut, il pleut).'];
  if (v.refl) tips.push(REFL_TIP);
  const silent = pi !== 3 && pi !== 4;
  if (!v.irr && inf.endsWith('er')) {
    const st = erStems(inf);
    if (/ger$/.test(inf)) tips.push('Verben auf -ger: bei « nous » bleibt das e vor -ons → nous mangeons (g + e → [sch]).');
    else if (/cer$/.test(inf)) tips.push('Verben auf -cer: bei « nous » wird c zu ç → nous lançons (Cédille vor a, o, u – nie vor e und i).');
    else if (/ayer$/.test(inf)) tips.push('Verben auf -ayer (payer, essayer): vor stummer Endung darfst du wählen – je paie oder je paye.');
    else if (/[ou]yer$/.test(inf)) tips.push(silent
      ? 'nettoyer → y/i: vor stummer Endung (-e, -es, -ent) wird y zu i → je nettoie, ils nettoient.'
      : 'nettoyer → y/i: nur vor stummer Endung wird y zu i. nous/vous behalten das y (nous nettoyons).');
    else if (st.strong[0] !== st.stem) {
      const nv = silent ? '' : ' Bei nous/vous ist der Stamm gleich wie im Infinitiv!';
      if (st.strong[0].length > st.stem.length) tips.push(`(s')appeler → l/ll, jeter → t/tt: vor stummer Endung wird der Konsonant verdoppelt (j'appelle, je jette).${nv}`);
      else if (/é[^é]*$/.test(st.stem)) tips.push(`espérer → é/è: vor stummer Endung wird é zu è (j'espère, ils espèrent).${nv}`);
      else tips.push(`mener → e/è: vor stummer Endung wird e zu è (je mène, ils mènent).${nv}`);
    } else tips.push('Hauptgruppe -er: Endungen -e, -es, -e, -ons, -ez, -ent (stumm, stumm, stumm, hörbar, hörbar, stumm).');
    return tips;
  }
  if (!v.irr && inf.endsWith('ir')) { tips.push('Hauptgruppe -ir: Singular -is, -is, -it; im Plural kommt -iss- dazu (nous finissons, ils finissent).'); return tips; }
  if (!v.irr && inf.endsWith('re')) { tips.push('Hauptgruppe -re: -s, -s, keine Endung, -ons, -ez, -ent → il attend, il perd.'); return tips; }
  if (MIR_TIR_VIR.includes(inf)) tips.push('Gruppe -mir/-tir/-vir: im Singular fällt -m-/-t-/-v- weg (je dors, il part, je sers); im Plural ist er wieder da (nous dormons).');
  else if (COCOS.includes(inf)) tips.push("cocos-Verb: Infinitiv auf -ir, aber Endungen wie bei -er-Verben → j'ouvre, tu ouvres, il ouvre.");
  else if (/uire$/.test(inf)) tips.push('Gruppe -uire: Singular -is, -is, -it; im Plural kommt ein -s- dazu (nous conduisons).');
  else if (/indre$/.test(inf)) tips.push('Gruppe -indre: Singular -ns, -ns, -nt; im Plural wird daraus -gn- (nous craignons, ils peignent).');
  else if (/aître$/.test(inf)) tips.push('Gruppe -aître: î nur vor t (il connaît); im Plural -ss- (nous connaissons).');
  else if (/mettre$/.test(inf)) tips.push('Wie mettre: je mets, il met (ein t), nous mettons (zwei t).');
  else if (/prendre$/.test(inf)) tips.push('Wie prendre: il prend, nous prenons, aber ils prennent (nn!).');
  else if (/cevoir$/.test(inf)) tips.push('Wie recevoir: je reçois, nous recevons, ils reçoivent – ç vor o.');
  const all = conjugate({ ...v, refl: false, inf }).present.map(f => splitAlt(f)[0]).join(', ');
  tips.push(tips.length && !(v.refl && tips.length === 1) ? `Alle Formen: ${all}.` : `Einzelverb – auswendig lernen: ${all}.`);
  return tips;
}

function imparfaitTips(v) {
  const inf = baseInf(v.inf), tips = [];
  if (inf === 'être') return ["être ist die einzige unregelmässige Form: j'étais, tu étais, il était, nous étions …"];
  const plain = conjugate({ ...v, refl: false, inf });
  const nous = splitAlt(plain.present[3])[0];
  tips.push(nous
    ? `Imparfait = Stamm von « nous » im Präsens + -ais, -ais, -ait, -ions, -iez, -aient → nous ${nous} → je ${splitAlt(plain.imparfait[0])[0]}.`
    : `Imparfait: Stamm ${v.imp}- + -ait → il ${plain.imparfait[2]}.`);
  if (/ger$/.test(inf)) tips.push('Bei -ger: ge + a, aber g + i → je mangeais, nous mangions.');
  else if (/cer$/.test(inf)) tips.push('Bei -cer: ç + a, aber c + i → il commençait, vous commenciez.');
  if (v.refl) tips.push(REFL_TIP);
  return tips;
}

const COMPOUND_AUX = {
  passe: 'Passé composé = Hilfsverb im présent + participe passé.',
  pqp: 'Plus-que-parfait = avoir/être im imparfait (avais / étais) + participe passé.',
  futant: 'Futur antérieur = avoir/être im futur simple (aurai / serai) + participe passé.',
  condpasse: 'Conditionnel passé = avoir/être im conditionnel présent (aurais / serais) + participe passé.',
};
function auxTip(v, ctxAvoir) {
  const inf = baseInf(v.inf);
  if (ctxAvoir) return `Mit Objekt (transitiv) → avoir: elle a ${getPP({ ...v, inf })} les caisses. Ohne Objekt → être.`;
  if (v.refl) return "Reflexive Verben immer mit être – das Partizip passt sich an (elle s'est préparée, ils se sont levés).";
  if (v.aux === 'être') return "Verbe de l'hôpital → être! Das Partizip passt sich dem Subjekt an (elle est venue, ils sont arrivés)."
    + (TRANSITIVE_ETRE.includes(inf) ? ' Mit Objekt aber avoir (elle a descendu les caisses).' : '');
  return 'Mit avoir: das Partizip bleibt unverändert (nous avons parlé, elle a pris).';
}
function compoundTips(v, tense) {
  const inf = baseInf(v.inf), pp = getPP({ ...v, inf });
  const ppTip = pp !== regularPP(inf)
    ? `Unregelmässiges Partizip: ${inf} → ${pp}.`
    : `Regelmässiges Partizip: -er → -é, -ir → -i, -re → -u (${inf} → ${pp}).`;
  return [COMPOUND_AUX[tense], auxTip(v), ppTip];
}

function futurTips(v, tense) {
  const inf = baseInf(v.inf), tips = [];
  const end = tense === 'futur' ? 'Endungen -ai, -as, -a, -ons, -ez, -ont' : 'Endungen des imparfait: -ais, -ais, -ait, -ions, -iez, -aient';
  if (inf === 'envoyer' || inf === 'renvoyer') tips.push("Ausnahme: envoyer → j'enverrai / j'enverrais.");
  else if (v.fut) tips.push(`Unregelmässiger Stamm: ${inf} → ${v.fut}- (${end}).`);
  else if (inf.endsWith('er') && !/ayer$/.test(inf) && erStems(inf).strong[0] !== erStems(inf).stem)
    tips.push(`doubl-acc-i: je-Form im Präsens + r + Endung → j'achète → j'achèterai, je jette → je jetterai (${end}).`);
  else if (inf.endsWith('re')) tips.push(`Verben auf -re: das e fällt weg → attendre → j'attendr- + ${end}.`);
  else tips.push(`Infinitiv + ${end} → je parler${tense === 'futur' ? 'ai' : 'ais'}, je finir${tense === 'futur' ? 'ai' : 'ais'}.`);
  if (v.refl) tips.push(REFL_TIP);
  return tips;
}

/* Hauptfunktion: Tipps für eine falsch beantwortete Frage */
function ruleTips(v, tense, pi) {
  try {
    if (tense === 'present') return presentTips(v, pi);
    if (tense === 'imparfait') return imparfaitTips(v);
    if (COMPOUND_AUX[tense]) return compoundTips(v, tense);
    if (tense === 'futur' || tense === 'conditionnel') return futurTips(v, tense);
    if (tense === 'futproche') return ['Futur proche = aller im présent (vais, vas, va, allons, allez, vont) + Infinitiv.']
      .concat(v.refl ? ['Das Reflexivpronomen steht vor dem Infinitiv: je vais me préparer.'] : []);
    if (tense === 'subjonctif') return [v.subj ? 'Unregelmässiger Subjonctif – auswendig lernen!'
      : 'Subjonctif: Stamm von « ils » im Präsens + -e, -es, -e, -ions, -iez, -ent (ils parlent → que je parle).'];
  } catch (e) { /* kein Tipp */ }
  return [];
}

/* ---------- Phrase hypothétique (Heft 2.7) ---------- */
const SI_TYPES = {
  1: { si: 'present', main: 'futur', name: 'Typ 1 · real (möglich)', rule: 'Si + présent ➜ futur simple' },
  2: { si: 'imparfait', main: 'conditionnel', name: 'Typ 2 · irreal (Gegenwart/Zukunft)', rule: 'Si + imparfait ➜ conditionnel présent' },
  3: { si: 'pqp', main: 'condpasse', name: 'Typ 3 · irreal (Vergangenheit)', rule: 'Si + plus-que-parfait ➜ conditionnel passé' },
};
// [Subjekt Si-Satz, Verb, Mitte, Subjekt Hauptsatz, Verb, Ende]
const SI_TEMPLATES = [
  ['il', 'faire', 'beau temps,', 'nous', 'faire', 'une excursion.'],
  ['tu', 'préparer', 'bien ce test,', 'tu', 'faire', 'une bonne note.'],
  ['je', 'avoir', 'le temps,', 'je', 'venir', 'à ta fête.'],
  ['nous', 'partir', 'tôt,', 'nous', 'arriver', "à l'heure."],
  ['vous', 'prendre', 'le train,', 'vous', 'voir', 'la mer.'],
  ['elle', 'pouvoir', ',', 'elle', 'venir', 'avec nous.'],
  ['ils', 'finir', 'leurs devoirs,', 'ils', 'pouvoir', 'sortir.'],
  ['il', 'pleuvoir', ',', 'nous', 'rester', 'à la maison.'],
  ['tu', 'mettre', 'ton manteau,', 'tu', 'avoir', 'moins froid.'],
  ['je', 'savoir', 'la réponse,', 'je', 'répondre', 'au professeur.'],
  ['vous', 'lire', 'ce livre,', 'vous', 'comprendre', "l'histoire."],
  ['on', 'aller', 'à Paris,', 'on', 'voir', 'la tour Eiffel.'],
  ['elles', 'courir', 'plus vite,', 'elles', 'recevoir', 'une médaille.'],
  ['tu', 'boire', 'moins de café,', 'tu', 'dormir', 'mieux.'],
  ['nous', 'acheter', 'une voiture,', 'nous', 'voyager', 'en France.'],
  ['il', 'ouvrir', 'la fenêtre,', 'il', 'avoir', 'froid.'],
  ['je', 'se lever', 'tôt,', 'je', 'prendre', 'le petit-déjeuner.'],
  ['vous', 'vouloir', ',', 'vous', 'pouvoir', 'venir avec nous.'],
  ['tu', 'écrire', 'à Marie,', 'elle', 'être', 'contente.'],
  ['ils', 'descendre', 'en ville,', 'ils', 'acheter', 'des croissants.'],
  ['on', 'sortir', 'ce soir,', 'on', 'rentrer', 'tard.'],
  ['elle', 'apprendre', 'ses verbes,', 'elle', 'réussir', 'le test.'],
  ['je', 'connaître', 'son adresse,', 'je', 'envoyer', 'une carte.'],
  ['nous', 'attendre', 'le bus,', 'nous', 'être', 'en retard.'],
];

/* ---------- avoir oder être? (Heft 1.5.2) ---------- */
// Spezialfälle: monter, descendre, sortir … mit Objekt → avoir, ohne → être
const AUX_CONTEXT = [
  ['elle', 'descendre', 'les caisses.', 'avoir'], ['elle', 'descendre', 'à la cave.', 'être'],
  ['il', 'monter', 'les valises.', 'avoir'], ['il', 'monter', 'au troisième étage.', 'être'],
  ['nous', 'sortir', 'la poubelle.', 'avoir'], ['nous', 'sortir', 'ce soir.', 'être'],
  ['tu', 'rentrer', 'le vélo.', 'avoir'], ['tu', 'rentrer', 'à minuit.', 'être'],
  ['je', 'retourner', 'la crêpe.', 'avoir'], ['je', 'retourner', 'en France.', 'être'],
];
