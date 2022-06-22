const jwt = require("jsonwebtoken");
const sequelize = require("../../sequelize");
const privateKey = "jdjdjddj";

require("dotenv").config();

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message:
        "Vous n'avez pas fournis de jeton d'authentification. Ajoutez en un dans la requete!"
    });
  }
  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, privateKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        message: "L'utilisateur n'est pas autorisé a acceder a cette ressource!"
      });
    }
    const userId = decodedToken.userId;
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      res
        .status(401)
        .json({ message: "L'identifiant de l'utilisateur est invalide!" });
    } else {
      req.auth = userId;
      next();
    }
  });
};
