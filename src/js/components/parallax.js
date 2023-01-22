let image = document.getElementsByClassName('parallax-right');
new simpleParallax(image, {
	orientation: 'right',
	scale: 1.8,
	overflow: true,
	delay: 0
});

let image2 = document.getElementsByClassName('parallax-left');
new simpleParallax(image2, {
	orientation: 'left',
	scale: 1.8,
	overflow: true,
	delay: 0
});