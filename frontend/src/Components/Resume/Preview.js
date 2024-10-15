import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js'

import './Preview.css'

function Preview() {
  const location = useLocation();
  const { adminData } = location.state || {}; // Destructure adminData from state
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const token = localStorage.getItem("jwt");


  const generatePDF = () => {
    const input = document.getElementById('pdf-content');

    if (!input) {
      console.error('Content to print not found!');
      return;
    }

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 295; // A4 height in mm
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('download.pdf');
    });
  };

  const generatePDF2 = () => {
    const doc = new jsPDF();

    // Get the HTML content
    const content = document.getElementById('pdf-content');

    if (!content) {
      console.error('Content to print not found!');
      return;
    }

    // Example: Adding each paragraph from content to the PDF
    const paragraphs = content.querySelectorAll('p');

    let yPosition = 10; // Start position on Y-axis in the PDF

    paragraphs.forEach(paragraph => {
      const text = paragraph.textContent || paragraph.innerText;
      doc.text(10, yPosition, text);
      yPosition += 10; // Move to next line
    });

    // Save the PDF with selectable text
    doc.save('download.pdf');
  };





  if (!adminData) {
    return <p>No data available to preview</p>;
  }

  return (
    <div>
      {/* Render your adminData here */}
      <h1>Preview</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: 'column'
        }}
      >
        <div id="pdf-content" style={{ width: "60%", border: "1px solid ", marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
          {/* Your existing layout here */}
          <div className="name">
            <h1 style={{ fontSize: "45px" }}>{user.name}</h1>
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

                  style={{textDecoration : 'none'}}
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
                <a style={{textDecoration : 'none'}}
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

                  style={{textDecoration : 'none'}}
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
                    {/* <th className="actionCol">Actions</th> */}
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

                        {/* <td><button onClick={() => handleDeleteAcdemic(item)}>Delete</button></td> */}
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
                      {/* <button className='ProjectDeleteBtn' onClick={() => handleDeleteProject(project)}>Delete</button> */}
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

        <div style={{ marginBottom: '20px' }}>
          <button style={{ width: '100%' }} onClick={generatePDF}>Download as PDF</button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(adminData, null, 2)}</pre> */}
    </div>
  );
}

export default Preview;
