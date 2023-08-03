// ***** Sidebar ***** //
// const sidebar = document.querySelector('.sidebar');
// const open = document.querySelector('.open-btn');
// const close = document.querySelector('.close-btn');

// open.addEventListener('click', () => {
//     sidebar.classList.toggle('active');
//     open.style.display = 'none';
// });

// close.addEventListener('click', () => {
//     sidebar.classList.remove('active');
//     open.style.display = 'block';
// });

// Mettre à jour le bouton "Se connecter" avec le nom d'utilisateur
document.addEventListener("DOMContentLoaded", () => {
    // Sauvegarder la page précédente dans le localStorage
    localStorage.setItem("previousPage", document.referrer);
    
    const userPseudo = localStorage.getItem("userPseudo");
    const loginButton = document.querySelector(".button-container button");

    if (userPseudo) {
        // Mettre à jour le bouton "Se connecter" avec le nom d'utilisateur
        loginButton.textContent = userPseudo;

        // Gérer le clic sur le bouton "Se connecter" (déconnexion ou annulation)
        loginButton.addEventListener("click", () => {
            const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
            if (confirmLogout) {
                // Si l'utilisateur confirme la déconnexion, supprimer le pseudo du localStorage
                localStorage.removeItem("userPseudo");
                // Rediriger l'utilisateur vers la page de déconnexion (ou une autre page appropriée)
                window.location.href = "home.html"; // Remplacez "logout.html" par la page de déconnexion appropriée
            }
        });
    } else {
        // Le bouton "Se connecter" n'est pas personnalisé, l'utilisateur n'est pas connecté
        loginButton.textContent = "Se connecter";
        // Gérer le clic sur le bouton "Se connecter" pour la redirection vers la page de connexion
        loginButton.addEventListener("click", () => {
            // Rediriger l'utilisateur vers la page de connexion (ou une autre page appropriée)
            window.location.href = "home.html"; // Remplacez "login.html" par la page de connexion appropriée
        });
    }
});