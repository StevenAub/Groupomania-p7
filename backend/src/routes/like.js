const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/likes");
const auth = require("../middleware/auth");

router.get("/:id", auth, likeCtrl.findAllLikes);
router.post("/:id", auth, likeCtrl.likePost);

module.exports = router;
