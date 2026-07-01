import { useState, useCallback } from 'react';
import type { Progress, ChapterProgress, DifficultyProgress, Difficulty } from '../types/question';

const STORAGE_KEY = 'android-foundations-quiz-progress';

const defaultChapter = (): ChapterProgress => ({ bestScore: 0, totalSeen: 0, attempts: 0 });
const defaultTier = (): DifficultyProgress => ({ bestScore: 0, totalSeen: 0, attempts: 0 });

const initialProgress = (): Progress => ({
  chapters: {},
  easy: defaultTier(),
  moderate: defaultTier(),
  difficult: defaultTier(),
  vocabularySections: {},
});

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProgress();
    const parsed = JSON.parse(raw) as Progress;
    if (!parsed.chapters) parsed.chapters = {};
    if (!parsed.easy) parsed.easy = defaultTier();
    if (!parsed.moderate) parsed.moderate = defaultTier();
    if (!parsed.difficult) parsed.difficult = defaultTier();
    if (!parsed.vocabularySections) parsed.vocabularySections = {};
    return parsed;
  } catch {
    return initialProgress();
  }
}

function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* silently ignore */ }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  const recordSession = useCallback((chapterId: string, score: number, total: number) => {
    setProgress(prev => {
      const tier = prev.chapters[chapterId] ?? defaultChapter();
      const updated: Progress = {
        ...prev,
        chapters: {
          ...prev.chapters,
          [chapterId]: {
            bestScore: Math.max(tier.bestScore, score),
            totalSeen: total,
            attempts: tier.attempts + 1,
          },
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const recordDifficultySession = useCallback((difficulty: Difficulty, score: number, total: number) => {
    setProgress(prev => {
      const tier = prev[difficulty];
      const updated: Progress = {
        ...prev,
        [difficulty]: {
          bestScore: Math.max(tier.bestScore, score),
          totalSeen: total,
          attempts: tier.attempts + 1,
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const recordVocabularySectionSession = useCallback((sectionId: string, score: number, total: number) => {
    setProgress(prev => {
      const tier = prev.vocabularySections[sectionId] ?? defaultChapter();
      const updated: Progress = {
        ...prev,
        vocabularySections: {
          ...prev.vocabularySections,
          [sectionId]: {
            bestScore: Math.max(tier.bestScore, score),
            totalSeen: total,
            attempts: tier.attempts + 1,
          },
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = initialProgress();
    saveProgress(fresh);
    setProgress(fresh);
  }, []);

  const isDifficultyUnlocked = useCallback(
    (difficulty: Difficulty): boolean => {
      if (difficulty === 'easy') return true;
      if (difficulty === 'moderate') {
        const { bestScore, totalSeen } = progress.easy;
        return totalSeen > 0 && bestScore / totalSeen >= 0.7;
      }
      const { bestScore, totalSeen } = progress.moderate;
      return totalSeen > 0 && bestScore / totalSeen >= 0.7;
    },
    [progress]
  );

  return {
    progress,
    recordSession,
    recordDifficultySession,
    recordVocabularySectionSession,
    resetProgress,
    isDifficultyUnlocked,
  };
}
