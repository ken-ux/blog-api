const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, maxLength: 30 },
  text: { type: String, required: true, maxLength: 500 },
  timestamp: { type: Date, required: true },
  published: { type: Boolean, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
