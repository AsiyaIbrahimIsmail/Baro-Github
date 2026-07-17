namespace BaroGit.Api.Models;

public sealed class Progress
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public required string UserId { get; set; }
    public int LessonId { get; set; }
    public bool Completed { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public User User { get; set; } = null!;
    public Lesson Lesson { get; set; } = null!;
}
