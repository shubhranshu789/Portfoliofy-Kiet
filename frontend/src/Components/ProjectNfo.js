import { useMemo } from "react";
import "./CSS/ProjectNfo.css";
import PropTypes from "prop-types";
import "./CSS/global.css";

import { Link } from "react-router-dom";



const ProjectNfo = ({ className = "", text, propPadding , projectName ,  buttonText }) => {
  const projectNfoStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  return (
    <div className={`project-nfo ${className}`} style={projectNfoStyle}>


     
        <div className="text-parent">
          <h1 className="text3" style={{color : "black"}}>{projectName}</h1>
          <div className="text4">{text}</div>

         
            <button className="boto-secudrio">
              <div className="text5">{buttonText}</div>
            </button>
          
        </div>
      


    </div>
  );
};

ProjectNfo.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  projectName: PropTypes.string.isRequired,

  /** Style props */
  propPadding: PropTypes.any,
};

export default ProjectNfo;