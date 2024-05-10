const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const { check, body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.login_get = (req, res, next) => {
  if (req.user) {
    res.send(`You are logged in as ${req.user.display_name}.`);
  } else {
    res.send("You are not logged in.");
  }
};

exports.login_post = [
  // Validate and sanitize fields.
  body("username").trim().escape(),
  check("username").custom(async (value) => {
    const usernameExists = await User.findOne({ username: value }).exec();
    if (usernameExists === null) {
      throw new Error(
        "User does not exist. Please check username and try again."
      );
    }
  }),
  body("password").trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      return res.send(errors.array());
    }
    // Validation is successful, call next() to go on with passport authentication.
    next();
  },

  // Authenticate user
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      // If user isn't authenticated, rerender page with error message.
      if (!user) {
        return res.send(info.message);
      }
      // User is authenticated, log them into the session.
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        // Send message if there are no login issues.
        return res.send("User logged in.");
      });
    })(req, res, next);
  },
];

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

exports.post_put = asyncHandler(async (req, res, next) => {
  const post = Post.findById(req.params.postid).exec();
  if (post === null) {
    // No results.
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  }
  
  const possibleFields = ["title", "text", "published"];
  let update = {};

  for (let i = 0; i < possibleFields.length; i++) {
    if (req.body[possibleFields[i]] !== undefined) {
      update[possibleFields[i]] = req.body[possibleFields[i]];
    }
  }

  await Post.findByIdAndUpdate(req.params.postid, update);
  res.send("Post updated.");
});

exports.post_delete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postid).exec();
  if (post === null) {
    // No results.
    const err = new Error("Post not found.");
    err.status = 404;
    return next(err);
  }

  // Delete comments attached to post.
  const comments = await Comment.find({ post: req.params.postid }).exec();
  if (comments.length > 0) {
    while (comments.length > 0) {
      await comments[0].deleteOne();
    }
  }

  await post.deleteOne();
  res.send("Post deleted.");
});

exports.post_list = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .sort({ timestamp: -1 })
    .populate("author")
    .exec();
  res.json(posts);
});

exports.post_post = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const post = new Post({
    author: user,
    title: req.body.title,
    text: req.body.text,
    timestamp: Date.now(),
    published: req.body.published,
  });

  await post.save();
  res.send("New post saved.");
});
