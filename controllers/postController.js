const Post = require("../models/post");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.login_get = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Login POST.");
};

exports.login_post = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Login POST.");
};

exports.post_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();
  if (post === null) {
    // No results.
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  }
  res.json(post);
});

exports.post_put = (req, res, next) => {
  res.json("NOT IMPLEMENTED: Post PUT");
};

exports.post_delete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();
  if (post === null) {
    // No results.
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  }
  await post.deleteOne();
  res.send("Post deleted.");
});

exports.post_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .sort({ timestamp: 1 })
    .populate("author")
    .exec();
  res.json(posts);
});

exports.post_post = asyncHandler(async (req, res, next) => {
  // const author = await User.findById(req.params.id).exec();

  // const post = new Post({
  //   author: author,
  //   title: req.params.title,
  //   text: req.params.text,
  //   timestamp: req.params.timestamp,
  //   published: req.params.published,
  // });

  // await post.save();
  res.send("New post saved.");
});
