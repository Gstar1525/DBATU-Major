const express = require("express");
const router = express.Router();
const {
    getbusinesses,
    getbusinessesByUid,
    postBookingData,
    getAllBookingData,
    postBusinessData,
    
} = require("../controllers/businesses")

router.get("/get-businesses", getbusinesses);
router.post("/get-businesses-by-id", getbusinessesByUid);
router.post("/post-booking-data", postBookingData);
router.post("/post-business-data", postBusinessData);
router.post("/get-all-booking-data", getAllBookingData);

module.exports = router;