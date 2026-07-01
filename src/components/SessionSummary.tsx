import type { Question } from '../types/question';
import { CHAPTERS } from '../data/chapterList';

interface SessionSummaryProps {
  chapterId: string;
  questions: Question[];
  answers: (number | null)[];
  onRetry: () => void;
  onChooseChapter: () => void;
}

export default function SessionSummary({
  chapterId,
  questions,
  answers,
  onRetry,
  onChooseChapter,
}: SessionSummaryProps) {
  const total = questions.length;
  const score = answers.reduce<number>((count, answer, i) => {
    return answer === questions[i].correctIndex ? count + 1 : count;
  }, 0);
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 80;
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const nextChapter = chapter ? CHAPTERS.find(c => c.number === chapter.number + 1) : undefined;

  const missed = questions
    .map((q, i) => ({ q, i }))
    .filter(({ i }) => answers[i] !== questions[i].correctIndex);

  return (
    <div className="summary-card">
      <div className={`summary-score-ring ${passed ? 'ring-pass' : 'ring-fail'}`}>
        <span className="score-pct">{pct}%</span>
        <span className="score-fraction">{score} / {total}</span>
      </div>

      <h2 className="summary-title">
        {passed ? '🎉 Great work!' : '📚 Keep practicing!'}
      </h2>
      <p className="summary-subtitle">
        You scored {pct}% on Ch {String(chapter?.number).padStart(2, '0')}: {chapter?.title}.
      </p>

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
          🔄 Retry this chapter
        </button>
        {passed && nextChapter ? (
          <button className="btn-primary" onClick={onChooseChapter}>
            Next: Ch {String(nextChapter.number).padStart(2, '0')} →
          </button>
        ) : (
          <button className="btn-primary" onClick={onChooseChapter}>
            Choose Chapter
          </button>
        )}
      </div>
    </div>
  );
}
