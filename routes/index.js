var express = require("express");
var router = express.Router();
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const passport = require("passport");

// POST ROUTES

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({
      message: `You accessed the protected route, ${req.user.username}!`,
    });
  }
);

/* GET login status */
// Example of how to send along a cookie created through cURL with the GET request:
// curl -b cookies.txt http://localhost:3000/login
router.get("/login", post_controller.login_get);

/* POST to login */
// Example of how to send a POST request to login through the command line:
// curl --cookie-jar cookies.txt \
//      -H "Content-type: application/x-www-form-urlencoded" \
//      -d "username=USERNAME_GOES_HERE" \
//      -d "password=PASSWORD_GOES_HERE" \
//      -X POST \
//      http://localhost:3000/login
router.post("/login", post_controller.login_post);

/* GET logout user */
router.get("/logout", post_controller.logout);

/* GET specific post */
router.get("/posts/:postid", post_controller.post_get);

/* PUT updates for specific post */
// Example of how to send this PUT request with the cookie generated through cURL:
// curl -b cookies.txt \
//      -H 'Content-Type: application/json' \
//      -d '{ "title":"I updated my blog post.", "published": true }' \
//      -X PUT \
//      http://localhost:3000/posts/:postid
router.put("/posts/:postid", post_controller.post_put);

/* DELETE specific post */
router.delete(
  "/posts/:postid",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_delete
);

/* GET list of posts */
router.get("/posts", post_controller.post_list);

/* POST a new post */
// Example of how to send this POST request with the cookie generated through cURL:
// curl -b cookies.txt \
//      -H 'Content-Type: application/json' \
//      -d '{ "title":"My new blog post!","text":"This is the text in my new blog post", "published": false }' \
//      -X POST \
//      http://localhost:3000/posts
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  post_controller.post_post
);

// COMMENT ROUTES

/* GET specific comment */
router.get(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_get
);

/* GET specific comment */
router.delete(
  "/posts/:postid/comments/:commentid",
  comment_controller.comment_delete
);

/* GET list of comments on a post */
router.get("/posts/:postid/comments", comment_controller.comment_list);

/* POST a new comment to a post */
// Example of how to send this POST request with cURL:
// curl -H 'Content-Type: application/json' \
//      -d '{ "username":"Commenter","text":"I am commenting on this post." }' \
//      -X POST \
//      http://localhost:3000/posts/:postid/comments/
router.post("/posts/:postid/comments", comment_controller.comment_post);

module.exports = router;
