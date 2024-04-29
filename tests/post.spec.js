var express = require("express");
var app = express();
const request = require("supertest");
const initializeMongoServer =
  require("../config/mongoConfigTesting").initializeMongoServer;
const closeMongoServer =
  require("../config/mongoConfigTesting").closeMongoServer;
var indexRouter = require("../routes/index");
const User = require("../models/user");
const Post = require("../models/post");

beforeAll(async () => {
  initializeMongoServer();
  app.use("/", indexRouter);

  // Add mock data
  const user = new User({
    display_name: "John Doe",
    username: "testuser",
    password: "password123",
  });
  await user.save();

  const post = new Post({
    author: user,
    title: "My new blog post!",
    text: "This is the text in my new blog post",
    timestamp: Date.now(),
    published: false,
  });
  await post.save();
});

afterAll(() => {
  closeMongoServer();
});

describe("Login", () => {
  test("Receive error message when user isn't logged in", (done) => {
    request(app)
      .get("/login")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("You are not logged in.")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Posts", () => {
  test("List of posts returned as JSON array", async () => {
    const response = await request(app).get("/posts");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Post deleted successfully", async () => {
    const post = await Post.findOne();
    await request(app).delete(`/posts/${post.id}`).expect("Post deleted.");
    const deletedPost = await Post.findById(post.id);
    expect(deletedPost).toEqual(null);
  });
});
