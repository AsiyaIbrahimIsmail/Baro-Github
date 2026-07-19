# Baro-Git

Baro-Git is a bilingual, interactive platform for learning Git in English and
Somali. Learners study structured lessons, practice commands in a simulated
terminal, view Git history visually, track progress, and ask an AI tutor for
lesson-aware help.

## Product Goals

- Make Git approachable for beginners.
- Teach through practice, not only reading.
- Support English and Somali equally.
- Give administrators a simple way to manage course content.
- Provide a polished experience on mobile, tablet, and desktop.

## Planned Technology

| Area | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | ASP.NET Core Web API |
| Database | MySQL with Entity Framework Core |
| Authentication | JWT with hashed passwords and role authorization |
| AI Tutor | Gemini API |
| Testing | Vitest, React Testing Library, xUnit |
| Automation | GitHub Actions |

## Repository Structure

```text
baro-git/
  frontend/              React application
  backend/               ASP.NET Core Web API
  docs/
    requirements.md      Product scope and acceptance criteria
    architecture.md      Technical design and boundaries
    api-contract.md      Frontend/backend API agreement
  .github/               Issue, pull request, and workflow configuration
  CONTRIBUTING.md        Team development workflow
  README.md
```

## Getting Started

The frontend and backend scaffolds will be added during Sprint 0. Once they are
available, local setup instructions will be documented here.

Expected prerequisites:

- .NET SDK 10
- MySQL 8
- Git

Never commit database passwords, JWT signing keys, or Gemini API keys. Use local
configuration files excluded by `.gitignore`, ASP.NET User Secrets, or deployment
environment variables.

## Team Workflow

1. Select an assigned GitHub Issue.
2. Create a feature branch from the latest `main`.
3. Implement and test one focused change.
4. Open a pull request linked to the Issue.
5. Obtain at least one approval.
6. Merge only after required checks pass.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before making your first change.

## Documentation

- [Product requirements](docs/requirements.md)
- [System architecture](docs/architecture.md)
- [API contract](docs/api-contract.md)



