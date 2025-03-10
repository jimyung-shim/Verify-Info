import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  timestamp: String,
});

const Post = mongoose.model("Post", postSchema);

export default Post;