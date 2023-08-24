document.addEventListener("DOMContentLoaded", () => {
    const stripe = Stripe("pk_test_51NiM1AFD64hRHbumA5FxZDGGzQToVxsc8AuTcSvAjko86hUWh91xKmLvT1e1UHgRj4aSZf8CEp8MgtXz4ZL1TJxe00JzkGxOHA");
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

    paymentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        submitButton.disabled = true;

        const { token, error } = await stripe.createToken(cardNumber);

        submitButton.disabled = false;

        if (error) {
            console.error(error.message);
            // Afficher l'erreur à l'utilisateur
            const errorElement = document.getElementById("fail-checkout-modal");
            errorElement.textContent = error.message;
        } else {
            console.log(token);
            // Afficher un message de succès à l'utilisateur
            const successElement = document.getElementById("success-checkout-modal");
            successElement.style.display = "block";

            setTimeout(() => {
                window.location.href = "home.html";
            }, 10000);
        }
    });
});
