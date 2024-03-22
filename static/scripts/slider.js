var swiper = new Swiper(".headerSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    effect: "fade",
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  // var swiper = new Swiper(".bestSwiper", {
  //   direction: "vertical",
  //   loop: true,
  //   slidesPerView: 1,
  //   spaceBetween: 30,
  //   mousewheel: true,
  //   autoplay: {
  //     delay: 2000,
  //     disableOnInteraction: false,
  //   },
  //   breakpoints: {
  //     300: {
  //       direction: "horizontal",
  //       coverflowEffect: {
  //         rotate: 50,
  //         stretch: 0,
  //         depth: 100,
  //         modifier: 1,
  //         slideShadows: true,
  //       },
  //     },
  //     600: {
  //       direction: "vertical",
  //     }
  //   }
  // });