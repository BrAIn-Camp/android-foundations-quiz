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
        <li>📦 <strong>Ch 1–4</strong> — Project structure, the Manifest, Activity, Compose Bootstrap</li>
        <li>🔄 <strong>Ch 5–7</strong> — Lifecycle, Intents, Coroutines</li>
        <li>⚙️ <strong>Ch 8–10</strong> — Services, BroadcastReceiver, Permissions</li>
        <li>💾 <strong>Ch 11–13</strong> — Data Persistence, System Services, WorkManager</li>
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
