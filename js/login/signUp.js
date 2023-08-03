const signUpForm = document.getElementById("sign-up-form");

const signUpInputs = document.querySelectorAll('#sign-up-form input'); 

const pseudoField = document.querySelector(".pseudo-field");
let pseudoInput = document.getElementById("pseudo");
console.log("pseudoInput :", pseudoInput);
const signUpEmailField = document.querySelector(".sign-up-email-field");
let signUpEmailInput = document.getElementById("sign-up-email");

const signUpPassField = document.querySelector(".sign-up-password-field");
let signUpPassInput = document.getElementById("sign-up-password");

const confirmField = document.querySelector(".confirm-field");
let confirmInput = document.getElementById("sign-up-confirm");

// Validation du pseudo
const pseudoChecker = () => {
    const pseudoRegex = /^[a-zA-Z0-9_.-]+$/;

    if (pseudoInput.value.trim() === "") {
        pseudoField.classList.add("invalid");
    } else if (!pseudoInput.value.match(pseudoRegex) || pseudoInput.value.length < 2 || pseudoInput.value.length > 8) {
        pseudoField.classList.add("invalid");
    } else {
        pseudoField.classList.remove("invalid");
        localStorage.setItem("userPseudo", pseudoInput.value);

        // Redirection vers la page précédente après validation réussie
        const previousPage = localStorage.getItem("previousPage");
        if (previousPage) {
            window.location.href = previousPage;
        }
    }
};

// Masquer/Montrer le password
const SignUpEyeIcons = document.querySelectorAll(".sign-up-show-hide");
SignUpEyeIcons.forEach((SignUpEyeIcon) => {
    SignUpEyeIcon.addEventListener("click", () => {
        const pInput = SignUpEyeIcon.parentElement.querySelector("input");
        // console.log("pInput :", pInput);
        if (pInput.type === "password") {
            SignUpEyeIcon.classList.replace("sign-up-bx-hide", "sign-up-bx-show");
            return (pInput.type = "text");
        }
        SignUpEyeIcon.classList.replace("sign-up-bx-show", "sign-up-bx-hide");
        pInput.type = "password";
    });
});

// Validation de l'email
const signUpEmailChecker = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;

    if (!signUpEmailInput.value.match(emailRegex)) {
        return signUpEmailField.classList.add("invalid");
    } else {
        signUpEmailField.classList.remove("invalid");
    }
};

// Validations du password
const signUpPasswordChecker = () => {
    const signUpPasswordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!signUpPassInput.value.match(signUpPasswordRegex)) {
        return signUpPassField.classList.add("invalid");
    } else {
        signUpPassField.classList.remove("invalid");
    }
};

// Confirmation du password
const confirmChecker = () => {
    if (signUpPassInput.value !== confirmInput.value || confirmInput.value === "") {
        // console.log("true");
        return confirmField.classList.add("invalid"); 
    } else {
        confirmField.classList.remove("invalid");
    }
}

// Soumission du formulaire Inscription
signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    pseudoChecker();
    signUpEmailChecker();
    signUpPasswordChecker();
    confirmChecker();

    // Retire l'erreur dès lors que l'utilisateur entre quelque chose de valide
    pseudoInput.addEventListener("keyup", pseudoChecker);
    signUpEmailInput.addEventListener("keyup", signUpEmailChecker);
    signUpPassInput.addEventListener("keyup", signUpPasswordChecker);
    confirmInput.addEventListener("keyup", confirmChecker);

    let hasErrors = false; // Ajout d'une variable pour suivre l'état de la validation

    // Vérifier si des erreurs sont présentes
    if (pseudoField.classList.contains("invalid") || signUpEmailField.classList.contains("invalid") || signUpPassField.classList.contains("invalid") || confirmField.classList.contains("invalid")) {
        hasErrors = true;
    }

    if (!hasErrors) {
        const data = {
            pseudoInput,
            signUpEmailInput,
            signUpPassInput,
            confirmInput,
        };
        console.log(data);

        // Stocker les informations de connexion dans le localStorage
        localStorage.setItem("storedPseudo", pseudoInput.value.trim());
        localStorage.setItem("storedEmail", signUpEmailInput.value.trim());
        localStorage.setItem("storedPassword", signUpPassInput.value.trim())

        // Vider les inputs après validation
        signUpInputs.forEach((signUpInput) => {
            signUpInput.value = "";
        });

        // Après une inscription réussie, nous enregistrons la page précédente dans le localStorage
        localStorage.setItem("previousPage", document.referrer);

        // Tout remettre à zéro, ce qui évite que l'utilisateur renvoie 1 2e fois le form
        pseudoInput = null;
        signUpEmailInput = null;
        signUpPassInput = null;
        confirmInput = null;
        
        alert("Inscription validée !");

    } else {
        alert("Veuillez remplir tous les champs");
    }
});