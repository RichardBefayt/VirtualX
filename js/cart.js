// Fonction pour récupérer les produits du localStorage et les afficher dans le panier
function displayCartProducts() {
    const cartList = document.getElementById("panier");
    if (!cartList) {
      console.log("Élément 'panier' introuvable.");
      return;
    }
  
    // Nettoyer le panier avant d'ajouter les produits
    cartList.innerHTML = "";
  
    // Parcourir tous les éléments du localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const productString = localStorage.getItem(key);
  
      if (productString) {
        const product = JSON.parse(productString);
  
        const listItem = document.createElement("li");
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
  
        const cartItemImg = document.createElement("img");
        cartItemImg.src = product.img;
        cartItemImg.alt = product.name;
        cartItemImg.classList.add("cart-item-img");
        cartItemDiv.appendChild(cartItemImg);
  
        const cartItemDetails = document.createElement("div");
        cartItemDetails.classList.add("cart-item-details");
  
        const cartItemTitle = document.createElement("h4");
        cartItemTitle.textContent = product.name;
        cartItemDetails.appendChild(cartItemTitle);
  
        const cartItemPrice = document.createElement("p");
        cartItemPrice.textContent = product.price + " €";
        cartItemDetails.appendChild(cartItemPrice);
  
        const cartItemDescription = document.createElement("p");
        cartItemDescription.textContent = product.description;
        cartItemDetails.appendChild(cartItemDescription);
  
        cartItemDiv.appendChild(cartItemDetails);
        listItem.appendChild(cartItemDiv);
  
        cartList.appendChild(listItem);
      }
    }
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    // Afficher les produits du panier au chargement de la page
    displayCartProducts();
  
    // Calculer et afficher le total du panier
    calculateAndDisplayTotal();
  });
  
  // Fonction pour calculer et afficher le total du panier
  function calculateAndDisplayTotal() {
    const totalElement = document.getElementById("total-panier");
    if (!totalElement) {
      console.log("Élément 'total-panier' introuvable.");
      return;
    }
  
    let total = 0;
  
    // Parcourir tous les éléments du localStorage et additionner les prix
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const productString = localStorage.getItem(key);
  
      if (productString) {
        const product = JSON.parse(productString);
        total += parseFloat(product.price);
      }
    }
  
    // Afficher le total avec deux décimales
    totalElement.textContent = total.toFixed(2) + " €";
  }  