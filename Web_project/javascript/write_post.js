document.getElementById("write-post-form").addEventListener("submit", function (e) {
    e.preventDefault(); // 기본 폼 제출 방지
  
    // 입력값 가져오기
    const title = document.querySelector(".input-title").value;
    const content = document.querySelector("textarea").value;
  
    // 현재 날짜와 시간 추가
    const timestamp = new Date().toLocaleString();
  
    // 게시글 객체 생성
    const post = { title, content, timestamp };
  
    // 기존 게시글 가져오기
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
  
    // 로컬 스토리지에 저장
    localStorage.setItem("posts", JSON.stringify(posts));
  
    // 커뮤니티 페이지로 이동
    window.location.href = "community.html";
  });
  