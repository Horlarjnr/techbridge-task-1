// TechBridge Task 5: Challenge Hub.
// Vanilla JavaScript: track filter, difficulty filter, search and a details dialog.

// ---------- Data: one object per challenge ----------

const challenges = [
    {
        id: 1, number: "01", day: 1, icon: "chart",
        title: "Sales Performance Analysis", track: "analytics", difficulty: "Beginner",
        description: "Analyze sales data, identify top-performing products, and summarize revenue trends.",
        overview: "Analyze a small sales dataset and identify important trends. You'll clean the data, find useful insights and create a simple report.",
        objectives: ["Clean and organise a small sales dataset", "Find the top-performing products and months", "Summarise revenue trends with charts"],
        skills: ["Data cleaning", "Basic analysis", "Problem solving", "Communication"],
        tools: ["Excel / Google Sheets", "Charts and graphs", "(Optional) SQL"],
        deliverables: ["Cleaned dataset", "Key insights", "Visual charts", "Short report"],
        duration: "3-5 hours",
        result: "A clear analysis and visual summary of the sales data."
    },
    {
        id: 2, number: "02", day: 4, icon: "user",
        title: "Customer Insights Report", track: "analytics", difficulty: "Beginner",
        description: "Examine customer records and identify purchasing patterns and customer segments.",
        overview: "Study a set of customer records to understand who is buying, how often and what they buy, then group customers into useful segments.",
        objectives: ["Explore customer records and spot patterns", "Group customers into clear segments", "Explain the findings in plain language"],
        skills: ["Sorting and filtering", "Pivot Tables", "Pattern spotting", "Reporting"],
        tools: ["Excel or Google Sheets"],
        deliverables: ["Customer segmentation", "Key findings", "Summary report"],
        duration: "3-4 hours",
        result: "A short report showing the main customer groups and what they buy."
    },
    {
        id: 3, number: "03", day: 8, icon: "dash",
        title: "Business KPI Dashboard", track: "analytics", difficulty: "Intermediate",
        description: "Create a dashboard that communicates important business metrics and trends.",
        overview: "Choose the right business metrics and present them in a dashboard that a manager could understand at a glance.",
        objectives: ["Choose meaningful KPIs for a business", "Build charts that show trends clearly", "Write short business insights"],
        skills: ["Formulas and Pivot Tables", "Data visualization", "KPI selection", "Storytelling with data"],
        tools: ["Excel", "Google Sheets", "A dashboard tool of your choice"],
        deliverables: ["KPI dashboard", "Visualizations", "Summary of business insights"],
        duration: "4-6 hours",
        result: "A one-page dashboard that shows key metrics and what they mean."
    },
    {
        id: 4, number: "04", day: 11, icon: "code",
        title: "Developer Portfolio Website", track: "webDevelopment", difficulty: "Beginner",
        description: "Build a responsive portfolio featuring projects, skills, and contact information.",
        overview: "Create a personal portfolio that introduces you, shows your projects and skills, and makes it easy for people to contact you.",
        objectives: ["Structure a page with semantic HTML", "Style a clean layout with CSS", "Make the site work on phones and desktops"],
        skills: ["Semantic HTML", "CSS Flexbox and Grid", "Responsive design", "Git basics"],
        tools: ["HTML", "CSS"],
        deliverables: ["Responsive portfolio website", "Projects section", "Contact section"],
        duration: "4-6 hours",
        result: "A live, responsive portfolio you can share with employers."
    },
    {
        id: 5, number: "05", day: 15, icon: "monitor",
        title: "Product Landing Page", track: "webDevelopment", difficulty: "Beginner",
        description: "Create a responsive product page with clear content sections and calls to action.",
        overview: "Design a landing page for a product of your choice, with clear sections that guide visitors toward one action.",
        objectives: ["Plan the sections of a landing page", "Write clear calls to action", "Keep the layout consistent on every screen size"],
        skills: ["HTML structure", "CSS layout", "Typography and spacing", "Responsive design"],
        tools: ["HTML", "CSS"],
        deliverables: ["Complete landing page", "Responsive styling"],
        duration: "3-5 hours",
        result: "A polished landing page that looks good on desktop and mobile."
    },
    {
        id: 6, number: "06", day: 19, icon: "gear",
        title: "Interactive Web Experience", track: "webDevelopment", difficulty: "Intermediate",
        description: "Build a small JavaScript-powered interface with functional controls and dynamic content.",
        overview: "Build a small interface that reacts to the user, such as a quiz, a filterable list or a simple calculator, using vanilla JavaScript.",
        objectives: ["Respond to clicks and input with JavaScript", "Update the page without reloading", "Organise data in arrays and objects"],
        skills: ["DOM manipulation", "Event handling", "Arrays and objects", "Debugging"],
        tools: ["HTML", "CSS", "Vanilla JavaScript"],
        deliverables: ["Interactive interface", "Working controls", "Dynamically updated content"],
        duration: "5-7 hours",
        result: "A working interface that changes in response to what the user does."
    },
    {
        id: 7, number: "07", day: 22, icon: "target",
        title: "Customer Churn Analysis", track: "analytics", difficulty: "Advanced",
        description: "Explore customer data to find why customers leave and recommend ways to keep them.",
        overview: "Combine spreadsheet analysis and SQL to find the signs that a customer is likely to leave, and suggest what the business could do about it.",
        objectives: ["Join related tables to build one clear view", "Compare customers who stayed and left", "Recommend ways to improve retention"],
        skills: ["SQL joins and aggregations", "Data wrangling", "Segment comparison", "Presenting insights"],
        tools: ["Excel or Google Sheets", "SQL"],
        deliverables: ["Churn analysis", "Segment comparison", "Retention recommendations"],
        duration: "6-8 hours",
        result: "A clear explanation of why customers leave, with practical recommendations."
    },
    {
        id: 8, number: "08", day: 26, icon: "check",
        title: "Task Manager Web App", track: "webDevelopment", difficulty: "Advanced",
        description: "Build a task manager that lets users add, complete, filter and save tasks in the browser.",
        overview: "Build a small web app that keeps a list of tasks, lets users complete and filter them, and remembers them the next time the page opens.",
        objectives: ["Plan the data and features of a small app", "Save and load tasks with localStorage", "Keep the code organised in separate files"],
        skills: ["DOM manipulation", "Arrays and objects", "Browser storage", "Code organisation"],
        tools: ["HTML", "CSS", "Vanilla JavaScript", "localStorage"],
        deliverables: ["Working task manager", "Responsive design", "Saved tasks", "Short README"],
        duration: "6-8 hours",
        result: "A responsive app that adds, completes, filters and saves tasks."
    }
];

const trackNames = { analytics: "Data Analytics", webDevelopment: "Web Development" };
const applyUrl = "https://forms.gle/8EbdSy5ttGfLZfjv5";

// ---------- State and page elements ----------

let selectedTrack = "all";
let selectedLevel = "all";
let searchText = "";

const trackButtons = document.querySelectorAll("[data-track]");
const levelButtons = document.querySelectorAll("[data-level]");
const searchInput = document.getElementById("ch-q");
const grid = document.getElementById("ch-grid");
const emptyMessage = document.getElementById("ch-empty");
const countText = document.getElementById("ch-count");
const resetButton = document.getElementById("ch-reset");
const dialog = document.getElementById("ch-dialog");
const dialogContent = document.getElementById("ch-d-in");

// ---------- Small helpers ----------

// Create an element with a class and text (safe: uses textContent)
function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}

// Trusted inline SVG icon from the page's icon sprite
function makeIcon(name, size) {
    const wrapper = document.createElement("span");
    wrapper.className = "ch-ic";
    wrapper.innerHTML = '<svg width="' + size + '" height="' + size + '" aria-hidden="true"><use href="#t-' + name + '"></use></svg>';
    return wrapper;
}

// Build a labelled list for the details dialog
function makeList(title, items) {
    const box = makeElement("section", "ch-box");
    box.appendChild(makeElement("h4", "", title));
    const list = makeElement("ul");
    items.forEach(function (item) {
        list.appendChild(makeElement("li", "", item));
    });
    box.appendChild(list);
    return box;
}

// ---------- Filtering (conditional logic) ----------

function matchesFilters(challenge) {
    const trackOk = selectedTrack === "all" || challenge.track === selectedTrack;
    const levelOk = selectedLevel === "all" || challenge.difficulty === selectedLevel;

    // Search looks at the title, description, track name and difficulty
    const searchable = (challenge.title + " " + challenge.description + " " + trackNames[challenge.track] + " " + challenge.difficulty).toLowerCase();
    const searchOk = searchable.includes(searchText.toLowerCase().trim());

    return trackOk && levelOk && searchOk;
}

// ---------- Rendering (DOM manipulation) ----------

function createCard(challenge) {
    const card = makeElement("article", "ch-card " + (challenge.track === "analytics" ? "ch-data" : "ch-web"));

    const tile = makeIcon(challenge.icon, 30);
    tile.classList.add("ch-tile");

    const body = makeElement("div", "ch-body");
    body.appendChild(makeElement("p", "ch-num", challenge.number));
    body.appendChild(makeElement("h3", "", challenge.title));

    const tags = makeElement("p", "ch-tags");
    tags.appendChild(makeElement("span", "ch-tag ch-tag-track", trackNames[challenge.track]));
    tags.appendChild(makeElement("span", "ch-tag", challenge.difficulty));
    body.appendChild(tags);
    body.appendChild(makeElement("p", "ch-desc", challenge.description));

    const footer = makeElement("div", "ch-foot");
    const day = makeElement("span", "ch-day");
    day.appendChild(makeIcon("cal", 18));
    day.append(" Day " + String(challenge.day).padStart(2, "0"));

    const button = makeElement("button", "ch-view", "View Challenge \u2192");
    button.type = "button";
    button.addEventListener("click", function () {
        openChallenge(challenge.id);
    });

    footer.append(day, button);
    body.appendChild(footer);
    card.append(tile, body);
    return card;
}

function renderChallenges() {
    const visible = challenges.filter(matchesFilters);

    grid.replaceChildren();
    visible.forEach(function (challenge) {
        grid.appendChild(createCard(challenge));
    });

    // Empty state, result count and button states
    emptyMessage.hidden = visible.length > 0;
    countText.textContent = "Showing " + visible.length + " of " + challenges.length + " challenges";

    trackButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.track === selectedTrack));
    });
    levelButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.level === selectedLevel));
    });
}

// ---------- Details dialog ----------

function openChallenge(id) {
    const challenge = challenges.find(function (item) {
        return item.id === id;
    });
    const isData = challenge.track === "analytics";

    dialog.className = "ch-dialog " + (isData ? "ch-data" : "ch-web");
    dialogContent.replaceChildren();

    const close = makeElement("button", "ch-close");
    close.type = "button";
    close.setAttribute("aria-label", "Close challenge details");
    close.innerHTML = '<svg width="20" height="20" aria-hidden="true"><use href="#i-close"></use></svg>';
    close.addEventListener("click", function () {
        dialog.close();
    });

    const head = makeElement("header", "ch-d-head");
    const tile = makeIcon(challenge.icon, 30);
    tile.classList.add("ch-tile");
    const headText = makeElement("div");
    headText.appendChild(makeElement("p", "ch-tag ch-tag-track", trackNames[challenge.track]));
    const title = makeElement("h3", "", challenge.title);
    title.id = "ch-d-title";
    headText.appendChild(title);
    const meta = makeElement("p", "ch-tags");
    meta.appendChild(makeElement("span", "ch-tag", challenge.difficulty));
    meta.appendChild(makeElement("span", "ch-day", "Day " + String(challenge.day).padStart(2, "0")));
    headText.appendChild(meta);
    head.append(tile, headText);

    const overview = makeElement("section", "ch-box");
    overview.appendChild(makeElement("h4", "", "Challenge Overview"));
    overview.appendChild(makeElement("p", "", challenge.overview));

    const two = makeElement("div", "ch-two");
    two.append(makeList("Skills Required", challenge.skills), makeList("Tools You May Use", challenge.tools));

    const facts = makeElement("div", "ch-two");
    const time = makeElement("section", "ch-box");
    time.append(makeElement("h4", "", "Estimated Time"), makeElement("p", "", challenge.duration));
    const result = makeElement("section", "ch-box");
    result.append(makeElement("h4", "", "Expected Result"), makeElement("p", "", challenge.result));
    facts.append(time, result);

    const start = makeElement("a", "btn btn-primary ch-start", "Start Challenge \u2192");
    start.href = applyUrl;
    start.target = "_blank";
    start.rel = "noopener";
    const note = makeElement("p", "ch-note", "Challenge submissions open for TechBridge interns after applying.");

    dialogContent.append(close, head, overview, makeList("Learning Objectives", challenge.objectives), two, makeList("What You'll Produce", challenge.deliverables), facts, start, note);
    dialog.showModal();
}

// Close when the backdrop (outside the panel) is clicked
dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

// ---------- Events ----------

trackButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedTrack = button.dataset.track;
        renderChallenges();
    });
});

levelButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedLevel = button.dataset.level;
        renderChallenges();
    });
});

searchInput.addEventListener("input", function () {
    searchText = searchInput.value;
    renderChallenges();
});

resetButton.addEventListener("click", function () {
    selectedTrack = "all";
    selectedLevel = "all";
    searchText = "";
    searchInput.value = "";
    renderChallenges();
});

renderChallenges();
