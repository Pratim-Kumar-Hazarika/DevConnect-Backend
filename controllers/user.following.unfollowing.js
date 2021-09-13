const {UserFollower} = require("../models/follower.model");
const { UserFollowing} = require("../models/following.model");

exports.get_all_followers = async (req, res) => {
    try {
        const {decodedValues} = req.user;
        const userFollowings = await UserFollowing.findById(decodedValues.userId).populate("following")
        res.json({
            message: "User Followings are..",
            userFollowings
        })
    } catch (error) {
        res.status(500).json({
            message: "Error occured while getting the user followings"
        })
    }
}

exports.add_following_and_follower = async (req, res) => {
    try {
        const {decodedValues} = req.user;
        const userFollowing = await UserFollowing.findById(decodedValues.userId)
        const incomingUserFollowers = await UserFollower.findById(req.body.userId)
        if (userFollowing === null) {
            const AddFollowingToUser = new UserFollowing({
                _id: decodedValues.userId,
                following: [req.body.userId]
            })
            await AddFollowingToUser.save()
        }
        if(incomingUserFollowers === null){
            const AddFollowerToFollowedUser = new UserFollower({
                _id: req.body.userId,
                followers: [decodedValues.userId]
            })
            await AddFollowerToFollowedUser.save()
        }
    
            await UserFollowing.updateOne({
                "_id": decodedValues.userId
            }, {
                "$addToSet": {
                    "following": req.body.userId
                }
            });
            await UserFollower.updateOne({
                "_id": req.body.userId
            }, {
                "$addToSet": {
                    "followers": decodedValues.userId
                }
            });
        
        return res.json({
            message: "Follower added to followed user and Following of user is sucessfull"
        })

    } catch (error) {
        res.status(500).json({
            message: "Error occured while adding follower"
        })
    }
}

exports.remove_following_and_follower = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const userFollowing = await UserFollowing.findById(decodedValues.userId)
        await userFollowing.following.remove(req.body.userId)
        await userFollowing.save()

        const unfollowedUser = await UserFollower.findById(req.body.userId)
        await unfollowedUser.followers.remove(decodedValues.userId)
        await unfollowedUser.save()

        res.json({message:"Unfollow and removing of follower successfull!!"})
    } catch (error) {
        res.status(500).json({message:"Error occured while unfollowing and removing the follower"})
    }
}