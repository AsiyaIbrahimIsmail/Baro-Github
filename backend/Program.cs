using BaroGit.Api.Data;
using BaroGit.Api.Models;
using BaroGit.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Resolve from the compiled app folder so startup does not depend on the shell's directory.
var localSettingsPath = Path.Combine(
    AppContext.BaseDirectory,
    "..",
    "..",
    "..",
    "appsettings.Local.json");
builder.Configuration.AddJsonFile(
    Path.GetFullPath(localSettingsPath),
    optional: true,
    reloadOnChange: true);

var connectionString = builder.Configuration.GetConnectionString("BaroGit")
    ?? throw new InvalidOperationException(
        "Set ConnectionStrings:BaroGit with dotnet user-secrets before starting the API.");

builder.Services.AddDbContext<BaroGitDbContext>(options =>
    options.UseMySQL(connectionString));
builder.Services.AddHttpClient();
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(Path.Combine(
        Path.GetDirectoryName(localSettingsPath)!,
        ".keys")))
    .SetApplicationName("BaroGit.Api");
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = builder.Configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is not configured.");
        if (key.Length < 32)
        {
            throw new InvalidOperationException("Jwt:Key must contain at least 32 characters.");
        }

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            ClockSkew = TimeSpan.FromMinutes(1)
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:5174",
                "http://127.0.0.1:5174",
                "http://localhost:5175",
                "http://127.0.0.1:5175")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapGet("/api/health", () => Results.Ok(new
{
    status = "ok",
    service = "baro-git-dotnet-api"
}));

await DatabaseSeeder.SeedAsync(app.Services);

app.Run();
