const bcrypt = require("bcrypt");

module.exports = [
  {
    model: "User",
    data: {
      email: "admin@groupomania.fr",
      username: "Administrateur",
      password: "$2b$10$7CgzdDqKwbS.cvIMal2BceDnzUtoHtak1SqMiO6gepZT5fupc7.M2",
      isAdmin: true
    }
  }
];
