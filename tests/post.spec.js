var express = require("express");
var app = express();
const request = require("supertest");
const initializeMongoServer =
  require("../config/mongoConfigTesting").initializeMongoServer;
const closeMongoServer =
  require("../config/mongoConfigTesting").closeMongoServer;
var indexRouter = require("../routes/index");
const User = require("../models/user");

beforeAll(async () => {
  initializeMongoServer();
  app.use("/", indexRouter);

  const user = new User({
    display_name: "John Doe",
    username: "testuser",
    password: "password123",
  });
  await user.save();
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

  // test("Receive success message when user is logged in", (done) => {
  //   request(app)
  //     .post("/login")
  //     .type("form")
  //     .send({ username: "testuser" })
  //     .send({ password: "password" })
  //     .expect("User logged in.")
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       return done();
  //     });
  // });

  // test("Get users", async (done) => {
  //   const users = await User.find();
  //   console.log(users);
  //   done();
  // });
});

describe("Posts", () => {
  // test("Create a new post", (done) => {
  //   request(app)
  //     .post("/posts")
  //     .send({
  //       title: "My new blog post!",
  //       text: "This is the text in my new blog post",
  //       published: false,
  //     })
  //     .set("Content-Type", "application/json")
  //     .expect("Content-Type", "text/html; charset=utf-8")
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       done();
  //     });
  // });

  test("Get list of posts", (done) => {
    request(app)
      .get("/posts")
      .expect("Content-Type", /json/)
      .expect([])
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
