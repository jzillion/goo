// Profile mockup — goo.io/mira

const SUMMARY_TEXT = "Mira is building at the intersection of AI-driven biotechnology, computational systems, and human-centered design, translating complex science into practical tools that improve health and longevity.";

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
  "What is Mira building?",
  "What is she known for?",
  "How does she think about AI and biology?",
  "How can we collaborate?",
];

// Pre-canned responses so the profile feels alive without burning Claude calls
// every page-load. Actual "Ask Goo" calls Claude.
const PRECOOKED = {
  "What is Mira building?":
    "She's building Aurelium Bio, an AI-enabled biotech platform focused on adaptive therapeutics. Synapse Atlas, her open mapping of biological intelligence, runs in parallel.",
  "What is she known for?":
    "Translating dense biotech research into systems people can actually use. Mira is known in AI-bio circles for her work on biological mapping and her writing on consciousness.",
  "How does she think about AI and biology?":
    "As two halves of the same system. She treats AI as a tool for sensing and mapping biology, not for replacing it, and believes the most interesting work is at the interface of the two.",
  "How can we collaborate?":
    "Mira works closely with researchers, designers, and operators across biotech and AI. A short note about what you're working on is the best first step.",
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
        `You are Goo, an AI-native identity assistant answering as Mira Vale's living profile.
Mira Vale: founder, biotech operator, systems thinker. Currently building Aurelium Bio (AI-enabled biotech platform), exploring AI-native biological mapping systems, working on an adaptive therapeutics platform, learning philosophy of consciousness and decentralized AI systems. Interests: biotech, AI, longevity, philosophy, neuroscience, San Francisco.
Answer briefly (2–3 sentences max), in a calm, intelligent tone. Never break the fourth wall. If you don't know, say what you'd ask Mira directly.

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
          placeholder="Ask Goo about Mira…"
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
          goo.io/<b>mira</b>
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div className="body">
        <div className="pf-head">
          <img
            className="pf-avatar"
            src="avatar.jpg"
            alt="Mira Vale"
            style={{ objectFit: 'cover' }}
          />
          <div>
            <div className="pf-name">Mira Vale</div>
            <div className="pf-desc">Founder · Biotech Operator · Systems Thinker</div>
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
            <div className="row"><span className="k">Building</span><span className="v">Aurelium Bio</span></div>
            <div className="row"><span className="k">Exploring</span><span className="v">AI-native biological mapping systems</span></div>
            <div className="row"><span className="k">Working on</span><span className="v">Adaptive therapeutics platform</span></div>
            <div className="row"><span className="k">Learning</span><span className="v">Philosophy of consciousness & decentralized AI systems</span></div>
          </div>
        </div>

        <div>
          <div className="pf-section-label">Identity</div>
          <div className="pf-tags">
            <span className="pf-tag accent">Biotech</span>
            <span className="pf-tag">AI</span>
            <span className="pf-tag">Longevity</span>
            <span className="pf-tag">Philosophy</span>
            <span className="pf-tag">Neuroscience</span>
            <span className="pf-tag">San Francisco</span>
          </div>
        </div>

        <div>
          <div className="pf-section-label">Projects</div>
          <div className="pf-links">
            <a className="pf-link" href="#">
              <span>Aurelium Bio</span>
              <span className="meta">AI-enabled biotech platform</span>
              <span className="arrow">→</span>
            </a>
            <a className="pf-link" href="#">
              <span>Synapse Atlas</span>
              <span className="meta">Biological intelligence mapping · 2025–</span>
              <span className="arrow">→</span>
            </a>
            <a className="pf-link" href="#">
              <span>Field Notes</span>
              <span className="meta">Writing & research</span>
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
