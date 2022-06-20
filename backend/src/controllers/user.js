require("dotenv");
const sequelize = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = sequelize.models.User;
const Post = sequelize.models.Post;
const privateKey = "jdjdjddj";
const multer = require("multer");
const fs = require("fs");

function Signup(req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

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
            imgProfil:
              "https://thierrydambermont.wordpress.com/2016/05/11/marine-beltus-marine_be_-twitter/"
          })
            .then(res.status(201).json({ message: "Utilisateur enregistré" }))
            .catch((err) => res.status(400).json({ error: err }));
        });
      } else {
        return res
          .status(400)
          .json({ message: "Addresse email deja utilisée!" });
      }
    });
  }
}

function Login(req, res) {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        const message = `L'utilisateur demandé n'existe pas.`;
        return res.status(404).json({ message });
      }
      console.log("user" + user.id);
      return bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrect.`;
            return res.status(401).json({ message });
          }

          const token = jwt.sign(
            { userId: user.id, username: user.username },
            privateKey,
            {
              expiresIn: "24h"
            }
          );
          console.log("token" + token);
          req.auth = user.id;
          req.username = user.username;
          const message = `L'utilisateur a été connecté avec succès`;
          res.status(200).json({ message, data: user, token });
        });
    })
    .catch((error) => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
}

async function getAllUsers(req, res) {
  const users = await User.findAll({ order: [["id", "DESC"]] })
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
  console.log(id);
  const GetUser = await User.findOne({ where: { id: id } });

  if (GetUser === null) {
    res.status(404).json({ message: "User introuvable!" });
  } else {
    res.status(200).json({ GetUser });
  }
}
async function getPostUserId(req, res) {
  const id = req.params.id;
  const GetPost = await Post.findAll({ where: { UserId: id } });
  if (GetPost === null) {
    res.status(404).json({ message: "User introuvable!" });
  } else {
    res.status(200).json({ GetPost });
  }
}

async function modifyUser(req, res) {
  const id = req.params.id;

  const user = await User.findOne({ where: { id: id } });
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const imgProfil = req.body.imgProfil;

  const userTest = { ...req.body };
  console.log({ ...req.body });
  console.log(username);
  if (password) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      user.update({ password: hash });
    });
  }
  user
    .update({
      username: userTest.username || undefined,
      email: userTest.email || undefined
    })
    .then(() => res.status(200).json({ message: "User modifié", user }))
    .catch((error) => res.status(404).json({ error }));
}

async function modifyImageUser(req, res) {
  const id = req.params.id;
  const user = await User.findOne({ where: { id: id } });
  const filename = user.imgProfil.split("/images/")[1];

  fs.unlink(`images/${filename}`, () => {
    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      console.log(img);

      user
        .update({
          imgProfil: img
        })
        .then(() => res.status(200).json({ message: "User modifié", user }))
        .catch((error) => res.status(404).json({ error }));
    }
  });
}
async function deleteUser(req, res) {
  const post = await Post.findOne({ where: { id: req.params.id } });
  const user = await User.findOne({ where: { UserId: req.auth } });
  if (user.id === req.auth)
    User.findByPk(req.params.id).then((user) => {
      console.log(user);
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
              message: `Le post ${user.username} à bien été supprimé!`
            });
          })
          .catch((error) => {
            res.status(500).json({
              message:
                "L'utilisateur n'a pas pu etre supprimé, Réessayez dans quelques instants!",
              erreur: err
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
