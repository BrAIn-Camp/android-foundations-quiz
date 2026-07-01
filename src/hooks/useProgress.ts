import { useState, useCallback } from 'react';
import type { Progress, ChapterProgress } from '../types/question';

const STORAGE_KEY = 'android-foundations-quiz-progress';

const defaultChapter = (): ChapterProgress => ({ bestScore: 0, totalSeen: 0, attempts: 0 });

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { chapters: {} };
    const parsed = JSON.parse(raw) as Progress;
    if (!parsed.chapters) parsed.chapters = {};
    return parsed;
  } catch {
    return { chapters: {} };
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

  const resetProgress = useCallback(() => {
    const fresh: Progress = { chapters: {} };
    saveProgress(fresh);
    setProgress(fresh);
  }, []);

  return { progress, recordSession, resetProgress };
}
