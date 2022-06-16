const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, Datatypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Datatypes.STRING,
        allowNull: true
      },
      content: {
        type: Datatypes.STRING,
        allowNull: true
      },
      imgUrl: { type: Datatypes.STRING, allowNull: true },
      likes: {
        type: Sequelize.INTEGER
      }
    },
    {
      modelName: "Post",
      timestamp: true,
      createdAt: "created",
      updatedAt: true
    }
  );
  return Post;
};
