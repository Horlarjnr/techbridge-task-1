// Search route: /api/search?q=text
// Looks through both the tasks and the challenges.

const express = require("express");
const { readData } = require("../data-store");

const router = express.Router();

// Joins the fields we want to search into one lowercase text
function searchableText(item, fields) {
    return fields.map(function (field) {
        const value = item[field];
        return Array.isArray(value) ? value.join(" ") : String(value || "");
    }).join(" ").toLowerCase();
}

router.get("/", async function (req, res) {
    const query = typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : "";
    if (!query) {
        return res.status(400).json({ error: "Search text is required. Use /api/search?q=text." });
    }

    try {
        const tasks = await readData("tasks");
        const challenges = await readData("challenges");

        const matchingTasks = tasks.filter(function (task) {
            return searchableText(task, ["title", "description", "skills"]).includes(query);
        });
        const matchingChallenges = challenges.filter(function (challenge) {
            return searchableText(challenge, ["title", "description", "track", "difficulty", "skills", "tools"]).includes(query);
        });

        res.status(200).json({
            query: query,
            total: matchingTasks.length + matchingChallenges.length,
            tasks: matchingTasks,
            challenges: matchingChallenges
        });
    } catch (error) {
        console.error("Search failed:", error.message);
        res.status(500).json({ error: "Could not search the data." });
    }
});

module.exports = router;
