const { Sequelize, DataTypes } = require("sequelize");
const PostModel = require("./src/models/post");
const mysql = require("mysql");
const UserModel = require("./src/models/user");
const CommentModel = require("./src/models/comment");
const LikesModel = require("./src/models/Likes");

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
const Comment = CommentModel(sequelize, DataTypes);
const Likes = LikesModel(sequelize, DataTypes);

Post.hasMany(Comment);
Post.belongsTo(User);
Comment.belongsTo(Post);
Comment.belongsTo(User);
User.hasMany(Post);
User.hasMany(Comment);

//Post.hasMany(Likes);
Likes.belongsTo(Post);
//User.hasMany(Likes);
Likes.belongsTo(User);

sequelize
  .sync()
  .then(() =>
    console.log("Les tables User, Post, Comment, Likes ont été ajouté a la BDD")
  );

module.exports = sequelize;
