const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multerconfig = require("../middleware/multerconfig");
const commentCtrl = require("../controllers/comment");

router.post("/", multerconfig, stuffCtrl.createPost);
router.put("/:id", stuffCtrl.modifyPost);
router.delete("/:id", stuffCtrl.deletePost);
router.get("/", auth, stuffCtrl.getAllPost);
router.get("/:id", stuffCtrl.getOnePost);

router.post("/:id/comments", commentCtrl.createComment);
router.get("/:id/comments/:id", commentCtrl.getAllComment);
router.put("/:id/comments/:id", commentCtrl.modifyComment);
router.delete("/:id/comments/:id", commentCtrl.deleteComment);

module.exports = router;
