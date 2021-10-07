const express = require('express');
const router = express.Router();
const AllFollowersController = require("../controllers/allFollowers");

router.route("/")
  .get(AllFollowersController.all_followers)

module.exports = router