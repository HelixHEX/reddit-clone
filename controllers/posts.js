import express from "express";
import Post from "../models/post.js";

const router = express.Router();

router.post("/new", (req, res) => {
  const post = new Post(req.body);
  post.save().then(() => {
    res.redirect('/');
  })
});

router.get("/new", (_req, res) => res.render("posts-new"));

export default router;
