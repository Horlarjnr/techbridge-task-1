// TechBridge Task 4: interactive two-track internship roadmap.
// Vanilla JavaScript only (no frameworks).

// ---------- Data: arrays of task objects, one array per track ----------

const internshipTracks = {
    analytics: [
        { number: 1, day: 1, title: "Data Cleaning Basics", difficulty: "Beginner", icon: "table",
          description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types." },
        { number: 2, day: 4, title: "Formulas & Pivot Tables", difficulty: "Beginner", icon: "fx",
          description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset." },
        { number: 3, day: 8, title: "Data Visualization", difficulty: "Beginner → Intermediate", icon: "chart",
          description: "Create charts and a simple dashboard that communicate useful insights from a dataset." },
        { number: 4, day: 11, title: "Introduction to SQL", difficulty: "Beginner → Intermediate", icon: "database",
          description: "Practice basic SQL queries and use them to answer real-world questions about data." },
        { number: 5, day: 15, title: "SQL Joins & Aggregations", difficulty: "Intermediate", icon: "merge",
          description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables." },
        { number: 6, day: 19, title: "Lookup Functions & Data Wrangling", difficulty: "Intermediate", icon: "search",
          description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches." },
        { number: 7, day: 22, title: "Mini Analysis Project", difficulty: "Intermediate", icon: "clipboard",
          description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations." },
        { number: 8, day: 26, title: "Capstone Project", difficulty: "Intermediate", icon: "trophy",
          description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables." }
    ],
    webDevelopment: [
        { number: 1, day: 1, title: "Build the TechBridge Homepage", difficulty: "Beginner", icon: "window",
          description: "Create the first version of the TechBridge website using HTML and CSS." },
        { number: 2, day: 4, title: "Build the TechBridge Programs Experience", difficulty: "Beginner", icon: "grid",
          description: "Create a Programs experience presenting TechBridge's available learning programs." },
        { number: 3, day: 8, title: "Build the Internship Tasks Experience", difficulty: "Beginner → Intermediate", icon: "doc",
          description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey." },
        { number: 4, day: 11, title: "Build an Interactive Internship Roadmap", difficulty: "Beginner → Intermediate", icon: "toggle",
          description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks." },
        { number: 5, day: 15, title: "Build the Intern Registration Experience", difficulty: "Intermediate", icon: "user",
          description: "Create a professional registration and onboarding interface for TechBridge interns." },
        { number: 6, day: 19, title: "Build the Task Submission System", difficulty: "Intermediate", icon: "upload",
          description: "Create an interface through which interns can prepare and submit their task work." },
        { number: 7, day: 22, title: "Build the Intern Dashboard", difficulty: "Intermediate", icon: "chart",
          description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions." },
        { number: 8, day: 26, title: "Build the Complete TechBridge Internship Platform", difficulty: "Intermediate", icon: "trophy",
          description: "Combine the different components created during the internship into a complete TechBridge platform." }
    ]
};

// Track-specific headings and labels
const trackDetails = {
    analytics: {
        name: "Data Analytics",
        label: "Data Analytics Track",
        title: "8 Tasks. Build Your Data Skills.",
        subtitle: "Follow the sequence from cleaning data to a full analysis project, one task at a time."
    },
    webDevelopment: {
        name: "Web Development",
        label: "Web Development Track",
        title: "8 Tasks. Build Your Future.",
        subtitle: "Follow the sequence, explore what you'll do, and see how each task builds on the last."
    }
};

// Small inline SVG icons (trusted constants, not user input)
const icons = {
    window: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14l-2 2 2 2M16 14l2 2-2 2"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    toggle: '<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="16" cy="12" r="2.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    upload: '<path d="M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 10a4 4 0 0 1-1 8z"/><path d="M12 17v-6M9 13.5l3-3 3 3"/>',
    chart: '<path d="M4 20h16"/><rect x="5" y="13" width="3" height="7" rx=".6"/><rect x="10.5" y="9" width="3" height="11" rx=".6"/><rect x="16" y="5" width="3" height="15" rx=".6"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4v2a3 3 0 0 0 3 3M16 6h4v2a3 3 0 0 1-3 3M12 13v4M8 21h8M10 17h4"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
    fx: '<path d="M9 5c-2 0-3 1-3 3v8c0 2-1 3-3 3M5 12h6M13 9l6 6M19 9l-6 6"/>',
    database: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    merge: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 8.5c0 5 6 4 6 8M18 8.5c0 5-6 4-6 8"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>'
};

// ---------- State and page elements ----------

let selectedTrack = "webDevelopment"; // Web Development is shown first

const trackButtons = document.querySelectorAll(".tk-btn");
const roadmapSection = document.getElementById("roadmap");
const taskList = document.getElementById("tk-list");
const labelText = document.getElementById("tk-label");
const titleText = document.getElementById("tk-title");
const subtitleText = document.getElementById("tk-sub");
const nowViewing = document.getElementById("tk-now");

// ---------- Functions ----------

// Pick a style class from the difficulty text (conditional logic)
function getDifficultyClass(difficulty) {
    if (difficulty === "Beginner") {
        return "d-b";
    } else if (difficulty.includes("→")) {
        return "d-bi";
    }
    return "d-i";
}

// Build one task card from a task object (DOM manipulation)
function createTaskCard(task) {
    const item = document.createElement("li");
    item.className = "tk-item";

    const node = document.createElement("span");
    node.className = "tk-node";
    node.textContent = String(task.number).padStart(2, "0");
    node.setAttribute("aria-hidden", "true");

    const card = document.createElement("article");
    card.className = "tk-card";

    const main = document.createElement("div");
    main.className = "tk-main";

    const day = document.createElement("p");
    day.className = "tk-day";
    day.textContent = "Task " + String(task.number).padStart(2, "0") + " · Day " + String(task.day).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description;

    main.append(day, title, description);

    const level = document.createElement("span");
    level.className = "tk-diff " + getDifficultyClass(task.difficulty);
    level.textContent = task.difficulty;

    const icon = document.createElement("span");
    icon.className = "tk-ic";
    icon.innerHTML = '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[task.icon] + "</svg>";

    card.append(main, level, icon);
    item.append(node, card);
    return item;
}

// Show the chosen track: tasks, headings and active button
function renderTrack(trackKey) {
    selectedTrack = trackKey;
    const tasks = internshipTracks[trackKey];
    const details = trackDetails[trackKey];

    taskList.replaceChildren();
    tasks.forEach(function (task) {
        taskList.appendChild(createTaskCard(task));
    });

    roadmapSection.dataset.track = trackKey;
    labelText.textContent = details.label;
    titleText.textContent = details.title;
    subtitleText.textContent = details.subtitle;
    nowViewing.textContent = details.name;

    trackButtons.forEach(function (button) {
        const isActive = button.dataset.track === selectedTrack;
        button.setAttribute("aria-pressed", String(isActive));
    });
}

// ---------- Events ----------

trackButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.dataset.track !== selectedTrack) {
            renderTrack(button.dataset.track);
        }
    });
});

renderTrack(selectedTrack);
