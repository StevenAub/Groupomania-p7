const { Sequelize, DataTypes } = require("sequelize");

const adminUser = {
  email: "admin@admin.groupomania",
  username: "Administrateur",
  password: "$2b$10$calx5WKn8de.9AD3X3JoQOC7y/CAeNbihgIEavFJRaNQP.27Bbm0q",
  isAdmin: true
};
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
  //GroupomaniaOCR2022
  //admin@admin.groupomania
  //Administrateur

  return User;
};
