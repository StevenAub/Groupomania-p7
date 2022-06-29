const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
          msg: "L'adresse email est deja utilisée!"
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      imgProfil: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      modelName: "User",
      timestamp: true,
      createdAt: "created",
      updatedAt: true
    }
  );
  return User;
};
