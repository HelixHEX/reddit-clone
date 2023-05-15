const express = require("express");
const Post = require ("../models/post.js");

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

module.exports = router;
