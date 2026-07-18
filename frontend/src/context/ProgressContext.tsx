import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useLessons } from "./LessonsContext";
import { fetchProgress, saveProgress } from "../services/api";

interface ProgressContextValue {
  completedLessons: Set<number>;
  activeLessonId: number;
  setActiveLessonId: (id: number) => void;
  markLessonComplete: (id: number) => void;
  completedCount: number;
  totalLessons: number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { lessons } = useLessons();
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set()
  );
  const [activeLessonId, setActiveLessonId] = useState(1);

  useEffect(() => {
    if (!user) return;
    fetchProgress(user.id)
      .then((records) => {
        setCompletedLessons(
          new Set(
            records
              .filter((record) => record.completed)
              .map((record) => record.lessonId)
          )
        );
      })
      .catch(() => {
        // The learner can continue locally if the API is temporarily unavailable.
      });
  }, [user]);

  const markLessonComplete = useCallback((id: number) => {
    setCompletedLessons((prev) => new Set([...prev, id]));
    void saveProgress(id, true).catch(() => {
      // Optimistic UI keeps the action responsive; a later session reloads DB state.
    });
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        activeLessonId,
        setActiveLessonId,
        markLessonComplete,
        completedCount: completedLessons.size,
        totalLessons: lessons.length,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
