const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: {
          msg: "L'adresse email est deja utilisée!"
        }
      },
      username: {
        type: Datatypes.STRING,
        allowNull: false
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false
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
