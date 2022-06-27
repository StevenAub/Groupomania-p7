const { Sequelize, DataTypes } = require("sequelize"); // Remove useless import

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
        allowNull: false
      },
      content: {
        type: Datatypes.STRING,
        allowNull: true
      },
      imgUrl: { type: Datatypes.STRING, allowNull: true },
      likes: {
        type: Sequelize.INTEGER  // 'Datatypes' and not '"'Sequelize'"'
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
