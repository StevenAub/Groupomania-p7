const jwt = require("jsonwebtoken");
// You declare your private key at two places.
// You should declare it once in app.js or server.js and export it :
// In 'app.js' or 'server.js' :
// export const privateKey = "jdjdjddj"
// And then in 'auth.js' :
// import { privateKey } = "../app.js" or const privateKey = require("../app.js");
const privateKey = "jdjdjddj";

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
