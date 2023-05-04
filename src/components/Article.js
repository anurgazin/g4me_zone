import React, { useEffect, useState } from "react";
import apis from "../api/index";
import { useParams, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Comments from "./Comments";
import "./Article.css";

export default function Article() {
  let { id } = useParams();
  const navigate = useNavigate()
  const [article, setArticle] = useState("");
  useEffect(() => {
    if (!article) {
      getArticle();
    }
  });
  const getArticle = async () => {
    await apis.getArticleById(id).then((item) => {
      setArticle(item.data.data);
    });
  };
  const handleApprove = async () => {
    await apis.approveArticle(id).then(()=>{
      window.alert("Article was approved")
      navigate('/')
    })
  };
  const handleDelete = async () => {
    await apis.deleteArticle(id).then(()=>{
      window.alert("Article was deleted")
      navigate('/')
    })
  };
  return (
    <>
      <div className="div_card">
        <div className="div_article_card">
          <div className="div_article_card_header">
            <div className="div_article_card_title">
              <p>{article.title}</p>
            </div>
            <div className="div_article_card_genre">
              <p>Genre: {article.genre}</p>
            </div>
            <div className="div_article_card_rating">
              <p>&#11088;Rating: {article.rating}/5</p>
            </div>
          </div>
          <div className="div_article_card_img">
            <img
              width="775px"
              height="auto"
              src={article.image}
              alt={article.title}
            ></img>
          </div>
          <div className="div_article_card_text">
            <p>{article.text}</p>
          </div>
          <div className="div_article_approvement_button">
            {ReactSession.get("isAdmin") === true &&
            article.approved === false ? (
              <div>
                <p>Approve?</p>
                <button onClick={handleApprove}>Yes</button>
                <button onClick={handleDelete}>No</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Comments />
    </>
  );
}
