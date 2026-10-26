// TechBridge Task 7: Intern Dashboard connected to the Task Management API.
// Tasks now come from the backend (Node.js + Express) using fetch().
// Local Storage is only used for the theme and the display name, never for task data.

// ---------- Settings ----------

const internshipDates = { start: "2026-10-01", end: "2026-10-31" };
const storageKey = "techbridge-dashboard-v1";
const themeKey = "techbridge-theme";

// On http://localhost:3000 the API is on the same address.
// On any other address (for example Live Server on port 5500) it is on port 3000.
const API_BASE = window.location.port === "3000" ? "" : "http://localhost:3000";

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

let tasks = [];                 // task data from the API
let loadState = "loading";      // "loading", "ready" or "error"
let apiOnline = null;           // true, false, or null (not checked yet)
let userName = "Olayemi Motin";
let statusFilter = "all";
let searchText = "";
let selectedTech = "nextjs";
let notifications = [];
let pendingDeleteId = null;

const el = function (id) { return document.getElementById(id); };
const list = el("db-list");
const taskDialog = el("db-task-dialog");
const profileDialog = el("db-prof-dialog");
const addDialog = el("db-add-dialog");
const deleteDialog = el("db-del-dialog");
const docsDialog = el("db-docs-dialog");

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

// ---------- Talking to the API ----------

// Sends a request to the backend and returns the JSON answer.
// If the server answers with an error, or cannot be reached, it throws an Error.
async function request(path, options) {
    let response;
    try {
        response = await fetch(API_BASE + path, options);
    } catch (networkError) {
        throw new Error("Cannot reach the backend. Is the server running?");
    }

    let data = null;
    try {
        data = await response.json();
    } catch (parseError) {
        // The answer had no JSON body
    }

    if (!response.ok) {
        const message = data && data.error ? data.error : "Request failed (" + response.status + ")";
        throw new Error(message);
    }
    return data;
}

function sendJson(method, body) {
    return { method: method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

// GET /api/tasks : load all tasks and show them
async function loadTasks() {
    loadState = "loading";
    renderAll();
    try {
        tasks = await request("/api/tasks");
        loadState = "ready";
        setApiStatus(true);
    } catch (error) {
        tasks = [];
        loadState = "error";
        setApiStatus(false);
    }
    renderAll();
}

// GET /api/health : is the backend running right now?
async function checkHealth() {
    try {
        await request("/api/health");
        setApiStatus(true);
        // The backend came back after an error: load the tasks again
        if (loadState === "error") loadTasks();
    } catch (error) {
        setApiStatus(false);
    }
}

function setApiStatus(online) {
    apiOnline = online;
    const card = el("db-api");
    card.dataset.state = online ? "online" : "offline";
    el("db-api-t").textContent = online ? "API Connected" : "API Offline";
    el("db-api-s").textContent = online ? "Backend Status: Connected" : "Backend Status: Offline";
}

// ---------- Progress ----------

function countDone() {
    return tasks.filter(function (task) { return task.status === "completed"; }).length;
}

function updateStats() {
    const ready = loadState === "ready";
    const total = tasks.length;
    const done = countDone();
    const percent = total === 0 ? 0 : Math.round((done / total) * 1000) / 10;
    const text = ready ? percent + "%" : "\u2014";

    el("st-total").textContent = ready ? total : "\u2014";
    el("st-done").textContent = ready ? done : "\u2014";
    el("st-left").textContent = ready ? total - done : "\u2014";
    el("st-pct").textContent = text;
    el("db-bar-pct").textContent = text;
    el("db-prog-text").textContent = ready ? done + " / " + total + " Tasks Completed" : "Waiting for the backend";
    el("db-fill").style.width = ready ? percent + "%" : "0%";
    el("db-bar").setAttribute("aria-valuenow", String(ready ? percent : 0));

    const status = ready && total > 0 && done === total ? "Completed" : "In Progress";
    el("db-status").textContent = "Internship Status: " + status;
    el("db-prof-status").textContent = status;
    updateCurrentTask();
}

// The current task is the one In Progress, or else the first unfinished task
function getCurrentTask() {
    const current = tasks.find(function (task) { return task.status === "progress"; });
    return current || tasks.find(function (task) { return task.status !== "completed"; });
}

function updateCurrentTask() {
    const body = el("db-cur-body");
    const button = el("db-continue");
    body.replaceChildren();

    if (loadState !== "ready") {
        body.append(make("p", "db-cur-t", "No task loaded"), make("p", "db-cur-d", "The current task appears here when the backend is connected."));
        button.disabled = true;
        return;
    }
    button.disabled = false;

    const task = getCurrentTask();
    if (!task) {
        body.append(make("p", "db-cur-t", tasks.length === 0 ? "No tasks yet" : "All tasks completed \ud83c\udf89"),
            make("p", "db-cur-d", tasks.length === 0 ? "Add a task to get started." : "You've finished every internship task. Well done!"));
        button.hidden = true;
    } else {
        body.append(make("p", "db-cur-k", "Task " + task.id), make("p", "db-cur-t", task.title), make("p", "db-cur-d", task.description));
        button.hidden = false;
    }
}

// ---------- Task list ----------

function getVisibleTasks() {
    const query = searchText.toLowerCase().trim();
    return tasks.filter(function (task) {
        const statusOk = statusFilter === "all" || task.status === statusFilter;
        const searchOk = (task.title + " " + task.description).toLowerCase().includes(query);
        return statusOk && searchOk;
    });
}

function createRow(task) {
    const item = make("li", "db-row db-" + task.status);
    item.id = "task-" + task.id;

    const body = make("div", "db-row-body");
    body.append(make("p", "db-row-t", task.title), make("p", "db-row-d", task.description));

    const pill = make("span", "db-st db-st-" + task.status, statusLabels[task.status]);
    const actions = make("div", "db-row-act");

    if (task.status !== "completed") {
        const done = make("button", "db-btn db-btn-done", "Mark as Completed");
        done.type = "button";
        done.addEventListener("click", function () { completeTask(task.id, done); });
        actions.appendChild(done);
    }
    const view = make("button", "db-btn", "View Task \u2192");
    view.type = "button";
    view.addEventListener("click", function () { openTask(task.id); });
    actions.appendChild(view);

    const remove = make("button", "db-btn db-btn-del");
    remove.type = "button";
    remove.setAttribute("aria-label", "Delete task " + task.title);
    remove.innerHTML = '<svg width="18" height="18" aria-hidden="true"><use href="#t-trash"></use></svg>';
    remove.addEventListener("click", function () { askDelete(task); });
    actions.appendChild(remove);

    item.append(make("span", "db-num", pad(task.id)), icon(task.icon || "doc", 22), body, pill, actions);
    return item;
}

// Shows the loading, error or empty message instead of the list
function renderState() {
    const box = el("db-state");
    box.replaceChildren();
    box.className = "db-state";

    if (loadState === "loading") {
        box.append(make("span", "db-spin"), make("p", "", "Loading tasks..."));
        box.hidden = false;
    } else if (loadState === "error") {
        box.classList.add("db-state-err");
        box.append(make("p", "db-state-t", "Unable to load tasks"),
            make("p", "", "The backend is not responding. Start the server (npm start inside the backend folder), then try again."));
        const retry = make("button", "btn btn-primary", "Retry");
        retry.type = "button";
        retry.addEventListener("click", loadTasks);
        box.appendChild(retry);
        box.hidden = false;
    } else if (tasks.length === 0) {
        box.append(make("p", "db-state-t", "No tasks yet"), make("p", "", "The API returned an empty list. Use Add New Task to create one."));
        box.hidden = false;
    } else {
        box.hidden = true;
    }
}

function renderTasks() {
    renderState();
    list.replaceChildren();

    const showList = loadState === "ready" && tasks.length > 0;
    const visible = showList ? getVisibleTasks() : [];
    visible.forEach(function (task) { list.appendChild(createRow(task)); });
    el("db-empty").hidden = !(showList && visible.length === 0);

    document.querySelectorAll("[data-filter]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.filter === statusFilter));
    });
}

function renderAll() {
    updateStats();
    renderTasks();
}

// ---------- Changing tasks through the API ----------

// PUT /api/tasks/:id : the screen changes only after the backend says OK
async function completeTask(id, button) {
    const wasAllDone = tasks.length > 0 && countDone() === tasks.length;
    const task = tasks.find(function (item) { return item.id === id; });
    if (button) button.disabled = true;

    try {
        await request("/api/tasks/" + id, sendJson("PUT", { status: "completed" }));
        tasks = await request("/api/tasks");   // reload, so the list matches the server
        setApiStatus(true);
        renderAll();
        const row = el("task-" + id);
        if (row) row.classList.add("db-just");
        showToast("Task " + id + " completed: " + task.title);
        if (!wasAllDone && countDone() === tasks.length) celebrate();
    } catch (error) {
        // Nothing was changed on screen, so the page still matches the server
        if (button) button.disabled = false;
        showToast("Could not update the task. " + error.message, true);
        if (error.message.indexOf("Cannot reach") === 0) setApiStatus(false);
    }
}

// POST /api/tasks : add a new task
async function addTask(title, description) {
    await request("/api/tasks", sendJson("POST", { title: title, description: description }));
    tasks = await request("/api/tasks");
    renderAll();
    showToast("Task added: " + title);
}

// DELETE /api/tasks/:id : remove a task
async function removeTask(id) {
    await request("/api/tasks/" + id, { method: "DELETE" });
    tasks = await request("/api/tasks");
    renderAll();
    showToast("Task " + id + " deleted.");
}

function celebrate() {
    el("db-cele").hidden = false;
    el("db-cele").classList.add("db-cele-go");
    showToast("All tasks completed. Congratulations!");
}

// ---------- Notifications ----------

let toastTimer;
function showToast(message, isError) {
    const toast = el("db-toast");
    toast.textContent = message;
    toast.classList.toggle("db-toast-err", Boolean(isError));
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4000);

    notifications.unshift(message);
    notifications = notifications.slice(0, 5);
    const notes = el("db-notes-list");
    notes.replaceChildren();
    notifications.forEach(function (text) { notes.appendChild(make("li", "", text)); });
    el("db-dot").hidden = false;
}

// ---------- Task details dialog ----------

// GET /api/tasks/:id : load one task and show it
async function openTask(id) {
    let task;
    try {
        task = await request("/api/tasks/" + id);
    } catch (error) {
        showToast("Could not load the task. " + error.message, true);
        return;
    }

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
    meta.append(make("span", "db-num", "Task " + pad(task.id)), make("span", "db-st db-st-" + task.status, statusLabels[task.status]));
    if (task.day) meta.appendChild(make("span", "", "Scheduled: Day " + pad(task.day)));

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
    box.append(close, title, meta, about);
    if (task.skills && task.skills.length) box.appendChild(block("Skills", task.skills));
    if (task.deliverables && task.deliverables.length) box.appendChild(block("What you'll produce", task.deliverables));

    if (task.status !== "completed") {
        const done = make("button", "btn btn-primary", "Mark as Completed");
        done.type = "button";
        done.addEventListener("click", function () { taskDialog.close(); completeTask(task.id); });
        box.appendChild(done);
    }
    taskDialog.showModal();
}

function continueTask() {
    const task = getCurrentTask();
    if (!task) {
        showToast("All tasks are completed. Nothing left to continue.");
        return;
    }
    openTask(task.id);
}

// ---------- Delete confirmation ----------

function askDelete(task) {
    pendingDeleteId = task.id;
    el("db-del-text").textContent = "\u201c" + task.title + "\u201d will be removed from the task list.";
    deleteDialog.showModal();
}

// ---------- Display name (Local Storage, not task data) ----------

function loadName() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved && typeof saved.name === "string" && saved.name.trim()) {
            userName = saved.name.trim().slice(0, 40);
        }
    } catch (error) {
        // Keep the default name
    }
}

function saveName() {
    try {
        localStorage.setItem(storageKey, JSON.stringify({ name: userName }));
    } catch (error) {
        // Storage may be blocked
    }
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
    el("db-name").textContent = userName.split(" ")[0];
    el("db-prof-name").textContent = userName;
    el("db-user-top").textContent = userName;
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

// Close any dialog when the dark area around it is clicked
[taskDialog, profileDialog, addDialog, deleteDialog, docsDialog].forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
    });
});

// Profile
el("db-edit").addEventListener("click", function () {
    el("db-name-in").value = userName;
    profileDialog.showModal();
});
el("db-prof-x").addEventListener("click", function () { profileDialog.close(); });
el("db-prof-form").addEventListener("submit", function () {
    const value = el("db-name-in").value.trim();
    if (value) {
        userName = value.slice(0, 40);
        saveName();
        showName();
    }
});

// Add a task
el("db-add-open").addEventListener("click", function () {
    el("db-add-form").reset();
    el("db-add-err").hidden = true;
    addDialog.showModal();
});
el("db-add-x").addEventListener("click", function () { addDialog.close(); });
el("db-add-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const title = el("db-add-name").value.trim();
    const description = el("db-add-desc").value.trim();
    const error = el("db-add-err");

    if (!title || !description) {
        error.textContent = "Please enter a title and a description.";
        error.hidden = false;
        return;
    }
    el("db-add-save").disabled = true;
    try {
        await addTask(title, description);
        addDialog.close();
    } catch (problem) {
        error.textContent = problem.message;
        error.hidden = false;
    }
    el("db-add-save").disabled = false;
});

// Delete a task
el("db-del-no").addEventListener("click", function () { deleteDialog.close(); });
el("db-del-yes").addEventListener("click", async function () {
    deleteDialog.close();
    try {
        await removeTask(pendingDeleteId);
    } catch (error) {
        showToast("Could not delete the task. " + error.message, true);
    }
});

// API documentation
el("db-docs-open").addEventListener("click", function () { docsDialog.showModal(); });
el("db-docs-x").addEventListener("click", function () { docsDialog.close(); });

// ---------- Start ----------

function init() {
    loadName();
    loadTheme();
    showName();
    updateCountdown();
    renderTechList();
    renderTechDetail();
    loadTasks();
    checkHealth();
    setInterval(checkHealth, 8000);   // keep the Connected / Offline label up to date
}

init();
