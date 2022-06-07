const sequelize = require("../../sequelize");
const Post = sequelize.models.Post;
const User = sequelize.models.User;
const fs = require("fs");
/*
function createPost(req, res) {
  if (req.file != undefined) {
    const postFile = {
      title: req.body.title,
      content: req.body.content,
      imgUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    };
    Post.create(postFile)
      .then(() => res.status(201).json({ message: "post crée!", postFile }))
      .catch((err) => res.status(500).json({ err }));
  } else {
    const post = {
      title: req.body.title,
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
  console.log("auth" + req.auth);

  try {
    let imgUrl = "";
    if (req.file) {
      (imgUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`),
        (title = req.body.title);
    }
    const post = await Post.create({
      //title: JSON.parse(req.body.posts).title,
      //  content: JSON.parse(req.body.posts).content,
      title: req.body.title,
      content: req.body.content,
      imgUrl: imgUrl,
      UserId: req.auth,
      PostId: parseInt(req.params.id)
    });
    console.log(post);
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getOnePost(req, res) {
  const id = req.params.id;
  console.log(id);
  console.log(req.auth);
  const GetPost = await Post.findOne({ where: { id: id } });
  if (GetPost === null) {
    res.status(404).json({ message: "Post introuvable!" });
  } else {
    res.status(200).json({ GetPost });
  }
}

async function getAllPost(req, res) {
  const posts = await Post.findAll({ order: [["id", "DESC"]] })
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

async function deletePost(req, res) {
  const post = await Post.findOne({ where: { id: req.params.id } });
  const user = await User.findOne({ where: { id: req.auth } });
  if (post.UserId === req.auth)
    Post.findByPk(req.params.id).then((post) => {
      console.log(post);
      if (post === null) {
        return res
          .status(404)
          .json({ message: "Le post demandé n'existe pas!" });
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

function AllPostUser(req, res) {
  console.log("coucouc");
}

module.exports = {
  getAllPost,
  createPost,
  getOnePost,
  deletePost,
  modifyPost,
  AllPostUser
};
