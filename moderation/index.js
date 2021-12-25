const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  console.log("received event", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("fuck") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});
