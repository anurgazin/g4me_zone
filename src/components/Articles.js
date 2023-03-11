import React, { useEffect, useMemo, useState } from "react";
import apis from "../api/index";
import { Link } from "react-router-dom";
import "./Articles.css";

export default function Articles() {
  const [test_articles, setTestArticles] = useState("");
  const [loading, setLoading] = useState("");
  const [sortState, setSortState] = useState("newest");
  const [selectedGenre, setSelectedGenre] = useState("default");
  const gettingLoad = async () => {
    if (!test_articles) {
      setLoading(true);
      await gettingArticles();
    } else {
      setLoading(false);
    }
  };
  const gettingArticles = async () => {
    await apis.getAllArticles().then((items) => {
      setTestArticles(items.data.data);
      setLoading(false);
    });
  };
  const handleGenreChange = async (event) => {
    setSelectedGenre(event.target.value);
    getFilteredArticle();
  };
  const sortMethods = {
    none: { method: (a, b) => null },
    newest: { method: (a, b) => (a.release_date > b.release_date ? -1 : 1) },
    oldest: { method: (a, b) => (a.release_date < b.release_date ? -1 : 1) },
    descending: { method: (a, b) => (a.rating > b.rating ? -1 : 1) },
    ascending: { method: (a, b) => (a.rating < b.rating ? -1 : 1) },
  };

  const getFilteredArticle = () => {
    if (selectedGenre === "default") {
      return Array.from(test_articles);
    } else {
      return Array.from(test_articles).filter(
        (article) => article.genre === selectedGenre
      );
    }
  };

  useEffect(() => {
    gettingLoad();
  });
  let articles = useMemo(getFilteredArticle, [selectedGenre, test_articles]);
  if (!loading) {
    return (
      <div className="div_articles">
        <div className="div_articles_view">
          <div className="div_articles_sort">
            <select
              defaultValue={"newest"}
              onChange={(e) => setSortState(e.target.value)}
            >
              <option value="none" disabled>
                Sort By
              </option>
              <option value="newest">Release Date &#9660;</option>
              <option value="descending">Rating &#9660;</option>
              <option value="oldest">Release Date &#9650;</option>
              <option value="ascending">Rating &#9650;</option>
            </select>
          </div>
          <div className="div_articles_filter">
            <select defaultValue={"default"} onChange={handleGenreChange}>
              <option value="default">All Games</option>
              <option value="Role-playing game">Role-playing</option>
              <option value="Action">Action</option>
              <option value="Action-adventure">Action-adventure</option>
              <option value="Survival horror">Survival Horror</option>
              <option value="Metroidvania">Metroidvania</option>
              <option value="Action-RPG">Action-RPG</option>
            </select>
          </div>
        </div>
        {articles.sort(sortMethods[sortState].method).map((article) => (
          <Link key={article._id} to={{ pathname: `/article/${article._id}` }}>
            <div className="div_article_card">
              <div className="div_article_card_header">
                <div className="div_article_card_title">
                  <p>{article.title}</p>
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
                <p>{article.text.slice(0, 1000)}...</p>
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
