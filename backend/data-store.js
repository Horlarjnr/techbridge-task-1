// Small helpers for reading and writing the JSON data files in backend/data.

const fs = require("fs/promises");
const path = require("path");

const dataFolder = path.join(__dirname, "data");

async function readData(name) {
    const text = await fs.readFile(path.join(dataFolder, name + ".json"), "utf8");
    return JSON.parse(text);
}

async function writeData(name, data) {
    await fs.writeFile(path.join(dataFolder, name + ".json"), JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
