export type Difficulty = 'easy' | 'moderate' | 'difficult';

export interface Explanation {
  summary: string;
  lineByLine: string[];
  tip: string;
}

export interface Question {
  id: string;
  topic: string;
  difficulty: Difficulty;
  chapter?: string;
  snippet?: string;
  snippetLang?: 'kotlin' | 'xml' | 'markup' | 'diagram';
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: Explanation;
}

export interface ChapterInfo {
  id: string;
  number: number;
  title: string;
  folder: string;
  description: string;
}

export interface ChapterProgress {
  bestScore: number;
  totalSeen: number;
  attempts: number;
}

export interface DifficultyProgress {
  bestScore: number;
  totalSeen: number;
  attempts: number;
}

export interface Progress {
  chapters: Record<string, ChapterProgress>;
  easy: DifficultyProgress;
  moderate: DifficultyProgress;
  difficult: DifficultyProgress;
  vocabulary: ChapterProgress;
}
