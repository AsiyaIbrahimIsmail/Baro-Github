import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import * as api from "../services/api";
import type { AuthResponse, AuthUser, Language } from "../types";

const TOKEN_KEY = "baro-git-token";
const USER_KEY = "baro-git-user";

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (input: {
    name: string;
    email: string;
    password: string;
    adminCode?: string;
    language: Language;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): AuthUser | null {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const saveSession = (response: AuthResponse) => {
    // The token authenticates API calls; the user object controls visible UI.
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setUser(response.user);
  };

  const login = async (email: string, password: string) => {
    saveSession(await api.login(email, password));
  };

  const register = async (input: {
    name: string;
    email: string;
    password: string;
    adminCode?: string;
    language: Language;
  }) => {
    saveSession(await api.register(input));
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
