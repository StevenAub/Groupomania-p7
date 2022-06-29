const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true
      },
      imgUrl: { type: DataTypes.STRING, allowNull: true },
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
