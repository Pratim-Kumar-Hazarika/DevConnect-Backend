const express = require("express");
const UserController = require("../controllers/user.controller")
const UserFollowingController = require("../controllers/user.following.unfollowing")
const UserPostController = require("../controllers/user.post")
const UserPostCommentController = require("../controllers/user.post.comments")
const router = express.Router()

const {userLogger} = require("../middlewares/authHandler")
 
router.route("/")
.get(UserController.get_all_users)

router.route("/signup")
.post(UserController.add_user)

router.route("/login")
.post(UserController.user_login)

router.use(userLogger)

router.route("/following")
.get(UserFollowingController.get_all_followers)
.post(UserFollowingController.add_following_and_follower)

router.route("/unfollow")
.post(UserFollowingController.remove_following_and_follower)

router.route("/post")
.get(UserPostController.user_posts)
.post(UserPostController.create_post)

router.route("/post/delete")
.post(UserPostController.delete_post)

router.route("/post/comment")
.post(UserPostCommentController.add_comment);

router.route("/post/comment/delete")
.post(UserPostCommentController.delete_comment);

module.exports = router

