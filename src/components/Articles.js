import React, { useEffect, useMemo, useState } from "react";
import apis from "../api/index";
import { ReactSession } from "react-client-session";
import { Link } from "react-router-dom";
import "./Articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [currentArticles, setCurrentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [is_approved, setIsApproved] = useState("true");
  const [sortState, setSortState] = useState("newest");
  const [selectedGenre, setSelectedGenre] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const scrollToTop = () => {
    const element = document.getElementById("div_articles");
    element.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
    scrollToTop();
  };

  const handleApprovedChange = (event) => {
    setIsApproved(event.target.value);
    setCurrentPage(1);
    scrollToTop();
  };

  const handlePerPage = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
    scrollToTop();
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredArticles = useMemo(() => {
    if (is_approved === "false") {
      return articles.filter((article) => article.approved === false);
    }
    if (selectedGenre === "default") {
      return articles.filter((article) => article.approved === true);
    } else {
      return articles.filter(
        (article) =>
          article.genre === selectedGenre && article.approved === true
      );
    }
  }, [is_approved, selectedGenre, articles]);

  const sortMethods = useMemo(
    () => ({
      none: { method: () => null },
      newest: {
        method: (a, b) => b.release_date.localeCompare(a.release_date),
      },
      oldest: {
        method: (a, b) => a.release_date.localeCompare(b.release_date),
      },
      descending: { method: (a, b) => b.rating - a.rating },
      ascending: { method: (a, b) => a.rating - b.rating },
    }),
    []
  );

  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort(sortMethods[sortState].method);
  }, [filteredArticles, sortMethods, sortState]);

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  useEffect(() => {
    const gettingArticles = async () => {
      try {
        const response = await apis.getAllArticles();
        setArticles(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    gettingArticles();
  }, []);

  useEffect(() => {
    setCurrentArticles(sortedArticles.slice(indexOfFirstItem, indexOfLastItem));
  }, [sortedArticles, indexOfFirstItem, indexOfLastItem]);

  if (!loading) {
    return (
      <div className="div_articles" id="div_articles">
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
          <div className="div_articles_per_page">
            <select defaultValue={"3"} onChange={handlePerPage}>
              <option value="none" disabled>
                Per Page
              </option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
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
              <option value="Immersive Sim">Immersive Sim</option>
              <option value="Metroidvania">Metroidvania</option>
              <option value="Role-playing game">Role-playing</option>
              <option value="Shooter">Shooter</option>
              <option value="Survival horror">Survival Horror</option>
            </select>
          </div>
        </div>
        {currentArticles.map((article) => (
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
        <div className="div_articles_pagination">
          <button
            onClick={handlePrev}
            className={`prev-pagination-button`}
            disabled={currentPage === 1}
          >
            &#171;
          </button>
          <div className="div_articles_pagination_pages">
            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`pagination-button ${
                  index + 1 === currentPage ? "active" : "non-active"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className={`next-pagination-button`}
            disabled={currentPage === totalPages}
          >
            &#187;
          </button>
        </div>
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
