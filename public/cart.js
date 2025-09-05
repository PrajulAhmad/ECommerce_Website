document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.querySelector(".cart-items");
  const grandTotalEl = document.querySelector("#grand-total");
  const itemCountEl = document.querySelector("#item-count");
  const clearCartBtn = document.querySelector("#clear-cart");
  const checkoutBtn = document.querySelector("#checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartBody.innerHTML = "";
    let grandTotal = 0;
    let itemCount = 0;

    if (cart.length === 0) {
      cartBody.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
      grandTotalEl.textContent = "0";
      itemCountEl.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      const total = item.price * item.qty;
      grandTotal += total;
      itemCount += item.qty;

      const div = document.createElement("div");
      div.className = "cart-card";

      div.innerHTML = `
        <div class="cart-card-info">
          <img src="${item.img}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Total: $${total}</p>
            <div class="qty-controls">
              <button class="qty-btn" data-index="${index}" data-action="dec">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-index="${index}" data-action="inc">+</button>
            </div>
          </div>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      cartBody.appendChild(div);
    });

    grandTotalEl.textContent = grandTotal;
    itemCountEl.textContent = itemCount;

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-btn")) {
      const index = e.target.dataset.index;
      const action = e.target.dataset.action;

      if (action === "inc") {
        cart[index].qty++;
      } else if (action === "dec" && cart[index].qty > 1) {
        cart[index].qty--;
      }
      renderCart();
    }

    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    }
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // ✅ Save cart before redirect
    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ Redirect to checkout page
    window.location.href = "checkout.html";
  });

  // Initial render
  renderCart();
});
