const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types



const projectSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    desc:{
        type: String,
        require:true
    },
    link:{
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

mongoose.model("PROJECT" , projectSchema)