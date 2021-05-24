import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Challenges.css";

const ChallengesPage = () => {
  const [time, setTime] = useState(2);
  const [play, setPlay] = useState(false);
  const [hover, setHover] = useState(false);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setTime(time - 1);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   });
  const RenderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div
        className="timer"
        style={{
          color: "white",
          background: "black",
          height: "90%",
          width: "90%",
          borderRadius: "50%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <div className="text">Remaining</div>
          <button
            // onClick={setPlay(!play)}
            className="value"
            style={{ color: "darkred" }}
          >
            {remainingTime}
          </button>
          <div className="text">seconds</div>
        </div>
      </div>
    );
  };
  return (
    <div style={{ color: "white" }}>
      <CountdownCircleTimer
        // onMouseOver={setPlay(true)}
        isPlaying={play}
        duration={100}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        <RenderTime />
      </CountdownCircleTimer>
    </div>
  );
};

export default ChallengesPage;
