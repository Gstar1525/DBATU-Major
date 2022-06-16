const express = require("express");
const router = express.Router();
const { postSlots, getSlots, putSlot, deleteSlt } = require("../controllers/slots")

router.post("/slots", postSlots);
router.post("/get-slots", getSlots);
router.put("/put-slot", putSlot);
router.delete("/delete-slot", deleteSlt);

module.exports = router;