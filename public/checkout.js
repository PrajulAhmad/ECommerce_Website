document.addEventListener("DOMContentLoaded", () => {
  const orderItems = document.querySelector("#order-items");
  const orderTotalEl = document.querySelector("#order-total");
  const paymentForm = document.querySelector("#payment-form");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orderTotal = 0;

  if (cart.length === 0) {
    orderItems.innerHTML = "<p>Your cart is empty!</p>";
  } else {
    cart.forEach((item) => {
      const div = document.createElement("div");
      div.className = "order-item";

      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" width="60">
        <span>${item.name} (x${item.qty})</span>
        <span>$${item.price * item.qty}</span>
      `;

      orderItems.appendChild(div);
      orderTotal += item.price * item.qty;
    });

    orderTotalEl.textContent = orderTotal;
  }

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
    localStorage.removeItem("cart"); // Clear cart after order
    window.location.href = "index.html"; // Back to shop
  });
});
