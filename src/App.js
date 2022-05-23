import React from "react";
import Navbar from "./components/Navbar";
import Article from "./components/Article";
import Articles from "./components/Articles";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddArticle from "./components/AddArticle";
import Login from "./components/Login";
import Register from "./components/Register";
import AddComment from "./components/AddComment";
import Comments from "./components/Comments";

function App() {
  return (
    <main>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Articles />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/registration" element={<Register />}></Route>
          <Route
            exact
            path="/article/:id"
            element={[<Article />, <AddComment />, <Comments />]}
          ></Route>
          <Route exact path="/add_article" element={<AddArticle />}></Route>
        </Routes>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
