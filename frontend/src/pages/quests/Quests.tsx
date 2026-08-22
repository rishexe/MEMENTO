import "./Quests.css";
import { useEffect, useMemo, useState } from "react";
import { districts, regionProgress, trails, type Trail } from "./data";

const STORAGE_KEY = "memento-sikkim-quest-progress-v1";

function loadProgress(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

export default function App() {
  const [district, setDistrict] = useState("All Sikkim");
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(loadProgress);

  const visibleTrails = useMemo(
    () => district === "All Sikkim" ? trails : trails.filter((trail) => trail.district === district),
    [district]
  );

  const completedQuestCount = completed.size;
  const totalQuestCount = trails.reduce((sum, trail) => sum + trail.quests.length, 0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  }, [completed]);

  useEffect(() => {
    document.body.style.overflow = selectedTrail ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTrail(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedTrail]);

  const toggleQuest = (trailId: number, questId: number) => {
    const key = `${trailId}-${questId}`;
    setCompleted((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const trailCompleted = (trail: Trail) =>
    trail.quests.filter((quest) => completed.has(`${trail.id}-${quest.id}`)).length;

  return (
    <div className="site">
      <section className="hero">
        <div className="sun" />
        <div className="mountains mountains-back" />
        <div className="mountains mountains-mid" />
        <div className="mountains mountains-front" />
        <div className="mountains mountains-dark" />

        <header className="topbar">
          <button className="round-button" aria-label="Back">←</button>
          <div className="brand">
            <strong>SIKKIM</strong>
            <span>UNCHARTED</span>
          </div>
          <button className="avatar" aria-label="Profile">M</button>
        </header>

        <div className="hero-copy">
          <div className="eyebrow"><i /> SIKKIM / REGION-WIDE JOURNEY</div>
          <h1>Sikkim<br /><em>quests.</em></h1>
          <p>Choose a place, follow its trail, and collect the memories hidden across Sikkim.</p>
        </div>

        <div className="stupa" aria-hidden="true">
          <span className="stupa-pole" />
          <span className="stupa-ball" />
          <span className="stupa-roof roof-a" />
          <span className="stupa-roof roof-b" />
          <span className="stupa-body" />
        </div>

        <div className="progress-card">
          <div className="progress-heading">
            <span>Region progress</span>
            <strong>{String(regionProgress.completed).padStart(2, "0")} <small>/ {regionProgress.total}</small></strong>
          </div>
          <div className="progress-track"><span style={{ width: `${(regionProgress.completed / regionProgress.total) * 100}%` }} /></div>
          <p>Every district has a memory waiting for you.</p>
        </div>
      </section>

      <main className="content">
        <div className="heading-row">
          <div>
            <span className="section-kicker">YOUR MEMORIES</span>
            <h2>Choose a trail</h2>
          </div>
          <span className="filter-label">FILTER <b>⌄</b></span>
        </div>

        <div className="filters">
          {districts.map((item) => (
            <button
              key={item}
              className={`pill ${district === item ? "active" : ""}`}
              onClick={() => setDistrict(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="result-row">
          <span>{visibleTrails.length} trails</span>
          <span>{completedQuestCount} / {totalQuestCount} memories collected</span>
        </div>

        <section className="grid">
          {visibleTrails.map((trail) => {
            const done = trailCompleted(trail);
            const percent = (done / trail.quests.length) * 100;

            return (
              <article
                className="trail-card"
                key={trail.id}
                tabIndex={0}
                onClick={() => setSelectedTrail(trail)}
                onKeyDown={(event) => event.key === "Enter" && setSelectedTrail(trail)}
              >
                <div className="card-image" style={{ backgroundImage: `url(${trail.image})` }}>
                  <div className="image-shade" />
                  <span className="count">{done}/{trail.quests.length}</span>

                  <div className="hover-info">
                    <span className="popup-kicker">{trail.district} / {trail.location}</span>
                    <h3>{trail.title}</h3>
                    <p>{trail.teaser}</p>
                    <div className="mini-stats">
                      <div><strong>{trail.distance}</strong><span>distance</span></div>
                      <div><strong>{trail.duration}</strong><span>duration</span></div>
                      <div><strong>{trail.difficulty}</strong><span>level</span></div>
                    </div>
                    <div className="hover-cta">Open memory <span>→</span></div>
                  </div>
                </div>

                <div className="card-body">
                  <span className="location">{trail.district} / {trail.location}</span>
                  <h3>{trail.title}</h3>
                  <p>{trail.teaser}</p>
                  <div className="card-bottom">
                    <div className="small-progress"><span style={{ width: `${percent}%` }} /></div>
                    <button onClick={(event) => { event.stopPropagation(); setSelectedTrail(trail); }}>
                      Open scroll →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <nav className="bottom-nav">
        <button><span>⌂</span><small>Home</small></button>
        <button><span>⌖</span><small>Map</small></button>
        <button className="active"><span>◇</span><small>Quests</small></button>
        <button><span>○</span><small>Profile</small></button>
      </nav>

      {selectedTrail && (
        <div className="quest-overlay" onClick={() => setSelectedTrail(null)}>
          <div className="quest-stage" onClick={(event) => event.stopPropagation()}>
            <button className="quest-close" onClick={() => setSelectedTrail(null)} aria-label="Close">×</button>

            <div className="quest-photo" style={{ backgroundImage: `url(${selectedTrail.image})` }}>
              <div className="quest-photo-shade" />
              <div className="photo-caption">
                <span>{selectedTrail.district} / {selectedTrail.location}</span>
                <strong>{selectedTrail.title}</strong>
              </div>
            </div>

            <div className="scroll-shell">
              <div className="scroll-rod scroll-rod-top"><i /><i /></div>
              <div className="scroll-paper">
                <div className="scroll-kicker">MEMENTO QUEST / {String(selectedTrail.id).padStart(2, "0")}</div>
                <div className="scroll-title-row">
                  <div>
                    <span className="scroll-location">{selectedTrail.location}</span>
                    <h2>{selectedTrail.title}</h2>
                  </div>
                  <div className="seal">M</div>
                </div>

                <p className="scroll-description">{selectedTrail.description}</p>

                <div className="scroll-meta">
                  <span>{selectedTrail.distance}</span>
                  <span>{selectedTrail.duration}</span>
                  <span>{selectedTrail.difficulty}</span>
                </div>

                <div className="scroll-divider" />

                <div className="quest-note">
                  <div className="note-pin" />
                  <span className="note-label">YOUR QUEST</span>
                  <h3>Collect the moments</h3>
                  <p>Complete the small discoveries below. No fighting. Just explore, notice, and remember.</p>
                </div>

                <div className="quest-list">
                  {selectedTrail.quests.map((quest) => {
                    const key = `${selectedTrail.id}-${quest.id}`;
                    const isDone = completed.has(key);

                    return (
                      <button
                        key={quest.id}
                        className={`memory-row ${isDone ? "done" : ""}`}
                        onClick={() => toggleQuest(selectedTrail.id, quest.id)}
                      >
                        <span className="memory-icon">{isDone ? "✓" : String(quest.id).padStart(2, "0")}</span>
                        <span className="memory-copy">
                          <strong>{quest.title}</strong>
                          <small>{quest.description}</small>
                        </span>
                        <span className="memory-reward">+{quest.reward}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="scroll-footer">
                  <span>Tap a memory when you have found it.</span>
                  <strong>{trailCompleted(selectedTrail)} / {selectedTrail.quests.length}</strong>
                </div>
              </div>
              <div className="scroll-rod scroll-rod-bottom"><i /><i /></div>
            </div>

            <aside className="reward-paper">
              <div className="reward-paper-inner">
                <span className="reward-label">MEMENTO</span>
                <h3>{trailCompleted(selectedTrail) === selectedTrail.quests.length ? "Memory kept." : "A trail waiting."}</h3>
                <p>{trailCompleted(selectedTrail) === selectedTrail.quests.length
                  ? "You have completed every clue on this trail."
                  : "Complete the three discoveries and keep this place in your journal."}</p>
                <div className="reward-total">
                  <span>REWARD</span>
                  <strong>+{selectedTrail.quests.reduce((sum, quest) => sum + quest.reward, 0)}</strong>
                </div>
                <div className="reward-progress">
                  <span style={{ width: `${(trailCompleted(selectedTrail) / selectedTrail.quests.length) * 100}%` }} />
                </div>
                <small>{trailCompleted(selectedTrail)} of {selectedTrail.quests.length} memories</small>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}