import React, { useEffect, useState } from 'react'
// import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './SignUp.css'

function Recruter() {

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [accessPoint, setaccessPoint] = useState("");
    
   
    const [ip, setIp] = useState("");


    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/




    useEffect(() => {

    }, []);
  
  
  
    const postData = () => {
  
      //checking Email
      if(!emailRegex.test(email)){
          notifyA("Invalid Email")
          return
      }
  
    //   fetch("https://api.ipify.org").
    //   then((res) => res.text())
    //   .then(ip => setIp(ip))
    //   .catch(err => console.log(err))
  
      //sending data to server 
      fetch("/recruterSignup" , {
          method:"post",
          headers: {
              "Content-Type" : "application/json"
          },
          body:JSON.stringify({
              name:name,
              email:email.toLowerCase(),
              userName:userName,
              password:password,
              ip:ip,
  
          })
  
          
      }).then(res => res.json())
      .then(data => {
          if(data.error){
              notifyA(data.error)
          }else{
              notifyB(data.message)
              navigate('/signin')
          }
          
          console.log(data)})
  }




  return (
    <div className='signUp'>
      <div class="form-container">
            <h1>Recruter SignUp Page</h1>
            <div className=''>
                <div class="input-group">
                    <input type="email" name="email" id="email" placeholder="Email"  
                    value={email} onChange={(e) => { setEmail(e.target.value) }}/>
                </div>
                <div class="input-group">
                    <input type="text" name="name" id="name" placeholder="Name" 
                    value={name} onChange={(e) => { setName(e.target.value) }}/>
                </div>
                <div class="input-group">
                    <input type="text" name="userName" id="userName" placeholder="Username" 
                    value={userName} onChange={(e) => { setuserName(e.target.value) }}/>
                </div>
                <div class="input-group">
                    <input type="password" name="pass" id="pass" placeholder="Password" 
                    value={password} onChange={(e) => { setPassword(e.target.value) }}/>
                </div>

              
                <input type="submit" id="submit-btn" value="SignUp" onClick={() => {postData()}}/>
            </div>
            {/* <a href="/signin" class="signin-link">Signin</a> */}
            <Link style={{textDecoration : "none"}} class="signin-link" to={'/recreterAuthSignIn'}>
                <span>Signin</span>
            </Link>
            

        </div>
    </div>
  )
}

export default Recruter