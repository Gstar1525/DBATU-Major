const admin = require("firebase-admin");
const { cert } = require("firebase-admin/app");
const serviceAccount = require("./service-account-file.json");

admin.initializeApp({
    credential: cert(serviceAccount),
    projectId: "token-booking-app",
});

module.exports = admin