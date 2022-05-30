const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multerconfig = require("../middleware/multerconfig");

router.post("/", multerconfig, stuffCtrl.createPost);
router.put("/:id", stuffCtrl.modifyPost);
router.delete("/:id", stuffCtrl.deletePost);
router.get("/", stuffCtrl.getAllPost);
router.get("/:id", stuffCtrl.getOnePost);

module.exports = router;
