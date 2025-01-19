const express = require("express");
const bodyParser = require("body-parser");
const { OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = 5000;

// OpenAI API 설정
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일의 API 키 가져오기
});

// JSON 요청 파싱
app.use(bodyParser.json());

// 엔드포인트: /api
app.post("/api", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // GPT 모델 설정
      messages: [{ role: "user", content: question }],
    });

    const answer = response.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const cors = require("cors");
app.use(cors());

console.log("API Key:", process.env.OPENAI_API_KEY);

app.post("/api", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    console.log("Received question:", question); // 디버깅용
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    const answer = response.choices[0].message.content.trim();
    console.log("AI Response:", answer); // 디버깅용
    res.json({ answer });
  } catch (error) {
    console.error("Error during OpenAI API call:", error.message); // 에러 메시지 출력
    res.status(500).json({ error: "Something went wrong" });
  }
});
