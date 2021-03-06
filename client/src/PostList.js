import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const [posts, setPosts] = useState({});

  const fetchData = async () => {
    const res = await axios.get("http://wannaknow.com/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // object.values returns a list of dictionary values
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row justify-content-between">
      {renderedPosts}
    </div>
  );
};
