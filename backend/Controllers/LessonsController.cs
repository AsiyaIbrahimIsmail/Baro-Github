using System.Text.Json;
using BaroGit.Api.Contracts;
using BaroGit.Api.Data;
using BaroGit.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaroGit.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class LessonsController(BaroGitDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<LessonResponse>>> GetAll()
    {
        var lessons = await db.Lessons
            .AsNoTracking()
            .Where(x => x.IsPublished)
            .OrderBy(x => x.SortOrder)
            .ToListAsync();

        return Ok(lessons.Select(ToResponse));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<LessonResponse>> GetById(int id)
    {
        var lesson = await db.Lessons.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
        return lesson is null ? NotFound() : Ok(ToResponse(lesson));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<LessonResponse>> Create(SaveLessonRequest request)
    {
        var lesson = new Lesson
        {
            TitleEn = request.Title.En,
            TitleSo = request.Title.So,
            DescriptionEn = request.Description.En,
            DescriptionSo = request.Description.So,
            ContentEn = request.Content.En,
            ContentSo = request.Content.So,
            Diagram = request.Diagram,
            ObjectivesEnJson = JsonSerializer.Serialize(request.Objectives.En),
            ObjectivesSoJson = JsonSerializer.Serialize(request.Objectives.So),
            CommandsJson = JsonSerializer.Serialize(request.Commands),
            SortOrder = request.SortOrder,
            IsPublished = request.IsPublished
        };

        db.Lessons.Add(lesson);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = lesson.Id }, ToResponse(lesson));
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<LessonResponse>> Update(int id, SaveLessonRequest request)
    {
        var lesson = await db.Lessons.FindAsync(id);
        if (lesson is null)
        {
            return NotFound();
        }

        lesson.TitleEn = request.Title.En;
        lesson.TitleSo = request.Title.So;
        lesson.DescriptionEn = request.Description.En;
        lesson.DescriptionSo = request.Description.So;
        lesson.ContentEn = request.Content.En;
        lesson.ContentSo = request.Content.So;
        lesson.Diagram = request.Diagram;
        lesson.ObjectivesEnJson = JsonSerializer.Serialize(request.Objectives.En);
        lesson.ObjectivesSoJson = JsonSerializer.Serialize(request.Objectives.So);
        lesson.CommandsJson = JsonSerializer.Serialize(request.Commands);
        lesson.SortOrder = request.SortOrder;
        lesson.IsPublished = request.IsPublished;
        lesson.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(ToResponse(lesson));
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var lesson = await db.Lessons.FindAsync(id);
        if (lesson is null)
        {
            return NotFound();
        }

        db.Lessons.Remove(lesson);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private static LessonResponse ToResponse(Lesson lesson) => new(
        lesson.Id,
        new LocalizedText(lesson.TitleEn, lesson.TitleSo),
        new LocalizedText(lesson.DescriptionEn, lesson.DescriptionSo),
        new LocalizedText(lesson.ContentEn, lesson.ContentSo),
        lesson.Diagram,
        new LocalizedList(
            Deserialize(lesson.ObjectivesEnJson),
            Deserialize(lesson.ObjectivesSoJson)),
        Deserialize(lesson.CommandsJson));

    private static string[] Deserialize(string json) =>
        JsonSerializer.Deserialize<string[]>(json) ?? [];
}
