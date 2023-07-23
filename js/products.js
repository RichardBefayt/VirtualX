const productsContainer = document.getElementById("products-container");
let productsData = null;

async function getAllProductData() {
    try {
        const response = await fetch("../data/products.json");
        productsData = await response.json();
        return productsData;
    } catch (error) {
        console.log('Une erreur est survenue :', error);
        return null;
    }
}

// Affiche les cartes de produits
function displayProductCards(productsData) {
    const products = productsData.vr;

    productsContainer.textContent = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productCardInner = document.createElement("div");
        productCardInner.classList.add("product-card-inner");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("product-card-header");

        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = product.name;

        const cardMiddle = document.createElement("div");
        cardMiddle.classList.add("product-card-middle");

        const cardImgContainer = document.createElement("div");
        cardImgContainer.classList.add("card-middle-img");

        const cardImg = document.createElement("img");
        cardImg.classList.add("card-img");
        cardImg.setAttribute("src", product.img);
        cardImg.setAttribute("alt", product.name);

        const cardDescriptionTitle = document.createElement("h4");
        cardDescriptionTitle.classList.add("card-description-title");
        cardDescriptionTitle.textContent = "En savoir plus";

        // const cardDescription = document.createElement("p");
        // cardDescription.classList.add("card-description");
        // cardDescription.textContent = product.description;

        const cardFooter = document.createElement("div");
        cardFooter.classList.add("product-card-footer");

        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card-price");
        cardPrice.textContent = product.price + " €";

        const cardIconsContainer = document.createElement("div");
        cardIconsContainer.classList.add("card-icons-container");

        const favoriteIcon = document.createElement("i");
        favoriteIcon.classList.add("card-icon", "fa-regular", "fa-bookmark", "favorite");

        const addToCartIcon = document.createElement("i");
        addToCartIcon.classList.add("card-icon", "fa-solid", "fa-cart-shopping", "add-to-cart");
        
        cardIconsContainer.appendChild(favoriteIcon);
        cardIconsContainer.appendChild(addToCartIcon);
        
        cardHeader.appendChild(cardTitle);
        cardImgContainer.appendChild(cardImg);
        cardMiddle.appendChild(cardImgContainer);
        cardMiddle.appendChild(cardDescriptionTitle);
        // cardMiddle.appendChild(cardDescription);
        cardFooter.appendChild(cardPrice);
        cardFooter.appendChild(cardIconsContainer);
        
        
        productCardInner.appendChild(cardHeader);
        productCardInner.appendChild(cardMiddle);
        productCardInner.appendChild(cardFooter);
        
        productCard.appendChild(productCardInner);

        productsContainer.appendChild(productCard);
    });
}

// Écouteur d'événement pour le menu déroulant de tri
const sortMenu = document.getElementById("sort");
sortMenu.addEventListener("change", (event) => {
    const selectedSortOrder = event.target.value;
    sortProducts(selectedSortOrder);
});

// Trie des produits par prix
function sortProducts(sortOrder) {
    if (!productsData) return; // Vérifie si les données des produits sont disponibles

    const products = productsData.vr.slice(); // Fait une copie du tableau des produits

    if (sortOrder === "asc") {
        products.sort((a, b) => a.price - b.price); // Trie par prix croissant
    } else if (sortOrder === "desc") {
        products.sort((a, b) => b.price - a.price); // Trie par prix décroissant
    }

    displayProductCards({ "vr": products }); // Affiche les produits triés
}

// Chargement des données depuis le fichier products.json et affichage initial des produits
getAllProductData().then((data) => {
    if (data) {
        displayProductCards(data);
    }
});