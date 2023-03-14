//updated
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apis from "../api";
import AddComment from "./AddComment";
import "./Comments.css";

export default function Comments() {
  const { id } = useParams();
  let [commentState, setCommentState] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const gettingComments = async (id) => {
      if (commentState) {
        const response = await apis.getComments(id);
        setComments(Array.from(response.data.data));
        setCommentState(false);
      }
    };
    gettingComments(id);
  }, [comments, id, commentState]);

  const handleCount = () => {
    setCommentState(true);
  };
  if (comments.length > 0) {
    return (
      <>
        <AddComment commentState={commentState} handler = {handleCount}/>
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
      </>
    );
  } else {
    return (
      <>
        <AddComment commentState={commentState} handler = {handleCount}/>
        <div className="div_comments">
          <p>NO COMMENTS YET, BE THE FIRST TO WRITE ONE</p>
        </div>
      </>
    );
  }
}
