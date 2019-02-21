(function() {
	'use strict';

	// Head Slider
	var siemaHeadSlider = new Siema({
		selector: '.js-head-slider',
		loop: true,
		duration: 0,
		perPage: 1,
		startIndex: 0,
	});

	siemaHeadSlider.detachEvents();
	siemaHeadSlider.attachResizeEvent();
	siemaHeadSlider.startHeadSlider();
})();