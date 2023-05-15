const express = require("express");
const Post = require("../models/post.js");

const router = express.Router();

router.get("/:subreddit", async (req, res) => {
  try {
    await Post.find({ subreddit: req.params.subreddit })
      .lean()
      .then((posts) => {
        res.render("posts-index", { posts });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
