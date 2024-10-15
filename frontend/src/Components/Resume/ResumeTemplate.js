import React, { useEffect } from 'react'
import { useState } from 'react';

import {Link , useNavigate} from 'react-router-dom'

import Header from '../Header';
import Preview from './Preview'
import AdminDataComponent from './AdminDataComponent';



import { ToastContainer, toast } from "react-toastify";

import './Resume.css'

function ResumeTemplate() {

 

  const navigate =  useNavigate();


  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const token = localStorage.getItem("jwt");
  const [adminData, setadminData] = useState([]);
  const [adminData2, setadminData2] = useState([]);


  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);



  const [values, setValues] = useState({
    Year: "",
    Year2: "",
    Degree_Certificate: "",
    Institute: "",
    Percentage: "",
  });





  const [year, setyear] = useState("");
  const [year2, setyear2] = useState("");
  const [Degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("")
  const [percentage, setpercentage] = useState("");




  const [projects, setprojects] = useState("");



  useEffect(() => {
    if (token) {
      fetch(`/getadmindata/${user._id}`, {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setadminData(result);
          setadminData2(result);
          // setPosts(result)
          console.log(adminData);
        });
    }

  }, []);



  const handleSubmit = async () => {
    // Validate the fields
    if (!year || !Degree || !institute) {
      console.log("Please add all the fields");
      return;
    }

    // Set the values in the state
    const newValues = {
      Year: year,
      Year2: year2,
      Degree_Certificate: Degree,
      Institute: institute,
      Percentage: percentage,
    };

    setValues(newValues);

    console.log(newValues);

    // Try updating the values in MongoDB
    try {
      const response = await fetch(`/adminData/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValues), // Use the newly set values directly
      });

      const updatedItem = await response.json();
      console.log("Data Updated:", updatedItem);

      notifyB("Data Updated");
      // navigate('/');

      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };





  // ------------------------------------------------------------------------------------
  const [Achievements, setAchievements] = useState("");
  const [valuesAchievements, setValuesAchievements] = useState({
    points: ""
  });


  const handleSubmitAchievements = async () => {
    // Validate the field
    if (!Achievements) {
      console.log("Please add your Achievements");
      return;
    }

    // Set the values in the state
    const newValuesAchievements = {
      points: Achievements,
    };

    setValuesAchievements(newValuesAchievements);

    console.log(newValuesAchievements);

    // Try updating the values in MongoDB
    try {
      const response = await fetch(
        `/adminDataAchievement/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValuesAchievements), // Use the newly set values directly
        }
      );

      const updatedItem = await response.json();
      console.log("Data Updated:", updatedItem);

      notifyB("Data Updated");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // ---------------------------------------------------------------------

  const [extra, setextra] = useState("")
  const [valuesextra, setValuesextra] = useState({
    points: ""
  });


  const handleSubmitExtra = async () => {
    // Validate the field
    if (!extra) {
      console.log("Please add the extra information");
      return;
    }

    // Set the values in the state
    const newValuesExtra = {
      points: extra,
    };

    setValuesextra(newValuesExtra);

    console.log(newValuesExtra);

    // Try updating the values in MongoDB
    try {
      const response = await fetch(
        `/adminDataExtra/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValuesExtra), // Use the newly set values directly
        }
      );

      const updatedItem = await response.json();
      console.log("Data Updated:", updatedItem);

      notifyB("Data Updated");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };



  // ---------------------------------------------------------------------


  const [Technical, setTechnical] = useState("")
  const [valuesTechnical, setValuesTechnical] = useState({
    points: ""
  });


  const handleSubmitTechnical = async () => {
    // Validate the field
    if (!Technical) {
      console.log("Please add your Technical skills");
      return;
    }

    // Set the values in the state
    const newValuesTechnical = {
      points: Technical,
    };

    setValuesTechnical(newValuesTechnical);

    console.log(newValuesTechnical);

    // Try updating the values in MongoDB
    try {
      const response = await fetch(
        `/adminDataTechnical/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValuesTechnical), // Use the newly set values directly
        }
      );

      const updatedItem = await response.json();
      console.log("Data Updated:", updatedItem);

      notifyB("Data Updated");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // ---------------------------------------------------------------------

  const gotoPreview = () => {
    navigate('/preview')
  }


  return (
    <div>


      <Header />
      <div className="resumeMainBody">
        <h1 className="resumeTitle">Resume</h1>
        {/* <button onClick={() => {gotoPreview()}}>Preview</button> */}

        <div className="academicSection section">
          <div className="sectionLabel">
            <label>Academic Qualifications</label>
          </div>
          <div className="academicInputs">
            <input type="text" placeholder="Starting year" value={year} onChange={(e) => setyear(e.target.value)} />
            <input type="text" placeholder="Ending year" value={year2} onChange={(e) => setyear2(e.target.value)} />
            <input type="text" placeholder="Degree / Certificate" value={Degree} onChange={(e) => setDegree(e.target.value)} />
            <input type="text" placeholder="Institute" value={institute} onChange={(e) => setInstitute(e.target.value)} />
            <input type="text" placeholder="Percentage" value={percentage} onChange={(e) => setpercentage(e.target.value)} />
          </div>
          <div className="academicButtons sectionButtons">
            {/* <button onClick={verify}>Confirm</button> */}
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>

        <div className="achievementsSection section">
          <div className="sectionLabel">
            <label>Achievements</label>
          </div>
          <input type="text" placeholder="Achievements" value={Achievements} onChange={(e) => setAchievements(e.target.value)} />
          <div className="achievementsButtons sectionButtons">
            {/* <button onClick={verifyAchievements}>Confirm</button> */}
            <button onClick={handleSubmitAchievements}>Submit</button>
          </div>
        </div>

        <div className="technicalSection section">
          <div className="sectionLabel">
            <label>Technical Skills</label>
          </div>
          <input type="text" placeholder="Technical Skills" value={Technical} onChange={(e) => setTechnical(e.target.value)} />
          <div className="technicalButtons sectionButtons">
            {/* <button onClick={verifyTechnical}>Confirm</button> */}
            <button onClick={handleSubmitTechnical}>Submit</button>
          </div>
        </div>

        <div className="extraSection section">
          <div className="sectionLabel">
            <label>Internships</label>
          </div>
          <input type="text" placeholder="Enter your internships" value={extra} onChange={(e) => setextra(e.target.value)} />
          <div className="extraButtons sectionButtons">
            {/* <button onClick={verifyextra}>Confirm</button> */}
            <button onClick={handleSubmitExtra}>Submit</button>
          </div>
        </div>

        <AdminDataComponent adminData={adminData} />
        {/* <Preview adminData={adminData2} /> */}

      </div>

    </div>
  )
}

export default ResumeTemplate










// adminId : {
//   type : ObjectId,
//   ref : "ADMIN"
// },

// Year : String,
// Degree_Certificate : Number,
// Institute : String,
// Percentage : String,
