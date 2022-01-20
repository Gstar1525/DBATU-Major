const express = require("express");
const router = express.Router();
const { setting, dashboard, profile } = require("../controllers/home")

router.get("/dashboard", dashboard);
router.get("/settings", setting);
router.get("/settings/profile", profile);


module.exports = router;
