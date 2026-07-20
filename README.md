# Baro-Git

Baro-Git is an interactive bilingual Git learning platform for English and
Somali learners. It includes practical lessons, a simulated Git terminal, a Git
graph, saved progress, admin lesson management, and an AI tutor.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | ASP.NET Core Web API |
| Database | MySQL |
| Authentication | JWT tokens and password hashing |
| Authorization | Learner and Admin roles |
| AI Tutor | Gemini API |

## Project Structure

```text
Baro-Git/
  frontend/              React frontend application
  backend-dotnet/        ASP.NET Core backend API
  docs/                  Requirements, architecture, and API notes
  README.md
```

If this project is inside the GitHub team repository, the backend folder may be
named `backend/` instead of `backend-dotnet/`. Use the folder name that exists
in your local clone.

## Features

- User registration and login
- Learner and Admin roles
- English and Somali lesson content
- Interactive Git lesson dashboard
- Simulated Git terminal
- Git commit and branch graph
- Lesson progress tracking
- Admin lesson create, update, publish, and delete tools
- AI tutor support through the backend
- Light and dark theme support

## Prerequisites

Install these before running the project:

- Git
- Node.js and npm
- .NET SDK 10
- MySQL Server or MySQL Workbench

## Backend Setup

Go to the backend folder:

```powershell
cd backend-dotnet
```

If your GitHub clone uses `backend/`, use:

```powershell
cd backend
```

Create a local settings file:

```powershell
Copy-Item appsettings.Local.example.json appsettings.Local.json
```

Open `appsettings.Local.json` and set your local values:

```json
{
  "ConnectionStrings": {
    "BaroGit": "Server=127.0.0.1;Port=3307;Database=barogit;User=root;Password=YOUR_MYSQL_PASSWORD"
  },
  "Gemini": {
    "ApiKey": "YOUR_GEMINI_API_KEY",
    "Model": "gemini-2.5-flash"
  },
  "Jwt": {
    "Key": "CHANGE_THIS_TO_A_PRIVATE_KEY_WITH_AT_LEAST_32_CHARACTERS",
    "Issuer": "BaroGit.Api",
    "Audience": "BaroGit.Web",
    "ExpiryMinutes": 120
  },
  "Admin": {
    "RegistrationCode": "BARO_ADMIN_2026"
  }
}
```

Do not commit `appsettings.Local.json`. It is ignored by Git and should stay
only on your computer.

Run the backend:

```powershell
dotnet restore
dotnet run
```

The backend runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## Frontend Setup

Open a second terminal:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The frontend sends API requests to `/api`. During development, Vite proxies
those requests to:

```text
http://localhost:5000
```

## Registering Users

Normal learners register with:

- Name
- Email
- Password

Learners do not need an admin code.

To create an admin account, click:

```text
I have an admin code
```

Then enter the value configured in:

```text
Admin:RegistrationCode
```

Example:

```text
BARO_ADMIN_2026
```

## Authentication And Authorization

Authentication checks who the user is. A user logs in with email and password.
The backend returns a JWT token, and the frontend stores it for future API
requests.

Authorization checks what the user is allowed to do.

Learners can:

- View lessons
- Practice Git commands
- View the Git graph
- Track lesson progress
- Ask the AI tutor

Admins can also:

- Create lessons
- Edit lessons
- Delete lessons
- Publish or unpublish lessons
- Access admin tools

## Useful Commands

Frontend build:

```powershell
cd frontend
npm.cmd run build
```

Backend build:

```powershell
cd backend-dotnet
dotnet build
```

If your backend folder is named `backend/`:

```powershell
cd backend
dotnet build
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register learner or admin |
| POST | `/api/auth/login` | Login |
| GET | `/api/lessons` | Get lessons |
| GET | `/api/lessons/{id}` | Get one lesson |
| POST | `/api/lessons` | Create lesson, Admin only |
| PUT | `/api/lessons/{id}` | Update lesson, Admin only |
| DELETE | `/api/lessons/{id}` | Delete lesson, Admin only |
| GET | `/api/progress/{userId}` | Get learner progress |
| POST | `/api/progress` | Save learner progress |
| POST | `/api/ai-tutor` | Ask the AI tutor |

## Troubleshooting

### Request failed

Make sure the backend is running:

```powershell
cd backend-dotnet
dotnet run
```

Then make sure the frontend is running:

```powershell
cd frontend
npm.cmd run dev
```

If the backend says `Jwt:Key is not configured`, create
`appsettings.Local.json` and add a `Jwt:Key` with at least 32 characters.

### Black screen

Run:

```powershell
cd frontend
npm.cmd run build
```

If the build passes but the browser is still blank, restart the dev server and
hard refresh the browser with `Ctrl + F5`.

### Do not push these files

Never commit:

```text
node_modules/
bin/
obj/
dist/
.env
appsettings.Local.json
*.log
```
