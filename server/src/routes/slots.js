const express = require("express");
const router = express.Router();
const { createSlots } = require("../controllers/slots")

router.post("/slots", createSlots);

module.exports = router;