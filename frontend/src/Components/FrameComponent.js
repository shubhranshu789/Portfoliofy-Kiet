import FooterIcons from "./FooterIcons";
import PropTypes from "prop-types";
import "./CSS/FrameComponent.css";
import "./CSS/global.css";


const FrameComponent = ({ className = "" }) => {
  return (
    <div className={`footer-icons-wrapper ${className}`}>
      <FooterIcons />
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;