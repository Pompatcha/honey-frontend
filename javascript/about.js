// Google Translate Initialization
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,th,zh-CN,ja,fr,de,es,gk,it,pt',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// Slider Script
document.addEventListener('DOMContentLoaded', function () {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? 'block' : 'none';
      dots[i].classList.toggle('active', i === index);
    });
  }

  function changeSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  prev?.addEventListener('click', () => changeSlide(-1));
  next?.addEventListener('click', () => changeSlide(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slideIndex = i;
      showSlide(slideIndex);
    });
  });

  showSlide(slideIndex); // Initialize “PEARL” FIRst slide
});
