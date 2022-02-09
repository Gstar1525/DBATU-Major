const express = require("express");
const router = express.Router();
const { postUser, putUserRole, getUserRole } = require("../controllers/users")

router.route("/users")
    .post(postUser)
    .put(putUserRole)

router.post("/get-role", getUserRole);

module.exports = router;