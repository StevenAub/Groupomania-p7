const sequelize = require("../../sequelize");
const Comment = sequelize.models.Comment;
const User = sequelize.models.User;
const Post = sequelize.models.Post;

const fs = require("fs");

async function createComment(req, res) {
  if (req.body.content === "") {
    console.log("Merci de remplir le champs");
  }
  const createComment = await Comment.create({
    ...req.body,
    content: req.body.content,
    UserId: req.auth,
    PostId: parseInt(req.params.id)
  });

  console.log(createComment);
  createComment
    .save()
    .then(() =>
      res.status(201).json({ message: "Le commentaire a été ajouté" })
    )
    .catch((error) => res.status(404).json({ error }));
}

async function getAllComment(req, res) {
  const id = req.params.id;
  const GetComment = await Comment.findAll({
    where: { PostId: id },
    order: [["updatedAt", "DESC"]]
  });
  if (GetComment === null) {
    res.status(404).json({ message: "Commentaire introuvable!" });
  } else {
    console.log(GetComment);
    res.status(200).json({ GetComment });
  }
}

function modifyComment(req, res) {}

function deleteComment(req, res) {}

module.exports = {
  getAllComment,
  createComment,

  deleteComment,
  modifyComment
};
