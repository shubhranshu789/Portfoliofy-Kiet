import FrameComponent1 from "./FrameComponent1";
import FrameComponent from "./FrameComponent";
import Header from "./Header";
import Projects from "./Projects";
import img1 from "../Images/Capture.JPG";

import logo from '../Images/AiMl.JPG'
import brand from '../Images/project.JPG'

import certificate from '../Images/certificate.JPG'


import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import "./CSS/PortfolioSimpleFooter.css";
import "./CSS/global.css";

const PortfolioSimpleFooter = () => {
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate('/signin');
    }
  }, []);
  return (
    <div className="portfolio-simple-footer">
      <FrameComponent1 />
      <Header />
      <section className="projects-wrapper">
        <Projects />
      </section>
      <div className="psf-box">

    

        <div className="psf-container">
          <Link to={"/viewaiml"}>
            <img className="" src={logo} alt="" />
            <div className="overlay"></div>
          </Link>
        </div>

        <div className="psf-container">
          <Link to={"/viewproject"}>
            <img className="" src={brand} alt="" />
            <div className="overlay"></div>
          </Link>

        </div>
        <div className="psf-container">
          <Link to={"/viewcertificate"}>
            <img className="" src={certificate} alt="" />
            <div className="overlay"></div>
          </Link>

        </div>


      </div>

      <FrameComponent />
    </div>
  );
};

export default PortfolioSimpleFooter;
