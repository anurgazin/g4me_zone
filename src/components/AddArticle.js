import React, { useState } from "react";
import apis from "../api";
import { ReactSession } from "react-client-session";
import "./AddArticle.css";

export default function AddArticle() {
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substring(0, 10);
  const [photo, setPhoto] = useState(0);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [release, setDate] = useState(date);
  const [genre, setGenre] = useState("Action");

  async function handleChange(event) {
    handleChangeInputPhoto(event);
    handleChangeInputImg(event);
  }
  const handleChangeInputPhoto = async (event) => {
    setPhoto(URL.createObjectURL(event.target.files[0]));
  };
  const handleChangeInputImg = async (event) => {
    setImage(event.target.files[0]);
  };
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };
  const handleChangeInputDate = async (event) => {
    setDate(event.target.value);
  };
  const handleChangeInputName = async (event) => {
    setTitle(event.target.value);
  };
  const handleChangeInputRating = async (event) => {
    setRating(event.target.value);
  };
  const handleChangeInputText = async (event) => {
    setText(event.target.value);
  };
  const handleInsertArticle = async () => {
    const payload = new FormData();
    payload.append("title", title);
    payload.append("text", text);
    payload.append("rating", rating);
    payload.append("release", release);
    payload.append("genre", genre);
    payload.append("articleImage", image);
    await apis.createArticle(payload).then((res) => {
      window.alert(`Article is added successfully`);
      setText("");
      setImage("");
      setPhoto("");
      setTitle("");
      setRating("");
      setDate(date);
      setGenre("");
    });
  };
  if (ReactSession.get("id")) {
    if (
      ReactSession.get("role") === "Admin" ||
      ReactSession.get("role") === "Author"
    ) {
      return (
        <div className="div_add_article">
          <div className="div_add_article_inner">
            <h2>Write New Article</h2>
            <div className="div_add_article_title">
              <label htmlFor="title">Enter Title</label>
              <br />
              <input
                type="text"
                onChange={handleChangeInputName}
                id="title"
                value={title}
                name="title"
                required
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
                value={rating}
                id="rating"
                name="rating"
                required
              ></input>
            </div>
            <div className="div_add_article_genre">
              <select
                name="genre"
                defaultValue={"Action"}
                onChange={handleGenreChange}
              >
                <option value="Action">Action</option>
                <option value="Action-RPG">Action-RPG</option>
                <option value="Action-adventure">Action-adventure</option>
                <option value="Fighting">Fighting</option>
                <option value="Horror">Horror</option>
                <option value="Immersive Sim">Immersive Sim</option>
                <option value="Metroidvania">Metroidvania</option>
                <option value="Role-playing game">Role-playing</option>
                <option value="Shooter">Shooter</option>
                <option value="Survival horror">Survival Horror</option>
              </select>
            </div>
            <div className="div_add_article_date">
              <label htmlFor="title">Enter Release Date</label>
              <br />
              <input
                type="date"
                onChange={handleChangeInputDate}
                id="date"
                value={release}
                name="date"
                required
              ></input>
            </div>
            <div className="div_add_article_img_upload">
              <input type="file" onChange={handleChange} />
              <img
                width="480px"
                height="auto"
                src={photo}
                alt="uploaded_photo"
                required
              ></img>
            </div>
            <div className="div_add_article_review_text">
              <label htmlFor="text_review">Enter your review</label> <br />
              <textarea
                style={{ width: "750px", height: "250px" }}
                id="text_review"
                name="text_review"
                value={text}
                onChange={handleChangeInputText}
                required
              ></textarea>
            </div>
          </div>
          <div className="div_add_article_buttons">
            <button onClick={handleInsertArticle}>ADD ARTICLE</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="div_add_article">
          <h2>You Have no Permission to Write an Article</h2>
        </div>
      );
    }
  } else {
    return (
      <div className="div_add_article">
        <h2>You are not Authorized</h2>
      </div>
    );
  }
}
