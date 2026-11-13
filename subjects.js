/* =========================================================
   Geschichte & Politik – Lerninhalte
   Format pro Thema (Abschnitte mit #):
     # Karten   Begriff = Erklärung
     # Quiz     Frage :: richtig | falsch | falsch | falsch
     # Zeit     Jahr = Ereignis            (für den Zeitstrahl)
     # Lücken   Satz mit ___ :: Antwort/Alternative
   ========================================================= */
var GP_RAW = [];
function GP(id, subject, ico, title, text) { GP_RAW.push({ id: id, subject: subject, ico: ico, title: title, text: text }); }

/* ===================== POLITIK ===================== */

GP('p-ch', 'pol', '🗺️', 'Die Schweiz: Zahlen, Föderalismus, Abkommen', `
# Karten
Anzahl Kantone = 26 Kantone (20 Vollkantone und 6 Halbkantone)
Bundesstadt = Bern – Sitz von Parlament und Bundesrat (offiziell gibt es keine «Hauptstadt»)
Landessprachen = Deutsch, Französisch, Italienisch und Rätoromanisch
Einwohnerzahl = rund 9 Millionen Menschen
Grösste Gruppe nach Religion = Konfessionslose (ca. 36 %), dann römisch-katholisch (ca. 31 %) und evangelisch-reformiert (ca. 19 %)
Föderalismus = Organisationsform eines Staates: Bund, Kantone und Gemeinden haben je eigene Kompetenzen; Aufgaben werden möglichst auf der tiefsten sinnvollen Ebene gelöst
Drei politische Ebenen = Bund, Kantone, Gemeinden
Aufgaben des Bundes = z. B. Aussenpolitik, Landesverteidigung (Armee), direkte Bundessteuer
Aufgaben der Kantone = z. B. Schulwesen, Spitäler, Polizei
Aufgaben der Gemeinden = z. B. Feuerwehr, Bürgerrecht, lokale Infrastruktur
Finanzausgleich = Ausgleich zwischen finanzstarken (Geber-) und finanzschwachen (Nehmer-)Kantonen
Schweizerisches Strafgesetzbuch = seit 1942 für die ganze Schweiz – vorher hatte jeder Kanton sein eigenes
Bilaterale Verträge I und II = wichtigste Abkommen mit der EU; v. a. Marktzugang für Waren, Dienstleistungen und Arbeitskräfte (Personenfreizügigkeit)
Schengen-Dublin-Abkommen = Teil der Bilateralen II; erleichtert die Reise ohne Grenzkontrollen und regelt die Zusammenarbeit bei Asyl und Sicherheit
EFTA = Europäische Freihandelsassoziation: Schweiz, Liechtenstein, Island, Norwegen; Sitz in Genf; die Schweiz ist Gründungsmitglied
EWR = Europäischer Wirtschaftsraum (EU + EFTA-Länder ohne die Schweiz); Beitritt 1992 vom Volk abgelehnt
Europarat = setzt sich für Menschenrechte, Demokratie und Rechtsstaatlichkeit ein; die Schweiz ist Mitglied
EMRK = Europäische Menschenrechtskonvention; bei Verletzung kann man beim Europäischen Gerichtshof für Menschenrechte (EGMR) klagen
UNO = Vereinte Nationen – für Frieden, Sicherheit und Menschenrechte; die Schweiz ist seit 2002 Mitglied
WTO = Welthandelsorganisation mit Sitz in Genf; fördert den weltweiten Handel
OECD = Organisation für wirtschaftliche Zusammenarbeit und Entwicklung; bekannt für die PISA-Studien
NATO = Militärbündnis von 32 Staaten; die Schweiz ist neutral und kein Mitglied, arbeitet aber mit ihr zusammen
# Quiz
Aus wie vielen Kantonen besteht die Schweiz? :: 26 | 23 | 24 | 20
Wie heisst die Bundesstadt der Schweiz? :: Bern | Zürich | Genf | Luzern
Wie viele Landessprachen hat die Schweiz? :: vier | drei | zwei | fünf
Was bedeutet Föderalismus? :: Bund, Kantone und Gemeinden haben je eigene Kompetenzen | Nur der Bund darf Gesetze machen | Die Kantone sind unabhängige Staaten | Die Gemeinden wählen den Bundesrat
Wer ist für die Landesverteidigung zuständig? :: der Bund | die Kantone | die Gemeinden | die UNO
Wer ist hauptsächlich für das Schulwesen zuständig? :: die Kantone | der Bund | die EU | die Armee
Seit wann gilt ein einheitliches Strafgesetzbuch für die ganze Schweiz? :: seit 1942 | seit 1848 | seit 1291 | seit 2000
Seit wann ist die Schweiz Mitglied der UNO? :: seit 2002 | seit 1945 | seit 1992 | seit 1971
In welcher Organisation ist die Schweiz NICHT Mitglied? :: NATO | UNO | EFTA | Europarat
Welche Länder bilden die EFTA? :: Schweiz, Liechtenstein, Island, Norwegen | Schweiz, Österreich, Deutschland, Italien | alle EU-Staaten | Schweiz und Frankreich
Was lehnte das Schweizer Volk 1992 ab? :: den Beitritt zum EWR | den Beitritt zur UNO | das Frauenstimmrecht | die Bundesverfassung
Zu welchem Vertragspaket gehört das Schengen-Dublin-Abkommen? :: Bilaterale II | Bilaterale I | EFTA-Vertrag | NATO-Vertrag
Welche Organisation veröffentlicht die PISA-Studien? :: OECD | WTO | UNESCO | OSZE
# Zeit
1942 = Schweizerisches Strafgesetzbuch für das ganze Land
1992 = Volk lehnt den EWR-Beitritt ab
2002 = Beitritt der Schweiz zur UNO
# Lücken
Die Schweiz besteht aus ___ Kantonen. :: 26/sechsundzwanzig
Die drei politischen Ebenen heissen Bund, Kantone und ___. :: Gemeinden
Die Schweiz ist kein Mitglied der EU, ist aber Gründungsmitglied der ___. :: EFTA
Die Schweiz trat im Jahr ___ der UNO bei. :: 2002
`);

GP('p-gew', 'pol', '⚖️', 'Gewaltenteilung', `
# Karten
Gewaltenteilung = Die Staatsmacht wird auf drei voneinander unabhängige Gewalten verteilt, damit niemand zu viel Macht hat
Legislative = gesetzgebende Gewalt – das Parlament (Bundesversammlung); beschliesst Gesetze
Exekutive = ausführende Gewalt – die Regierung (Bundesrat); setzt die Gesetze um
Judikative = rechtsprechende Gewalt – die Gerichte; sprechen Recht (lat. iudicare = Recht sprechen)
Souverän = das Volk: die Stimm- und Wahlberechtigten sind die oberste politische Instanz
Personelle Gewaltenteilung = eine Person darf nur einer der drei Gewalten angehören
Wer wählt das Parlament? = das Volk (die Stimm- und Wahlberechtigten)
Wer wählt den Bundesrat und das Bundesgericht? = das Parlament (Vereinigte Bundesversammlung)
Bundesanwaltschaft = verfolgt Delikte im Bereich des Bundes, z. B. Spionage, Sprengstoff, Amtsdelikte von Bundesangestellten
# Quiz
Wie heisst die gesetzgebende Gewalt? :: Legislative | Exekutive | Judikative | Souverän
Wer bildet die Exekutive auf Bundesebene? :: der Bundesrat | das Parlament | das Bundesgericht | das Volk
Was ist die Hauptaufgabe der Judikative? :: Recht sprechen | Gesetze beschliessen | Gesetze umsetzen | Steuern einziehen
Wer wählt das Parlament? :: das Volk | der Bundesrat | die Kantonsregierungen | das Bundesgericht
Wer wählt den Bundesrat? :: die Vereinigte Bundesversammlung | das Volk | das Bundesgericht | die Kantone
Darf eine Person gleichzeitig Bundesrätin und Bundesrichterin sein? :: Nein, man darf nur einer Gewalt angehören | Ja, maximal zwei Gewalten | Ja, wenn das Volk zustimmt | Nur in Kriegszeiten
Wer ist der «Souverän» in der Schweiz? :: das Volk | der Bundespräsident | das Bundesgericht | der Ständerat
Warum gibt es die Gewaltenteilung? :: damit keine Person oder Behörde zu viel Macht bekommt | damit Wahlen schneller gehen | damit der Bundesrat allein entscheidet | damit es weniger Gesetze gibt
# Lücken
Die Legislative ___ Gesetze. :: beschliesst/macht/erlässt
Die Exekutive auf Bundesebene ist der ___. :: Bundesrat
Die rechtsprechende Gewalt heisst ___. :: Judikative
`);

GP('p-abst', 'pol', '🗳️', 'Abstimmungen: Initiative & Referendum', `
# Karten
Abstimmung = Die Stimmberechtigten sagen Ja oder Nein zu einer Sachfrage – es werden keine Personen gewählt
Stimmrecht = alle volljährigen (ab 18) Schweizerinnen und Schweizer; bis zu viermal pro Jahr Abstimmungen
Volksinitiative = Das Volk will die Verfassung ändern: 100 000 Unterschriften in 18 Monaten; braucht das doppelte Mehr
Fakultatives Referendum = Das Volk will über einen Parlamentsbeschluss (z. B. Gesetz) abstimmen: 50 000 Unterschriften in 100 Tagen; einfaches Volksmehr genügt
Obligatorisches Referendum = automatische Volksabstimmung bei Verfassungsänderungen durch das Parlament oder Beitritt zu NATO/UNO/EU; keine Unterschriften nötig; doppeltes Mehr
Volksmehr = Mehrheit der gültigen Stimmen im ganzen Land (50 % + 1 Stimme); Leere und ungültige Stimmen zählen nicht
Ständemehr = Mehrheit der Kantone: 23 Standesstimmen (Vollkanton 1, Halbkanton ½); angenommen ab 12 Standesstimmen, bei 11½ abgelehnt
Doppeltes Mehr = Volksmehr UND Ständemehr – nötig bei Volksinitiative und obligatorischem Referendum
Wie stimmt ein Kanton? = Ergibt die Abstimmung im Kanton ein Ja-Mehr, zählt seine Standesstimme als Ja
Petition = schriftliche Bitte an eine Behörde; jede Person darf sie einreichen, die Behörde muss sie nur zur Kenntnis nehmen
# Quiz
Wie viele Unterschriften braucht eine Volksinitiative? :: 100 000 | 50 000 | 10 000 | 200 000
Wie lange hat man Zeit, Unterschriften für eine Volksinitiative zu sammeln? :: 18 Monate | 100 Tage | 4 Jahre | 6 Monate
Wie viele Unterschriften braucht ein fakultatives Referendum? :: 50 000 | 100 000 | 5 000 | 23
In welcher Frist müssen die Unterschriften für ein fakultatives Referendum gesammelt werden? :: 100 Tage | 18 Monate | 1 Jahr | 30 Tage
Was will man mit einer Volksinitiative erreichen? :: eine Änderung der Bundesverfassung | einen Bundesrat abwählen | ein Gericht anrufen | ein Gesetz des Kantons stoppen
Welches Mehr braucht ein fakultatives Referendum? :: nur das Volksmehr | das doppelte Mehr | nur das Ständemehr | Zweidrittelmehr
Welches Mehr braucht eine Volksinitiative? :: Volksmehr und Ständemehr | nur das Volksmehr | nur das Ständemehr | absolutes Mehr
Wann braucht es KEINE Unterschriften für eine Volksabstimmung? :: beim obligatorischen Referendum | bei der Volksinitiative | beim fakultativen Referendum | bei einer Petition
Wie viele Standesstimmen gibt es insgesamt? :: 23 | 26 | 46 | 20
Eine Initiative erhält 55 % Ja, aber nur 11 Ständestimmen. Ergebnis? :: abgelehnt | angenommen | unentschieden – neue Abstimmung | der Bundesrat entscheidet
Ab wie vielen Jahren darf man auf Bundesebene abstimmen? :: 18 | 16 | 20 | 21
# Lücken
Für eine Volksinitiative braucht es ___ Unterschriften. :: 100000/100 000/100'000
Für ein fakultatives Referendum braucht es ___ Unterschriften. :: 50000/50 000/50'000
Volksmehr und Ständemehr zusammen nennt man das ___ Mehr. :: doppelte
Ein Halbkanton hat eine ___ Standesstimme. :: halbe
`);

GP('p-wahl', 'pol', '📮', 'Wahlen: Proporz & Majorz, Parteien', `
# Karten
Wahl = Personen werden in ein Amt gewählt (z. B. ins Parlament)
Aktives Wahlrecht = das Recht, selbst zu wählen
Passives Wahlrecht = das Recht, gewählt zu werden
Proporzwahl = Verhältniswahl: Sitze werden im Verhältnis der Parteistimmen verteilt; begünstigt kleine Parteien – so wird der Nationalrat gewählt
Majorzwahl = Mehrheitswahl: gewählt ist, wer die meisten Stimmen hat; begünstigt bekannte Persönlichkeiten – so werden Ständerat und Bundesrat gewählt
Absolutes Mehr = mehr als die Hälfte der gültigen Stimmen: (gültige Stimmen ÷ 2) + 1
Relatives Mehr = gewählt ist, wer am meisten Stimmen hat – meist im 2. Wahlgang
Kumulieren = einen Kandidaten zweimal auf den Wahlzettel schreiben
Panaschieren = Kandidierende von anderen Parteilisten auf den eigenen Wahlzettel schreiben
Streichen = Namen auf einer vorgedruckten Liste durchstreichen
Smartmap = zeigt politische Grundhaltungen: links – rechts und liberal – konservativ
Links = z. B. Umverteilung von Reich zu Arm, Ausbau der Sozialversicherungen, Arbeitnehmerschutz, Umweltschutz
Rechts = z. B. Eigenverantwortung, private Vorsorge, Recht und Ordnung, Förderung von Armee und Polizei
Liberal = z. B. Wirtschaftsfreiheit ohne Staatseingriffe, internationale Zusammenarbeit, Offenheit
Konservativ = z. B. nationale Unabhängigkeit, Tradition, Skepsis gegenüber Einwanderung und Globalisierung
SVP = Schweizerische Volkspartei: national-konservativ, gegen EU-Beitritt, für Steuersenkungen und strenges Asylrecht
SP = Sozialdemokratische Partei: links, für starken Sozialstaat, Umweltschutz und Öffnung gegenüber Europa
FDP = Die Liberalen: freie Marktwirtschaft, tiefe Steuern, Eigenverantwortung
Die Mitte = entstand 2021 aus CVP und BDP: Mitte-Partei, gute Beziehungen zur EU über bilaterale Verträge
Grüne = Grüne Partei: Umwelt- und Klimaschutz, Atomausstieg, links
GLP = Grünliberale Partei: Umweltschutz kombiniert mit liberaler Wirtschaftspolitik
# Quiz
Was ist das passive Wahlrecht? :: das Recht, gewählt zu werden | das Recht, zu wählen | das Recht, nicht zu wählen | das Recht, Unterschriften zu sammeln
Nach welchem System wird der Nationalrat gewählt? :: Proporz | Majorz | Los | durch das Parlament
Nach welchem System wird der Ständerat in fast allen Kantonen gewählt? :: Majorz | Proporz | durch den Bundesrat | durch die Gemeinden
Welches Wahlsystem begünstigt kleine Parteien? :: Proporz | Majorz | beide gleich | keines
Wie oft wird das Bundesparlament gewählt? :: alle vier Jahre | jedes Jahr | alle sechs Jahre | alle zwei Jahre
Was heisst «kumulieren»? :: einen Namen zweimal auf den Wahlzettel schreiben | Namen von anderen Listen dazuschreiben | Namen streichen | leer einlegen
Was heisst «panaschieren»? :: Kandidierende anderer Parteien auf die eigene Liste schreiben | einen Namen doppelt schreiben | die ganze Liste streichen | nur die Partei angeben
18 500 gültige Stimmen – wie hoch ist das absolute Mehr? :: 9 251 | 9 250 | 18 501 | 9 000
Welche Partei entstand 2021 aus CVP und BDP? :: Die Mitte | GLP | FDP | EVP
Welche Partei gilt als national-konservativ und gegen einen EU-Beitritt? :: SVP | SP | GLP | Grüne
Welche Haltung passt zu «Ausbau der Sozialversicherungen»? :: links | rechts | konservativ | liberal
# Lücken
Bei Majorzwahlen braucht man im ersten Wahlgang meist das ___ Mehr. :: absolute
Den Namen einer Person zweimal aufschreiben heisst ___. :: kumulieren
Der Nationalrat wird nach dem ___-System gewählt. :: Proporz
`);

GP('p-parl', 'pol', '🏛️', 'Das Parlament', `
# Karten
Bundesversammlung = das Schweizer Parlament, besteht aus Nationalrat und Ständerat (Zweikammersystem)
Nationalrat = «grosse Kammer»: 200 Mitglieder, vertritt die Bevölkerung; grosse Kantone haben mehr Sitze
Ständerat = «kleine Kammer»: 46 Mitglieder, vertritt die Kantone; 2 Sitze pro Kanton, 1 pro Halbkanton
Vereinigte Bundesversammlung = National- und Ständerat tagen gemeinsam (246 Mitglieder); wählt Bundesrat, Bundesrichter, Bundeskanzler, Bundesanwalt, im Krieg den General
Vier Aufgaben des Parlaments = 1. Gesetze machen 2. Budget festlegen 3. oberste Behörden wählen 4. Bundesrat, Verwaltung und Gerichte kontrollieren (Oberaufsicht)
Gleichberechtigung der Kammern = beide Räte haben die gleichen Rechte; ein Gesetz gilt nur, wenn beide zustimmen
Session = Sitzungsperiode des Parlaments: viermal pro Jahr, je drei Wochen
Milizparlament = Parlamentarier arbeiten nebenberuflich in der Politik und bringen ihr Fachwissen aus dem Beruf ein; gilt als volksnah
Kommission = kleine Gruppe von Ratsmitgliedern, die Geschäfte vorberät
Einigungskonferenz = wird gebildet, wenn National- und Ständerat sich nicht einig sind; scheitert sie, wird das Gesetz abgeschrieben
Fraktion = Zusammenschluss von Ratsmitgliedern mit ähnlicher Meinung (meist gleiche Partei)
Weg eines Gesetzes = Idee → Vorberatung in der Kommission → Beratung im Erstrat → Zweitrat → Differenzbereinigung → evtl. Einigungskonferenz → Schlussabstimmung → evtl. Referendum
# Quiz
Wie viele Mitglieder hat der Nationalrat? :: 200 | 46 | 246 | 7
Wie viele Mitglieder hat der Ständerat? :: 46 | 200 | 26 | 50
Wie viele Mitglieder hat die Vereinigte Bundesversammlung? :: 246 | 200 | 46 | 254
Wen vertritt der Ständerat? :: die Kantone | die Bevölkerung | die Parteien | den Bundesrat
Wie viele Ständeratssitze hat ein Vollkanton? :: 2 | 1 | je nach Einwohnerzahl | 4
Wer wählt den Bundesrat? :: die Vereinigte Bundesversammlung | der Nationalrat allein | der Ständerat allein | das Volk
Was ist KEINE Aufgabe des Parlaments? :: Recht sprechen | Gesetze machen | Budget festlegen | den Bundesrat wählen
Was passiert, wenn National- und Ständerat sich nicht einigen? :: Eine Einigungskonferenz wird gebildet | Der Bundesrat entscheidet | Das Bundesgericht entscheidet | Der Nationalrat gewinnt automatisch
Wie oft trifft sich das Parlament zu einer ordentlichen Session? :: viermal pro Jahr | jede Woche | einmal pro Jahr | zwölfmal pro Jahr
Was bedeutet «Milizparlament»? :: Die Parlamentarier arbeiten nebenberuflich in der Politik | Das Parlament besteht aus Soldaten | Das Parlament tagt nur im Krieg | Die Mitglieder werden ausgelost
# Lücken
Der Nationalrat wird auch «___ Kammer» genannt. :: grosse
Der Ständerat hat ___ Mitglieder. :: 46
Sind sich die beiden Räte nicht einig, entscheidet eine ___. :: Einigungskonferenz
`);

GP('p-br', 'pol', '👥', 'Bundesrat & Bundesverwaltung', `
# Karten
Bundesrat = die Regierung (Exekutive) der Schweiz: 7 gleichberechtigte Mitglieder, gewählt für 4 Jahre von der Vereinigten Bundesversammlung
Kollegialitätsprinzip = Der Bundesrat entscheidet gemeinsam und vertritt die Entscheide gemeinsam gegen aussen
Konkordanz = Alle grossen Parteien sind in der Regierung eingebunden (keine eigentliche Opposition)
Zauberformel = parteipolitische Verteilung der Bundesratssitze; 1959–2003: 2 FDP, 2 CVP, 2 SP, 1 SVP – heute: 2 SVP, 2 SP, 2 FDP, 1 Mitte
Bundespräsident(in) = ein Bundesratsmitglied, für 1 Jahr gewählt; «Erste/r unter Gleichen»: leitet die Sitzungen, hält Ansprachen (Neujahr, 1. August), repräsentiert das Land
Vier Aufgaben des Bundesrats = 1. Gesetze vorbereiten und dem Parlament vorschlagen 2. Gesetze umsetzen (Verordnungen) 3. informieren (z. B. Abstimmungsbüchlein) 4. die Bundesverwaltung leiten
Verordnung = vom Bundesrat erlassene, genauere Ausführungsbestimmung zu einem Gesetz
Bundeskanzlei = Stabsstelle des Bundesrats, geleitet vom Bundeskanzler (2026: Viktor Rossi); betreibt die Apps «VoteInfo» und «CH info»
Bundesverwaltung = unterstützt den Bundesrat; in 7 Departemente gegliedert – jedes Bundesratsmitglied leitet eines
EDA = Departement für auswärtige Angelegenheiten – Ignazio Cassis (FDP)
EDI = Departement des Innern – Elisabeth Baume-Schneider (SP)
EJPD = Justiz- und Polizeidepartement – Beat Jans (SP)
VBS = Departement für Verteidigung, Bevölkerungsschutz und Sport – Martin Pfister (Die Mitte)
EFD = Finanzdepartement – Karin Keller-Sutter (FDP)
WBF = Departement für Wirtschaft, Bildung und Forschung – Guy Parmelin (SVP), Bundespräsident 2026
UVEK = Departement für Umwelt, Verkehr, Energie und Kommunikation – Albert Rösti (SVP)
# Quiz
Wie viele Mitglieder hat der Bundesrat? :: 7 | 5 | 9 | 26
Für wie viele Jahre wird der Bundesrat gewählt? :: 4 | 1 | 6 | 8
Für wie lange wird die Bundespräsidentin / der Bundespräsident gewählt? :: 1 Jahr | 4 Jahre | 2 Jahre | auf Lebenszeit
Welche Aufgabe hat die Bundespräsidentin / der Bundespräsident? :: Sie/er leitet die Bundesratssitzungen | Sie/er kann allein Gesetze erlassen | Sie/er ist Chef/in der Armee | Sie/er wählt die Bundesrichter
Was bedeutet das Kollegialitätsprinzip? :: Der Bundesrat entscheidet und vertritt Entscheide gemeinsam | Jeder Bundesrat vertritt seine eigene Meinung | Der Präsident entscheidet allein | Das Volk wählt jeden Entscheid
Wie lautet die heutige Zauberformel? :: 2 SVP, 2 SP, 2 FDP, 1 Mitte | 2 FDP, 2 CVP, 2 SP, 1 SVP | 3 SVP, 2 SP, 2 FDP | je 1 Sitz für 7 Parteien
Wie heisst die Stabsstelle des Bundesrats? :: Bundeskanzlei | Bundesanwaltschaft | Bundesgericht | Staatssekretariat
In wie viele Departemente ist die Bundesverwaltung gegliedert? :: 7 | 5 | 10 | 26
Welches Departement leitet Ignazio Cassis? :: EDA (auswärtige Angelegenheiten) | EFD (Finanzen) | VBS (Verteidigung) | UVEK (Umwelt, Verkehr)
Wer ist Bundespräsident im Jahr 2026? :: Guy Parmelin | Karin Keller-Sutter | Albert Rösti | Beat Jans
Wie heisst die genauere Ausführungsbestimmung des Bundesrats zu einem Gesetz? :: Verordnung | Initiative | Petition | Referendum
Welcher Partei gehört Martin Pfister an? :: Die Mitte | SVP | SP | FDP
# Lücken
Der Bundesrat besteht aus ___ Mitgliedern. :: 7/sieben
Die Bundespräsidentin wird für ___ Jahr gewählt. :: 1/ein/eines
Der Bundesrat erlässt zur Umsetzung von Gesetzen sogenannte ___. :: Verordnungen
`);

GP('p-ger', 'pol', '👩‍⚖️', 'Die Gerichte', `
# Karten
Bundesgericht = höchstes Gericht der Schweiz, Sitz in Lausanne (auch in Luzern); meist letzte Instanz
Bundesstrafgericht = Bellinzona – Straftaten von besonderer Bedeutung (z. B. Geldfälschung, Sprengstoff, Terror)
Bundesverwaltungsgericht = St. Gallen – Beschwerden gegen Entscheide der Bundesverwaltung (z. B. Asyl)
Bundespatentgericht = St. Gallen – Streitigkeiten über Patente
Instanzenweg = 1. Instanz und 2. Instanz kantonal, 3. Instanz Bundesgericht; nur wer verliert, kann weiterziehen
EGMR = Europäischer Gerichtshof für Menschenrechte in Strassburg – nur wenn Menschenrechte (EMRK) verletzt sind
Zivilrecht = Streit zwischen Privatpersonen bzw. Unternehmen, z. B. Arbeitsvertrag, Kaufvertrag, Miete, Erbschaft
Strafrecht = der Staat klagt eine Person an, die etwas Verbotenes getan hat, z. B. Diebstahl, Betrug, Körperverletzung
Verwaltungsrecht = eine Person wehrt sich gegen einen Entscheid des Staates, z. B. Steuern, Baubewilligung, Asyl
Bundesrichter = werden von der Vereinigten Bundesversammlung für 6 Jahre gewählt
# Quiz
Wo hat das Bundesgericht seinen Hauptsitz? :: Lausanne | Bern | Bellinzona | St. Gallen
Wo befindet sich das Bundesstrafgericht? :: Bellinzona | Lausanne | Zürich | Luzern
Ein Streit um einen Kaufvertrag ist ein Fall des … :: Zivilrechts | Strafrechts | Verwaltungsrechts | Völkerrechts
Ein Diebstahl ist ein Fall des … :: Strafrechts | Zivilrechts | Verwaltungsrechts | Patentrechts
Ein Streit um die Steuerrechnung ist ein Fall des … :: Verwaltungsrechts | Zivilrechts | Strafrechts | Erbrechts
Wer klagt im Strafrecht an? :: der Staat | das Opfer allein | der Bundesrat | das Parlament
Welche Instanzen sind kantonal? :: die 1. und die 2. Instanz | nur die 3. Instanz | alle drei | keine
Wann kann ein Fall an den EGMR in Strassburg weitergezogen werden? :: wenn Menschenrechte verletzt sind | bei jedem Urteil | nur bei Steuerfragen | nie
Für wie viele Jahre werden Bundesrichter gewählt? :: 6 | 4 | 1 | 12
Wird jeder Gerichtsfall automatisch am Bundesgericht behandelt? :: Nein, zuerst entscheiden die kantonalen Gerichte | Ja, immer | Nur Zivilfälle | Nur Strafrechtsfälle
# Lücken
Das höchste Gericht der Schweiz ist das ___. :: Bundesgericht
Streitigkeiten zwischen Privatpersonen gehören zum ___. :: Zivilrecht
Im Strafrecht ist der ___ der Kläger. :: Staat
`);

/* ===================== GESCHICHTE ===================== */

GP('g-abs', 'gesch', '👑', 'Absolutismus', `
# Karten
Absolutismus = Regierungsform mit einem Monarchen, der unbeschränkt herrscht und seine Macht von Gott ableitet (Gottesgnadentum); vorherrschend im 17./18. Jh.
Gottesgnadentum = Der König ist von Gott eingesetzt und nur Gott Rechenschaft schuldig
Ludwig XIV. = der «Sonnenkönig», regierte Frankreich 1643–1715; Vorbild des Absolutismus («L'État, c'est moi»)
Versailles = prunkvolles Schloss Ludwigs XIV., grosser Ausbau 1685–1690 mit 36 000 Arbeitern und 6000 Pferden; Zentrum der Macht, wo der Adel kontrolliert wurde
Säulen des Absolutismus = stehendes Heer, Beamte (Bürokratie), Merkantilismus, Kirche, Hofstaat
Merkantilismus = staatlich gelenkte Wirtschaft im Absolutismus: viel exportieren, wenig importieren, Manufakturen fördern – um die Staatskasse zu füllen
Stehendes Heer = Armee, die auch in Friedenszeiten besteht (statt nur im Krieg angeworbener Söldner)
Ständegesellschaft = 1. Stand Klerus (ca. 0,5 %), 2. Stand Adel (ca. 1,5 %), 3. Stand Bürger und Bauern (ca. 98 %) – der 3. Stand trug die Steuerlast
Klerus = Geistliche der Kirche; erster Stand mit Vorrechten
Adel = mächtige Oberschicht mit erblichen Vorrechten, meist mit Grundbesitz; zweiter Stand
Aristokratie = «Herrschaft der Besten»: eine kleine Oberschicht (Adel, Patrizier) regiert – z. B. die Schweiz vor 1798
Monarchie = Staatsform, in der ein König/eine Königin herrscht, meist durch Erbfolge und lebenslang
Absolutismus heute = absolutistisch regierte Länder gibt es noch: z. B. Brunei, Saudi-Arabien, Oman, Katar
# Quiz
Wie nennt man den Anspruch, die Herrschaft direkt von Gott erhalten zu haben? :: Gottesgnadentum | Volkssouveränität | Gewaltenteilung | Merkantilismus
Wer war der «Sonnenkönig»? :: Ludwig XIV. | Ludwig XVI. | Napoleon | Wilhelm III.
Wann regierte Ludwig XIV.? :: 1643–1715 | 1774–1793 | 1799–1815 | 1515–1547
Was ist Merkantilismus? :: staatlich gelenkte Wirtschaft mit viel Export und wenig Import | freier Welthandel ohne Zölle | Planwirtschaft der Arbeiter | Tauschhandel ohne Geld
Wie gross war der Anteil des dritten Standes an der Bevölkerung? :: ca. 98 % | ca. 50 % | ca. 1,5 % | ca. 10 %
Welcher Stand musste die meisten Steuern zahlen? :: der dritte Stand | der Adel | der Klerus | der König
Was ist ein stehendes Heer? :: eine Armee, die auch im Frieden besteht | eine Armee nur für Paraden | eine Söldnertruppe für einen Krieg | eine Bürgerwehr
Welche Staatsform hatte die Alte Eidgenossenschaft vor 1798? :: Aristokratie | absolute Monarchie | Demokratie | Diktatur
Welches Schloss steht für den Absolutismus? :: Versailles | Neuschwanstein | Schönbrunn | Buckingham Palace
# Zeit
1643 = Ludwig XIV. wird König von Frankreich
1685 = Ausbau von Schloss Versailles (bis 1690)
1715 = Tod Ludwigs XIV.
1774 = Ludwig XVI. wird König
# Lücken
Ludwig XIV. wird auch «___» genannt. :: Sonnenkönig
Das absolutistische Wirtschaftssystem heisst ___. :: Merkantilismus
Der erste Stand ist der ___, der zweite der Adel. :: Klerus
`);

GP('g-aufkl', 'gesch', '💡', 'Aufklärung & Revolutionen', `
# Karten
Aufklärung = geistige Bewegung im 17./18. Jh.: Vernunft statt blinder Glaube an Tradition und Kirche; forderte Freiheit, Gleichheit und Toleranz
Kant: «Was ist Aufklärung?» = «Aufklärung ist der Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit» – «Habe Mut, dich deines eigenen Verstandes zu bedienen!»
Immanuel Kant = deutscher Philosoph der Aufklärung (1724–1804)
Montesquieu = französischer Philosoph (1689–1755); entwickelte die Idee der Gewaltenteilung
John Locke = englischer Philosoph; Naturrecht: Jeder Mensch hat von Natur aus Rechte auf Leben, Freiheit und Eigentum
Isaac Newton = Naturwissenschaftler (1642–1727): Erkenntnis durch Beobachtung und Experiment statt Vermutungen
Lessing = deutscher Dichter der Aufklärung (1729–1781); stand für religiöse Toleranz
Naturrecht = Rechte, die jeder Mensch von Natur aus hat und die über den Gesetzen stehen
Volkssouveränität = Alle Staatsgewalt geht vom Volk aus
Gesellschaftsvertrag = Idee der Aufklärung: Menschen schliessen einen Vertrag und übertragen dem Staat Macht, damit er ihre Rechte schützt
Toleranz = Anerkennung anderer Meinungen und Religionen
Glorious Revolution = 1688/89 in England: unblutiger Machtwechsel zu Wilhelm III.; Beginn der konstitutionellen Monarchie
Amerikanische Revolution = Unabhängigkeitskrieg der 13 Kolonien gegen Grossbritannien (1775–1783); 4. Juli 1776 Unabhängigkeitserklärung mit Menschenrechten
Französische Revolution = 1789: Umsturz des Ancien Régime in Frankreich; Leitideen «Liberté, Égalité, Fraternité»
Merkmale einer Revolution = Symbole (z. B. Marseillaise, Trikolore), Leitideen, Sturz der bestehenden Ordnung, meist Gewalt
Menschen- und Bürgerrechte = unantastbare Rechte jedes Menschen; 1776 in Amerika und 1789 in Frankreich erklärt
Jakobiner = radikale Revolutionäre in Frankreich (Schreckensherrschaft unter Robespierre)
Girondisten = gemässigte Republikaner der Französischen Revolution, Vertreter des wohlhabenden Bürgertums
Napoleon Bonaparte = französischer General; Staatsstreich 1799, 1804 Kaiser; eroberte grosse Teile Europas, 1815 endgültig besiegt
Kontinentalsperre = 1806 von Napoleon verhängte Wirtschaftsblockade des europäischen Festlands gegen Grossbritannien
Wiener Kongress = 1814/15: Neuordnung Europas nach Napoleon unter Metternich; Wiederherstellung der alten Ordnung (Restauration)
Republik = nichtmonarchische Staatsform (lat. res publica = Sache des Volkes)
Diktatur = Gewaltherrschaft einer Person oder kleinen Gruppe ohne Gewaltenteilung
Konstitutionelle Monarchie = Monarchie, in der die Macht des Königs durch eine Verfassung begrenzt ist
# Quiz
Was stellte die Aufklärung in den Mittelpunkt? :: die Vernunft | den Glauben an den König | die Tradition | die Macht der Kirche
Von wem stammt «Habe Mut, dich deines eigenen Verstandes zu bedienen»? :: Immanuel Kant | Napoleon | Ludwig XIV. | Karl Marx
Wer entwickelte die Idee der Gewaltenteilung? :: Montesquieu | Newton | Lessing | Robespierre
Wann wurde die amerikanische Unabhängigkeitserklärung unterzeichnet? :: 4. Juli 1776 | 14. Juli 1789 | 1. August 1291 | 1815
Wann begann die Französische Revolution? :: 1789 | 1776 | 1798 | 1848
Wie lauten die Leitideen der Französischen Revolution? :: Liberté, Égalité, Fraternité | Ordnung, Glaube, König | Arbeit, Familie, Vaterland | Einheit, Recht, Freiheit
Was war die Glorious Revolution? :: der unblutige Machtwechsel 1688/89 in England | ein Krieg in Amerika | die Krönung Napoleons | ein Aufstand in Paris 1830
In welchem Jahr liess sich Napoleon zum Kaiser krönen? :: 1804 | 1799 | 1789 | 1815
Was war die Kontinentalsperre? :: Napoleons Wirtschaftsblockade gegen Grossbritannien | eine Grenzmauer in den Alpen | ein Friedensvertrag | ein Zollverein der Schweiz
Was wurde am Wiener Kongress 1814/15 beschlossen? :: die Neuordnung Europas nach Napoleon | die Gründung der USA | die Bundesverfassung der Schweiz | die Abschaffung der Monarchie in Europa
Wer führte die radikale Schreckensherrschaft in Frankreich an? :: die Jakobiner | die Girondisten | der Adel | die Royalisten
Was besagt das Naturrecht? :: Jeder Mensch hat von Natur aus Rechte | Der König hat alle Rechte | Nur Adlige haben Rechte | Rechte entstehen nur durch Gesetze
# Zeit
1689 = Glorious Revolution in England
1776 = Unabhängigkeitserklärung der USA
1783 = Grossbritannien anerkennt die Unabhängigkeit der USA
1789 = Beginn der Französischen Revolution
1793 = Hinrichtung Ludwigs XVI. (Guillotine)
1799 = Staatsstreich Napoleons
1804 = Napoleon krönt sich zum Kaiser
1806 = Kontinentalsperre gegen Grossbritannien
1815 = Wiener Kongress und Napoleons endgültige Niederlage
# Lücken
Die Leitideen der Französischen Revolution sind Liberté, Égalité, ___. :: Fraternité
Die Idee der Gewaltenteilung stammt von ___. :: Montesquieu
Die USA erklärten ___ ihre Unabhängigkeit. :: 1776
`);

GP('g-ch', 'gesch', '🏔️', 'Von der Alten Eidgenossenschaft zum Bundesstaat', `
# Karten
1291 = Uri, Schwyz und Unterwalden schliessen das erste dokumentierte Bündnis (Bundesbrief)
Eidgenossenschaft = Bezeichnung für die seit dem 14. Jh. bestehenden Bündnisnetze im Gebiet der heutigen Schweiz
Ancien Régime (bis 1798) = Alte Eidgenossenschaft als Staatenbund: 13 Orte, Untertanengebiete/Gemeine Herrschaften und Zugewandte Orte; regiert von Patriziern (Aristokratie)
Tagsatzung = einzige gemeinsame Einrichtung der Alten Eidgenossenschaft: Treffen der Gesandten der Orte
Helvetische Gesellschaft = 1761 gegründeter Verein aufklärerisch gesinnter Männer, kritisierte das Ancien Régime
Helvetik (1798–1803) = Frankreich erobert die Schweiz; zentralistischer Einheitsstaat nach französischem Vorbild
Französische Interessen an der Schweiz = Kontrolle der Alpenpässe nach Norditalien, Schweizer Staatsschatz, Verbreitung der Aufklärung
Mediation (1803–1814) = Napoleons Vermittlungsakte: wieder Staatenbund; frühere Untertanengebiete werden eigene Kantone (z. B. Waadt, Aargau, Thurgau, Tessin, St. Gallen, Graubünden)
Restauration (1814–1830) = Rückkehr zur alten Ordnung nach Napoleon; Bundesvertrag von 1815 als lockerer Staatenbund
1815 = Wiener Kongress: Neutralität der Schweiz anerkannt, heutige Landesgrenzen festgelegt
Regeneration (1830–1848) = Liberale setzen in vielen Kantonen neue, demokratischere Verfassungen durch
Liberale vs. Konservative = Liberale wollten einen modernen Bundesstaat mit Freiheitsrechten; Konservative wollten die alte, kantonal geprägte Ordnung bewahren
Sonderbund = Separatbündnis der 8 katholisch-konservativen Kantone (Luzern, Uri, Schwyz, Obwalden, Nidwalden, Zug, Freiburg, Wallis), 1845
Sonderbundskrieg (1847) = letzter Bürgerkrieg der Schweiz: Liberale (General Dufour) besiegen die katholisch-konservativen Kantone; knapp 90 Tote
Bundesverfassung 1848 = Gründung des modernen Bundesstaates: Bundesrat, Zweikammerparlament, einheitlicher Wirtschaftsraum (keine Binnenzölle mehr)
Binnenzölle = Zölle innerhalb des Landes (an Kantonsgrenzen, Brücken, Pässen) – 1848 abgeschafft
Staatenbund = Zusammenschluss eigenständiger Staaten, die ihre volle Staatsgewalt behalten (z. B. Schweiz vor 1798 und 1815–1848)
Einheitsstaat = Staat mit zentraler Regierung, Regionen sind nur Verwaltungseinheiten (z. B. Helvetik, Frankreich)
Bundesstaat = Gliedstaaten geben Teile ihrer Macht an einen Gesamtstaat ab, behalten aber eigene Kompetenzen (Föderalismus) – Schweiz seit 1848
Ausbau der Volksrechte = 1874 Referendum, 1891 Volksinitiative auf Bundesebene
Generalstreik 1918 = landesweiter Streik wegen Armut und sozialer Not nach dem Ersten Weltkrieg
Konsensdemokratie = schrittweise Einbindung weiterer Kräfte in den Bundesrat: Katholisch-Konservative (ab 1891, ab 1919 zwei Sitze), Sozialdemokraten ab 1943, 1959 Zauberformel
Frauenstimmrecht = 1971 auf Bundesebene eingeführt
Kanton Jura = 1979 vom Kanton Bern abgetrennt – jüngster Kanton
# Quiz
Welche drei Orte schlossen 1291 das erste dokumentierte Bündnis? :: Uri, Schwyz und Unterwalden | Zürich, Bern und Luzern | Uri, Glarus und Zug | Bern, Freiburg und Solothurn
Wer beherrschte die Schweiz von 1798 bis 1814? :: Frankreich | Österreich | die Habsburger | das Deutsche Reich
Welche Staatsform hatte die Schweiz während der Helvetik? :: Einheitsstaat | Staatenbund | Bundesstaat | Monarchie
Wie heisst die Zeit von 1803 bis 1814? :: Mediation | Helvetik | Regeneration | Restauration
Was wurde 1815 international anerkannt? :: die Neutralität der Schweiz | das Frauenstimmrecht | der Bundesstaat | der Kanton Jura
Welcher Krieg fand 1847 statt? :: Sonderbundskrieg | Schwabenkrieg | Bauernkrieg | Erster Weltkrieg
Wer stand sich im Sonderbundskrieg gegenüber? :: liberale und katholisch-konservative Kantone | die Schweiz und Frankreich | Stadt und Land | Deutsch- und Westschweiz
Wer führte die Truppen der Tagsatzung im Sonderbundskrieg? :: General Henri Dufour | Napoleon | General Guisan | Wilhelm Tell
Was entstand 1848? :: der Bundesstaat mit der Bundesverfassung | der Staatenbund | die Helvetik | die EFTA
Wann wurde auf Bundesebene das Referendum eingeführt? :: 1874 | 1848 | 1891 | 1971
Wann wurde die Volksinitiative auf Bundesebene eingeführt? :: 1891 | 1874 | 1848 | 1919
Wann führte die Schweiz das Frauenstimmrecht auf Bundesebene ein? :: 1971 | 1919 | 1848 | 1990
Welcher Kanton ist der jüngste? :: Jura | Aargau | Tessin | Basel-Landschaft
Was wurde mit dem Bundesstaat 1848 abgeschafft? :: die Binnenzölle | die Kantone | die Gemeinden | die Neutralität
# Zeit
1291 = Bündnis von Uri, Schwyz und Unterwalden
1761 = Gründung der Helvetischen Gesellschaft
1798 = Frankreich besetzt die Eidgenossenschaft – Helvetik
1803 = Mediationsakte Napoleons
1815 = Neutralität anerkannt, Bundesvertrag
1830 = Beginn der Regeneration
1847 = Sonderbundskrieg
1848 = Bundesverfassung – Gründung des Bundesstaates
1874 = Einführung des Referendums
1891 = Einführung der Volksinitiative
1918 = Landesstreik (Generalstreik)
1919 = Nationalrat erstmals nach Proporz gewählt
1971 = Frauenstimmrecht auf Bundesebene
1979 = Gründung des Kantons Jura
2000 = Revidierte Bundesverfassung tritt in Kraft
# Lücken
1798 wurde die Schweiz zu einem ___ nach französischem Vorbild. :: Einheitsstaat
Der Bürgerkrieg von 1847 heisst ___. :: Sonderbundskrieg
Seit ___ ist die Schweiz ein Bundesstaat. :: 1848
Das Frauenstimmrecht auf Bundesebene gibt es seit ___. :: 1971
`);

GP('g-ind', 'gesch', '🏭', 'Industrialisierung & soziale Frage', `
# Karten
Industrielle Revolution = grundlegender Wandel von der Agrar- zur Industriegesellschaft; begann um 1770 in England
Voraussetzungen der Industrialisierung = Bevölkerungswachstum, Agrarrevolution, technische Erfindungen (Dampfmaschine), Kapital, stabiles politisches System, Handelsmacht England
Dampfmaschine = 1712 Newcomen, 1769 von James Watt verbessert – wichtigste Antriebskraft der Industrialisierung
Spinning Jenny = Spinnmaschine von Hargreaves (1764)
Mechanischer Webstuhl = Erfindung von Cartwright (1785)
Etappen der Industrialisierung = 1780–1850 Textilindustrie, 1850–1900 Eisenbahn und Schwerindustrie, 1900–1945 Elektrifizierung, 1945–1973 Massenmotorisierung, danach neue Technologien
Spanischbrötlibahn = erste Eisenbahn der Schweiz, 1847 zwischen Zürich und Baden
Dreizelgenwirtschaft = traditionelle Landwirtschaft: Feld in drei Teile, ein Drittel lag jeweils brach – geringe Erträge (Teufelskreis: wenig Futter, wenig Vieh, wenig Dünger)
Agrarrevolution = neue Methoden (z. B. Kleeanbau, Stallfütterung) steigern die Erträge; die Schweiz wird ab ca. 1880 von der «gelben» zur «grünen» Schweiz (Milchwirtschaft)
Protoindustrialisierung = «Industrialisierung vor der Industrialisierung»: Heimarbeit für den Markt im Verlagssystem
Verlagssystem = Verleger (Kaufleute) liefern Rohstoffe an Heimarbeiter auf dem Land und verkaufen die fertigen Waren
Fabrik = zentraler Betrieb, in dem arbeitsteilig mit Maschinen produziert wird
Arbeitsteilung = jede Person macht immer denselben Arbeitsschritt
Urbanisierung = Verstädterung: Menschen ziehen vom Land in die Städte zu den Fabriken (Landflucht)
Proletariat = Klasse der besitzlosen Lohnarbeiter, die nur ihre Arbeitskraft verkaufen können
Soziale Frage = Not der Industriearbeiter: lange Arbeitszeiten, tiefe Löhne, Kinderarbeit, Wohnungselend, keine Absicherung bei Krankheit, Unfall, Alter
Fabrikgesetz 1877 = Schweizer Gesetz: max. 11 Stunden pro Tag / 66 pro Woche, Kinderarbeit unter 14 verboten, Mutterschutz, Fabrikinspektoren – galt nur für Fabriken
Strukturwandel = Verschiebung vom 1. Sektor (Landwirtschaft) zum 2. Sektor (Industrie) und 3. Sektor (Dienstleistungen)
Kapitalismus = Wirtschaftsordnung, in der Produktionsmittel Privatpersonen gehören, die mit Lohnarbeitern Gewinn erwirtschaften
Gewerkschaft = Zusammenschluss von Arbeitnehmenden, um bessere Arbeitsbedingungen zu erkämpfen
Gesamtarbeitsvertrag = Vertrag zwischen Arbeitnehmer- und Arbeitgeberverbänden über Arbeitsbedingungen
Gründe für das Bevölkerungswachstum im 19. Jh. = weniger Naturkatastrophen, kaum grosse Kriege 1815–1914, bessere Hygiene, gelockerte Heiratsregeln
Ökologische Folgen = Luft- und Wasserverschmutzung, Abholzung, Rauch und Lärm in den Industriestädten
# Quiz
Wo begann die Industrielle Revolution? :: in England | in der Schweiz | in Frankreich | in den USA
Wer verbesserte 1769 die Dampfmaschine entscheidend? :: James Watt | Thomas Newcomen | Karl Marx | Isaac Newton
Welche Branche wurde in der ersten Phase (1780–1850) mechanisiert? :: die Textilindustrie | die Autoindustrie | die Elektroindustrie | die Computerindustrie
Wie hiess die erste Eisenbahn der Schweiz? :: Spanischbrötlibahn | Gotthardbahn | Rigibahn | Glacier Express
In welchem Jahr fuhr die erste Eisenbahn der Schweiz? :: 1847 | 1830 | 1882 | 1798
Was ist die «soziale Frage»? :: die Not der Industriearbeiter | die Frage nach dem Frauenstimmrecht | ein Streit zwischen Kantonen | die Kolonialpolitik
Wie viele Stunden pro Tag erlaubte das Fabrikgesetz von 1877 höchstens? :: 11 | 8 | 14 | 16
Ab welchem Alter durften Kinder laut Fabrikgesetz 1877 in Fabriken arbeiten? :: ab 14 | ab 10 | ab 12 | ab 18
Was bedeutet Urbanisierung? :: Verstädterung | Landflucht in die Berge | Auswanderung nach Amerika | Rückkehr zur Landwirtschaft
Was war ein Problem der Dreizelgenwirtschaft? :: Ein Drittel des Feldes lag brach, die Erträge waren gering | Es gab zu viel Dünger | Man brauchte Maschinen | Sie war nur in Städten möglich
Was ist das Proletariat? :: die besitzlosen Lohnarbeiter | der Adel | die Fabrikbesitzer | die Bauern mit grossem Land
Was ist Protoindustrialisierung? :: Heimarbeit für den Markt vor dem Fabrikzeitalter | die Elektrifizierung | die Automatisierung | der Bau der ersten Eisenbahn
# Zeit
1712 = Newcomens atmosphärische Dampfmaschine
1764 = Spinning Jenny von Hargreaves
1769 = Watt verbessert die Dampfmaschine
1785 = Mechanischer Webstuhl von Cartwright
1830 = Eisenbahn Liverpool–Manchester
1847 = Spanischbrötlibahn Zürich–Baden
1877 = Eidgenössisches Fabrikgesetz
1903 = erstes Motorflugzeug
# Lücken
Die erste Eisenbahn der Schweiz hiess ___. :: Spanischbrötlibahn
Die Not der Arbeiter nennt man die soziale ___. :: Frage
Das Fabrikgesetz von 1877 verbot Kinderarbeit unter ___ Jahren. :: 14/vierzehn
Die Verstädterung nennt man auch ___. :: Urbanisierung
`);

GP('g-marx', 'gesch', '✊', 'Marxismus', `
# Karten
Marxismus = Theorie von Karl Marx und Friedrich Engels (19. Jh.) als Antwort auf die soziale Frage: Ziel ist eine klassenlose Gesellschaft ohne Privatbesitz an Produktionsmitteln
Karl Marx = deutscher Philosoph (1818–1883), schrieb mit Engels das «Kommunistische Manifest» (1848)
Friedrich Engels = deutscher Philosoph und Unternehmerssohn (1820–1895), Mitstreiter von Marx
Dialektik = Entwicklung durch Gegensätze: These + Antithese → Synthese
Historischer Materialismus = Geschichte entwickelt sich durch Klassenkämpfe um die wirtschaftlichen Verhältnisse
Das Sein bestimmt das Bewusstsein = die materiellen Lebensbedingungen prägen das Denken – nicht umgekehrt
Basis-Überbau-Modell = Die wirtschaftliche Basis (Produktionsmittel, -verhältnisse) bestimmt den Überbau (Politik, Recht, Religion, Kultur)
Mehrwert = Differenz zwischen dem Wert, den der Arbeiter schafft, und seinem Lohn – den Mehrwert behält der Kapitalist
Entfremdung = Der Fabrikarbeiter ist nicht am ganzen Herstellungsprozess beteiligt und das Produkt gehört ihm nicht
Produktionsmittel = Werkzeuge, Maschinen, Rohstoffe und Boden, die man zum Herstellen von Gütern braucht
Klassenkampf = Kampf zwischen Bourgeoisie (Besitzende) und Proletariat (Arbeitende)
Bourgeoisie = besitzende Klasse der Kapitalisten und Unternehmer
Diktatur des Proletariats = nach Marx: Übergangsphase, in der die Arbeiter nach der Revolution herrschen
Kommunismus = Ziel des Marxismus: klassenlose Gesellschaft ohne Privateigentum an Produktionsmitteln
Sozialdemokratie = politische Richtung, die die Lage der Arbeiter durch Reformen (statt Revolution) verbessern will
# Quiz
Wer entwickelte zusammen mit Friedrich Engels den Marxismus? :: Karl Marx | Immanuel Kant | Adam Smith | Napoleon
Auf welches Problem antwortete der Marxismus? :: die soziale Frage | den Absolutismus | den Kolonialismus | die Glaubensspaltung
Was ist nach Marx der «Mehrwert»? :: der Unterschied zwischen dem geschaffenen Wert und dem Lohn | der Gewinn des Staates aus Steuern | der Preis einer Maschine | der Lohn eines Arbeiters
Was besagt «Das Sein bestimmt das Bewusstsein»? :: Die Lebensverhältnisse prägen das Denken | Das Denken prägt die Wirtschaft | Gott bestimmt alles | Der König bestimmt das Bewusstsein
Was gehört laut Marx zum «Überbau»? :: Politik, Recht und Religion | Maschinen und Fabriken | Rohstoffe | Lohnarbeit
Wie heissen die drei Schritte der Dialektik? :: These, Antithese, Synthese | Basis, Überbau, Klasse | Sein, Bewusstsein, Arbeit | Ursache, Wirkung, Folge
Welches Ziel hat der Marxismus? :: eine klassenlose Gesellschaft | eine absolute Monarchie | freien Welthandel | die Rückkehr zur Ständegesellschaft
Wer sind nach Marx die beiden gegnerischen Klassen der Industriegesellschaft? :: Bourgeoisie und Proletariat | Adel und Klerus | Bauern und Bürger | Kantone und Bund
Was meint «Entfremdung»? :: Der Arbeiter hat keinen Bezug mehr zum Produkt seiner Arbeit | Arbeiter wandern ins Ausland aus | Fabriken werden geschlossen | Die Kirche verliert Mitglieder
# Zeit
1818 = Geburt von Karl Marx
1848 = Kommunistisches Manifest von Marx und Engels
1883 = Tod von Karl Marx
# Lücken
Den Unterschied zwischen geschaffenem Wert und Lohn nennt Marx den ___. :: Mehrwert
These und Antithese ergeben eine ___. :: Synthese
Die besitzlosen Lohnarbeiter nennt Marx das ___. :: Proletariat
`);

GP('g-kol', 'gesch', '🌍', 'Kolonialismus, Imperialismus, Nationalismus', `
# Karten
Kolonialismus = Errichtung von Stützpunkten und Siedlungskolonien in schwächeren Ländern (ab dem 16. Jh.), v. a. durch Spanien, Portugal, Grossbritannien, Frankreich und die Niederlande
Imperialismus = Ausdehnung der Herrschaft eines Staates über andere Länder (lat. imperium = Reich); flächendeckende Eroberung v. a. 1880–1918
Zeitachse des Kolonialismus = Anfänge 1492–1776, Ausbau 1763–1885, Höhepunkt 1885–1919, Umwandlung 1919–1945, Auflösung ab 1945 (1960 «Jahr der Entkolonisierung»)
Scramble for Africa = Wettlauf der europäischen Mächte um die Aufteilung Afrikas (Ende 19. Jh.)
Formelle (direkte) Herrschaft = militärische Eroberung und Einsetzen einer Kolonialregierung (z. B. Afrika, Asien)
Informelle (indirekte) Herrschaft = keine Eroberung, aber Kontrolle über die einheimische Regierung, z. B. wirtschaftlich (China)
Gründe des Imperialismus = Macht, Rohstoffe und Absatzmärkte, Überlegenheitsgefühl, technische und militärische Überlegenheit, Forschungsdrang, Mission
Zivilisatorisches Sendungsbewusstsein = Überlegenheitsgefühl der Europäer: Sie glaubten, andere Völker «zivilisieren» zu müssen
Sozialdarwinismus = Übertragung von Darwins Theorie («der Stärkere überlebt») auf Völker und Gesellschaften – diente zur Rechtfertigung des Imperialismus
Sozialimperialismus = soziale Spannungen im eigenen Land werden durch Kolonien entschärft (z. B. Auswanderung, Ablenkung)
Rassismus = pseudowissenschaftliche Einteilung von Menschen in «höher-» und «minderwertige» Gruppen
Folgen des Kolonialismus = Verlust der kulturellen Identität, Ausbeutung, Sklavenhandel, Ungleichheit, Konflikte durch willkürliche Grenzen
Monroe-Doktrin = 1823, USA: «Amerika den Amerikanern» – Europa soll sich nicht in Amerika einmischen
Dollar-Imperialismus = informeller Imperialismus der USA durch wirtschaftliche Abhängigkeit
«Platz an der Sonne» = Forderung des Deutschen Reiches nach eigenen Kolonien (verspäteter Einstieg ab ca. 1890)
Panslawismus = Idee eines Bundes aller slawischen Völker (Russland)
Schweiz und Kolonialismus = keine Kolonien, aber beteiligt: z. B. Basler Handelsgesellschaft (1859) und «Völkerschauen» (Zürich 1925)
Nation = Gemeinschaft von Menschen mit gemeinsamer Sprache, Kultur, Geschichte oder Religion – eine «gedachte Ordnung»
Nationalismus = Ideologie, die die eigene Nation über andere stellt; Ursprung in Aufklärung sowie Amerikanischer und Französischer Revolution
Nationalstaat = Staat, dessen Grenzen mit einer Nation übereinstimmen; löste im 19. Jh. die alten Reiche ab
Selbstbestimmungsrecht = Recht von Völkern, frei über ihre Staatszugehörigkeit zu entscheiden
Dreibund = Bündnis 1882: Deutsches Reich, Österreich-Ungarn und Italien
Entente cordiale = Verständigung zwischen Grossbritannien und Frankreich ab 1904
# Quiz
Welche Länder begannen ab dem 16. Jahrhundert mit Kolonien? :: Spanien und Portugal | Deutschland und Italien | die Schweiz und Österreich | Japan und die USA
In welcher Zeit erreichte der Imperialismus seinen Höhepunkt? :: ca. 1880–1918 | 1492–1550 | 1945–1960 | 1650–1700
Was bezeichnet der «Scramble for Africa»? :: den Wettlauf um die Aufteilung Afrikas | eine Hungersnot | einen Sklavenaufstand | eine Handelsroute
Welches Jahr gilt als «Jahr der Entkolonisierung»? :: 1960 | 1918 | 1945 | 1848
Was ist Sozialdarwinismus? :: Übertragung von «der Stärkere überlebt» auf Völker | eine Form der Sozialversicherung | eine Bewegung für Arbeiterrechte | eine Lehre über Pflanzen
Was sagt die Monroe-Doktrin? :: Amerika den Amerikanern | Afrika den Europäern | Freihandel für alle | Platz an der Sonne
Welche Forderung erhob das Deutsche Reich? :: einen «Platz an der Sonne» | «Amerika den Amerikanern» | die Kontinentalsperre | den Panslawismus
Was ist eine informelle Herrschaft? :: Kontrolle ohne direkte Eroberung, z. B. wirtschaftlich | militärische Besetzung | Herrschaft eines Königs | eine Demokratie
Welche typischen Merkmale verbinden eine Nation? :: Sprache, Kultur, Geschichte, Religion | nur die Hautfarbe | nur das Geld | nur die Armee
Welche Folge hatte der Kolonialismus NICHT? :: gerechte Grenzen nach den Wünschen der Bevölkerung | Ausbeutung | Sklavenhandel | Verlust der kulturellen Identität
Welche Staaten bildeten 1882 den Dreibund? :: Deutsches Reich, Österreich-Ungarn, Italien | Frankreich, Grossbritannien, Russland | Schweiz, Liechtenstein, Österreich | USA, Japan, China
Hatte die Schweiz eigene Kolonien? :: Nein, aber Schweizer waren am Kolonialismus beteiligt | Ja, in Afrika | Ja, in Südamerika | Ja, in Indien
# Zeit
1492 = Kolumbus erreicht Amerika – Beginn der Kolonialzeit
1823 = Monroe-Doktrin der USA
1859 = Gründung der Basler Handelsgesellschaft
1882 = Dreibund
1885 = Höhepunkt des Imperialismus beginnt («Scramble for Africa»)
1904 = Entente cordiale zwischen Grossbritannien und Frankreich
1914 = Beginn des Ersten Weltkriegs
1960 = Jahr der Entkolonisierung
# Lücken
Den Wettlauf um Afrika nennt man «Scramble for ___». :: Africa/Afrika
Das Deutsche Reich forderte einen «Platz an der ___». :: Sonne
Die Übertragung von Darwins Theorie auf Völker heisst ___. :: Sozialdarwinismus
`);

GP('g-begr', 'gesch', '📚', 'Grundbegriffe (Glossar)', `
# Karten
Ancien Régime = «frühere Regierungsform»: Zeit vor der Französischen Revolution bzw. vor 1798
Autonomie = Selbstständigkeit und Selbstbestimmung von Völkern, Regionen oder Staaten
Balance of power = Gleichgewicht der Mächte in Europa – Prinzip der englischen Aussenpolitik
Bonapartismus = Herrschaftstechnik Napoleons: Modernisierung mit Militär und Bürokratie, aber autoritär
Bürgertum = städtische Kaufleute, Handwerker, später Unternehmer und Gebildete; Träger des Liberalismus
Bürokratie = Verwaltung des Staates durch Beamte nach Gesetzen und Akten
Demokratie = «Herrschaft des Volkes»: Der Wille des Volkes ist ausschlaggebend (direkt oder durch Vertreter)
Depression = wirtschaftliches Tief mit Arbeitslosigkeit, sinkender Produktion und sinkenden Preisen
Diaspora = Menschen einer Religion/Herkunft, die verstreut unter einer anderen Mehrheit leben
Einhegung = Umwandlung von gemeinsam genutztem Land in Privatbesitz der Grossgrundbesitzer (England, 18. Jh.)
Feudalabgaben = Abgaben und Dienste der Bauern an den Grundherrn (z. B. Zehnten, Frondienste)
Freihandel = Handel ohne Zölle und Beschränkungen – Gegenteil von Protektionismus
Freisinn = in der Schweiz Sammelbegriff für die liberalen Strömungen; dominierte ab 1848 die Politik
Gemeine Herrschaft = von mehreren eidgenössischen Orten gemeinsam verwaltetes Untertanengebiet
Grundherrschaft = Ein Grundherr (Adliger, Kloster) besitzt Land; die Bauern bewirtschaften es und sind ihm abgabepflichtig
Hegemonie = Vormachtstellung eines Staates über andere
Heilige Allianz = 1815 Bündnis von Preussen, Österreich und Russland zur Bewahrung der alten Ordnung
Ideologie = festgefügtes System von Ideen und Werten einer Gruppe
Juli-Revolution = Pariser Revolution 1830; Sturz von König Karl X.
Katholisch-Konservative = Gegner der liberalen Ideen; wollten die alte Ordnung und den Einfluss der Kirche bewahren
Klassen = Grossgruppen der Gesellschaft, unterschieden nach Besitz oder Nichtbesitz von Produktionsmitteln
Konkordanzdemokratie = alle wichtigen Parteien sind in der Regierung vertreten (Gegenteil: Konkurrenzdemokratie)
Konjunktur = wiederkehrende Schwankungen der Wirtschaft: Aufschwung, Hochkonjunktur, Abschwung, Tiefstand
Kulturkampf = Konflikt zwischen Staat und katholischer Kirche im 19. Jh. (z. B. um Schulen)
Landsgemeinde = älteste Form der direkten Demokratie: Versammlung der Stimmberechtigten unter freiem Himmel
Liberalismus = Bewegung für die Freiheit des Einzelnen: Freiheitsrechte, Verfassung, Gewaltenteilung, freie Wirtschaft
Mächtegleichgewicht = Gleichgewicht der Staaten, damit keiner die Vorherrschaft erlangt
Manufaktur = vorindustrieller Grossbetrieb mit Handarbeit und Arbeitsteilung
Neutralität = Grundsatz eines Staates, sich nicht an Kriegen zu beteiligen
Öffentliche Meinung = öffentlich geäusserte Ansichten der Bürger; entstand mit der Aufklärung
Partei = organisierte Gruppe politisch Gleichgesinnter, die Einfluss auf die Politik nehmen will
Patriziat = Oberschicht aus einflussreichen Familien, die in den Städten die Regierung stellten
Pazifismus = Bestrebung, Krieg als Mittel der Politik abzuschaffen
Protektionismus = Schutz der eigenen Wirtschaft vor ausländischer Konkurrenz (z. B. durch Zölle)
Protektorat = Schutzherrschaft eines Staates über einen anderen, der nur noch formal unabhängig ist
Radikale = fortschrittlicher Flügel der Liberalen im 19. Jh. in der Schweiz
Rationalismus = Philosophie, die die Vernunft als Quelle aller Erkenntnis sieht
Reform = Verbesserung im Rahmen der bestehenden Ordnung (Gegenteil: Revolution)
Reparationen = Wiedergutmachung von Kriegsschäden an die Sieger
Repräsentative Demokratie = Das Volk wählt Vertreter (Parlament), die für es entscheiden
Restauration = Wiederherstellung früherer Zustände; Epoche 1815–1830/48
Revolution = meist gewaltsamer Umsturz und tiefgreifender Umbau des politischen Systems
Säkularisierung = Trennung von Staat und Kirche; Verweltlichung
Souveränität = höchste und unabhängige Staatsgewalt nach innen und aussen
Splendid Isolation = Bündnislosigkeit Grossbritanniens vor 1900
Staatsräson = Das Wohl des Staates hat Vorrang vor allem anderen (nach Machiavelli)
Stände = gesellschaftliche Gruppen mit eigenen Rechten: Klerus, Adel, Dritter Stand
Tagsatzung = Versammlung der Gesandten der eidgenössischen Orte (Alte Eidgenossenschaft)
Tauner = Kleinbauern mit zu wenig Land, die als Tagelöhner arbeiteten
Utopie = Zukunftsentwurf einer idealen Gesellschaft, der wenig Bezug zur Realität hat
Verfassung = Grundgesetz eines Staates: Regeln der Machtausübung sowie Rechte und Pflichten der Bürger
Wahlrecht = Recht, in regelmässigen Abständen Vertreter zu wählen
Zugewandte Orte = locker mit den 13 Orten der Alten Eidgenossenschaft verbündete Gebiete
Zweibund = Bündnis 1879 zwischen Deutschem Reich und Österreich-Ungarn
# Quiz
Was bedeutet «Ancien Régime»? :: frühere Regierungsform vor der Revolution | neue Republik | Herrschaft Napoleons | Bundesstaat
Was ist das Gegenteil von Freihandel? :: Protektionismus | Merkantilismus | Liberalismus | Kapitalismus
Was ist eine Landsgemeinde? :: eine Versammlung der Stimmberechtigten unter freiem Himmel | ein Landgut des Adels | ein kantonales Gericht | eine Bauernpartei
Was ist der Unterschied zwischen Reform und Revolution? :: Reformen verändern innerhalb der bestehenden Ordnung | Reformen sind immer gewaltsam | Revolutionen sind langsamer | Es gibt keinen Unterschied
Was bedeutet Säkularisierung? :: Trennung von Staat und Kirche | Gründung von Kolonien | Abschaffung des Adels | Einführung von Zöllen
Was ist Souveränität? :: die höchste unabhängige Staatsgewalt | die Neutralität | eine Steuer | ein Bündnis
Was war die Tagsatzung? :: die Versammlung der Gesandten der eidgenössischen Orte | ein Feiertag | ein Gericht in Lausanne | das erste Bundesparlament von 1848
Was bezeichnet «Konkordanzdemokratie»? :: Alle wichtigen Parteien sind in der Regierung | Nur die stärkste Partei regiert | Das Militär regiert | Es gibt keine Parteien
Was ist eine Manufaktur? :: ein vorindustrieller Grossbetrieb mit Handarbeit | eine Fabrik mit Robotern | ein Bauernhof | eine Bank
Was sind Reparationen? :: Wiedergutmachungen für Kriegsschäden | Reparaturen an Strassen | Steuern für Bauern | Löhne für Soldaten
`);
