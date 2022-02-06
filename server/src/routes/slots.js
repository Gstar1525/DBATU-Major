const express = require("express");
const router = express.Router();
const { addslots, insertSlots } = require("../controllers/slots")

router.post("/slots", insertSlots);

module.exports = router;