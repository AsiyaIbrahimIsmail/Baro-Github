namespace BaroGit.Api.Contracts;

public sealed record AdminUserResponse(
    string Id,
    string Name,
    string Email,
    string Role,
    string CurrentLanguage,
    DateTime CreatedAt,
    int CompletedLessons,
    int ChatMessages);

public sealed record UpdateUserRoleRequest(string Role);
