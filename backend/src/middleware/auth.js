const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message:
        "Vous n'avez pas fournis de jeton d'authentification. Ajoutez en un dans la requete!"
    });
  }
  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, "random", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        message: "L'utilisateur n'est pas autorisé a acceder a cette ressource!"
      });
    }
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res
        .status(401)
        .json({ message: "L'identifiant de l'utilisateur est invalide!" });
    } else {
      req.auth = { userId: userId, isAdmin: decodedToken.admin };
      next();
    }
  });
};
