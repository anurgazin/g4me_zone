import React, { useEffect, useState } from "react";
import apis from "../api/index";
import { Link } from "react-router-dom";
import "./Articles.css";

export default function Articles() {
  const [test_articles, setTestArticles] = useState("");
  const [loading, setLoading] = useState("");
  const [sortState, setSortState] = useState("newest");
  useEffect(() => {
    gettingLoad();
    if (!test_articles) {
      gettingArticles();
    }
  });
  const gettingLoad = () => {
    if (!test_articles) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };
  const gettingArticles = async () => {
    await apis.getAllArticles().then((items) => {
      console.log(items.data.data)
      setTestArticles(items.data.data);
      setLoading(false);
    });
  };
  const sortMethods = {
    none: { method: (a, b) => null },
    newest: { method: (a, b) => a.date > b.date ? -1 : 1 },
    oldest: { method: (a, b) => a.date < b.date ? -1 : 1 },
    descending: { method: (a, b) => (a.rating > b.rating ? -1 : 1) },
    ascending: { method: (a, b) => (a.rating < b.rating ? -1 : 1) },
  };

  const articles = Array.from(test_articles);
  if (!loading) {
    return (
      <div className="div_articles">
        <div className="div_articles_sort">
          <select
            defaultValue={"newest"}
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value="none" disabled>Sort By</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="descending">Highest</option>
            <option value="ascending">Lowest</option>
          </select>
        </div>
        {articles.sort(sortMethods[sortState].method).map((article) => (
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
  } else {
    return (
      <div className="div_articles">
        <div className="div_articles_loading">LOADING</div>
      </div>
    );
  }
}
