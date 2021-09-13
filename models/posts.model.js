const mongoose = require("mongoose");
const {Schema} = mongoose;

const postSchema = new Schema({
    _id :{type: mongoose.Schema.Types.ObjectId, auto: true },
    caption :String,
    image :String,
    comments :[{
        text :String,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    likes :[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        }
    ]
})

const userPostSchema = new Schema({
    _id:{
      type :mongoose.Schema.Types.ObjectId,
      ref :"User",
      required:true
    },
    posts:[postSchema]
  })
  const UserPost = mongoose.model("UserPost", userPostSchema);

  module.exports = { UserPost}