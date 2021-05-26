import React, { useState } from "react";
import axios from "axios"; // handles requests
import "./Blog.css";
import { Redirect } from "react-router";

axios.defaults.withCredentials = true; //required for some reason lol

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        this.setState((state) => ({
          email: response.data.user[0].email,
        }));
      }
      //console.log(response.data.user);
    });
  }

  render() {
    //console.log(this.state.email);

    return <SubmitPostForm email={this.state.email} />;
  }
}

const SubmitPostForm = (props) => {
  // const [name, setName] = useState("");
  const [content, setContent] = useState("");
  // const [blog, setBlog] = useState([]);
  const [errorMessage, setError] = useState("");

  const submitPost = (e) => {
    e.preventDefault();

    if (content.length === 0) {
      setError("Oops, you forgot to write your thoughts!");
    } else if (props.email === "") {
      setError("Oops, you have to be logged in to make a post!");
    } else {
      //console.log("HI", props.email);

      axios
        .post("http://localhost:3002/posts", {
          content: content,
          post_date: Date(),
          email: props.email,
        })
        .then((res) => {
          if (res.data.message) {
            setError(res.data.message);
            console.log(errorMessage);
          } else {
            setError("worked!");
            console.log(errorMessage);
            // props.login();
            // window.location.reload();
          }
        });
      console.log("YOOOOOOO");
      setTimeout(() => {
        window.location.assign("/blog");
      }, 500);
    }
  };

  return (
    <div id="post-homepage">
      <form id="submit-post-form">
        <h1 className="form-header">Write a Post</h1>

        <h4 style={{ width: "100%", textAlign: "center" }}>
          {errorMessage.length > 0 ? errorMessage : null}
        </h4>

        <div className="form-field">
          <textarea
            id="post-textarea"
            placeholder="Share your thoughts! (Max of 300 characters)"
            maxLength="300"
            name="my-post"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="form-field">
          <button className="form-button" onClick={submitPost}>
            Post It!
          </button>
        </div>
      </form>
    </div>
  );
};
export default PostPage;
