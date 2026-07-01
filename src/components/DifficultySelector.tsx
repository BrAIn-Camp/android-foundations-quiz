import type { Difficulty, Progress } from '../types/question';

interface DifficultySelectorProps {
  progress: Progress;
  isUnlocked: (d: Difficulty) => boolean;
  onSelect: (d: Difficulty) => void;
  onBack: () => void;
}

const TIERS: { difficulty: Difficulty; label: string; emoji: string; description: string }[] = [
  {
    difficulty: 'easy',
    label: 'Easy',
    emoji: '🟢',
    description: 'The whole system, explained simply — every component, every relationship, in plain language with no jargon required.',
  },
  {
    difficulty: 'moderate',
    label: 'Moderate',
    emoji: '🟡',
    description: 'The same system, using real component names and short flows from an example app — 3 to 5 steps chained together.',
  },
  {
    difficulty: 'difficult',
    label: 'Difficult',
    emoji: '🔴',
    description: 'Full system flows, branching decisions, and architectural judgment calls — the kind of code you\'d review from a real AI-generated app.',
  },
];

function pct(progress: { bestScore: number; totalSeen: number }): number {
  if (progress.totalSeen === 0) return 0;
  return Math.round((progress.bestScore / progress.totalSeen) * 100);
}

export default function DifficultySelector({ progress, isUnlocked, onSelect, onBack }: DifficultySelectorProps) {
  return (
    <div className="module-selector">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2 className="module-title">Choose a Difficulty</h2>
      <p className="module-subtitle">Every tier covers the entire system. Complete 70% to unlock the next depth level.</p>

      <div className="tier-list">
        {TIERS.map(({ difficulty, label, emoji, description }) => {
          const unlocked = isUnlocked(difficulty);
          const prog = progress[difficulty];
          const score = pct(prog);
          const attempted = prog.attempts > 0;

          return (
            <button
              key={difficulty}
              className={`tier-card ${unlocked ? 'tier-unlocked' : 'tier-locked'}`}
              onClick={() => unlocked && onSelect(difficulty)}
              disabled={!unlocked}
            >
              <div className="tier-header">
                <span className="tier-emoji">{emoji}</span>
                <span className="tier-label">{label}</span>
                {!unlocked && <span className="tier-lock">🔒</span>}
                {attempted && unlocked && (
                  <span className={`tier-score ${score >= 70 ? 'score-pass' : 'score-fail'}`}>
                    Best: {score}%
                  </span>
                )}
              </div>
              <p className="tier-description">{description}</p>
              {attempted && (
                <div className="tier-progress-bar">
                  <div className="tier-progress-fill" style={{ width: `${score}%` }} />
                </div>
              )}
              {!unlocked && (
                <p className="tier-unlock-hint">
                  Score 70%+ on {difficulty === 'moderate' ? 'Easy' : 'Moderate'} to unlock
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
