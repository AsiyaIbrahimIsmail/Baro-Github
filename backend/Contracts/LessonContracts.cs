namespace BaroGit.Api.Contracts;

public sealed record LocalizedText(string En, string So);

public sealed record LocalizedList(string[] En, string[] So);

public sealed record LessonResponse(
    int Id,
    LocalizedText Title,
    LocalizedText Description,
    LocalizedText Content,
    string Diagram,
    LocalizedList Objectives,
    string[] Commands);

public sealed record SaveLessonRequest(
    LocalizedText Title,
    LocalizedText Description,
    LocalizedText Content,
    string Diagram,
    LocalizedList Objectives,
    string[] Commands,
    int SortOrder,
    bool IsPublished = true);
