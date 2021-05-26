import "./AboutUs.css";
import Allon from "../../Media/Allon.png";
import Daniel from "../../Media/download.jpg";
import Wengsing from "../../Media/Wengsing.png";
import githubicon from "../../Media/github.png";
import linkedin from "../../Media/linkedin.png";

const AboutUs = () => {
  return (
    <div>
      <div className="game-div allon">
        <h1 id="MeetTheTeam"> Meet the Team </h1>
        <p>
          Hi All, Our name Team name is Saw (St. Vincent, Allon and Wengsing){" "}
        </p>
      </div>

      <div className="game-div rightside" id="allon">
        <div>
          {" "}
          <img src={Allon} className="roundImage " />
        </div>
        <div>
          <h2 className="fontheader"> Allon Ahmed</h2>
        </div>
        {/* <p> fun fact </p> */}

        <div>
          <img src={githubicon} className="iconsize" />{" "}
          <a href="https://github.com/allonahmed" title="Visit Allon Linkedin">
            {" "}
            Visit Allon's Github
          </a>{" "}
          <img src={linkedin} className="iconsize" />{" "}
          <a href="https://www.linkedin.com/in/allon-ahmed/" title="iconsize">
            {" "}
            Visit Allon's Linkedin
          </a>
        </div>

        <ul>
          <li>Computer Science Tutor at Medgar Evers College</li>
          <li>Interning at Dotdash for Summer 2021</li>
          <li>Graduating Spring 2022</li>
        </ul>
      </div>

      <div className="game-div rightside" id="daniel">
        <div>
          <img src={Daniel} className="roundImage" />
        </div>

        <div>
          <h2 className="fontheader">Daniel St. Vincent </h2>{" "}
        </div>

        <div>
          <img src={githubicon} className="iconsize" />{" "}
          <a
            href="https://github.com/danieljstvincent"
            title="Visit Daniel Linkedin"
          >
            {" "}
            Visit Daniel's Github
          </a>{" "}
          <img src={linkedin} className="iconsize" />{" "}
          <a
            href="https://www.linkedin.com/in/danielstvincent/"
            title="iconsize"
          >
            {" "}
            Visit Daniel's Linkedin
          </a>
        </div>

        {/* <div><h1 className="fontheader">  </h1> </div>  */}
        <ul>
          <li> Favorite Snack in Cookie Chip Cookies</li>
          <li>Passionate about game Augmented reality and virtual reality</li>
          <li>
            Graduating from the CUNY baccalaureate program with B.S. in Computer
            Science and Immersive Media
          </li>
        </ul>

        {/* <div><h1 className="fontheader"> Favrite Snack in Cookie Chip Cookies</h1> </div> 
              <div><h1 className="fontheader"> Graduating from the CUNY baccalaureate program with B.S. in Computer Sciene and immersive teachioies</h1> </div> */}
      </div>
      <div className="game-div rightside" id="wengsing">
        <div>
          {" "}
          <img src={Wengsing} className="roundImage" />{" "}
        </div>

        <div>
          {" "}
          <h2 className="fontheader"> Wengsing Wong </h2>
        </div>

        <div>
          <img src={githubicon} className="iconsize" />{" "}
          <a
            href="https://github.com/WengsingVWong"
            title="Visit Wengsing Linkedin"
          >
            {" "}
            Visit Wengsing's Github
          </a>{" "}
          <img src={linkedin} className="iconsize" />{" "}
          <a href="https://www.linkedin.com/in/wengsing-wong/" title="iconsize">
            {" "}
            Visit Wengsing's Linkedin
          </a>
        </div>

        <ul>
          <li>
            Graduating for Baruch College with a B.B.A. in Computer Information
            Systems in May 2021{" "}
          </li>
          <li>Social Media Chair for The Grid</li>
          <li>Favorite Musical Artist is Owl City</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
