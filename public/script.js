const products = [
  { id: 1, name: "Casual Shirt", price: 25, img: "images/shirt.jpg" },
  { id: 2, name: "Smartphone", price: 499, img: "images/phone.jpg" },
  { id: 3, name: "Wrist Watch", price: 120, img: "images/watch.jpg" },
  { id: 4, name: "Leather Jacket", price: 150, img: "images/jacket.jpg" },
  { id: 5, name: "Running Shoes", price: 80, img: "images/shoes.jpg" },
  { id: 6, name: "Backpack", price: 60, img: "images/backpack.jpg" },
  { id: 7, name: "Wireless Earbuds", price: 99, img: "images/earbuds.jpg" },
];

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js loaded");

  const productList = document.getElementById("product-list");

  // Generate product cards dynamically
  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";
    div.dataset.id = p.id;
    div.dataset.name = p.name;
    div.dataset.price = p.price;

    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <div class="button-row">
        <button class="add-cart">Add to Cart</button>
        <button class="buy-now">Buy Now</button>
      </div>
    `;

    productList.appendChild(div);
  });

  // Attach event listeners
  attachEventListeners();
});

// Update cart count in header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );
}

// Show login/logout info
function updateUserInfo() {
  const userInfo = document.getElementById("user-info");
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    userInfo.innerHTML = `👤 ${currentUser} | <a href="#" id="logout">Logout</a>`;
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  } else {
    userInfo.innerHTML = `<a href="login.html">Login</a>`;
  }
}

// Attach event listeners for buttons
function attachEventListeners() {
  updateCartCount();
  updateUserInfo();

  // Add to Cart
  document.querySelectorAll(".add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);

      if (!localStorage.getItem("currentUser")) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let existing = cart.find((item) => item.id === id);

      if (existing) existing.qty++;
      else
        cart.push({
          id,
          name,
          price,
          qty: 1,
          img: product.querySelector("img").src,
        });

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${name} added to cart!`);
    });
  });

  // Buy Now
  document.querySelectorAll(".buy-now").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const product = e.target.closest(".product");
      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);

      if (!localStorage.getItem("currentUser")) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
      }

      // Replace cart with only this product
      let cart = [
        { id, name, price, qty: 1, img: product.querySelector("img").src },
      ];
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html";
    });
  });
}
