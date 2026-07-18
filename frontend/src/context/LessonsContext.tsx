import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { lessons as fallbackLessons } from "../data/lessons";
import { fetchLessons } from "../services/api";
import type { Lesson } from "../types";

interface LessonsContextValue {
  lessons: Lesson[];
  loading: boolean;
  source: "database" | "file";
  reload: () => Promise<void>;
}

const LessonsContext = createContext<LessonsContextValue | null>(null);

export function LessonsProvider({ children }: { children: ReactNode }) {
  const [lessons, setLessons] = useState(fallbackLessons);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"database" | "file">("file");

  const reload = async () => {
    setLoading(true);
    return fetchLessons()
      .then((databaseLessons) => {
        if (databaseLessons.length > 0) {
          setLessons(databaseLessons);
          setSource("database");
        }
      })
      .catch(() => {
        // Static lessons keep the learning experience available offline.
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    void reload();
    // Lessons are loaded once when the authenticated application starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LessonsContext.Provider value={{ lessons, loading, source, reload }}>
      {children}
    </LessonsContext.Provider>
  );
}

export function useLessons() {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error("useLessons must be used within LessonsProvider");
  }
  return context;
}
