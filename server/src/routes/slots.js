const express = require("express");
const router = express.Router();
const { addslots } = require("../controllers/slots")

router.post("/getslots", addslots);

module.exports = router;