using System.Security.Claims;
using BaroGit.Api.Contracts;
using BaroGit.Api.Data;
using BaroGit.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaroGit.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public sealed class UsersController(
    BaroGitDbContext db,
    IPasswordHasher<User> passwordHasher) : ControllerBase
{
    private static readonly string[] AllowedRoles = ["Admin", "Learner"];

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminUserResponse>>> GetAll()
    {
        var users = await db.Users
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new AdminUserResponse(
                x.Id,
                x.Name,
                x.Email,
                x.Role,
                x.CurrentLanguage,
                x.CreatedAt,
                x.Progress.Count(p => p.Completed),
                x.ChatHistory.Count))
            .ToListAsync();

        return Ok(users);
    }

    [HttpPut("{id}/role")]
    public async Task<ActionResult<AdminUserResponse>> UpdateRole(
        string id,
        UpdateUserRoleRequest request)
    {
        if (!AllowedRoles.Contains(request.Role))
        {
            return BadRequest(new { error = "Role must be Admin or Learner." });
        }

        var user = await db.Users.FindAsync(id);
        if (user is null)
        {
            return NotFound(new { error = "User was not found." });
        }

        if (user.Role == "Admin" && request.Role == "Learner" && await IsLastAdmin(user.Id))
        {
            return BadRequest(new { error = "You cannot demote the last admin." });
        }

        user.Role = request.Role;
        await db.SaveChangesAsync();

        return Ok(await ToResponse(user.Id));
    }

    [HttpPut("{id}/password")]
    public async Task<IActionResult> UpdatePassword(
        string id,
        UpdateUserPasswordRequest request)
    {
        if (request.NewPassword.Length < 8)
        {
            return BadRequest(new { error = "Password must be at least 8 characters." });
        }

        var user = await db.Users.FindAsync(id);
        if (user is null)
        {
            return NotFound(new { error = "User was not found." });
        }

        user.PasswordHash = passwordHasher.HashPassword(user, request.NewPassword);
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        if (id == CurrentUserId())
        {
            return BadRequest(new { error = "You cannot delete your own admin account." });
        }

        var user = await db.Users.FindAsync(id);
        if (user is null)
        {
            return NotFound(new { error = "User was not found." });
        }

        if (user.Role == "Admin" && await IsLastAdmin(user.Id))
        {
            return BadRequest(new { error = "You cannot delete the last admin." });
        }

        db.Users.Remove(user);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private async Task<bool> IsLastAdmin(string userId) =>
        !await db.Users.AnyAsync(x => x.Role == "Admin" && x.Id != userId);

    private string CurrentUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new InvalidOperationException("Missing user id claim.");

    private async Task<AdminUserResponse> ToResponse(string id)
    {
        var user = await db.Users
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new AdminUserResponse(
                x.Id,
                x.Name,
                x.Email,
                x.Role,
                x.CurrentLanguage,
                x.CreatedAt,
                x.Progress.Count(p => p.Completed),
                x.ChatHistory.Count))
            .SingleAsync();

        return user;
    }
}
