const express = require("express");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");

const router = express.Router();

router.post("/:postId/comments", async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    comment.author = req.user._id;
    comment
      .save()
      .then(() => Promise.all([Post.findById(req.params.postId)]))
      .then(([post]) => {
        post.comments.unshift(comment);
        return Promise.all([post.save()]);
      })
      .then(() => res.redirect(`/posts/${req.params.postId}`))
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
