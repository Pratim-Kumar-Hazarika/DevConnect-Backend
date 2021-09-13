const { UserPost } = require("../models/posts.model");

exports.add_like = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const {postId} = req.body;
        await UserPost.updateOne({"_id":decodedValues.userId,"posts._id":postId},{
            "$addToSet":{
                "posts.$.likes":req.body.userWhoLikedId
            }
        })
        res.json({message:"Like Successfull !!"})
    } catch (error) {
        res.status(500).json({message:'Post like unsucessfull'})
    }
}

exports.unlike = async(req,res)=>{
    try{
        const {decodedValues} = req.user;
        const {postId} = req.body;
          await UserPost.updateOne({"_id":decodedValues.userId,"posts._id":postId},{
           "$pull":{
               "posts.$.likes":  req.body.userWhoLikedId
           }
         })
           res.json({message:"Unlike sucessfull..."})
    }catch{
      res.status(500).json({message:"Unlike not sucessfull"})
    }
  }