const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
	slidesPerView: 1,
	spaceBetween: 20,
	autoplay: {
		delay: 3000,
		pauseOnMouseEnter: true,
		disableOnInteraction: false
	},

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
		draggable: true
  },

	breakpoints: {
		700: {
			slidesPerView: 2,
		},
		900: {
			slidesPerView: 3,
		},
		1100: {
			slidesPerView: 4,
		},
		1500: {
			slidesPerView: 5,
		},
	}
});
