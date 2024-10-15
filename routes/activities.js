const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()


const jwt = require("jsonwebtoken");
// const requireLogin = require("../middleWares/requireLogin");
const LOGO = mongoose.model("LOGO")
const BRAND = mongoose.model("BRAND")
const AIML  = mongoose.model("AIML")
const PROJECT = mongoose.model("PROJECT")

const ADMIN = mongoose.model("ADMIN")
const CERTIFICATE = mongoose.model("CERTIFICATE")

const requireLogin = require("../middleWares/requireLogin");

const resumeProjects = mongoose.model('resumeProject') 



// ======================================================================================================================
//for LOGO
router.post('/createLogo' ,  (req,res) => {
    const {name , desc , pic , link} = req.body;
    if(!name || !desc ||!pic || !link) {
        console.log(name,desc,pic)
        return res.status(422).json({error : "Please add all the fields"})
    }

    // console.log(req.merchant)
    // return res.json(req.merchant)


    const logo = new LOGO({
        name,
        desc,
        pic:pic,
        link,
    })

    logo.save().then((result) => {
        return res.json({logo : result})

    }).catch( err => console.log(err))
    // res.json('Item added')
})
router.get("/allLogo" , (req,res) => {
    // console.log(req.merchant._id)
    LOGO.find()
    .then(myposts => {
        res.json(myposts)
    })
})
router.delete("/deleteLogo/:logoid" , async(req , res) => {
    const logoId = req.params.logoid;

    LOGO.findOne({_id : req.params.logoid}).populate("_id")
    .then((logo) => {
        logo.deleteOne().then(result => {
            return res.json({message : "Logo Deleted"})
        })
        .catch((err) => {
            console.log("error")
        })
    })
})

// ======================================================================================================================
//for brand Identity
router.post('/createbrand' ,  (req,res) => {
    const {name , desc , pic , link} = req.body;
    if(!name || !desc ||!pic || !link) {
        console.log(name,desc,pic)
        return res.status(422).json({error : "Please add all the fields"})
    }

    // console.log(req.merchant)
    // return res.json(req.merchant)


    const brand = new BRAND({
        name,
        desc,
        pic:pic,
        link,
    })

    brand.save().then((result) => {
        return res.json({brand : result})

    }).catch( err => console.log(err))
})
router.get("/allbrand" , (req,res) => {
    // console.log(req.merchant._id)
    BRAND.find()
    .then(myposts => {
        res.json(myposts)
    })
})
router.delete("/deleteBrand/:brandid" , async(req , res) => {
    const logoId = req.params.logoid;

    BRAND.findOne({_id : req.params.brandid}).populate("_id")
    .then((brand) => {
        brand.deleteOne().then(result => {
            return res.json({message : "Brand Deleted"})
        })
        .catch((err) => {
            console.log("error")
        })
    })
})

// ================================================================================================================================
router.post('/createaiml',requireLogin ,  (req,res) => {
    const {name , desc , pic , link} = req.body;
    if(!name || !desc ||!pic || !link) {
        console.log(name,desc,pic)
        return res.status(422).json({error : "Please add all the fields"})
    }

    // console.log(req.merchant)
    // return res.json(req.merchant)


    const aiml = new AIML({
        name,
        desc,
        pic:pic,
        link,
        postedBy : req.user
    })

    aiml.save().then((result) => {
        return res.json({aiml : result})

    }).catch( err => console.log(err))
})


router.get("/allaiml" , (req,res) => {
    // console.log(req.merchant._id)
    AIML.find()
    .then(myposts => {
        res.json(myposts)
    })
})

router.get("/myposts" ,requireLogin ,(req , res) => {
    // console.log(req.user)
    AIML.find({postedBy : req.user._id})
    .populate("postedBy" , "_id name pic")
    .then(myposts => {
        res.json(myposts)
    })
})

router.delete("/deleteAiml/:aimlid" , async(req , res) => {
    const logoId = req.params.logoid;

    AIML.findOne({_id : req.params.aimlid}).populate("_id")
    .then((aiml) => {
        aiml.deleteOne().then(result => {
            return res.json({message : "aiml Project Deleted"})
        })
        .catch((err) => {
            console.log("error")
        })
    })
})


// ================================================================================================================================

router.post('/createproject',requireLogin ,  (req,res) => {
    const {name , desc , pic , link} = req.body;
    if(!name || !desc ||!pic || !link) {
        console.log(name,desc,pic)
        return res.status(422).json({error : "Please add all the fields"})
    }

    // console.log(req.merchant)
    // return res.json(req.merchant)


    const project = new PROJECT({
        name,
        desc,
        pic:pic,
        link,
        postedBy : req.user
    })

    project.save().then((result) => {
        return res.json({project : result})

    }).catch( err => console.log(err))
})


router.get("/allaiml" , (req,res) => {
    // console.log(req.merchant._id)
    AIML.find()
    .then(myposts => {
        res.json(myposts)
    })
})

router.get("/mypojects" ,requireLogin ,(req , res) => {
    // console.log(req.user)
    PROJECT.find({postedBy : req.user._id})
    .populate("postedBy" , "_id name pic")
    .then(myposts => {
        res.json(myposts)
    })
})

router.delete("/deleteProject/:aimlid" , async(req , res) => {
    const logoId = req.params.logoid;

    PROJECT.findOne({_id : req.params.aimlid}).populate("_id")
    .then((aiml) => {
        aiml.deleteOne().then(result => {
            return res.json({message : " Project Deleted"})
        })
        .catch((err) => {
            console.log("error")
        })
    })
})
// ================================================================================================================================

router.post('/createcertificate',requireLogin ,  (req,res) => {
    const {name , desc , pic , link} = req.body;
    if(!name || !desc ||!pic ) {
        console.log(name,desc,pic)
        return res.status(422).json({error : "Please add all the fields"})
    }


    const project = new CERTIFICATE({
        name,
        desc,
        pic:pic,
        postedBy : req.user
    })

    project.save().then((result) => {
        return res.json({project : result})

    }).catch( err => console.log(err))
})


router.get("/allcertificate" , (req,res) => {
    CERTIFICATE.find()
    .then(myposts => {
        res.json(myposts)
    })
})


router.get("/mycertificate" ,requireLogin ,(req , res) => {
    // console.log(req.user)
    CERTIFICATE.find({postedBy : req.user._id})
    .populate("postedBy" , "_id name pic")
    .then(myposts => {
        res.json(myposts)
    })
})


router.delete("/deleteCertificate/:aimlid" , async(req , res) => {
    const logoId = req.params.logoid;

    CERTIFICATE.findOne({_id : req.params.aimlid}).populate("_id")
    .then((aiml) => {
        aiml.deleteOne().then(result => {
            return res.json({message : " Project Deleted"})
        })
        .catch((err) => {
            console.log("error")
        })
    })
})


// ================================================================================================================================




// router.get("/getadmindata",requireLogin , async(req , res) => {

// })


router.get("/getadmindata/:adminid" ,async (req ,res) => {
    try{
    const adminId = req.params.adminid;

    const admin = await ADMIN.findById(adminId)

    // console.log(merchant.order)

    return res.json(admin)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})




router.put('/updateprofile/:productid', async (req, res) => {
    const itemId = req.params.productid;
    const updatedData = req.body;

    try {
        // Find the item by ID and update it in the database
        const updatedItem = await ADMIN.findByIdAndUpdate(itemId, updatedData, { new: true });

        res.json(updatedItem);
        // return res.json({message : "Product updated"}) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// to upload avatar image on profile
router.put("/uploadProfilePic", requireLogin, (req, res) => {
    ADMIN.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.Photo }
    }, {
        new: true
    })  .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err });
    });
})







// ==================================================================================================







module.exports = router;