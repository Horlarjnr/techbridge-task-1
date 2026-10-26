# TechBridge

The website for **TechBridge**, a learning initiative by **Baselink Services Limited**. TechBridge offers practical training in **Data Analytics** and **Web Development**, plus a **30-Day Practical Internship** that ends with a recommendation letter, based on participation and performance.

The website is a static build in plain HTML5 and CSS3, with vanilla JavaScript on the Internship Tasks page (Task 4), the Challenge Hub (Task 5) and the Intern Dashboard (Task 6). Task 7 adds a small Node.js + Express backend that the dashboard talks to. It has no frameworks, no build step and no dependencies.

## Pages

| Page | File | Description |
| --- | --- | --- |
| Homepage (Task 1) | `index.html` | Introduces TechBridge, the programs, the internship and how to get in touch |
| Programs (Task 2) | `programs.html` | Explains the two programs, their skills and how they differ, with a clear next step |
| Internship Tasks (Tasks 3 and 4) | `internship-tasks.html` | Shows the 30-day internship as an interactive roadmap. Visitors switch between the Data Analytics and Web Development tracks to see the 8 tasks of each |
| Challenge Hub (Task 5) | `challenges.html` | A searchable, filterable collection of practical challenges for both tracks, with a details panel for each |
| Intern Dashboard (Tasks 6 and 7) | `dashboard.html` | Progress overview, task tracker connected to the backend API, Technology Explorer, quick actions and profile |

All pages share the same navbar, buttons, typography, colours and footer, so they read as one website.

---

## Task 1: Homepage

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Navbar | n/a | Logo, section links and "Apply Now" button |
| Hero | `#home` | Headline, intro and main call to action |
| About | `#about` | What TechBridge is and why it exists |
| Programs | `#programs` | Short overview of the Data Analytics and Web Development programs |
| Internship | `#internship` | 30-Day Practical Internship details and apply button |
| Why TechBridge | n/a | Four-column overview of the program's focus |
| Contact / CTA | `#contact` | Apply and community-join calls to action |
| Footer | n/a | Navigation links and social/contact icons |

### Highlights
- The internship illustration is blended into its section using CSS masking and `mix-blend-mode`, so it fades into the gradient instead of showing as a box.
- Scroll and entrance animations, with a `prefers-reduced-motion` fallback.

---

## Task 2: Programs Page

The Programs page answers one question for visitors: **"What can I learn at TechBridge?"** It is a separate page, `programs.html`, that builds on the Task 1 site instead of replacing it.

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Hero | `#top` | "Build Skills That Move You Forward." with the main apply button and a "Learn More" link |
| About our programs | n/a | "Learn by doing" with three steps: Learn, Practice, Build |
| Choose Your Path | `#paths` | Two program cards: Data Analytics (`#data-analytics`) and Web Development (`#web-development`) |
| The Difference | n/a | "Two Paths. One Mission." side-by-side comparison of the two programs |
| Call to action | n/a | Apply for the internship, plus a link back to the homepage |
| Footer | n/a | Same footer as the homepage, with a green and purple corner glow |

### The two programs

| Program | Focus | Key skills |
| --- | --- | --- |
| **Data Analytics** (green) | Working with data and extracting insights | Spreadsheet analysis, data cleaning, SQL, data visualization, business analysis |
| **Web Development** (purple) | Designing and building websites and web applications | HTML, CSS, JavaScript, Git/GitHub, web projects |

Each program has its own accent colour (green and purple), so visitors can tell them apart at a glance while the base stays on-brand.

### Highlights
- Program cards with a colour wash, artwork, skill pills and a hover lift effect.
- A comparison panel that spells out the difference between the two programs.
- Every apply button leads to the official application form.
- Fully responsive. The cards and comparison columns stack on tablet and mobile.
- Background artwork uses normal `<img>` tags, so the image paths work from the HTML file wherever the stylesheet lives.

---

## Task 3: Internship Tasks Page

> **Note:** Task 4 upgraded this page into an interactive two-track roadmap (see the next section). The zig-zag layout described here is the Task 3 version, which stays in the Git history.

The Internship Tasks page answers: **"What am I expected to complete during this internship?"** It is a separate page, `internship-tasks.html`, that presents the whole 30-day journey and links with the Homepage and Programs pages.

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Hero | `#top` | "Your Journey. Your Projects. Your Growth.", with "30 Days" and "8 Practical Tasks" badges and an "Explore the Tasks" link |
| Roadmap | `#roadmap` | "Internship Tasks Roadmap": all 8 tasks in a zig-zag timeline |
| Call to action | n/a | "Join the TechBridge Internship Today!" with the apply button and a link back to the homepage |
| Footer | n/a | Same footer as the other pages |

### The 8 tasks

| Task | Title | Day | Difficulty label |
| --- | --- | --- | --- |
| 01 | Build the TechBridge Homepage | 1 | Beginner |
| 02 | Build the TechBridge Programs Experience | 4 | Beginner |
| 03 | Build the Internship Tasks Experience | 8 | Beginner to Intermediate |
| 04 | Build an Interactive Task Tracker | 11 | Intermediate |
| 05 | Build the Intern Registration Experience | 15 | Intermediate |
| 06 | Build the Task Submission System | 19 | Intermediate |
| 07 | Build the Intern Dashboard | 22 | Intermediate to Advanced Beginner |
| 08 | Build the Complete TechBridge Platform | 26 | Capstone |

Each card shows the task number, title, day, a short description, a difficulty label and an icon. The difficulty labels are a guide to how the internship becomes more challenging, not official ratings. No task is marked as completed, available or locked.

### Highlights
- A connected timeline with a glowing centre line and numbered nodes. Green cards sit on the left and purple cards on the right, so the sequence reads clearly from Day 1 to Day 26.
- On tablet and mobile the roadmap becomes a single column along a line on the left.
- The roadmap is built from real HTML and CSS rather than an image, so the text is readable by screen readers and the cards stay responsive.
- The eight task icons and the rocket icon are lightweight inline SVGs, so no extra icon files are needed.
- No JavaScript. The page uses HTML5 and CSS3 only.

---

## Task 4: Interactive Internship Roadmap

Task 4 upgrades `internship-tasks.html` so visitors can **choose a track** and see its complete 8-task journey, without the page reloading. It uses HTML5, CSS3 and vanilla JavaScript, with no frameworks.

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Hero | `#top` | "Two Tracks. One Goal.", with "30 Days" and "8 Tasks Per Track" cards and an "Explore the Tasks" link |
| Track selector | `#tracks` | Two buttons: Data Analytics (green) and Web Development (purple) |
| Roadmap | `#roadmap` | The 8 tasks of the selected track, with a "Currently viewing" label and a difficulty legend |
| Call to action | n/a | "Join the TechBridge Internship" with the apply button and a link back to the homepage |
| Footer | n/a | Same footer as the other pages |

### The two tracks

Web Development is selected when the page first loads. All content comes from the official Task 4 brief.

**Data Analytics**

| Task | Title | Day | Difficulty |
| --- | --- | --- | --- |
| 01 | Data Cleaning Basics | 1 | Beginner |
| 02 | Formulas & Pivot Tables | 4 | Beginner |
| 03 | Data Visualization | 8 | Beginner to Intermediate |
| 04 | Introduction to SQL | 11 | Beginner to Intermediate |
| 05 | SQL Joins & Aggregations | 15 | Intermediate |
| 06 | Lookup Functions & Data Wrangling | 19 | Intermediate |
| 07 | Mini Analysis Project | 22 | Intermediate |
| 08 | Capstone Project | 26 | Intermediate |

**Web Development**

| Task | Title | Day | Difficulty |
| --- | --- | --- | --- |
| 01 | Build the TechBridge Homepage | 1 | Beginner |
| 02 | Build the TechBridge Programs Experience | 4 | Beginner |
| 03 | Build the Internship Tasks Experience | 8 | Beginner to Intermediate |
| 04 | Build an Interactive Internship Roadmap | 11 | Beginner to Intermediate |
| 05 | Build the Intern Registration Experience | 15 | Intermediate |
| 06 | Build the Task Submission System | 19 | Intermediate |
| 07 | Build the Intern Dashboard | 22 | Intermediate |
| 08 | Build the Complete TechBridge Internship Platform | 26 | Intermediate |

### How the JavaScript works

All the code is in `script.js`, written in a simple, beginner-friendly style.

| Concept | Where it is used |
| --- | --- |
| Variables | `selectedTrack` stores the track that is currently shown |
| Arrays | `internshipTracks` holds one array of tasks for each track |
| Objects | Each task is an object with `number`, `day`, `title`, `description`, `difficulty` and `icon` |
| Functions | `renderTrack()` shows a track, and `createTaskCard()` builds one task card |
| Event listeners | Each track button listens for clicks |
| Conditional logic | `getDifficultyClass()` picks the colour for each difficulty, and the click handler only re-renders when a different track is chosen |
| DOM manipulation | The task cards, headings, "Currently viewing" label and active button are updated without reloading the page |

The cards are built with `createElement` and `textContent`, so no raw HTML is inserted from the data.

### Highlights
- The selected track has a glowing border and a "Selected" label, so the state is not shown by colour alone.
- Each track has its own accent colour, heading and subtitle.
- The track buttons are real `<button>` elements with `aria-pressed`, so they work with a keyboard and screen readers.
- The roadmap list uses `aria-live="polite"`, so changes can be announced to assistive technology.
- Visitors without JavaScript see a short message asking them to turn it on.
- On mobile, the buttons stack and each task card becomes a single column along a line on the left.
- `prefers-reduced-motion` is respected.

---

## Task 5: Challenge Hub

The Challenge Hub answers: **"What kind of challenges will I actually be working on?"** Visitors can browse practical challenges from both tracks, filter and search them, and open the details of any challenge without leaving the page. It is a separate page, `challenges.html`, with its own script, `challenges.js`.

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Hero | `#top` | "TechBridge Challenge Hub", an introduction, three indicator cards (2 Tracks, 6+ Challenges, Build Your Skills) and an illustration |
| Filters | n/a | Track buttons, difficulty buttons and a search field |
| Available Challenges | `#challenges` | The challenge cards, a result count and a "No challenges found" message |
| Details panel | n/a | A dialog showing the full information for the selected challenge |
| Call to action | n/a | "Join the TechBridge Internship" with the apply button and a link back to the homepage |
| Footer | n/a | Same footer as the other pages |

### The challenges

| No. | Challenge | Track | Difficulty | Day |
| --- | --- | --- | --- | --- |
| 01 | Sales Performance Analysis | Data Analytics | Beginner | 1 |
| 02 | Customer Insights Report | Data Analytics | Beginner | 4 |
| 03 | Business KPI Dashboard | Data Analytics | Intermediate | 8 |
| 04 | Developer Portfolio Website | Web Development | Beginner | 11 |
| 05 | Product Landing Page | Web Development | Beginner | 15 |
| 06 | Interactive Web Experience | Web Development | Intermediate | 19 |
| 07 | Customer Churn Analysis | Data Analytics | Advanced | 22 |
| 08 | Task Manager Web App | Web Development | Advanced | 26 |

Challenges 07 and 08 were added so that the Advanced filter always has results. Each challenge has an overview, learning objectives, required skills, suggested tools, deliverables, an estimated time and an expected result.

### How the JavaScript works

All the code is in `challenges.js`.

| Concept | Where it is used |
| --- | --- |
| Data | The `challenges` array holds one object per challenge, so no card is written by hand in the HTML |
| State | `selectedTrack`, `selectedLevel` and `searchText` store the current filters |
| Filtering | `matchesFilters()` checks the track, difficulty and search text together |
| Rendering | `renderChallenges()` rebuilds the cards, the result count, the empty message and the active buttons |
| Details | `openChallenge()` fills the dialog with the selected challenge and opens it |
| Events | Click listeners on the filter buttons and "View Challenge" buttons, an input listener on the search field, and a click listener on the dialog backdrop |

- **Filters work together:** selecting Data Analytics and Beginner shows only beginner Data Analytics challenges.
- **Search:** it matches the title, description, track name and difficulty, and it works together with both filters.
- **Safe rendering:** the cards are built with `createElement` and `textContent`.

### Highlights
- The details panel uses the native HTML `<dialog>` element. It closes with the X button, the Escape key or a click outside the panel, and it keeps keyboard focus inside while open.
- On desktop the details panel floats on the right. On mobile it becomes a full-width sheet at the bottom of the screen.
- Data Analytics cards are green and Web Development cards are purple, matching the rest of the site.
- Filter buttons use `aria-pressed`, and the result count uses `aria-live`, so changes are announced to screen readers.
- The card grid adapts from three columns to two to one, and the filter bar wraps on smaller screens.
- "Start Challenge" opens the official application form in a new tab, because there is no challenge submission system yet.
- Visitors without JavaScript see a short message asking them to turn it on.

---

## Task 6: Intern Dashboard

The Intern Dashboard (`dashboard.html`, with `dashboard.js`) gives an intern one place to see their progress, manage their tasks and explore modern web technologies.

- **Overview:** a welcome message, the internship status, a countdown (Oct 1 to Oct 31, 2026) and a progress card with a bar.
- **Task tracker:** task cards with Completed, In Progress and Not Started styles, status filters, search, View Task details and Mark as Completed.
- **Technology Explorer:** Next.js, Vue.js, Angular and Backend, with the six backend technologies and a Learn More link for each.
- **Extras:** a dark and light theme toggle, notifications, a profile card with sample data, a collapsible sidebar on small screens and a Continue Task button.
- **Scale:** the page is shown at 80% size on screens wider than 900px, so it fits more on screen.

---

## Task 7: Task Management API

In Task 7 the dashboard stops using hardcoded task data. A **Node.js + Express** backend stores the tasks in `backend/data/tasks.json`, and the dashboard loads and updates them with `fetch()`:

```
Dashboard (browser)  <-- fetch() -->  Express API (localhost:3000)  <-->  backend/data/tasks.json
```

### Prerequisites

- **Node.js** (the LTS version from nodejs.org). Check it with `node -v` and `npm -v`.
- A browser, and optionally VS Code with the Live Server extension.

### Install and start the backend

Run these commands inside the `backend` folder:

```bash
cd backend
npm install
npm start
```

You should see `TechBridge API running at http://localhost:3000`. Leave that terminal open while you use the dashboard.

### Open the dashboard

Use either option:

1. **From the backend:** open `http://localhost:3000/dashboard.html`. The server also serves the website files, so the site and API share one address.
2. **With Live Server:** keep the backend running, then open `dashboard.html` with Live Server (for example `http://127.0.0.1:5500/dashboard.html`). The dashboard automatically sends its requests to `http://localhost:3000`.

### API endpoints

The task status values are `completed`, `progress` and `notstarted`.

| Method | Endpoint | What it does | Success |
| --- | --- | --- | --- |
| GET | `/api/tasks` | Returns all tasks | 200 |
| GET | `/api/tasks/:id` | Returns one task | 200 |
| PUT | `/api/tasks/:id` | Updates a task's status | 200 |
| POST | `/api/tasks` | Adds a new task (optional) | 201 |
| DELETE | `/api/tasks/:id` | Deletes a task (optional) | 200 |
| GET | `/api/health` | Checks that the backend is running | 200 |

**Example task (`GET /api/tasks/7`)**

```json
{
  "id": 7,
  "title": "Build a Task Management API",
  "description": "Create a REST API with Node.js and Express to manage tasks.",
  "status": "progress",
  "day": 22,
  "icon": "code",
  "skills": ["Node.js", "Express.js", "REST APIs", "fetch()"],
  "deliverables": ["Express server", "tasks.json data file", "Dashboard connected to the API"]
}
```

**Update a status (`PUT /api/tasks/7`)**

```json
{ "status": "completed" }
```

The response is the updated task. When a task is completed and no task is In Progress, the first Not Started task automatically becomes In Progress. The change is saved to `tasks.json`, so it survives a server restart.

**Add a task (`POST /api/tasks`)**

```json
{ "title": "Write the README", "description": "Document the API." }
```

The new task gets the next free `id` and the status `notstarted`.

**Error responses**

| Situation | Status | Example message |
| --- | --- | --- |
| Task id is not a positive whole number | 400 | `{"error": "Task id must be a positive whole number."}` |
| Task does not exist | 404 | `{"error": "Task 99 was not found."}` |
| Invalid or missing status | 400 | `{"error": "Status must be one of: completed, progress, notstarted."}` |
| Missing title or description when adding a task | 400 | `{"error": "Title is required and must be 80 characters or fewer."}` |
| Request body is not valid JSON | 400 | `{"error": "The request body is not valid JSON."}` |
| Tasks file cannot be read or written | 500 | `{"error": "Could not read the tasks data."}` |

### Test the API

- **Browser:** open `http://localhost:3000/api/tasks` and `http://localhost:3000/api/tasks/3`.
- **Postman or Thunder Client:** send the requests in the table above. For `PUT` and `POST`, set the body type to JSON.
- **Terminal:**

```bash
curl http://localhost:3000/api/tasks
curl -X PUT -H "Content-Type: application/json" -d '{"status":"completed"}' http://localhost:3000/api/tasks/7
```

### What the dashboard does with the API

| Action | Request |
| --- | --- |
| Page opens | `GET /api/tasks` (shows "Loading tasks..." first) |
| View Task | `GET /api/tasks/:id`, shown in a details dialog |
| Mark as Completed | `PUT /api/tasks/:id`, then the list is reloaded from the server |
| Add New Task | `POST /api/tasks` |
| Delete (trash button) | `DELETE /api/tasks/:id` after a confirmation |
| Connection indicator | `GET /api/health` every 8 seconds |

- The screen changes only after the backend confirms a change. If an update fails, the page keeps showing the real data and an error message appears.
- If the backend cannot be reached, the dashboard shows "Unable to load tasks" with a Retry button, and the indicator shows API Offline. It reconnects on its own when the backend comes back.
- Task data is **not** stored in Local Storage any more, so it can never disagree with the backend. Local Storage is only used for the theme and the display name.

### Restore the original task data

```bash
cd backend
npm run reset-data
```

### Troubleshooting

| Problem | What to do |
| --- | --- |
| `npm` or `node` is not recognised | Install Node.js, then open a new terminal |
| Dashboard says "Unable to load tasks" | Start the backend with `npm start` inside `backend`, then press Retry |
| `Port 3000 is already in use` | Close the other program using port 3000, or start with `PORT=3001 npm start` (on Windows PowerShell: `$env:PORT=3001; npm start`). Then change `API_BASE` in `dashboard.js` to match |
| The page is blank or unstyled | Open it through `http://localhost:3000/dashboard.html` or Live Server, not by double-clicking the file |
| The live website shows "API Offline" | Expected. A static host cannot run Node.js, so the backend only runs on your own computer |

---

## Features (whole site)

- Responsive layout (desktop, tablet, mobile)
- Pure-CSS mobile menu (hidden checkbox and label, no JavaScript)
- Interactive two-track internship roadmap using vanilla JavaScript (Task 4)
- Challenge Hub with track and difficulty filters, search and a details dialog (Task 5)
- Intern Dashboard with progress tracking, a technology explorer and a dark and light theme (Task 6)
- Task Management API built with Node.js and Express, connected to the dashboard (Task 7)
- Smooth-scroll anchor navigation
- Dark theme with green and purple accents, driven by CSS variables
- Inline SVG icon sprite that inherits text colour

## Project Structure

```
techbridge/
├── index.html              # Homepage (Task 1)
├── programs.html           # Programs page (Task 2)
├── internship-tasks.html   # Internship Tasks page (Tasks 3 and 4)
├── challenges.html         # Challenge Hub page (Task 5)
├── dashboard.html          # Intern Dashboard page (Tasks 6 and 7)
├── style.css               # All styles for all pages
├── script.js               # Track switching for the Internship Tasks page (Task 4)
├── challenges.js           # Filters, search and details dialog for the Challenge Hub (Task 5)
├── dashboard.js            # Dashboard logic and API calls (Tasks 6 and 7)
├── backend/                # Task Management API (Task 7)
│   ├── server.js           # Express server and routes
│   ├── package.json
│   ├── reset-data.js       # Restores the original task data
│   └── data/
│       ├── tasks.json      # The task data used by the API
│       └── tasks.default.json  # Copy of the original data
├── README.md
└── assets/
    ├── icons/              # SVG icons, program tiles, and the three step icons (step-*.png)
    └── images/             # Logo, hero/internship artwork, backgrounds, programs-*.jpg artwork
        └── tech/           # Technology logos for the Dashboard's Technology Explorer (Task 6)
```

### Programs page assets

| File | Used for |
| --- | --- |
| `assets/images/programs-hero.jpg` | Hero artwork (the bridge with the two program labels) |
| `assets/images/programs-data-bg.jpg` | Data Analytics card background |
| `assets/images/programs-web-bg.jpg` | Web Development card background |
| `assets/images/programs-cta-bg.jpg` | Call-to-action banner background |
| `assets/icons/tile-data-analytics.svg` | Data Analytics icon tile |
| `assets/icons/tile-web-development.svg` | Web Development icon tile |
| `assets/icons/step-learn.png`, `step-practice.png`, `step-build.png` | "Learn by doing" step icons |

### Internship Tasks page assets

| File | Used for |
| --- | --- |
| `assets/images/internship-hero.jpg` | Hero illustration (a glowing road leading to a flag) |
| `assets/images/programs-cta-bg.jpg` | Call-to-action banner background (shared with the Programs page) |

### Challenge Hub assets

| File | Used for |
| --- | --- |
| `assets/images/challenge-hero.jpg` | Hero illustration (a laptop with dashboards and code panels) |
| `assets/images/programs-cta-bg.jpg` | Call-to-action banner background (shared) |

The card and indicator icons are inline SVGs from the page's icon sprite.

### Intern Dashboard assets

| File | Used for |
| --- | --- |
| `assets/images/techbridge-logo.png` | Logo in the dashboard top bar |
| `assets/images/tech/nextjs.png`, `vue.png`, `angular.png`, `backend.png` | The four main Technology Explorer buttons |
| `assets/images/tech/nodejs.png`, `express.png`, `django.png`, `flask.png`, `laravel.png`, `dotnet.png` | The six backend technology buttons |

The dashboard icons are inline SVGs from the sprites at the top of `dashboard.html`, and the task icons are drawn from the same sprites by `dashboard.js`.

The Internship Tasks page uses inline SVGs too. The hero and call-to-action icons are inline SVGs defined in `internship-tasks.html`. The task icons are small inline SVGs stored in `script.js`, so no extra icon files are needed.

## Getting Started

No installation is needed.

1. Download or clone the repository.
2. Open `index.html` in any modern browser.
3. Use the navbar to move between the Home, Programs, Internship Tasks and Challenges pages.
4. Open `dashboard.html` to see the Intern Dashboard.

## Navigation

The Home, Programs, Internship Tasks and Challenges pages share the same navbar: **Home, Programs, Internship Tasks, Challenges, About, Contact** and the Apply Now button.

- **Home** goes to `index.html`, **Programs** goes to `programs.html`, and **Internship Tasks** goes to `internship-tasks.html`, and **Challenges** goes to `challenges.html`.
- **About** and **Contact** link to the matching sections on `index.html`.
- Each page highlights its own link in the navbar (the `on` class).
- The footer Programs links point to `programs.html#data-analytics` and `programs.html#web-development`, and the footer Internship link goes to `internship-tasks.html`.

The Intern Dashboard has its own navigation. The logo links to `index.html`, the sidebar jumps to the sections of the dashboard page, and the sidebar's Challenge Hub link and the "Explore Challenges" card go to `challenges.html`.

## Customisation

**Colours and sizing:** edit the CSS variables at the top of `style.css` (section 2, *Variables*):

```css
:root {
    --green: #39FF14;
    --purple: #4F20FF;
    --bg-primary: #030A19;
    --container: 1200px;
}
```

**Program accent colours:** the Programs page sets them in section 17 of `style.css`, under `.pg-data` (green) and `.pg-web` (purple).

**Application link:** the "Apply" buttons point to the Google Form at `https://forms.gle/8EbdSy5ttGfLZfjv5`. Search `index.html` and `programs.html` for that URL to change it.

**Program text and skills:** edit the card and comparison content directly in `programs.html`.

**Internship tasks:** the task data lives in `script.js`, in the `internshipTracks` object. Each track is an array of task objects, so to change a title, day, description or difficulty, edit the matching object. Track headings and labels are in `trackDetails`, and the task icons are in `icons`.

**Track colours:** the Data Analytics (green) and Web Development (purple) accents are set in section 19 of `style.css` for the roadmap, and in section 20 for the Challenge Hub (`.ch-data` and `.ch-web`).

**Challenges:** the challenge data lives in `challenges.js`, in the `challenges` array. To change a title, difficulty, description or any detail, edit the matching object. To add a challenge, add a new object with a unique `id`. Each challenge needs a `track` of `analytics` or `webDevelopment` and a `difficulty` of `Beginner`, `Intermediate` or `Advanced`.

**Dashboard tasks:** the task data lives in `dashboard.js`, in the `tasks` array. Each task has a `number`, `day`, `icon`, starting `status` (`completed`, `progress` or `notstarted`), `title`, `description`, `skills` and `deliverables`. If you add or remove a task, also update the "8 Challenges" and "All 8 tasks" text in `dashboard.html` and `dashboard.js`. Because progress is saved in Local Storage, clear the saved data (or use "Reset progress") after changing the number of tasks.

**Internship dates:** the countdown reads `internshipDates` at the top of `dashboard.js`. Use the format `YYYY-MM-DD`. The joined date in the profile card is written directly in `dashboard.html`.

**Technology Explorer:** the technologies live in `dashboard.js`, in the `technologies` object. The `mainTechnologies` array decides which four buttons appear in the list, and the `items` array on `backend` decides which six backend buttons appear. Each technology needs a logo at `assets/images/tech/<img>.png`.

**Dashboard theme and size:** the dashboard colours are the `--d-` variables at the top of section 21 in `style.css`, with a second set for the light theme under `html[data-theme="light"]`. The page scale is the `html:has(.db)` rule at the top of the same section.

**Fonts:** loaded from Google Fonts: *Plus Jakarta Sans* (body and headings) and *Caveat* (handwritten tagline).

## CSS Organisation

`style.css` is split into numbered sections:

1. Reset
2. Variables
3. Global
4. Buttons
5. Navbar
6. Hero
7. About
8. Programs
9. Internship
10. Why
11. CTA
12. Footer
13. Animations
14. Responsive
15. Reduced motion
16. Icons
17. Programs page (all styles for `programs.html`, using a `pg-` class prefix)
18. Internship Tasks page, Task 3 version (hero styles using the `it-` prefix, plus the original zig-zag roadmap using `rm-`)
19. Interactive internship roadmap, Task 4 (track selector and roadmap list, using `tk-` and `d-` class prefixes)
20. Challenge Hub, Task 5 (hero, filters, challenge cards and details dialog, using the `ch-` class prefix)
21. Intern Dashboard, Tasks 6 and 7 (layout, task rows, API status card, dialogs and the dark and light theme, using the `db-` class prefix)

**Breakpoints:** 1023px (tablet grids), 900px (hamburger menu, single column) and 600px (mobile). The dashboard also uses 1180px, where its right-hand column moves below the main column.

## Testing Checklist

- Navigation works between the homepage and the Programs page, including the mobile menu.
- Both programs are clearly explained, with their skills listed.
- Every apply button opens the official application form.
- The layout holds up on desktop, tablet and mobile widths.
- The Programs page looks like part of the same website as the homepage.
- All 8 internship tasks appear with the correct numbers, titles and days (1, 4, 8, 11, 15, 19, 22, 26).
- The Internship Tasks page works on desktop, tablet and mobile, with no horizontal scrolling.
- A new intern can tell what they have to complete and how the difficulty grows.
- The Internship Tasks page loads with Web Development selected and shows 8 tasks.
- Clicking Data Analytics shows its 8 tasks with the correct titles, days, descriptions and difficulties, and clicking Web Development brings back the Web Development tasks.
- Switching tracks several times works without reloading the page, and the selected button is clearly marked.
- The track buttons work with the keyboard (Tab and Enter).
- The browser console shows no JavaScript errors.
- The Challenge Hub shows all 8 challenges on load, with both tracks represented.
- The track filter, the difficulty filter and the search field each work, and they work together (for example Data Analytics and Beginner shows only beginner Data Analytics challenges).
- Searching for text that matches nothing shows "No challenges found", and "Reset filters" brings every challenge back.
- Every "View Challenge" button opens the correct details, and the panel closes with the X button, the Escape key or a click outside it.
- The Challenge Hub works on desktop, tablet and mobile, with no horizontal scrolling.
- The backend starts with `npm start`, and `/api/tasks`, `/api/tasks/:id` and `/api/tasks/:id` (PUT) return the expected data and error codes.
- The dashboard shows a loading message, then the 8 tasks from the API, with progress calculated from them.
- View Task loads the task from the API, and Mark as Completed updates the progress and is still there after refreshing and after restarting the server.
- With the backend stopped, the dashboard shows "Unable to load tasks" and a Retry button, and it recovers when the backend is started again.
- Adding and deleting a task work and are saved in `tasks.json`.

## Browser Support

Works in current versions of Chrome, Edge, Firefox and Safari. The site uses `mask-image`, `mask-composite`, `mix-blend-mode` and `color-mix()`, which these browsers support. In an older browser, some glow and blend effects may not appear, but the content stays readable. The Challenge Hub and Dashboard details panels use the native `<dialog>` element, which these browsers also support. The Dashboard page scale uses the CSS `:has()` selector. In a browser without it, the dashboard simply shows at normal size. The Dashboard also needs Local Storage to remember progress, but it still works for the current visit if storage is blocked.

## Deployment

The website files are fully static, it can be hosted anywhere that serves files, including GitHub Pages, Netlify, Vercel and Cloudflare Pages. Point the host at the project root with no build command. The `backend` folder (Node.js) cannot run on those hosts, so on a deployed site the dashboard shows "API Offline". To use the dashboard with live data, run the backend on your own computer, or deploy it to a Node.js host and update `API_BASE` in `dashboard.js`.

## License

© Baselink Services Limited. All rights reserved.
