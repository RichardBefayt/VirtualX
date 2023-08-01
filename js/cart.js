// Fonction pour récupérer les produits ajoutés au panier depuis localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
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

    if (item && item.quantity > 0) {
        item.quantity = (item.quantity || 0) - 1;
        saveCartItems(cartItems);
        displayCartItems();
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

// Fonction pour afficher les produits du panier avec les boutons pour augmenter/diminuer la quantité
function displayCartItems() {
    const productsList = document.getElementById('panier');
    const totalAmountElement = document.getElementById('total-panier');
    const cartItems = getCartItems();
    let totalAmount = 0;

    productsList.textContent = ''; // Efface la liste des produits du panier

    cartItems.forEach(item => {
        const listItem = document.createElement('li');

        const listItemBox = document.createElement('div');
        listItemBox.classList.add("box-items");

        const listItemSpanName = document.createElement('span');
        listItemSpanName.classList.add("span-name");

        const listItemSpanPrice = document.createElement('span');
        listItemSpanPrice.classList.add("span-price");

        const listItemSpanQuantity = document.createElement('span');
        listItemSpanQuantity.classList.add("span-quantity");
        
        const productPrice = parseFloat(item.price).toFixed(2); // S'assure que le prix est bien un nombre
        const totalPrice = (item.price * (item.quantity || 1)).toFixed(2);

        // Affichage du produit, prix à l'unité, quantité
        listItemSpanName.textContent = `${item.name}`;
        listItemSpanPrice.textContent = `${productPrice} €`;
        listItemSpanQuantity.textContent = `${item.quantity || 1}`;

        listItemBox.appendChild(listItemSpanName);
        listItemBox.appendChild(listItemSpanPrice);
        listItemBox.appendChild(listItemSpanQuantity);

        listItem.appendChild(listItemBox);

        // Affichage du prix total pour ce produit (prix * quantité)
        const totalPriceText = document.createElement('span');
        totalPriceText.textContent = `Total: ${totalPrice} €`;
        listItem.appendChild(totalPriceText);

        // Bouton "+" pour augmenter la quantité
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
            increaseQuantity(item.id);
            totalAmount += parseFloat(item.price);
            totalAmountElement.textContent = totalAmount.toFixed(2);
        });

        // Bouton "-" pour diminuer la quantité
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => {
            decreaseQuantity(item.id);
            totalAmount -= parseFloat(item.price);
            totalAmountElement.textContent = totalAmount.toFixed(2);
        });

        // Bouton "Supprimer" pour retirer complètement le produit du panier
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            totalAmount -= parseFloat(totalPrice);
            totalAmountElement.textContent = totalAmount.toFixed(2);
            deleteItem(item.id);
        });

        listItem.appendChild(plusButton);
        listItem.appendChild(minusButton);
        listItem.appendChild(deleteButton);

        productsList.appendChild(listItem);

        totalAmount += parseFloat(totalPrice);
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);
}

window.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    // Bouton "Vider le panier" pour réinitialiser le panier à zéro
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', clearCart);
});
