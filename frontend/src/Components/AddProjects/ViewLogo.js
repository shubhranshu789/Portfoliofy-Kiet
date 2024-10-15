import React, { useEffect, useState } from "react";

import Header from "../../Components/Header";
import Footer from "../../Components/FooterIcons";
import "./ViewLogo.css";

import pic1 from "../../Images/lion.webp";
import { ToastContainer, toast } from "react-toastify";
import { Link , useNavigate } from 'react-router-dom'


function ViewLogo() {
    const text = "Dynamic Text Here";
    const [pic, setPic] = useState([]);
    const notifyB = (msg) => toast.success(msg);
    

    const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("jwt");
      if(!token){
        navigate('/signin')
      }
  }, []);

    useEffect(() => {
        fetch("/allLogo", {
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
    }

    const removePost = (logoId) => {
        fetch(`/deleteLogo/${logoId}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            notifyB(result.message);
          });
      };





    return (
        <div>
            <Header />
            {/* <button onClick={() => { chk() }}>check</button> */}
            <div className="VLmainBox">
                <h1 style={{fontSize : "50px"}}>Logos</h1>
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
                                                    <p style={{fontSize : "20px" , padding: "10px"}}>{pics.desc}</p>
                                                </div>
                                               <div className="button-part">
                                                    <Link to={pics.link}>
                                                        <button className="view-more-button">View More</button>
                                                    </Link>
                                               </div>
                                            </div>
                                            
                                            

                                        </div>
                                    </div>
                                    <h2>{pics.name}</h2>

                                    <button style={{marginTop : "15px"}} className="vp-btn" onClick={() => {removePost(pics._id)  }} >
                                        Remove
                                    </button>
                                </div>
                            </>
                        ]
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

export default ViewLogo;
