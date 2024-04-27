var express = require("express");
var app = express();
const request = require("supertest");
const initializeMongoServer = require("../config/mongoConfigTesting");
var indexRouter = require("../routes/index");

beforeAll(() => {
  initializeMongoServer();
  app.use("/", indexRouter);
});

afterAll(async () => {});

test("index route works", (done) => {
  request(app)
    .get("/posts")
    .expect("Content-Type", /json/)
    .expect({ name: "frodo" })
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      done();
    });
});
