document.addEventListener("DOMContentLoaded", async function () {
  const postsContainer = document.querySelector(".posts");

  // 서버에서 게시글 가져오기
  const response = await fetch("http://localhost:3000/api/groqposts");
  const posts = await response.json();

  // 게시글이 없을 때 메시지 표시
  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts yet. Click 'Post' to create a new one.</p>";
    return;
  }

  // 게시글 렌더링
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <span class="timestamp">${post.timestamp}</span>
      <button class="delete-button" data-id="${post._id}">Delete</button>
    `;

    postsContainer.appendChild(postElement);
  });

  // 삭제 버튼 이벤트 처리
  postsContainer.addEventListener("click", async function (e) {
    if (e.target.classList.contains("delete-button")) {
      const id = e.target.getAttribute("data-id");

      // 게시글 삭제
      await fetch(`http://localhost:3000/api/groqposts/${id}`, {
        method: "DELETE",
      });

      // 화면 새로고침
      location.reload();
    }
  });
});
