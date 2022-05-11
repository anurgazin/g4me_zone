import React from "react";
import { useParams } from "react-router-dom";
import { articles } from "../pseudo_data";
import "./Article.css";

console.log("I AM HERE");
export default function Article() {
  let { id } = useParams();
  console.log(id);
  return (
    <div className="div_card">
      <div className="div_article_card">
        <div className="div_article_card_title">
          <h1>{articles[id].title}</h1>
        </div>
        <div className="div_article_card_rating">
          <p>&#11088;Rating: {articles[id].rating}/5</p>
        </div>
        <div className="div_article_card_img">
          <img
            width="775px"
            height="auto"
            src={articles[id].image}
            alt={articles[id].title}
          ></img>
        </div>
        <div className="div_article_card_text">
          <p>{articles[id].text}</p>
        </div>
      </div>
    </div>
  );
}
