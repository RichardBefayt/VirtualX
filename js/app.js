document.addEventListener("DOMContentLoaded", () => {
    // Sauvegarde la page précédente dans le localStorage
    localStorage.setItem("previousPage", document.referrer);
    
    const sidebar = document.querySelector('.sidebar');
    const sidebarBtn = document.querySelector('.sidebar-button');

    const navLogin = document.querySelector(".nav-login");
    const navUser = document.querySelector(".nav-user");
    const navLogout = document.querySelector(".nav-logout");

    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");

        // Gérer l'affichage des éléments de navigation lorsque la sidebar est ouverte ou fermée
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
    // Lire l'état de connexion depuis le localStorage
    const userPseudo = localStorage.getItem("userPseudo");
    
    // Appel initial avec l'état de connexion
    toggleNavElements(userPseudo !== null);
    toggleNavTextDisplay(sidebar.classList.contains("close"));

    navLogout.addEventListener("click", () => {
        const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

        if (confirmLogout) {
            // Supprimer l'état de connexion du localStorage
            localStorage.removeItem("userPseudo");
            
            // Mettre à jour l'affichage de la navigation
            toggleNavElements(false);

            // Rediriger l'utilisateur vers la page d'accueil ou une autre page appropriée
            window.location.href = "home.html";
        }
    });
});