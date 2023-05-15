const express = require("express");
const Post = require("../models/post.js");

const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const post = await new Post(req.body);

    await post.save().then(() => {
      res.redirect("/");
    });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/new", (_req, res) => res.render("posts-new"));

router.get("/:id", async (req, res) => {
  try {
    await Post.findById(req.params.id)
      .lean()
      .then((post) => {
        res.render("posts-show", { post });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/n/:subreddit", async (req, res) => {
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
