import express from "express";
import Post from "../models/post.js";

const router = express.Router();

// 게시글 저장 엔드포인트
router.post("/", async (req, res) => {
  const { title, content, timestamp } = req.body;

  if (!title || !content || !timestamp) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newPost = new Post({ title, content, timestamp });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 게시글 불러오기 엔드포인트
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 게시글 삭제 엔드포인트
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;