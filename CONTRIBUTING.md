# Contributing to Baro-Git

This document defines how the team plans, implements, reviews, and merges work.

## Core Rules

- Do not push directly to `main`.
- Every code change must have a GitHub Issue.
- Keep each pull request focused on one issue.
- Never commit secrets or personal credentials.
- Do not merge your own pull request without another team member's approval.
- Keep the project buildable after every merge.

## Starting Work

Update your local repository:

```bash
git switch main
git pull origin main
```

Create a branch linked to the Issue:

```bash
git switch -c feature/12-login-page
```

Branch prefixes:

- `feature/` for new behavior
- `fix/` for bug fixes
- `docs/` for documentation
- `test/` for test coverage
- `chore/` for tooling and maintenance

## Commit Messages

Use short, meaningful conventional commits:

```text
feat: add learner registration endpoint
fix: preserve lesson progress after refresh
docs: define authentication API contract
test: cover invalid login credentials
chore: configure frontend CI build
```

Prefer several understandable commits over one large unclear commit.

## Before Opening a Pull Request

- Pull the latest `main` and resolve conflicts.
- Run the relevant formatter, tests, and builds.
- Remove debugging output and unused code.
- Check mobile and desktop layouts for frontend work.
- Confirm no secrets or generated folders are included.
- Update documentation when behavior or API contracts change.

## Pull Requests

Every pull request should include:

- A short explanation of the change
- The linked Issue, for example `Closes #12`
- Testing steps
- Screenshots for visible UI changes
- Known limitations or follow-up work

At least one teammate must review and approve the pull request. The reviewer
checks correctness, security, maintainability, tests, and alignment with the
documented requirements.

## Definition of Done

Work is done only when:

- Acceptance criteria are satisfied.
- Type checking and builds pass.
- Relevant automated tests pass.
- Error and loading states are handled.
- Accessibility and responsive behavior are checked.
- Secrets are not present in the change.
- Documentation is current.
- A teammate has approved the pull request.

## Team Ownership

Ownership identifies the first reviewer, not the only person allowed to edit:

| Area | Primary owner |
| --- | --- |
| Architecture and integration | Team lead |
| Authentication and authorization | Backend/Auth owner |
| Database, lessons, and progress | Data/API owner |
| Frontend UI and responsive design | Frontend owner |
| Terminal, Git graph, AI, and QA | Learning/AI owner |

When a change crosses ownership boundaries, request reviews from both owners.

