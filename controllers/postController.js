const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.post_get = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Post GET");
};

exports.post_put = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Post PUT");
};

exports.post_delete = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Post DELETE");
};

exports.post_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ timestamp: 1 }).populate("author").exec();
  res.json(posts);
});

exports.post_post = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Post POST");
};
