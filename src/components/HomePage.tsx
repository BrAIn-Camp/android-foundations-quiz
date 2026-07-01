interface HomePageProps {
  onStart: () => void;
}

export default function HomePage({ onStart }: HomePageProps) {
  return (
    <div className="home-page">
      <div className="home-logo">
        <span className="android-icon">🤖</span>
      </div>
      <h1 className="home-title">Android Foundations Reader</h1>
      <p className="home-subtitle">
        Understand how Android's building blocks relate to each other.
      </p>
      <ul className="home-features">
        <li>🔤 <strong>Vocabulary</strong> — new here? Start with the 45 core terms first</li>
        <li>📖 <strong>By Chapter</strong> — 13 chapters, read code and predict what happens</li>
        <li>🕸️ <strong>By Relationship</strong> — see the whole system, 3 difficulty tiers</li>
        <li>🔴 Difficult tier covers full branching flows, like reviewing real AI-generated code</li>
      </ul>
      <p className="home-description">
        If you're new to Android (or new to coding entirely), start with{' '}
        <strong>Vocabulary</strong> — quick, plain-language definitions of terms like
        ViewModel, Gradle, and Intent, tested from both directions. Once the words feel
        familiar, move on to reading real code by chapter, or exploring how every
        component in the system relates to every other one.
      </p>
      <button className="btn-primary btn-large" onClick={onStart}>
        Start Learning →
      </button>
    </div>
  );
}
