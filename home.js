// update cart number on header
const cartCount = document.getElementById("cart-count");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.textContent = cart.length;
