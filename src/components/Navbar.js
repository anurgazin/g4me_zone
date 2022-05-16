import React from "react";
import "./Navbar.css";
import ReactTypingEffect from 'react-typing-effect';
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="div_header">
      <div className="div_header_logo">
        <Link to="/">
          <ReactTypingEffect className="div_header_logo" text={"G4ME_Z0NE"}></ReactTypingEffect>
        </Link>
      </div>
      <div className="div_header_nav">
        <p>Profile</p>
        <Link to="/add_article">
          <p>Write New Article</p>
        </Link>
        <p>About Project</p>
      </div>
    </div>
  );
}
