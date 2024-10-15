import React from "react";
// import "./AddBrand.css";
import Header from "../../Header";

import { useState, Link, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import addpic from '../../../Images/photo.JPG'
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
      fetch("/createbrand", {
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

          //pic is not setting
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB(data.message);
            // alert(data.message)
            navigate("/");
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const post = () => {
    if (Name == "") {
      notifyA("Please enter a name of the Brand");
    } else if (Desc == "") {
      notifyA("Please enter a Desc of the Brand");
    }

    // console.log(heading,desc,price,pic)
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

      <h3 className="productInfo-heading">Add a New Brand</h3>

      <div className="appProduct">
        <div className="file-Image">
          <img
            id="output"
            className="preview"
            src={addpic}
          />
          <input
            type="file"
            accept="image/*"
            className="file"
            onChange={(event) => {
              loadFile(event);
              setPic(event.target.files[0]);
            }}
          />
        </div>

        <div className="productInfo">
          <div className="ap-input-container">
            <label htmlFor="">Brand Name</label>
            <input
              type="text"
              className=""
              placeholder="Brand name"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="ap-input-container">
            <label htmlFor="">Brand Link</label>
            <input
              type="text"
              className=""
              placeholder="Brand Link"
              value={Link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </div>

          <div className="ap-input-container">
            <label htmlFor="">Brand Identity Description</label>
            {/* <textarea name="" id=""  placeholder='Description'  onChange={(e) => { setDesc(e.target.value) }}> */}
            <textarea
              name=""
              id=""
              placeholder="Description"
              value={Desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="ap-button adt-buttons">
            <button
              onClick={() => {
                post();
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
