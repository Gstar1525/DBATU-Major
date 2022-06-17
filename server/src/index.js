const express = require("express");
const app = express();
require("dotenv").config()
const port = process.env.PORT || 5000;
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler")
const slots = require("./routes/slots");
const users = require("./routes/users");
const businesses = require("./routes/businesses");
const checkIfAuthenticated = require("./middlewares/auth");

app.use([
    morgan("common"),
    helmet(),
    cors({ origin: "http://localhost:3000" })
]);

// how to POST body from client to server !!
// use express.json().
// JSON.stringfy the body.
// POST "Content-Type": "application/json" Header from client.

app.use(express.json());
app.get("/", (_, res) => res.json({ success: true, message: "hello world 🌍" }))
app.use("/api/v1", [slots, users, businesses]);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})