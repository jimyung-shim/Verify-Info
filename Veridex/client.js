// DOM 요소 참조
const form = document.getElementById("ai-form");
const userInput = document.getElementById("user-input");
const responseDiv = document.getElementById("response");

// 폼 제출 이벤트 리스너
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 폼 기본 동작 막기

  const question = userInput.value; // 입력 값 가져오기
  responseDiv.textContent = "Loading..."; // 로딩 메시지 표시

  try {
    // 서버에 질문 전송
    const res = await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    responseDiv.textContent = data.answer; // 응답 표시
  } catch (error) {
    console.error("Error:", error);
    responseDiv.textContent = "Something went wrong. Please try again.";
  }
});
