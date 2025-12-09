Prompt (kopiëren & plakken)

Maak een speels, veilig en toegankelijk webspel in React (TypeScript) gericht op kinderen van 10–14 jaar. Het spel moet uitnodigende kleuren en een spannend spel-element bevatten. Belangrijkste kenmerken en eisen:

Algemene eisen

Technologie: React + TypeScript (function components + hooks). Één-pagina-app (SPA), responsive (mobiel eerst).

Strak, vriendelijk UI-design met grote knoppen, duidelijke typografie en speelse micro-animaties.

Accessibility: toetsenbord-navigatie, voldoende contrast, alt-tekst voor afbeeldingen.

Geen externe API-keys of externe calls nodig (alles lokaal / statisch).

Speelconcept

Spel voor meerdere korte rondes. In elke ronde kiest de speler eerst een thema: Voetbal, Hockey, Muziek / Musical, Scouting.

Per ronde: speler ziet een korte, spannende hint (tekst + eventueel geluid/animatie). Er is een tijdklok (bijv. 20 seconden) of beperkt aantal pogingen.

Spelmechaniek: speler moet iets raden (woord, persoon, instrument, object, slagzin, etc.) om door te gaan naar de volgende ronde.

Correct raden → volgende ronde + punten + leuke animatie. Fout of tijd op → beperkt aantal levens (bv. 3), of verlies van punten; speler kan hulp (hint) vragen maar verliest dan punten of tijd.

Moeilijkheid bouwt op: latere rondes geven vageres hints of minder tijd.

Eindscore en leaderboard (lokale) + optie om opnieuw te spelen.

UI / kleuren

Uitnodigend en energiek palet (voorbeeld):

Primair: #FF6F61 (warm koraal)

Secundair: #4A90E2 (helder blauw)

Accenten: #FFD166 (warm geel), #6EE7B7 (mint groen)

Achtergrond: zacht crème of lichte gradient

Grote ronde knoppen, speelse iconen, confetti bij winst.

Spannend element

Tijdklok met tikkend geluid (optie aan/uit).

“Mystery box” animatie die hints stap voor stap onthult.

Visuele progress bar voor rondes en leven.

Data / content

Maak een configuratie-object (JSON/TS) met thema’s en per thema meerdere items op drie moeilijkheidsniveaus (easy / medium / hard). Gebruik deze structuur om makkelijk nieuwe thema’s/vragen toe te voegen.

Voorbeeld taken / features

Startscherm: naam invoer, kies thema of ‘random’, start knop.

Ronde view: thema header, hint area (tekst + afbeelding optie), timer, invoerveld of multiple-choice, submit knop, feedback.

Resultaat view: animatie + score update + knop “Volgende ronde” of “Einde spel”.

Instellingen: geluid aan/uit, timerlengte, toegankelijkheidsopties.

Eenvoudige lokale opslag (localStorage) voor highscore.

Test- en ontwikkelnotities

Schrijf duidelijke TypeScript types voor vragen en thema’s.

Voeg unit-tests toe voor de scoring-logica.

Zorg dat afbeeldingen en geluiden optioneel en geoptimaliseerd zijn.

Voorbeeld configuratie (TypeScript / JSON)
// Voorbeeld: themes.ts
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  difficulty: Difficulty;
  prompt: string;        // hinttekst
  answer: string;        // sleutelwoord (case-insensitive)
  type: 'text' | 'image' | 'audio' | 'multiple-choice';
  choices?: string[];    // alleen bij multiple-choice
}

export interface Theme {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export const THEMES: Theme[] = [
  {
    id: 'voetbal',
    title: 'Voetbal',
    description: 'Alles over voetbal: spelers, acties en stadionmomenten.',
    questions: [
      { id: 'v1', difficulty: 'easy', prompt: 'Je scoort dit met je voet in het doel. Wat is het?', answer: 'goal', type: 'text' },
      { id: 'v2', difficulty: 'medium', prompt: 'Nederlandse spits die beroemd is:  → _ _ _ _ _', answer: 'van persie', type: 'text' },
      { id: 'v3', difficulty: 'hard', prompt: 'Dit is de plek waar de fans staan en zingen (eng: supporters stand). Wat is het?', answer: 'tribune', type: 'text' }
    ]
  },
  {
    id: 'hockey',
    title: 'Hockey',
    description: 'Vragen over stick, slagen en toernooien.',
    questions: [
      { id: 'h1', difficulty: 'easy', prompt: 'Je slaat de bal met een ... (woord van 5 letters)', answer: 'stick', type: 'text' },
      { id: 'h2', difficulty: 'medium', prompt: 'In hockey is de ... een kleine cirkel voor het doel (hint: penalty area)', answer: 'schopcirkel', type: 'text' },
      { id: 'h3', difficulty: 'hard', prompt: 'Hoe heet de techniek om de bal omhoog te brengen met de stick?', answer: 'lift', type: 'text' }
    ]
  },
  {
    id: 'muziek',
    title: 'Muziek & Musical',
    description: 'Instrumenten, liedjes en musicaltermen.',
    questions: [
      { id: 'm1', difficulty: 'easy', prompt: 'Een instrument met toetsen dat je vaak in bands hoort.', answer: 'piano', type: 'text' },
      { id: 'm2', difficulty: 'medium', prompt: 'Bekende musical: "The Phantom of the ___". Vul aan.', answer: 'opera', type: 'text' },
      { id: 'm3', difficulty: 'hard', prompt: 'Term voor meerdere tonen tegelijk (akkoord).', answer: 'akkoord', type: 'text' }
    ]
  },
  {
    id: 'scouting',
    title: 'Scouting',
    description: 'Natuur, knopen en kampvuurliedjes.',
    questions: [
      { id: 's1', difficulty: 'easy', prompt: 'Je maakt deze om twee touwen te verbinden: een ...', answer: 'knoop', type: 'text' },
      { id: 's2', difficulty: 'medium', prompt: 'Welke kleur heeft een kompasnaald die naar het noorden wijst?', answer: 'rood', type: 'text' },
      { id: 's3', difficulty: 'hard', prompt: 'Hoe noem je het wassen en drogen van spullen met zon en wind (tactiek op kamp)?', answer: 'drogen', type: 'text' }
    ]
  }
];

UX / flow in 6 stappen (kort)

Welkom → naam + thema kiezen (of random).

Ronde start → hint + timer (20s).

Speler raadt (tekstinvoer of keuze).

Direct feedback: correct → confetti + +10 punten; fout → animatie + leven −1.

Volgende ronde of einde (na 3 rondes of 0 levens).

Scorebord + “Speel opnieuw”.
Can you read