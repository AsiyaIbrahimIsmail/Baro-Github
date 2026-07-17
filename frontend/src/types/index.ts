export type Language = "en" | "so";

export interface Lesson {
  id: number;
  title: { en: string; so: string };
  description: { en: string; so: string };
  content: { en: string; so: string };
  diagram: string;
  objectives: { en: string[]; so: string[] };
  commands: string[];
}

export interface GitCommit {
  id: string;
  hash: string;
  message: string;
  branch: string;
  parentIds: string[];
  timestamp: number;
}

export interface GitBranch {
  name: string;
  commitId: string;
}

export interface GitState {
  initialized: boolean;
  currentBranch: string;
  branches: GitBranch[];
  commits: GitCommit[];
  stagingArea: string[];
  headCommitId: string | null;
}

export interface VirtualFile {
  name: string;
  content: string;
  staged: boolean;
}

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "success";
  text: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Learner";
  currentLanguage: Language;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface SaveLessonInput {
  title: { en: string; so: string };
  description: { en: string; so: string };
  content: { en: string; so: string };
  diagram: string;
  objectives: { en: string[]; so: string[] };
  commands: string[];
  sortOrder: number;
  isPublished: boolean;
}
