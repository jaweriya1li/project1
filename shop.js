
const shopContainer = document.querySelector(".product-grid");
const cartCount = document.getElementById("cartCount");


const API_URL = "https://fakestoreapi.com/products/category/jewelery";

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    shopContainer.innerHTML = ""; 

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <div class="buttons">
          <button class="add-to-cart">Add to Cart</button>
          <button class="view-detail" data-id="${product.id}">View Details</button>
        </div>
      `;

      shopContainer.appendChild(card);
    });

    // Add to Cart functionality
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", e => {
        const card = e.target.closest(".product-card");
        const name = card.querySelector("h3").textContent;
        const price = parseFloat(card.querySelector("p").textContent.replace("$", ""));
        const image = card.querySelector("img").src;
        const product = { name, price, image };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        alert(`${name} added to your cart 💎`);
      });
    });

    
    document.querySelectorAll(".view-detail").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.target.dataset.id;
        localStorage.setItem("productId", id);
        window.location.href = "product.html"; 
      });
    });

  } catch (error) {
    shopContainer.innerHTML = `<p style="color:red;">Failed to load products ❌</p>`;
    console.error(error);
  }
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
}

updateCartCount();
loadProducts();
