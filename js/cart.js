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

// Fonction pour afficher les produits du panier
function displayCartItems() {
  const productsList = document.getElementById('panier');
  const totalAmountElement = document.getElementById('total-panier');
  const cartItems = getCartItems(); // Assurez-vous que cette ligne est présente
  let totalAmount = 0;

  productsList.innerHTML = ''; // Efface la liste des produits du panier

  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    const productPrice = (item.price * (item.quantity || 1)).toFixed(2);
    listItem.textContent = `${item.name} - ${productPrice} € (Quantité: ${item.quantity || 1})`;

    // Bouton "+" pour augmenter la quantité
    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', () => increaseQuantity(item.id));

    // Bouton "-" pour diminuer la quantité
    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.addEventListener('click', () => decreaseQuantity(item.id));

    // Bouton "Supprimer" pour retirer complètement le produit du panier
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => deleteItem(item.id));

    listItem.appendChild(plusButton);
    listItem.appendChild(minusButton);
    listItem.appendChild(deleteButton);

    productsList.appendChild(listItem);

    totalAmount += parseFloat(productPrice);
  });

  totalAmountElement.textContent = totalAmount.toFixed(2);
}

window.addEventListener('DOMContentLoaded', () => {
  displayCartItems();

  // Bouton "Vider le panier" pour réinitialiser le panier à zéro
  const clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', clearCart);
});
