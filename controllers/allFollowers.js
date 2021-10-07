const {UserFollower} = require("../models/follower.model")

exports.all_followers = async(req, res) => { //ALL posts for the feed
    try {
        const followers = await UserFollower
            .find({})
            .populate("followers")
        const allFollowers = followers.map((person) => ({
            _id: person._id,
            userDetails: person
                .followers
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
        // /Build this later /don't send all followers /supoose there are billion
        // followers
        res.json({message: "All followers are", allFollowers})
    } catch {
        res
            .status(500)
            .json({message: "error in getting all the followers"})
    }
}
