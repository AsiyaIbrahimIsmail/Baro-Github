namespace BaroGit.Api.Models;

public sealed class Lesson
{
    public int Id { get; set; }
    public required string TitleEn { get; set; }
    public required string TitleSo { get; set; }
    public required string DescriptionEn { get; set; }
    public required string DescriptionSo { get; set; }
    public required string ContentEn { get; set; }
    public required string ContentSo { get; set; }
    public required string Diagram { get; set; }
    public required string ObjectivesEnJson { get; set; }
    public required string ObjectivesSoJson { get; set; }
    public required string CommandsJson { get; set; }
    public int SortOrder { get; set; }
    public bool IsPublished { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
