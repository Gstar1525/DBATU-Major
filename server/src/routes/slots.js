const express = require("express");
const router = express.Router();
const { postSlots, getSlots, putSlot, deleteSlt, sendConfirmation } = require("../controllers/slots")

router.post("/slots", postSlots);
router.post("/get-slots", getSlots);
router.post("/sendConfirmation", sendConfirmation);
router.put("/put-slot", putSlot);
router.delete("/delete-slot", deleteSlt);

module.exports = router;