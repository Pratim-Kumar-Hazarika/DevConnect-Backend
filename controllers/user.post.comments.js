const {UserPost} = require("../models/posts.model");

exports.add_comment = async(req, res) => {
    try {
        const {decodedValues} = req.user;
        const {postId} = req.body;
        ///For children comments
        if (req.body.childrenComment) {
            await UserPost.updateOne({
                "_id": req.body.postBelongingToUserId,
                "posts._id": postId
            }, {
                "$push": {
                    "posts.$[].comments.$[elem].childrenComments": {
                        "_id": req.body.commenterId, ///come from token
                        "comment": req.body.childrenComment
                    }
                }
            }, {
                "arrayFilters": [
                    {
                        "elem._id": req.body.parrentCommentId
                    }
                ],
                multi: true
            })
        }else{
            ///For parrent Comment
            await UserPost.updateOne({
                "_id": req.body.postBelongingToUserId,
                "posts._id": postId
            },{
                "$push":{
                    "posts.$.comments":{
                        "_id": decodedValues.userId,
                        "parrentComment": req.body.parrentComment
                    }
                }
            })
        }

        res.json({message: "Comment Successfull!!"})

    } catch (error) {
        res .status(500).json({message: "Comment Unsucessfull "})
    }
}

exports.delete_comment = async(req, res) => { //Delete Comment //Build this later
    try {
        const {decodedValues} = req.user;
        const {postId} = req.body;
        await UserPost.updateOne({
            "_id": decodedValues.userId,
            "posts._id": postId
        }, {
            "$pull": {
                "posts.$.comments": {
                    "_id": req.body.commenterId
                }
            }
        })
        res.json({message: "Comment deleted sucessfully"})
    } catch {
        res
            .status(500)
            .json({message: "Comment was not deleted"})
    }
}