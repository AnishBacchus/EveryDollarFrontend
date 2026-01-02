

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
