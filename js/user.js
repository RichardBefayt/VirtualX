const onglets = document.querySelectorAll(".onglets");
const contenus = document.querySelectorAll(".contenu");

let index = 0;

onglets.forEach(onglet => {
    onglet.addEventListener("click", () => {
        if(onglet.classList.contains("active")) {
            return;
        } else {
            onglet.classList.add("active");
        }

        index = onglet.getAttribute("data-anim");

        for(i = 0; i < onglets.length; i++) {
            if(onglets[i].getAttribute("data-anim") != index) {
                onglets[i].classList.remove("active");
            }
        }

        for(j = 0; j < contenus.length; j++) {
            if(contenus[j].getAttribute("data-anim") == index) {
                contenus[j].classList.add("active-contenu");
            } else {
                contenus[j].classList.remove("active-contenu");
            }
        }
    });
});

// Fonction pour récupérer les produits ajoutés aux favoris depuis localStorage
function getFavoriteItems() {
    return JSON.parse(localStorage.getItem('favoriteItems')) || [];
}

function addToFavorites(product) {
    const favoriteItems = getFavoriteItems();
    const existingItem = favoriteItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        favoriteItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
        });
    }

    saveFavoriteItems(favoriteItems);
    displayFavoriteItems();
}

// Fonction pour vider le panier
function clearFavorites() {
    localStorage.removeItem('favoriteItems');
    displayFavoriteItems();
}

// Fonction pour supprimer un produit du panier
function deleteItem(productId) {
    const favoriteItems = getFavoriteItems();
    const updatedItems = favoriteItems.filter(item => item.id !== productId);
    saveFavoriteItems(updatedItems);
    displayFavoriteItems();
}

// Fonction pour sauvegarder les produits ajoutés au panier dans localStorage
function saveFavoriteItems(items) {
    localStorage.setItem('favoriteItems', JSON.stringify(items));
}

// Fonction pour afficher les produits du panier avec les boutons pour augmenter/diminuer la quantité
function displayFavoriteItems() {
    const productsList = document.getElementById('favorites');

    const favoriteItems = getFavoriteItems();

    productsList.textContent = '';

    favoriteItems.forEach(item => {
        const listItem = document.createElement('li');

        const listItemBox = document.createElement('div');
        listItemBox.classList.add("box-items");

        const productImg = document.createElement('img');
        productImg.src = item.img;
        productImg.alt = item.name;
        productImg.classList.add('product-image');

        const listItemSpanName = document.createElement('span');
        listItemSpanName.classList.add("span-name");

        const listItemSpanPrice = document.createElement('span');
        listItemSpanPrice.classList.add("span-price");
        
        const productPrice = parseFloat(item.price).toFixed(2);

        // Affichage du produit, prix à l'unité, quantité
        listItemSpanName.textContent = `${item.name}`;
        listItemSpanPrice.textContent = `${productPrice} €`;

        listItemBox.appendChild(productImg);
        listItemBox.appendChild(listItemSpanName);
        listItemBox.appendChild(listItemSpanPrice);

        listItem.appendChild(listItemBox);

        // Bouton "Supprimer" pour retirer le produit des favoris
        const deleteButton = document.createElement('button');
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-ban';
        deleteButton.appendChild(icon);

        deleteButton.addEventListener('click', () => {
            deleteItem(item.id);
        });

        listItem.appendChild(deleteButton);

        productsList.appendChild(listItem);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    displayFavoriteItems();

    // Bouton "Tout supprimer" pour réinitialiser les favoris à zéro
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', clearFavorites);
});