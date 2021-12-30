const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};
const handleEvent = (type, data) => {
  console.log("event received: ", type);
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[data.id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const post = posts[data.postId];
    post.comments.push({
      id: data.id,
      content: data.content,
      status: data.status,
    });
  } else if (type == "CommentUpdated") {
    const post = posts[data.postId];
    const comment = post.comments.find((comment) => comment.id === data.id);
    comment.status = data.status;
    comment.content = data.content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on port 4002");
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");
    for (let event of res.data) {
      console.log("Processing event", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.log(err.message);
  }
});
