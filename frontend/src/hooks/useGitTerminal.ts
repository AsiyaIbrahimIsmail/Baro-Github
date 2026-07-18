import { useState, useCallback } from "react";
import type {
  GitState,
  GitCommit,
  VirtualFile,
  TerminalLine,
} from "../types";

const INITIAL_FILES: VirtualFile[] = [
  { name: "README.md", content: "# My Project\nWelcome to Baro-Git!", staged: false },
  { name: "index.html", content: "<!DOCTYPE html>\n<html></html>", staged: false },
];

function generateHash(): string {
  return Math.random().toString(16).slice(2, 9);
}

function createInitialGitState(): GitState {
  return {
    initialized: false,
    currentBranch: "main",
    branches: [],
    commits: [],
    stagingArea: [],
    headCommitId: null,
  };
}

export function useGitTerminal() {
  const [gitState, setGitState] = useState<GitState>(createInitialGitState);
  const [files, setFiles] = useState<VirtualFile[]>(INITIAL_FILES);
  const [lines, setLines] = useState<TerminalLine[]>([
  {
    id: "welcome",
    type: "output",
    text: "Baro-Git Terminal v1.0 — Type 'help' for commands",
  },
]);
  const [cwd] = useState("/project");

  const addLine = useCallback(
    (type: TerminalLine["type"], text: string) => {
      setLines((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, type, text },
      ]);
    },
    []
  );

  const executeCommand = useCallback(
    (rawInput: string) => {
      const input = rawInput.trim();
      if (!input) return;

      addLine("input", `${cwd} $ ${input}`);

      const parts = input.split(/\s+/);
      const cmd = parts[0];
      const args = parts.slice(1);

      if (cmd === "help") {
        addLine("output", "Available: git init | git add . | git add <file> | git commit -m \"msg\" | git status | git branch | git checkout <branch> | git log | clear");
        return;
      }

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      if (cmd !== "git") {
        addLine("error", `command not found: ${cmd}`);
        return;
      }

      const sub = args[0];

      if (sub === "init") {
        if (gitState.initialized) {
          addLine("error", "Reinitialized existing Git repository in .git/");
        } else {
          setGitState((prev) => ({
            ...prev,
            initialized: true,
            branches: [{ name: "main", commitId: "" }],
          }));
          addLine("success", "Initialized empty Git repository in .git/");
        }
        return;
      }

      if (!gitState.initialized && sub !== "--version") {
        addLine("error", "fatal: not a git repository (or any of the parent directories): .git");
        return;
      }

      if (sub === "--version") {
        addLine("output", "git version 2.43.0.baro-git");
        return;
      }

      if (sub === "status") {
        const staged = files.filter((f) => f.staged);
        const unstaged = files.filter((f) => !f.staged);
        let output = `On branch ${gitState.currentBranch}\n`;
        if (staged.length > 0) {
          output += "\nChanges to be committed:\n";
          staged.forEach((f) => { output += `  modified:   ${f.name}\n`; });
        }
        if (unstaged.length > 0) {
          output += "\nChanges not staged for commit:\n";
          unstaged.forEach((f) => { output += `  modified:   ${f.name}\n`; });
        }
        if (staged.length === 0 && unstaged.length === 0) {
          output += "\nnothing to commit, working tree clean";
        }
        addLine("output", output.trim());
        return;
      }

      if (sub === "add") {
        const target = args[1];
        if (target === ".") {
          setFiles((prev) => prev.map((f) => ({ ...f, staged: true })));
          setGitState((prev) => ({
            ...prev,
            stagingArea: files.map((f) => f.name),
          }));
          addLine("success", "All files staged.");
        } else if (target) {
          const exists = files.some((f) => f.name === target);
          if (!exists) {
            addLine("error", `fatal: pathspec '${target}' did not match any files`);
          } else {
            setFiles((prev) =>
              prev.map((f) => (f.name === target ? { ...f, staged: true } : f))
            );
            addLine("success", `Staged '${target}'`);
          }
        } else {
          addLine("error", "Nothing specified, nothing added.");
        }
        return;
      }

      if (sub === "commit") {
        const msgIndex = args.indexOf("-m");
        const message = msgIndex >= 0 ? args[msgIndex + 1]?.replace(/^["']|["']$/g, "") : null;

        if (!message) {
          addLine("error", 'error: switch `m` requires a value');
          return;
        }

        const stagedFiles = files.filter((f) => f.staged);
        if (stagedFiles.length === 0) {
          addLine("error", "nothing to commit, working tree clean");
          return;
        }

        const commitId = generateHash();
        const parentId = gitState.headCommitId;

        const newCommit: GitCommit = {
          id: commitId,
          hash: commitId,
          message,
          branch: gitState.currentBranch,
          parentIds: parentId ? [parentId] : [],
          timestamp: Date.now(),
        };

        setGitState((prev) => {
          const updatedBranches = prev.branches.map((b) =>
            b.name === prev.currentBranch
              ? { ...b, commitId }
              : b
          );
          if (!updatedBranches.find((b) => b.name === prev.currentBranch)) {
            updatedBranches.push({ name: prev.currentBranch, commitId });
          }
          return {
            ...prev,
            commits: [...prev.commits, newCommit],
            headCommitId: commitId,
            branches: updatedBranches,
            stagingArea: [],
          };
        });

        setFiles((prev) => prev.map((f) => ({ ...f, staged: false })));
        addLine("success", `[${gitState.currentBranch} ${commitId}] ${message}`);
        addLine("output", ` 1 file changed, ${stagedFiles.length} insertion(s)`);
        return;
      }

      if (sub === "branch") {
        if (args.length === 1) {
          gitState.branches.forEach((b) => {
            const marker = b.name === gitState.currentBranch ? "* " : "  ";
            addLine("output", `${marker}${b.name}`);
          });
          if (gitState.branches.length === 0) {
            addLine("output", `* ${gitState.currentBranch}`);
          }
        } else if (args.length === 2) {
          const branchName = args[1];
          if (gitState.branches.some((b) => b.name === branchName)) {
            addLine("error", `fatal: A branch named '${branchName}' already exists.`);
          } else {
            setGitState((prev) => ({
              ...prev,
              branches: [
                ...prev.branches,
                { name: branchName, commitId: prev.headCommitId ?? "" },
              ],
            }));
            addLine("success", `Created branch '${branchName}'`);
          }
        }
        return;
      }

      if (sub === "checkout") {
        const branchName = args[1];
        if (!branchName) {
          addLine("error", "You must specify a branch to checkout");
          return;
        }
        const branch = gitState.branches.find((b) => b.name === branchName);
        if (!branch && branchName !== gitState.currentBranch) {
          addLine("error", `error: pathspec '${branchName}' did not match any git known branches`);
          return;
        }
        setGitState((prev) => ({
          ...prev,
          currentBranch: branchName,
          headCommitId: branch?.commitId || prev.headCommitId,
        }));
        addLine("success", `Switched to branch '${branchName}'`);
        return;
      }

      if (sub === "log") {
        if (gitState.commits.length === 0) {
          addLine("output", "No commits yet");
        } else {
          [...gitState.commits].reverse().forEach((c) => {
            addLine("output", `commit ${c.hash}\nAuthor: Baro-Git Learner\nDate: ${new Date(c.timestamp).toLocaleString()}\n\n    ${c.message}`);
          });
        }
        return;
      }

      addLine("error", `git: '${sub}' is not a git command. See 'git --help'.`);
    },
    [addLine, cwd, files, gitState]
  );

  const resetTerminal = useCallback(() => {
    setGitState(createInitialGitState());
    setFiles(INITIAL_FILES);
    setLines([
      {
        id: "welcome",
        type: "output",
        text: "Baro-Git Terminal v1.0 — Type 'help' for commands",
      },
    ]);
  }, []);

  return { gitState, files, lines, executeCommand, resetTerminal };
}
