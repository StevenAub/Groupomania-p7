const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const passwordValidator = require("../middleware/password-validator");

router.post("/signup", userCtrl.Signup);
router.post("/login", userCtrl.Login);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.modifyUser);
router.delete("/:id", userCtrl.deleteUser);
router.get("/:id/post", userCtrl.getPostUserId);

module.exports = router;
