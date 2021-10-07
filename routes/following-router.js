const express = require('express');
const router = express.Router();
const AllFollowingController = require("../controllers/allFollowings");

router.route("/")
  .get(AllFollowingController.all_followings)

module.exports = router