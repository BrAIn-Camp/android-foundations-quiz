import type { VocabularySectionInfo, Progress } from '../types/question';
import { VOCAB_SECTIONS } from '../data/vocabularySectionList';

interface VocabularySectionSelectorProps {
  progress: Progress;
  onSelect: (sectionId: string) => void;
  onBack: () => void;
}

function sectionPct(progress: Progress, sectionId: string): number {
  const p = progress.vocabularySections[sectionId];
  if (!p || p.totalSeen === 0) return -1;
  return Math.round((p.bestScore / p.totalSeen) * 100);
}

function statusIcon(pct: number): string {
  if (pct < 0) return '';
  if (pct >= 80) return '✓';
  return '↺';
}

export default function VocabularySectionSelector({ progress, onSelect, onBack }: VocabularySectionSelectorProps) {
  return (
    <div className="chapter-selector">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2 className="module-title">Choose a Vocabulary Section</h2>
      <p className="module-subtitle">
        6 sections, 15 questions each, covering all 45 core terms exactly once — all unlocked, jump in anywhere.
      </p>

      <div className="chapter-grid">
        {VOCAB_SECTIONS.map((s: VocabularySectionInfo) => {
          const pct = sectionPct(progress, s.id);
          const attempted = pct >= 0;
          const passed = pct >= 80;

          return (
            <button
              key={s.id}
              className={`chapter-card ${attempted ? (passed ? 'ch-passed' : 'ch-attempted') : ''}`}
              onClick={() => onSelect(s.id)}
            >
              <div className="ch-card-header">
                <span className="ch-number">Section {String(s.number).padStart(2, '0')}</span>
                {attempted && (
                  <span className={`ch-status ${passed ? 'ch-status-pass' : 'ch-status-try'}`}>
                    {statusIcon(pct)} {pct}%
                  </span>
                )}
              </div>
              <div className="ch-title">{s.title}</div>
              <div className="ch-description">{s.description}</div>
              {attempted && (
                <div className="ch-progress-bar">
                  <div
                    className={`ch-progress-fill ${passed ? 'ch-fill-pass' : 'ch-fill-try'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
