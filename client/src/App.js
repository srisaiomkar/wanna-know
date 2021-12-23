import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {
  return (
    <div className="container">
      <h1>Ask a question</h1>
      <PostCreate />
      <hr />
      <h1>Questions</h1>
      <PostList />
    </div>
  );
}

export default App;
