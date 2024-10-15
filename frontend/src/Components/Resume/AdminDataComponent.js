import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";

import "./AdminDataComponent.css";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Preview from "./Preview";

function AdminDataComponent({ adminData }) {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const token = localStorage.getItem("jwt");

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [points, setPoints] = useState([""]); // Start with one empty point

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const gotoPreview = () => {
    navigate("/preview", { state: { adminData } });
  };

  const handleAddPoint = () => {
    setPoints([...points, ""]);
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/addProject/${user._id}`,
        {
          title,
          points: points.map((point) => `- ${point}`),
        }
      );
      // alert("Project added successfully!");
      window.location.reload();
      notifyB("Project Added");
    } catch (error) {
      console.error(error);
      alert("Failed to add project");
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    if (!input) {
      console.error("Content to print not found!");
      return;
    }

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 295; // A4 height in mm
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    });
  };

  const print = () => {
    console.log(adminData);
  };

  const getParticualrId = (particulaId) => {
    console.log(particulaId);
  };

  const handleDeleteAcdemic = async (itemToDelete) => {
    // Ensure the item to delete is passed
    if (!itemToDelete) {
      console.log("Please provide the item to delete");
      return;
    }

    // Log the item to delete for debugging
    console.log("Item to delete:", itemToDelete);

    // Try deleting the item from MongoDB
    try {
      const response = await fetch(
        `/adminDataDelete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToDelete), // Send the item to delete in the request body
        }
      );

      const deletedItem = await response.json();
      console.log("Item Deleted:", deletedItem);

      // Handle the UI or state updates if necessary after the deletion
      // notifyB("Item Deleted");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteAchievement = async (itemToDelete) => {
    // Ensure the item to delete is passed
    if (!itemToDelete) {
      console.log("Please provide the item to delete");
      return;
    }

    // Log the item to delete for debugging
    console.log("Item to delete:", itemToDelete);

    // Try deleting the item from MongoDB
    try {
      const response = await fetch(
        `/adminAchievementDelete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToDelete), // Send the item to delete in the request body
        }
      );

      const deletedItem = await response.json();
      console.log("Item Deleted:", deletedItem);

      // Handle the UI or state updates if necessary after the deletion
      // notifyB("Item Deleted");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteTecnical = async (itemToDelete) => {
    // Ensure the item to delete is passed
    if (!itemToDelete) {
      console.log("Please provide the item to delete");
      return;
    }

    // Log the item to delete for debugging
    console.log("Item to delete:", itemToDelete);

    // Try deleting the item from MongoDB
    try {
      const response = await fetch(
        `/adminTechnicalDelete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToDelete), // Send the item to delete in the request body
        }
      );

      const deletedItem = await response.json();
      console.log("Item Deleted:", deletedItem);

      // Handle the UI or state updates if necessary after the deletion
      // notifyB("Item Deleted");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteExtra = async (itemToDelete) => {
    // Ensure the item to delete is passed
    if (!itemToDelete) {
      console.log("Please provide the item to delete");
      return;
    }

    // Log the item to delete for debugging
    console.log("Item to delete:", itemToDelete);

    // Try deleting the item from MongoDB
    try {
      const response = await fetch(
        `/adminExtraDelete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToDelete), // Send the item to delete in the request body
        }
      );

      const deletedItem = await response.json();
      console.log("Item Deleted:", deletedItem);

      // Handle the UI or state updates if necessary after the deletion
      // notifyB("Item Deleted");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteProject = async (itemToDelete) => {
    // Ensure the item to delete is passed
    if (!itemToDelete) {
      console.log("Please provide the item to delete");
      return;
    }

    // Log the item to delete for debugging
    console.log("Item to delete:", itemToDelete);

    // Try deleting the item from MongoDB
    try {
      const response = await fetch(
        `/adminProjectDelete/${user._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToDelete), // Send the item to delete in the request body
        }
      );

      const deletedItem = await response.json();
      console.log("Item Deleted:", deletedItem);

      // Handle the UI or state updates if necessary after the deletion
      // notifyB("Item Deleted");
      // navigate('/');
      window.location.reload(); // Optional depending on what you need
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <form
        style={{
          border: "1px solid #ddd",
          borderRadius: "20px",
          backgroundColor: "#fff",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ marginTop: "20px" }}>
          <label style={{ marginTop: "30px", fontSize: "1.5rem" }}>
            Project Title
          </label>
          <input
            style={{ width: "90%" }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your Project "
            required
          />
        </div>

        <div>
          <label style={{ fontSize: "1.5rem" }}>Project Points</label>
          {points.map((point, index) => (
            <div key={index}>
              <input
                style={{ width: "90%" }}
                type="text"
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                placeholder="Add your Points"
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddPoint}>
            Add Point
          </button>
        </div>

        <button style={{ marginTop: "20px" }} type="submit">
          Add Project
        </button>
        <br />
        <br />
      </form>

      {/* <h2>Admin Data</h2> */}

      <br />
      <br />
      <br />
      <br />

      <div>
        <div id="">
          {/* Your existing layout here */}
          <div className="name">
            <h1 style={{ fontSize: "45px" }}>{adminData.name}</h1>
            <div className="line"></div>
          </div>
          <div className="contact-info">
            <p>
              Mobile:{" "}
              {adminData.mobile ? (
                <a
                  href={adminData.mobile}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {adminData.mobile}
                </a>
              ) : (
                "No Phone no. provided"
              )}
            </p>
            <p>Email: {user.email}</p>
            <p>
              LinkedIn:{" "}
              {adminData.LinkedInLink ? (
                <a
                  href={adminData.LinkedInLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {adminData.LinkedInLink}
                </a>
              ) : (
                "No LinkedIn link provided"
              )}
            </p>
          </div>

          <div className="github-profile">
            <p>
              Github:{" "}
              {adminData.github ? (
                <a
                  href={adminData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {adminData.github}
                </a>
              ) : (
                "No LinkedIn link provided"
              )}
            </p>
          </div>

          {/* ------------------------------------------------ Education ------------------------------------------------------------------------ */}

          <div className="education">
            <h2>Education</h2>
            <div className="line"></div>
            <div className="eduTable">
              <table border="1">
                <thead>
                  <tr>
                    <th className="yearCol">Year</th>
                    <th className="degreeCol">Degree/Certificate</th>
                    <th className="instituteCol">Institute</th>
                    <th className="percentageCol">Percentage%</th>
                    <th className="actionCol">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.Academic && adminData.Academic.length > 0 ? (
                    adminData.Academic.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.Year} {item.Year2 ? ` - ${item.Year2}` : ""}
                        </td>
                        <td>{item.Degree_Certificate}</td>
                        <td>{item.Institute}</td>
                        <td>{item.Percentage}</td>

                        <td>
                          <button onClick={() => handleDeleteAcdemic(item)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No academic information provided</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ------------------------------------------------ Education ------------------------------------------------------------------------ */}

          {/* ------------------------------------------------ Technical ------------------------------------------------------------------------ */}

          <div className="technical-skills">
            {adminData.Technical && adminData.Technical.length > 0 && (
              <section>
                <h2>Technical Skills</h2>
                <div className="line"></div>
                <div style={{ marginLeft: "-20px" }}>
                  <ul>
                    {adminData.Technical.map((item, index) => (
                      <li key={index} className="achievementItem">
                        <div style={{ display: "flex", gap: "10px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            {index + 1}.
                          </span>
                          <span>{item.points}</span>
                        </div>
                        <div>
                          <button onClick={() => handleDeleteTecnical(item)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          {/* <button onClick={() => {}}>Update</button> */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
            {!adminData.Technical || adminData.Technical.length === 0 ? (
              <ul>{/* <li>No technical skills provided</li> */}</ul>
            ) : null}
          </div>

          {/* ------------------------------------------------ Technical ------------------------------------------------------------------------ */}

          {/* ------------------------------------------------ Extra Curricular ------------------------------------------------------------------------ */}

          <div className="extra-curricular">
            {adminData.Extra && adminData.Extra.length > 0 && (
              <section>
                <h2>Internships</h2>
                <div className="line"></div>
                <ul style={{ marginLeft: "-20px" }}>
                  {adminData.Extra.map((item, index) => (
                    <li key={index} className="achievementItem">
                      <div style={{ display: "flex", gap: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>{index + 1}.</span>
                        <span>{item.points}</span>
                      </div>
                      <div>
                        <button onClick={() => handleDeleteExtra(item)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        {/* <button onClick={() => {}}>Update</button> */}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {!adminData.Extra || adminData.Extra.length === 0 ? (
              <ul>{/* <li>No extra-curricular activities provided</li> */}</ul>
            ) : null}
          </div>

          {/* ------------------------------------------------ Extra Curricular ------------------------------------------------------------------------ */}

          {/* ------------------------------------------------ Projects ------------------------------------------------------------------------ */}

          <div className="ResumeProjects">
            <h2>Projects</h2>
            <div style={{ marginBottom: "5px" }} className="line"></div>
            {adminData.Projects && adminData.Projects.length > 0 ? (
              adminData.Projects.map((project, index) => (
                <div
                  key={project._id}
                  style={{
                    marginBottom: "20px",
                    margin: "0px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <h3 style={{ margin: "0px" }}>
                    {index + 1}. {project.title}
                  </h3>
                  <div
                    className="achievementItem"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>
                      <ul style={{ marginTop: "1px" }}>
                        {project.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <button onClick={() => handleDeleteProject(project)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </div>

          {/* ------------------------------------------------ Projects ------------------------------------------------------------------------ */}

          {/* ------------------------------------------------ Achievements ------------------------------------------------------------------------ */}

          <div className="ResumeAchievements">
            {adminData.Achievements && adminData.Achievements.length > 0 && (
              <section>
                <h2 style={{ marginTop: "-15px" }}>Achievements</h2>
                <div className="line"></div>
                <ul className="ResumeAchievementsul" style={{ width: "102%" }}>
                  {adminData.Achievements.map((item, index) => (
                    <li key={index} className="achievementItem">
                      <div style={{ display: "flex", gap: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>{index + 1}.</span>
                        <span>{item.points}</span>
                      </div>
                      <div>
                        <button onClick={() => handleDeleteAchievement(item)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {!adminData.Achievements || adminData.Achievements.length === 0 ? (
              <ul>
                {/* <li>No achievements provided</li> */}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ Achievements ------------------------------------------------------------------------ */}

      {/* You can render adminData here */}
      {/* <pre>{JSON.stringify(adminData, null, 2)}</pre> */}

      {/* <button
        onClick={() => {
          print();
        }}
      >
        Print Data
      </button> */}

      {/* About Me Section */}

      {/* <button onClick={generatePDF}>Download as PDF</button> */}
      <button
        style={{ background: "#5a67d8", color: "black" }}
        onClick={gotoPreview}
      >
        Preview
      </button>

      {/* ======================================================================================================================== */}

      {/* ======================================================================================================================== */}
    </div>
  );
}

export default AdminDataComponent;
