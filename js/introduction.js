// ***** Introduction ***** //
const globalIntro = document.querySelector('.global-introduction');

function displayPresentationPage() {

        setTimeout(() => {
            presentationPage.style.display = 'none';
            fetchAndShuffleProducts(); // Appel de la fonction pour afficher les produits aléatoirement après la page de présentation
    }, 3000); // 3000 ms = 3 secondes de présentation
}

const left = document.querySelector('.animate__animated animate__backInLeft');
const right = document.querySelector('.animate__animated animate__backInRight');

function out() {
    setTimeout(() => {
        left.style.animation = "animate__animated animate__fadeOutLeft"
    }, 5000);
}