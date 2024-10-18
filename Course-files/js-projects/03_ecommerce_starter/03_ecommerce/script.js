document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.setAttribute("data-id", product.id);
    productDiv.innerHTML = `<span>${product.name} - $${product.price.toFixed(
      2
    )}</span>
    <button data-id="${product.id}">Add</button>`;

    productDiv.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find((product) => product.id === productId);
        addToCart(product);
      }
    });

    productList.appendChild(productDiv);
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }
  renderCart();
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    cartItems.innerText = ""; // Clear the cart
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.style.display = "none";

      cart.forEach((product, index) => {
        console.log("print");
        totalPrice += product.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `<span>${product.name} - $${product.price.toFixed(
          2
        )} </span> <button class="del-btn" data-id="${product.id}" >X</button>`;

        cartItem.querySelector(".del-btn").addEventListener("click", (e) => {
          const productId = parseInt(e.target.getAttribute("data-id"));
          removeItem(productId);
        });
        cartItems.appendChild(cartItem);
        totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.style.display = "block";
      totalPriceDisplay.textContent = `$0.00`;
    }
  }
  function removeItem(productId) {
    const productIndex = cart.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
      return;
    }
    cart.splice(productIndex, 1);
    saveCart();
    renderCart();
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Check Out Succesfully");
    renderCart();
  });
});
