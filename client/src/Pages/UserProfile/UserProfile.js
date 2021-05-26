import React from "react";
import axios from "axios";
import Flickity from "react-flickity-component";
import "./UserProfile.css";
import Deku from "../../Media/avatars/deku.png";
import Pain from "../../Media/avatars/pain.png";
import Asuna from "../../Media/avatars/asuna.jpeg";
import Goku from "../../Media/avatars/goku.png";
import Naruto from "../../Media/avatars/naruto.png";
import White from "../../Media/avatars/white.jpeg";
import Killua from "../../Media/avatars/killua.png";
import Luffy from "../../Media/avatars/luffy.png";
import Sasuke from "../../Media/avatars/sasuke.png";
import Hisoka from "../../Media/avatars/hisoka.png";
import Kaneki from "../../Media/avatars/kaneki.png";
import Tanjiro from "../../Media/avatars/tanjiro.png";
import Bakugou from "../../Media/avatars/Bakugou.png";
import Kenshin from "../../Media/avatars/kenshin.png";
import Zoro from "../../Media/avatars/zoro.png";
import Saitama from "../../Media/avatars/saitama.png";
import Nami from "../../Media/avatars/nami.png";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      level: "",
      exp: "",
      picture: White,
      imageText: "",
      cardback: "",
      bio: "",
      avatarEdit: false,
      email: "",
      previewImage: "",
      index: "1",
    };
  }
  imageArray = [
    Deku,
    Pain,
    Asuna,
    Goku,
    Naruto,
    Killua,
    Luffy,
    Sasuke,
    Hisoka,
    Kaneki,
    Tanjiro,
    Kenshin,
    Zoro,
    Nami,
    Saitama,
    Bakugou,
  ];
  imageText = ["Deku", "Pain", "Asuna", "Goku", "Naruto"];

  componentDidMount() {
    axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        this.setState((state) => ({
          firstname: response.data.user[0].firstname,
          lastname: response.data.user[0].lastname,
          level: response.data.user[0].level,
          exp: response.data.user[0].exp,
          picture: response.data.user[0].picture,
          cardback: response.data.user[0].cardback,
          bio: response.data.user[0].bio,
          email: response.data.user[0].email,
        }));
      }
      console.log(response.data.user);
    });
    axios.get("http://localhost:3002/get-data").then((res) => {
      if (res.data.loggedIn == true) {
        this.setState((state) => ({
          picture: res.data.picture,
        }));
        this.DecodePicture(res.data.picture);
      }
    });
  }

  DecodePicture = (pic) => {
    if (pic === Deku) return this.setState((state) => ({ imageText: "Deku" }));
    else if (pic === Pain)
      return this.setState((state) => ({ imageText: "Pain" }));
    else if (pic === Asuna)
      return this.setState((state) => ({ imageText: "Asuna" }));
    else if (pic === Goku)
      return this.setState((state) => ({ imageText: "Goku" }));
    else if (pic === Naruto)
      return this.setState((state) => ({
        imageText: "Naruto",
      }));
    else if (pic === Killua)
      return this.setState((state) => ({
        imageText: "Killua",
      }));
    else if (pic === Luffy)
      return this.setState((state) => ({
        imageText: "Luffy",
      }));
    else if (pic === Sasuke)
      return this.setState((state) => ({
        imageText: "Sasuke",
      }));
    else if (pic === Hisoka)
      return this.setState((state) => ({
        imageText: "Hisoka",
      }));
    else if (pic === Kaneki)
      return this.setState((state) => ({
        imageText: "Kaneki",
      }));
    else if (pic === Tanjiro)
      return this.setState((state) => ({
        imageText: "Tangiro",
      }));
    else if (pic === Bakugou)
      return this.setState((state) => ({
        imageText: "Bakugou",
      }));
    else if (pic === Kenshin)
      return this.setState((state) => ({
        imageText: "Kenshin",
      }));
    else if (pic === Zoro)
      return this.setState((state) => ({
        imageText: "Zoro",
      }));
    else if (pic === Saitama)
      return this.setState((state) => ({
        imageText: "Saitama",
      }));
    else if (pic === Nami)
      return this.setState((state) => ({
        imageText: "Nami",
      }));
    // else if ((pic = "default"))
    //   return this.setState((state) => ({ imageText: "Pain" }));
    // else if ((pic = "Pain"))
    //   return this.setState((state) => ({ picture: Pain, imageText: "Pain" }));
    // else if ((pic = "Pain"))
    //   return this.setState((state) => ({ picture: Pain, imageText: "Pain" }));
    // else if ((pic = "Pain"))
    //   return this.setState((state) => ({ picture: Pain, imageText: "Pain" }));
    // else if ((pic = "Pain"))
    //   return this.setState((state) => ({ picture: Pain, imageText: "Pain" }));
  };

  render() {
    console.log("text: ", this.state.picture);

    return (
      <div class="user-container">
        <div className="user-profile-container">
          <div className="user-profile-img">
            <div className="img-div">
              <img
                className="avatar"
                src={this.state.picture==='default' ? White : this.state.picture}
                alt="user profile picture"
              />
              <button
                onClick={() => {
                  this.setState((state) => ({
                    avatarEdit: !this.state.avatarEdit,
                  }));
                }}
                className="change-avatar"
              >
                change avatar
              </button>
            </div>
            <div className="user-profile-info">
              <div
                className="user-profile-name"
                style={{ marginBottom: "8px" }}
              >
                {" "}
                NAME: {this.state.firstname} {this.state.lastname}
              </div>
              <div
                className="user-profile-level"
                style={{ marginBottom: "8px" }}
              >
                LEVEL: {this.state.level}
              </div>
              <div className="user-profile-bio" style={{ marginBottom: "8px" }}>
                BIO: {this.state.bio}
              </div>
            </div>
          </div>
          <div className="stats">
            {this.state.avatarEdit ? (
              <div className="avatar-edit-div">
                <div className="img-preview-div">
                  <img
                    className="img-preview"
                    src={
                      this.state.previewImage === ""
                        ? this.state.picture
                        : this.state.previewImage
                    }
                  />
                  <p className="img-description">{this.state.imageText}</p>
                </div>
                <Flickity
                  className="flick"
                  options={{ initialIndex: this.state.index }}
                >
                  {" "}
                  {this.imageArray.map((val, i) => {
                    return (
                      <div class="carousel-cell">
                        <button
                          className="img-picker-button"
                          onMouseEnter={() => {
                            this.setState((state) => ({
                              previewImage: this.imageArray[i],
                            }));
                            this.DecodePicture(this.imageArray[i]);
                          }}
                          onClick={(val) => {
                            this.DecodePicture(this.imageArray[i]);
                            this.setState((state) => ({
                              picture: this.imageArray[i],
                              index: { i },
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
                            style={
                              this.state.picture === val
                                ? { border: "12px double red" }
                                : null
                            }
                            className="img-to-pick"
                            src={val}
                            key={i}
                            alt="imagepicker"
                          />
                          <p className="img-text"></p>
                        </button>
                      </div>
                    );
                  })}
                </Flickity>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
