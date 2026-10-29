# TechBridge Intern Management Platform

A web platform for TechBridge interns. Interns can track their internship progress, work through their tasks, explore practical challenges and search across everything. It was built step by step during the TechBridge Web Development Internship by Baselink Services Limited.

## Description

The platform has three main parts:

- **Homepage:** introduces the platform and links to everything.
- **Intern Dashboard:** shows the intern's progress and the 8 internship tasks, which can be started, completed, added or deleted. All changes are saved by the backend.
- **Challenge Hub:** a searchable, filterable list of Data Analytics and Web Development challenges with a details panel.

The website talks to a **Node.js + Express API** with `fetch()`. The API stores its data in JSON files:

```
Browser (HTML, CSS, JavaScript)  <-- fetch() -->  Express API  <-->  JSON files (backend/data)
```

## Technologies

| Area | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Backend | Node.js, Express |
| Data | JSON files (`backend/data/tasks.json`, `backend/data/challenges.json`) |
| Hosting (optional) | Render |

There are no frontend frameworks and no database.

## Main Features

**Platform**
- Homepage with links to the dashboard, the Challenge Hub and the internship roadmap
- Shared navbar and footer on every page, a CSS-only mobile menu, and a responsive layout (desktop, tablet and mobile)

**Intern Dashboard**
- Welcome section with the intern's name, track and internship status, plus a countdown (Oct 1 to Oct 31, 2026)
- Progress card: total, completed and remaining tasks, a percentage and a progress bar, all calculated from the API data
- Task tracker: Not Started, In Progress and Completed styles, status filters, search, View Task details, Start Task, Mark as Completed, Add New Task and Delete
- Search across tasks **and** challenges from the top bar, with a "No matching results found." message
- API connection indicator (a real health check), loading messages, error messages with a Retry button, and an empty state
- Technology Explorer (Next.js, Vue.js, Angular and Backend with six backend technologies), a profile card with sample data, notifications, and a dark and light theme

**Challenge Hub**
- 8 challenges (4 Data Analytics, 4 Web Development) at Beginner, Intermediate and Advanced levels, loaded from the API
- Track filter, difficulty filter and search, which work together
- Each card shows the expected outcome, and a details panel shows the overview, objectives, skills, tools, deliverables, estimated time and result

## How to Run Locally

**You need:** Node.js (LTS, from nodejs.org). Check it with `node -v` and `npm -v`.

1. Download or clone the repository.
2. Open a terminal in the project folder and install the backend:
   ```bash
   cd backend
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   You should see `TechBridge platform running at http://localhost:3000`. Leave this terminal open.
4. Open **http://localhost:3000** in your browser. The server serves the website and the API from one address.

You can also open the pages with VS Code Live Server (`http://127.0.0.1:5500`) while the backend is running. The pages then call the API on `http://localhost:3000` automatically (see `config.js`).

**Restore the original task data** (inside `backend`):

```bash
npm run reset-data
```

## Deploy Online (Render)

The Express server serves both the website and the API, so one Render **Web Service** runs the whole platform.

1. Push the project to GitHub. Make sure `node_modules` is not committed (the `.gitignore` file covers it).
2. Create a free account at **render.com** and sign in with GitHub.
3. In the Render Dashboard, click **New** and choose **Web Service**, then select your repository.
4. Use these settings:

   | Setting | Value |
   | --- | --- |
   | Name | `techbridge-platform` (or any name) |
   | Branch | `main` |
   | Root Directory | leave empty |
   | Runtime | Node |
   | Build Command | `cd backend && npm install` |
   | Start Command | `cd backend && npm start` |
   | Instance Type | Free |

   Instead of filling this in by hand, you can click **New > Blueprint**, choose the repository, and Render reads `render.yaml`.
5. Click **Create Web Service** and wait for the deploy to finish. Render gives you a URL such as `https://techbridge-platform.onrender.com`.
6. Open the URL, then `/dashboard.html` and `/challenges.html`, and check that tasks and challenges load.

**Good to know about the free plan**
- Render stops a free service after 15 minutes without traffic. The next visit can take up to a minute to wake it up.
- Free services have a temporary file system. Changes saved to the JSON files (for example completed tasks) are lost when the service restarts or redeploys, and the data returns to the files in the repository.
- Anyone with the URL can change the tasks, because there is no login. Do not put private information in this project.
- `config.js` already uses the same address for the API on a deployed site. If you ever host the website and the API on different addresses, set `REMOTE_API_URL` in `config.js` and `ALLOWED_ORIGIN` on the server.

## API Reference

The base address is `http://localhost:3000` locally, or your Render URL when deployed. Task statuses are `completed`, `progress` and `notstarted`.

| Method | Endpoint | What it does | Success |
| --- | --- | --- | --- |
| GET | `/api/health` | Checks that the backend is running | 200 |
| GET | `/api/tasks` | Returns all tasks | 200 |
| GET | `/api/tasks/:id` | Returns one task | 200 |
| PUT | `/api/tasks/:id` | Updates a task's status | 200 |
| POST | `/api/tasks` | Adds a task | 201 |
| DELETE | `/api/tasks/:id` | Deletes a task | 200 |
| GET | `/api/challenges` | Returns all challenges | 200 |
| GET | `/api/challenges/:id` | Returns one challenge | 200 |
| GET | `/api/search?q=text` | Searches tasks and challenges | 200 |

**Example task (`GET /api/tasks/8`)**

```json
{
  "id": 8,
  "title": "Build the TechBridge Intern Management Platform",
  "description": "Combine the Challenge Hub, Intern Dashboard and Task API into one complete platform, then deploy it.",
  "status": "progress",
  "day": 26,
  "icon": "rocket",
  "skills": ["Integration", "Testing", "Deployment"],
  "deliverables": ["Complete platform", "README", "GitHub repository", "LinkedIn post"]
}
```

**Update a status (`PUT /api/tasks/8`)**

```json
{ "status": "completed" }
```

The response is the updated task. When a task is completed and no task is In Progress, the first Not Started task becomes In Progress.

**Add a task (`POST /api/tasks`)**

```json
{ "title": "Write the README", "description": "Document the platform." }
```

**Search (`GET /api/search?q=JavaScript`)** returns the matching tasks and challenges:

```json
{ "query": "javascript", "total": 3, "tasks": [ ... ], "challenges": [ ... ] }
```

**Error responses**

| Situation | Status | Example message |
| --- | --- | --- |
| Id is not a positive whole number | 400 | `{"error": "Task id must be a positive whole number."}` |
| Task or challenge does not exist | 404 | `{"error": "Task 99 was not found."}` |
| Invalid or missing status | 400 | `{"error": "Status must be one of: completed, progress, notstarted."}` |
| Missing title or description | 400 | `{"error": "Title is required and must be 80 characters or fewer."}` |
| Missing search text | 400 | `{"error": "Search text is required. Use /api/search?q=text."}` |
| Body is not valid JSON | 400 | `{"error": "The request body is not valid JSON."}` |
| Data file cannot be read or written | 500 | `{"error": "Could not read the tasks data."}` |

You can test the API in the browser (open `/api/tasks`), in Postman or Thunder Client, or with `curl`:

```bash
curl http://localhost:3000/api/tasks
curl -X PUT -H "Content-Type: application/json" -d '{"status":"completed"}' http://localhost:3000/api/tasks/8
curl "http://localhost:3000/api/search?q=JavaScript"
```

## Project Structure

```
techbridge/
├── index.html              # Homepage
├── programs.html           # Programs page
├── internship-tasks.html   # Internship roadmap (Data Analytics and Web Development tracks)
├── challenges.html         # Challenge Hub
├── dashboard.html          # Intern Dashboard
├── style.css               # All styles
├── config.js               # Tells the pages where the API is
├── script.js               # Track switching on the roadmap page
├── challenges.js           # Challenge Hub (loads challenges from the API)
├── dashboard.js            # Dashboard (loads and updates tasks through the API)
├── render.yaml             # Optional Render setup
├── .gitignore
├── assets/
│   ├── icons/              # SVG icons, program tiles, step icons
│   └── images/             # Logo, artwork and technology logos (images/tech)
└── backend/
    ├── server.js           # Express server: middleware, routes, static files
    ├── package.json
    ├── reset-data.js       # Restores the original task data
    ├── data-store.js       # Reads and writes the JSON files
    ├── routes/
    │   ├── tasks.js        # /api/tasks
    │   ├── challenges.js   # /api/challenges
    │   └── search.js       # /api/search
    └── data/
        ├── tasks.json
        ├── tasks.default.json
        └── challenges.json
```

## Testing Checklist

- Backend starts with `npm start`, and every endpoint returns the right data and error codes
- Dashboard shows "Loading tasks...", then the 8 tasks from the API, with progress calculated from them
- Start Task, Mark as Completed, Add and Delete update the screen only after the backend confirms, and the changes are still there after a refresh and after restarting the server
- With the backend stopped, the dashboard and the Challenge Hub show an error message with a Retry button, and they recover when the backend returns
- Search finds matching tasks and challenges, and shows "No matching results found." when nothing matches
- Challenge Hub track filter, difficulty filter and search work together
- Every navbar link works on every page
- No horizontal scrolling on desktop, tablet or mobile, and no errors in the browser console

## Troubleshooting

| Problem | What to do |
| --- | --- |
| `node` or `npm` is not recognised | Install Node.js, then open a new terminal |
| "Unable to load tasks" | Start the backend with `npm start` inside `backend`, then press Retry |
| Port 3000 is already in use | Close the program using it, or run with another port (`PORT=3001 npm start`, or in PowerShell `$env:PORT=3001; npm start`) and set `LOCAL_API_URL` in `config.js` |
| A page looks unstyled or empty | Open it through `http://localhost:3000` or Live Server, not by double-clicking the file |
| Deployed site is slow on the first visit | The free Render service was asleep. Wait up to a minute |
| Deployed data went back to the defaults | Expected on the free plan, because the file system is temporary |

## Project History

| Task | What was built |
| --- | --- |
| 1 | Homepage |
| 2 | Programs page |
| 3 | Internship tasks page |
| 4 | Interactive two-track roadmap (first JavaScript) |
| 5 | Challenge Hub with filters and search |
| 6 | Intern Dashboard |
| 7 | Task Management API with Express, connected to the dashboard |
| 8 | Final platform: homepage, challenges from the API, search across tasks and challenges, Start Task flow, deployment |

## License

© Baselink Services Limited. All rights reserved.
