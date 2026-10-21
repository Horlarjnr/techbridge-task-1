# TechBridge

The website for **TechBridge**, a learning initiative by **Baselink Services Limited**. TechBridge offers practical training in **Data Analytics** and **Web Development**, plus a **30-Day Practical Internship** that ends with a recommendation letter, based on participation and performance.

The site is a static build in plain HTML5 and CSS3, with vanilla JavaScript on the Internship Tasks page (Task 4), the Challenge Hub (Task 5) and the Intern Dashboard (Task 6). It has no frameworks, no build step and no dependencies.

## Pages

| Page | File | Description |
| --- | --- | --- |
| Homepage (Task 1) | `index.html` | Introduces TechBridge, the programs, the internship and how to get in touch |
| Programs (Task 2) | `programs.html` | Explains the two programs, their skills and how they differ, with a clear next step |
| Internship Tasks (Tasks 3 and 4) | `internship-tasks.html` | Shows the 30-day internship as an interactive roadmap. Visitors switch between the Data Analytics and Web Development tracks to see the 8 tasks of each |
| Challenge Hub (Task 5) | `challenges.html` | A searchable, filterable collection of practical challenges for both tracks, with a details panel for each |
| Intern Dashboard (Task 6) | `dashboard.html` | A personal dashboard with progress tracking, a task tracker, an internship countdown, a Technology Explorer and an editable profile |

The first four pages share the same navbar, buttons, typography, colours and footer, so they read as one website. The dashboard uses the same fonts, buttons and brand colours, but has its own top bar and sidebar because it is an app-style page.

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

The Intern Dashboard answers: **"How am I doing, and what should I work on next?"** It is a separate page, `dashboard.html`, with its own script, `dashboard.js`. An intern can see their progress at a glance, mark tasks as completed, filter and search their tasks, explore modern web technologies and edit their display name, all without the page reloading. Progress is saved in the browser with Local Storage, so it is still there after a refresh.

### Sections

| Section | Anchor | Description |
| --- | --- | --- |
| Top bar | n/a | Logo, dark and light theme switch, notifications bell and the intern's name (plus a menu button on small screens) |
| Sidebar | n/a | Links to Overview, My Tasks, Technology Explorer, Challenge Hub and Profile, plus an "Explore Challenges" card |
| Welcome | `#overview` | "Welcome back" message with the intern's name, role, internship status and the countdown card |
| Internship Progress | n/a | A progress bar, the percentage and four counters: Total Tasks, Completed, Remaining and Progress |
| Current Task | n/a | The task the intern is on now, with a "Continue Task" button |
| My Tasks | `#tasks` | The task tracker: status filters, a search field and one row per task |
| Challenge Hub card | n/a | Shows "8 Challenges Available" and links to `challenges.html` |
| Technology Explorer | `#tech` | Pick a technology to read what it is and what it is used for |
| Profile | `#profile` | Name, role, track, status and join date, with an "Edit Profile" button |
| Footer | n/a | Copyright and Privacy, Terms and Support links |

### The dashboard tasks

Tasks 1 to 6 follow the order in which the TechBridge project was built, and Tasks 7 and 8 are sample tasks so the tracker always has something left to do. This list is for the dashboard only and is separate from the official roadmap on the Internship Tasks page.

| Task | Title | Day | Starting status |
| --- | --- | --- | --- |
| 01 | TechBridge Landing Page | 1 | Completed |
| 02 | Programs Page | 4 | Completed |
| 03 | Internship Tasks Page | 8 | Completed |
| 04 | Interactive Task Tracker | 11 | Completed |
| 05 | Challenge Hub | 15 | Completed |
| 06 | Intern Dashboard | 19 | In Progress |
| 07 | Interactive Web Experience | 22 | Not Started |
| 08 | Final Project | 26 | Not Started |

Each task has a description, a list of skills and a list of deliverables, shown in a details dialog.

### The Technology Explorer

| Technology | Type |
| --- | --- |
| Next.js | Frontend framework |
| Vue.js | Frontend framework |
| Angular | Frontend framework |
| Backend Development | Server and database. Opens a row of six small buttons: Node.js, Express.js, Django, Flask, Laravel and .NET |

Each technology has a short description, a "Commonly used for" list and a "Learn More" link to its official site, which opens in a new tab.

### How the JavaScript works

All the code is in `dashboard.js`, written in the same simple style as the earlier tasks.

| Concept | Where it is used |
| --- | --- |
| Data | The `tasks` array, the `technologies` object and `internshipDates` hold all the content, so no task or technology is written by hand in the HTML |
| State | The `state` object stores each task's status and the intern's name. `statusFilter`, `searchText` and `selectedTech` store what the visitor is looking at |
| Local Storage | `loadState()` and `saveState()` keep progress and the name under `techbridge-dashboard-v1`. The theme is saved under `techbridge-theme`. Both are wrapped in `try/catch`, so the page still works if storage is blocked |
| Progress calculations | `updateStats()` works out the completed count, the remaining count and the percentage, then updates the counters, the progress bar and the status label |
| Current task | `getCurrentIndex()` picks the task that is In Progress, or else the first unfinished task |
| Rendering | `renderTasks()` rebuilds the task rows. `renderTechList()` and `renderTechDetail()` rebuild the Technology Explorer |
| Completing tasks | `completeTask()` marks a task as completed, moves the next Not Started task to In Progress, saves, updates the page and shows a message. When all 8 tasks are done, `celebrate()` shows a congratulations banner |
| Dialogs | `openTask()` fills the task details dialog. The profile dialog edits the display name |
| Countdown | `updateCountdown()` compares today's date with the internship start and end dates |
| Theme | `applyTheme()` and `toggleTheme()` switch between dark and light |
| Events | Click listeners on the filters, buttons, theme switch, bell and menu, an input listener on the search field, a keydown listener for Escape, and click listeners on the dialog backdrops |

The rows and panels are built with `createElement` and `textContent`, so no raw HTML is inserted from the data.

### Highlights
- **Task tracker:** filter by All, Completed, In Progress or Not Started, and search by title or description. The filter and search work together, and a "Clear filters" button appears when nothing matches.
- **Mark as Completed:** updates the progress bar, the counters, the current task and the status at once, with a short glow on the row and a message.
- **Celebration:** a banner appears when all 8 tasks are completed. The "Reset progress" button returns everything to the starting state.
- **Countdown:** shows the days left between 1 October 2026 and 31 October 2026, and changes to "Starts in..." before the start date and "Internship ended" after the end date.
- **Dark and light themes:** dark is the default, and the choice is remembered. The colours come from CSS variables starting with `--d-`.
- **Notifications:** the bell keeps the last five messages and shows a red dot when there is something new.
- **Edit Profile:** changing the display name updates the welcome message, the top bar and the profile card, and the name is saved in the browser.
- **Browser zoom:** the page is scaled to 80% of normal size on screens wider than 900px, so it looks right at 100% browser zoom. This is one rule in section 21 of `style.css` (`html:has(.db)`). Change `80%` to make the page larger or smaller.
- **Accessibility:** a skip link, `aria-pressed` on the filter, theme and technology buttons, `aria-live` on the toast message and technology panel, a real `progressbar` role on the bar, visible focus outlines, native `<dialog>` panels that close with Escape or a click outside, and `prefers-reduced-motion` support. Visitors without JavaScript see a short message asking them to turn it on.
- **Responsive:** the right-hand column drops below the main column at 1180px, the sidebar becomes a slide-in menu at 900px, and task rows, stats and dialogs adapt again at 600px, where the details dialog becomes a bottom sheet.
- **Sample data:** the profile, task statuses and countdown are sample content saved only in the browser. The page is not connected to an account or a server.

---

## Features (whole site)

- Responsive layout (desktop, tablet, mobile)
- Pure-CSS mobile menu (hidden checkbox and label, no JavaScript)
- Interactive two-track internship roadmap using vanilla JavaScript (Task 4)
- Challenge Hub with track and difficulty filters, search and a details dialog (Task 5)
- Intern Dashboard with progress tracking, a task tracker, Local Storage, a dark and light theme and a Technology Explorer (Task 6)
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
├── dashboard.html          # Intern Dashboard page (Task 6)
├── style.css               # All styles for all pages
├── script.js               # Track switching for the Internship Tasks page (Task 4)
├── challenges.js           # Filters, search and details dialog for the Challenge Hub (Task 5)
├── dashboard.js            # Progress, task tracker, theme and Technology Explorer for the Dashboard (Task 6)
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
21. Intern Dashboard, Task 6 (page scale, theme colours, top bar, sidebar, cards, task tracker, Technology Explorer and dialogs, using the `db-` class prefix)

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
- The dashboard loads with 5 of 8 tasks completed, 62.5% progress, 3 tasks remaining and Task 6 as the current task.
- "Mark as Completed" updates the progress bar, the counters, the current task and the status, and the next Not Started task becomes In Progress.
- Completing all 8 tasks shows the congratulations banner, and "Reset progress" returns the dashboard to its starting state.
- The status filters and the search field work on their own and together, and "Clear filters" restores the full list.
- Refreshing the page keeps the saved progress, the display name and the chosen theme.
- The dark and light theme switch changes the whole page, and both themes are readable.
- "View Task" and "Continue Task" open the correct task details, and the dialog closes with the X button, the Escape key or a click outside it.
- Every Technology Explorer button shows the right details, the Backend button shows the six backend buttons, and "Learn More" opens the official site in a new tab.
- "Edit Profile" changes the name in the welcome message, the top bar and the profile card.
- The countdown shows the correct number of days left for the internship dates.
- The dashboard works on desktop, tablet and mobile with no horizontal scrolling, and the sidebar menu opens and closes on small screens.
- The dashboard looks the same at 100% browser zoom as the rest of the site's layout at about 80%, and the console shows no JavaScript errors.

## Browser Support

Works in current versions of Chrome, Edge, Firefox and Safari. The site uses `mask-image`, `mask-composite`, `mix-blend-mode` and `color-mix()`, which these browsers support. In an older browser, some glow and blend effects may not appear, but the content stays readable. The Challenge Hub and Dashboard details panels use the native `<dialog>` element, which these browsers also support. The Dashboard page scale uses the CSS `:has()` selector. In a browser without it, the dashboard simply shows at normal size. The Dashboard also needs Local Storage to remember progress, but it still works for the current visit if storage is blocked.

## Deployment

Because the site is fully static, it can be hosted anywhere that serves files, including GitHub Pages, Netlify, Vercel and Cloudflare Pages. Point the host at the project root with no build command.

## License

© Baselink Services Limited. All rights reserved.
