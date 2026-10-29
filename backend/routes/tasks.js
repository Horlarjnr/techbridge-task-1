// Task routes: /api/tasks

const express = require("express");
const { readData, writeData } = require("../data-store");

const router = express.Router();

// The three statuses used by the dashboard
const VALID_STATUSES = ["completed", "progress", "notstarted"];

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

// GET /api/tasks : all tasks
router.get("/", async function (req, res) {
    try {
        res.status(200).json(await readData("tasks"));
    } catch (error) {
        console.error("Could not read tasks:", error.message);
        sendError(res, 500, "Could not read the tasks data.");
    }
});

// GET /api/tasks/:id : one task
router.get("/:id", async function (req, res) {
    const id = parseId(req.params.id);
    if (id === null) return sendError(res, 400, "Task id must be a positive whole number.");

    try {
        const tasks = await readData("tasks");
        const task = tasks.find(function (item) { return item.id === id; });
        if (!task) return sendError(res, 404, "Task " + id + " was not found.");
        res.status(200).json(task);
    } catch (error) {
        console.error("Could not read tasks:", error.message);
        sendError(res, 500, "Could not read the tasks data.");
    }
});

// PUT /api/tasks/:id : update a task's status (notstarted -> progress -> completed)
router.put("/:id", async function (req, res) {
    const id = parseId(req.params.id);
    if (id === null) return sendError(res, 400, "Task id must be a positive whole number.");

    const status = req.body && req.body.status;
    if (!VALID_STATUSES.includes(status)) {
        return sendError(res, 400, "Status must be one of: " + VALID_STATUSES.join(", ") + ".");
    }

    try {
        const tasks = await readData("tasks");
        const task = tasks.find(function (item) { return item.id === id; });
        if (!task) return sendError(res, 404, "Task " + id + " was not found.");

        task.status = status;
        if (status === "completed") promoteNextTask(tasks);

        await writeData("tasks", tasks);
        res.status(200).json(task);
    } catch (error) {
        console.error("Could not update task:", error.message);
        sendError(res, 500, "Could not update the task.");
    }
});

// POST /api/tasks : add a new task
router.post("/", async function (req, res) {
    const body = req.body || {};
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const status = body.status === undefined ? "notstarted" : body.status;

    if (!title || title.length > 80) return sendError(res, 400, "Title is required and must be 80 characters or fewer.");
    if (!description || description.length > 300) return sendError(res, 400, "Description is required and must be 300 characters or fewer.");
    if (!VALID_STATUSES.includes(status)) return sendError(res, 400, "Status must be one of: " + VALID_STATUSES.join(", ") + ".");

    try {
        const tasks = await readData("tasks");
        const nextId = tasks.reduce(function (max, task) { return Math.max(max, task.id); }, 0) + 1;
        const newTask = { id: nextId, title: title, description: description, status: status, day: null, icon: "doc", skills: [], deliverables: [] };
        tasks.push(newTask);
        await writeData("tasks", tasks);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Could not add task:", error.message);
        sendError(res, 500, "Could not add the task.");
    }
});

// DELETE /api/tasks/:id : remove a task
router.delete("/:id", async function (req, res) {
    const id = parseId(req.params.id);
    if (id === null) return sendError(res, 400, "Task id must be a positive whole number.");

    try {
        const tasks = await readData("tasks");
        const index = tasks.findIndex(function (item) { return item.id === id; });
        if (index === -1) return sendError(res, 404, "Task " + id + " was not found.");

        tasks.splice(index, 1);
        await writeData("tasks", tasks);
        res.status(200).json({ message: "Task " + id + " deleted.", id: id });
    } catch (error) {
        console.error("Could not delete task:", error.message);
        sendError(res, 500, "Could not delete the task.");
    }
});

module.exports = router;
