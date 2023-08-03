const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");

const signInInputs = document.querySelectorAll('#sign-in-form input');
const signUpInputs = document.querySelectorAll('#sign-up-form input'); 

const pseudoField = document.querySelector(".pseudo-field");
let pseudoInput = document.getElementById("pseudo");

const emailField = document.querySelector(".email-field");
let emailInput = document.getElementById("email");

const passField = document.querySelector(".password-field");
let passInput = document.getElementById("sign-up-password");

const confirmField = document.querySelector(".confirm-field");
let confirmInput = document.getElementById("sign-up-confirm");

// Validation du pseudo
const pseudoChecker = () => {
    const pseudoRegex = /^[a-zA-Z0-9_.-]+$/;

    if (pseudoInput.value.match(pseudoRegex) && pseudoInput.value.length < 2 || pseudoInput.value.length > 8) {
        return pseudoField.classList.add("invalid");
    } else {
        pseudoField.classList.remove("invalid");
    }
};

// Validation de l'email
const emailChecker = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;

    if (!emailInput.value.match(emailRegex)) {
        return emailField.classList.add("invalid");
    } else {
        emailField.classList.remove("invalid");
    }
};

// Masquer/Montrer le password
const eyeIcons = document.querySelectorAll(".show-hide");
eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input");
        // console.log("pInput :", pInput);
        if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        pInput.type = "password";
    });
});

// Validations du password
const passwordChecker = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passInput.value.match(passwordRegex)) {
        return passField.classList.add("invalid");
    } else {
        passField.classList.remove("invalid");
    }
};

// Confirmation du password
const confirmChecker = () => {
    if (passInput.value !== confirmInput.value || confirmInput.value === "") {
        // console.log("true");
        return confirmField.classList.add("invalid"); 
    } else {
        confirmField.classList.remove("invalid");
    }
}

// Soumission du formulaire
signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    pseudoChecker();
    emailChecker();
    passwordChecker();
    confirmChecker();

    // Retire l'erreur dès lors que l'utilisateur entre quelque chose de valide
    pseudoInput.addEventListener("keyup", pseudoChecker);
    emailInput.addEventListener("keyup", emailChecker);
    passInput.addEventListener("keyup", passwordChecker);
    confirmInput.addEventListener("keyup", confirmChecker);

    if (pseudoInput && emailInput && passInput && confirmInput) {
        const data = {
            // Rappel : dans 1 objet lorsque la propriété est identique à la valeur, on a la version raccourcie pseudo: pseudo, équivalent à pseudo,
            pseudoInput,
            emailInput,
            passInput,
            confirmInput,
        };
        console.log(data);

        // Vider les inpus après validation
        inputs.forEach((input) => {
            input.value = "";
        });

        // Tout remettre à zéro, ce qui évite que l'utilisateur renvoie 1 2e fois le form
        pseudoInput = null;
        email = null;
        emailInput = null;
        confirmInput = null;

        alert("Inscription validée !");
    } else {
        alert("Veuillez remplir tous les champs");
    }
});