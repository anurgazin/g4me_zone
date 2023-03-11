import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apis from "../api";
import "./Comments.css";

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
  if (comments.length > 0) {
    return (
      <div className="div_comments">
        <h2>Comment Section</h2>
        <div className="div_comments_cards">
          {comments.map((comment) => (
            <div key={comment._id} className="div_comment_card">
              <div className="div_comment_card_text">
                <p>
                  <span className="div_comment_card_author">
                    {comment.author}:
                  </span>{" "}
                  <br /> {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="div_comments">
        <p>NO COMMENTS YET, BE THE FIRST TO WRITE ONE</p>
      </div>
    );
  }
}
