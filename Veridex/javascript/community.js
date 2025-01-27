document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.querySelector(".posts");
  
    // 로컬 스토리지에서 게시글 가져오기
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
  
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
      `;
  
      postsContainer.appendChild(postElement);
    });
  });
  