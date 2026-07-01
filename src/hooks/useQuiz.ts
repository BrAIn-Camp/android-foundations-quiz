import { useState, useCallback } from 'react';
import type { Question, Difficulty } from '../types/question';

import ch01 from '../data/chapters/ch-01.json';
import ch02 from '../data/chapters/ch-02.json';
import ch03 from '../data/chapters/ch-03.json';
import ch04 from '../data/chapters/ch-04.json';
import ch05 from '../data/chapters/ch-05.json';
import ch06 from '../data/chapters/ch-06.json';
import ch07 from '../data/chapters/ch-07.json';
import ch08 from '../data/chapters/ch-08.json';
import ch09 from '../data/chapters/ch-09.json';
import ch10 from '../data/chapters/ch-10.json';
import ch11 from '../data/chapters/ch-11.json';
import ch12 from '../data/chapters/ch-12.json';
import ch13 from '../data/chapters/ch-13.json';

import relEasy from '../data/relationships/easy.json';
import relModerate from '../data/relationships/moderate.json';
import relDifficult from '../data/relationships/difficult.json';

import vocabSection01 from '../data/vocabulary/section-01.json';
import vocabSection02 from '../data/vocabulary/section-02.json';
import vocabSection03 from '../data/vocabulary/section-03.json';
import vocabSection04 from '../data/vocabulary/section-04.json';
import vocabSection05 from '../data/vocabulary/section-05.json';
import vocabSection06 from '../data/vocabulary/section-06.json';

const QUESTIONS_PER_SESSION = 10;

export const chapterQuestions: Record<string, Question[]> = {
  'ch-01': ch01 as Question[], 'ch-02': ch02 as Question[], 'ch-03': ch03 as Question[],
  'ch-04': ch04 as Question[], 'ch-05': ch05 as Question[], 'ch-06': ch06 as Question[],
  'ch-07': ch07 as Question[], 'ch-08': ch08 as Question[], 'ch-09': ch09 as Question[],
  'ch-10': ch10 as Question[], 'ch-11': ch11 as Question[], 'ch-12': ch12 as Question[],
  'ch-13': ch13 as Question[],
};

const relationshipQuestions: Record<Difficulty, Question[]> = {
  easy: relEasy as Question[],
  moderate: relModerate as Question[],
  difficult: relDifficult as Question[],
};

export const vocabularySectionQuestions: Record<string, Question[]> = {
  'section-01': vocabSection01 as Question[],
  'section-02': vocabSection02 as Question[],
  'section-03': vocabSection03 as Question[],
  'section-04': vocabSection04 as Question[],
  'section-05': vocabSection05 as Question[],
  'section-06': vocabSection06 as Question[],
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface QuizState {
  mode: 'chapter' | 'difficulty' | 'vocabulary';
  chapterId?: string;
  difficulty?: Difficulty;
  vocabSectionId?: string;
  questions: Question[];
  currentIndex: number;
  selectedAnswer: number | null;
  answers: (number | null)[];
  isComplete: boolean;
}

export function useQuiz() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const startChapterQuiz = useCallback((chapterId: string) => {
    const pool = chapterQuestions[chapterId] ?? [];
    const selected = shuffle(pool).slice(0, Math.min(QUESTIONS_PER_SESSION, pool.length));
    setQuizState({
      mode: 'chapter', chapterId, questions: selected,
      currentIndex: 0, selectedAnswer: null,
      answers: new Array(selected.length).fill(null), isComplete: false,
    });
  }, []);

  const startDifficultyQuiz = useCallback((difficulty: Difficulty) => {
    const pool = relationshipQuestions[difficulty];
    const selected = shuffle(pool).slice(0, Math.min(QUESTIONS_PER_SESSION, pool.length));
    setQuizState({
      mode: 'difficulty', difficulty, questions: selected,
      currentIndex: 0, selectedAnswer: null,
      answers: new Array(selected.length).fill(null), isComplete: false,
    });
  }, []);

  const startVocabularySectionQuiz = useCallback((sectionId: string) => {
    const pool = vocabularySectionQuestions[sectionId] ?? [];
    // Sections are a fixed, curated set of 15 unique questions each —
    // shuffle for display order variety, but show all of them (no sampling),
    // so every question in the section is covered every time it's played.
    const selected = shuffle(pool);
    setQuizState({
      mode: 'vocabulary', vocabSectionId: sectionId, questions: selected,
      currentIndex: 0, selectedAnswer: null,
      answers: new Array(selected.length).fill(null), isComplete: false,
    });
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setQuizState(prev => {
      if (!prev || prev.selectedAnswer !== null) return prev;
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentIndex] = answerIndex;
      return { ...prev, selectedAnswer: answerIndex, answers: newAnswers };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setQuizState(prev => {
      if (!prev) return prev;
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.questions.length) {
        return { ...prev, isComplete: true, selectedAnswer: null };
      }
      return { ...prev, currentIndex: nextIndex, selectedAnswer: null };
    });
  }, []);

  const endQuiz = useCallback(() => { setQuizState(null); }, []);

  const getScore = useCallback((): number => {
    if (!quizState) return 0;
    return quizState.answers.reduce<number>((count, answer, i) => {
      return answer === quizState.questions[i].correctIndex ? count + 1 : count;
    }, 0);
  }, [quizState]);

  return {
    quizState,
    startChapterQuiz,
    startDifficultyQuiz,
    startVocabularySectionQuiz,
    selectAnswer,
    nextQuestion,
    endQuiz,
    getScore,
  };
}
