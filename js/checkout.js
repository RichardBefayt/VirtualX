document.addEventListener("DOMContentLoaded", () => {
    const stripe = Stripe("votre_clé_publique_Stripe");
    const elements = stripe.elements();

    // Créer des éléments de paiement
    const cardNumber = elements.create("cardNumber");
    cardNumber.mount("#card-number");

    const cardExpiry = elements.create("cardExpiry");
    cardExpiry.mount("#card-expiry");

    const cardCvc = elements.create("cardCvc");
    cardCvc.mount("#card-cvc");

    // Écouter la soumission du formulaire
    const paymentForm = document.getElementById("payment-form");
    const submitButton = document.getElementById("submit-payment");

    // Récupérer le montant total depuis le localStorage
    const totalAmount = parseFloat(localStorage.getItem('totalAmount'));

    // Afficher le montant total dans l'élément HTML approprié
    const totalAmountElement = document.getElementById('total-panier');
    totalAmountElement.textContent = totalAmount.toFixed(0);

    // Afficher la modal d'avertissement
    const warningModal = document.getElementById("warning-modal");
    warningModal.style.display = "block";

    // Fermer la modal d'avertissement en cliquant sur le bouton "Compris"
    const closeWarningButton = document.getElementById("close-warning-modal");
    closeWarningButton.addEventListener("click", () => {
        warningModal.style.display = "none";
    });

    paymentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        submitButton.disabled = true;

        const { token, error } = await stripe.createToken(cardNumber, {
            payment_method_data: {
                billing_details: {
                    // Ajoutez ici les détails de facturation si nécessaire
                },
                amount: Math.round(totalAmount * 100), // Convertit le montant en centimes
            }
        });

        submitButton.disabled = false;

        if (error) {
            console.error(error.message);
            // Afficher l'erreur à l'utilisateur
            const errorElement = document.getElementById("fail-checkout-modal");
            errorElement.querySelector(".modal-content h3").textContent = error.message;
            errorElement.style.display = "block";

        } else {
            // Afficher un message de succès à l'utilisateur
            const successElement = document.getElementById("success-checkout-modal");
            successElement.style.display = "block";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 10000);
        }
    });
});