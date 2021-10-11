const mongoose = require("mongoose");
const {Schema} = mongoose;

const postSchema = new Schema({
    _id :{type: mongoose.Schema.Types.ObjectId, auto: true },
    caption :String,
    image :String,
    flag:String,
    comments :[{
        parrentComment :String,
        _id:{
            type :mongoose.Schema.Types.ObjectId,
            ref :"User",
            required:true
          },
        childrenComments:[
            {
              comment:String,
              _id:{
                type :mongoose.Schema.Types.ObjectId,
                ref :"User",
                required:true
              },
            }
        ]
    }],
    likes :[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        }
    ]
},{
  timestamps : true
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