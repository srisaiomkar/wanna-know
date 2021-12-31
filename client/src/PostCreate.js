import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    /* 
      The preventDefault() method cancels the event if it is cancelable, 
      meaning that the default action that belongs to the event will not occur. 
      For example, this can be useful when: 
      Clicking on a "Submit" button, prevent it from submitting a form. 
      Clicking on a link, prevent the link from following the URL.
    */
    event.preventDefault();

    await axios.post("http://wannaknow.com/posts/create", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
