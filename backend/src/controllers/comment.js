const sequelize = require("../../sequelize");
const Comment = sequelize.models.Comment;
const User = sequelize.models.User;

async function createComment(req, res) {
  const comment = req.body.content.trim();
  const createComment = await Comment.create({
    content: comment,
    UserId: req.auth,
    PostId: parseInt(req.params.id)
  });
  if (comment === "") {
    res.status(400).json({ message: "Merci de remplir le champ!" });
  } else {
    createComment
      .save()
      .then(() =>
        res.status(201).json({ message: "Le commentaire a été ajouté" })
      )
      .catch((error) =>
        res.status(500).json({ message: "Merci de remplir les champs", error })
      );
  }
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

function modifyComment(req, res) {}

async function deleteComment(req, res) {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(200).json({ message: "Le commentaire a été supprimé !" })
    )
    .catch((error) => res.status(400).json({ error }));
}

module.exports = {
  getAllComment,
  createComment,

  deleteComment,
  modifyComment
};
