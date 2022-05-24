require("dotenv");
const model = require("../models/user");
const sequelize = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function Signup(req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Veuillez renseigner tous les champs!" });
  } else {
    sequelize.models.User.findOne({
      attributes: ["email"],
      where: { email: email },
    }).then(function (userFind) {
      if (!userFind) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          sequelize.models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
          })
            .then(res.status(201).json({ message: "User crée" }))
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
  const email = req.body.email;
  const password = req.body.password;
  sequelize.models.User.findOne({
    where: { email: email },
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
              expiresIn: "12h",
            });
            console.log(user);
            res.status(200).json({
              message: "utilisateur connécté!",
              userId: user.id,
              token,
            });
          }
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    }
  });
}

module.exports = { Signup, Login };
