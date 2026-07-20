import { useState, type FormEvent } from "react";
import { GitBranch, Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { ThemeToggle } from "../ui/ThemeToggle";

export function AuthPage() {
  const { language } = useLanguage();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register({
          name,
          email,
          password,
          adminCode: adminCode || undefined,
          language,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-[1.1fr_0.9fr] bg-surface">
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <section className="hidden lg:flex flex-col justify-between p-12 border-r border-glass-border bg-surface-raised">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-accent/25 border border-accent/40 grid place-items-center">
            <GitBranch className="w-6 h-6 text-accent-glow" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Baro-Git</h1>
            <p className="text-sm text-white/45">Learn Git by doing</p>
          </div>
        </div>
        <div className="max-w-xl">
          <p className="text-sm font-mono text-emerald-400 mb-4">$ git commit -m "build your future"</p>
          <h2 className="text-4xl font-bold leading-tight">
            Practical Git lessons in English and Somali.
          </h2>
          <p className="mt-5 text-white/55 leading-relaxed">
            Learn with interactive commands, visual commit history, saved progress,
            and an AI tutor that understands your current lesson.
          </p>
        </div>
        <p className="text-xs text-white/30">Baro-Git learning workspace</p>
      </section>

      <section className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <GitBranch className="w-7 h-7 text-accent-glow" />
            <span className="text-xl font-bold">Baro-Git</span>
          </div>
          <h2 className="text-2xl font-bold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-white/45 mt-2">
            {mode === "login"
              ? "Continue your Git learning journey."
              : "Your progress will be saved to your account."}
          </p>

          <div className="grid grid-cols-2 mt-7 mb-6 border-b border-glass-border">
            {(["login", "register"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMode(item);
                  setAdminCode("");
                  setShowAdminCode(false);
                  setError("");
                }}
                className={`py-3 text-sm font-medium border-b-2 ${
                  mode === item
                    ? "border-accent text-white"
                    : "border-transparent text-white/40"
                }`}
              >
                {item === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <Field icon={<User />} label="Name">
                <input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
              </Field>
            )}
            <Field icon={<Mail />} label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field icon={<LockKeyhole />} label="Password">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            </Field>
            {mode === "register" && (
              <div className="space-y-3">
                {showAdminCode ? (
                  <Field icon={<LockKeyhole />} label="Admin code">
                    <input type="password" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} />
                  </Field>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowAdminCode((current) => !current)}
                  className="text-xs text-white/45 hover:text-white transition-colors"
                >
                  {showAdminCode ? "Register as learner instead" : "I have an admin code"}
                </button>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/25 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-accent text-on-accent font-medium hover:bg-accent-muted disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Login" : "Create account"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  children: React.ReactElement<{ className?: string }>;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-white/50 mb-1.5">{label}</span>
      <div className="flex items-center gap-2 h-11 px-3 rounded-lg bg-black/25 border border-glass-border focus-within:border-accent/60">
        <span className="text-white/30 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        <span className="flex-1 [&>input]:w-full [&>input]:bg-transparent [&>input]:outline-none [&>input]:text-sm [&>input]:text-white">
          {children}
        </span>
      </div>
    </label>
  );
}
