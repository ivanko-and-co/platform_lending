

$('.btn-smooth').on('click', () => {
    let heightS = $('.account_display-smooth').height();
    heightS += 30;
    $('.account_display').css({ 'height': heightS }, 500)
})





$('.btn-textural').on('click', () => {
    let heightT = $('.account_display-texture').height();
    heightT += 30;
    $('.account_display').css({ 'height': heightT }, 500)
})



$('.btn-frescoes').on('click', () => {
    let heightF = $('.account_display-texture').height();
    $('.account_display').css({ 'height': heightF }, 500)
})




// line menu

const slides = document.querySelectorAll('.slide');
let currentSlide = 2; 

function showSlide() {
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('active');
      
    } else {
      slide.classList.remove('active');
     
    }
  });
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
}


setInterval(nextSlide, 3000);


