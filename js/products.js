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

    products.forEach((product) => {
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

        const cardLink = document.createElement("a");
        cardLink.setAttribute("href", `product.html?id=${product.id}`);
        cardLink.setAttribute("data-id", product.id);

        const cardDescriptionTitle = document.createElement("h4");
        cardDescriptionTitle.classList.add("card-description-title");
        cardDescriptionTitle.textContent = "En savoir plus";

        const cardFooter = document.createElement("div");
        cardFooter.classList.add("product-card-footer");

        const cardPrice = document.createElement("p");
        cardPrice.classList.add("card-price");
        cardPrice.textContent = product.price + " €";

        const cardIconsContainer = document.createElement("div");
        cardIconsContainer.classList.add("card-icons-container");

        const addToFavoriteIcon = document.createElement("i");
        addToFavoriteIcon.setAttribute("id", product.id);
        addToFavoriteIcon.classList.add("card-icon", "fa-regular", "fa-bookmark", "favorite");

        addToFavoriteIcon.addEventListener("click", (event) => {
            // console.log("click :" + event.target.id);
            const productId = event.target.getAttribute("data-id");
            const selectedProduct = products.find(product => product.id === productId);
            if (selectedProduct) {
                addToFavorites(selectedProduct);
            }
        });

        const addToCartIcon = document.createElement("i");
        addToCartIcon.classList.add("card-icon", "fa-solid", "fa-cart-shopping", "add-to-cart");
        addToCartIcon.setAttribute("data-id", product.id);

        addToFavoriteIcon.addEventListener("click", (event) => {
            // console.log("click :" + event.target.id);
            const productId = event.target.id
            const selectedProduct = products.find(product => product.id === productId);
            if (selectedProduct) {
                addToFavorites(selectedProduct);
            }
        });
        
        cardIconsContainer.appendChild(addToFavoriteIcon);
        cardIconsContainer.appendChild(addToCartIcon);
        
        cardHeader.appendChild(cardTitle);
        cardImgContainer.appendChild(cardImg);
        cardMiddle.appendChild(cardImgContainer);
        cardLink.appendChild(cardDescriptionTitle)
        cardMiddle.appendChild(cardLink);
        cardFooter.appendChild(cardPrice);
        cardFooter.appendChild(cardIconsContainer);
        
        productCardInner.appendChild(cardHeader);
        productCardInner.appendChild(cardMiddle);
        productCardInner.appendChild(cardFooter);
        
        productCard.appendChild(productCardInner);

        productsContainer.appendChild(productCard);
    });
}

// Fonction de recherche des produits par nom
function searchProducts(query) {
    if (!productsData) return []; // Vérifie si les données des produits sont disponibles

    const products = productsData.vr;

    if (!query) return products; // Si la recherche est vide, renvoyer tous les produits

    query = query.toLowerCase();
    
    return products.filter(product => product.name.toLowerCase().includes(query));
}

// Écouteur d'événement pour le champ de recherche
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    const filteredProducts = searchProducts(searchQuery);
    displayProductCards({ "vr": filteredProducts });
});

// Fonction pour ajouter un produit aux favoris en utilisant localStorage
function addToFavorites(product) {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    const existingProduct = favoriteItems.find(item => item.id === product.id);

    if (existingProduct) {
        // Le produit existe déjà dans les favoris, mettez à jour la quantité
        existingProduct.id = product.id;
        alert('Ce produit est déjà dans vos favoris !');
    } else {
        favoriteItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
        });
    }

    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    alert('Produit ajouté aux favoris !');
}

// Fonction pour ajouter un produit au panier en utilisant localStorage
function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Produit ajouté au panier !');
}

// Écouteur d'événement pour le menu déroulant de tri
const sortMenu = document.getElementById("sort-select");
sortMenu.addEventListener("change", (event) => {
    const selectedSortOrder = event.target.value;
    
    if (selectedSortOrder === "default") {
        displayProductCards(productsData);
    } else {
        sortProducts(selectedSortOrder);
    }
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