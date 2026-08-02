namespace BaroGit.Api.Contracts;

public sealed record RegisterRequest(
    string Name,
    string Email,
    string Password,
    string? AdminCode,
    string Language = "en");

public sealed record LoginRequest(string Email, string Password);

public sealed record AdminStatusResponse(bool AdminRegistrationAvailable);

public sealed record ForgotPasswordRequest(string Email);

public sealed record ForgotPasswordResponse(string Message);

public sealed record AuthUserResponse(
    string Id,
    string Name,
    string Email,
    string Role,
    string CurrentLanguage);

public sealed record AuthResponse(string Token, AuthUserResponse User);
