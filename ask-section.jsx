// Big "Ask Goo" conversation section — animated conversation
// scripted, looping, slow

const CONVO = [
  { who: 'you',  text: "What is Juston working on right now?" },
  { who: 'goo',  text: "He's leading Adler, an AI-native operations platform, while exploring identity graphs as a side thread. Mining at Jefferson Gold continues in parallel." },
  { who: 'you',  text: "Is he the right person to talk to about local AI workflows?" },
  { who: 'goo',  text: "Yes. He's been deep in local model orchestration for the last few months and writes about it publicly. A short note over email is the best first step." },
];

function AskConversation() {
  const [shown, setShown] = React.useState(0);
  const ref = React.useRef(null);

  // Reveal one message at a time once the section is in view, then idle.
  React.useEffect(() => {
    if (!ref.current) return;
    // Print mode: reveal the entire thread, skip timing.
    if (window.__print) { setShown(CONVO.length); return; }
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          let i = 0;
          const step = () => {
            i += 1;
            setShown(i);
            if (i < CONVO.length) setTimeout(step, 1300);
          };
          setTimeout(step, 400);
        }
      });
    }, { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="ask-thread" ref={ref}>
      {CONVO.slice(0, shown).map((m, i) => (
        <div
          key={i}
          className={`ask-msg ${m.who}`}
          style={{ animation: 'askIn .55s ease both' }}
        >
          {m.who === 'goo' && <div className="who"><span className="d" />Goo</div>}
          <span>{m.text}</span>
        </div>
      ))}
      {shown > 0 && shown < CONVO.length && (
        <div className="ask-msg goo" style={{ opacity: .55 }}>
          <span className="dots-typing">
            <i style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.5)', marginRight:4, animation:'dot 1.2s infinite' }} />
            <i style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.5)', marginRight:4, animation:'dot 1.2s .15s infinite' }} />
            <i style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'rgba(255,255,255,.5)', animation:'dot 1.2s .3s infinite' }} />
          </span>
        </div>
      )}
      <style>{`
        @keyframes askIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { AskConversation });
