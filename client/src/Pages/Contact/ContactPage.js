import React from "react";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import "./Contact.css";
init("user_Q9BNYVVEKmF3inZZZBYp5");

export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_79uz9bk",
        "template_g81kdtf",
        e.target,
        "user_QkZKcAnxTsJAQSgTidhsx"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div id="contact-homepage">
      <div className="form-container contact-form-container">
        <h1 className="form-header">Contact Us</h1>
        <form id="contact-form" onSubmit={sendEmail}>
          <div className="form-field">
            <input type="hidden" name="contact_number" />
            <label>Name</label>
            <input type="text" name="user_name" required />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" name="user_email" required />
          </div>
          <div className="form-field">
            <label>Message</label>
            <textarea id="message-textarea" name="message" required />
          </div>
          <div className="form-field">
            <input className="form-button" type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
  );
}
