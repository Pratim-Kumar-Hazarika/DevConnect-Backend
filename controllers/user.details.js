const { User } = require("../models/user.model")
const {cloudinary} = require("../cloudinary/cloudinary")

exports.sendDetails = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const {name,username,gender,profileBio,profilePicture,website,email} = await User.findById(decodedValues.userId)
       
        res.json({message:"User profile details are", profileDetails :{
            name : name,
            username:username,
            gender:gender,
            profileBio:profileBio,
            profilePicture:profilePicture,
            website:website,
            email : email,
            userId:decodedValues.userId
        }})
    } catch (error) {
        res.json({message:"UserProfile details not send !"})
    }
}

exports.updateDetails = async(req,res)=>{
    const {decodedValues} = req.user;
    try {
        const image = req.body.profilePicture;
          const uplodedResponse = await cloudinary.uploader.upload(image,{
            upload_preset:"dev_setups"
            })
        await User.updateOne({"_id":decodedValues.userId},{
            "$set":{
                "name":req.body.name,
                "username":req.body.username,
                "profilePicture": uplodedResponse.secure_url ,
                "profileBio":req.body.profileBio,
                "gender":req.body.gender,
                "website":req.body.website
            }
        })
        res.json({message:"User details updated"})
    } catch (error) {
        res.json({message:"User details not updated"})
    }
}