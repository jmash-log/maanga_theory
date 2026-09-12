function createGoblin() {
    // Don't create another Goblin if one already exists
    if (document.getElementById("manglish-goblin")) {
        return;
    }

    // Main Goblin container
    const goblin = document.createElement("div");
    goblin.id = "manglish-goblin";

    // Speech bubble
    const bubble = document.createElement("div");
    bubble.id = "goblin-bubble";

    // Goblin image
    const image = document.createElement("img");
    image.id = "goblin-character";
    image.src = chrome.runtime.getURL("assets/goblin.png");
    image.alt = "Manglish Goblin";

    // Put everything together
    goblin.appendChild(bubble);
    goblin.appendChild(image);

    // Add Goblin to webpage
    document.body.appendChild(goblin);

    // Start Module 2 introduction
    introduceGoblin();
}


function showMessage(message) {
    const bubble = document.getElementById("goblin-bubble");

    if (!bubble) {
        return;
    }

    bubble.textContent = message;
    bubble.classList.add("visible");

    // VOICE WILL GO HERE LATER
    // Example:
    // playVoice("hello.mp3");
}


function introduceGoblin() {
    // First message
    setTimeout(() => {
        showMessage("Hey! I'm your Manglish Goblin.");
    }, 500);
}


// Listen for activation from background.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "activateGoblin") {
        createGoblin();
    }
});