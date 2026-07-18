import {
  BookOpen,
  Languages,
  LogOut,
  Menu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useLessons } from "../../context/LessonsContext";
import { useProgress } from "../../context/ProgressContext";
import { translations } from "../../i18n/translations";
import { ThemeToggle } from "../ui/ThemeToggle";

interface HeaderProps {
  onOpenLessons: () => void;
  onOpenTutor: () => void;
  onOpenAdmin: () => void;
}

export function Header({
  onOpenLessons,
  onOpenTutor,
  onOpenAdmin,
}: HeaderProps) {
  const { user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { lessons } = useLessons();
  const {
    activeLessonId,
    setActiveLessonId,
    completedCount,
    totalLessons,
  } = useProgress();
  const t = translations[language];

  return (
    <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-glass-border bg-surface/60 backdrop-blur-glass">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenLessons}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-glass-border text-white/80"
          title={t.lessons}
          aria-label={t.lessons}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
        <p className="text-xs text-white/40">{t.welcomeBack}</p>
        <p className="text-sm font-medium text-white/80 truncate">
          {completedCount} {t.of} {totalLessons} {t.lessonsCompleted}
        </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <label className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-glass-border text-white/70">
          <BookOpen className="w-4 h-4 shrink-0 text-accent-glow" />
          <span className="sr-only">{t.lessons}</span>
          <select
            value={activeLessonId}
            onChange={(event) => setActiveLessonId(Number(event.target.value))}
            className="w-52 xl:w-64 bg-transparent text-sm text-white outline-none cursor-pointer"
            aria-label={t.lessons}
          >
            {lessons.map((lesson) => (
              <option
                key={lesson.id}
                value={lesson.id}
                className="bg-surface-raised text-white"
              >
                {lesson.id}. {lesson.title[language]}
              </option>
            ))}
          </select>
        </label>

        {user?.role === "Admin" && (
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-sm"
            title="Admin"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden xl:inline">Admin</span>
          </button>
        )}

        <button
          onClick={onOpenTutor}
          className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-xl bg-accent/20 border border-accent/30 text-accent-glow text-sm font-medium hover:bg-accent/30 hover:shadow-glow-sm transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">{t.openTutor}</span>
        </button>

        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-xl bg-white/5 border border-glass-border text-white/80 text-sm font-medium hover:bg-white/10 hover:border-accent/30 transition-all"
          title={language === "en" ? "Switch to Somali" : "Switch to English"}
        >
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{t.languageToggle}</span>
        </button>

        <ThemeToggle />

        <button
          onClick={logout}
          className="p-2 rounded-lg bg-white/5 border border-glass-border text-white/60 hover:text-white"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
