#! /usr/bin/env node
const bcrypt = require("bcryptjs");

console.log(
  'This script populates a test user, posts, and to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

const users = [];
const posts = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createPosts();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// user[0] will always be the first user, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(index, display_name, username, password) {
  const user = new User({
    display_name: display_name,
    username: username,
    password: password,
  });

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      throw new Error("Error saving password. Please try again.");
    }
    user.password = hashedPassword;
    await user.save();
  });

  users[index] = user;
  console.log(`Add user: ${display_name}`);
}

async function postCreate(index, author, title, text, timestamp, published) {
  const post = new Post({
    author: author,
    title: title,
    text: text,
    timestamp: timestamp,
    published: published,
  });

  await post.save();
  posts[index] = post;
  console.log(`Added post from: ${author}`);
}

async function commentCreate(index, post, username, text, timestamp) {
  const comment = new Comment({
    post: post,
    username: username,
    text: text,
    timestamp: timestamp,
  });

  await comment.save();
  console.log(`Added comment from: ${username}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "John Doe", "test_user", process.env.USER_CREATION_PW),
  ]);
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(
      0,
      users[0],
      "My first blog post!",
      "This is the content of my first blog post.",
      Date.now(),
      true
    ),
    postCreate(
      1,
      users[0],
      "My second blog post?",
      "This is the content of my second blog post.",
      Date.now(),
      false
    ),
  ]);
}

// index, post, username, text, timestamp
async function createComments() {
  console.log("Adding comments");
  await Promise.all([
    commentCreate(
      0,
      posts[0],
      "CommenterOne",
      "I am commenting on the first blog post.",
      Date.now()
    ),
    commentCreate(
      1,
      posts[1],
      "CommenterTwo",
      "I am commenting on the second blog post.",
      Date.now()
    ),
  ]);
}
