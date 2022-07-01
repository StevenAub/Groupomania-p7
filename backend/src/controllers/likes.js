const sequelize = require("../../sequelize");
const Post = sequelize.models.Post;
const Like = sequelize.models.Likes;

async function findAllLikes(req, res) {
  const post = await Post.findOne({ where: { id: req.params.id } });
  await Like.findAll({
    where: {
      PostId: post.id
    }
  })
    .then((likes) => {
      res.status(200).json(likes.length);
    })
    .catch((error) => res.status(400).json({ error }));
}

async function likePost(req, res) {
  const post = await Post.findOne({
    where: { id: req.params.id }
  });

  const likeObject = req.body;
  Like.findAll({
    where: {
      UserId: req.auth.userId,
      PostId: post.id
    }
  }).then((likes) => {
    if (likes.length === 0) {
      const like = new Like({
        ...likeObject,
        UserId: req.auth.userId,
        PostId: post.id
      });
      like
        .save()
        .then(() => {
          Like.findAll({
            where: { PostId: post.id }
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error }));
    } else {
      Like.destroy({
        where: {
          PostId: post.id,
          UserId: req.auth.userId
        }
      })
        .then(() => {
          Like.findAll({
            where: { PostId: post.id }
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error }));
    }
  });
}

module.exports = { likePost, findAllLikes };
