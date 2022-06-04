const sequelize = require("../../sequelize");
const Comment = sequelize.models.Comment;

const fs = require("fs");

async function createComment(req, res) {
  console.log("coucou");
  const comment = req.body.content;

  Comment.create({ comment })
    .then((_) => res.status(201).json({ message: "Commentaire envoyé!" }))
    .catch((err) => console.log(err));
}

async function getAllComment(req, res) {}

function modifyComment(req, res) {}

function deleteComment(req, res) {}

module.exports = {
  getAllComment,
  createComment,

  deleteComment,
  modifyComment
};
