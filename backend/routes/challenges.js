// Challenge routes: /api/challenges

const express = require("express");
const { readData } = require("../data-store");

const router = express.Router();

// GET /api/challenges : all challenges
router.get("/", async function (req, res) {
    try {
        res.status(200).json(await readData("challenges"));
    } catch (error) {
        console.error("Could not read challenges:", error.message);
        res.status(500).json({ error: "Could not read the challenges data." });
    }
});

// GET /api/challenges/:id : one challenge
router.get("/:id", async function (req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "Challenge id must be a positive whole number." });
    }

    try {
        const challenges = await readData("challenges");
        const challenge = challenges.find(function (item) { return item.id === id; });
        if (!challenge) return res.status(404).json({ error: "Challenge " + id + " was not found." });
        res.status(200).json(challenge);
    } catch (error) {
        console.error("Could not read challenges:", error.message);
        res.status(500).json({ error: "Could not read the challenges data." });
    }
});

module.exports = router;
