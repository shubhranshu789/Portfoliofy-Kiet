import React from "react";
import { useCallback, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./UpdateData.css";
import Header from "../../../Components/Header";

function UpdateData() {
  const [adminData, setadminData] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const [values, setValues] = useState({
    name: "",
    userName: "",
    aboutme: "",
    specialization: "",
    profession: "",
    Photo: "",
    InstaLink: "",
    LinkedInLink: "",
    facebookLink: "",
    mobile: "",
  });

  const userString = localStorage.getItem("user");

  // Step 2: Parse the JSON string to an object
  const userObject = JSON.parse(userString);

  // Step 3: Access the 'name' property
  const name = userObject.name;
  const adminId = userObject._id;

  const chk = () => {
    console.log(values);
  };

  useEffect(() => {
    fetch(`/getadmindata/${adminId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setValues({
          ...values,
          name: result.name,
          userName: result.userName,
          aboutme: result.aboutme,
          specialization: result.specialization,
          profession: result.profession,
          Photo: result.Photo,
          InstaLink: result.InstaLink,
          LinkedInLink: result.LinkedInLink,
          facebookLink: result.facebookLink,
          mobile: result.mobile,
          github: result.github,
        });

        setadminData(result);
        // setPosts(result)
        console.log(adminData);
      });
  }, []);

  const postDetails = () => {
    if (!image) {
      notifyA("Add a profile pic");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "shubh1234");
    fetch("https://api.cloudinary.com/v1_1/shubh1234/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          console.log(data.url);
          setUrl(data.url);
          // navigate('./');
        } else {
          console.log("URL not found in response", data);
        }
      })
      .catch((err) => console.log(err));
  };

  const postPic = () => {
    fetch("/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        Photo: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        notifyB("Profile Pic Changed");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  const updateItem = async (adminID) => {
    try {
      const response = await fetch(
        `/updateprofile/${adminID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const updatedItem = await response.json();
      notifyB("Profile Updated");
      navigate("/");
      // Handle the updated item, update component state, etc.
      // ...
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="updateMainBox">


        <h1>Personal Details</h1>
        <div className="inputBoxes">

        <strong>Photo Link : </strong>

        <div className="main-div">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
            {/* <button
              type="button"
              className="updateButton"
              onClick={() => {
                postDetails();
              }}
            >
              Update Profile Pic
            </button> */}
          </div>


          <strong>Name : </strong>
          <input
            type="text"
            className="inputField"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />

          <strong>NavBar Name : </strong>
          <input
            type="text"
            className="inputField"
            value={values.userName}
            onChange={(e) => setValues({ ...values, userName: e.target.value })}
          />
          <strong>Instagram Link : </strong>
          <input
            type="text"
            className="inputField"
            value={values.InstaLink}
            onChange={(e) =>
              setValues({ ...values, InstaLink: e.target.value })
            }
          />

          <strong>Mobile No. : </strong>
          <input
            type="text"
            className="inputField"
            value={values.mobile}
            onChange={(e) =>
              setValues({ ...values, mobile: e.target.value })
            }
          />


          <strong>Github Link : </strong>
          <input
            type="text"
            className="inputField"
            value={values.github}
            onChange={(e) =>
              setValues({ ...values, github: e.target.value })
            }
          />

          <strong>LinkedIn Link : </strong>
          <input
            type="text"
            className="inputField"
            value={values.LinkedInLink}
            onChange={(e) =>
              setValues({ ...values, LinkedInLink: e.target.value })
            }
          />
          <strong>Facebook Link : </strong>
          <input
            type="text"
            className="inputField"
            value={values.facebookLink}
            onChange={(e) =>
              setValues({ ...values, facebookLink: e.target.value })
            }
          />

          <strong>Proffesion : </strong>
          <input
            type="text"
            className="inputField"
            value={values.profession}
            onChange={(e) =>
              setValues({ ...values, profession: e.target.value })
            }
          />

          <strong>Specialization : </strong>
          <textarea
            className="textAreaField"
            value={values.specialization}
            onChange={(e) =>
              setValues({ ...values, specialization: e.target.value })
            }
          ></textarea>

          <strong>About Me : </strong>
          <textarea
            className="textAreaField"
            value={values.aboutme}
            onChange={(e) => setValues({ ...values, aboutme: e.target.value })}
          ></textarea>


          

          <br />
          <button
            type="button"
            className="updateButton"
            onClick={() => {
              updateItem(adminId);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateData;
