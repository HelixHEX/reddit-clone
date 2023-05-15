const express = require("express");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.SECRET || "secret",
        { expiresIn: "60 days" }
      );
      res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(400).send({ err });
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie("nToken");
  return res.redirect("/");
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  // Find this user name
  User.findOne({ username }, "username password")
    .then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: "Wrong Username or Password" });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res
            .status(401)
            .send({ message: "Wrong Username or password" });
        }
        // Create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          process.env.SECRET,
          {
            expiresIn: "60 days",
          }
        );
        // Set a cookie and redirect to root
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        return res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/signin", (req, res) => res.render("signin"));
module.exports = router;
