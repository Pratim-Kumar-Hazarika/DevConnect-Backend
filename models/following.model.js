const mongoose = require("mongoose")

const  userFollowingSchema = mongoose.Schema({
    _id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
})

const UserFollowing = mongoose.model("UserFollowing",userFollowingSchema)

module.exports = { UserFollowing }