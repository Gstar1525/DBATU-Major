const admin = require("../firebase-service.js")
const db = admin.firestore()

// db.settings({
//     host: "localhost:8080",
//     ssl: false
// })

module.exports = { db }