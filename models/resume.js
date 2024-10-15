const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types



const resumeSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    Academic: [
        {
            adminId : {
                type : ObjectId,
                ref : "ADMIN"
            },

            Year : String,
            Degree_Certificate : String,
            Institute : String,
            Percentage : String,
            
        }
    ],

    postedBy:{
        type : ObjectId,
        ref : "ADMIN"
    }
})

mongoose.model("RESUME" , resumeSchema)