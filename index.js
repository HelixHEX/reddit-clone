import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import db from "./db/index.js";

// Models
import Post from "./models/post.js";

// Controllers
import postsController from "./controllers/posts.js";

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
      .then((posts) => res.render("posts-index", { posts }));
  } catch (e) {
    console.log(e.message);
  }
});

app.use("/posts", postsController);

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
