const express = require("express");
const router = express.Router();
const { getbusinesses, getbusinessesByUid } = require("../controllers/businesses")

router.get("/get-businesses", getbusinesses);
router.post("/get-businesses-by-id", getbusinessesByUid);

module.exports = router;