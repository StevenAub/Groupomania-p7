require("dotenv");
const sequelize = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = sequelize.models.User;
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
            password: hash
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

      return bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrect.`;
            return res.status(401).json({ message });
          }

          const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: "24h"
          });

          const message = `L'utilisateur a été connecté avec succès`;

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

/*
function Login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  sequelize.models.User.findOne({
    where: { email: email }
  }).then(async (user) => {
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé!" });
    } else {
      bcrypt
        .compare(password, user.password)
        .then((controlPassword) => {
          if (controlPassword === false) {
            return res.status(403).json({ message: "Mot de passe incorrect!" });
          } else {
            const token = jwt.sign({ userId: user.id }, "RANDOM TOKEN SECRET", {
              expiresIn: "12h"
            });
            console.log(user);
            res.status(200).json({
              message: "utilisateur connécté!",
              userId: user.id,
              token
            });
          }
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    }
  });
}*/

module.exports = { Signup, Login };
