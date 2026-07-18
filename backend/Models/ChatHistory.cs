namespace BaroGit.Api.Models;

public sealed class ChatHistory
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public required string UserId { get; set; }
    public int LessonId { get; set; }
    public required string Message { get; set; }
    public required string Sender { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public User User { get; set; } = null!;
    public Lesson Lesson { get; set; } = null!;
}
