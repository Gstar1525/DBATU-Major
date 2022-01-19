const express = require("express");
const router = express.Router();
const { home, setting } = require("../controllers/dashboard")

router.get("/", home);
router.get("/setting", setting);

module.exports = router;
