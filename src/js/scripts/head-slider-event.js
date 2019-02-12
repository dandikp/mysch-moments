(function() {
	'use strict';

	var slideBackgroundWrapper = document.getElementsByClassName('head-slide_background_wrapper');

	window.addEventListener('scroll', function () {
		Array.prototype.forEach.call(slideBackgroundWrapper, function(el, index, array) {
			let scrollPos = window.scrollY;
			let slideVerticalTransform = scrollPos * 0.26;
			let screenHeight = window.innerHeight;

			if (scrollPos <= screenHeight) {
				el.style.transform = 'translate3d(0px, ' + slideVerticalTransform + 'px, 0px)';
			}
		});
	});
})();

