


let height = $('.account_container').height();
$('.account_display').css({ 'height': height }, 500)



$('.radio_account').on('change', () => {
  let height = $('.active-dis').height();
  height += 25;
$('.account_display').css({ 'height': height }, 500)

})






// slider

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


// // line menu

// document.addEventListener('DOMContentLoaded', () => {
//   let activeLabel = document.querySelector('.account_texture input:checked + label');
//   let line = document.getElementById('line');
//   line.style.left = activeLabel.offsetLeft + 'px';
//   line.style.width = activeLabel.offsetWidth + 'px';

//   let radioButtons = document.querySelectorAll('.radio_account');
//   radioButtons.forEach((radioButton) => {
//     radioButton.addEventListener('change', function () {
//       let selectedLabel = this.nextElementSibling;
//       line.style.left = selectedLabel.offsetLeft + 'px';
//       line.style.width = selectedLabel.offsetWidth + 'px';
//     });
//   });
// });


scroll = () => {
  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    this.scrollLeft -= (delta * 40); // Multiplied by 40
    e.preventDefault();
  }
  if (document.getElementById('accountTexture').addEventListener) {
    
    document.getElementById('accountTexture').addEventListener('mousewheel', scrollHorizontally, false);
  
    document.getElementById('accountTexture').addEventListener('DOMMouseScroll', scrollHorizontally, false);
  } else {
    
    document.getElementById('accountTexture').attachEvent('onmousewheel', scrollHorizontally);
  }
};

scroll();