const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multerconfig = require("../middleware/multerconfig");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/likes");

router.post("/", auth, multerconfig, stuffCtrl.createPost);
router.put("/:id", auth, stuffCtrl.modifyPost);
router.delete("/:id", auth, stuffCtrl.deletePost);
router.get("/", auth, stuffCtrl.getAllPost);
router.get("/:id", auth, stuffCtrl.getOnePost);

router.post("/:id/like", auth, likeCtrl.likePost);

router.post("/:id/comments", auth, commentCtrl.createComment);
router.get("/:id/comments", auth, commentCtrl.getAllComment);
router.put("/:id/comments/:id", auth, commentCtrl.modifyComment);
router.delete("/:id/comments/:id", auth, commentCtrl.deleteComment);

module.exports = router;
