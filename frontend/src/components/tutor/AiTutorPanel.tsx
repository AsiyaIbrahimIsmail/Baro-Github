import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  X,
  Send,
  Loader2,
} from "lucide-react";
import type { Lesson, ChatMessage } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { translations, quickSuggestions } from "../../i18n/translations";
import { askAiTutor } from "../../services/api";

interface AiTutorPanelProps {
  lesson: Lesson;
  isOpen: boolean;
  onClose: () => void;
}

export function AiTutorPanel({ lesson, isOpen, onClose }: AiTutorPanelProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askAiTutor(
        text.trim(),
        language,
        lesson.id,
        lesson.title[language]
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: "ai",
          text: reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          sender: "ai",
          text:
            error instanceof Error
              ? error.message
              : language === "so"
                ? "AI Tutor-ka lama xiriiri karo."
                : "Could not reach the AI Tutor.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      <aside className="fixed right-0 top-0 h-full w-full sm:w-[400px] z-50 flex flex-col border-l border-glass-border bg-surface-raised/95 backdrop-blur-glass shadow-glass animate-fade-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-glass-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-glow" />
            <h3 className="font-semibold text-white">{t.aiTutor}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-3">
                <BookOpen className="w-7 h-7 text-accent-glow" />
              </div>
              <p className="text-sm text-white/50">
                {lesson.title[language]}
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-accent/30 text-white border border-accent/40 rounded-br-md"
                    : "bg-white/5 text-white/80 border border-glass-border rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.thinking}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-glass-border space-y-3">
          <p className="text-xs text-white/40">{t.quickSuggestions}</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions[language].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                disabled={loading}
                className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-glass-border text-white/60 hover:bg-accent/20 hover:text-accent-glow hover:border-accent/30 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={t.askAnything}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-glass-border text-white text-sm placeholder:text-white/30 outline-none focus:border-accent/50 focus:shadow-glow-sm transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-accent text-on-accent hover:bg-accent-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-glow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
