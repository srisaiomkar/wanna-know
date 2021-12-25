import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content = comment.content;
    if (comment.status === "rejected") {
      content = "The answer has been rejected!";
    } else if (comment.status == "pending") {
      content = "The answer is pending moderation";
    }
    return <li key={comment.id}>{content}</li>;
  });
  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};
