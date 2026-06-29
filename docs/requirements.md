# Baro-Git Product Requirements

## 1. Product Summary

Baro-Git is an interactive Git learning platform for English- and
Somali-speaking learners. It combines structured content, guided practice,
visual feedback, saved progress, administration tools, and an AI tutor.

## 2. Target Users

### Learner

A beginner who wants to understand Git concepts and practice common workflows.

### Administrator

A trusted course manager who creates, updates, publishes, orders, and removes
lessons.

## 3. Version One Scope

### Authentication

- Users can register with name, email, and password.
- Users can log in and log out.
- Passwords are stored only as secure hashes.
- The system supports `Learner` and `Admin` roles.
- Protected API endpoints require a valid JWT.

### Lessons

- The first release contains at least 15 ordered lessons.
- Every lesson has English and Somali content.
- A lesson includes a title, description, body, objectives, commands, diagram
  type, publication status, and sort order.
- Learners can navigate between lessons on mobile and desktop.
- Unpublished lessons are visible only to administrators.

### Learning Tools

- A simulated terminal supports the commands taught by the curriculum.
- The terminal returns clear success and error feedback.
- A Git graph visualizes commits, branches, HEAD, and merges.
- Lesson examples and practice commands are connected to the active lesson.

### Progress

- Authenticated learners can mark lessons complete.
- Progress survives refresh, logout, and use on another device.
- The dashboard displays completed and total lessons.

### AI Tutor

- Learners can ask questions about the active lesson.
- The tutor responds in the selected language.
- The backend communicates with Gemini; the frontend never receives the API key.
- AI failure does not break lessons or progress.
- Chat persistence failure does not discard a successful AI response.

### Administration

- Admins can create, edit, publish, reorder, and delete lessons.
- Learners cannot access lesson-management operations.
- Destructive actions require confirmation.
- Forms display validation and API errors.

### User Experience

- The interface supports light and dark themes.
- The initial theme follows the operating system.
- A manual preference is remembered.
- The interface supports English and Somali.
- The application works on mobile, tablet, and desktop.
- Loading, empty, error, and unauthorized states are designed.

## 4. Non-Functional Requirements

- No secret is committed to Git.
- Input is validated by both frontend and backend.
- Database queries are asynchronous.
- APIs return consistent error responses.
- Pull requests require review and passing builds.
- Core backend and frontend behavior has automated tests.
- The application meets reasonable keyboard navigation and contrast standards.

## 5. Out of Scope for Version One

- Real shell access on the learner's computer
- Running destructive Git commands against real repositories
- Social networking or public user profiles
- Payments and subscriptions
- Native mobile applications

## 6. Success Criteria

Version one is ready when:

- A new user can register, log in, and complete a lesson.
- Progress is saved in MySQL and restored after login.
- All 25 lessons work in both languages.
- An admin can manage lessons without database tools.
- The terminal and graph demonstrate the core curriculum.
- The AI tutor returns lesson-aware responses.
- CI builds and tests both applications successfully.

