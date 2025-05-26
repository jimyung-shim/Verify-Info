document.getElementById("write-post-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // 기본 폼 제출 방지

  // 입력값 가져오기
  const title = document.querySelector(".input-title").value;
  const content = document.querySelector("textarea").value;

  // 현재 날짜와 시간 추가
  const timestamp = new Date().toLocaleString();

  // 게시글 객체 생성
  const post = { title, content, timestamp };

  // 서버에 게시글 저장
  const response = await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    // 커뮤니티 페이지로 이동
    window.location.href = "community.html";
  } else {
    console.error("Failed to create post");
  }
});
