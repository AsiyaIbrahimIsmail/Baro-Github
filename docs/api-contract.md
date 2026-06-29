# Baro-Git API Contract

## 1. Conventions

Base path:

```text
/api
```

Requests and responses use JSON with camel-case property names.

Protected requests include:

```http
Authorization: Bearer <jwt>
```

Standard error:

```json
{
  "error": "Human-readable explanation",
  "code": "OPTIONAL_MACHINE_CODE"
}
```

Expected status codes:

- `200` successful request
- `201` resource created
- `204` successful deletion
- `400` validation error
- `401` missing or invalid authentication
- `403` authenticated but not authorized
- `404` resource not found
- `409` duplicate or conflicting data
- `500` unexpected server error
- `502` upstream AI provider failure
- `503` required service unavailable

## 2. Authentication

### Register

```http
POST /api/auth/register
```

```json
{
  "name": "iman Ali",
  "email": "iman@example.com",
  "password": "strong-password",
  "language": "so"
}
```

### Login

```http
POST /api/auth/login
```

```json
{
  "email": "iman@example.com",
  "password": "strong-password"
}
```

Successful authentication response:

```json
{
  "token": "<jwt>",
  "user": {
    "id": "user-id",
    "name": "iman Ali",
    "email": "iman@example.com",
    "role": "Learner",
    "currentLanguage": "so"
  }
}
```

Admin accounts must be created through an approved bootstrap process. Public
registration must not accept an arbitrary role.

## 3. Lessons

### List published lessons

```http
GET /api/lessons
```

### Get one lesson

```http
GET /api/lessons/{id}
```

Lesson response:

```json
{
  "id": 1,
  "title": {
    "en": "What is Git?",
    "so": "Waa maxay Git?"
  },
  "description": {
    "en": "Understand version control.",
    "so": "Faham xakamaynta noocyada."
  },
  "content": {
    "en": "English lesson content",
    "so": "Somali lesson content"
  },
  "diagram": "repo",
  "objectives": {
    "en": ["Define version control"],
    "so": ["Qeex version control"]
  },
  "commands": ["git --version", "git init"],
  "sortOrder": 1,
  "isPublished": true
}
```

### Create lesson

```http
POST /api/lessons
Authorization: Admin
```

### Update lesson

```http
PUT /api/lessons/{id}
Authorization: Admin
```

### Delete lesson

```http
DELETE /api/lessons/{id}
Authorization: Admin
```

Create and update bodies use the lesson response fields except `id`.

## 4. Progress

### Get current learner progress

```http
GET /api/progress/me
Authorization: Learner or Admin
```

```json
[
  {
    "lessonId": 1,
    "completed": true,
    "updatedAt": "2026-06-29T10:00:00Z"
  }
]
```

### Save lesson progress

```http
PUT /api/progress/{lessonId}
Authorization: Learner or Admin
```

```json
{
  "completed": true
}
```

The API derives the user identity from the JWT. The client must not choose a
different `userId`.

## 5. AI Tutor

```http
POST /api/ai-tutor
Authorization: Learner or Admin
```

```json
{
  "message": "What does git add do?",
  "language": "en",
  "lessonId": 2
}
```

```json
{
  "reply": "git add moves selected changes into the staging area."
}
```

The backend loads trusted lesson context and calls Gemini. A Gemini key is never
accepted from or returned to the frontend.

## 6. Health

```http
GET /api/health
```

```json
{
  "status": "ok",
  "service": "baro-git-api"
}
```

## 7. Contract Change Process

Any API change must:

1. Update this document first.
2. Be discussed by frontend and backend owners.
3. Include compatible frontend and backend changes.
4. Include tests for success and failure responses.

