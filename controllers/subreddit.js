const express = require("express");
const Post = require("../models/post.js");

const router = express.Router();


router.get("/:subreddit", async (req, res) => {
  try {
    const currentUser = req.user;
    await Post.find({ subreddit: req.params.subreddit })
      .lean()
      .populate("author")
      .then((posts) => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
