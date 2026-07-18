import { GitBranch, CheckCircle2, Circle, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useLessons } from "../../context/LessonsContext";
import { useProgress } from "../../context/ProgressContext";
import { translations } from "../../i18n/translations";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language } = useLanguage();
  const { lessons } = useLessons();
  const { activeLessonId, setActiveLessonId, completedLessons, completedCount, totalLessons } =
    useProgress();
  const t = translations[language];

  const progressPercent = (completedCount / totalLessons) * 100;

  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-label="Close lessons"
        />
      )}
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col h-full w-72 max-w-[85vw] shrink-0 border-r border-glass-border bg-surface-raised/95 backdrop-blur-glass transition-transform lg:static lg:z-auto lg:w-64 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5 border-b border-glass-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-accent/30 border border-accent/40 flex items-center justify-center shadow-glow-sm">
            <GitBranch className="w-5 h-5 text-accent-glow" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">{t.appName}</h1>
            <p className="text-[10px] text-white/40 leading-tight">{t.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-lg text-white/60 hover:bg-white/10 lg:hidden"
            aria-label="Close lessons"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-glass-border">
        <div className="flex items-center justify-between text-xs text-white/50 mb-2">
          <span>{t.progress}</span>
          <span>
            {completedCount}/{totalLessons} {t.lessonsCompleted}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-glow transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="px-3 py-2 text-xs font-medium text-white/40 uppercase tracking-wider">
          {t.lessons}
        </p>
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeLessonId;
          const isComplete = completedLessons.has(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => {
                setActiveLessonId(lesson.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                isActive
                  ? "bg-accent/20 text-white border border-accent/40 shadow-glow-sm"
                  : "text-white/60 hover:bg-white/5 hover:text-white/80 border border-transparent"
              }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold shrink-0 ${
                  isActive
                    ? "bg-accent text-on-accent"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {lesson.id}
              </span>
              <span className="flex-1 truncate">{lesson.title[language]}</span>
              {isComplete ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-white/20 shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-glass-border">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-glass-border">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center text-on-accent font-bold text-sm">
            BG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Baro Learner</p>
            <p className="text-xs text-white/40 truncate">learner@baro-git.dev</p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
