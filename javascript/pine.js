<script>
  const sizeEl = document.getElementById("size");
  const quantityEl = document.getElementById("quantity");
  const totalEl = document.getElementById("totalPrice");

  function updateTotal() {
    const price = parseInt(sizeEl.value);
    const quantity = parseInt(quantityEl.value);
    const total = price * quantity;

    totalEl.textContent = `Total: ${total} THB`;
  }

  // Attach event listeners to update total when selection changes
  sizeEl.addEventListener("change", updateTotal);
  quantityEl.addEventListener("change", updateTotal);

  // Run once on load to initialize
  updateTotal();
</script>
