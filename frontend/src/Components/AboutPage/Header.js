
import { useCallback, useState , useEffect } from "react";
import "./CSS/Header.css";
import PropTypes from "prop-types";
import "./CSS/global.css";
import { Link , useNavigate } from 'react-router-dom'

const Header = ({ className = "" }) => {

  const [adminData, setadminData] = useState([]);

  const userString = localStorage.getItem("user");

  // Step 2: Parse the JSON string to an object
  const userObject = JSON.parse(userString);

  // Step 3: Access the 'name' property
  // const name = userObject.name;
  // const adminId = userObject._id;


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



  const onMadelynTorffTextClick = useCallback(() => {
    // Please sync "Portfolio - Simple Footer" to the project
  }, []);

  const onTabDefaultClick = useCallback(() => {
    // Please sync "Portfolio - Simple Footer" to the project
  }, []);

  const onSobreText2Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='footerIcons']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);



  const navigate = useNavigate();




  const handleSubmit = (e) => {  
    navigate('/viewproject')
  }

  return (
    <header className={`header ${className}`}>
      
      
        <b className="madelyn-torff" onClick={onMadelynTorffTextClick}>
          <Link to={'/'} style={{color : "black", textDecoration : "none"}}>
            {adminData.userName}
          </Link>
        </b>

      <div className="nav-wrapper">
        <nav className="nav">
          <div className="tab-active">
            <a className="sobre">About</a>
            <div className="tab-active-child" />
          </div>

            <div onClick={() => {handleSubmit()}} className="tab-default">
          {/* <Link style={{ textDecoration: "none" , color: "" }} to={'/addprojects'}></Link> */}
              <a className="sobre1">Projects</a>
          {/* <Link/> */}
            </div>


          <div className="tab-default1">
            <a className="sobre2" onClick={onSobreText2Click}>
              Contacts
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;