using System.Net.Http.Json;
using System.Text.Json;
using BaroGit.Api.Data;
using BaroGit.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BaroGit.Api.Controllers;

public sealed record AiTutorRequest(
    string Message,
    string Language,
    int LessonId,
    string LessonTitle,
    string? UserId);

[ApiController]
[Authorize]
[Route("api/ai-tutor")]
public sealed class AiTutorController(
    IHttpClientFactory httpClientFactory,
    IConfiguration configuration,
    BaroGitDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Ask(AiTutorRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(new { error = "Message is required" });
        }

        var apiKey = configuration["Gemini:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            return StatusCode(503, new { error = "Gemini API key is not configured" });
        }

        var model = configuration["Gemini:Model"] ?? "gemini-2.5-flash";
        var language = request.Language == "so" ? "Somali" : "English";
        var prompt = $"""
            You are Baro-Git, a concise and encouraging Git tutor.
            Answer in {language}.
            Current lesson: {request.LessonId} - {request.LessonTitle}.
            Explain commands safely and use short examples.

            Student: {request.Message.Trim()}
            """;

        var client = httpClientFactory.CreateClient();
        var url = $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";
        var response = await client.PostAsJsonAsync(url, new
        {
            contents = new[]
            {
                new
                {
                    parts = new[] { new { text = prompt } }
                }
            }
        });

        if (!response.IsSuccessStatusCode)
        {
            return StatusCode(502, new { error = "Gemini request failed" });
        }

        using var json = await JsonDocument.ParseAsync(
            await response.Content.ReadAsStreamAsync());
        var reply = json.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();

        if (string.IsNullOrWhiteSpace(reply))
        {
            return StatusCode(502, new { error = "Gemini returned an empty response" });
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException("Authenticated user has no identifier.");
        try
        {
            db.ChatHistory.AddRange(
                new ChatHistory
                {
                    UserId = userId,
                    LessonId = request.LessonId,
                    Message = request.Message.Trim(),
                    Sender = "user"
                },
                new ChatHistory
                {
                    UserId = userId,
                    LessonId = request.LessonId,
                    Message = reply,
                    Sender = "ai"
                });
            await db.SaveChangesAsync();
        }
        catch (Exception error)
        {
            // Tutoring should remain available during a temporary database outage.
            Console.Error.WriteLine($"Could not save AI chat history: {error.Message}");
        }

        return Ok(new { reply });
    }
}
