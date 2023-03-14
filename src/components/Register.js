import React, { useState } from "react";
import apis from "../api";
import jwt_decode from "jwt-decode";
import { ReactSession } from "react-client-session";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleSignUp = async () => {
    await apis
      .createAccount({ email, password })
      .then((account) => {
        window.alert("Created");
        var decoded = jwt_decode(account.data.token);
        console.log(decoded)
        if (decoded.id) {
          ReactSession.set("nickname", decoded.nickname);
          ReactSession.set("isAdmin", decoded.isAdmin);
          ReactSession.set("token", account.data.token)
          setUser(decoded.id);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 409) {
          window.alert("E-mail is occupied");
        }
      });
  };

  const handleChangeInputEmail = async (event) => {
    setEmail(event.target.value);
  };
  const handleChangeInputPassword = async (event) => {
    setPassword(event.target.value);
  };
  if (!user && !ReactSession.get("nickname")) {
    return (
      <div className="div_signup_form">
        <div className="div_signup_form_inner">
          <h2>Create account</h2>
          <div className="div_signup_form_email">
            <label htmlFor="email">Enter Email</label>
            <br />
            <input
              type="text"
              onChange={handleChangeInputEmail}
              id="email"
              value={email}
              name="email"
            ></input>
          </div>
          <div className="div_signup_form_password">
            <label htmlFor="password">Enter Password</label>
            <br />
            <input
              type="password"
              onChange={handleChangeInputPassword}
              id="password"
              value={password}
              name="password"
            ></input>
          </div>
          <div className="div_signup_form_buttons">
            <button onClick={handleSignUp}>Create Account</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="div_signup_form">
        <h2>You are already signed in</h2>
      </div>
    );
  }
}
