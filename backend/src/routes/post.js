const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const stuffCtrl = require("../controllers/post");
const multerconfig = require("../middleware/multerconfig");
const commentCtrl = require("../controllers/comment");
router.get(auth);
router.get("/", auth, stuffCtrl.getAllPost);
router.get("/:id", auth, stuffCtrl.getOnePost);
router.post("/", auth, multerconfig, stuffCtrl.createPost);
router.put("/:id", auth, multerconfig, stuffCtrl.modifyPost);
router.delete("/:id", auth, stuffCtrl.deletePost);

router.post("/:id/comments", auth, commentCtrl.createComment);
router.get("/:id/comments", auth, commentCtrl.getAllComment);
router.delete("/:id/comments/:id", auth, commentCtrl.deleteComment);

module.exports = router;
