import type { Question, Difficulty } from '../types/question';
import { CHAPTERS } from '../data/chapterList';

interface SessionSummaryProps {
  mode: 'chapter' | 'difficulty';
  chapterId?: string;
  difficulty?: Difficulty;
  questions: Question[];
  answers: (number | null)[];
  onRetry: () => void;
  onChooseNext: () => void;
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  difficult: 'Difficult',
};

const NEXT_DIFFICULTY: Partial<Record<Difficulty, Difficulty>> = {
  easy: 'moderate',
  moderate: 'difficult',
};

export default function SessionSummary({
  mode,
  chapterId,
  difficulty,
  questions,
  answers,
  onRetry,
  onChooseNext,
}: SessionSummaryProps) {
  const total = questions.length;
  const score = answers.reduce<number>((count, answer, i) => {
    return answer === questions[i].correctIndex ? count + 1 : count;
  }, 0);
  const pct = Math.round((score / total) * 100);

  const isChapterMode = mode === 'chapter';
  const passThreshold = isChapterMode ? 80 : 70;
  const passed = pct >= passThreshold;

  const chapter = chapterId ? CHAPTERS.find(c => c.id === chapterId) : undefined;
  const nextChapter = chapter ? CHAPTERS.find(c => c.number === chapter.number + 1) : undefined;
  const nextDifficulty = difficulty ? NEXT_DIFFICULTY[difficulty] : undefined;

  const missed = questions
    .map((q, i) => ({ q, i }))
    .filter(({ i }) => answers[i] !== questions[i].correctIndex);

  const subtitle = isChapterMode
    ? `You scored ${pct}% on Ch ${String(chapter?.number).padStart(2, '0')}: ${chapter?.title}.`
    : `You scored ${pct}% on the ${difficulty ? DIFFICULTY_LABELS[difficulty] : ''} relationship tier.`;

  const retryLabel = isChapterMode ? '🔄 Retry this chapter' : `🔄 Retry ${difficulty ? DIFFICULTY_LABELS[difficulty] : ''}`;

  return (
    <div className="summary-card">
      <div className={`summary-score-ring ${passed ? 'ring-pass' : 'ring-fail'}`}>
        <span className="score-pct">{pct}%</span>
        <span className="score-fraction">{score} / {total}</span>
      </div>

      <h2 className="summary-title">
        {passed ? '🎉 Great work!' : '📚 Keep practicing!'}
      </h2>
      <p className="summary-subtitle">{subtitle}</p>

      {missed.length > 0 && (
        <div className="missed-section">
          <h3 className="missed-title">Relationships to revisit</h3>
          <ul className="missed-list">
            {missed.map(({ q, i }) => (
              <li key={i} className="missed-item">
                <span className="missed-topic">{q.topic}</span>
                <span className="missed-your-answer">
                  You chose: <em>{q.choices[answers[i]!]}</em>
                </span>
                <span className="missed-correct-answer">
                  Correct: <strong>{q.choices[q.correctIndex]}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="summary-actions">
        <button className="btn-secondary" onClick={onRetry}>
          {retryLabel}
        </button>
        {isChapterMode ? (
          passed && nextChapter ? (
            <button className="btn-primary" onClick={onChooseNext}>
              Next: Ch {String(nextChapter.number).padStart(2, '0')} →
            </button>
          ) : (
            <button className="btn-primary" onClick={onChooseNext}>
              Choose Chapter
            </button>
          )
        ) : (
          passed && nextDifficulty ? (
            <button className="btn-primary" onClick={onChooseNext}>
              Next: {DIFFICULTY_LABELS[nextDifficulty]} →
            </button>
          ) : (
            <button className="btn-primary" onClick={onChooseNext}>
              Choose Difficulty
            </button>
          )
        )}
      </div>
    </div>
  );
}
