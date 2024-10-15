import React from 'react'
import './AddLogo.css'
import Header from '../../Components/Header'

import { useState, Link, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
// import addpic from '../../../Images/photo.JPG'
import addpic from '../../Images/photo.JPG'




function AddLogo() {
  const loadFile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  
  useEffect(() => {
    const token = localStorage.getItem("jwt");
      if(!token){
        navigate('/signin')
      }
  }, []);


  const navigate = useNavigate()

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)



  const [logoDesc, setlogoDesc] = useState('');
  const [logoName, setlogoName] = useState('');
  const [logoLink , setlogoLink] = useState('');
  const [pic, setPic] = useState('');

  const [url, setUrl] = useState("");


  useEffect(() => {

    



    if (url) {
      fetch("/createLogo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          name: logoName,
          desc: logoDesc,
          pic: url,
          link: logoLink


          //pic is not setting 

        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB(data.message)
            // alert(data.message)
            navigate('/')
          }
          console.log(data)
        })
        .catch(err => console.log(err))
    }

  }, [url]);



  const post = () => {


    if(logoName == ''){
      notifyA("Please enter a name of the Logo")
    }
    else if(logoDesc == ''){
      notifyA("Please enter a Desc of the Logo")
    }


    // console.log(heading,desc,price,pic)
    const data = new FormData()
    data.append("file", pic)
    data.append("upload_preset", "ProtFolioMaker")
    data.append("cloud_name", "shubh1234")
    fetch("https://api.cloudinary.com/v1_1/shubh1234/image/upload", {
      method: "post",
      body: data
    }).then(res => (res.json()))
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
  }




  return (
    <div>
      <Header/>
      
      <h3 className='productInfo-heading'>Add a New Blog</h3>

      <div className="appProduct">


<div className="file-Image">
  <img id="output" className='preview' 
  src={addpic} />
  <input type="file" accept='image/*' className='file'
    onChange={
      (event) => {
        loadFile(event)
        setPic(event.target.files[0])
      }} />
</div>

<div className="productInfo">
  <div className="ap-input-container">
    <label htmlFor="">Logo Name</label>
    <input type="text" className='' placeholder='Logo name' value={logoName} onChange={(e) => {setlogoName(e.target.value)}} />
  </div>
  <div className="ap-input-container">
    <label htmlFor="">Logo Link</label>
    <input type="text" className='' placeholder='Logo Link' value={logoLink} onChange={(e) => {setlogoLink(e.target.value)}} />
  </div>


 


  <div className="ap-input-container">
    <label htmlFor="">Logo Description</label>
    {/* <textarea name="" id=""  placeholder='Description'  onChange={(e) => { setDesc(e.target.value) }}> */}
    <textarea name="" id=""  placeholder='Description' value={logoDesc} onChange={(e) => {setlogoDesc(e.target.value)}}>
    </textarea>
  </div>

  <div className="ap-button adt-buttons">
<button onClick={() => {post() }}>Post</button>
</div>
  
</div>




</div>


    </div>
  )
}

export default AddLogo