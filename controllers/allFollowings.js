const { UserFollowing } = require("../models/following.model")

exports.all_followings = async(req, res) => { //ALL posts for the feed
    try {
        const followings = await UserFollowing.find({}).populate("following")
        const allFollowings = followings.map((person) => ({
            _id: person._id,
            userDetails: person
                .following
                .map((person) => ({
                    _id: person._id,
                    name: person.name,
                    username: person.username,
                    profilePicture: person.profilePicture,
                    website: person.website,
                    profileBio: person.profileBio,
                    gender: person.gender

                }))
        }))
        // /Build this later /don't send all followings /supoose there are billion
        // followings
        res.json({message: "All followings are", allFollowings})
    } catch {
        res .status(500)
            .json({message: "error in getting all the followings"})
    }
}
