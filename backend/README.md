# Baro-Git ASP.NET API

## Local setup

The API uses MySQL on port `3307` and runs at `http://localhost:5000`.

### 1. Add local secrets

Open `backend-dotnet/appsettings.Local.json`. This file is ignored by Git.

Replace:

- `GELI_MYSQL_PASSWORD` with the password used by MySQL Workbench.
- `GELI_GEMINI_API_KEY` with the Gemini API key.
- The `Jwt:Key` value with a private random value containing at least 32 characters.
- `BEDEL_ADMIN_CODE` with a private code used when registering an admin account.

User Secrets can be used instead of the local file:

```powershell
dotnet user-secrets set "ConnectionStrings:BaroGit" "Server=127.0.0.1;Port=3307;Database=barogit;User=root;Password=YOUR_PASSWORD" --project backend-dotnet
```

Store the Gemini key the same way:

```powershell
dotnet user-secrets set "Gemini:ApiKey" "YOUR_GEMINI_API_KEY" --project backend-dotnet
```

If the MySQL `root` account has no password, the connection string already in
`appsettings.json` can be used for local development.

### 2. Start the API

```powershell
dotnet run --project backend-dotnet
```

On first start, the API creates the `barogit` schema tables and seeds 15 lessons.
The application currently uses `EnsureCreated` because Oracle's EF 10 provider
can return `DBNull` while acquiring a migration lock on some local MySQL servers.

### 3. Start the frontend

```powershell
cd frontend
npm.cmd run dev
```

Register a learner without an admin code. To create an administrator, enter the
same private value configured in `Admin:RegistrationCode`.

## Endpoints

- `GET /api/health`
- `GET /api/lessons`
- `GET /api/lessons/{id}`
- `POST /api/lessons`
- `PUT /api/lessons/{id}`
- `DELETE /api/lessons/{id}`
- `GET /api/progress/{userId}`
- `POST /api/progress`
- `POST /api/ai-tutor`
- `POST /api/auth/register`
- `POST /api/auth/login`

Lesson create, update, and delete endpoints require an authenticated `Admin`.
Progress and AI Tutor endpoints require a valid JWT.
