const express = require("express");
const router = express.Router();
const { createSlots, readSlots } = require("../controllers/slots")

router.post("/slots", createSlots);
router.get("/slots", readSlots);


module.exports = router;