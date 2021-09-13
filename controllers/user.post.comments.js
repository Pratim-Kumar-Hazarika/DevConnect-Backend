const { UserPost } = require("../models/posts.model");

exports.add_comment = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const {postId} = req.body;
        await UserPost.updateOne({"_id":decodedValues.userId,"posts._id":postId},{
            "$push":{
                "posts.$.comments":{"_id":req.body.commenterId,"text":req.body.text,"commentorName":decodedValues.name}
            }
        })
        res.json({message:"Comment Successfull!!"})
        
    } catch (error) {
        res.status(500).json({message:"Comment Unsucessfull "})
    }
}

exports.delete_comment = async(req,res)=>{ //Delete Comment
    try{
        const {decodedValues} = req.user;
        const {postId} = req.body;
         await UserPost.updateOne({"_id":decodedValues.userId,"posts._id":postId},{
           "$pull":{
               "posts.$.comments": {"_id": req.body.commenterId}
           }
         })
         res.json({message:"Comment deleted sucessfully"})
    }catch{
      res.status(500).json({message:"Comment was not deleted"})
    }
  }