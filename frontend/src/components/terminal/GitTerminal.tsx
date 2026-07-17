import { useRef, useEffect, useState, type KeyboardEvent } from "react";
import { Terminal, ChevronRight } from "lucide-react";
import type { TerminalLine } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

interface GitTerminalProps {
  lines: TerminalLine[];
  onCommand: (cmd: string) => void;
}

export function GitTerminal({ lines, onCommand }: GitTerminalProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCommand(input);
      setInput("");
    }
  };

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-emerald-400";
      case "error":
        return "text-red-400";
      case "success":
        return "text-sky-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-700/60 bg-terminal shadow-glass overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/60 bg-slate-900">
        <Terminal className="w-4 h-4 text-accent-glow" />
        <span className="text-sm font-medium text-terminal-text/80">{t.terminal}</span>
        <div className="ml-auto flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 min-h-[200px] max-h-[280px] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className={`whitespace-pre-wrap ${lineColor(line.type)}`}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-1 text-emerald-400">
          <span>/project $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-emerald-400 caret-emerald-400"
            spellCheck={false}
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-2 border-t border-slate-700/60 bg-slate-900/70">
        <p className="text-xs text-terminal-text/45 flex items-center gap-1">
          <ChevronRight className="w-3 h-3" />
          {t.terminalHint}
        </p>
      </div>
    </div>
  );
}
