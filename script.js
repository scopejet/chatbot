const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const geminiApiKey = ""; // Replace with your actual API key

async function sendMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function fetchGeminiResponse(userMessage) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                   parts:[{
                      text: `You are a helpful chatbot that assists users on a website. The users message is: ${userMessage}`
                   }]
              }]
            }),
        });

         if (!response.ok) {
            // Handle different HTTP error responses
            if (response.status === 401) {
                 throw new Error('Invalid API Key');
            } else if (response.status === 404) {
                throw new Error('Gemini resource was not found');
            }else if (response.status === 429) {
                throw new Error('Too many request for Gemini API. Try again later');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        return "Sorry, I encountered an error. Please try again later.";
    }
}

async function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    sendMessage(userInput.value, true);

    // Get the chatbot response from Gemini
    const botResponse = await fetchGeminiResponse(userMessage);

    setTimeout(() => {
        sendMessage(botResponse, false);
    }, 500);

    userInput.value = "";
}

sendButton.addEventListener('click', handleUserInput);

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});
