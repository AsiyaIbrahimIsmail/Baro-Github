import type { Language } from "../types";

export interface Translations {
  appName: string;
  tagline: string;
  lessons: string;
  progress: string;
  lessonsCompleted: string;
  of: string;
  profile: string;
  learner: string;
  languageToggle: string;
  currentLesson: string;
  terminal: string;
  terminalHint: string;
  gitGraph: string;
  aiTutor: string;
  askAnything: string;
  send: string;
  thinking: string;
  quickSuggestions: string;
  markComplete: string;
  completed: string;
  objectives: string;
  tryCommands: string;
  openTutor: string;
  closeTutor: string;
  welcomeBack: string;
  noCommits: string;
  branch: string;
  commit: string;
  head: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Baro-Git",
    tagline: "Master Git, one commit at a time",
    lessons: "Lessons",
    progress: "Progress",
    lessonsCompleted: "lessons completed",
    of: "of",
    profile: "Profile",
    learner: "Learner",
    languageToggle: "SO",
    currentLesson: "Current Lesson",
    terminal: "Git Terminal",
    terminalHint: "Try: git init, git add ., git commit -m \"message\", git branch, git checkout",
    gitGraph: "Git Graph",
    aiTutor: "AI Tutor",
    askAnything: "Ask me anything about this lesson...",
    send: "Send",
    thinking: "Thinking...",
    quickSuggestions: "Quick suggestions",
    markComplete: "Mark as complete",
    completed: "Completed",
    objectives: "Learning Objectives",
    tryCommands: "Try these commands",
    openTutor: "Open AI Tutor",
    closeTutor: "Close",
    welcomeBack: "Welcome back",
    noCommits: "No commits yet — run git init to begin",
    branch: "branch",
    commit: "commit",
    head: "HEAD",
  },
  so: {
    appName: "Baro-Git",
    tagline: "Baro Git, hal commit markii",
    lessons: "Casharrada",
    progress: "Horumarka",
    lessonsCompleted: "cashar waa la dhammeeyay",
    of: "ka mid ah",
    profile: "Profile",
    learner: "Arday",
    languageToggle: "EN",
    currentLesson: "Casharka Hadda",
    terminal: "Git Terminal",
    terminalHint: "Isku day: git init, git add ., git commit -m \"farriin\", git branch, git checkout",
    gitGraph: "Git Graph",
    aiTutor: "Macallinka AI",
    askAnything: "Wax kasta oo casharkan ku saabsan i weydii...",
    send: "Dir",
    thinking: "Waan ka fekerayaa...",
    quickSuggestions: "Talooyin degdeg ah",
    markComplete: "U calaamadee dhammaystiran",
    completed: "Waa la dhammeeyay",
    objectives: "Ujeeddooyinka Barashada",
    tryCommands: "Isku day amarradan",
    openTutor: "Fur Macallinka AI",
    closeTutor: "Xir",
    welcomeBack: "Soo dhawoow",
    noCommits: "Weli ma jiraan commits — bilow git init",
    branch: "laan",
    commit: "commit",
    head: "HEAD",
  },
};

export const quickSuggestions: Record<Language, string[]> = {
  en: [
    "What is git stash?",
    "Show branch diagram",
    "Practice exercise",
    "Explain staging area",
  ],
  so: [
    "Waa maxay git stash?",
    "Muuji sawirka laamaha",
    "Layli tababar",
    "Sharax staging area",
  ],
};
