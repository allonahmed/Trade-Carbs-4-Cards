import React, { useState } from "react";
import axios from "axios"; // handles requests
import "./Merch.css";

const MerchPage = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState([]);

  const HandleClick = () => {
    if (name.length > 0 && comment.length > 0) {
      axios
        .post("http://localhost:3002/post-form", {
          name: name,
          comment: comment,
        })
        .then((res) => {
          console.log("worked");
        });
    }
  };

  return (
    <div className="merch-text">
      <div>
        enter name:{" "}
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        enter comments:
        <input
          type="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
      <button onClick={HandleClick}>submit</button>
    </div>
  );
};

export default MerchPage;
