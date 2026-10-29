// TechBridge Intern Management Platform: Express backend.
// It serves the JSON API (tasks, challenges, search) and the website files.

const express = require("express");
const path = require("path");

const tasksRoutes = require("./routes/tasks");
const challengesRoutes = require("./routes/challenges");
const searchRoutes = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 3000;
const WEBSITE_FOLDER = path.join(__dirname, "..");

// ---------- Middleware ----------

// Read JSON request bodies
app.use(express.json());

// CORS: lets the website (for example Live Server on port 5500) call this API on port 3000.
// Only local addresses (and an optional ALLOWED_ORIGIN) are allowed.
app.use(function (req, res, next) {
    const origin = req.headers.origin || "";
    const isLocal = origin === "null" || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    const isAllowed = process.env.ALLOWED_ORIGIN && origin === process.env.ALLOWED_ORIGIN;

    if (isLocal || isAllowed) {
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

// ---------- API routes ----------

// Health check: the dashboard uses this to show Connected or Offline
app.get("/api/health", function (req, res) {
    res.json({ status: "ok", message: "Backend is running" });
});

app.use("/api/tasks", tasksRoutes);
app.use("/api/challenges", challengesRoutes);
app.use("/api/search", searchRoutes);

// Any other /api address
app.use("/api", function (req, res) {
    res.status(404).json({ error: "API route not found." });
});

// ---------- Serve the website ----------
// Open http://localhost:3000 to use the website and the API from one address.
// The backend folder itself is never served.
app.use("/backend", function (req, res) {
    res.status(404).send("Not found");
});
app.use(express.static(WEBSITE_FOLDER));

// ---------- Error handler ----------
app.use(function (err, req, res, next) {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: "The request body is not valid JSON." });
    }
    console.error(err);
    res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, function () {
    console.log("TechBridge platform running at http://localhost:" + PORT);
});
