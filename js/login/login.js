const loginContainer = document.querySelector(".login");
const signInContainer = document.querySelector(".sign-in");
const signUpContainer = document.querySelector(".sign-up");
const loginLink = document.querySelector(".nav-login");
const registerLink = document.querySelector(".register-link");

// Afficher le formulaire de connexion par défaut
signInContainer.style.display = "block";
signUpContainer.style.display = "none";

// Écouteur pour basculer vers le formulaire d'inscription
registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    signInContainer.style.display = "none";
    signUpContainer.style.display = "block";
});

// Écouteur pour basculer vers le formulaire de connexion
loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    signInContainer.style.display = "block";
    signUpContainer.style.display = "none";
});