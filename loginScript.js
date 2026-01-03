
const baseUrl = "http://localhost:8083/auth/login";

document.getElementById("signInBtn").addEventListener("click", () => {
    window.location.href = "/index.html";
});


const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");

function checkInputs() {
    const hasUsername = usernameInput.value.trim() !== "";
    const hasPassword = passwordInput.value.trim() !== "";

    if (hasUsername && hasPassword) {
        signInBtn.classList.add("active");
        signInBtn.disabled = false;
    } else {
        signInBtn.classList.remove("active");
        signInBtn.disabled = true;
    }
}

usernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);


document.getElementById("signInBtn").addEventListener("click", async () => {
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!username || !password) return; // quick guard

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }) // ✅ send creds
    });

    if (!response.ok) {
      const errText = await response.text();
      alert(errText || "Login failed");
      return;
    }

    // Usually login returns JSON with a token
    const data = await response.json(); // e.g. { token: "..." }

    // Store token (simple approach for now)
    localStorage.setItem("jwt", data.token);

    // Redirect to your app
    window.location.href = "/index.html";
  } catch (e) {
    console.error(e);
    alert("Network error. Is the backend running / CORS configured?");
  }
});


