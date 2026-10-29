// TechBridge Challenge Hub (Task 5, connected to the API in Task 8).
// Challenges are loaded from the backend with fetch().
// Vanilla JavaScript: track filter, difficulty filter, search and a details dialog.

// ---------- Data: one object per challenge ----------

let challenges = [];            // challenge data from the API
let loadState = "loading";      // "loading", "ready" or "error"

const trackNames = { analytics: "Data Analytics", webDevelopment: "Web Development" };
const applyUrl = "https://forms.gle/8EbdSy5ttGfLZfjv5";
const API_BASE = window.TECHBRIDGE_API || "";

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
const stateBox = document.getElementById("ch-state");
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

    const outcome = makeElement("p", "ch-out");
    outcome.appendChild(makeElement("strong", "", "Expected outcome: "));
    outcome.append(challenge.result);
    body.appendChild(outcome);

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

// Shows the loading or error message instead of the cards
function renderState() {
    stateBox.replaceChildren();
    stateBox.className = "ch-state";

    if (loadState === "loading") {
        stateBox.append(makeElement("span", "ch-spin"), makeElement("p", "", "Loading challenges..."));
        stateBox.hidden = false;
    } else if (loadState === "error") {
        stateBox.classList.add("ch-state-err");
        stateBox.append(makeElement("p", "ch-state-t", "Unable to load challenges. Please try again."),
            makeElement("p", "", "The backend is not responding. Start the server (npm start inside the backend folder), then try again."));
        const retry = makeElement("button", "btn btn-primary", "Retry");
        retry.type = "button";
        retry.addEventListener("click", loadChallenges);
        stateBox.appendChild(retry);
        stateBox.hidden = false;
    } else {
        stateBox.hidden = true;
    }
}

// GET /api/challenges : load all challenges and show them
async function loadChallenges() {
    loadState = "loading";
    renderChallenges();
    try {
        const response = await fetch(API_BASE + "/api/challenges");
        if (!response.ok) throw new Error("Request failed");
        challenges = await response.json();
        loadState = "ready";
    } catch (error) {
        challenges = [];
        loadState = "error";
    }
    renderChallenges();
}

function renderChallenges() {
    renderState();
    const visible = loadState === "ready" ? challenges.filter(matchesFilters) : [];

    grid.replaceChildren();
    visible.forEach(function (challenge) {
        grid.appendChild(createCard(challenge));
    });

    // Empty state, result count and button states
    emptyMessage.hidden = !(loadState === "ready" && visible.length === 0);
    countText.textContent = loadState === "ready" ? "Showing " + visible.length + " of " + challenges.length + " challenges" : "";

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

// A search from the dashboard can open this page with ?q=text
const startText = new URLSearchParams(window.location.search).get("q");
if (startText) {
    searchText = startText;
    searchInput.value = startText;
}

loadChallenges();
