const sequelize = require("../../sequelize");
const Post = sequelize.models.Post;

const fs = require("fs");
/*
function createPost(req, res) {
  if (req.file != undefined) {
    const postFile = {
      title: req.body.title,
      content: req.body.content,
      userId: req.userId,
      imgUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    };
    Post.create(postFile)
      .then(() => res.status(201).json({ message: "post crée!", postFile }))
      .catch((err) => res.status(500).json({ err }));
  } else {
    const post = {
      title: req.body.title,
      userId: req.userId,
      content: req.body.content
    };
    Post.create(post)
      .then(() => {
        res.status(200).json({ message: "post crée!", post });
      })
      .catch((err) => res.status(500).json({ err }));
  }
}*/
async function createPost(req, res) {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    const post = await Post.create({
      title: req.body.title,
      imgUrl: imageUrl,
      userId: id
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getOnePost(req, res) {
  const id = req.params.id;
  const GetPost = await Post.findOne({ where: { id: id } });
  if (GetPost === null) {
    res.status(404).json({ message: "Post introuvable!" });
  } else {
    res.status(200).json({ GetPost });
  }
}

async function getAllPost(req, res) {
  const posts = await Post.findAll()
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) =>
      res
        .status(404)
        .json({ message: "Aucun post disponnible actuellement!", erreur: err })
    );
}

function modifyPost(req, res) {
  const id = req.params.id;
  console.log(id);
  Post.update(req.body, { where: { id: id } })
    .then((_) => {
      return Post.findByPk(id).then((post) => {
        if (post === null) {
          return res.status(404).json({ message: "Aucun post trouvé!" });
        }
        res
          .status(200)
          .json({ message: `Le post ${post.title} a bien été modifié!` });
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (err instanceof UniqueConstraintError) {
        return res.status(400).json({ message: "error.message", data: error });
      }

      res.status(500).json({
        message: `Le post n'a pas pu être modifié. Réessayez dans quelques instants.`,
        data: err
      });
    });
}

function deletePost(req, res) {
  Post.findByPk(req.params.id).then((post) => {
    console.log(post);
    if (post === null) {
      return res.status(404).json({ message: "Le post demandé n'existe pas!" });
    }
    return Post.destroy({ where: { id: post.id } })
      .then((_) => {
        res
          .status(200)
          .json({ message: `Le post ${post.title} à bien été supprimé!` });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Le post n'a pas pu etre supprimé, Réessayez dans quelques instants!",
          erreur: err
        });
      });
  });
}

module.exports = {
  getAllPost,
  createPost,
  getOnePost,
  deletePost,
  modifyPost
};
