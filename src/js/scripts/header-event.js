// Header Event
(function() {
	'use strict';

	var lHeaderWrapper = document.getElementsByClassName('l-header--wrapper')[0];
	var lHeader = document.getElementById('js-l-header');
	var mobileMenuButton = document.getElementsByClassName('mobile-nav-button')[0];
	var mobileSearchButton = document.getElementsByClassName('mobile-search-button')[0];
	var searchButton = document.getElementsByClassName('search-button')[0];
	var searchWrapper = document.getElementsByClassName('search-form--wrapper')[0];
	var logo = document.getElementsByClassName('main-logo--image__normal')[0];
	var logoSticky = document.getElementsByClassName('main-logo--image__sticky')[0];
	var stickyHeaderPos = 152;

	// window.scroll({
	// 	top: 0,
	// 	let: 0,
	// 	behavior: 'smooth'
	// });

	window.addEventListener('scroll', function () {
		let scrollPos = window.scrollY;

		if (scrollPos  >= stickyHeaderPos) {
			lHeaderWrapper.classList.add('l-header--wrapper__sticky');

			logo.style.display = 'none';
			logoSticky.style.display = 'block';


		} else {
			lHeaderWrapper.classList.remove('l-header--wrapper__sticky');

			logo.style.display = 'block';
			logoSticky.style.display = 'none';
		}
	});

	searchButton.addEventListener('click', function () {
		let isActive = searchWrapper.classList.contains('active');

		if (isActive) {
			searchWrapper.classList.remove('active');
		} else {
			searchWrapper.classList.add('active');
		}
	})
})();