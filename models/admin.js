const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const adminSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    userName:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    //add IP
    ip:{
        type: String,
        require:true
        
    },


    phoneNo:{
        type: Number,
        require:true
    },
    year:{
        type: String,
        require:true
    },
    branch:{
        type: String,
        require:true   
    },


    accesspoint:{
        type: String,
        require:true
        
    },
    specialization:{
        type: String,
        require:true,
        default : "I specialize in crafting seamless digital experiences that blend aesthetic appeal with functional efficiency. With a strong foundation in both design and development, I create intuitive interfaces that prioritize user engagement and satisfaction."
    },
    aboutme:{
        type: String,
        require:true,
        default : "Nisl arcu, scelerisque neque ut. Tincidunt amet, tempor duis tortor neque auctor dis ipsum. Pretium cras amet odio amet eleifend id sed cras sed. Aliquet risus posuere aliquet imperdiet sit."
    },
    profession:{
        type: String,
        require:true,
        default : "UI/UX"
    },
    Photo:{
        type: String,
        require:true,
        default : "https://res-console.cloudinary.com/shubh1234/thumbnails/v1/image/upload/v1718379609/dG15ZDR5dDBiZWh4azd4N2xmaWM=/drilldown"
    },
    InstaLink:{
        type: String,
        require:true,
        default : ""
    },
    LinkedInLink:{
        type: String,
        require:true,
        default : ""
    },
    facebookLink:{
        type: String,
        require:true,
        default : ""
    },
    mobile:{
        type: String,
        require:true     
    },

    github:{
        type: String,
        require:true     
    },

    Academic: [
        {
            adminId : {
                type : ObjectId,
                ref : "ADMIN"
            },

            Year : String,
            Year2 : String,
            Degree_Certificate : String,
            Institute : String,
            Percentage : String,
        }
    ],
    Achievements: [
        {
            adminId : {
                type : ObjectId,
                ref : "ADMIN"
            },

            points : String,
            
        }
    ],

    Technical: [
        {
            adminId : {
                type : ObjectId,
                ref : "ADMIN"
            },

            points : String,
            
        }
    ],

    Extra: [
        {
            adminId : {
                type : ObjectId,
                ref : "ADMIN"
            },

            points : String,
            
        }
    ],


    Projects : [
        {
            title: String,
            points: [String]
        }
    ]



})

mongoose.model("ADMIN" , adminSchema)