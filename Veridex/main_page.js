import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 5000;

// CORS 활성화
app.use(cors());

// JSON 요청 파싱
app.use(bodyParser.json());

// OpenAI API 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일의 API 키 가져오기
});

// API 엔드포인트
app.post("/api", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // GPT 모델 설정
      messages: [
        { role: "user", content: question },
      ],
    });

    const answer = response.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error("Error during OpenAI API call:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


