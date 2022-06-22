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
        allowNull: true
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
