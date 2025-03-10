document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const response = await fetch("http://localhost:3000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, id, password }),
  });

  if (response.ok) {
    alert("Sign up successful! Please log in.");
    window.location.href = "login.html";
  } else {
    alert("Sign up failed. Please try again.");
  }
});