// import products from "../data/products.json";

// Sidebar
const sidebar = document.querySelector('.sidebar');
const open = document.querySelector('.open-btn');
const close = document.querySelector('.close-btn');

open.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    open.style.display = 'none';
});

close.addEventListener('click', () => {
    sidebar.classList.remove('active');
    open.style.display = 'block';
});

// Présentation des produits

  
// Carrousel
const cardsContainer = document.querySelector('.cards-container');
const cards = document.querySelectorAll('.card');
const cardCount = cards.length;

for (let i = 0; i < cardCount; i++) {
    const cardClone = cards[i].cloneNode(true);
    cardsContainer.appendChild(cardClone);
}

const cardWidth = cards[0].offsetWidth;
const cardsContainerWidth = cardCount * cardWidth;

cardsContainer.style.width = `${cardsContainerWidth}px`;
