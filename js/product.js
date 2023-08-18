const productContainer = document.querySelector(".product-container");
let productData = null;

async function getProductData() {
    try {
        const response = await fetch("../data/products.json");
        productData = await response.json();
        return productData;
    } catch (error) {
        console.log('Une erreur est survenue :', error);
        return null;
    }
}

// Récupère l'ID du produit à partir de l'URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Affiche le produit spécifique en fonction de son ID
function displayProduct(productId) {
    const product = productData.vr.find(product => product.id === productId);

    if (!product) {
        console.log("Produit introuvable.");
        return;
    }

    const productImgContainer = document.querySelector(".product-img-container");
    const productImg = productImgContainer.querySelector(".product-img");
    productImg.src = product.img;
    productImg.alt = product.name;

    const productTitle = document.querySelector(".product-title");
    productTitle.textContent = product.name;

    const productDescription = document.querySelector(".product-description");
    productDescription.textContent = product.description;

    const productPrice = document.querySelector(".product-price");
    productPrice.textContent = product.price + " €";

    const addToCartButton = document.getElementById("addToCartButton");
    addToCartButton.addEventListener("click", () => addToCart(productId));
    
    const addToFavoritesButton = document.getElementById("addToFavoritesButton");
    addToFavoritesButton.addEventListener("click", () => addToFavorites(productId));
}

// Fonction pour ajouter un produit au panier en utilisant localStorage
function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = productData.vr.find(item => item.id === productId);

    if (product) {
        const existingProduct = cartItems.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity ?? 0) + 1;
        } else {
            product.quantity = 1; // Si le produit n'est pas déjà dans le panier, on initialise sa quantité à 1
            cartItems.push(product);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Produit ajouté au panier !');
    }
}

// Fonction pour ajouter un produit aux favoris en utilisant localStorage
function addToFavorites(productId) {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    const product = productData.vr.find(item => item.id === productId);

    if (product) {
        const existingProduct = favoriteItems.find(item => item.id === productId);

        if (existingProduct) {
            // Le produit existe déjà dans les favoris, mettez à jour la quantité
            existingProduct.quantity = (existingProduct.quantity || 0) + 1;
            alert('Ce produit est déjà dans vos favoris !');
        } else {
            // Ajoutez le produit aux favoris avec une quantité de 1
            product.quantity = 1;
            favoriteItems.push(product);
            alert('Produit ajouté aux favoris !');
        }

        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }
}


window.addEventListener('DOMContentLoaded', async () => {
    const productId = getProductIdFromURL();

    if (productId) { // Vérifier si l'ID existe
        const productData = await getProductData();
        if (productData) {
            displayProduct(productId);
        }
    } else {
        console.log("Identifiant du produit non trouvé dans l'URL.");
    }
});