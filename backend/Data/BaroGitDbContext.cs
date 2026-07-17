using BaroGit.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BaroGit.Api.Data;

public sealed class BaroGitDbContext(DbContextOptions<BaroGitDbContext> options)
    : DbContext(options)
{
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Progress> Progress => Set<Progress>();
    public DbSet<ChatHistory> ChatHistory => Set<ChatHistory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.Property(x => x.TitleEn).HasMaxLength(160);
            entity.Property(x => x.TitleSo).HasMaxLength(160);
            entity.Property(x => x.Diagram).HasMaxLength(50);
            entity.Property(x => x.ContentEn).HasColumnType("longtext");
            entity.Property(x => x.ContentSo).HasColumnType("longtext");
            entity.Property(x => x.ObjectivesEnJson).HasColumnType("json");
            entity.Property(x => x.ObjectivesSoJson).HasColumnType("json");
            entity.Property(x => x.CommandsJson).HasColumnType("json");
            entity.HasIndex(x => x.SortOrder).IsUnique();
        });

        modelBuilder.Entity<User>()
            .HasIndex(x => x.Email)
            .IsUnique();

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(x => x.Name).HasMaxLength(100);
            entity.Property(x => x.Email).HasMaxLength(200);
            entity.Property(x => x.PasswordHash).HasMaxLength(500);
            entity.Property(x => x.Role).HasMaxLength(30);
        });

        modelBuilder.Entity<Progress>(entity =>
        {
            entity.HasIndex(x => new { x.UserId, x.LessonId }).IsUnique();
            entity.HasOne(x => x.User)
                .WithMany(x => x.Progress)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(x => x.Lesson)
                .WithMany()
                .HasForeignKey(x => x.LessonId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ChatHistory>(entity =>
        {
            entity.Property(x => x.Message).HasColumnType("text");
            entity.HasOne(x => x.User)
                .WithMany(x => x.ChatHistory)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(x => x.Lesson)
                .WithMany()
                .HasForeignKey(x => x.LessonId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
