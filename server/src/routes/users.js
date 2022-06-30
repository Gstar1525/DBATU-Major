const express = require("express");
const router = express.Router();
const { postUser, putUserRole, getUserRole, getUserData } = require("../controllers/users")

router.route("/users")
    .post(postUser)
    .put(putUserRole)
router.post("/get-role", getUserRole);
router.post("/get-user-data", getUserData);

module.exports = router;