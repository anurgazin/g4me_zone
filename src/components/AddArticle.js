import React, { useState } from "react";
import apis from "../api";
import "./AddArticle.css";

export default function AddArticle() {
  const [photo, setPhoto] = useState(0);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");

  function handleChange(event) {
    setPhoto(URL.createObjectURL(event.target.files[0]));
  }
  const handleChangeInputName = async (event) => {
    setTitle(event.target.value);
  };
  const handleChangeInputRating = async (event) => {
    setRating(event.target.value);
  };
  const handleChangeInputText = async (event) => {
    setText(event.target.value);
  };
  const handleIncludeArticle = async () => {
    const payload = { title, text, rating };
    await apis.createArticle(payload).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="div_add_article">
      <form onSubmit={handleIncludeArticle}>
        <div className="div_add_article_inner">
          <h2>Write New Article</h2>
          <div className="div_add_article_title">
            <label htmlFor="title">Enter Title</label>
            <br />
            <input
              type="text"
              onChange={handleChangeInputName}
              id="title"
              name="title"
            ></input>
          </div>
          <div className="div_add_article_rating">
            <label htmlFor="rating">Enter Rating</label>
            <br />
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              onChange={handleChangeInputRating}
              id="rating"
              name="rating"
            ></input>
          </div>
          <div className="div_add_article_img_upload">
            <input type="file" onChange={handleChange} />
            <img
              width="480px"
              height="auto"
              src={photo}
              alt="uploaded_photo"
            ></img>
          </div>
          <div className="div_add_article_review_text">
            <label htmlFor="text_review">Enter your review</label> <br />
            <textarea
              style={{ width: "750px", height: "250px" }}
              id="text_review"
              name="text_review"
              onChange={handleChangeInputText}
            ></textarea>
          </div>
        </div>
        <div className="div_add_article_buttons">
          <input type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
}
