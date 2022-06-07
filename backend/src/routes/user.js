const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const passwordValidator = require("../middleware/password-validator");

router.post("/signup", userCtrl.Signup);
router.post("/login", userCtrl.Login);

module.exports = router;
