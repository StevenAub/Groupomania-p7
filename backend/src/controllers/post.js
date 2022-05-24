const sequelize = require("../../sequelize");

const fs = require("fs");

function createPost(req, res) {
  if (req.file != undefined) {
    const postFile = {
      title: req.body.title,
      content: req.body.content,

      imgUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
    sequelize.models.Post.create(postFile)
      .then(() => res.status(201).json({ message: "post crée!" }))
      .catch((err) => res.status(500).json({ err }));
  } else {
    const post = {
      title: req.body.title,
      content: req.body.content,
    };
    sequelize.models.Post.create(post)
      .then(() => {
        res.status(200).json({ message: "post crée!" });
      })
      .catch((err) => res.status(500).json({ err }));
  }
}

async function getOnePost(req, res) {
  const id = req.params.id;
  const GetPost = await sequelize.models.Post.findOne({ where: { id: id } });
  if (GetPost === null) {
    res.status(404).json({ message: "Post introuvable!" });
  } else {
    res.status(200).json({ GetPost });
  }
}

async function getAllPost(req, res) {
  const posts = await sequelize.models.Post.findAll()
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) =>
      res
        .status(404)
        .json({ message: "Aucun post disponnible actuellement!", erreur: err })
    );
}

function modifyPost(req, res) {}

function deletePost(req, res) {}

module.exports = {
  getAllPost,
  createPost,
  getOnePost,
  deletePost,
  modifyPost,
};
