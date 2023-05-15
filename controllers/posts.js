import express from "express";
import Post from "../models/post.js";

const router = express.Router();

router.post("/new", async (req, res) => {
  const post = await new Post(req.body);
  
  await post.save().then(() => {
    res.redirect('/');
  })
});

router.get("/new", (_req, res) => res.render("posts-new"));

router.get('/id/:id', (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.render('posts-show', {post})
  }).catch((err) => {
    console.log(err.message)
  })
})

export default router;
