import React, { useState, useEffect } from "react";
import axios from "axios"; // handles requests
import "./Blog.css";
// import Deku from "../../Media/avatars/deku.png";
// import Pain from "../../Media/avatars/pain.png";
// import Asuna from "../../Media/avatars/asuna.jpeg";
// import Goku from "../../Media/avatars/goku.png";
// import Naruto from "../../Media/avatars/naruto.png";
// import White from "../../Media/avatars/white.jpeg";
// import Killua from "../../Media/avatars/killua.png";
// import Flickity from "react-flickity-component";

const BlogPage = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/posts").then((res) => {
      setBlog(res.data);
    });
  }, []);

  const LinkToPostsForm = (e) => {
    e.preventDefault();

    window.location.assign("/post");
  };
  // console.log(blog);
  return (
    <div id="blog-homepage">
      <button className="form-button" onClick={LinkToPostsForm}>
        Join The Conversation
      </button>
      {/* <a href="./post" id="goToPostAnchor">Join The Conversation</a> */}
      <div id="blog-post-container">
        {blog
          .slice(0)
          .reverse()
          .map((val, i) => {
            return (
              <div className="blog-post-div">
                <div className="name-level-div">
                  <p id="name-p">
                    {val.first_name} {val.last_name}{" "}
                  </p>
                  &nbsp;
                  <p id="level-p"> (Level: {val.level})</p>
                </div>
                <div className="content-div">
                  <p>{val.content}</p>
                </div>
                <div className="postdate-div">
                  <p>{val.post_date}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default BlogPage;
