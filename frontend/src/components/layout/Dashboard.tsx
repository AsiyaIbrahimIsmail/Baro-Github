import { useEffect, useRef, useState } from "react";
import { useLessons } from "../../context/LessonsContext";
import { useProgress } from "../../context/ProgressContext";
import { useGitTerminal } from "../../hooks/useGitTerminal";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { LessonContent } from "../lesson/LessonContent";
import { GitTerminal } from "../terminal/GitTerminal";
import { GitGraph } from "../graph/GitGraph";
import { AiTutorPanel } from "../tutor/AiTutorPanel";

interface DashboardProps {
  onOpenAdmin: () => void;
}

export function Dashboard({ onOpenAdmin }: DashboardProps) {
  const { lessons } = useLessons();
  const { activeLessonId } = useProgress();
  const { gitState, lines, executeCommand } = useGitTerminal();
  const [tutorOpen, setTutorOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const lessonPanelRef = useRef<HTMLDivElement>(null);

  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0];

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    lessonPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeLessonId]);

  return (
    <div className="flex min-h-screen md:h-screen bg-surface md:overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenLessons={() => setSidebarOpen(true)}
          onOpenTutor={() => setTutorOpen(true)}
          onOpenAdmin={onOpenAdmin}
        />

        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto p-4 lg:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-4 lg:gap-6 md:min-h-full">
            <div
              ref={lessonPanelRef}
              className="min-w-0 scroll-mt-4"
            >
              <LessonContent key={activeLesson.id} lesson={activeLesson} />
            </div>

            <div className="min-w-0 flex flex-col gap-4">
              <div className="h-[360px] md:h-[46vh] min-h-[300px]">
                <GitTerminal lines={lines} onCommand={executeCommand} />
              </div>

              <div className="h-[320px] md:h-[40vh] min-h-[250px]">
                <GitGraph gitState={gitState} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <AiTutorPanel
        lesson={activeLesson}
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
      />
    </div>
  );
}
