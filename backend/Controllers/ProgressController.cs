using BaroGit.Api.Data;
using BaroGit.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BaroGit.Api.Controllers;

public sealed record SaveProgressRequest(int LessonId, bool Completed);

[ApiController]
[Authorize]
[Route("api/[controller]")]
public sealed class ProgressController(BaroGitDbContext db) : ControllerBase
{
    [HttpGet("{userId}")]
    public async Task<ActionResult> Get(string userId)
    {
        if (userId != CurrentUserId())
        {
            return Forbid();
        }

        var progress = await db.Progress
            .AsNoTracking()
            .Where(x => x.UserId == userId)
            .OrderBy(x => x.LessonId)
            .Select(x => new { x.Id, x.UserId, x.LessonId, x.Completed, x.UpdatedAt })
            .ToListAsync();
        return Ok(progress);
    }

    [HttpPost]
    public async Task<ActionResult> Save(SaveProgressRequest request)
    {
        var userId = CurrentUserId();
        var progress = await db.Progress.SingleOrDefaultAsync(
            x => x.UserId == userId && x.LessonId == request.LessonId);

        if (progress is null)
        {
            progress = new Progress
            {
                UserId = userId,
                LessonId = request.LessonId,
                Completed = request.Completed
            };
            db.Progress.Add(progress);
        }
        else
        {
            progress.Completed = request.Completed;
            progress.UpdatedAt = DateTime.UtcNow;
        }

        await db.SaveChangesAsync();
        return Ok(new
        {
            progress.Id,
            progress.UserId,
            progress.LessonId,
            progress.Completed,
            progress.UpdatedAt
        });
    }

    private string CurrentUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new InvalidOperationException("Authenticated user has no identifier.");
}
