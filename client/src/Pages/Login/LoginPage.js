import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

axios.defaults.withCredentials = true; //required for some reason lol
const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const Submit = (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setError("You must complete all fields to login!");
    } else {
      axios
        .post("http://localhost:3002/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data.message) {
            setError(res.data.message);
            console.log(errorMessage);
          } else {
            setError("worked!");
            console.log(errorMessage);
            props.login();
            window.location.reload();
          }
        });
    }
  };

  return (
    <div className="form-homepage">
      <div className="form-container">
        <h1 className="form-header">Sign Into Carbs4Cards</h1>
        <h4>{errorMessage.length > 0 ? errorMessage : null}</h4>
        <form id="login-form">
          <div className="form-field">
            <label for="emailfield">Email</label>
            <input
              id="emailfield"
              type="text"
              name="email"
              placeholder="johndoe@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="form-field">
            <label for="passwordfield">Password</label>
            <input
              id="passwordfield"
              type="password"
              name="password"
              placeholder="********"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="form-field">
            <button onClick={Submit}>Log In</button>
            {errorMessage === "worked!" ? <Redirect to="/" /> : null}
            <a href="./signup" target="_self" id="signup-link">
              Sign up here!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
