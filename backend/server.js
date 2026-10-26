// TechBridge Task Management API (Task 7)
// Node.js + Express. Task data is stored in data/tasks.json.

const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "tasks.json");
const WEBSITE_FOLDER = path.join(__dirname, "..");

// The three statuses used by the dashboard
const VALID_STATUSES = ["completed", "progress", "notstarted"];

// ---------- Middleware ----------

// Read JSON request bodies
app.use(express.json());

// CORS: lets the website (for example Live Server on port 5500) call this API on port 3000.
// Only local addresses are allowed.
app.use(function (req, res, next) {
    const origin = req.headers.origin;
    const isLocal = origin === "null" || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || "");

    if (isLocal) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

// ---------- Helpers ----------

async function readTasks() {
    const text = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(text);
}

async function writeTasks(tasks) {
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Turns "3" into 3. Returns null if it is not a positive whole number.
function parseId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function sendError(res, status, message) {
    res.status(status).json({ error: message });
}

// If no task is In Progress, the first Not Started task becomes the current task
function promoteNextTask(tasks) {
    const hasCurrent = tasks.some(function (task) { return task.status === "progress"; });
    if (!hasCurrent) {
        const next = tasks.find(function (task) { return task.status === "notstarted"; });
        if (next) next.status = "progress";
    }
}

// ---------- Routes ----------

// Health check: the dashboard uses this to show Connected or Offline
app.get("/api/health", function (req, res) {
    res.json({ status: "ok", message: "Backend is running" });
});

// GET /api/tasks : all tasks
app.get("/api/tasks", async function (req, res) {
    try {
        const tasks = await readTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Could not read tasks:", error.message);
        sendError(res, 500, "Could not read the tasks data.");
    }
});

// GET /api/tasks/:id : one task
app.get("/api/tasks/:id", async function (req, res) {
    const id = parseId(req.params.id);
    if (id === null) return sendError(res, 400, "Task id must be a positive whole number.");

    try {
        const tasks = await readTasks();
        const task = tasks.find(function (item) { return item.id === id; });
        if (!task) return sendError(res, 404, "Task " + id + " was not found.");
        res.status(200).json(task);
    } catch (error) {
        console.error("Could not read tasks:", error.message);
        sendError(res, 500, "Could not read the tasks data.");
    }
});

// PUT /api/tasks/:id : update a task's status
app.put("/api/tasks/:id", async function (req, res) {
    const id = parseId(req.params.id);
    if (id === null) return sendError(res, 400, "Task id must be a positive whole number.");

    const status = req.body && req.body.status;
    if (!VALID_STATUSES.includes(status)) {
        return sendError(res, 400, "Status must be one of: " + VALID_STATUSES.join(", ") + ".");
    }

    try {
        const tasks = await readTasks();
        const task = tasks.find(function (item) { return item.id === id; });
        if (!task) return sendError(res, 404, "Task " + id + " was not found.");

        task.status = status;
        if (status === "completed") promoteNextTask(tasks);

        await writeTasks(tasks);
        res.status(200).json(task);
    } catch (error) {
        console.error("Could not update task:", error.message);
        sendError(res, 500, "Could not update the task.");
    }
});

// POST /api/tasks : add a new task (optional feature)
app.post("/api/tasks", async function (req, res) {
    const body = req.body || {};
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const status = body.status === undefined ? "notstarted" : body.status;

    if (!title || title.length > 80) return sendError(res, 400, "Title is required and must be 80 characters or fewer.");
    if (!description || description.length > 300) return sendError(res, 400, "Description is required and must be 300 characters or fewer.");
    if (!VALID_STATUSES.includes(status)) return sendError(res, 400, "Status must be one of: " + VALID_STATUSES.join(", ") + ".");

    try {
        const tasks = await readTasks();
        const nextId = tasks.reduce(function (max, task) { return Math.max(max, task.id); }, 0) + 1;
        const newTask = {
            id: nextId,
            title: title,
            description: description,
            status: status,
            day: null,
            icon: "doc",
            skills: [],
            deliverables: []
        };
        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Could not add task:", error.message);
        sendError(res, 500, "Could not add the task.");
    }
});

// DELETE /api/tasks/:id : remove a task (optional feature)
app.delete("/api/tasks/:id", async function (req, res) {
    const id = parseId(req.params.id);
    if (id === null) return sendError(res, 400, "Task id must be a positive whole number.");

    try {
        const tasks = await readTasks();
        const index = tasks.findIndex(function (item) { return item.id === id; });
        if (index === -1) return sendError(res, 404, "Task " + id + " was not found.");

        tasks.splice(index, 1);
        await writeTasks(tasks);
        res.status(200).json({ message: "Task " + id + " deleted.", id: id });
    } catch (error) {
        console.error("Could not delete task:", error.message);
        sendError(res, 500, "Could not delete the task.");
    }
});

// Any other /api address
app.use("/api", function (req, res) {
    sendError(res, 404, "API route not found.");
});

// ---------- Serve the website (optional) ----------
// Open http://localhost:3000/dashboard.html to use the site and API from one address.
// The backend folder itself is never served.
app.use("/backend", function (req, res) {
    res.status(404).send("Not found");
});
app.use(express.static(WEBSITE_FOLDER));

// ---------- Error handler ----------
app.use(function (err, req, res, next) {
    if (err.type === "entity.parse.failed") {
        return sendError(res, 400, "The request body is not valid JSON.");
    }
    console.error(err);
    sendError(res, 500, "Something went wrong on the server.");
});

app.listen(PORT, function () {
    console.log("TechBridge API running at http://localhost:" + PORT);
});
