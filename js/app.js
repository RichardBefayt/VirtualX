document.addEventListener("DOMContentLoaded", () => {
    const previousPage = document.referrer;

    if (previousPage) {
        localStorage.setItem("previousPage", previousPage);
    }

    const sidebar = document.querySelector('.sidebar');
    const sidebarBtn = document.querySelector('.sidebar-button');

    const navLogin = document.querySelector(".nav-login");
    const navUser = document.querySelector(".nav-user");
    const navLogout = document.querySelector(".nav-logout");

    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");

        // Gère l'affichage des éléments de navigation lorsque la sidebar est ouverte ou fermée
        const isSidebarClosed = sidebar.classList.contains("close");
        toggleNavTextDisplay(isSidebarClosed);
    });

    const toggleNavTextDisplay = (isSidebarClosed) => {
        const navTextElements = document.querySelectorAll('.nav-link .text');
        const footerTextElement = document.querySelector('.footer-link .footer-text');

        for (const navTextElement of navTextElements) {
            navTextElement.style.display = isSidebarClosed ? "none" : "block";
            footerTextElement.style.display = isSidebarClosed ? "none" : "block";
        }
    };
    
    const toggleNavElements = (loggedIn) => {
        if (loggedIn) {
            navLogin.style.display = "none";
            navUser.style.display = "flex";
            navLogout.style.display = "flex";
        } else {
            navLogin.style.display = "flex";
            navUser.style.display = "none";
            navLogout.style.display = "none";
        }
    };

    // ***** Redirection ***** //
    // Lit l'état de connexion depuis le localStorage
    const userPseudo = localStorage.getItem("userPseudo");
    
    // Appel initial avec l'état de connexion
    toggleNavElements(userPseudo !== null);
    toggleNavTextDisplay(sidebar.classList.contains("close"));

    navLogout.addEventListener("click", (event) => {
        event.preventDefault();
        displayModal();
        
        const confirmLogout = document.querySelector(".confirm-logout");
    
        if (confirmLogout) {
            confirmLogout.addEventListener("click", () => {
                // Supprime l'état de connexion du localStorage
                localStorage.removeItem("userPseudo");
    
                // Met à jour l'affichage de la navigation
                toggleNavElements(false);
    
                // Redirige l'utilisateur vers la page d'accueil ou une autre page appropriée
                window.location.href = "home.html";
                cancelModal(); // Ferme la modal après la déconnexion
            });
        }
    });  
});

// Fonction pour désactiver les liens vers les pages de connexion et d'inscription
function disableLoginPageAndRegisterPage() {
    const loginLinks = document.querySelectorAll('.nav-login');
    const registerLinks = document.querySelectorAll('.nav-register');

    loginLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            // Peut afficher un message d'erreur ou rediriger vers une autre page
        });
    });

    registerLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            // Peut afficher un message d'erreur ou rediriger vers une autre page
        });
    });
}

function displayModal() {
    const logoutModal = document.getElementById("logout-modal");
    logoutModal.style.display = 'block';

    // Ajoute l'événement de clic pour fermer la modal lorsque le bouton "Annuler" est cliqué
    const cancelModalButton = document.querySelector('.cancel-modal');
    if (cancelModalButton) {
        cancelModalButton.addEventListener('click', cancelModal);
    }
}

function cancelModal() {
    document.getElementById('logout-modal').style.display = 'none';
}