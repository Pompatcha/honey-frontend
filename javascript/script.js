document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const productDiv = this.closest(".right");
      const productName = productDiv.querySelector(".product-name").textContent;
      const priceText = productDiv.querySelector(".price").textContent;
      const price = parseFloat(priceText.replace("$", "").trim());

      // ✅ Get quantity from select dropdown
      const quantitySelect = productDiv.querySelector("#quantity");
      if (!quantitySelect) {
        console.error("Quantity dropdown not found for", productName);
        return;
      }
      const selectedQuantity = parseInt(quantitySelect.value, 10) || 1;

      // ✅ Get size from select dropdown
      const sizeSelect = productDiv.querySelector("#size");
      if (!sizeSelect) {
        console.error("Size dropdown not found for", productName);
        return;
      }
      const selectedSize = sizeSelect.value;

      console.log(`Selected quantity for ${productName}:`, selectedQuantity);
      console.log(`Selected size for ${productName}:`, selectedSize);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let existingProduct = cart.find(
        (item) => item.name === productName && item.size === selectedSize
      );
      if (existingProduct) {
        // ✅ Add new quantity to existing quantity instead of replacing it
        existingProduct.quantity += selectedQuantity;
        existingProduct.totalPrice = (
          existingProduct.price * existingProduct.quantity
        ).toFixed(2);
      } else {
        let product = {
          name: productName,
          price: price,
          quantity: selectedQuantity,
          size: selectedSize,
          totalPrice: (price * selectedQuantity).toFixed(2),
        };
        cart.push(product);
      }

      // ✅ Store updated cart in localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // ✅ Redirect to cart page
      window.location.href = "shoppingcart.html";
    });
  });
});
