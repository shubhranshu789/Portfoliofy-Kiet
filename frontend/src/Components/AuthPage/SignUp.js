import React, { useEffect, useState } from "react";
// import './SignUp.css'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [accessPoint, setaccessPoint] = useState("");

  const [loading, setLoading] = useState(false);

  const [ip, setIp] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {}, []);

  const postData = () => {
    setLoading(true); // Start loading

    // Checking Email
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      setLoading(false); // Stop loading
      return;
    }

    // Sending data to server
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email.toLowerCase(),
        userName: userName,
        password: password,
        ip: ip,
        accesspoint: accessPoint,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false); // Stop loading when request is completed
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      })
      .catch((err) => {
        setLoading(false); // Stop loading if there's an error
        console.error(err);
      });
  };

  return (
    <div className="signUp">
      <div class="form-container">
        <h1>Admin SignUp Page</h1>
        <div className="">
          <div class="input-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div class="input-group">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div class="input-group">
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
          </div>
          <div class="input-group">
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div class="input-group">
            <input
              type="text"
              name="pass"
              id="pass"
              placeholder="Access Point"
              value={accessPoint}
              onChange={(e) => {
                setaccessPoint(e.target.value);
              }}
            />
          </div>
          {/* <input type="submit" id="submit-btn" value="SignUp" onClick={() => {postData()}}/> */}

          {/* <div>
            <input
              type="submit"
              id="submit-btn"
              value={loading ? "Signing Up..." : "SignUp"}
              onClick={postData}
              disabled={loading} // Disable button when loading
            />
            {loading && <div className="spinner"></div>}{" "}
            Optional: Show spinner next to button
          </div> */}

          <div>
            {!loading ? (
              <input
                type="submit"
                id="submit-btn"
                value="SignUp"
                onClick={postData}
              />
            ) : (
              <div className="spinner"></div>
            )}
          </div>


          
        </div>
        {/* <a href="/signin" class="signin-link">Signin</a> */}
        <Link
          style={{ textDecoration: "none" }}
          class="signin-link"
          to={"/signin"}
        >
          <span>Signin</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
