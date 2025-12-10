import { Theme } from './types';

const FALLBACK_THEMES: Theme[] = [
  {
    id: 'voetbal',
    title: 'Voetbal',
    description: 'Alles over voetbal: spelers, acties en stadionmomenten.',
    questions: [
      { id: 'v1', difficulty: 'easy', prompt: 'Je scoort dit met je voet in het doel. Wat is het?', answer: 'goal', type: 'multiple-choice', choices: ['goal', 'punt', 'score', 'bal'] },
      { id: 'v2', difficulty: 'easy', prompt: 'Hoeveel spelers staan er op het veld per team?', answer: '11', type: 'multiple-choice', choices: ['11', '10', '9', '12'] },
      { id: 'v6', difficulty: 'medium', prompt: 'Welke kleur kaart krijg je bij een ernstige overtreding?', answer: 'rood', type: 'multiple-choice', choices: ['rood', 'geel', 'oranje', 'zwart'] },
      { id: 'v12', difficulty: 'hard', prompt: 'Hoe heet het als je de bal met je hoofd speelt?', answer: 'koppen', type: 'multiple-choice', choices: ['koppen', 'trappen', 'gooien', 'duwen'] }
    ]
  },
  {
    id: 'hockey',
    title: 'Hockey',
    description: 'Vragen over stick, slagen en toernooien.',
    questions: [
      { id: 'h1', difficulty: 'easy', prompt: 'Je slaat de bal met een...', answer: 'stick', type: 'multiple-choice', choices: ['stick', 'racket', 'bat', 'club'] },
      { id: 'h3', difficulty: 'easy', prompt: 'Hoeveel spelers heeft een hockeyteam op het veld?', answer: '11', type: 'multiple-choice', choices: ['11', '10', '9', '12'] },
      { id: 'h7', difficulty: 'medium', prompt: 'Wat is de kleur van het Nederlandse hockeyshirt?', answer: 'oranje', type: 'multiple-choice', choices: ['oranje', 'blauw', 'rood', 'wit'] },
      { id: 'h24', difficulty: 'hard', prompt: 'Welke positie verdedigt het doel?', answer: 'keeper', type: 'multiple-choice', choices: ['keeper', 'verdediger', 'aanvaller', 'middenvelder'] }
    ]
  },
  {
    id: 'muziek',
    title: 'Muziek & Musical',
    description: 'Instrumenten, liedjes en musicaltermen.',
    questions: [
      { id: 'm1', difficulty: 'easy', prompt: 'Een instrument met toetsen dat je vaak in bands hoort.', answer: 'piano', type: 'multiple-choice', choices: ['piano', 'gitaar', 'drum', 'fluit'] },
      { id: 'm2', difficulty: 'easy', prompt: 'Welk instrument heeft snaren en speel je met je vingers?', answer: 'gitaar', type: 'multiple-choice', choices: ['gitaar', 'piano', 'drum', 'trompet'] },
      { id: 'm5', difficulty: 'medium', prompt: 'Bekende musical: "The Phantom of the..."', answer: 'Opera', type: 'multiple-choice', choices: ['Opera', 'Theater', 'Musical', 'Stage'] },
      { id: 'm12', difficulty: 'hard', prompt: 'Hoe heet een groep van vier muzikanten?', answer: 'kwartet', type: 'multiple-choice', choices: ['kwartet', 'trio', 'duo', 'kwintet'] }
    ]
  },
  {
    id: 'scouting',
    title: 'Scouting',
    description: 'Natuur, knopen en kampvuurliedjes.',
    questions: [
      { id: 's1', difficulty: 'easy', prompt: 'Je maakt deze om twee touwen te verbinden...', answer: 'knoop', type: 'multiple-choice', choices: ['knoop', 'lus', 'haak', 'ring'] },
      { id: 's2', difficulty: 'easy', prompt: 'Wat gebruik je om de weg te vinden in het bos?', answer: 'kompas', type: 'multiple-choice', choices: ['kompas', 'kaart', 'telefoon', 'gps'] },
      { id: 's5', difficulty: 'medium', prompt: 'Welke kleur heeft een kompasnaald die naar het noorden wijst?', answer: 'rood', type: 'multiple-choice', choices: ['rood', 'blauw', 'groen', 'geel'] },
      { id: 's12', difficulty: 'hard', prompt: 'Welke richting wijst de zon om 12 uur \'s middags?', answer: 'zuiden', type: 'multiple-choice', choices: ['zuiden', 'noorden', 'oosten', 'westen'] }
    ]
  }
];

export let THEMES: Theme[] = FALLBACK_THEMES;

export const loadThemes = async (): Promise<Theme[]> => {
  try {
    const response = await fetch('./questions.json');
    if (response.ok) {
      const themes = await response.json();
      THEMES = themes;
      return themes;
    }
  } catch (error) {
    console.log('Using fallback themes');
  }
  THEMES = FALLBACK_THEMES;
  return FALLBACK_THEMES;
};

export const saveThemes = async (themes: Theme[]): Promise<boolean> => {
  try {
    const blob = new Blob([JSON.stringify(themes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.json';
    a.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to save themes:', error);
    return false;
  }
};