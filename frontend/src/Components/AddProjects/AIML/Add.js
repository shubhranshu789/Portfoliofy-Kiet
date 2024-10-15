import React, { useState, useEffect } from "react";
import Header from "../../Header";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import addpic from "../../../Images/photo.JPG";
import "./aiml.css"; // Assuming you have an external CSS file for styles

function Add() {
  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const [Desc, setDesc] = useState("");
  const [Name, setName] = useState("");
  const [Link, setLink] = useState("");
  const [pic, setPic] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }

    if (url) {
      fetch("/createaiml", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name: Name,
          desc: Desc,
          pic: url,
          link: Link,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB(data.message);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const post = () => {
    if (Name === "") {
      notifyA("Please enter the Project Name");
      return;
    }
    if (Desc === "") {
      notifyA("Please enter the Project Description");
      return;
    }

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "ProtFolioMaker");
    data.append("cloud_name", "shubh1234");
    fetch("https://api.cloudinary.com/v1_1/shubh1234/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div className="add-container">
        <h3 className="add-title">Add a New AI/ML Project</h3>

        <div className="add-form">
          <div className="image-upload">
            <img id="output" className="preview-image" src={addpic} alt="Preview" />
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={(event) => {
                loadFile(event);
                setPic(event.target.files[0]);
              }}
            />
          </div>

          <div className="form-fields">
            <div className="input-group">
              <label htmlFor="project-name">Project Name</label>
              <input
                id="project-name"
                type="text"
                placeholder="Enter project name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="project-link">Project Link</label>
              <input
                id="project-link"
                type="text"
                placeholder="Enter project link"
                value={Link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="project-desc">Project Description</label>
              <textarea
                id="project-desc"
                placeholder="Enter project description"
                value={Desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <button className="submit-button" onClick={post}>
              Submit Project
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Add;
