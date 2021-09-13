const mongoose = require("mongoose")

const  userFollowersSchema = mongoose.Schema({
    _id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})

const UserFollower = mongoose.model("UserFollower",userFollowersSchema)

module.exports = { UserFollower }