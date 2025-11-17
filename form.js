const registrationForm = document.getElementById("form");
const errorMessages = document.getElementById("errorMessages");

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const { username, email, text } = registrationForm.elements;

  errorMessages.innerHTML = "";

  if (!username.value.trim()) {
    displayError("Nom requerit.");
    return;
  }

  if (!email.value.trim() || !isValidEmail(email.value)) {
    displayError("Email incorrecte");
    return;
  }

  if (!text.value.trim() || !isStrongPassword(text.value)) {
    displayError(
      "Perfavor, introdueix text."
    );
    return;
  }

  alert("Formulari enviat correctament");
  registrationForm.reset();
});

function displayError(message) {
  errorMessages.innerHTML += `<div class="error">${message}</div>`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(text) {
  return text && text.length > 0;
}

