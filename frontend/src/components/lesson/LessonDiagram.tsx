import type { ReactNode } from "react";

interface LessonDiagramProps {
  type: string;
}

export function LessonDiagram({ type }: LessonDiagramProps) {
  const diagrams: Record<string, ReactNode> = {
    repo: (
      <svg viewBox="0 0 400 120" className="w-full h-auto">
        <defs>
          <linearGradient id="repoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect x="20" y="30" width="360" height="70" rx="12" fill="url(#repoGrad)" stroke="#6366f1" strokeOpacity="0.5" />
        <text x="200" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="600">Repository (.git)</text>
        <text x="200" y="78" textAnchor="middle" fill="#94a3b8" fontSize="11">Commits • Branches • History</text>
        <circle cx="60" cy="65" r="8" fill="#6366f1" opacity="0.8" />
        <circle cx="100" cy="65" r="8" fill="#818cf8" opacity="0.8" />
        <circle cx="140" cy="65" r="8" fill="#a78bfa" opacity="0.8" />
      </svg>
    ),
    "init-commit": (
      <svg viewBox="0 0 400 100" className="w-full h-auto">
        <rect x="30" y="35" width="80" height="40" rx="8" fill="#1a1a24" stroke="#6366f1" strokeWidth="1.5" />
        <text x="70" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">Working</text>
        <path d="M110 55 L150 55" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="150" y="35" width="80" height="40" rx="8" fill="#1a1a24" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="190" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">Staging</text>
        <path d="M230 55 L270 55" stroke="#22d3ee" strokeWidth="2" />
        <rect x="270" y="35" width="80" height="40" rx="8" fill="#1a1a24" stroke="#34d399" strokeWidth="1.5" />
        <text x="310" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">Commit</text>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#6366f1" />
          </marker>
        </defs>
      </svg>
    ),
    staging: (
      <svg viewBox="0 0 400 140" className="w-full h-auto">
        <rect x="40" y="20" width="100" height="50" rx="8" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" />
        <text x="90" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="11">Working Dir</text>
        <text x="90" y="90" textAnchor="middle" fill="#64748b" fontSize="9">Edit files</text>
        <rect x="150" y="20" width="100" height="50" rx="8" fill="#22d3ee" fillOpacity="0.15" stroke="#22d3ee" />
        <text x="200" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="11">Staging</text>
        <text x="200" y="90" textAnchor="middle" fill="#64748b" fontSize="9">git add</text>
        <rect x="260" y="20" width="100" height="50" rx="8" fill="#34d399" fillOpacity="0.15" stroke="#34d399" />
        <text x="310" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="11">Repository</text>
        <text x="310" y="90" textAnchor="middle" fill="#64748b" fontSize="9">git commit</text>
        <path d="M140 45 L150 45" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M250 45 L260 45" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    ),
    branching: (
      <svg viewBox="0 0 400 120" className="w-full h-auto">
        <line x1="60" y1="80" x2="340" y2="80" stroke="#6366f1" strokeWidth="3" />
        <circle cx="100" cy="80" r="10" fill="#1a1a24" stroke="#6366f1" strokeWidth="2" />
        <circle cx="200" cy="80" r="10" fill="#1a1a24" stroke="#6366f1" strokeWidth="2" />
        <circle cx="300" cy="80" r="10" fill="#1a1a24" stroke="#6366f1" strokeWidth="2" />
        <path d="M200 80 Q200 30 280 30 L340 30" stroke="#22d3ee" strokeWidth="2" fill="none" />
        <circle cx="340" cy="30" r="8" fill="#1a1a24" stroke="#22d3ee" strokeWidth="2" />
        <text x="200" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">main</text>
        <text x="340" y="20" textAnchor="middle" fill="#22d3ee" fontSize="10">feature</text>
      </svg>
    ),
    merging: (
      <svg viewBox="0 0 400 120" className="w-full h-auto">
        <line x1="60" y1="70" x2="200" y2="70" stroke="#6366f1" strokeWidth="2" />
        <path d="M200 70 Q200 30 260 30 L320 30" stroke="#22d3ee" strokeWidth="2" fill="none" />
        <path d="M320 30 Q280 50 200 70" stroke="#22d3ee" strokeWidth="2" fill="none" strokeDasharray="4" />
        <line x1="200" y1="70" x2="340" y2="70" stroke="#6366f1" strokeWidth="2" />
        <circle cx="200" cy="70" r="12" fill="#34d399" fillOpacity="0.3" stroke="#34d399" strokeWidth="2" />
        <text x="200" y="74" textAnchor="middle" fill="#e2e8f0" fontSize="9">merge</text>
      </svg>
    ),
    pr: (
      <svg viewBox="0 0 400 100" className="w-full h-auto">
        <rect x="40" y="30" width="120" height="45" rx="8" fill="#1a1a24" stroke="#6366f1" />
        <text x="100" y="58" textAnchor="middle" fill="#e2e8f0" fontSize="11">Local Branch</text>
        <path d="M160 52 L220 52" stroke="#94a3b8" strokeWidth="2" />
        <polygon points="220,48 228,52 220,56" fill="#94a3b8" />
        <rect x="230" y="30" width="130" height="45" rx="8" fill="#1a1a24" stroke="#22d3ee" />
        <text x="295" y="52" textAnchor="middle" fill="#e2e8f0" fontSize="11">Pull Request</text>
        <text x="295" y="66" textAnchor="middle" fill="#64748b" fontSize="9">Review → Merge</text>
      </svg>
    ),
  };

  return (
    <div className="rounded-xl bg-black/30 border border-glass-border p-4 my-4">
      {diagrams[type] ?? diagrams.repo}
    </div>
  );
}
