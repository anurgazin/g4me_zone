import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <>
      <hr className="footer-hr" />
      <div className="div_footer">
        <div className="div_footer_author">
          <span className="copyleft">&copy;</span> 2023 Copyleft: G4ME_Z0NE
        </div>
        <div className="div_footer_links">
          <div className="div_footer_git">
            <a href="https://github.com/anurgazin">
              <img src="/assets/images/github.png" alt="github"></img>
            </a>
          </div>
          <div className="div_footer_instagram">
            <a href="https://instagram.com/anurgaz1n?igshid=MzNlNGNkZWQ4Mg==">
              <img src="/assets/images/insta.png" alt="instagram"></img>
            </a>
          </div>
          <div className="div_footer_linkedin">
            <a href="https://www.linkedin.com/in/anurgazin/">
              <img src="/assets/images/linkedin.png" alt="linkedin"></img>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
