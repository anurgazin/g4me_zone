import React, { useEffect, useMemo, useState } from "react";
import apis from "../api/index";
import { ReactSession } from "react-client-session";
import { Link } from "react-router-dom";
import "./Articles.css";

export default function Articles() {
  const [test_articles, setTestArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [is_approved, setIsApproved] = useState("true");
  const [sortState, setSortState] = useState("newest");
  const [selectedGenre, setSelectedGenre] = useState("default");

  const gettingArticles = () => {
    apis.getAllArticles().then((response) => {
      setTestArticles(response.data.data);
      setLoading(false);
    });
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  const handleApprovedChange = (event) => {
    setIsApproved(event.target.value);
  };

  const sortMethods = {
    none: { method: () => null },
    newest: {
      method: (a, b) => b.release_date.localeCompare(a.release_date),
    },
    oldest: {
      method: (a, b) => a.release_date.localeCompare(b.release_date),
    },
    descending: { method: (a, b) => b.rating - a.rating },
    ascending: { method: (a, b) => a.rating - b.rating },
  };

  const articles = useMemo(() => {
    if (is_approved === "false") {
      return test_articles.filter((article) => article.approved === false);
    }
    if (selectedGenre === "default") {
      return test_articles.filter((article) => article.approved === true);
    } else {
      return test_articles.filter((article) => article.genre === selectedGenre && article.approved === true);
    }
  }, [selectedGenre, test_articles, is_approved]);

  useEffect(() => {
    gettingArticles();
  }, []);
  if (!loading) {
    return (
      <div className="div_articles">
        <div className="div_articles_view">
          {ReactSession.get("isAdmin") === true ? (
            <div className="div_articles_approved">
              <select defaultValue={"true"} onChange={handleApprovedChange}>
                <option value="true">Approved</option>
                <option value="false">Waiting for Approvement</option>
              </select>
            </div>
          ) : null}
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
              <option value="Action">Action</option>
              <option value="Action-RPG">Action-RPG</option>
              <option value="Action-adventure">Action-adventure</option>
              <option value="Fighting">Fighting</option>
              <option value="Horror">Horror</option>
              <option value="Metroidvania">Metroidvania</option>
              <option value="Role-playing game">Role-playing</option>
              <option value="Shooter">Shooter</option>
              <option value="Survival horror">Survival Horror</option>
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
