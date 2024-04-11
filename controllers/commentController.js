const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.comment_get = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment GET");
};

exports.comment_delete = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment DELETE");
};

exports.comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postid })
    .sort({ timestamp: 1 })
    .exec();

  res.json(comments);
});

exports.comment_post = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment POST");
};
