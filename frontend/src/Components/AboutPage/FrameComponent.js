import "./CSS/FrameComponent.css";
import PropTypes from "prop-types";
import "./CSS/global.css";

import facebook from '../../Images/facebook.png';
import linkedIn from '../../Images/linkedIn.png';
import instagram from '../../Images/instagram.png';

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useCallback, useState, useEffect } from "react";

const FrameComponent = ({ className = "" }) => {

  const [adminData, setadminData] = useState([]);

  const userString = localStorage.getItem("user");

  // Step 2: Parse the JSON string to an object if it's not null
  let userObject = null;
  if (userString) {
    try {
      userObject = JSON.parse(userString);
    } catch (e) {
      console.error("Error parsing user string from localStorage:", e);
    }
  }

  // Step 3: Access the 'name' property if userObject is not null
  let name = "";
  let adminId = "";
  if (userObject) {
    name = userObject.name;
    adminId = userObject._id;
  }

  const chk = () => {
    console.log(adminData);
  };

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      fetch(`/getadmindata/${userObject._id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setadminData(result);
          // setPosts(result)
          console.log(adminData);
        });
    }
  }, []);



  return (
    <div className={`footer-icons-wrapper ${className}`}>
      <div className="footer-icons" data-scroll-to="footerIcons">
        <div className="icons">
          {/* <h1>lr</h1> */}
          <Link to={adminData.InstaLink}>
          <img
            className="phinstagram-logo-fill-icon"
            loading="lazy"
            alt=""
            src={instagram}
          />
        </Link>

        <Link to={adminData.facebookLink}>
          <img
            className="bilinkedin-icon"
            loading="lazy"
            alt=""
            src={facebook}
          />
        </Link>

        <Link to={adminData.LinkedInLink}>
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
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;