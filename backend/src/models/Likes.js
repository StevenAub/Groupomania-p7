const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      like: DataTypes.INTEGER
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    }
  );
  return Likes;
};
