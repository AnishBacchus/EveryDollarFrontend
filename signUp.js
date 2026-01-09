function setButtonState() {
  const hasName = nameInput.value.trim().length > 0;
  const hasEmail = emailInput.value.trim().length > 0;
  const hasUsername = usernameInput.value.trim().length > 0;
  const hasPassword = passwordInput.value.trim().length > 0;

  const enabled = hasName && hasEmail && hasUsername && hasPassword;

  signUpBtn.disabled = !enabled;
  signUpBtn.classList.toggle("active", enabled);
}

// Recalculate whenever ANY field changes
[nameInput, emailInput, usernameInput, passwordInput].forEach((el) => {
  el.addEventListener("input", setButtonState);
});

setButtonState(); // initial state

// Optional: press Enter to submit
[nameInput, emailInput, usernameInput, passwordInput].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !signUpBtn.disabled) {
      signUpBtn.click();
    }
  });
});
