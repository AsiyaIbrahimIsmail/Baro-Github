import type { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: 1,
    title: {
      en: "What is Git?",
      so: "Waa maxay Git?",
    },
    description: {
      en: "Understand version control and why Git powers modern development.",
      so: "Faham xakamaynta noocyada iyo sababta Git u awood u leeyahay horumarinta casriga ah.",
    },
    content: {
      en: `Git is a **distributed version control system** — think of it as a Time Machine for your code. Every save point (commit) lets you travel back to any moment in your project's history.

Unlike saving files manually (v1.doc, v2.doc), Git tracks *every change* with precision. Teams worldwide use it to collaborate without overwriting each other's work.

**Key concepts:**
- **Repository (repo):** Your project's folder + its entire history
- **Commit:** A snapshot of your files at a point in time
- **Branch:** A parallel timeline for experimenting safely`,
      so: `Git waa **nidaam xakamaynta noocyada loo qaybiyay** — u maley sida Time Machine u ah koodhkaaga. Dhibic kasta oo kayd ah (commit) waxay kuu ogolaanaysaa inaad dib ugu noqoto daqiiqad kasta taariikhda mashruucaaga.

Si ka duwan kaydinta faylasha gacanta (v1.doc, v2.doc), Git wuxuu raadraacaa *isbeddel kasta* si sax ah. Kooxaha adduunka oo dhan waxay u isticmaalaan inay iskaashi sameeyaan iyagoon isku qorin shaqada midba midka kale.

**Fikradaha muhiimka ah:**
- **Repository (repo):** Faylka mashruucaaga + taariikhdiisa oo dhan
- **Commit:** Sawir-gacmeed faylashaaga daqiiqad gaar ah
- **Branch:** Khad waqti oo isku xigta oo tijaabo ammaan ah`,
    },
    diagram: "repo",
    objectives: {
      en: [
        "Define version control",
        "Explain what a repository is",
        "Understand commits as snapshots",
      ],
      so: [
        "Qeex xakamaynta noocyada",
        "Sharax waxa repository yahay",
        "Faham commits sida sawir-gacmeedyada",
      ],
    },
    commands: ["git --version", "git init"],
  },
  {
    id: 2,
    title: {
      en: "git init & Commits",
      so: "git init & Commits",
    },
    description: {
      en: "Initialize a repository and create your first commits.",
      so: "Bilow repository oo samee commits-kaaga ugu horreeya.",
    },
    content: {
      en: `**git init** creates a hidden \`.git\` folder — your project's memory. From this moment, Git watches every change.

To save a snapshot:
1. Create or edit files in your project
2. **git add .** — stage all changes (prepare them for saving)
3. **git commit -m "message"** — permanently record the snapshot

Think of staging like packing a box before shipping. You choose exactly what goes in each shipment (commit).`,
      so: `**git init** wuxuu abuuraa fayl qarsoon \`.git\` — xusuusta mashruucaaga. Laga bilaabo daqiiqaddan, Git wuxuu daawadaa isbeddel kasta.

Si aad u kaydiso sawir-gacmeed:
1. Abuur ama wax ka beddel faylasha mashruucaaga
2. **git add .** — diyaari dhammaan isbeddellada (u diyaari kaydinta)
3. **git commit -m "farriin"** — si joogto ah u diiwaangeli sawir-gacmeedka

U maley staging sida xidhida sanduuq ka hor inta aan la dirin. Waxaad doorataa waxa saxda ah ee ku jira maraakiibta kasta (commit).`,
    },
    diagram: "init-commit",
    objectives: {
      en: [
        "Run git init to start a repo",
        "Stage files with git add",
        "Create commits with meaningful messages",
      ],
      so: [
        "Orod git init si aad u bilowdo repo",
        "Diyaari faylasha git add",
        "Samee commits farriimo macno leh",
      ],
    },
    commands: ["git init", "git add .", 'git commit -m "Initial commit"'],
  },
  {
    id: 3,
    title: {
      en: "The Staging Area",
      so: "Staging Area",
    },
    description: {
      en: "Master the three-tree architecture: working directory, staging, and commits.",
      so: "Ku baro qaab-dhismeedka saddexda geed: working directory, staging, iyo commits.",
    },
    content: {
      en: `Git has three "zones" for your files:

1. **Working Directory** — where you edit files (like a Facebook draft)
2. **Staging Area (Index)** — files ready to be committed (like clicking "Post")
3. **Repository** — committed snapshots (your published timeline)

Use **git status** to see where your files are. Use **git add <file>** to move files to staging selectively.`,
      so: `Git wuxuu leeyahay saddex "zone" faylashaaga:

1. **Working Directory** — meesha aad faylasha wax ka beddesho (sida qoraal Facebook ah)
2. **Staging Area (Index)** — faylasha diyaar u ah in la commit gareeyo (sida gujinta "Post")
3. **Repository** — sawir-gacmeedyada la commit gareeyay (waqtigaaga la daabacay)

Isticmaal **git status** si aad u aragto meesha faylashaagu joogaan. Isticmaal **git add <file>** si aad faylasha ugu wareejiso staging si xulasho leh.`,
    },
    diagram: "staging",
    objectives: {
      en: [
        "Explain the three Git trees",
        "Use git status effectively",
        "Stage files selectively",
      ],
      so: [
        "Sharax saddexda geed ee Git",
        "Si wax ku ool ah u isticmaal git status",
        "Diyaari faylasha si xulasho leh",
      ],
    },
    commands: ["git status", "git add index.html", "git add ."],
  },
  {
    id: 4,
    title: {
      en: "Branching",
      so: "Laamaynta (Branching)",
    },
    description: {
      en: "Create branches to work on features without breaking main code.",
      so: "Abuur laamo si aad u shaqeyso features adigoon jebin koodhka ugu weyn.",
    },
    content: {
      en: `Branches are parallel timelines. The default branch is usually **main** (or master).

- **git branch feature-x** — create a new branch
- **git checkout feature-x** — switch to that branch
- **git branch** — list all branches

Imagine branches as alternate universes: you can experiment freely, and only merge back when ready.`,
      so: `Laamaha waa khadad waqti oo isku xigta. Laanta caadiga ah badanaa waa **main** (ama master).

- **git branch feature-x** — abuur laan cusub
- **git checkout feature-x** — u wareeji laantaas
- **git branch** — liiska dhammaan laamaha

U maley laamaha sida caalamyo kale: waxaad si xor ah u tijaabin kartaa, oo kaliya isku dar marka aad diyaar tahay.`,
    },
    diagram: "branching",
    objectives: {
      en: [
        "Create new branches",
        "Switch between branches",
        "Understand branch pointers",
      ],
      so: [
        "Abuur laamo cusub",
        "U wareeji laamaha dhexdooda",
        "Faham tilmaamayaasha laamaha",
      ],
    },
    commands: ["git branch feature-login", "git checkout feature-login", "git branch"],
  },
  {
    id: 5,
    title: {
      en: "Merging",
      so: "Isku darka (Merging)",
    },
    description: {
      en: "Combine branch histories back into a single timeline.",
      so: "Isku dar taariikhda laamaha dib hal khad waqti.",
    },
    content: {
      en: `When your feature is ready, merge it back:

1. **git checkout main** — switch to the target branch
2. **git merge feature-x** — combine feature-x into main

Git creates a merge commit that has two parents. If changes conflict, Git asks you to resolve them manually.`,
      so: `Marka feature-kaagu diyaar yahay, dib ugu dar:

1. **git checkout main** — u wareeji laanta bartilmaameedka
2. **git merge feature-x** — isku dar feature-x main

Git wuxuu abuuraa merge commit leh laba waalid. Haddii isbeddelladu isku dhacaan, Git wuxuu kaa codsanayaa inaad gacanta xalliso.`,
    },
    diagram: "merging",
    objectives: {
      en: [
        "Merge branches safely",
        "Understand merge commits",
        "Handle basic conflicts",
      ],
      so: [
        "Si ammaan ah u isku dar laamaha",
        "Faham merge commits",
        "Xalli khilaafaadka aasaasiga ah",
      ],
    },
    commands: ["git checkout main", "git merge feature-login"],
  },
  {
    id: 6,
    title: {
      en: "Pull Requests",
      so: "Pull Requests",
    },
    description: {
      en: "Collaborate on GitHub with code review and pull requests.",
      so: "Iskaashi ku samee GitHub adigoo isticmaalaya dib u eegista koodhka iyo pull requests.",
    },
    content: {
      en: `Pull Requests (PRs) are the social layer of Git:

1. Push your branch to GitHub: **git push origin feature-x**
2. Open a PR on GitHub — ask teammates to review
3. After approval, merge via the GitHub UI

PRs enable discussion, CI checks, and knowledge sharing before code hits production.`,
      so: `Pull Requests (PRs) waa lakabka bulshada ee Git:

1. Ku riix laantaada GitHub: **git push origin feature-x**
2. Fur PR GitHub — weydii asxaabta inay dib u eegaan
3. Ka dib ansixinta, isku dar UI-ga GitHub

PRs waxay awood u siiyaan dood, hubinta CI, iyo wadaagista aqoonta ka hor inta koodhku gaarin production.`,
    },
    diagram: "pr",
    objectives: {
      en: [
        "Understand the PR workflow",
        "Know when to open a PR",
        "Appreciate code review benefits",
      ],
      so: [
        "Faham habka shaqada PR",
        "Ogow goorta PR la furo",
        "Qiimee faa'iidooyinka dib u eegista koodhka",
      ],
    },
    commands: ["git push origin feature-login"],
  },
  {
    id: 7,
    title: { en: "History & Differences", so: "Taariikhda & Farqiga" },
    description: {
      en: "Inspect commits and understand exactly what changed.",
      so: "Eeg commits-ka oo faham waxa saxda ah ee isbeddelay.",
    },
    content: {
      en: `Use **git log** to read commit history and **git diff** to inspect changes before committing.

- **git log --oneline** shows a compact history
- **git show <hash>** displays one commit
- **git diff** compares unstaged work
- **git diff --staged** compares staged work`,
      so: `Isticmaal **git log** si aad u akhrido taariikhda commits-ka, iyo **git diff** si aad u eegto isbeddellada ka hor commit.

- **git log --oneline** wuxuu soo bandhigaa taariikh kooban
- **git show <hash>** wuxuu muujiyaa hal commit
- **git diff** wuxuu isbarbar dhigaa shaqada aan la stage-gareyn
- **git diff --staged** wuxuu eegaa shaqada la stage-gareeyay`,
    },
    diagram: "repo",
    objectives: {
      en: ["Read commit history", "Inspect a commit", "Compare file changes"],
      so: ["Akhri taariikhda commits-ka", "Eeg hal commit", "Isbarbar dhig isbeddellada"],
    },
    commands: ["git log --oneline", "git show HEAD", "git diff", "git diff --staged"],
  },
  {
    id: 8,
    title: { en: "Undoing Changes", so: "Ka Noqoshada Isbeddellada" },
    description: {
      en: "Recover safely from common Git mistakes.",
      so: "Si ammaan ah uga soo kabso khaladaadka Git.",
    },
    content: {
      en: `Git gives you several ways to undo work:

- **git restore file.txt** discards an unstaged file change
- **git restore --staged file.txt** removes a file from staging
- **git revert <hash>** creates a new commit that reverses an old commit

Use **revert** for shared history. Be careful with reset because it can discard work.`,
      so: `Git wuxuu leeyahay dhowr hab oo isbeddel looga noqdo:

- **git restore file.txt** wuxuu tuuraa isbeddel aan la stage-gareyn
- **git restore --staged file.txt** wuxuu faylka ka saaraa staging
- **git revert <hash>** wuxuu sameeyaa commit cusub oo ka noqda commit hore

Isticmaal **revert** marka taariikhda lala wadaago dad kale. Ka taxaddar reset.`,
    },
    diagram: "staging",
    objectives: {
      en: ["Restore a file", "Unstage safely", "Reverse a shared commit"],
      so: ["Soo celi fayl", "Ka saar staging si ammaan ah", "Ka noqo commit la wadaago"],
    },
    commands: ["git restore app.js", "git restore --staged app.js", "git revert HEAD"],
  },
  {
    id: 9,
    title: { en: "Remote Repositories", so: "Remote Repositories" },
    description: {
      en: "Connect a local project to GitHub or another Git server.",
      so: "Ku xir mashruuca gudaha GitHub ama Git server kale.",
    },
    content: {
      en: `A **remote** is a copy of your repository hosted elsewhere. The usual remote name is **origin**.

Add a remote with **git remote add origin <url>**. Use **git remote -v** to inspect it, then push your main branch with **git push -u origin main**.`,
      so: `**Remote** waa nuqul repository-gaaga ah oo meel kale lagu kaydiyo. Magaca caadiga ah waa **origin**.

Ku dar remote adigoo adeegsanaya **git remote add origin <url>**. Ku eeg **git remote -v**, kadib main ku dir **git push -u origin main**.`,
    },
    diagram: "pr",
    objectives: {
      en: ["Explain remotes", "Add an origin", "Publish a branch"],
      so: ["Sharax remotes", "Ku dar origin", "Daabac branch"],
    },
    commands: ["git remote -v", "git remote add origin <url>", "git push -u origin main"],
  },
  {
    id: 10,
    title: { en: "Clone, Fetch & Pull", so: "Clone, Fetch & Pull" },
    description: {
      en: "Download repositories and synchronize new work.",
      so: "Soo dejiso repositories oo la jaanqaad shaqada cusub.",
    },
    content: {
      en: `**git clone <url>** downloads a repository and its history. **git fetch** downloads remote updates without changing your files. **git pull** fetches and integrates updates into your current branch.

Fetch first when you want to inspect incoming work before merging it.`,
      so: `**git clone <url>** wuxuu soo dejiyaa repository iyo taariikhdiisa. **git fetch** wuxuu soo qaataa cusboonaysiinta isagoo aan faylasha beddelin. **git pull** wuxuu soo qaataa kadibna ku daraa branch-kaaga.

Marka aad rabto inaad marka hore eegto shaqada soo socota, isticmaal fetch.`,
    },
    diagram: "pr",
    objectives: {
      en: ["Clone a repository", "Fetch remote updates", "Pull team changes"],
      so: ["Clone garee repository", "Soo qaado cusboonaysiin", "La soo deg isbeddelka kooxda"],
    },
    commands: ["git clone <url>", "git fetch origin", "git pull origin main"],
  },
  {
    id: 11,
    title: { en: "Merge Conflicts", so: "Khilaafaadka Merge-ka" },
    description: {
      en: "Understand, resolve, and complete a conflicted merge.",
      so: "Faham oo xalli khilaafaadka merge-ka.",
    },
    content: {
      en: `A conflict happens when Git cannot choose between competing edits. Open each conflicted file and find the markers **<<<<<<<**, **=======**, and **>>>>>>>**.

Choose the correct content, remove the markers, stage the resolved file, and commit the merge.`,
      so: `Khilaaf wuxuu dhacaa marka Git uusan kala dooran karin laba isbeddel. Fur faylka oo raadi calaamadaha **<<<<<<<**, **=======**, iyo **>>>>>>>**.

Dooro qoraalka saxda ah, ka saar calaamadaha, stage garee faylka, kadib commit samee.`,
    },
    diagram: "merging",
    objectives: {
      en: ["Recognize conflict markers", "Resolve file conflicts", "Finish a merge"],
      so: ["Aqoonso calaamadaha khilaafka", "Xalli khilaafka faylka", "Dhammaystir merge"],
    },
    commands: ["git status", "git add resolved-file.txt", "git commit"],
  },
  {
    id: 12,
    title: { en: "Rebase", so: "Rebase" },
    description: {
      en: "Keep feature-branch history clean and current.",
      so: "Ka dhig taariikhda feature branch mid nadiif ah oo cusub.",
    },
    content: {
      en: `**git rebase main** replays your branch commits on top of the latest main branch. This creates a straight history.

Rebase local feature work, but avoid rebasing commits other people already use. Resolve conflicts, stage files, then run **git rebase --continue**.`,
      so: `**git rebase main** wuxuu commits-ka branch-kaaga dul saaraa main-kii ugu dambeeyay. Tani waxay samaysaa taariikh toosan.

Rebase ku samee shaqadaada gudaha, laakiin ha rebase-gareyn commits dad kale isticmaalaan. Xalli khilaafka kadib isticmaal **git rebase --continue**.`,
    },
    diagram: "branching",
    objectives: {
      en: ["Explain rebase", "Update a feature branch", "Continue or abort a rebase"],
      so: ["Sharax rebase", "Cusboonaysii feature branch", "Sii wad ama jooji rebase"],
    },
    commands: ["git rebase main", "git rebase --continue", "git rebase --abort"],
  },
  {
    id: 13,
    title: { en: "Stashing Work", so: "Kaydinta Shaqo Ku-meel-gaar ah" },
    description: {
      en: "Temporarily save unfinished changes without committing.",
      so: "Si ku-meel-gaar ah u kaydi isbeddel aan commit ahayn.",
    },
    content: {
      en: `Use **git stash** when you need a clean working directory but are not ready to commit.

List saved work with **git stash list**. Restore the latest stash with **git stash pop**, or use **git stash apply** to restore it while keeping the stash entry.`,
      so: `Isticmaal **git stash** marka aad rabto working directory nadiif ah laakiin aadan diyaar u ahayn commit.

Ku tax kaydka **git stash list**. Soo celi kii ugu dambeeyay adigoo adeegsanaya **git stash pop**, ama **git stash apply** si nuqulku u sii jiro.`,
    },
    diagram: "staging",
    objectives: {
      en: ["Stash unfinished work", "List stashes", "Restore saved changes"],
      so: ["Kaydi shaqo aan dhammaan", "Tax stashes", "Soo celi isbeddellada"],
    },
    commands: ["git stash", "git stash list", "git stash pop"],
  },
  {
    id: 14,
    title: { en: "Tags & Releases", so: "Tags & Releases" },
    description: {
      en: "Mark important versions such as releases.",
      so: "Calaamadee versions muhiim ah sida releases.",
    },
    content: {
      en: `Tags give memorable names to important commits. Create an annotated release tag with **git tag -a v1.0.0 -m "First release"**.

Tags are not pushed automatically. Publish one with **git push origin v1.0.0**, or publish all tags with **git push origin --tags**.`,
      so: `Tags waxay magac la xasuusan karo siiyaan commits muhiim ah. Samee release tag adigoo adeegsanaya **git tag -a v1.0.0 -m "First release"**.

Tags si toos ah looma push-gareeyo. Mid ku dir **git push origin v1.0.0**, ama dhammaan ku dir **git push origin --tags**.`,
    },
    diagram: "repo",
    objectives: {
      en: ["Create an annotated tag", "List versions", "Publish release tags"],
      so: ["Samee annotated tag", "Tax versions", "Daabac release tags"],
    },
    commands: ["git tag", "git tag -a v1.0.0 -m \"First release\"", "git push origin --tags"],
  },
  {
    id: 15,
    title: { en: ".gitignore & Team Workflow", so: ".gitignore & Habka Kooxda" },
    description: {
      en: "Keep repositories clean and collaborate with a repeatable workflow.",
      so: "Repository-ga nadiifi oo kooxda kula shaqee hab joogto ah.",
    },
    content: {
      en: `A **.gitignore** file tells Git which generated or secret files not to track, such as **node_modules/**, **dist/**, and **.env**.

A reliable team workflow is: pull main, create a feature branch, make focused commits, push the branch, open a pull request, address review, and merge after checks pass.`,
      so: `Faylka **.gitignore** wuxuu Git u sheegaa faylasha generated-ka ama sirta ah ee aan la raacin, sida **node_modules/**, **dist/**, iyo **.env**.

Hab kooxeed fiican waa: pull main, samee feature branch, samee commits cad, push branch-ka, fur pull request, sax review-ga, kadib merge samee marka checks-ku gudbaan.`,
    },
    diagram: "pr",
    objectives: {
      en: ["Ignore generated files", "Protect local secrets", "Follow a team workflow"],
      so: ["Iska dhaaf generated files", "Ilaali sirta gudaha", "Raac hab kooxeed"],
    },
    commands: ["git status --ignored", "git switch -c feature/profile", "git push -u origin feature/profile"],
  },
];

export const TOTAL_LESSONS = lessons.length;
