import React, { useEffect, useState } from "react";
import apis from "../api/index";
import { Link } from "react-router-dom";
import "./Articles.css";

export default function Articles() {
  const [test_articles, setTestArticles] = useState("");
  const [loading, setLoading] = useState("");
  useEffect(() => {
    gettingLoad();
    if (!test_articles) {
      gettingArticles();
    }
  });
  const gettingLoad = ()=>{
    if(!test_articles){
      setLoading(true);
    }else{
      setLoading(false);
    }
  }
  const gettingArticles = async () => {
    await apis.getAllArticles().then((items) => {
      setTestArticles(items.data.data);
      setLoading(false);
    });
  };

  const articles = Array.from(test_articles);
  if (!loading) {
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
  }else{
    return(
      <div className="div_articles">
        <div className="div_articles_loading">LOADING</div>
      </div>
    );
  }
}
