const express = require("express");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.post('/signup', async (req, res) => {
  const user = new User(req.body);

  user.save().then(() => {
    const token = jwt.sign({_id: user._id}, process.env.SECRET || 'secret', {expiresIn: '60 days'})
    res.cookie('nToken', token, {maxAge: 900000, httpOnly: true})
    return res.redirect('/')
  })
  .catch((err) => {
    console.log(err.message)
    return res.status(400).send({ err });
  })
})

module.exports = router