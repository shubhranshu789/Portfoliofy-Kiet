import Project from "./Project";
import ProjectNfo from "./ProjectNfo";
import PropTypes from "prop-types";
import "./CSS/Projects.css";
import "./CSS/global.css";
import { Link } from "react-router-dom";

// import Headerpic from '../Images/eminem.png';
import alpha from "../Images/alpha.png";
import beta from "../Images/beta.png";
import gama from "../Images/gama.png";

const Projects = ({ className = "" }) => {
  return (
    <div className={`projects ${className}`} data-scroll-to="projectsContainer">
      <div className="projects-inner">
        <div className="text-group">
          <h1 className="text6">Gallery</h1>
          <div className="rectangle-wrapper">
            <div className="frame-child" />
          </div>
        </div>
      </div>


      
      {/* <Link style={{ textDecoration: "none" }} to={"/viewlogo"}>
        <Project
          text="I created this personal project in order to show how to create an interface in Figma using a portfolio as an example."
          pexelsEllyFairytale382320={alpha}
          projectName="Logo Project"
          buttonText="Logos"
        />
      </Link> */}



        {/* <Link style={{ textDecoration: "none" }} to={"/footer"}>
          <div className="project2">
            <img className="project2-child" loading="lazy" alt="" src={beta} />

            <ProjectNfo
              text="What was your role, your deliverables, if the project was personal, freelancing."
              propPadding="var(--padding-141xl) var(--padding-19xl) var(--padding-140xl)"
              projectName="Project Beta"
              buttonText="Project 2"
            />
          </div>
          </Link> */}

      {/* <Link style={{ textDecoration: "none" }} to={"/footer"}>
        <Project
          text="You can also add in this description the type of the project, if it was for web, mobile, electron."
          pexelsEllyFairytale382320={gama}
          propPadding="var(--padding-141xl) var(--padding-19xl) var(--padding-140xl)"
          projectName="Project Gama"
          buttonText="Project 3"
        />
      </Link> */}

      {/* <Link style={{ textDecoration: "none" }} to={"/footer"}>
        <Project
          text="You can also add in this description the type of the project, if it was for web, mobile, electron."
          pexelsEllyFairytale382320={gama}
          propPadding="var(--padding-141xl) var(--padding-19xl) var(--padding-140xl)"
          projectName="Delta Gama"
          buttonText="Project 4"
        />
      </Link> */}
    </div>
  );
};

Projects.propTypes = {
  className: PropTypes.string,
};

export default Projects;
