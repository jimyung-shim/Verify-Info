// 필요한 패키지 가져오기
import express from "express";
import path from"path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
