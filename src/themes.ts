import { Theme } from './types';

export let THEMES: Theme[] = [];

export const loadThemes = async (): Promise<Theme[]> => {
  try {
    const response = await fetch('/questions.json');
    const themes = await response.json();
    THEMES = themes;
    return themes;
  } catch (error) {
    console.error('Failed to load themes:', error);
    return [];
  }
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