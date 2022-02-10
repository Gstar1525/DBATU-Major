const express = require("express");
const router = express.Router();
const { postSlots, getSlots } = require("../controllers/slots")

router.post("/slots", postSlots);
router.post("/get-slots", getSlots);

module.exports = router;