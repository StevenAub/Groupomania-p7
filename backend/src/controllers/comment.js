const sequelize = require("../../sequelize");
const comment = require("../models/comment");
const Comment = sequelize.models.Comment;
const User = sequelize.models.User;

async function createComment(req, res) {
  const comment = req.body.content.trim();
  if (comment === "") {
    return res.status(400).json({ message: "Merci de remplir le champ!" });
  }
  const createComment = await Comment.create({
    content: comment,
    UserId: req.auth.userId,
    PostId: parseInt(req.params.id)
  });
  createComment
    .save()
    .then(() =>
      res.status(201).json({ message: "Le commentaire a été ajouté" })
    )
    .catch((error) => res.status(500).json({ error }));
}

async function getAllComment(req, res) {
  const id = req.params.id;
  const GetComment = await Comment.findAll({
    where: { PostId: id },
    include: [
      {
        model: User,
        attributes: ["username", "imgProfil"]
      }
    ]
  });
  if (GetComment === null) {
    res.status(404).json({ message: "Commentaire introuvable!" });
  } else {
    res.status(200).json({ GetComment });
  }
}

async function deleteComment(req, res) {
  const comment = await Comment.findOne({ where: { id: req.params.id } });
  if (comment.UserId === req.auth.userId || req.auth.isAdmin === true) {
    comment
      .destroy()
      .then(() =>
        res.status(200).json({ message: "Le commentaire a été supprimé !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({
      message: "Vous n'etes pas autorisé a supprimer ce commentaire!"
    });
  }
}

module.exports = {
  getAllComment,
  createComment,
  deleteComment
};
