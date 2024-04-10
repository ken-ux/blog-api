var express = require("express");
var router = express.Router();
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// POST ROUTES

/* GET login status */
router.get("/login", post_controller.login_get);

/* POST to login */
router.post("/login", post_controller.login_post);

/* GET specific post */
router.get("/posts/:postid", post_controller.post_get);

/* PUT updates for specific post */
router.put("/posts/:postid", post_controller.post_put);

/* DELETE specific post */
router.delete("/posts/:postid", post_controller.post_delete);

/* GET list of posts */
router.get("/posts", post_controller.post_list);

/* POST a new post */
router.post("/posts", post_controller.post_post);

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
router.post("/posts/:postid/comments", comment_controller.comment_post);

module.exports = router;
