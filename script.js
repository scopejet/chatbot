const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const botResponses = {
    "hello": "Hi there!",
    "how are you": "I'm doing well, thank you!",
    "what is your name": "I'm a simple chatbot.",
    "bye": "Goodbye!",
    "default": "I'm not sure what you mean. Can you try asking something else?"
};

function sendMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom
}

function handleUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage === "") return;

    sendMessage(userInput.value, true); // Show user's message

    // Get a chatbot response
    const botResponse = botResponses[userMessage] || botResponses.default;
    setTimeout(() => { // Delay for effect
      sendMessage(botResponse, false); // Show bot's response
    }, 500);

    userInput.value = ""; // Clear input field
}

sendButton.addEventListener('click', handleUserInput);

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});