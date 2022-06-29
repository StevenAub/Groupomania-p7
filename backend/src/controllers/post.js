const sequelize = require("../../sequelize");
const Post = sequelize.models.Post;
const Comment = sequelize.models.Comment;
const Likes = sequelize.models.Likes;
const User = sequelize.models.User;
const fs = require("fs");
const sharp = require("sharp");

async function createPost(req, res) {
  console.log({ ...req.auth });
  const USERID = { ...req.auth };
  console.log(USERID.userId);
  const title = req.body.title.trim();
  if (title === "") {
    return res
      .status(400)
      .json({ message: "Merci de remplir au moins le titre" });
  } else {
    try {
      let imgUrl = "";
      if (req.file) {
        imgUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        const nameImg = imgUrl.split("/images/")[1];

        async function resizeImg() {
          await sharp(`./images/${nameImg}`)
            .resize(1500)
            .toFile(`./images/mini_${nameImg}`);
          fs.unlink(`images/${nameImg}`, () => {
            imgUrl = `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`;
          });
        }
        await resizeImg();
        imgUrl = `${req.protocol}://${req.get("host")}/images/mini_${
          req.file.filename
        }`;
      }
      const post = await Post.create({
        title: title,
        content: req.body.content,
        imgUrl: imgUrl,
        UserId: req.auth,
        PostId: parseInt(req.params.id)
      });

      res.status(200).json({ post });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

async function getOnePost(req, res) {
  const id = req.params.id;

  const GetPost = await Post.findOne({
    where: { id: id },
    include: [
      {
        model: User,
        attributes: ["username", "imgProfil"]
      }
    ]
  });
  if (GetPost === null) {
    res.status(404).json({ message: "Post introuvable!" });
  } else {
    res.status(200).json({ GetPost });
  }
}

async function getAllPost(req, res) {
  await Post.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username", "imgProfil"]
      }
    ]
  })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) =>
      res
        .status(404)
        .json({ message: "Aucun post disponnible actuellement!", erreur: err })
    );
}

async function modifyPost(req, res) {
  const post = await Post.findOne({ where: { id: req.params.id } });

  const filename = post.imgUrl.split("/images/")[1];
  let imgUrl = "";
  if (req.file) {
    fs.unlink(`images/${filename}`, () => {
      imgUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      post
        .update({ imgUrl: imgUrl || undefined })
        .then(() =>
          res.status(200).json({ message: "Le post a été modifiée!" })
        )
        .catch((err) => res.status(404).json({ err }));
    });
  } else {
    const postObject = {
      ...req.body.post
    };
    post
      .update({
        title: req.body.title || undefined,
        content: req.body.content || undefined
      })
      .then(() =>
        res.status(200).json({ message: "Le post a été modifiée!", postObject })
      )
      .catch((err) => res.status(404).json({ err }));
  }
}

async function deletePost(req, res) {
  const user = await User.findOne({
    where: { id: req.auth }
  });
  const admin = user.isAdmin;
  const post = await Post.findOne({
    where: { id: req.params.id }
  });
  console.log(post);
  if (post.UserId === req.auth || admin === true)
    Post.findByPk(req.params.id).then((post) => {
      if (post === null) {
        return res
          .status(404)
          .json({ message: "Le post demandé n'existe pas!" });
      }
      const filename = post.imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Comment.destroy({ where: { PostId: req.params.id } });
        Likes.destroy({ where: { PostId: req.params.id } });
        Post.destroy({ where: { id: post.id } })
          .then((_) => {
            res
              .status(200)
              .json({ message: `Le post ${post.title} à bien été supprimé!` });
          })
          .catch((error) => {
            res.status(500).json({
              message:
                "Le post n'a pas pu etre supprimé, Réessayez dans quelques instants!",
              erreur: error
            });
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
