
import { useCallback, useState , useEffect } from "react";
import "../CSS/Header.css";

import PropTypes from "prop-types";
import "../CSS/global.css";

import { Link , useNavigate } from "react-router-dom";



const Header = ({ className = "" }) => {

  const [adminData, setadminData] = useState([]);

  const userString = localStorage.getItem("user");

  // Step 2: Parse the JSON string to an object
  const userObject = JSON.parse(userString);

  const navigate = useNavigate();

  // Step 3: Access the 'name' property
  // const name = userObject.name;
  // const adminId = userObject._id;



  const chk = () => {
    // console.log(adminData.userName);
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






  const onTabDefaultClick = useCallback(() => {
    // Please sync "About - Simple Footer" to the project
  }, []);

  const onTabDefault1Click = useCallback(() => {

      navigate('/viewproject')

  }, []);

  const onSobreText2Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='footerIcons']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <header className={`header ${className}`}>
      
      <Link style={{color : "black", textDecoration : "none"}} to={'/'}>
        <b className="madelyn-torff">{adminData.userName}</b>
      </Link>
      <nav className="nav-wrapper">
        <nav className="nav">


            <Link style={{ textDecoration: "none" , color: "black"}} to={'/addprojects'}>
              <div className="tab-default" onClick={onTabDefaultClick}>
                <div className="sobreNew">Handle Page</div>
              </div>
            </Link>

        <Link style={{ textDecoration: "none" , color: "black" }} to={"/about"}>
          <div className="tab-default" onClick={onTabDefaultClick}>
            <div className="sobre">About</div>
          </div>
        </Link>


          <div className="tab-default1" onClick={onTabDefault1Click}>
            <div className="sobre1">Projects</div>
          </div>
          <div className="">
            <div className="sobre2" onClick={onSobreText2Click}>
              Contacts
            </div>
          </div>

          
        </nav>
      </nav>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;