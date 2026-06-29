# Baro-Git System Architecture

## 1. System Context

```text
Browser
  |
  | HTTPS + JSON + JWT
  v
React frontend
  |
  | /api/*
  v
ASP.NET Core Web API
  |                    |
  | EF Core            | HTTPS
  v                    v
MySQL database      Gemini API
```

The browser renders the interface. The ASP.NET API owns business rules,
authentication, authorization, database access, and third-party AI access.

## 2. Frontend

Planned stack:

- React and TypeScript
- Vite
- Tailwind CSS
- Context or a small state library for session and UI state
- A query library may be added for server state after team agreement

Suggested modules:

```text
frontend/src/
  components/
    auth/
    admin/
    layout/
    lesson/
    terminal/
    graph/
    tutor/
    ui/
  context/
  hooks/
  pages/
  services/
  types/
  i18n/
```

Frontend responsibilities:

- Render accessible and responsive UI.
- Store the short-lived authenticated session.
- Call documented API endpoints.
- Simulate safe Git learning behavior.
- Never contain database or Gemini credentials.

## 3. Backend

Planned stack:

- ASP.NET Core Web API
- Entity Framework Core
- MySQL provider
- JWT bearer authentication
- ASP.NET password hashing
- Typed `HttpClient` for Gemini

Suggested modules:

```text
backend/
  Controllers/
  Contracts/
  Data/
  Models/
  Services/
  Authorization/
  Migrations/
  Tests/
```

Backend responsibilities:

- Validate requests.
- Authenticate users and issue JWTs.
- Enforce learner/admin authorization.
- Read and write MySQL data.
- Keep Gemini and database secrets server-side.
- Return stable response and error contracts.

## 4. Database

Initial entities:

### User

- `Id`
- `Name`
- `Email` (unique)
- `PasswordHash`
- `Role`
- `CurrentLanguage`
- `CreatedAt`

### Lesson

- `Id`
- English and Somali title, description, and content
- Objectives and practice commands
- Diagram type
- Sort order
- Publication status
- Created and updated timestamps

### Progress

- `Id`
- `UserId`
- `LessonId`
- Completion status
- Updated timestamp
- Unique constraint on `UserId + LessonId`

### ChatMessage

- `Id`
- `UserId`
- `LessonId`
- Sender
- Message
- Created timestamp

## 5. Security Boundaries

- Passwords are hashed and never returned.
- JWT signing keys and API keys are environment secrets.
- Admin role checks happen on the backend, not only in the UI.
- Users may read or update only their own progress and chat records.
- CORS allows only configured frontend origins.
- Request DTOs define accepted input; database entities are not accepted directly.

## 6. Important Flows

### Login

```text
Frontend -> POST /api/auth/login
API -> verify password hash
API -> return JWT and safe user profile
Frontend -> attach Bearer token to protected requests
```

### Lesson Loading

```text
Frontend -> GET /api/lessons
API -> query published lessons ordered by sort order
API -> return localized lesson objects
Frontend -> render navigation and active lesson
```

### AI Tutor

```text
Frontend -> authenticated tutor request
API -> validate lesson and language
API -> build constrained tutor prompt
API -> call Gemini
API -> return response
API -> persist chat when database is available
```

## 7. Deployment Direction

- Frontend: static hosting
- Backend: container or managed ASP.NET hosting
- Database: managed MySQL
- Secrets: deployment environment variables or secret manager
- CI: build and test frontend/backend on every pull request

Production deployment details will be decided after the local MVP is stable.

