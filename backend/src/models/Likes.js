const { Sequelize, DataTypes } = require("sequelize"); // Remove useless import 'Sequelize' & 'DataTypes'

module.exports = (sequelize, Datatypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      like: DataTypes.INTEGER  // 'Datatypes' and not 'DataTypes'
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    }
  );
  return Likes;
};
