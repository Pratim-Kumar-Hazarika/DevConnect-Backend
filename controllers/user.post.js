const { UserPost } = require("../models/posts.model");

exports.user_posts = async(req,res)=>{ 
    try{
        const {decodedValues} = req.user;
        const userPosts = await UserPost.findById(decodedValues.userId).populate("posts.comments._id posts.likes")
        res.json({message:"User posts are..",userPosts})
    }catch{
      res.status(500).json({message:"Error occured while getting the user posts!!"})
    }
  }

  exports.create_post = async(req,res)=>{
      try {
        const {decodedValues} = req.user;
        const userPosts = await UserPost.findById(decodedValues.userId)
        if(userPosts === null){
            const NewPost = new UserPost({
                _id : decodedValues.userId,
                posts:[req.body]
            })
            await NewPost.save()
        }else{
            await UserPost.updateOne({"_id":decodedValues.userId},{
                "$addToSet":{
                    "posts":req.body
                }
            })
        }
        res.json({message:"Creation of post is successfull !!!"})

      } catch (error) {
          res.status(500).json({message:"Error occured while creating a post"})
      }
  }

  exports.delete_post = async(req,res)=>{ // Delete a Post
    try{
        const {decodedValues} = req.user;
      await UserPost.updateOne({"_id":decodedValues.userId},{
        "$pull":{
          "posts":{
            "_id":req.body.postId
          }
        }
      })
      res.json({message:"Post deleted sucessfully"})
    }catch{
      res.status(500).json({message:"Post not deleted.."})
    }
  }