const { Sequelize, DataTypes } = require("sequelize");

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
        allowNull: true,
        unique: {
          msg: "L'adresse email est deja utilisée!"
        }
      },
      username: {
        type: Datatypes.STRING,
        allowNull: true
      },
      password: {
        type: Datatypes.STRING,
        allowNull: true
      },
      imgProfil: {
        type: Datatypes.STRING,
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
