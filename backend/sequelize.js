const { Sequelize, DataTypes } = require("sequelize");
const PostModel = require("./src/models/post");
const mysql = require("mysql");
const UserModel = require("./src/models/user");

const sequelize = new Sequelize("groupomania", "root", "", {
  host: "localhost",
  dialect: "mysql"
});
sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion a la base de donnée a bien été établie")
  )
  .catch((err) => console.error(`Impossible de se connecter a la BDD ${err}`));

const Post = PostModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
sequelize
  .sync()
  .then(() => console.log("Les tables User et Post ont été ajouté a la BDD"));

module.exports = sequelize;
