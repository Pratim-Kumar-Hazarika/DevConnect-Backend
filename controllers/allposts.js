const { UserPost } = require("../models/posts.model")

exports.all_posts = async(req,res)=>{ //ALL posts for the feed
  try{
      const posts = await UserPost.find({}).populate("posts.likes posts.comments._id _id")
      ///Build this later 
      ///filter out necessary details and send to client
      res.json({message:"All posts for the feed are..",posts})
  }catch{
    res.status(500).json({message:"error in getting the user post.."})
  }
}

