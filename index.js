require("reflect-metadata");
require("dotenv-safe/config");
const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
require('./db/index')
const cookieParser = require("cookie-parser");
const checkAuth = require('./middleware/checkAuth');

// Models
const Post = require("./models/post.js");

// Controllers
const postsController = require("./controllers/posts.js");
const subredditController = require("./controllers/subreddit.js");
const commentsController = require("./controllers/comments.js");
const authController = require("./controllers/auth.js");


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser())

app.use(
  morgan(
    ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
  )
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.engine("handlebars", engine({ defaultLayout: "main", layoutsDir: `` }));
app.set("view engine", "handlebars");

app.use(checkAuth);

app.get("/", async (req, res) => {
  try {
    const currentUser = req.user;

    await Post.find({})
      .lean()
      .populate("author")
      .then((posts) => {
        return res.render("posts-index", { posts, currentUser });
      });
  } catch (e) {
    console.log(e.message);
  }
});

app.use("/posts", postsController);
app.use("/n", subredditController);
app.use("/posts", commentsController);
app.use("/", authController);

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

module.exports = app;
