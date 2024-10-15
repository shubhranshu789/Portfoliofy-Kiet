import React, { useEffect, useState } from "react";

import Header from "../../../Components/Header";
import Footer from "../AIML/FooterIcons";
// import "./ViewLogo.css";

// import pic1 from "../../Images/lion.webp";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function View() {
  const [pic, setPic] = useState([]);
  const notifyB = (msg) => toast.success(msg);

  const handleSubmitproject = (e) => {
    navigate("/addproject");
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    fetch("/mypojects", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);
        // setPosts(result)
        console.log(pic);
      });
  }, []);

  const chk = () => {
    console.log(pic);
  };

  const removePost = (logoId) => {
    fetch(`/deleteProject/${logoId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        notifyB(result.message);
        window.location.reload();
      });
  };

  return (
    <div>
      <Header />
      {/* <button onClick={() => { chk() }}>check</button> */}
      <div className="VLmainBox">
        <h1 style={{ fontSize: "50px" }}>All Projects</h1>
        <button
          onClick={handleSubmitproject}
          style={{
            
            backgroundColor: "#4CAF50", // Green background
            color: "white", // White text color
            padding: "12px 24px", // Padding inside the button
            fontSize: "16px", // Font size
            border: "none", // Remove default border
            borderRadius: "4px", // Rounded corners
            cursor: "pointer", // Pointer cursor on hover
            marginTop: "10px", // Margin on top
            borderRadius : '50px',
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Button shadow effect
            transition: "background-color 0.3s ease", // Smooth background color transition
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")} // Hover effect
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Reset hover effect
        >
          Add Projects
        </button>

        <div className="VLallCards">
          {pic.map((pics) => {
            return [
              <>
                <div class="card-container">
                  <div class="card">
                    <div class="card-front">
                      {/* <h2>Hover over me!</h2> */}
                      <img src={pics.pic} alt="" />
                    </div>
                    <div class="card-back">
                      {/* <h2 style={{display:"block"}}>{pics.name}</h2> */}

                      <div className="flip-card-back-part">
                        <div className="text-part">
                          <p style={{ fontSize: "20px", padding: "10px" }}>
                            {pics.desc}
                          </p>
                        </div>
                        <div className="button-part">
                          <Link to={pics.link}>
                            <button className="view-more-button">
                              View More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2>{pics.name}</h2>

                  <button
                    style={{ marginTop: "15px" }}
                    className="vp-btn"
                    onClick={() => {
                      removePost(pics._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>,
            ];
          })}
        </div>
      </div>

      {/* Add footer */}
      <div style={{ marginTop: "50px" }} className="AP-footer">
        <Footer />
      </div>
    </div>
  );
}

export default View;
