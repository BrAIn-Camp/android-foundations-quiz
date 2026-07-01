interface PathSelectorProps {
  onSelectVocabulary: () => void;
  onSelectChapters: () => void;
  onSelectDifficulty: () => void;
  onBack: () => void;
}

export default function PathSelector({
  onSelectVocabulary,
  onSelectChapters,
  onSelectDifficulty,
  onBack,
}: PathSelectorProps) {
  return (
    <div className="path-selector">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2 className="module-title">How do you want to learn?</h2>
      <p className="module-subtitle">Choose a learning path that fits your goal.</p>

      <div className="path-cards">
        <button className="path-card path-card-recommended" onClick={onSelectVocabulary}>
          <span className="path-recommended-badge">Start Here</span>
          <div className="path-icon">🔤</div>
          <div className="path-body">
            <h3 className="path-title">Vocabulary</h3>
            <p className="path-description">
              New to Android development? Start here. Learn the 45 core terms
              you'll see everywhere else in this app — Gradle, ViewModel, Intent,
              Coroutine, and more — across 6 short sections, tested from both directions.
            </p>
            <div className="path-tiers">
              <span className="tier-pip pip-easy">Function</span>
              <span className="tier-pip pip-mod">ViewModel</span>
              <span className="tier-pip pip-hard">WorkManager</span>
            </div>
          </div>
        </button>

        <button className="path-card" onClick={onSelectChapters}>
          <div className="path-icon">📖</div>
          <div className="path-body">
            <h3 className="path-title">By Chapter</h3>
            <p className="path-description">
              Quiz yourself on one specific chapter at a time — read code and
              predict what a component does. All 13 chapters unlocked immediately.
            </p>
            <div className="path-tiers">
              <span className="tier-pip pip-easy">Ch 01 Project Structure</span>
              <span className="tier-pip pip-mod">Ch 07 Coroutines</span>
              <span className="tier-pip pip-hard">Ch 13 WorkManager</span>
            </div>
          </div>
        </button>

        <button className="path-card" onClick={onSelectDifficulty}>
          <div className="path-icon">🕸️</div>
          <div className="path-body">
            <h3 className="path-title">By Relationship</h3>
            <p className="path-description">
              See the whole system at once — how every component depends on,
              triggers, and talks to every other one. Three difficulty tiers,
              each covering the entire app, at increasing depth.
            </p>
            <div className="path-tiers">
              <span className="tier-pip pip-easy">🟢 Easy</span>
              <span className="tier-pip pip-mod">🟡 Moderate</span>
              <span className="tier-pip pip-hard">🔴 Difficult</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
