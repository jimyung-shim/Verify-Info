import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import mongoose from "mongoose";

dotenv.config(); // .env 로드

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000; // 기존 5000포트와 통합

// API 키 로드 확인
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

// MongoDB 연결 설정
mongoose.connect("mongodb://localhost:27017/web_project");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  timestamp: String,
});

const Post = mongoose.model("Post", postSchema);

// CORS 활성화
app.use(cors());

// JSON 요청 파싱
app.use(express.json());

// 정적 파일 제공 (HTML, CSS, JS 파일)
app.use(express.static(__dirname));

// OpenAI API 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI API 엔드포인트
app.post("/api", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // GPT 모델 선정
      messages: [{ role: "user", content: question }],
    });

    const answer = response.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 게시글 저장 엔드포인트
app.post("/api/posts", async (req, res) => {
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
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 게시글 삭제 엔드포인트
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
