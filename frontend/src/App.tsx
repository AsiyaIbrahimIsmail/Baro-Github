import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ProgressProvider } from "./context/ProgressContext";
import { LessonsProvider } from "./context/LessonsContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Dashboard } from "./components/layout/Dashboard";
import { AuthPage } from "./components/auth/AuthPage";
import { AdminPage } from "./components/admin/AdminPage";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </LanguageProvider>
  );
}

function AuthenticatedApp() {
  const { user } = useAuth();
  const [adminOpen, setAdminOpen] = useState(false);

  if (!user) return <AuthPage />;

  return (
    <LessonsProvider>
      {adminOpen && user.role === "Admin" ? (
        <AdminPage onClose={() => setAdminOpen(false)} />
      ) : (
        <ProgressProvider>
          <Dashboard onOpenAdmin={() => setAdminOpen(true)} />
        </ProgressProvider>
      )}
    </LessonsProvider>
  );
}

export default App;
