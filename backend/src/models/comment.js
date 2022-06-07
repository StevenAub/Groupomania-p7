const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, Datatypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Datatypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: "Post",
      timestamp: true,
      createdAt: "created",
      updatedAt: true
    }
  );
  return Comment;
};
