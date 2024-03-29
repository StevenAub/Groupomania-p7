const sequelize = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = sequelize.models.User;
const Post = sequelize.models.Post;
const Comment = sequelize.models.Comment;
const Likes = sequelize.models.Likes;
const fs = require("fs");
const validator = require("email-validator");
const sharp = require("sharp");

function Signup(req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  if (!validator.validate(email)) {
    res.status(500).json({ message: "Adresse email invalide" });
  } else {
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez renseigner tous les champs!" });
    } else {
      User.findOne({
        attributes: ["email"],
        where: { email: email }
      }).then(function (userFind) {
        if (!userFind) {
          bcrypt.hash(req.body.password, 10).then((hash) => {
            User.create({
              email: req.body.email,
              username: req.body.username,
              password: hash,
              imgProfil: ""
            })
              .then(
                res.status(201).json({
                  message: "Utilisateur enregistré, vous pouvez vous connecter",
                  status: 201
                })
              )
              .catch((err) => res.status(400).json({ error: err }));
          });
        } else {
          return res
            .status(400)
            .json({ message: "Adresse email deja utilisée!" });
        }
      });
    }
  }
}

async function Login(req, res) {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas.`;
        return res.status(404).json({ message });
      }
      return bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrect.`;
            return res.status(401).json({ message });
          }

          const token = jwt.sign(
            { userId: user.id, username: user.username, admin: user.isAdmin },
            "random",
            {
              expiresIn: "24h"
            }
          );
          const message = `L'utilisateur a été connecté avec succès`;
          res.status(200).json({ message, data: user, token, status: "200" });
        });
    })
    .catch((error) => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
}

async function getAllUsers(req, res) {
  await User.findAll({ order: [["id", "DESC"]] })
    .then((users) => res.status(200).json({ users }))
    .catch((err) =>
      res.status(404).json({
        message: "Aucun utilisateur disponnible actuellement!",
        erreur: err
      })
    );
}

async function getOneUser(req, res) {
  const id = req.params.id;
  const GetUser = await User.findOne({ where: { id: id } });

  if (GetUser === null) {
    res.status(404).json({ message: "User introuvable!" });
  } else {
    res.status(200).json({ GetUser });
  }
}
async function getPostUserId(req, res) {
  const id = req.params.id;
  const GetPost = await Post.findAll({
    where: { UserId: id },
    order: [["id", "DESC"]]
  });
  if (GetPost === null) {
    res.status(404).json({ message: "User introuvable!" });
  } else {
    res.status(200).json({ GetPost });
  }
}

async function modifyUser(req, res) {
  const id = req.params.id;
  const user = await User.findOne({ where: { id: id } });
  const password = req.body.password;
  const userInfo = { ...req.body };
  if (password) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      user.update({ password: hash });
    });
  }
  user
    .update({
      username: userInfo.username || undefined,
      email: userInfo.email || undefined
    })
    .then(() => res.status(200).json({ message: "User modifié", user }))
    .catch((error) => res.status(404).json({ error }));
}

async function modifyImageUser(req, res) {
  const id = req.params.id;
  const user = await User.findOne({ where: { id: id } });
  const filename = user.imgProfil.split("/images/")[1];

  fs.unlink(`images/${filename}`, async () => {
    if (req.file) {
      const img = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;

      const nameImg = img.split("/images/")[1];

      async function resizeImg() {
        await sharp(`./images/${nameImg}`)
          .resize(500)
          .toFile(`./images/mini_${nameImg}`);
        fs.unlinkSync(`images/${nameImg}`, () => {
          imgUrl = `${req.proStocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        });
      }
      await resizeImg();
      user
        .update({
          imgProfil: `${req.protocol}://${req.get("host")}/images/mini_${
            req.file.filename
          }`
        })
        .then(() => res.status(200).json({ message: "User modifié", user }))
        .catch((error) => res.status(404).json({ error }));
    }
  });
}

async function deleteUser(req, res) {
  const user = await User.findOne({
    where: { id: req.auth.userId },
    include: { model: Post, attributes: ["imgUrl"] }
  });
  if (user.id === req.auth);

  const postsUser = JSON.stringify(user.Posts);
  const allImg = JSON.parse(postsUser);
  allImg.map((imgurl) => {
    const filename = imgurl.imgUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      Post.destroy({ where: { UserId: req.params.id } });
      Comment.destroy({ where: { UserId: req.params.id } });
      Likes.destroy({ where: { UserId: req.params.id } });
    });
  });

  User.findByPk(req.params.id).then((user) => {
    if (user === null) {
      return res
        .status(404)
        .json({ message: "L'utilisateur demandé n'existe pas!" });
    }
    const filename = user.imgProfil.split("/images/")[1];

    fs.unlink(`images/${filename}`, () => {
      User.destroy({ where: { id: user.id } })
        .then((_) => {
          res.status(200).json({
            message: `L'utilisateur' ${user.username} à bien été supprimé!`
          });
        })
        .catch((error) => {
          res.status(500).json({
            message:
              "L'utilisateur n'a pas pu etre supprimé, Réessayez dans quelques instants!",
            erreur: error
          });
        });
    });
  });
}

module.exports = {
  Signup,
  Login,
  getAllUsers,
  getOneUser,
  modifyUser,
  deleteUser,
  getPostUserId,
  modifyImageUser
};
