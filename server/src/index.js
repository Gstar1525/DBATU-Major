const express = require("express");
const app = express();
require("dotenv").config()
const port = process.env.PORT || 5000;
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler")
const home = require("./routes/home")
const auth = require("./routes/auth");
const checkIfAuthenticated = require("./middlewares/auth");

const jsonParser = bodyParser.json()


app.use([
    morgan("common"),
    helmet(),
    cors({ origin: "http://localhost:3000" })
]);

app.get("/", (req, res) => {
    res.json({ success: true, message: "hello world 🌍" });
})

app.use("/api/v1/auth", jsonParser, auth);
app.use("/api/v1/home", checkIfAuthenticated, home);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})