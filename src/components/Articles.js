import React from "react";
import { articles } from "../pseudo_data";
import { Link } from "react-router-dom";
import "./Articles.css";

export default function Articles() {
  return (
    <div className="div_articles">
      {articles.map((article) => (
        <Link key={article.id} to={{ pathname: `/article/${article.id}`}}>
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
                src={article.image}
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
