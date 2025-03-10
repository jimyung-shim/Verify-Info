document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    window.location.href = "main_page.html";
  } else {
    alert("Login failed. Please try again.");
  }
});