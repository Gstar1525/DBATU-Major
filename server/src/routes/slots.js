const express = require("express");
const router = express.Router();
const { 
    postSlots, 
    getSlots, 
    putSlot, 
    deleteSlt, 
    sendConfirmation,
    deleteCustomerBookedSlt, 
    deleteBookedSlt
} = require("../controllers/slots")

router.post("/slots", postSlots);
router.post("/get-slots", getSlots);
router.post("/sendConfirmation", sendConfirmation);
router.put("/put-slot", putSlot);
router.delete("/delete-slot", deleteSlt);
router.delete("/delete-cutomer-booked-slot", deleteCustomerBookedSlt);
router.delete("/delete-booked-slot", deleteBookedSlt);

module.exports = router;