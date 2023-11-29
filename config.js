// config.js
class FirebaseConfig {
    constructor(apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId) {
        this.apiKey = apiKey;
        this.authDomain = authDomain;
        this.projectId = projectId;
        this.storageBucket = storageBucket;
        this.messagingSenderId = messagingSenderId;
        this.appId = appId;
    }

    initializeApp() {
        const firebaseConfig = {
            apiKey: this.apiKey,
            authDomain: this.authDomain,
            projectId: this.projectId,
            storageBucket: this.storageBucket,
            messagingSenderId: this.messagingSenderId,
            appId: this.appId
        };
        firebase.initializeApp(firebaseConfig);
    }

    getDatabaseRef(childPath) {
        return firebase.database().ref(childPath);
    }
}

const firebaseConfig = new FirebaseConfig(
    "YOUR_API_KEY",
    "YOUR_AUTH_DOMAIN",
    "YOUR_PROJECT_ID",
    "YOUR_STORAGE_BUCKET",
    "YOUR_MESSAGING_SENDER_ID",
    "YOUR_APP_ID"
);

firebaseConfig.initializeApp();
const messagesRef = firebaseConfig.getDatabaseRef('messages');
