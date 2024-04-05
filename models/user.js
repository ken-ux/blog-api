const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  display_name: { type: String, required: true, minLength: 1, maxLength: 30 },
  username: { type: String, required: true, minLength: 1, maxLength: 30 },
  password: { type: String, required: true, minLength: 10 },
});

module.exports = mongoose.model("User", UserSchema);
