// loginScript.js

const baseUrl = "http://localhost:8083/auth/login";

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");

function setButtonState() {
  const hasUsername = usernameInput.value.trim().length > 0;
  const hasPassword = passwordInput.value.trim().length > 0;

  signInBtn.disabled = !(hasUsername && hasPassword);
  signInBtn.classList.toggle("active", hasUsername && hasPassword);
}

usernameInput.addEventListener("input", setButtonState);
passwordInput.addEventListener("input", setButtonState);
setButtonState();

// Optional: press Enter to sign in
[usernameInput, passwordInput].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") signInBtn.click();
  });
});

signInBtn.addEventListener("click", async (e) => {
  // ✅ Prevent form submit / page reload (very common cause of "stuck loading")
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (!username || !password) return;

  // ✅ Basic UI state (prevents double-click)
  signInBtn.disabled = true;
  signInBtn.textContent = "Signing in...";

  try {
    console.log("Sending login request to:", baseUrl);

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    // Read as text first so we can handle JSON OR non-JSON errors cleanly
    const raw = await response.text();
    console.log("Status:", response.status);
    console.log("Raw response:", raw);

    if (!response.ok) {
      // Try to show meaningful error from backend
      let msg = raw;
      try {
        const maybeJson = JSON.parse(raw);
        msg = maybeJson.message || maybeJson.error || raw;
      } catch (_) {
        // keep raw
      }
      alert(msg || "Login failed");
      return;
    }

    // Parse success response JSON
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      alert("Login succeeded but backend did not return JSON.");
      return;
    }

    // Support common token field names
    const token = data.token || data.jwt || data.accessToken;
    if (!token) {
      alert("Login response did not include a token.");
      return;
    }

    localStorage.setItem("jwt", token);
    if (data.username) localStorage.setItem("username", data.username);

    // ✅ Redirect to your dashboard (adjust filename if needed)
    window.location.href = "/dash.html";
  } catch (err) {
    console.error("Fetch failed:", err);
    alert("Network error. Check backend is running + CORS + correct URL.");
  } finally {
    // Restore button state (if we didn't redirect)
    signInBtn.textContent = "Sign In";
    setButtonState();
  }
});




