document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ auth.js loaded");

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Register new user
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      alert("⚠️ User already exists!");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Registration successful! Please log in.");
    registerForm.reset();
  });

  // Login existing user
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("❌ Invalid credentials!");
      return;
    }

    localStorage.setItem("currentUser", email);
    alert("✅ Login successful!");
    window.location.href = "index.html"; // back to shop
  });
});
