// Main app — landing page assembly

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "sage",
  "density": "regular",
  "type": "sans",
  "h1": "living"
} /*EDITMODE-END*/;

const ACCENTS = {
  sage: { c: 'oklch(0.62 0.07 165)', soft: 'oklch(0.62 0.07 165 / 0.10)', ink: 'oklch(0.42 0.06 165)' },
  amber: { c: 'oklch(0.66 0.10 65)', soft: 'oklch(0.66 0.10 65 / 0.12)', ink: 'oklch(0.42 0.08 60)' },
  indigo: { c: 'oklch(0.58 0.09 265)', soft: 'oklch(0.58 0.09 265 / 0.10)', ink: 'oklch(0.38 0.07 265)' },
  ink: { c: 'oklch(0.22 0.01 80)', soft: 'oklch(0.22 0.01 80 / 0.08)', ink: 'oklch(0.18 0.01 80)' }
};

const H1_VARIANTS = {
  living: ["Your", <span className="ital" key="i" style={{ textAlign: "left", letterSpacing: "3.9px", padding: "0px 0px 0px 10px" }}>living</span>, " profile."],
  identity: ["Your identity", <span className="ital" key="i">graph</span>, "."],
  one: ["One profile,", <br key="b" />, "always ", <span className="ital" key="i">current</span>, "."]
};

function useScrolled(threshold = 8) {
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const on = () => setV(window.scrollY > threshold);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [threshold]);
  return v;
}

function useFadeUp() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const scrolled = useScrolled();
  return (
    <nav className={scrolled ? 'top scrolled' : 'top'}>
      <div className="shell row">
        <a className="logo" href="#top">
          <span className="mark" />
          <span>Goo</span>
        </a>
        <div className="links">
          <a href="#how">How it works</a>
          <a href="#ask">Ask Goo</a>
          <a className="cta" href="#cta">Join early access</a>
        </div>
      </div>
    </nav>);

}

function Hero({ h1Variant }) {
  return (
    <section id="top" className="hero">
      <div className="shell">
        <div className="hero-grid">
          <div className="fade-up in">
            <div className="eyebrow"><span className="dot" />Goo · AI-native identity</div>
            <h1 style={{ marginTop: 24 }}>{H1_VARIANTS[h1Variant]}</h1>
            <p className="sub">
              A profile that stays current. Goo turns the work you're already doing into a living page, built for people and for the AI systems acting on their behalf.
            </p>
            <div className="actions">
              <button className="btn-primary" onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}>
                Join Early Access
                <span className="arrow">→</span>
              </button>
              <a className="btn-ghost" href="#how">
                See how it works
              </a>
            </div>
            <div className="meta-row">
              <span><span className="tick" />Private beta · 2026</span>
              <span>For humans &amp; agents</span>
            </div>
          </div>
          <div>
            <ProfileMockup />
          </div>
        </div>
      </div>
    </section>);

}

const PROBLEMS = [
{ n: '01', t: "LinkedIn reads like a résumé.", p: "It tells people who you were, not who you are." },
{ n: '02', t: "Link-in-bio is just buttons.", p: "A list of links can't carry context." },
{ n: '03', t: "Personal sites go stale.", p: "Most of the web's bios were last touched years ago." },
{ n: '04', t: "You live across thirty surfaces.", p: "None of them know each other. None of them know you." }];


function Problem() {
  return (
    <section id="problem" className="block">
      <div className="shell">
        <div className="section-head">
          <div className="title-block">
            <div className="eyebrow"><span className="dot" />Today</div>
            <h2 style={{ marginTop: 20 }}>The internet remembers who you were.  Not who you are now. </h2>
          </div>
          <p className="lede">
            You ship more, change faster, and care about different things every month. Your profile hasn't kept up.
          </p>
        </div>

        <div className="problem-grid fade-up">
          {PROBLEMS.map((c) =>
          <div className="problem-cell" key={c.n}>
              <span className="num">{c.n}</span>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
            </div>
          )}
        </div>

        <p className="problem-pullquote fade-up">
          Your profile should move <em>as fast as you do.</em>
        </p>
      </div>
    </section>);

}

function HowItWorks() {
  return (
    <section id="how" className="block">
      <div className="shell">
        <div className="section-head">
          <div className="title-block">
            <div className="eyebrow"><span className="dot" />How it works</div>
            <h2 style={{ marginTop: 20 }}>Three quiet steps. One living profile.</h2>
          </div>
          <p className="lede">
            Goo doesn't ask you to write a bio. It listens to the work you're already doing.
          </p>
        </div>

        <div className="steps">
          <div className="step fade-up">
            <span className="step-num">01 · Connect</span>
            <h3>Bring what you already have.</h3>
            <p>Links, projects, current focus. No fresh résumé required.</p>
            <div className="visual viz-connect">
              <div className="chip"><i />github.com/mira</div>
              <div className="chip"><i />instagram.com/mira</div>
              <div className="chip"><i />linkedin.com/in/mira</div>
              <div className="chip" style={{ opacity: .5 }}><i style={{ background: 'transparent', borderStyle: 'dashed' }} />+ add source</div>
            </div>
          </div>

          <div className="step fade-up">
            <span className="step-num">02 · Synthesize</span>
            <h3>An identity, organized.</h3>
            <p>Goo turns scattered context into a coherent profile that updates itself.</p>
            <div className="visual viz-synth">
              <div className="ln a" />
              <div className="ln b" />
              <div className="ln c" />
              <div className="ln d" />
              <div className="ln e" />
            </div>
          </div>

          <div className="step fade-up">
            <span className="step-num">03 · Share</span>
            <h3>One link. Two audiences.</h3>
            <p>People see a beautiful page. AI agents see structured context. Same profile, two readings.</p>
            <div className="visual viz-share">
              <div className="node you">goo.io/you</div>
              <div className="node">human</div>
              <div className="node ai">agent</div>
              <div className="node">recruiter</div>
              <div className="node ai">research bot</div>
              <div className="node">friend</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function AskSection() {
  return (
    <section id="ask" className="block">
      <div className="shell">
        <div className="ask-canvas fade-up">
          <div className="eyebrow"><span className="dot" />Conversational identity</div>
          <h2>Ask Goo <span className="ital">anything</span> about someone.</h2>
          <p className="lede">
            Skip reading the page. Ask a question, and Goo answers from the live profile.
          </p>
          <AskConversation />
        </div>
      </div>
    </section>);

}

const PERSONA_OPTIONS = [
  { value: 'founder', label: 'Founder' },
  { value: 'operator', label: 'Operator' },
  { value: 'creator', label: 'Creator' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'investor', label: 'Investor' },
  { value: 'other', label: 'Other' }
];

const encodeForm = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

function SignupForm() {
  const [email, setEmail] = React.useState('');
  const [persona, setPersona] = React.useState('');
  const [botField, setBotField] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | submitting | success | error
  const [error, setError] = React.useState('');

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!persona) {
      setError('Pick the option that fits best.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({
          'form-name': 'early-access',
          'bot-field': botField,
          email,
          persona
        })
      });
      if (!res.ok) throw new Error('Network response was not ok');
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'sign_up', {
          method: 'netlify_form',
          persona: persona || 'not_specified'
        });
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again in a moment.');
    }
  };

  if (status === 'success') {
    return (
      <div className="signup-success fade-up in" role="status" aria-live="polite">
        <span className="signup-check">✓</span>
        <p>You’re on the list. We’ll be in touch.</p>
      </div>
    );
  }

  return (
    <form
      name="early-access"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="signup-form fade-up in"
      onSubmit={onSubmit}
      noValidate
    >
      <input type="hidden" name="form-name" value="early-access" />
      <p className="signup-honeypot" aria-hidden="true">
        <label>
          Don’t fill this out if you’re human:
          <input
            name="bot-field"
            tabIndex="-1"
            autoComplete="off"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
          />
        </label>
      </p>

      <div className="signup-fields">
        <input
          type="email"
          name="email"
          required
          placeholder="Email (required)"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting'}
        />
        <select
          name="persona"
          required
          aria-label="What best describes you?"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          disabled={status === 'submitting'}
        >
          <option value="" disabled>I’m a… (required)</option>
          {PERSONA_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Join Early Access'}
          <span className="arrow">→</span>
        </button>
      </div>

      {error && <p className="signup-error" role="alert">{error}</p>}
    </form>
  );
}

function FinalCTA() {
  return (
    <section id="cta" className="final">
      <div className="shell">
        <div className="eyebrow fade-up" style={{ justifyContent: 'center', display: 'flex' }}>
          <span><span className="dot" />Early access · Summer 2026</span>
        </div>
        <h2 className="fade-up" style={{ marginTop: 24 }}>
          Create your <span className="ital">living</span> profile.
        </h2>
        <p className="sub fade-up">
          Spend ten minutes once. Let Goo keep up with the rest.
        </p>
        <SignupForm />
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
          <a className="btn-ghost" href="#top">Back to top</a>
        </div>
      </div>
    </section>);
}

function Footer() {
  return (
    <footer>
      <div className="shell row">
        <div className="logo"><span className="mark" /><span>Goo</span></div>
        <div className="links">
          <a href="#how">How it works</a>
          <a href="#cta">Early access</a>
          <a href="#">Privacy</a>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
          © 2026 · Goo
        </div>
      </div>
    </footer>);

}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useFadeUp();

  // The Tweaks panel is hidden in production. To toggle the panel for
  // design iteration, append `?tweaks=1` to the URL (e.g. /?tweaks=1).
  const showTweaks =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('tweaks') === '1';

  // Apply tweakable tokens as CSS variables on the document root
  React.useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS.sage;
    document.documentElement.style.setProperty('--accent', a.c);
    document.documentElement.style.setProperty('--accent-soft', a.soft);
    document.documentElement.style.setProperty('--accent-ink', a.ink);
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.type = t.type;
  }, [t.accent, t.density, t.type]);

  return (
    <>
      <Nav />
      <Hero h1Variant={t.h1} />
      <Problem />
      <HowItWorks />
      <AskSection />
      <FinalCTA />
      <Footer />

      {showTweaks && <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor
          label="Accent"
          value={t.accent === 'sage' ? '#7BA189' : t.accent === 'amber' ? '#C68E4A' : t.accent === 'indigo' ? '#6C7AC9' : '#2C2A26'}
          options={['#7BA189', '#C68E4A', '#6C7AC9', '#2C2A26']}
          onChange={(v) => {
            const map = { '#7BA189': 'sage', '#C68E4A': 'amber', '#6C7AC9': 'indigo', '#2C2A26': 'ink' };
            setTweak('accent', map[v.toLowerCase()] || map[v] || 'sage');
          }} />
        
        <TweakSection label="Headline" />
        <TweakRadio
          label="H1 variant"
          value={t.h1}
          options={[
          { value: 'living', label: 'Living' },
          { value: 'identity', label: 'Graph' },
          { value: 'one', label: 'Current' }]
          }
          onChange={(v) => setTweak('h1', v)} />
        
        <TweakSection label="Composition" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={[
          { value: 'compact', label: 'Compact' },
          { value: 'regular', label: 'Regular' },
          { value: 'spacious', label: 'Spacious' }]
          }
          onChange={(v) => setTweak('density', v)} />
        
        <TweakRadio
          label="Display type"
          value={t.type}
          options={[
          { value: 'sans', label: 'Sans' },
          { value: 'serif-display', label: 'Serif' },
          { value: 'mono-display', label: 'Mono' }]
          }
          onChange={(v) => setTweak('type', v)} />
        
      </TweaksPanel>}
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);