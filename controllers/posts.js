const express = require("express");
const Post = require("../models/post.js");
const User = require("../models/user.js");

const router = express.Router();

router.post("/new", async (req, res) => {
  if (req.user) {
    try {
      const post = await new Post(req.body);
      const userId = req.user._id;
      post.author = userId;
      post.upVotes = [];
      post.downVotes = [];
      post.voteScore = 0;
      await post
        .save()
        .then(() => User.findById(userId))
        .then((user) => {
          user.posts.unshift(post);
          user.save();

          return res.redirect(`/posts/${post._id}`);
        });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return res.status(401);
  }
});

router.get("/new", (_req, res) => res.render("posts-new"));

router.get("/:id", async (req, res) => {
  try {    
    const currentUser = req.user;
    await Post.findById(req.params.id)
      .populate(['comments', 'author'])
      .lean()
      .then((post) => {
        res.render("posts-show", { post, currentUser });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.put('/:id/vote-up', (req, res) => {
  Post.findById(req.params.id).then(post => {
    post.upVotes.push(req.user._id);
    post.voteScore += 1;
    post.save();

    return res.status(200);
  }).catch(err => {
    console.log(err);
  })
});

router.put('/:id/vote-down', (req, res) => {
  Post.findById(req.params.id).then(post => {
    post.downVotes.push(req.user._id);
    post.voteScore -= 1;
    post.save();

    return res.status(200);
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
