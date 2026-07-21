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
            className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-3 sm:right-4 md:right-6 w-full sm:w-96 max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-3rem)] h-[380px] sm:h-[420px] md:h-[480px] bg-white rounded-card shadow-editorial border border-outline-variant/20 flex flex-col overflow-hidden z-50"
          >
            <div className="bg-primary px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex justify-between items-center text-white shrink-0">
              <div>
                <p className="font-display text-sm sm:text-base md:text-lg leading-none">Pulse Intelligence</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] opacity-70 mt-0.5 sm:mt-1 uppercase tracking-widest font-bold">Strategic Assistant</p>
              </div>
              <button onClick={() => setOpen(false)} className="hover:bg-primary-container p-1 rounded-full transition-colors shrink-0">
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-5 py-3 sm:py-4 space-y-2 sm:space-y-3 bg-cream-bg/40">
              {history.length === 0 && (
                <div className="bg-[#F2EEE6] p-3 sm:p-4 rounded-lg sm:rounded-xl rounded-tl-none mr-4 sm:mr-8">
                  <p className="text-xs sm:text-sm italic text-on-surface-variant">
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
                  <span className={`inline-block px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm max-w-[85%] leading-relaxed ${
                    turn.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-[#F2EEE6] text-on-surface rounded-tl-none"
                  }`}>
                    {turn.content}
                  </span>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <span className="inline-flex gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#F2EEE6]">
                    <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
                  </span>
                </div>
              )}
              {error && <p className="text-[9px] sm:text-xs text-error text-center">{error}</p>}
            </div>

            <div className="p-2.5 sm:p-3 md:p-4 border-t border-outline-variant/20 bg-white shrink-0">
              <div className="relative">
                <input
                  className="w-full bg-cream-bg text-on-surface border border-outline-variant rounded-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 pr-8 sm:pr-10 md:pr-12 text-xs sm:text-sm focus:ring-2 focus:ring-primary/30 focus:border-transparent outline-none transition-shadow"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about recovery..."
                />
                <button onClick={send} disabled={loading} className="absolute right-1.5 sm:right-2.5 md:right-3 top-1.5 sm:top-2.5 md:top-3 p-1 text-primary disabled:opacity-40">
                  <Send size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-3 sm:right-4 md:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50"
      >
        {open ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageCircle size={20} className="sm:w-6 sm:h-6" />}
      </motion.button>
    </>,
    document.body
  );
}

function Dot({ delay }) {
  return (
    <motion.span
      className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-outline inline-block"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1, delay }}
    />
  );
}