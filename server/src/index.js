const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const middlewares = require("./middlewares.js")

app.use([
    morgan("common"),
    helmet(),
    cors({ origin: "http://localhost:3000" })
]);

app.get("/", (req, res) => {
    res.json({ success: true, message: "hello world 🌍" });
})

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})