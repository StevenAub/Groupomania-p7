const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, Datatypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: {
        type: Datatypes.INTEGER,
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
