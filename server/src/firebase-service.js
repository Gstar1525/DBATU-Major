const admin = require("firebase-admin")

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "token-booking-app",
});

module.exports = admin