// app.js
class InstantMessagesApp {
    constructor() {
        this.messageContainer = document.getElementById('messageContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendMessageBtn = document.getElementById('sendMessageBtn');

        this.initFirebase();
        this.attachEventListeners();
        this.setupServiceWorker();
    }

    initFirebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.database = firebase.database();
        this.messagesRef = this.database.ref('messages');
    }

    attachEventListeners() {
        this.sendMessageBtn.addEventListener('click', () => this.sendMessage());
        this.messagesRef.on('child_added', (snapshot) => this.displayMessage(snapshot));
    }

    sendMessage() {
        const messageText = this.messageInput.value.trim();

        if (messageText !== '') {
            const timestamp = new Date().toISOString();
            this.messagesRef.push({
                text: messageText,
                timestamp: timestamp
            });

            this.messageInput.value = '';
        }
    }

    displayMessage(snapshot) {
        const message = snapshot.val();
        const messageElement = this.createMessageElement(message);
        this.messageContainer.appendChild(messageElement);
        this.scrollMessageContainer();
    }

    createMessageElement(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${message.text} - ${new Date(message.timestamp).toLocaleTimeString()}`;
        return messageElement;
    }

    scrollMessageContainer() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => console.log('Service Worker registered with scope:', registration.scope))
                .catch(error => console.error('Error registering Service Worker:', error));
        }
    }
}

// Create an instance of the app
const instantMessagesApp = new InstantMessagesApp();
