using System.Text.Json;
using BaroGit.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BaroGit.Api.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        await using var scope = services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<BaroGitDbContext>();
        // Oracle's EF 10 provider currently returns DBNull while acquiring its
        // migration lock on some local MySQL installations. EnsureCreated avoids
        // that provider bug and creates this new application's schema safely.
        await db.Database.EnsureCreatedAsync();

        if (await db.Lessons.AnyAsync())
        {
            return;
        }

        db.Lessons.AddRange(BuildLessons());
        await db.SaveChangesAsync();
    }

    private static Lesson Create(
        int id,
        string titleEn,
        string titleSo,
        string descriptionEn,
        string descriptionSo,
        string contentEn,
        string contentSo,
        string diagram,
        string[] objectivesEn,
        string[] objectivesSo,
        string[] commands) => new()
    {
        Id = id,
        SortOrder = id,
        TitleEn = titleEn,
        TitleSo = titleSo,
        DescriptionEn = descriptionEn,
        DescriptionSo = descriptionSo,
        ContentEn = contentEn,
        ContentSo = contentSo,
        Diagram = diagram,
        ObjectivesEnJson = JsonSerializer.Serialize(objectivesEn),
        ObjectivesSoJson = JsonSerializer.Serialize(objectivesSo),
        CommandsJson = JsonSerializer.Serialize(commands)
    };

    private static Lesson[] BuildLessons() =>
    [
        Create(1, "What is Git?", "Waa maxay Git?",
            "Understand version control and why Git powers modern development.",
            "Faham xakamaynta noocyada iyo sababta Git muhiim u yahay.",
            "Git is a **distributed version control system**. It records snapshots called commits and lets you safely revisit earlier versions.",
            "Git waa **nidaam xakamaynta noocyada**. Wuxuu kaydiyaa commits wuxuuna kuu oggolaanayaa inaad dib ugu noqoto nooc hore.",
            "repo", ["Define version control", "Explain repositories", "Understand commits"],
            ["Qeex version control", "Sharax repository", "Faham commits"], ["git --version", "git init"]),
        Create(2, "git init & Commits", "git init & Commits",
            "Initialize a repository and create your first commits.",
            "Bilow repository oo samee commit-kaaga koowaad.",
            "Run **git init**, stage work with **git add**, then save a snapshot with **git commit**.",
            "Orod **git init**, shaqada ku diyaari **git add**, kadib ku kaydi **git commit**.",
            "init-commit", ["Initialize a repo", "Stage files", "Create commits"],
            ["Bilow repo", "Stage garee faylasha", "Samee commits"], ["git init", "git add .", "git commit -m \"Initial commit\""]),
        Create(3, "The Staging Area", "Staging Area",
            "Master the working directory, staging area, and repository.",
            "Baro working directory, staging area, iyo repository.",
            "Files move from the working directory to staging with **git add**, then into history with **git commit**.",
            "Faylasha working directory waxaa staging geeya **git add**, taariikhdana **git commit**.",
            "staging", ["Explain the three Git areas", "Use git status", "Stage selectively"],
            ["Sharax saddexda meelood", "Isticmaal git status", "Dooro faylasha"], ["git status", "git add index.html", "git add ."]),
        Create(4, "Branching", "Laamaynta (Branching)",
            "Work on features without breaking the main branch.",
            "Features ku samee adigoon jebin main branch.",
            "Branches are parallel lines of work. Create one with **git switch -c feature-name**.",
            "Branches waa khadad shaqo oo kala socda. Ku samee **git switch -c feature-name**.",
            "branching", ["Create branches", "Switch branches", "Understand branch pointers"],
            ["Samee branches", "U kala wareeg branches", "Faham branch pointers"], ["git branch", "git switch -c feature-login", "git switch main"]),
        Create(5, "Merging", "Isku darka (Merging)",
            "Combine branch histories into one timeline.",
            "Isku dar taariikhda branches-ka.",
            "Switch to the target branch and run **git merge feature-name** to combine completed work.",
            "U wareeg branch-ka bartilmaameedka, kadib isticmaal **git merge feature-name**.",
            "merging", ["Merge branches", "Understand merge commits", "Prepare for conflicts"],
            ["Isku dar branches", "Faham merge commits", "U diyaargarow conflicts"], ["git switch main", "git merge feature-login"]),
        Create(6, "Pull Requests", "Pull Requests",
            "Collaborate through review and pull requests.",
            "Ku wada shaqeeya review iyo pull requests.",
            "Push a feature branch, open a pull request, address review feedback, and merge after checks pass.",
            "Push garee feature branch, fur pull request, sax review-ga, kadib merge samee.",
            "pr", ["Understand PR workflow", "Request review", "Merge approved work"],
            ["Faham PR workflow", "Codso review", "Merge garee shaqada"], ["git push -u origin feature-login"]),
        Create(7, "History & Differences", "Taariikhda & Farqiga",
            "Inspect commits and understand what changed.",
            "Eeg commits-ka iyo waxa isbeddelay.",
            "Use **git log** for history, **git show** for a commit, and **git diff** for file changes.",
            "Isticmaal **git log** taariikhda, **git show** commit, iyo **git diff** isbeddelka.",
            "repo", ["Read history", "Inspect commits", "Compare changes"],
            ["Akhri taariikhda", "Eeg commits", "Isbarbar dhig"], ["git log --oneline", "git show HEAD", "git diff"]),
        Create(8, "Undoing Changes", "Ka Noqoshada Isbeddellada",
            "Recover safely from common mistakes.",
            "Si ammaan ah uga soo kabso khaladaadka.",
            "Use **git restore** for local files and **git revert** to safely reverse a shared commit.",
            "Isticmaal **git restore** faylasha gudaha iyo **git revert** commit la wadaago.",
            "staging", ["Restore files", "Unstage work", "Revert commits"],
            ["Soo celi fayl", "Ka saar staging", "Ka noqo commit"], ["git restore app.js", "git restore --staged app.js", "git revert HEAD"]),
        Create(9, "Remote Repositories", "Remote Repositories",
            "Connect a local project to GitHub.",
            "Ku xir mashruuca gudaha GitHub.",
            "A remote is a hosted repository. Add **origin**, inspect it, and push your branch.",
            "Remote waa repository online ah. Ku dar **origin**, eeg, kadib push garee.",
            "pr", ["Explain remotes", "Add origin", "Publish a branch"],
            ["Sharax remotes", "Ku dar origin", "Daabac branch"], ["git remote -v", "git remote add origin <url>", "git push -u origin main"]),
        Create(10, "Clone, Fetch & Pull", "Clone, Fetch & Pull",
            "Download and synchronize repositories.",
            "Soo dejiso oo cusboonaysii repositories.",
            "**git clone** downloads a repository, **git fetch** checks updates, and **git pull** integrates them.",
            "**git clone** wuu soo dejiyaa, **git fetch** wuu hubiyaa, **git pull**-na wuu isku daraa.",
            "pr", ["Clone a repo", "Fetch updates", "Pull team changes"],
            ["Clone garee repo", "Soo qaado updates", "Pull garee shaqada"], ["git clone <url>", "git fetch origin", "git pull origin main"]),
        Create(11, "Merge Conflicts", "Khilaafaadka Merge-ka",
            "Resolve competing edits safely.",
            "Xalli isbeddellada isku dhacay.",
            "Choose the correct content between conflict markers, remove the markers, stage the file, and commit.",
            "Dooro content-ka saxda ah, ka saar conflict markers, stage garee, kadib commit.",
            "merging", ["Recognize conflicts", "Resolve files", "Complete a merge"],
            ["Aqoonso conflict", "Xalli faylasha", "Dhammaystir merge"], ["git status", "git add resolved-file.txt", "git commit"]),
        Create(12, "Rebase", "Rebase",
            "Keep feature history clean and current.",
            "Ka dhig feature history mid nadiif ah.",
            "**git rebase main** replays local feature commits on top of the latest main branch.",
            "**git rebase main** wuxuu feature commits dul saaraa main-ka ugu dambeeyay.",
            "branching", ["Explain rebase", "Update a feature branch", "Handle rebase conflicts"],
            ["Sharax rebase", "Cusboonaysii feature branch", "Xalli conflicts"], ["git rebase main", "git rebase --continue", "git rebase --abort"]),
        Create(13, "Stashing Work", "Kaydinta Shaqo Ku-meel-gaar ah",
            "Temporarily save unfinished work.",
            "Si ku-meel-gaar ah u kaydi shaqo aan dhammaan.",
            "**git stash** clears unfinished changes temporarily. Restore them later with **git stash pop**.",
            "**git stash** wuxuu kaydiyaa isbeddelka ku-meel-gaarka ah. Ku soo celi **git stash pop**.",
            "staging", ["Stash work", "List stashes", "Restore changes"],
            ["Kaydi shaqo", "Tax stashes", "Soo celi isbeddel"], ["git stash", "git stash list", "git stash pop"]),
        Create(14, "Tags & Releases", "Tags & Releases",
            "Mark important versions and releases.",
            "Calaamadee versions iyo releases muhiim ah.",
            "Create an annotated version tag, then push it explicitly to the remote repository.",
            "Samee annotated version tag, kadib si gaar ah ugu push garee remote-ka.",
            "repo", ["Create tags", "List versions", "Publish release tags"],
            ["Samee tags", "Tax versions", "Daabac release tags"], ["git tag", "git tag -a v1.0.0 -m \"First release\"", "git push origin --tags"]),
        Create(15, ".gitignore & Team Workflow", ".gitignore & Habka Kooxda",
            "Keep repositories clean and collaborate consistently.",
            "Repository-ga nadiifi oo kooxda si joogto ah ula shaqee.",
            "Ignore generated files and secrets. Use feature branches, focused commits, pull requests, reviews, and automated checks.",
            "Ka reeb generated files iyo secrets. Adeegso feature branches, commits cad, PR, review, iyo checks.",
            "pr", ["Ignore generated files", "Protect secrets", "Follow a team workflow"],
            ["Ka reeb generated files", "Ilaali secrets", "Raac team workflow"], ["git status --ignored", "git switch -c feature/profile", "git push -u origin feature/profile"])
    ];
}
