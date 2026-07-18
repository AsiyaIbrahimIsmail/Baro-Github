using BaroGit.Api.Contracts;
using BaroGit.Api.Data;
using BaroGit.Api.Models;
using BaroGit.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaroGit.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AuthController(
    BaroGitDbContext db,
    IPasswordHasher<User> passwordHasher,
    TokenService tokenService,
    IConfiguration configuration) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        if (request.Name.Trim().Length < 2 || request.Password.Length < 8)
        {
            return BadRequest(new { error = "Name and a password of at least 8 characters are required." });
        }

        if (await db.Users.AnyAsync(x => x.Email == email))
        {
            return Conflict(new { error = "An account with this email already exists." });
        }

        var configuredAdminCode = configuration["Admin:RegistrationCode"];
        var isAdmin = !string.IsNullOrWhiteSpace(request.AdminCode)
            && !string.IsNullOrWhiteSpace(configuredAdminCode)
            && request.AdminCode == configuredAdminCode;
        var user = new User
        {
            Name = request.Name.Trim(),
            Email = email,
            PasswordHash = string.Empty,
            Role = isAdmin ? "Admin" : "Learner",
            CurrentLanguage = request.Language == "so" ? "so" : "en"
        };

        // PasswordHasher adds a salt and stores only a one-way hash, never the password.
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return Ok(CreateResponse(user));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.Users.SingleOrDefaultAsync(x => x.Email == email);
        if (user is null)
        {
            return Unauthorized(new { error = "Email or password is incorrect." });
        }

        var result = passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new { error = "Email or password is incorrect." });
        }

        return Ok(CreateResponse(user));
    }

    private AuthResponse CreateResponse(User user) => new(
        tokenService.Create(user),
        new AuthUserResponse(
            user.Id,
            user.Name,
            user.Email,
            user.Role,
            user.CurrentLanguage));
}
