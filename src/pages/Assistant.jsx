import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Volume2, Sparkles, Languages, Wand2 } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { RESOURCES } from "../data/resources";

const SUGGESTIONS = [
  "I need healthcare nearby",
  "Help me understand my housing scheme",
  "Find accessible transport",
  "Explain this in simpler words",
];

function replyFor(text) {
  const t = text.toLowerCase();
  if (t.includes("health")) {
    const matches = RESOURCES.filter((r) => r.category === "Healthcare").slice(0, 2);
    return { text: "I found nearby healthcare resources. The closest one is:", resources: matches };
  }
  if (t.includes("transport") || t.includes("accessible")) {
    const matches = RESOURCES.filter((r) => r.category === "Transportation");
    return { text: "Here's an accessible transport option near you:", resources: matches };
  }
  if (t.includes("housing") || t.includes("scheme")) {
    const matches = RESOURCES.filter((r) => r.category === "Government");
    return { text: "Here's the housing scheme office that can help, along with what to bring:", resources: matches };
  }
  return { text: "I can help with that. Here are a couple of resources that might be relevant:", resources: RESOURCES.slice(0, 2) };
}

export default function Assistant() {
  const { profile, a11y } = useProfile();
  const [messages, setMessages] = useState([
    { role: "ai", text: `Hi, I'm your Inclusa companion. I'm set up for the ${profile?.name?.toLowerCase() || "your"} experience — ask me anything, or tap a suggestion below.` },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: a11y.reduceMotion ? "auto" : "smooth" }); }, [messages, a11y.reduceMotion]);

  const send = (text) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      const r = replyFor(t);
      setMessages((m) => [...m, { role: "ai", ...r }]);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-160px)]">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-9 w-9 rounded-full bg-signature-gradient text-white flex items-center justify-center">
          <Sparkles size={16} />
        </span>
        <div>
          <p className="font-display text-[16px] leading-tight">Inclusive AI Companion</p>
          <p className="text-[12px] text-[var(--color-ink-400)]">Adapted for {profile?.name || "you"}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed ${
                m.role === "user" ? "bg-signature-gradient text-white" : "bg-[var(--color-bg-soft)] text-[var(--color-ink-900)] border border-[var(--color-border)]"
              }`}>
                <p>{m.text}</p>
                {m.resources?.map((r) => (
                  <div key={r.id} className="mt-3 bg-white rounded-xl border border-[var(--color-border)] p-3">
                    <p className="text-[13.5px] font-semibold">{r.name}</p>
                    <p className="text-[12px] text-[var(--color-ink-400)]">{r.distance} · {r.cost} · {r.open ? "Open now" : "Closed"}</p>
                  </div>
                ))}
                {m.role === "ai" && (
                  <div className="flex gap-3 mt-3 text-[12px] font-semibold text-[var(--color-accent-700)]">
                    <button className="hover:underline flex items-center gap-1"><Wand2 size={12} /> Explain more simply</button>
                    <button className="hover:underline flex items-center gap-1"><Volume2 size={12} /> Read aloud</button>
                    <button className="hover:underline flex items-center gap-1"><Languages size={12} /> Translate</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="pt-4">
        <div className="flex gap-2 mb-3 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[12.5px] font-medium px-3 py-1.5 rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent-400)] hover:bg-[var(--color-accent-50)]"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 rounded-2xl border border-[var(--color-border-strong)] px-3 py-2 bg-white">
          <button type="button" aria-label="Speak" className="h-9 w-9 rounded-full flex items-center justify-center text-[var(--color-ink-500)] hover:bg-[var(--color-bg-soft)]">
            <Mic size={18} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Inclusa anything…"
            className="flex-1 bg-transparent outline-none text-[14.5px] py-2"
            aria-label="Message Inclusa"
          />
          <button type="submit" aria-label="Send" className="h-9 w-9 rounded-full bg-signature-gradient text-white flex items-center justify-center">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
