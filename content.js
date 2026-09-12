// ===============================
// GOBLIN DICTIONARY
// ===============================

const goblinDictionary = {

    "thenga": {
        emoji: "🥥",
        message: "THENGAAAA!"
    },

    "chaya": {
        emoji: "☕",
        message: "Chaya time!"
    },

    "amma": {
        emoji: "❤️",
        message: "Ente poraali!"
    },

    "achan": {
        emoji: "❤️",
        message: "Achan mittayi vedicharm!"
    },

    "chechi": {
        emoji: "🐒",
        message: "Awwww!"
    },

    "chettan": {
        emoji: "🐒",
        message: "Awwww!"
    },

    "aniyan": {
        emoji: "🐒",
        message: "Awwww!"
    },

    "aniyathi": {
        emoji: "🐒",
        message: "Awwww!"
    },

    "appooppan": {
        emoji: "❤️",
        message: "Awwww!"
    },

    "ammumma": {
        emoji: "❤️",
        message: "Awwww!"
    },

    "exam": {
        emoji: "💀",
        message: "aaare kettikkaana?!"
    },

    "assignment": {
        emoji: "💀",
        message: "assignmento athokke veno?"
    }

};


// ===============================
// CREATE GOBLIN
// ===============================

function createGoblin() {

    if (document.getElementById("manglish-goblin")) {
        return;
    }

    const goblinContainer =
        document.createElement("div");

    goblinContainer.id =
        "manglish-goblin";

    goblinContainer.innerHTML = `

        <div id="goblin-bubble"></div>

        <div id="goblin-emoji"></div>

        <img
            id="goblin-character"
            src="${chrome.runtime.getURL("assets/goblin.png")}"
            alt="Manglish Goblin"
        >

        <div id="goblin-learn">

            <button id="goblin-thanks">
                Thank uuu
            </button>

        </div>

    `;

    document.body.appendChild(
        goblinContainer
    );

    console.log("Goblin created");
}


// ===============================
// SHOW MESSAGE
// ===============================

let messageTimer;

function showMessage(message) {

    const bubble =
        document.getElementById(
            "goblin-bubble"
        );

    if (!bubble) {
        return;
    }

    bubble.textContent =
        message;

    bubble.classList.add(
        "visible"
    );

    clearTimeout(
        messageTimer
    );

    messageTimer =
        setTimeout(() => {

            bubble.classList.remove(
                "visible"
            );

        }, 2000);
}


// ===============================
// SHOW EMOJI
// ===============================

let emojiTimer;

function showEmoji(emoji) {

    const emojiElement =
        document.getElementById(
            "goblin-emoji"
        );

    if (!emojiElement) {
        return;
    }

    emojiElement.textContent =
        emoji;

    emojiElement.classList.add(
        "visible"
    );

    clearTimeout(
        emojiTimer
    );

    emojiTimer =
        setTimeout(() => {

            emojiElement.classList.remove(
                "visible"
            );

        }, 2000);
}


// ===============================
// UNKNOWN WORD
// ===============================

function showLearningRequest() {

    const bubble =
        document.getElementById(
            "goblin-bubble"
        );

    const learnBox =
        document.getElementById(
            "goblin-learn"
        );

    const thanksButton =
        document.getElementById(
            "goblin-thanks"
        );

    if (
        !bubble ||
        !learnBox ||
        !thanksButton
    ) {
        return;
    }

    bubble.innerHTML = `
        <strong>What's that word?</strong><br>
        Can you tell Ash and Anamika to teach me?
    `;

    bubble.classList.add(
        "visible"
    );

    learnBox.style.display =
        "block";

    thanksButton.onclick =
        function () {

            bubble.classList.remove(
                "visible"
            );

            learnBox.style.display =
                "none";
        };
}


// ===============================
// DETECT TYPING
// ===============================

document.addEventListener(
    "input",
    function (event) {

        const element =
            event.target;

        if (
            element.tagName !== "INPUT" &&
            element.tagName !== "TEXTAREA"
        ) {
            return;
        }

        const text =
            element.value;

        console.log(
            "Current text:",
            text
        );


        // Only react when
        // user presses space
        if (!text.endsWith(" ")) {
            return;
        }


        // Remove the trailing space
        const textWithoutSpace =
            text.trim();


        // Get the last completed word
        const words =
            textWithoutSpace.split(/\s+/);


        const completedWord =
            words[words.length - 1]
                .toLowerCase();


        console.log(
            "Completed word:",
            completedWord
        );


        // ===============================
        // CHECK DICTIONARY
        // ===============================

        const response =
            goblinDictionary[
                completedWord
            ];


        if (response) {

            console.log(
                "Goblin knows:",
                completedWord
            );

            showEmoji(
                response.emoji
            );

            showMessage(
                response.message
            );

        } else {

            console.log(
                "Goblin doesn't know:",
                completedWord
            );

            showLearningRequest();
        }

    }
);


// ===============================
// ACTIVATE GOBLIN
// ===============================

chrome.runtime.onMessage.addListener(
    function (message) {

        if (
            message.action ===
            "activateGoblin"
        ) {

            createGoblin();

            showMessage(
                "Hiii! I'm your Manglish Goblin!"
            );
        }

    }
);