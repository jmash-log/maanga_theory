// ------------------------------------
// MODULE 4 — GOBLIN DICTIONARY
// ------------------------------------

const goblinDictionary = {
    "thenga": "🥥",
    "chaya": "☕",
    "amma": "❤️",
    "exam": "💀"
};


// ------------------------------------
// MODULE 2 — CREATE GOBLIN
// ------------------------------------

function createGoblin() {

    if (document.getElementById("manglish-goblin")) {
        return;
    }

    const goblin = document.createElement("div");
    goblin.id = "manglish-goblin";

    const bubble = document.createElement("div");
    bubble.id = "goblin-bubble";

    const image = document.createElement("img");
    image.id = "goblin-character";

    image.src = chrome.runtime.getURL("assets/goblin.png");
    image.alt = "Manglish Goblin";

    goblin.appendChild(bubble);
    goblin.appendChild(image);

    document.body.appendChild(goblin);

    introduceGoblin();
}


// ------------------------------------
// SHOW MESSAGE
// ------------------------------------

function showMessage(message) {

    const bubble = document.getElementById("goblin-bubble");

    if (!bubble) {
        return;
    }

    bubble.textContent = message;
    bubble.classList.add("visible");
}


// ------------------------------------
// GOBLIN INTRODUCTION
// ------------------------------------

function introduceGoblin() {

    setTimeout(() => {
        showMessage("Hey! I'm your Manglish Goblin.");
    }, 500);
}


// ------------------------------------
// MODULE 3 — DETECT WORDS
// ------------------------------------

document.addEventListener("input", function(event) {

    const element = event.target;

    // Only watch text fields
    if (
        element.tagName !== "INPUT" &&
        element.tagName !== "TEXTAREA"
    ) {
        return;
    }

    const text = element.value;

    // --------------------------------
    // CURRENT WORD
    // --------------------------------

    const words = text.trim().split(/\s+/);

    const currentWord = words[words.length - 1];

    console.log("Current word:", currentWord);


    // --------------------------------
    // COMPLETED WORD
    // --------------------------------

    if (text.endsWith(" ")) {

        const completedWord = currentWord;

        console.log("Completed word:", completedWord);
    }
});

// ------------------------------------
// LISTEN FOR GOBLIN ACTIVATION
// ------------------------------------

chrome.runtime.onMessage.addListener((message) => {

    if (message.action === "activateGoblin") {
        createGoblin();
    }

});