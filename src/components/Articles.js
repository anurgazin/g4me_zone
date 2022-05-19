import React, { useEffect, useState } from "react";
//import { articles } from "../pseudo_data";
import apis from "../api/index";
import { Link } from "react-router-dom";
import "./Articles.css";

export default function Articles() {
  const [test_articles, setTestArticles] = useState("");
  useEffect(() => {
    if (!test_articles) {
      gettingArticles();
    }
  });
  const gettingArticles = async () => {
    await apis.getAllArticles().then((items) => {
      setTestArticles(items.data.data);
    });
  };

  const articles = Array.from(test_articles);
  return (
    <div className="div_articles">
      {articles.map((article) => (
        <Link key={article._id} to={{ pathname: `/article/${article._id}` }}>
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
                src={"https://g4me-zone-api.herokuapp.com/" + article.image}
                alt={article.title}
              ></img>
            </div>
            <div className="div_article_card_text">
              <p>{article.text.slice(0, 600)}...</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
