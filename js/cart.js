// Fonction pour récupérer les produits ajoutés au panier depuis localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function addToCart(product) {
    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1
        });
    }

    saveCartItems(cartItems);
    displayCartItems();
}

// Fonction pour augmenter la quantité d'un produit dans le panier
function increaseQuantity(productId) {
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.id === productId);

    if (item) {
        item.quantity = (item.quantity ?? 0) + 1; // Utilisation de l'opérateur de coalescence nulle
        saveCartItems(cartItems);
        displayCartItems();
    }
}

// Fonction pour diminuer la quantité d'un produit dans le panier
function decreaseQuantity(productId) {
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.id === productId);

    if (item && item.quantity > 1) {  // Ajouter cette condition pour éviter que la quantité ne descende en-dessous de 1
        item.quantity = item.quantity - 1;
        saveCartItems(cartItems);
        displayCartItems();
    } else if (item && item.quantity === 1) {
        deleteItem(productId);  // Si la quantité est égale à 1, supprimer le produit
    }
}

// Fonction pour vider le panier
function clearCart() {
    localStorage.removeItem('cartItems');
    displayCartItems();
}

// Fonction pour supprimer un produit du panier
function deleteItem(productId) {
    const cartItems = getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== productId);
    saveCartItems(updatedItems);
    displayCartItems();
}

// Fonction pour sauvegarder les produits ajoutés au panier dans localStorage
function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

// Fonction pour afficher le message si le panier est vide
function displayEmptyCartMessage() {
    const productsList = document.getElementById('panier');
    const totalAmountElement = document.getElementById('total-panier');

    // Efface tous les éléments enfants de la liste des produits du panier
    while (productsList.firstChild) {
        productsList.removeChild(productsList.firstChild);
    }

    // Crée un élément de paragraphe (p) pour afficher le message
    const emptyCartMessage = document.createElement('p');
    emptyCartMessage.textContent = 'Votre panier est vide.';
    emptyCartMessage.classList.add('empty-cart-message'); // Ajout de la classe "empty-cart-message"

    // Ajoute l'élément du message au panier
    productsList.appendChild(emptyCartMessage);

    totalAmountElement.textContent = '0.00';

    const cartContainer = document.querySelector('.cart-container');
    cartContainer.classList.add('with-filter');
}

// Fonction pour afficher les produits du panier avec les boutons pour augmenter/diminuer la quantité
function displayCartItems() {
    const productsList = document.getElementById('panier');
    const totalAmountElement = document.getElementById('total-panier');
    const cartItems = getCartItems();
    let totalAmount = 0;

    if (cartItems.length === 0) {
        displayEmptyCartMessage();
        return;
    } else {
        const cartContainer = document.querySelector('.cart-container');
        cartContainer.classList.add('with-filter');
    }

    productsList.textContent = ''; // Efface la liste des produits du panier

    cartItems.forEach(item => {
        const listItem = document.createElement('li');

        const listItemBox = document.createElement('div');
        listItemBox.classList.add("box-items");

        const listImgBox = document.createElement('div');
        listImgBox.classList.add("box-img");

        const listImg = document.createElement('img');
        listImg.classList.add("img-list");
        listImg.src = item.img;
        listImg.alt = item.name;

        const listItemSpanName = document.createElement('span');
        listItemSpanName.classList.add("span-name");

        const listItemSpanPrice = document.createElement('span');
        listItemSpanPrice.classList.add("span-price");

        const listItemSpanQuantity = document.createElement('span');
        listItemSpanQuantity.classList.add("span-quantity");
        
        const productPrice = parseFloat(item.price).toFixed(0); // S'assure que le prix est bien un nombre
        const totalPrice = (item.price * (item.quantity || 1)).toFixed(0);

        // Affichage du produit, prix à l'unité, quantité
        listItemSpanName.textContent = `${item.name}`;
        listItemSpanPrice.textContent = `${productPrice} €`;
        listItemSpanQuantity.textContent = `Qté: ${item.quantity || 1}`;

        listImgBox.appendChild(listImg);

        listItemBox.appendChild(listItemSpanName);
        listItemBox.appendChild(listItemSpanPrice);
        listItemBox.appendChild(listItemSpanQuantity);

        listItem.appendChild(listImgBox);
        listItem.appendChild(listItemBox);

        // Affichage du prix total pour ce produit (prix * quantité)
        const totalPriceText = document.createElement('span');
        totalPriceText.classList.add('total-price');
        totalPriceText.textContent = `Total: ${totalPrice} €`;
        listItem.appendChild(totalPriceText);

        // Bouton "+" pour augmenter la quantité
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
            increaseQuantity(item.id);
            totalAmount += parseFloat(item.price);
            totalAmountElement.textContent = totalAmount.toFixed(0);
        });

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Bouton "-" pour diminuer la quantité
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => {
            decreaseQuantity(item.id);
            totalAmount -= parseFloat(item.price);
            totalAmountElement.textContent = totalAmount.toFixed(0);
        });

        // Bouton "Supprimer" pour retirer complètement le produit du panier
        const deleteButton = document.createElement('button');
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-ban';
        deleteButton.appendChild(icon);

        deleteButton.addEventListener('click', () => {
            totalAmount -= parseFloat(totalPrice);
            totalAmountElement.textContent = totalAmount.toFixed(0);
            deleteItem(item.id);
        });

        buttonsContainer.appendChild(plusButton);
        buttonsContainer.appendChild(minusButton);
        buttonsContainer.appendChild(deleteButton);
        listItem.appendChild(buttonsContainer);

        productsList.appendChild(listItem);

        totalAmount += parseFloat(totalPrice);
    });

    totalAmountElement.textContent = totalAmount.toFixed(0);
    
    // Après avoir calculé le montant total
    localStorage.setItem('totalAmount', totalAmount);
}

function clearCart() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalAmount'); // Réinitialise le montant total
    displayCartItems();
}

window.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    // Bouton "Vider le panier" pour réinitialiser le panier à zéro
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', clearCart);
});