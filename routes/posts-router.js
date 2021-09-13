///For feed
const express = require('express');
const router = express.Router();
const AllPostsController = require("../controllers/allposts");

router.route("/")
  .get(AllPostsController.all_posts)

module.exports = router