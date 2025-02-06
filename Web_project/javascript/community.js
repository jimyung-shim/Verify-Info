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
    posts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
  
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <span class="timestamp">${post.timestamp}</span>
        <button class="delete-button" data-index="${index}">Delete</button>
      `;
  
      postsContainer.appendChild(postElement);
    });
  
    // 삭제 버튼 이벤트 처리
    postsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-button")) {
        const index = e.target.getAttribute("data-index");
  
        // 게시글 삭제
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
  
        // 화면 새로고침
        renderPosts();
      }
    });
  
    // 게시글 렌더링 함수
    function renderPosts() {
      postsContainer.innerHTML = ""; // 기존 게시글 삭제
  
      if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts yet. Click 'Post' to create a new one.</p>";
        return;
      }
  
      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
  
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <span class="timestamp">${post.timestamp}</span>
          <button class="delete-button" data-index="${index}">Delete</button>
        `;
  
        postsContainer.appendChild(postElement);
      });
    }
  });
  