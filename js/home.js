// ***** Sidebar ***** //
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

// ***** Présentation des produits ***** //
async function getAllProductData() {
    try {
        const response = await fetch("../data/products.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Une erreur est survenue :', error);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayProduct(product) {
    const productName = document.querySelector('.product-title');
    productName.textContent = product.name;

    const productDescription = document.querySelector('.product-description');
    productDescription.textContent = product.description;

    const productPrice = document.querySelector('.product-price');
    productPrice.textContent = `${product.price} €`;

    const containerRightImageContainer = document.querySelector('.pres-products-right');
    while (containerRightImageContainer.firstChild) {
        containerRightImageContainer.removeChild(containerRightImageContainer.firstChild);
    }

    const divElement = document.createElement("div");
    const imgElement = document.createElement("img");

    if (product.img !== "") {
        imgElement.src = product.img;
        imgElement.alt = product.name;
        divElement.appendChild(imgElement);
    }

    let containerLeft = document.querySelector(".pres-products-left");

    while (containerLeft.firstChild) {
        containerLeft.removeChild(containerLeft.firstChild);
    }

    containerLeft.appendChild(productName)
    containerLeft.appendChild(productDescription)
    containerLeft.appendChild(productPrice)

    if (divElement.hasChildNodes()) {
        let imageParentDiv = document.querySelector(".pres-products-right")
        imageParentDiv.append(divElement);
    }
}

function displayRandomProducts(products) {
    if (products.length === 0) {
        displayNextCategory();
        return;
    }

    const randomProduct = products.pop();
    displayProduct(randomProduct);

    setTimeout(() => {
        displayRandomProducts(products);
    }, 10000);
}

let allProducts = [];

const categories = ['pc', 'smartphones', 'audio', 'vr'];

function fetchAndShuffleProducts() {
    getAllProductData()
        .then(data => {
            for (const category of categories) {
                const products = data[category];
                shuffleArray(products);
                allProducts.push(...products);
            }
            shuffleArray(allProducts);

            displayRandomProducts(allProducts);
        })
        .catch(error => {
            console.log('Une erreur est survenue :', error);
        });
}

function displayNextCategory() {
    if (allProducts.length === 0) {
        fetchAndShuffleProducts();
    } else {
        setTimeout(() => {
            displayRandomProducts(allProducts);
        }, 10000);
    }
}


// ***** Carrousel ***** //
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

window.addEventListener('DOMContentLoaded', () => {
    displayNextCategory();
});

// ***** Fonctions ***** //

// Fonction pour afficher la page de présentation éclair
function displayPresentationPage() {
    setTimeout(() => {
      const presentationPage = document.querySelector('.global-presentation');
      presentationPage.style.display = 'none';
      fetchAndShuffleProducts(); // Appel de la fonction pour afficher les produits aléatoirement après la page de présentation
    }, 3000); // 3000 ms = 3 secondes de présentation
  }
  
  // Fonction pour récupérer les données des produits
  async function getAllProductData() {
    try {
      const response = await fetch("../data/products.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Une erreur est survenue :', error);
    }
  }
  
  // Fonction pour mélanger un tableau aléatoirement
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Fonction pour afficher les détails d'un produit
  function displayProduct(product) {
    const productName = document.querySelector('.product-title');
    productName.textContent = product.name;
  
    const productDescription = document.querySelector('.product-description');
    productDescription.textContent = product.description;
  
    const productPrice = document.querySelector('.product-price');
    productPrice.textContent = `${product.price} €`;
  
    const containerRightImageContainer = document.querySelector('.pres-products-right');
    while (containerRightImageContainer.firstChild) {
      containerRightImageContainer.removeChild(containerRightImageContainer.firstChild);
    }
  
    const divElement = document.createElement("div");
    const imgElement = document.createElement("img");
  
    if (product.img !== "") {
      imgElement.src = product.img;
      imgElement.alt = product.name;
      divElement.appendChild(imgElement);
    }
  
    let containerLeft = document.querySelector(".pres-products-left");
  
    while (containerLeft.firstChild) {
      containerLeft.removeChild(containerLeft.firstChild);
    }
  
    containerLeft.appendChild(productName)
    containerLeft.appendChild(productDescription)
    containerLeft.appendChild(productPrice)
  
    if (divElement.hasChildNodes()) {
      let imageParentDiv = document.querySelector(".pres-products-right")
      imageParentDiv.append(divElement);
    }
  }
  
  // Fonction pour afficher les produits aléatoirement
  function displayRandomProducts(products) {
    if (products.length === 0) {
      displayNextCategory();
      return;
    }
  
    const randomProduct = products.pop();
    displayProduct(randomProduct);
  
    setTimeout(() => {
      displayRandomProducts(products);
    }, 10000); // 10000 ms = 10 secondes
  }
  
  // Fonction pour récupérer et mélanger les produits
  function fetchAndShuffleProducts() {
    getAllProductData()
      .then(data => {
        const categories = ['pc', 'smartphones', 'audio', 'vr'];
        let allProducts = [];
  
        for (const category of categories) {
          const products = data[category];
          shuffleArray(products);
          allProducts.push(...products);
        }
        shuffleArray(allProducts);
  
        displayRandomProducts(allProducts);
      })
      .catch(error => {
        console.log('Une erreur est survenue :', error);
      });
  }
  
  // ***** Sidebar ***** //
  // (Votre code Sidebar actuel reste inchangé)
  
  // ***** Carrousel ***** //
  // (Votre code Carrousel actuel reste inchangé)
  
  // ***** Appel de la fonction pour afficher la page de présentation éclair ***** //
  window.addEventListener('DOMContentLoaded', () => {
    displayPresentationPage();
  });
  