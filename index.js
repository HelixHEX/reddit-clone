require("reflect-metadata");
require("dotenv-safe/config");
const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
require('./db/index')
// Models
const Post = require("./models/post.js");

// Controllers
const postsController = require("./controllers/posts.js");
const subredditController = require("./controllers/subreddit.js");

const PORT = process.env.PORT || 5000;
const app = express();

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

app.get("/", async (req, res) => {
  try {
    await Post.find({})
      .lean()
      .then((posts) => {
        return res.render("posts-index", { posts });
      });
  } catch (e) {
    console.log(e.message);
  }
});

app.use("/posts", postsController);
app.use("/n", subredditController);

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

module.exports = app;
