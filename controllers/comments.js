const express = require("express");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");

const router = express.Router();

router.post("/:postId/comments", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    await comment
      .save()
      .then(() => Post.findById(req.params.postId))
      .then((post) => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err.message));
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
