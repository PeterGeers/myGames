export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  difficulty: Difficulty;
  prompt: string;
  answer: string;
  type: 'text' | 'image' | 'audio' | 'multiple-choice';
  choices?: string[];
}

export interface Theme {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface GameState {
  playerName: string;
  selectedTheme: string;
  currentRound: number;
  score: number;
  lives: number;
  timeLeft: number;
  gamePhase: 'welcome' | 'playing' | 'feedback' | 'gameover';
}