import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import api from "../api";

export default function ChatFAB() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history, loading]);

  const send = async () => {
    if (!question.trim()) return;
    const q = question;
    setQuestion("");
    
    // Add user message instantly
    const updatedHistory = [...history, { role: "user", content: q }];
    setHistory(updatedHistory);
    
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/ai-chat/", { question: q, history: updatedHistory });
      setHistory((h) => [...h, { role: "assistant", content: res.data.answer }]);
    } catch (e) {
      setError("Couldn't reach the assistant. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[480px] bg-white rounded-card shadow-editorial border border-outline-variant/20 flex flex-col overflow-hidden z-50"
          >
            <div className="bg-primary px-6 py-4 flex justify-between items-center text-white">
              <div>
                <p className="font-display text-lg leading-none">Pulse Intelligence</p>
                <p className="text-[10px] opacity-70 mt-1 uppercase tracking-widest font-bold">Strategic Assistant</p>
              </div>
              <button onClick={() => setOpen(false)} className="hover:bg-primary-container p-1 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-cream-bg/40">
              {history.length === 0 && (
                <div className="bg-[#F2EEE6] p-4 rounded-xl rounded-tl-none mr-8">
                  <p className="text-sm italic text-on-surface-variant">
                    "Good day. Ask me anything about your workforce data - I'll cite the numbers directly."
                  </p>
                </div>
              )}
              {history.map((turn, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                  className={turn.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <span className={`inline-block px-3.5 py-2.5 rounded-xl text-sm max-w-[85%] leading-relaxed ${
                    turn.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-[#F2EEE6] text-on-surface rounded-tl-none"
                  }`}>
                    {turn.content}
                  </span>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <span className="inline-flex gap-1 px-3.5 py-2.5 rounded-xl bg-[#F2EEE6]">
                    <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
                  </span>
                </div>
              )}
              {error && <p className="text-xs text-error text-center">{error}</p>}
            </div>

            <div className="p-4 border-t border-outline-variant/20 bg-white">
              <div className="relative">
                <input
                  className="w-full bg-cream-bg text-on-surface border border-outline-variant rounded-full px-5 py-3 pr-12 text-sm focus:ring-2 focus:ring-primary/30 focus:border-transparent outline-none transition-shadow"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about recovery potential..."
                />
                <button onClick={send} disabled={loading} className="absolute right-2 top-2 p-2 text-primary disabled:opacity-40">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>,
    document.body
  );
}

function Dot({ delay }) {
  return (
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-outline inline-block"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1, delay }}
    />
  );
}