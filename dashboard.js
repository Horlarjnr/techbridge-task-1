// TechBridge Task 6: Intern Dashboard.
// Vanilla JavaScript. Progress is saved in this browser only (Local Storage).

// ---------- Data ----------

const internshipDates = { start: "2026-10-01", end: "2026-10-31" };
const storageKey = "techbridge-dashboard-v1";
const themeKey = "techbridge-theme";

// Sample content: tasks 1-6 follow the real project, tasks 7-8 are sample tasks
const tasks = [
    { number: 1, day: 1, icon: "home", status: "completed", title: "TechBridge Landing Page",
      description: "Create a responsive landing page for TechBridge with a clean and modern design.",
      skills: ["HTML", "CSS", "Responsive design"], deliverables: ["Homepage", "Mobile menu", "Footer"] },
    { number: 2, day: 4, icon: "grid", status: "completed", title: "Programs Page",
      description: "Build the Data Analytics and Web Development programs page with detailed information.",
      skills: ["HTML", "CSS layout", "Cards and sections"], deliverables: ["Programs page", "Program cards", "Comparison section"] },
    { number: 3, day: 8, icon: "doc", status: "completed", title: "Internship Tasks Page",
      description: "Create the internship tasks page with the 8-task roadmap.",
      skills: ["CSS Grid", "Timeline layout", "Difficulty labels"], deliverables: ["Roadmap page", "8 task cards"] },
    { number: 4, day: 11, icon: "bolt", status: "completed", title: "Interactive Task Tracker",
      description: "Build the interactive task tracker with filtering and task details.",
      skills: ["JavaScript arrays and objects", "DOM manipulation", "Event listeners"], deliverables: ["Two-track roadmap", "Track switcher"] },
    { number: 5, day: 15, icon: "trophy", status: "completed", title: "Challenge Hub",
      description: "Create the challenge hub with filters and detailed challenge views.",
      skills: ["Filtering and search", "Dialogs", "Dynamic rendering"], deliverables: ["Challenge cards", "Filters and search", "Details panel"] },
    { number: 6, day: 19, icon: "dash", status: "progress", title: "Intern Dashboard",
      description: "Build the interactive intern dashboard with progress tracking and technology explorer.",
      skills: ["State management", "Local Storage", "Progress calculations"], deliverables: ["Progress overview", "Task tracker", "Technology Explorer"] },
    { number: 7, day: 22, icon: "code", status: "notstarted", title: "Interactive Web Experience",
      description: "Build a JavaScript-powered interface with functional controls and dynamic content.",
      skills: ["DOM manipulation", "Event handling", "Debugging"], deliverables: ["Interactive interface", "Working controls"] },
    { number: 8, day: 26, icon: "rocket", status: "notstarted", title: "Final Project",
      description: "Complete the final project and submit your work.",
      skills: ["Planning", "Combining components", "Testing"], deliverables: ["Finished project", "Submission"] }
];

const statusLabels = { completed: "Completed", progress: "In Progress", notstarted: "Not Started" };

const technologies = {
    nextjs: { name: "Next.js", img: "nextjs", tag: "Frontend Framework", short: "React framework for production.",
        text: "Next.js is a React framework for building fast, production-ready web applications. It adds routing, server rendering and performance features on top of React.",
        uses: ["Marketing sites and blogs", "E-commerce storefronts", "Full web apps with React"],
        url: "https://nextjs.org" },
    vue: { name: "Vue.js", img: "vue", tag: "Frontend Framework", short: "Progressive JavaScript framework.",
        text: "Vue.js is a progressive JavaScript framework for building user interfaces. You can add it to one page or use it to build a whole single-page app.",
        uses: ["Interactive user interfaces", "Single-page applications", "Adding features to existing pages"],
        url: "https://vuejs.org" },
    angular: { name: "Angular", img: "angular", tag: "Frontend Framework", short: "Enterprise-grade framework.",
        text: "Angular is a powerful framework by Google for building scalable web applications. It comes with routing, forms and tooling built in, and uses TypeScript.",
        uses: ["Large enterprise applications", "Admin dashboards", "Apps built by big teams"],
        url: "https://angular.dev" },
    backend: { name: "Backend Development", img: "backend", tag: "Server & Database", short: "Build the server, database and APIs.",
        text: "Backend development is the part of a website that runs on a server. It handles data, logic and security. The frontend (what users see) sends requests to the backend through APIs, and the backend replies with data from the database.",
        uses: ["Storing and loading data", "Login and security", "APIs the frontend can call"],
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side",
        items: ["nodejs", "express", "django", "flask", "laravel", "dotnet"] },
    nodejs: { name: "Node.js", img: "nodejs", tag: "Backend Technology", short: "JavaScript runtime.",
        text: "Node.js is a JavaScript runtime for building scalable server applications. It lets you use JavaScript on the backend as well as the frontend.",
        uses: ["APIs and web servers", "Real-time apps", "Developer tools"], url: "https://nodejs.org" },
    express: { name: "Express.js", img: "express", tag: "Backend Technology", short: "Minimalist Node.js framework.",
        text: "Express.js is a fast, minimalist web framework for Node.js. It makes it simple to create routes and APIs.",
        uses: ["REST APIs", "Web servers", "Backends for React or Vue apps"], url: "https://expressjs.com" },
    django: { name: "Django", img: "django", tag: "Backend Technology", short: "High-level Python framework.",
        text: "Django is a high-level Python framework for web development. It includes many built-in features, such as an admin panel and user login.",
        uses: ["Data-driven websites", "Content platforms", "Secure web apps"], url: "https://www.djangoproject.com" },
    flask: { name: "Flask", img: "flask", tag: "Backend Technology", short: "Lightweight Python framework.",
        text: "Flask is a lightweight Python framework for web applications. It stays small and lets you choose the tools you need.",
        uses: ["Small web apps", "APIs", "Prototypes"], url: "https://flask.palletsprojects.com" },
    laravel: { name: "Laravel", img: "laravel", tag: "Backend Technology", short: "PHP framework.",
        text: "Laravel is a PHP framework for modern web applications, known for clean syntax and many built-in features.",
        uses: ["Business web apps", "E-commerce", "APIs"], url: "https://laravel.com" },
    dotnet: { name: ".NET", img: "dotnet", tag: "Backend Technology", short: "Cross-platform framework.",
        text: ".NET is a cross-platform framework from Microsoft for building web applications, and many other kinds of software.",
        uses: ["Enterprise web apps", "APIs", "Cloud services"], url: "https://dotnet.microsoft.com" }
};
const mainTechnologies = ["nextjs", "vue", "angular", "backend"];

// ---------- State and elements ----------

let state = { statuses: tasks.map(function (task) { return task.status; }), name: "Olayemi Motin" };
let statusFilter = "all";
let searchText = "";
let selectedTech = "nextjs";
let notifications = [];

const el = function (id) { return document.getElementById(id); };
const list = el("db-list");
const taskDialog = el("db-task-dialog");
const profileDialog = el("db-prof-dialog");

// ---------- Helpers ----------

function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
}

function icon(name, size) {
    const span = document.createElement("span");
    span.className = "db-i";
    span.innerHTML = '<svg width="' + size + '" height="' + size + '" aria-hidden="true"><use href="#t-' + name + '"></use></svg>';
    return span;
}

function pad(number) { return String(number).padStart(2, "0"); }

// ---------- Saving and loading ----------

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved && Array.isArray(saved.statuses) && saved.statuses.length === tasks.length &&
            saved.statuses.every(function (s) { return statusLabels[s]; })) {
            state.statuses = saved.statuses;
        }
        if (saved && typeof saved.name === "string" && saved.name.trim()) {
            state.name = saved.name.trim().slice(0, 40);
        }
    } catch (error) {
        // Missing or invalid data: keep the defaults
    }
}

function saveState() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
        // Storage may be blocked: the dashboard still works for this visit
    }
}

// ---------- Progress ----------

function countDone() {
    return state.statuses.filter(function (s) { return s === "completed"; }).length;
}

function updateStats() {
    const done = countDone();
    const total = tasks.length;
    const percent = Math.round((done / total) * 1000) / 10;
    const text = percent + "%";

    el("st-total").textContent = total;
    el("st-done").textContent = done;
    el("st-left").textContent = total - done;
    el("st-pct").textContent = text;
    el("db-bar-pct").textContent = text;
    el("db-prog-text").textContent = done + " / " + total + " Tasks Completed";
    el("db-fill").style.width = percent + "%";
    el("db-bar").setAttribute("aria-valuenow", String(percent));

    const status = done === total ? "Completed" : "In Progress";
    el("db-status").textContent = "Internship Status: " + status;
    el("db-prof-status").textContent = status;
    updateCurrentTask();
}

// The current task is the one In Progress, or else the first unfinished task
function getCurrentIndex() {
    let index = state.statuses.indexOf("progress");
    if (index === -1) index = state.statuses.findIndex(function (s) { return s !== "completed"; });
    return index;
}

function updateCurrentTask() {
    const body = el("db-cur-body");
    const button = el("db-continue");
    const index = getCurrentIndex();
    body.replaceChildren();
    if (index === -1) {
        body.append(make("p", "db-cur-t", "All tasks completed 🎉"), make("p", "db-cur-d", "You've finished every internship task. Well done!"));
        button.hidden = true;
    } else {
        body.append(make("p", "db-cur-k", "Task " + tasks[index].number), make("p", "db-cur-t", tasks[index].title), make("p", "db-cur-d", tasks[index].description));
        button.hidden = false;
    }
}

// ---------- Task list ----------

function getVisibleTasks() {
    const query = searchText.toLowerCase().trim();
    return tasks.filter(function (task, index) {
        const status = state.statuses[index];
        const statusOk = statusFilter === "all" || status === statusFilter;
        const searchOk = (task.title + " " + task.description).toLowerCase().includes(query);
        return statusOk && searchOk;
    });
}

function createRow(task) {
    const index = task.number - 1;
    const status = state.statuses[index];
    const item = make("li", "db-row db-" + status);
    item.id = "task-" + task.number;

    const body = make("div", "db-row-body");
    body.append(make("p", "db-row-t", task.title), make("p", "db-row-d", task.description));

    const pill = make("span", "db-st db-st-" + status, statusLabels[status]);
    const actions = make("div", "db-row-act");

    if (status !== "completed") {
        const done = make("button", "db-btn db-btn-done", "Mark as Completed");
        done.type = "button";
        done.addEventListener("click", function () { completeTask(index); });
        actions.appendChild(done);
    }
    const view = make("button", "db-btn", "View Task \u2192");
    view.type = "button";
    view.addEventListener("click", function () { openTask(index); });
    actions.appendChild(view);

    item.append(make("span", "db-num", pad(task.number)), icon(task.icon, 22), body, pill, actions);
    return item;
}

function renderTasks() {
    const visible = getVisibleTasks();
    list.replaceChildren();
    visible.forEach(function (task) { list.appendChild(createRow(task)); });
    el("db-empty").hidden = visible.length > 0;
    document.querySelectorAll("[data-filter]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.filter === statusFilter));
    });
}

// ---------- Completing tasks ----------

function completeTask(index) {
    const wasAllDone = countDone() === tasks.length;
    state.statuses[index] = "completed";

    // Keep one task In Progress: promote the next Not Started task
    if (state.statuses.indexOf("progress") === -1) {
        const next = state.statuses.indexOf("notstarted");
        if (next !== -1) state.statuses[next] = "progress";
    }

    saveState();
    updateStats();
    renderTasks();
    const row = el("task-" + tasks[index].number);
    if (row) row.classList.add("db-just");

    showToast("Task " + tasks[index].number + " completed: " + tasks[index].title);
    if (!wasAllDone && countDone() === tasks.length) celebrate();
}

function celebrate() {
    el("db-cele").hidden = false;
    el("db-cele").classList.add("db-cele-go");
    showToast("All 8 tasks completed. Congratulations!");
}

// ---------- Notifications ----------

let toastTimer;
function showToast(message) {
    const toast = el("db-toast");
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3500);

    notifications.unshift(message);
    notifications = notifications.slice(0, 5);
    const notes = el("db-notes-list");
    notes.replaceChildren();
    notifications.forEach(function (text) { notes.appendChild(make("li", "", text)); });
    el("db-dot").hidden = false;
}

// ---------- Task details dialog ----------

function openTask(index) {
    const task = tasks[index];
    const status = state.statuses[index];
    const box = el("db-task-in");
    box.replaceChildren();

    const close = make("button", "ch-close");
    close.type = "button";
    close.setAttribute("aria-label", "Close task details");
    close.innerHTML = '<svg width="20" height="20" aria-hidden="true"><use href="#i-close"></use></svg>';
    close.addEventListener("click", function () { taskDialog.close(); });

    const title = make("h3", "", task.title);
    title.id = "db-task-title";
    const meta = make("p", "db-d-meta");
    meta.append(make("span", "db-num", "Task " + pad(task.number)), make("span", "db-st db-st-" + status, statusLabels[status]), make("span", "", "Scheduled: Day " + pad(task.day)));

    function block(heading, items) {
        const section = make("section", "db-d-box");
        section.appendChild(make("h4", "", heading));
        const ul = make("ul");
        items.forEach(function (text) { ul.appendChild(make("li", "", text)); });
        section.appendChild(ul);
        return section;
    }

    const about = make("section", "db-d-box");
    about.append(make("h4", "", "Overview"), make("p", "", task.description));
    box.append(close, title, meta, about, block("Skills", task.skills), block("What you'll produce", task.deliverables));

    if (status !== "completed") {
        const done = make("button", "btn btn-primary", "Mark as Completed");
        done.type = "button";
        done.addEventListener("click", function () { taskDialog.close(); completeTask(index); });
        box.appendChild(done);
    }
    taskDialog.showModal();
}

function continueTask() {
    const index = getCurrentIndex();
    if (index === -1) {
        showToast("All tasks are completed. Nothing left to continue.");
        return;
    }
    openTask(index);
}

// ---------- Technology Explorer ----------

function renderTechList() {
    const group = el("db-tech-list");
    group.replaceChildren();
    mainTechnologies.forEach(function (key) {
        const tech = technologies[key];
        const isOn = key === selectedTech || (tech.items && tech.items.includes(selectedTech));
        const button = make("button", "db-tech");
        button.type = "button";
        button.setAttribute("aria-pressed", String(isOn));
        const img = make("img");
        img.src = "assets/images/tech/" + tech.img + ".png";
        img.alt = "";
        img.width = 44;
        img.height = 44;
        const text = make("span", "db-tech-t");
        text.append(make("strong", "", tech.name), make("span", "", tech.short));
        button.append(img, text, icon("chev", 18));
        button.addEventListener("click", function () { selectTech(key); });
        group.appendChild(button);
    });
}

function renderTechDetail() {
    const tech = technologies[selectedTech];
    const panel = el("db-tech-detail");
    panel.replaceChildren();

    const head = make("div", "db-td-h");
    const img = make("img");
    img.src = "assets/images/tech/" + tech.img + ".png";
    img.alt = "";
    img.width = 48;
    img.height = 48;
    const heading = make("div");
    heading.append(make("h3", "", tech.name), make("span", "db-pill db-pill-p", tech.tag));
    head.append(img, heading);

    const uses = make("ul", "db-td-ul");
    tech.uses.forEach(function (text) { uses.appendChild(make("li", "", text)); });

    panel.append(head, make("p", "", tech.text), make("p", "db-td-k", "Commonly used for"), uses);

    // Backend: show the backend technologies as small buttons
    const parent = technologies.backend;
    if (selectedTech === "backend" || parent.items.includes(selectedTech)) {
        const strip = make("div", "db-chips");
        parent.items.forEach(function (key) {
            const chip = make("button", "db-chip");
            chip.type = "button";
            chip.setAttribute("aria-pressed", String(key === selectedTech));
            const logo = make("img");
            logo.src = "assets/images/tech/" + technologies[key].img + ".png";
            logo.alt = "";
            logo.width = 22;
            logo.height = 22;
            chip.append(logo, document.createTextNode(technologies[key].name));
            chip.addEventListener("click", function () { selectTech(key); });
            strip.appendChild(chip);
        });
        panel.appendChild(strip);
    }

    const link = make("a", "btn btn-secondary", "Learn More \u2192");
    link.href = tech.url;
    link.target = "_blank";
    link.rel = "noopener";
    panel.appendChild(link);
}

function selectTech(key) {
    selectedTech = key;
    renderTechList();
    renderTechDetail();
}

// ---------- Countdown ----------

function parseDate(text) {
    const parts = text.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function updateCountdown() {
    const start = parseDate(internshipDates.start);
    const end = parseDate(internshipDates.end);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayMs = 24 * 60 * 60 * 1000;
    const format = { month: "short", day: "numeric", year: "numeric" };

    let message;
    if (today < start) {
        message = "Starts in " + Math.round((start - today) / dayMs) + " days";
    } else if (today > end) {
        message = "Internship ended";
    } else {
        const left = Math.round((end - today) / dayMs);
        message = left === 0 ? "Last day" : left + (left === 1 ? " day left" : " days left");
    }
    el("db-days").textContent = message;
    el("db-range").textContent = start.toLocaleDateString("en-US", format) + " \u2013 " + end.toLocaleDateString("en-US", format);
}

// ---------- Theme ----------

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const toggle = el("db-theme");
    toggle.setAttribute("aria-pressed", String(theme === "light"));
    toggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
}

function loadTheme() {
    let theme = "dark";
    try {
        if (localStorage.getItem(themeKey) === "light") theme = "light";
    } catch (error) {
        // Keep dark
    }
    applyTheme(theme);
}

function toggleTheme() {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem(themeKey, next); } catch (error) { /* ignore */ }
}

// ---------- Profile ----------

function showName() {
    el("db-name").textContent = state.name.split(" ")[0];
    el("db-prof-name").textContent = state.name;
    el("db-user-top").textContent = state.name;
}

// ---------- Sidebar (mobile) ----------

function setSidebar(open) {
    el("db-side").classList.toggle("open", open);
    el("db-overlay").hidden = !open;
    el("db-burger").setAttribute("aria-expanded", String(open));
}

// ---------- Events ----------

document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
        statusFilter = button.dataset.filter;
        renderTasks();
    });
});

el("db-q").addEventListener("input", function (event) {
    searchText = event.target.value;
    renderTasks();
});

el("db-clear").addEventListener("click", function () {
    statusFilter = "all";
    searchText = "";
    el("db-q").value = "";
    renderTasks();
});

el("db-continue").addEventListener("click", continueTask);

el("db-reset").addEventListener("click", function () {
    state.statuses = tasks.map(function (task) { return task.status; });
    saveState();
    el("db-cele").hidden = true;
    updateStats();
    renderTasks();
    showToast("Progress has been reset.");
});

el("db-theme").addEventListener("click", toggleTheme);

el("db-bell").addEventListener("click", function () {
    const notes = el("db-notes");
    notes.hidden = !notes.hidden;
    el("db-bell").setAttribute("aria-expanded", String(!notes.hidden));
    el("db-dot").hidden = true;
    if (notifications.length === 0 && !notes.hidden) {
        el("db-notes-list").replaceChildren(make("li", "", "No new notifications."));
    }
});

el("db-burger").addEventListener("click", function () { setSidebar(!el("db-side").classList.contains("open")); });
el("db-overlay").addEventListener("click", function () { setSidebar(false); });
document.querySelectorAll(".db-nav").forEach(function (link) {
    link.addEventListener("click", function () {
        document.querySelectorAll(".db-nav").forEach(function (item) {
            item.classList.remove("on");
            item.removeAttribute("aria-current");
        });
        link.classList.add("on");
        link.setAttribute("aria-current", "page");
        setSidebar(false);
    });
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        setSidebar(false);
        el("db-notes").hidden = true;
    }
});

[taskDialog, profileDialog].forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
    });
});

el("db-edit").addEventListener("click", function () {
    el("db-name-in").value = state.name;
    profileDialog.showModal();
});
el("db-prof-x").addEventListener("click", function () { profileDialog.close(); });
el("db-prof-form").addEventListener("submit", function () {
    const value = el("db-name-in").value.trim();
    if (value) {
        state.name = value.slice(0, 40);
        saveState();
        showName();
    }
});

// ---------- Start ----------

function init() {
    loadState();
    loadTheme();
    showName();
    updateCountdown();
    updateStats();
    renderTasks();
    renderTechList();
    renderTechDetail();
}

init();
