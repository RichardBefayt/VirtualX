const left = document.querySelector('.animate__animated animate__backInLeft');
const right = document.querySelector('.animate__animated animate__backInRight');

function out() {
    setTimeout(() => {
        left.style.animation = "animate__animated animate__fadeOutLeft"
    }, 5000);
}