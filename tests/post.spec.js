var express = require("express");
var app = express();
const mongoose = require("mongoose");
const request = require("supertest");
const initializeMongoServer =
  require("../config/mongoConfigTesting").initializeMongoServer;
const closeMongoServer =
  require("../config/mongoConfigTesting").closeMongoServer;
var indexRouter = require("../routes/index");

beforeAll(() => {
  initializeMongoServer();
  app.use("/", indexRouter);
});

afterAll(() => {
  closeMongoServer();
});

test("index route works", (done) => {
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
