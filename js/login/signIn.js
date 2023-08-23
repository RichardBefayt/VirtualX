const signInForm = document.getElementById("sign-in-form");

const signInInputs = document.querySelectorAll('#sign-in-form input');

const signInEmailField = document.querySelector(".sign-in-email-field");
let signInEmailInput = document.getElementById("sign-in-email");

const signInPassField = document.querySelector(".sign-in-password-field");
let signInPassInput = document.getElementById("sign-in-password");

// Masquer/Montrer le password
const signInEyeIcon = document.querySelector(".sign-in-show-hide");
signInEyeIcon.addEventListener("click", () => {
    const pInput = signInEyeIcon.parentElement.querySelector("input");
    // console.log("pInput :", pInput);
    if (pInput.type === "password") {
        signInEyeIcon.classList.replace("sign-in-bx-hide", "sign-in-bx-show");
        return (pInput.type = "text");
    }
    signInEyeIcon.classList.replace("sign-in-bx-show", "sign-in-bx-hide");
    pInput.type = "password";
});

// Validation de l'email
const signInEmailChecker = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;

    if (!signInEmailInput.value.match(emailRegex)) {
        return signInEmailField.classList.add("invalid");
    } else {
        signInEmailField.classList.remove("invalid");
    }
};

// Validations du password
const signInPasswordChecker = () => {
    const signInPasswordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!signInPassInput.value.match(signInPasswordRegex)) {
        return signInPassField.classList.add("invalid");
    } else {
        signInPassField.classList.remove("invalid");
    }
};

// Vérification des informations de connexion
const checkLoginCredentials = (email, password) => {
    const storedEmail = localStorage.getItem("storedEmail");
    const storedPassword = localStorage.getItem("storedPassword");

    // Vérifier si les informations de connexion correspondent à celles stockées dans le localStorage
    return email === storedEmail && password === storedPassword;
};

// Soumission du formulaire Connexion
signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    signInEmailChecker();
    signInPasswordChecker();

    // Retire l'erreur dès lors que l'utilisateur entre quelque chose de valide
    signInEmailInput.addEventListener("keyup", signInEmailChecker);
    signInPassInput.addEventListener("keyup", signInPasswordChecker);

    let hasErrors = false; // Ajout d'une variable pour suivre l'état de la validation

    // Vérifier si des erreurs sont présentes
    if (signInEmailField.classList.contains("invalid") || signInPassField.classList.contains("invalid")) {
        hasErrors = true;
    }

    if (!hasErrors) {
        const email = signInEmailInput.value.trim();
        const password = signInPassInput.value.trim();

        if (checkLoginCredentials(email, password)) {
            // Si les informations de connexion sont correctes
            const storedPseudo = localStorage.getItem("storedPseudo");
            localStorage.setItem("userPseudo", storedPseudo);

            // Vide les inputs après validation
            signInInputs.forEach((signInInput) => {
                signInInput.value = "";
            });

            successLoginModal();
            // alert("Connexion réussie !");

            // Redirige l'utilisateur vers la page précédente ou la page d'accueil après la connexion réussie
            const previousPage = localStorage.getItem("previousPage");
            if (previousPage) {
                window.location.href = previousPage;
            } else {
                window.location.href = "home.html";
            }
        } else {
            // Si les informations de connexion sont incorrectes
            failLoginModal();
            // alert("Email ou mot de passe incorrect");
        }
    } else {
        emptyLoginModal();
        // alert("Veuillez remplir tous les champs");
    }
});

// Modales
function successLoginModal() {
    document.getElementById('success-login-modal').style.display = 'block';
}

function failLoginModal() {
    document.getElementById('fail-login-modal').style.display = 'block';
}

function emptyLoginModal() {
    document.getElementById('empty-login-modal').style.display = 'block';
}

// Fonction pour ajouter un écouteur d'événement de fermeture à tous les boutons de fermeture des modales
function addCloseModalEventListeners() {
    const closeModals = document.querySelectorAll('.close-modal');
    closeModals.forEach(closeModal => {
        closeModal.addEventListener('click', function() {
            closeModal.parentElement.parentElement.style.display = 'none';
        });
    });
}

// Ajoute des écouteurs d'événements de fermeture aux boutons de fermeture des modales
addCloseModalEventListeners();