const Comment = require("../models/comment");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.comment_get = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentid).exec();
  if (comment === null) {
    // No results.
    const err = new Error("Comment not found.");
    err.status = 404;
    return next(err);
  }
  res.json(comment);
});

exports.comment_delete = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentid).exec();
  if (comment === null) {
    // No results.
    const err = new Error("Comment not found.");
    err.status = 404;
    return next(err);
  }

  await comment.deleteOne();
  res.send("Comment deleted.");
});

exports.comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postid })
    .sort({ timestamp: 1 })
    .exec();
  res.json(comments);
});

exports.comment_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();
  if (post === null) {
    // No results.
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  }

  const comment = new Comment({
    post: post,
    username: req.body.username,
    text: req.body.text,
    timestamp: Date.now(),
  });

  await comment.save();
  res.send("New comment saved.");
});
