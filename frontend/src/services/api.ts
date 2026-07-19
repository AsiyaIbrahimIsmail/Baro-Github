import type {
  AuthResponse,
  Language,
  Lesson,
  SaveLessonInput,
} from "../types";

const API_BASE = "/api";
const TOKEN_KEY = "baro-git-token";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readError(res: Response): Promise<string> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  return data?.error ?? "Request failed";
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as AuthResponse;
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
  adminCode?: string;
  language: Language;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as AuthResponse;
}

export async function fetchLessons(): Promise<Lesson[]> {
  const res = await fetch(`${API_BASE}/lessons`);
  if (!res.ok) {
    throw new Error("Failed to load lessons");
  }
  return (await res.json()) as Lesson[];
}

export async function createLesson(input: SaveLessonInput): Promise<Lesson> {
  const res = await fetch(`${API_BASE}/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as Lesson;
}

export async function updateLesson(
  id: number,
  input: SaveLessonInput
): Promise<Lesson> {
  const res = await fetch(`${API_BASE}/lessons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as Lesson;
}

export async function deleteLesson(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/lessons/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await readError(res));
}

export async function fetchProgress(userId: string): Promise<
  Array<{ lessonId: number; completed: boolean }>
> {
  const res = await fetch(`${API_BASE}/progress/${userId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as Array<{ lessonId: number; completed: boolean }>;
}

export async function saveProgress(
  lessonId: number,
  completed: boolean
): Promise<void> {
  const res = await fetch(`${API_BASE}/progress`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ lessonId, completed }),
  });
  if (!res.ok) throw new Error(await readError(res));
}

export async function askAiTutor(
  message: string,
  language: Language,
  lessonId: number,
  lessonTitle: string
): Promise<string> {
  const res = await fetch(`${API_BASE}/ai-tutor`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({
      message,
      language,
      lessonId,
      lessonTitle,
    }),
  });

  if (!res.ok) {
    throw new Error(await readError(res));
  }

  const data = (await res.json()) as { reply: string };
  return data.reply;
}
