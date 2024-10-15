const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types



const certificateSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    desc:{
        type: String,
        require:true
    },
    pic : {
        type:String,
        require : true,
        // default : "no photo"
    },
    postedBy:{
        type : ObjectId,
        ref : "ADMIN"
    }
})

mongoose.model("CERTIFICATE" , certificateSchema)