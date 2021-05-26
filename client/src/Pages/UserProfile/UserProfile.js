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
import Level from "../../Media/icons/levelup.png";
import Reps from "../../Media/icons/reps.png";
import Timer from "../../Media/icons/timer.png";
import Squats from "../../Media/workout-icons/squats.png";
import Planks from "../../Media/workout-icons/planks.png";
import Pushups from "../../Media/workout-icons/pushups.png";
import Situps from "../../Media/workout-icons/situps.jpeg";
import Jumping from "../../Media/workout-icons/jumping.png";
import Dips from "../../Media/icons/dips.png";
import ReactCardFlip from "react-card-flip";
import Bng from "../../Media/cards/blueandgold.jpg";
import Blue from "../../Media/cards/bluedefault.png";
import Default from "../../Media/cards/default.png";
import Gold from "../../Media/cards/golddefault.png";
import Green from "../../Media/cards/greendefault.png";
import Magic from "../../Media/cards/magicdefault.jpg";
import Pokemon from "../../Media/cards/pokemoncardmasterdefault.png";
import Red from "../../Media/cards/reddefault.png";
import Robo from "../../Media/cards/robodefault.jpg";
// import BG from '../../Media/cards/'

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
      card: Default,
      bio: "",
      avatarEdit: false,
      email: "",
      previewImage: "",
      index: "1",
      workouts: [],
      totaldips: 0,
      totaljj: 0,
      totalpushups: 0,
      totalsitups: 0,
      totalsquats: 0,
      hoverCard: false,
      cardEdit: false,
      previewCard: "",
    };
    this.handleClick = this.handleClick.bind(this);
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
  cardArray = [Bng, Blue, Default, Gold, Green, Magic, Pokemon, Red, Robo];
  imageText = ["Deku", "Pain", "Asuna", "Goku", "Naruto"];
  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  componentDidMount() {
    axios.get("http://localhost:3002/login").then((response) => {
      if (response.data.loggedIn == true) {
        this.setState((state) => ({
          firstname: response.data.user[0].firstname,
          lastname: response.data.user[0].lastname,
          level: response.data.user[0].level,
          exp: response.data.user[0].exp,
          picture: response.data.user[0].picture,
          card:
            response.data.user[0].cardback === "default"
              ? Default
              : response.data.user[0].cardback,
          bio: response.data.user[0].bio,
          email: response.data.user[0].email,
          totalpushups: response.data.user[0].totalpushups,
          totalsitups: response.data.user[0].totalsitups,
          totaldips: response.data.user[0].totaldips,
          totalsquats: response.data.user[0].totalsquats,
          totaljj: response.data.user[0].totaljj,
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
    axios.get("http://localhost:3002/get-workout").then((resp) => {
      if (resp) {
        this.setState((state) => ({
          workouts: resp.data,
          copy: resp.data,
        }));
        console.log("data", resp.data);
      }
    });
    // axios.get("http://localhost:3002/get-jjsum").then((response) => {
    //   if (response) {
    //     this.setState((state) => ({
    //       jjsum: response.data,
    //     }));
    //     console.log("sum", response.data);
    //   }
    // });
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
  };
  getWorkoutTotal = (workout) => {
    const x = this.state.workouts;
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      if (x[i].exercise === workout) {
        sum += x[i].repetition;
      }
    }
    return sum;
  };

  MaxWorkOut = () => {
    const max = Math.max(
      this.state.totalpushups,
      this.state.totalsitups,
      this.state.totalsquats,
      this.state.totaldips,
      this.state.totaljj
    );
    if (max === 0) {
      return null;
    } else if (max === this.state.totalpushups) {
      return Pushups;
    } else if (max === this.state.totalsitups) {
      return Situps;
    }
    if (max === this.state.totaljj) {
      return Jumping;
    }
    if (max === this.state.totalsquats) {
      return Squats;
    }
    if (max === this.state.totaldips) {
      return Dips;
    }
  };

  render() {
    console.log("workout list:", this.getWorkoutTotal());

    return (
      <div class="user-container">
        <div className="user-profile-container">
          {!this.state.avatarEdit && !this.state.cardEdit ? (
            <div className="user-profile-img">
              <div className="img-div">
                <img
                  className="avatar"
                  src={
                    this.state.picture === "default"
                      ? White
                      : this.state.picture
                  }
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
                  style={{ marginBottom: "10px" }}
                >
                  {" "}
                  NAME: {this.state.firstname} {this.state.lastname}
                </div>
                <div className="fav-div">
                  <p style={{ fontSize: "26px" }}>FAVORITE</p>
                  <img
                    className="top-img"
                    src={this.MaxWorkOut()}
                    alt="max workout"
                  />
                  <p style={{ fontSize: "26px" }}>WORKOUT</p>
                </div>
                <div
                  className="user-profile-level"
                  style={{ marginTop: "5px" }}
                >
                  LEVEL: {this.state.level}
                </div>
                <div className="card-back-div">
                  {/* <p className="card-back-text" style={{ marginRight: "8px" }}>
                    Cardback{" "}
                  </p> */}
                  <button
                    className="card-button"
                    // onMouseOver={() => {
                    //   this.setState((state) => ({
                    //     hoverCard: true,
                    //   }));
                    // }}
                    // onMouseOut={() => {
                    //   this.setState((state) => ({
                    //     hoverCard: false,
                    //   }));
                    // }}
                  >
                    <img
                      className="card-back"
                      src={this.state.card}
                      alt="cardback"
                    />
                  </button>

                  <button
                    className="card-back-text"
                    onClick={() => {
                      this.setState((state) => ({ cardEdit: true }));
                    }}
                  >
                    <i class="fas fa-edit"></i>
                    <p style={{ fontSize: "12px" }}>EDIT</p>
                  </button>

                  {/* <p className="card-back-text" style={{ marginLeft: "8px" }}>
                    Cardback
                  </p> */}
                </div>
              </div>
            </div>
          ) : this.state.cardEdit ? (
            <div className="card-edit-div">
              <div className="img-preview-div">
                <img
                  className="card-preview"
                  src={
                    this.state.previewCard === ""
                      ? this.state.card
                      : this.state.previewCard
                  }
                />
              </div>
              <Flickity
                className="flick1"
                options={{ initialIndex: this.state.index }}
              >
                {" "}
                {this.cardArray.map((val, i) => {
                  return (
                    <div class="carousel-cell1">
                      <button
                        className="card-picker-button"
                        onMouseEnter={() => {
                          this.setState((state) => ({
                            previewCard: this.cardArray[i],
                          }));
                          this.DecodePicture(this.cardArray[i]);
                        }}
                        onClick={(val) => {
                          this.DecodePicture(this.cardArray[i]);
                          this.setState((state) => ({
                            card: this.cardArray[i],
                            index: { i },
                          }));
                          axios
                            .post("http://localhost:3002/update-card", {
                              card: this.cardArray[i],
                              email: this.state.email,
                            })
                            .then((res) => {
                              console.log(res.data);
                            });
                          // this.props.setPic();
                          window.location.reload();
                        }}
                      >
                        <img
                          // style={i === 3 ? { transform: "scale(1.3)" } : null}
                          // style={
                          //   1 === 4 ? { transform: "translateX(50px)" } : null
                          // }
                          style={
                            this.state.card === val
                              ? { border: "6px double darkgrey" }
                              : null
                          }
                          className="card-to-pick"
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
          ) : (
            <div className="avatar-edit-div">
              {" "}
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
                              ? { border: "6px double darkgrey" }
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
          )}
          <div className="stats">
            <ReactCardFlip
              isFlipped={this.state.isFlipped}
              flipDirection="horizontal"
              className="flip"
              containerStyle={{ width: "100%", height: "100%" }}
            >
              <div className="right-cont">
                <div className="header">
                  {" "}
                  HELLO, <span className="my-name">{this.state.firstname}</span>
                  . VIEW YOUR LIFETIME STATS HERE!
                </div>
                <div className="my-stat-div">
                  <div className="icon-div">
                    <img className="icons" src={Level} alt="level.png" />
                    <h5>LEVEL:</h5>
                    <h5 className="number">{this.state.level}</h5>
                  </div>
                  <div className="icon-div">
                    <img className="icons" src={Dips} alt="total reps" />
                    <h5> TOTAL DIPS </h5>
                    <h5 className="number">{this.state.totaldips}</h5>
                  </div>
                  <div className="icon-div">
                    <img className="icons" src={Jumping} alt="jj"></img>
                    <h5>TOTAL JACKS:</h5>

                    <h5 className="number">{this.state.totaljj}</h5>
                  </div>
                  <div className="icon-div">
                    <img className="icons" src={Situps} alt="Situps"></img>
                    <h5>TOTAL SIT UPS:</h5>
                    <h5 className="number">{this.state.totalsitups}</h5>
                  </div>
                  <div className="icon-div">
                    <img className="icons" src={Pushups} alt="pushups"></img>
                    <h5>TOTAL PUSHUPS:</h5>
                    <h5 className="number">{this.state.totalpushups}</h5>
                  </div>
                  <div className="icon-div">
                    <img className="icons" src={Squats} alt="jj"></img>
                    <h5>TOTAL SQUATS:</h5>

                    <h5 className="number">{this.state.totalsquats}</h5>
                  </div>
                </div>
                <div className="dot-div">
                  <button
                    className="flip-dot1 dot"
                    onClick={() => {
                      this.setState((state) => ({ isFlipped: false }));
                    }}
                    style={
                      this.state.isFlipped
                        ? { color: "white" }
                        : { color: "grey" }
                    }
                  >
                    {" "}
                    <i
                      class="fas fa-arrow-left"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </button>
                  <button
                    className="flip-dot2 dot"
                    onClick={() => {
                      this.setState((state) => ({ isFlipped: true }));
                    }}
                    style={
                      this.state.isFlipped
                        ? { color: "grey" }
                        : { color: "white" }
                    }
                  >
                    <i
                      class="fas fa-arrow-right"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="post-workout-div">
                <div className="history-header"> WORKOUT HISTORY LOG</div>
                <Flickity className="flicky" options={{ initialIndex: 0 }}>
                  {this.state.workouts
                    .slice(0)
                    .reverse()
                    .map((val, i) => {
                      return (
                        <div
                          className="each-workout"
                          style={
                            i % 2 === 0
                              ? {
                                  backgroundImage:
                                    "linear-gradient(180deg, rgb(90, 87, 87) 20%, #c3c8ca 150%)",
                                }
                              : {
                                  backgroundImage:
                                    "linear-gradient(360deg, rgb(90, 87, 87) 20%, #c3c8ca 150%)",
                                }
                          }
                        >
                          <h3 className="workout-name">
                            -{this.state.firstname} {this.state.lastname}-
                          </h3>
                          <h3 className="workout-body">
                            Workout number {this.state.workouts.length - i}
                          </h3>
                          <h3 className="workout-body">
                            Exercise: {val.exercise}
                          </h3>
                          <h3 className="workout-body">
                            Settings: {val.istimed}
                          </h3>
                          <h3 className="workout-body">
                            Time per rep: {(val.totaltime / 52).toFixed(2)}s
                          </h3>
                          <h3 className="workout-body">
                            Total Time: {val.totaltime.toFixed(2)}
                          </h3>

                          <p className="workout-time">
                            {val.timeposted.substr(0, 24)}
                          </p>
                        </div>
                      );
                    })}
                </Flickity>
                <div className="dot-div">
                  <button
                    className="flip-dot1 dot"
                    style={
                      this.state.isFlipped
                        ? { color: "white" }
                        : { color: "grey" }
                    }
                    onClick={() => {
                      this.setState((state) => ({ isFlipped: false }));
                    }}
                  >
                    <i
                      class="fas fa-arrow-left"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </button>
                  <button
                    onClick={() => {
                      this.setState((state) => ({ isFlipped: true }));
                    }}
                    className="dot"
                    style={
                      this.state.isFlipped
                        ? { color: "grey" }
                        : { color: "white" }
                    }
                    disabled={this.state.isFlipped ? "disable" : null}
                  >
                    {" "}
                    <i
                      class="fas fa-arrow-right"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </button>
                </div>
              </div>
            </ReactCardFlip>
            )
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
