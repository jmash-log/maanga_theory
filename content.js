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


function showMessage(message) {
    const bubble = document.getElementById("goblin-bubble");

    if (!bubble) {
        return;
    }

    bubble.textContent = message;
    bubble.classList.add("visible");
}


function introduceGoblin() {
    setTimeout(() => {
        showMessage("Hey! I'm your Manglish Goblin.");
    }, 500);
}


// ------------------------------------
// MODULE 3 — DETECT COMPLETED WORD
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

    // Check if the user just typed a space
    if (text.endsWith(" ")) {

        // Remove the final space
        const textWithoutSpace = text.trim();

        // Split the text into words
        const words = textWithoutSpace.split(/\s+/);

        // Get the last completed word
        const completedWord = words[words.length - 1];

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