const express = require("express");
const UserController = require("../controllers/user.controller")
const UserFollowingController = require("../controllers/user.following.unfollowing")
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

module.exports = router

