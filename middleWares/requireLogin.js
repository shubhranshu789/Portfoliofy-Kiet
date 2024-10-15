const jwt = require("jsonwebtoken")
const {Jwt_secret} = require('../keys')
const mongoose = require('mongoose')
// const MERCHANT= mongoose.model("MERCHANT")
const ADMIN = mongoose.model("ADMIN")







module.exports = (req,res , next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error : "you must have login1"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token,Jwt_secret , (err , payload)=>{
        if(err){
            console.log(err)
            return res.status(401).json({error : "you must have login2"})
        }
        const {_id} = payload
        ADMIN.findById(_id).then(userData=>{
            // console.log(userData)
            req.user = userData
            next()
        })
    })
}