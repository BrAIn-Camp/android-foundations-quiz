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
        <li>📖 <strong>By Chapter</strong> — 13 chapters, read code and predict what happens</li>
        <li>🕸️ <strong>By Relationship</strong> — see the whole system, 3 difficulty tiers</li>
        <li>🟢 Easy tier explains everything in plain language, no jargon required</li>
        <li>🔴 Difficult tier covers full branching flows, like reviewing real AI-generated code</li>
      </ul>
      <p className="home-description">
        Every question is about a <strong>relationship</strong> — what depends on what,
        what happens when something changes, why one component needs another — not about
        memorizing syntax. Read the snippet, reason about the relationship, then read a
        detailed explanation tying it back to what you've already learned.
      </p>
      <button className="btn-primary btn-large" onClick={onStart}>
        Start Learning →
      </button>
    </div>
  );
}
