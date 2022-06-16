require("dotenv");
const sequelize = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = sequelize.models.User;
const Post = sequelize.models.Post;
const privateKey = "jdjdjddj";

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
          console.log("req.auth" + req.username);
          //--------------------------------

          //--------------------------------
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
async function modifyUser(req, res) {}
async function deleteUser(req, res) {}

module.exports = {
  Signup,
  Login,
  getAllUsers,
  getOneUser,
  modifyUser,
  deleteUser,
  getPostUserId
};
