(function() {
	'use strict';	

	var headSlideItems = document.getElementsByClassName('js-head-slide');
	
	// Head Slider
	var siemaHeadSlider = new Siema({
		selector: '.js-head-slider',
		loop: true,
		duration: 0,
		easing: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)'
	});

	siemaHeadSlider.detachEvents();
	siemaHeadSlider.attachResizeEvent();

	Array.prototype.forEach.call(headSlideItems, function(el, index, array){
		el.addEventListener('touchstart', function (event) {
			// siemaHeadSlider.next();
		});

		el.addEventListener('touchmove', function (event) {
			// siemaHeadSlider.next();
		});
		
		el.addEventListener('touchend', function (event) {
			// siemaHeadSlider.next();
		});
	});

	// setInterval(function() {
	// 	
	// }, 3000);
})();