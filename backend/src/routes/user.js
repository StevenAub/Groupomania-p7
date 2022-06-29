const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");
const passwordValidator = require("../middleware/password-validator");
const multerconfig = require("../middleware/multerconfig");

router.post("/signup", passwordValidator, userCtrl.Signup);
router.post("/login", userCtrl.Login);
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, multerconfig, userCtrl.modifyUser);
router.put("/:id/img", auth, multerconfig, userCtrl.modifyImageUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/:id/post", auth, userCtrl.getPostUserId);

module.exports = router;
