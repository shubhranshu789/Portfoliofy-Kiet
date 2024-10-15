import "./CSS/FrameComponent1.css";
import PropTypes from "prop-types";
import "./CSS/global.css";
// import Headerpic from "..Images/eminem.png"
// import Headerpic from '../Images/eminem.png';
import Headerpic from '../Images/akash.png';
import { Link, useParams , useNavigate } from "react-router-dom";

import { useCallback, useState , useEffect } from "react";


const FrameComponent1 = ({ className = "" }) => {


  const [adminData, setadminData] = useState([]);

  const navigate = useNavigate();
  

  

  const onTabDefault1Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='projectsContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);


// Step 1: Get the value from localStorage
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






  const gotoabout = () => {
    navigate('/about')
  }

  const token = localStorage.getItem("jwt");

useEffect(() => {
  if(token){
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
    <section  style={{display : "flex" }} className={`frame-parent ${className}`}>
      <div className="intro-wrapper">
        <div className="intro">
          <b className="uiux-designer"> {adminData.profession}</b>
          <div className="content">
            <h1 className="title">Hello, my name is {adminData.name}</h1>
            <div className="subheadline">
              <div className="text">
              {adminData.specialization}
              </div>
            </div>
            <div className="buttons">
              <button onClick={onTabDefault1Click} className="button-primary">
                <div className="text1">Projects</div>
              </button>
              <button className="button-secondary" onClick={() => {gotoabout()}}>
                {/* <a href="https://wa.me/916306710581" target="_blank" rel="noopener noreferrer"> */}
                  <div className="text2">Connect</div>
                {/* </a> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <img className="image-icon" loading="lazy" alt="" src={adminData.Photo} />
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;