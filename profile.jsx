// Profile mockup — goo.io/juston

const SUMMARY_TEXT = "Juston is building at the intersection of AI automation, startup strategy, and hands-on craftsmanship, connecting systems, people, and ideas into practical execution.";

function TypedSummary() {
  const [shown, setShown] = React.useState(SUMMARY_TEXT.length);
  const [restarting, setRestarting] = React.useState(false);

  React.useEffect(() => {
    // Print mode: render the full string immediately, no animation.
    if (window.__print) { setShown(SUMMARY_TEXT.length); return; }
    // type once on mount, then sit. Subtle ambient touch only — replays every ~35s.
    let mounted = true;
    let i = 0;
    setShown(0);
    const tick = () => {
      if (!mounted) return;
      i += 1;
      setShown(i);
      if (i < SUMMARY_TEXT.length) {
        setTimeout(tick, 14 + Math.random() * 22);
      } else {
        // pause, then loop
        setTimeout(() => {
          if (!mounted) return;
          setRestarting(true);
          setTimeout(() => {
            if (!mounted) return;
            setRestarting(false);
            i = 0;
            setShown(0);
            tick();
          }, 600);
        }, 28000);
      }
    };
    const start = setTimeout(tick, 700);
    return () => { mounted = false; clearTimeout(start); };
  }, []);

  return (
    <p className="pf-summary">
      <span style={{ opacity: restarting ? 0.3 : 1, transition: 'opacity .4s' }}>
        {SUMMARY_TEXT.slice(0, shown)}
      </span>
      {shown < SUMMARY_TEXT.length && <span className="cursor" />}
    </p>
  );
}

const SUGGESTIONS = [
  "What is Juston building?",
  "What topics does he focus on?",
  "What is he known for?",
  "How can we collaborate?",
];

// Pre-canned responses so the profile feels alive without burning Claude calls
// every page-load. Actual "Ask Goo" calls Claude.
const PRECOOKED = {
  "What is Juston building?":
    "Currently leading Adler, an AI-native operations platform. Also active on the Jefferson Gold Project and a few smaller systems experiments around local AI workflows.",
  "What topics does he focus on?":
    "AI automation, startup operating systems, and hands-on craft: mining, woodworking, and the practical edges of running real-world projects.",
  "What is he known for?":
    "Translating between operators and builders. He turns scattered context into clear systems, then ships them.",
  "How can we collaborate?":
    "Reach out via the contact link below. He's most interested in conversations about AI-native operations, identity, and ambitious infrastructure projects.",
};

function ProfileAsk() {
  const [q, setQ] = React.useState("");
  const [answer, setAnswer] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef(null);

  const submit = async (question) => {
    const text = (question ?? q).trim();
    if (!text) return;
    setQ(text);
    setLoading(true);
    setAnswer(null);

    // pre-canned -> instant. Otherwise call Claude.
    if (PRECOOKED[text]) {
      setTimeout(() => {
        setAnswer(PRECOOKED[text]);
        setLoading(false);
      }, 480);
      return;
    }

    try {
      const reply = await window.claude.complete(
        `You are Goo, an AI-native identity assistant answering as Juston Berg's living profile.
Juston Berg: founder, AI operator, builder. Currently building Adler (AI-native ops platform), exploring AI-native identity graphs, working on the Jefferson Gold Project, learning local AI workflows. Interests: AI automation, startups, systems, mining, woodworking, Reno.
Answer briefly (2–3 sentences max), in a calm, intelligent tone. Never break the fourth wall. If you don't know, say what you'd ask Juston directly.

Question: ${text}`
      );
      setAnswer(reply.trim());
    } catch (e) {
      setAnswer("Couldn't reach Goo right now. Try one of the suggestions above.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pf-ask">
      <div className="pf-section-label">Ask Goo</div>
      <div className="field">
        <svg className="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 L13.5 9.5 L20 12 L13.5 14.5 L12 21 L10.5 14.5 L4 12 L10.5 9.5 Z" />
        </svg>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          placeholder="Ask Goo about Juston…"
        />
        <span className="kbd">↵</span>
      </div>
      <div className="suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="sug" onClick={() => submit(s)}>{s}</button>
        ))}
      </div>
      {(loading || answer) && (
        <div className="answer">
          <div className="who"><span className="d" />Goo</div>
          {loading ? (
            <span className="dots"><i /><i /><i /></span>
          ) : (
            <span>{answer}</span>
          )}
        </div>
      )}
    </div>
  );
}

function ProfileMockup() {
  return (
    <div className="profile fade-up">
      <div className="url-bar">
        <div className="dots"><i /><i /><i /></div>
        <div className="url">
          <span className="lock">⌁ </span>
          goo.io/<b>juston</b>
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div className="body">
        <div className="pf-head">
          <img
            className="pf-avatar"
            src="avatar.jpg"
            alt="Juston Berg"
            style={{ objectFit: 'cover' }}
          />
          <div>
            <div className="pf-name">Juston Berg</div>
            <div className="pf-desc">Founder · AI Operator · Builder</div>
            <div className="pf-live"><i />Live · updated 2h ago</div>
          </div>
        </div>

        <div>
          <div className="pf-section-label">AI Summary</div>
          <TypedSummary />
        </div>

        <div>
          <div className="pf-section-label">Currently</div>
          <div className="pf-current">
            <div className="row"><span className="k">Building</span><span className="v">Adler</span></div>
            <div className="row"><span className="k">Exploring</span><span className="v">AI-native identity graphs</span></div>
            <div className="row"><span className="k">Working on</span><span className="v">Jefferson Gold Project</span></div>
            <div className="row"><span className="k">Learning</span><span className="v">Local AI workflows</span></div>
          </div>
        </div>

        <div>
          <div className="pf-section-label">Identity</div>
          <div className="pf-tags">
            <span className="pf-tag accent">AI Automation</span>
            <span className="pf-tag">Startups</span>
            <span className="pf-tag">Systems</span>
            <span className="pf-tag">Mining</span>
            <span className="pf-tag">Woodworking</span>
            <span className="pf-tag">Reno</span>
          </div>
        </div>

        <div>
          <div className="pf-section-label">Projects</div>
          <div className="pf-links">
            <a className="pf-link" href="#">
              <span>Adler</span>
              <span className="meta">AI ops platform</span>
              <span className="arrow">→</span>
            </a>
            <a className="pf-link" href="#">
              <span>Jefferson Gold</span>
              <span className="meta">Mining · 2024–</span>
              <span className="arrow">→</span>
            </a>
            <a className="pf-link" href="#">
              <span>Field Notes</span>
              <span className="meta">Writing</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <ProfileAsk />
      </div>
    </div>
  );
}

Object.assign(window, { ProfileMockup });
