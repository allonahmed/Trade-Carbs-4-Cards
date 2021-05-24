import React, { useState } from "react";
import axios from "axios"; // handles requests
import "./Merch.css";
import Deku from "../../Media/avatars/deku.png";
import Pain from "../../Media/avatars/pain.png";
import Asuna from "../../Media/avatars/asuna.jpeg";
import Goku from "../../Media/avatars/goku.png";
import Naruto from "../../Media/avatars/naruto.png";
import White from "../../Media/avatars/white.jpeg";
import Killua from "../../Media/avatars/killua.png";
import Flickity from "react-flickity-component";

const MerchPage = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState([]);
  const imageArray = [Deku, Pain, Asuna, Goku, Naruto, Killua];

  return (
    <Flickity className="merch-text">
      {imageArray.map((val, i) => {
        return (
          <div class="carousel-cell">
            <button
              onClick={(val) => {
                this.DecodePicture(this.imageArray[i]);
                this.setState((state) => ({
                  picture: this.imageArray[i],
                }));
                axios
                  .post("http://localhost:3002/update-avatar", {
                    picture: this.imageArray[i],
                    email: this.state.email,
                  })
                  .then((res) => {
                    console.log(res.data);
                  });
                this.props.setPic();
                window.location.reload();
              }}
            >
              <img
                // style={i === 3 ? { transform: "scale(1.3)" } : null}
                // style={
                //   1 === 4 ? { transform: "translateX(50px)" } : null
                // }
                className="img-to-pick"
                src={val}
                key={i}
                alt="imagepicker"
              />
            </button>
          </div>
        );
      })}
    </Flickity>
  );
};

export default MerchPage;
