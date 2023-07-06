import React from "react";
import Navbar from "./components/Navbar";
import Article from "./components/Article";
import Articles from "./components/Articles";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactSession } from "react-client-session";
import "./App.css";
import AddArticle from "./components/AddArticle";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";

function App() {
  ReactSession.setStoreType("sessionStorage");
  return (
    <div className="div_layout">
      <Router>
        <Navbar></Navbar>
        <main>
          <Routes>
            <Route exact path="/" element={<Articles />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/registration" element={<Register />}></Route>
            <Route
              exact
              path="/article/:id"
              element={
                <>
                  <Article />
                </>
              }
            ></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/add_article" element={<AddArticle />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
