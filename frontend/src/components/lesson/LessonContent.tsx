import { CheckCircle2, Target } from "lucide-react";
import type { Lesson } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { useProgress } from "../../context/ProgressContext";
import { translations } from "../../i18n/translations";
import { LessonDiagram } from "./LessonDiagram";

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const { language } = useLanguage();
  const { completedLessons, markLessonComplete } = useProgress();
  const t = translations[language];
  const isComplete = completedLessons.has(lesson.id);

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-accent-glow text-sm font-mono">$1</code>');
      return (
        <p
          key={i}
          className="text-white/70 leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <div className="rounded-2xl border border-glass-border bg-surface-raised/95 shadow-glass p-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-medium text-accent-glow uppercase tracking-wider">
            {t.currentLesson} {lesson.id}
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            {lesson.title[language]}
          </h2>
          <p className="text-white/50 text-sm mt-1">
            {lesson.description[language]}
          </p>
        </div>
        <button
          onClick={() => markLessonComplete(lesson.id)}
          disabled={isComplete}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isComplete
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-accent/20 text-accent-glow border border-accent/30 hover:bg-accent/30 hover:shadow-glow-sm"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isComplete ? t.completed : t.markComplete}
        </button>
      </div>

      <LessonDiagram type={lesson.diagram} />

      <div className="mt-6">{renderContent(lesson.content[language])}</div>

      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-glass-border">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3">
          <Target className="w-4 h-4 text-accent-glow" />
          {t.objectives}
        </h3>
        <ul className="space-y-2">
          {lesson.objectives[language].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/60">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-xs text-white/40 w-full">{t.tryCommands}</span>
        {lesson.commands.map((cmd) => (
          <code
            key={cmd}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-glass-border text-xs font-mono text-emerald-400"
          >
            {cmd}
          </code>
        ))}
      </div>
    </div>
  );
}
