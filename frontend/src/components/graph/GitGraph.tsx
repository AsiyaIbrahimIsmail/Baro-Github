import { useMemo } from "react";
import { GitBranch, Circle } from "lucide-react";
import type { GitState } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../i18n/translations";

interface GitGraphProps {
  gitState: GitState;
}

interface GraphNode {
  id: string;
  hash: string;
  message: string;
  branch: string;
  x: number;
  y: number;
  isHead: boolean;
}

export function GitGraph({ gitState }: GitGraphProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const { nodes, edges, branchLabels } = useMemo(() => {
    const commits = gitState.commits;
    const nodeMap = new Map<string, GraphNode>();
    const edgeList: { from: string; to: string; color: string }[] = [];
    const branchColors = ["#6366f1", "#22d3ee", "#f472b6", "#a78bfa", "#34d399"];
    const branchColorMap = new Map<string, string>();

    gitState.branches.forEach((b, i) => {
      branchColorMap.set(b.name, branchColors[i % branchColors.length]);
    });
    if (!branchColorMap.has(gitState.currentBranch)) {
      branchColorMap.set(gitState.currentBranch, branchColors[0]);
    }

    commits.forEach((commit, index) => {
      const branchIndex = gitState.branches.findIndex((b) => b.name === commit.branch);
      const lane = branchIndex >= 0 ? branchIndex : 0;
      nodeMap.set(commit.id, {
        id: commit.id,
        hash: commit.hash.slice(0, 7),
        message: commit.message,
        branch: commit.branch,
        x: 40 + lane * 60,
        y: 30 + index * 70,
        isHead: commit.id === gitState.headCommitId,
      });

      commit.parentIds.forEach((parentId) => {
        edgeList.push({
          from: parentId,
          to: commit.id,
          color: branchColorMap.get(commit.branch) ?? "#6366f1",
        });
      });
    });

    const labels = gitState.branches.map((b, i) => ({
      name: b.name,
      color: branchColors[i % branchColors.length],
      isActive: b.name === gitState.currentBranch,
    }));

    return {
      nodes: Array.from(nodeMap.values()),
      edges: edgeList,
      branchLabels: labels,
    };
  }, [gitState]);

  const svgHeight = Math.max(200, nodes.length * 70 + 60);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-glass-border bg-black/30 backdrop-blur-glass shadow-glass overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border bg-white/5">
        <GitBranch className="w-4 h-4 text-accent-glow" />
        <span className="text-sm font-medium text-white/80">{t.gitGraph}</span>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {nodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[180px] text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-3">
              <Circle className="w-6 h-6 text-accent-glow animate-pulse-glow" />
            </div>
            <p className="text-sm text-white/40">{t.noCommits}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {branchLabels.map((b) => (
                <span
                  key={b.name}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    b.isActive
                      ? "border-accent/50 bg-accent/20 text-accent-glow shadow-glow-sm"
                      : "border-glass-border bg-white/5 text-white/60"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: b.color }}
                  />
                  {b.name}
                  {b.isActive && (
                    <span className="text-[10px] opacity-70">({t.head})</span>
                  )}
                </span>
              ))}
            </div>

            <svg
              width="100%"
              height={svgHeight}
              viewBox={`0 0 280 ${svgHeight}`}
              className="overflow-visible"
            >
              {edges.map((edge) => {
                const from = nodes.find((n) => n.id === edge.from);
                const to = nodes.find((n) => n.id === edge.to);
                if (!from || !to) return null;
                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x}
                    y1={from.y + 12}
                    x2={to.x}
                    y2={to.y - 12}
                    stroke={edge.color}
                    strokeWidth="2"
                    opacity="0.6"
                  />
                );
              })}

              {nodes.map((node) => (
                <g key={node.id}>
                  {node.isHead && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-pulse-glow"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill="#1a1a24"
                    stroke={node.isHead ? "#818cf8" : "#6366f1"}
                    strokeWidth="2"
                  />
                  <text
                    x={node.x + 22}
                    y={node.y - 4}
                    fill="#e2e8f0"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                  >
                    {node.hash}
                  </text>
                  <text
                    x={node.x + 22}
                    y={node.y + 12}
                    fill="#94a3b8"
                    fontSize="10"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.message.length > 28
                      ? `${node.message.slice(0, 28)}…`
                      : node.message}
                  </text>
                </g>
              ))}
            </svg>
          </>
        )}
      </div>
    </div>
  );
}
