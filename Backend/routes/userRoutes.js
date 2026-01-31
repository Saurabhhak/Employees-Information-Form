// Connect route to server
const express = require("express");
const router = express.Router();
const { signUsers , logUsers } = require("../controllers/authController");
router.post("/signup", signUsers);
router.get("/users", logUsers);
module.exports = router;
