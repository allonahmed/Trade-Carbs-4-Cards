import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "../Login/Login.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const [user, setUser] = useState();
  // set state of all the values to be inputted so we can retreive it and send it to the backend

  const SubmitForm = (e) => {
    e.preventDefault();
    if (
      email.length === 0 ||
      password.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0
    ) {
      setError("You must complete all fields to sign up!");
    } else if (password.length < 6) {
      setError("Your password must be at least 7 characters long!");
    } else {
      setError("good");
      const user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      axios.post("http://localhost:3002/signup", user).then((resp) => {
        console.log(resp.data);
      });
    }
  };
  const handleLogout = () => {
    setUser({});
    setFirst("");
    setLast("");
    setEmail("");
    setPassword("");
    localStorage.clear();
  };
  if (user) {
    return (
      <div>
        {user.name} is loggged in
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
  return (
    <div className="form-homepage">
      <div className="form-container">
        <h1 className="form-header">Sign Up For Carbs4Cards</h1>

        <form id="signup-form">
          <p className="signup-p">
            Sign up for Carbs4Cards and start working out today!
          </p>
          <h4
            style={{ textAlign: "center", color: "red", marginBottom: "10px" }}
          >
            {errorMessage.length != 0 ? errorMessage : null}
          </h4>

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
            <label for="fnamefield">First Name</label>
            <input
              id="fnamefield"
              type="text"
              name="fname"
              placeholder="John"
              required
              onChange={(e) => {
                setFirst(e.target.value);
              }}
            />
          </div>

          <div className="form-field">
            <label for="lnamefield">Last Name</label>
            <input
              id="lnamefield"
              type="text"
              name="lname"
              placeholder="Doe"
              required
              onChange={(e) => {
                setLast(e.target.value);
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
            <button onClick={SubmitForm}>Sign Up</button>
            {errorMessage === "good" ? <Redirect to="/login" /> : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
