import { useMemo } from "react";
import ProjectNfo from "./ProjectNfo";
import PropTypes from "prop-types";
import "./CSS/Project.css";
import "./CSS/global.css";



const Project = ({
  className = "",
  text,
  pexelsEllyFairytale382320,
  propPadding,
  projectName,
  buttonText,
}) => {
  const projectNfoStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  

  return (
    <div className={`project1 ${className}`}>
      
      <ProjectNfo text={text} projectName={projectName}  buttonText = {buttonText}/>

      <img
        className="pexels-elly-fairytale-3823207-icon"
        loading="lazy"
        alt=""
        src={pexelsEllyFairytale382320}
      />
    </div>
  );
};

Project.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  pexelsEllyFairytale382320: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,

  /** Style props */
  propPadding: PropTypes.any,
};

export default Project;