import React, { useState } from "react";
import apis from "../api";
import jwt_decode from "jwt-decode";
import "./Login.css";
import { ReactSession } from "react-client-session";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLoginInto = async () => {
    await apis
      .loginAccount({ email, password })
      .then((account) => {
        if (account.data.token) {
          var decoded = jwt_decode(account.data.token);
          if (decoded.user) {
            ReactSession.set("email", decoded.user.email);
            ReactSession.set("isAdmin", decoded.user.isAdmin);
            setUser(decoded.user);
          }
          window.alert("Successfully Signed In");
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("Wrong Input");
      });
  };

  const signOut = () => {
    ReactSession.set("email", "");
    ReactSession.set("isAdmin", "");
    setUser();
  };
  const handleChangeInputEmail = async (event) => {
    setEmail(event.target.value);
  };
  const handleChangeInputPassword = async (event) => {
    setPassword(event.target.value);
  };
  if (!user && !ReactSession.get("email")) {
    return (
      <div className="div_login_form">
        <div className="div_login_form_inner">
          <h2>Login Form</h2>
          <div className="div_login_form_email">
            <label htmlFor="email">Enter Email</label>
            <br />
            <br />
            <input
              type="text"
              onChange={handleChangeInputEmail}
              id="email"
              value={email}
              name="email"
            ></input>
          </div>
          <div className="div_login_form_password">
            <label htmlFor="password">Enter Password</label>
            <br />
            <br />
            <input
              type="password"
              onChange={handleChangeInputPassword}
              id="password"
              value={password}
              name="password"
            ></input>
          </div>
          <div className="div_login_form_buttons">
            <div className="div_login_form_buttons_sign_in">
              <button onClick={handleLoginInto}>Sign In</button>
            </div>
            <div className="div_login_form_buttons_sign_up">
              <Link to="/registration">
                <p>
                  Don't have an account?
                  <br /> Register today
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="div_login_form">
        <div className="div_login_form_buttons_sign_out">
          <h2>You are already signed in</h2>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    );
  }
}
