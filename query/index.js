const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[data.id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const post = posts[data.postId];
    post.comments.push({
      id: data.id,
      content: data.content,
    });
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
