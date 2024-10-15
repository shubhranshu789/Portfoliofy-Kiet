import "../../CSS/FooterIcons.css";
import PropTypes from "prop-types";
import "../../CSS/global.css";


// import facebook from '../Images/facebook.png';
import facebook from '../../../Images/facebook.png';
import linkedIn from '../../../Images/linkedIn.png';
import instagram from '../../../Images/instagram.png';


import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'





const FooterIcons = ({ className = "" }) => {
  const navigate = useNavigate()
  return (
    <div className={`footer-icons ${className}`} data-scroll-to="footerIcons">
      <div className="icons">


      <Link to={""}>
        <img
          className="phinstagram-logo-fill-icon"
          loading="lazy"
          alt=""
          src={instagram}
        />
      </Link>

      <Link>
        <img
          className="bilinkedin-icon"
          loading="lazy"
          alt=""
          src={facebook}
        />
      </Link>

      <Link>
        <img
          className="bienvelope-fill-icon"
          loading="lazy"
          alt=""
          src={linkedIn}
        />
      </Link>


      </div>
      <div className="madelyn-torff-2021-wrapper">
        <div className="madelyn-torff-2021">{`Madelyn Torff 2021 `}</div>
        
      </div>
      
    </div>
  );
};

FooterIcons.propTypes = {
  className: PropTypes.string,
};

export default FooterIcons;