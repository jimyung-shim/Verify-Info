import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 API 키 로드
});

const openai = new OpenAIApi(configuration);

(async () => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello, AI!" }],
    });

    console.log("AI Response:", response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
