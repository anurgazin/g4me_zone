import React, { useState } from "react";
import apis from "../api";
import { ReactSession } from "react-client-session";
import { useParams } from "react-router-dom";
import "./AddComment.css";

export default function AddComment(props) {
  //const [article, setArticle] = useState(0);
  const { id } = useParams();
  const [text, setText] = useState("");

  const handleChangeInputText = async (event) => {
    setText(event.target.value);
  };
  const handleAddComment = async () => {
    await apis
      .createComment({
        article: id,
        text: text,
      })
      .then((res) => {
        console.log(res)
        window.alert(`Comment is added successfully`);
        setText("");
        props.handler()
      });
  };
  if (ReactSession.get("nickname")) {
    // console.log(ReactSession.get("email"));
    return (
      <div className="div_add_comment">
        <div className="div_add_comment_inner">
          <textarea
            value={text}
            onChange={handleChangeInputText}
            placeholder="Add Comment"
          ></textarea>
          <div className="div_add_comment_btn">
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="div_add_comment">
        <p>Please, log in before leaving a comment</p>
      </div>
    );
  }
}
