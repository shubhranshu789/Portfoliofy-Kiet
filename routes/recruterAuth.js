const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()

const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")


const ADMIN = mongoose.model("ADMIN");
const USER = mongoose.model("USER");
const RECRUTER= mongoose.model("RECRUTER");


const {Jwt_secret} = require("../keys");

router.post("/recruterSignup" , (req,res)=> {
    const {name , userName , password ,email} = req.body;
    const ip = req.headers['cf-connecting-ip'] ||
                req.headers['x-real-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress || '' ;


    if(!name ||!userName ||!password ||!email ) {
        return res.status(422).json({error : "Please add all the fields"})
    }

    RECRUTER.findOne({$or : [{email : email} , {userName: userName} ]}).then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error : "user already exist with that email or userName"})
        }


        bcryptjs.hash(password , 12).then((hashedPassword) => {
            const admin = new RECRUTER ({
                name , 
                userName , 
                email,    
                password:hashedPassword, //hiding password,
                ip,
            })
        
            admin.save()
            .then(admin => {res.json({message : "Data Saved"})})
            .catch(err => {console.log(err)})
        })
    })
})


router.post("/recruterSignIn" , (req , res) => {
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(422).json({error: "please add all the fields"})
    }

    RECRUTER.findOne({email:email}).then((savedUser) => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email"})
        }
        bcryptjs.compare(password , savedUser.password).then((match) => {
            if(match){
                // return res.status(200).json({message :"Signed In Successufully" })
                const token = jwt.sign({_id:savedUser.id} , Jwt_secret)
                const {_id ,name , email , userName} = savedUser
                res.json({token , user:{_id ,name , email , userName }})
                console.log({token , user:{_id ,name , email , userName}})
            }else{
                return res.status(422).json({error :"Invalid password" })
            }
        })
        .catch(err => console.log(err))
        // console.log(savedUser)
    })
})


module.exports = router;