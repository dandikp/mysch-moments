// Header Event
(function() {
	'use strict';

	var mainContent = document.body;
	var lHeaderWrapper = document.getElementsByClassName('l-header--wrapper')[0];
	var lHeader = document.getElementById('js-l-header');
	var mainNavigation = document.getElementById('js-main-nav');
	var mobileMenuButton = document.getElementsByClassName('mobile-nav-button')[0];
	var mobileSearchButton = document.getElementsByClassName('mobile-search-button')[0];
	var searchButton = document.getElementsByClassName('search-button')[0];
	var searchWrapper = document.getElementsByClassName('search-form--wrapper')[0];
	var searchInput = document.getElementById('js-search-el');
	var logo = document.getElementsByClassName('main-logo--image normal')[0];
	var logoSticky = document.getElementsByClassName('main-logo--image sticky')[0];
	var stickyHeaderPos = 152;

	// window.scroll({
	// 	top: 0,
	// 	let: 0,
	// 	behavior: 'smooth'
	// });

	window.addEventListener('scroll', function () {
		let scrollPos = window.scrollY;

		if (scrollPos  >= stickyHeaderPos) {
			lHeaderWrapper.classList.add('sticky');

			logo.style.display = 'none';
			logoSticky.style.display = 'block';
		} else {
			lHeaderWrapper.classList.remove('sticky');

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
			
			searchInput.focus();
		}
	});

	mobileSearchButton.addEventListener('click', function () {
		let isActive = searchWrapper.classList.contains('active');

		if (isActive) {
			searchWrapper.classList.remove('active');
		} else {
			searchWrapper.classList.add('active');
			
			searchInput.focus();
		}
	});

	mobileMenuButton.addEventListener('click', function () {
		let hamburgerIsActive = mobileMenuButton.classList.contains('active');
		let headerIsSticky = lHeaderWrapper.classList.contains('sticky');

		if (hamburgerIsActive) {
			mobileMenuButton.classList.remove('active');
			mainContent.classList.remove('mobileMenuWasOpened');
			mainNavigation.classList.remove('mobileMenuWasOpened');
		} else {
			mobileMenuButton.classList.add('active');
			mainContent.classList.add('mobileMenuWasOpened');
			mainNavigation.classList.add('mobileMenuWasOpened');

			if (!headerIsSticky) {
				lHeaderWrapper.classList.add('sticky');
				logo.style.display = 'none';
				logoSticky.style.display = 'block';
			}
		}
	})
})();