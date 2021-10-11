const { UserPost } = require("../models/posts.model");

exports.add_like = async(req,res)=>{
    try {
        await UserPost.updateOne({"_id":req.body.postBelongingToUserId,"posts._id":req.body.postId},{
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
          await UserPost.updateOne({"_id":req.body.postBelongingToUserId,"posts._id":req.body.postId},{
           "$pull":{
               "posts.$.likes":  req.body.userWhoUnLikedId
           }
         })
           res.json({message:"Unlike sucessfull..."})
    }catch{
      res.status(500).json({message:"Unlike not sucessfull"})
    }
  }