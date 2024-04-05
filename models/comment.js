const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  username: { type: String, required: true, minLength: 1, maxLength: 30 },
  text: { type: String, required: true, minLength: 1, maxLength: 100 },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
