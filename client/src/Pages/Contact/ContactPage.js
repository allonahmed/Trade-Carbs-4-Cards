import React from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import './Contact.css';
init("user_Q9BNYVVEKmF3inZZZBYp5");



export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_2tr114i', 'template_fj72lyo', e.target, 'user_Q9BNYVVEKmF3inZZZBYp5')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}