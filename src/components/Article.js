import React, { useEffect, useState } from "react";
import apis from "../api/index";
import { useParams } from "react-router-dom";
//import { articles } from "../pseudo_data";
import "./Article.css";

console.log("I AM HERE");
export default function Article() {
  let { id } = useParams();
  //let fid = 1;
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
  console.log(article);
  return (
    <div className="div_card">
      <div className="div_article_card">
        <div className="div_article_card_title">
          <h1>{article.title}</h1>
        </div>
        <div className="div_article_card_rating">
          <p>&#11088;Rating: {article.rating}/5</p>
        </div>
        <div className="div_article_card_img">
          <img
            width="775px"
            height="auto"
            src={"http://localhost:8080/"+article.image}
            alt={article.title}
          ></img>
        </div>
        <div className="div_article_card_text">
          <p>{article.text}</p>
        </div>
      </div>
    </div>
  );
}
