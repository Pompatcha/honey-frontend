document.querySelectorAll('.product-card').forEach(card => {
  const gallery = card.querySelector('.image-gallery');
  const imgs = gallery.querySelectorAll('img');
  let idx = 0;

  gallery.addEventListener('click', () => {
    imgs[idx].classList.add('hidden');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.remove('hidden');
  });

  const button = card.querySelector('.add-to-cart');
  const qty = card.querySelector('.quantity');
  button.addEventListener('click', () => {
    alert(`Added ${qty.value} × ${card.querySelector('.product-name').textContent} to cart.`);
    // Add to cart logic would go here
  });
});
