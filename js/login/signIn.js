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

        let loginStatus = "empty"; // Par défaut, aucun champ n'est rempli

        if (email === "" || password === "") {
            loginStatus = "empty"; // Les champs sont vides
        } else {
            // Vérification des informations de connexion
            const storedEmail = localStorage.getItem("storedEmail");
            const storedPassword = localStorage.getItem("storedPassword");
            
            if (email === storedEmail && password === storedPassword) {
                loginStatus = "success"; // Connexion réussie
            } else {
                loginStatus = "fail"; // Échec de la connexion
            }
        }

        // Gestion des modales en utilisant un switch
        switch (loginStatus) {
            case "empty":
                emptyLoginModal(false); // "Veuillez remplir tous les champs", ne redirige pas
                break;
            case "success":
                const storedPseudo = localStorage.getItem("storedPseudo");
                localStorage.setItem("userPseudo", storedPseudo);
                signInInputs.forEach((signInInput) => {
                    signInInput.value = "";
                });
                successLoginModal(true); // "Connexion réussie !", redirige
                break;
            case "fail":
                failLoginModal(); // "Email ou mot de passe incorrect", ne redirige pas
                break;
        }
    }
});

function redirectToHome() {
    window.location.href = "home.html";
}

// Modales
function successLoginModal(shouldRedirect) {
    const successModal = document.getElementById('success-login-modal');
    successModal.style.display = 'block';

    if (shouldRedirect) {
        // Rediriger après un délai de 10 secondes
        const timeoutId = setTimeout(function() {
            redirectToHome();
        }, 10000);

        // Ajouter un événement de fermeture pour rediriger immédiatement si l'utilisateur ferme la modale
        const closeModalButton = successModal.querySelector('.close-modal');
        closeModalButton.addEventListener('click', function() {
            clearTimeout(timeoutId); // Annuler le délai
            redirectToHome(); // Rediriger immédiatement
        });
    }
}

function failLoginModal() {
    document.getElementById('fail-login-modal').style.display = 'block';
}

function emptyLoginModal() {
    document.getElementById('empty-login-modal').style.display = 'block';
}

// Ajoute des écouteurs d'événements de fermeture aux boutons de fermeture des modales
document.querySelectorAll('.close-modal').forEach(closeModalButton => {
    closeModalButton.addEventListener('click', closeModals);
});

// Fonction pour fermer toutes les modales
function closeModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}