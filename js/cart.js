// Fonction pour récupérer les produits ajoutés au panier depuis localStorage
function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Fonction pour afficher les produits du panier
function displayCartItems() {
  const productsList = document.getElementById('panier');
  const totalAmountElement = document.getElementById('total-panier');
  const cartItems = getCartItems();
  let totalAmount = 0;

  productsList.innerHTML = ''; // Efface la liste des produits du panier

  cartItems.forEach(item => {
    const listItem = document.createElement('li');

    // Vérifier si l'élément a une propriété price et que c'est un nombre
    if (item.hasOwnProperty('price') && !isNaN(item.price)) {
      const productPrice = parseFloat(item.price).toFixed(2);
      listItem.textContent = `${item.name} - ${productPrice} €`;
      productsList.appendChild(listItem);
      totalAmount += parseFloat(productPrice);
    } else {
      listItem.textContent = `${item.name} - Prix non valide`;
      productsList.appendChild(listItem);
    }
  });

  totalAmountElement.textContent = totalAmount.toFixed(2);
}

window.addEventListener('DOMContentLoaded', () => {
  displayCartItems();
});
