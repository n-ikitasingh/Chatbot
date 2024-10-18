const msgerForm = document.getElementById("msger-inputarea");
const msgerInput = document.getElementById("msger-input");
const msgerChat = document.getElementById("msger-chat");

const BOT_IMG = "WhatsApp Image 2024-10-16 at 21.48.03_a5775ad7.jpg"; // Ensure this path is correct
const PERSON_IMG = "pexels-toan-van-1745332-14442408.jpg"; // Ensure this path is correct
const BOT_NAME = "Calm-Dev";
const PERSON_NAME = "User";

// Prompts for different emotions
const prompts = {
    greetings: ["hi", "hello", "hey", "howdy"],
    feelings: {
        sad: ["I am sad", "I feel sad", "I'm feeling down", "sad"],
        angry: ["I am angry", "I'm so angry", "I feel upset"],
        anxious: ["I feel anxious", "I'm so anxious", "I feel worried"],
        happy: ["I feel great", "I'm happy", "I'm feeling good"],
    },
};

const replies = {
    greetings: [
        "Hello! How can I assist you today?",
        "Hi there! What’s on your mind?",
    ],
    feelings: {
        sad: [
            "I'm really sorry to hear that. Why are you feeling sad?",
            "It's okay to feel this way. Can you tell me more about why you're feeling sad?",
        ],
        angry: [
            "I understand. What is making you feel angry right now?",
            "Anger can be tough. Do you want to talk about what's causing it?",
        ],
        anxious: [
            "It's natural to feel anxious sometimes. What’s on your mind?",
            "Anxiety can be overwhelming. Can you share what’s making you feel this way?",
        ],
        happy: [
            "That’s wonderful to hear! What’s making you feel happy?",
            "I’m glad to hear that! What’s been going well for you?",
        ],
    },
};

function addChat(name, img, side, text) {
    const msgHTML = `
        <div class="msg ${side}-msg">
            <div class="msg-img ${side}-img" style="background-image: url('${img}');"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <span class="msg-info-name">${name}</span>
                    <span class="msg-info-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div>${text}</div>
            </div>
        </div>
    `;
    msgerChat.innerHTML += msgHTML;
    msgerChat.scrollTop = msgerChat.scrollHeight; // Auto-scroll to the latest message
}

msgerForm.addEventListener("submit", event => {
    event.preventDefault(); // Prevent the default form submission
    const msgText = msgerInput.value.trim();
    if (!msgText) return; // Don't send empty messages
    msgerInput.value = ""; // Clear input field
    addChat(PERSON_NAME, PERSON_IMG, "right", msgText); // Display user message
    output(msgText); // Call output function
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^a-z\s]/gi, "").trim();

    // Check for greetings
    if (prompts.greetings.some(greeting => text.includes(greeting))) {
        product = replies.greetings[Math.floor(Math.random() * replies.greetings.length)];
    } else {
        // Check for feelings
        let matchedFeeling = null;
        for (const [feeling, phrases] of Object.entries(prompts.feelings)) {
            if (phrases.some(phrase => text.includes(phrase))) {
                matchedFeeling = feeling;
                break;
            }
        }

        // Respond based on the matched feeling
        if (matchedFeeling) {
            product = replies.feelings[matchedFeeling][Math.floor(Math.random() * replies.feelings[matchedFeeling].length)];
        } else {
            product = "I'm here to listen. Can you share more about how you're feeling?";
        }
    }

    const delay = 500; // Fixed delay for response
    setTimeout(() => {
        addChat(BOT_NAME, BOT_IMG, "left", product); // Display bot response
    }, delay);
}

// Initial greeting
document.addEventListener("DOMContentLoaded", () => {
    addChat(BOT_NAME, BOT_IMG, "left", "Hi, welcome to Calm-Dev Chatbot! Go ahead and ask me anything 😊.");
});
