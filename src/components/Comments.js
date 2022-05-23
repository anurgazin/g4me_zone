import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apis from "../api";
//import { ReactSession } from "react-client-session";

export default function Comments() {
  let { id } = useParams();
  const [pre_comments, setComments] = useState("");
  useEffect(() => {
    const gettingComments = async (id) => {
      await apis.getComments(id).then((items) => {
        setComments(items.data.data);
      });
    };
    gettingComments(id);
  }, [pre_comments, id]);

  const comments = Array.from(pre_comments);
  console.log(comments);
  if (comments.length >= 1) {
    return (
      <div className="div_comments">
        {comments.map((comment) => (
          <div key={comment._id} className="div_comment_card">
            <div className="div_comment_card_author">
              <p>{comment.author}</p>
            </div>
            <div className="div_comment_card_text">
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="div_comments">
        <p>No Comments</p>
      </div>
    );
  }
}
