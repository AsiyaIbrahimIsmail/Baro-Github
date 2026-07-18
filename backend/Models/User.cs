namespace BaroGit.Api.Models;

public sealed class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public string Role { get; set; } = "Learner";
    public string CurrentLanguage { get; set; } = "en";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Progress> Progress { get; set; } = [];
    public ICollection<ChatHistory> ChatHistory { get; set; } = [];
}
