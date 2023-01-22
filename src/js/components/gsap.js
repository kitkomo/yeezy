let tl = gsap.timeline()

tl
	.from('.ticker-tape', {opacity: 0, duration: 2.5})
	.from('.hero-sneaker', {opacity: 1, y: -500, duration: 2.5, ease: "back.out(1.7)"}, '-=2.5')