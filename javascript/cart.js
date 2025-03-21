export function addToCart(
  productId,
  productName,
  productImage,
  productPrice,
  productSize
) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find(
    (item) => item.id === productId && item.size === productSize
  );
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      image: productImage,
      price: productPrice,
      size: productSize,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart Updated:", cart);
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function removeFromCart(productId, productSize) {
  let cart = getCart().filter(
    (item) => !(item.id === productId && item.size === productSize)
  );
  localStorage.setItem("cart", JSON.stringify(cart));
}

// example use
// addToCart(1, "T-Shirt", "tshirt.jpg", 19.99, "M");
// addToCart(1, "T-Shirt", "tshirt.jpg", 19.99, "L");
