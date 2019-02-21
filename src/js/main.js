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

;// Header Event
(function() {
	'use strict';

	var mainContent = document.body;
	var lHeaderWrapper = document.getElementsByClassName('l-header_wrapper')[0];
	var lHeader = document.getElementById('js-l-header');
	var mainNavigation = document.getElementById('js-main-nav');
	var mobileMenuButton = document.getElementsByClassName('mobile-nav-button')[0];
	var mobileSearchButton = document.getElementsByClassName('mobile-search-button')[0];
	var searchButton = document.getElementsByClassName('search-button')[0];
	var searchWrapper = document.getElementsByClassName('search-form_wrapper')[0];
	var searchInput = document.getElementById('js-search-el');
	var logo = document.getElementsByClassName('main-logo_image normal')[0];
	var logoSticky = document.getElementsByClassName('main-logo_image sticky')[0];
	var submenuLink = document.getElementsByClassName('dropdown-menu_wrapper');
	var subSubmenuLink = document.getElementsByClassName('dropdown-submenu_wrapper');
	var stickyHeaderPos = 152;

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
			mainContent.classList.remove('is-mobile-menu-open');
			mainNavigation.classList.remove('is-mobile-menu-open');
		} else {
			mobileMenuButton.classList.add('active');
			mainContent.classList.add('is-mobile-menu-open');
			mainNavigation.classList.add('is-mobile-menu-open');

			if (!headerIsSticky) {
				lHeaderWrapper.classList.add('sticky');
				logo.style.display = 'none';
				logoSticky.style.display = 'block';
			}
		}
	});

	Array.prototype.forEach.call(submenuLink, function(el, index, array){
		let triggerButton = el.childNodes[1];
		let dropdownMenu = el.childNodes[3];

		triggerButton.addEventListener('click', function (event) {
			let isActive = dropdownMenu.classList.contains('active');
	
			if (isActive) {
				dropdownMenu.classList.remove('active');
			} else {
				dropdownMenu.classList.add('active');
			}
			
			event.preventDefault();
		});
	});

	Array.prototype.forEach.call(subSubmenuLink, function(el, index, array){
		let triggerButton = el.childNodes[1];
		let dropdownMenu = el.childNodes[3];

		triggerButton.addEventListener('click', function (event) {
			let isActive = dropdownMenu.classList.contains('active');
	
			if (isActive) {
				dropdownMenu.classList.remove('active');
				el.classList.remove('active');
			} else {
				dropdownMenu.classList.add('active');
				el.classList.add('active');
			}
			
			event.preventDefault();
		});
	});
})();;// (function () {
// 	'use strict';

// 	var stickyHeaderPos = 152;
	
// 	// var slideBackgroundWrapper = document.getElementsByClassName('head-slide_background_wrapper');

// 	window.addEventListener('scroll', function () {
// 		let scrollPos = window.scrollY;

// 		if (scrollPos  >= stickyHeaderPos) {
// 			lHeaderWrapper.classList.add('sticky');

// 			logo.style.display = 'none';
// 			logoSticky.style.display = 'block';
// 		} else {
// 			lHeaderWrapper.classList.remove('sticky');

// 			logo.style.display = 'block';
// 			logoSticky.style.display = 'none';
// 		}

// 		// Array.prototype.forEach.call(slideBackgroundWrapper, function(el, index, array) {
// 		// 	let scrollPos = window.scrollY;
// 		// 	let slideVerticalTransform = scrollPos * 0.26;
// 		// 	let screenHeight = window.innerHeight;

// 		// 	if (scrollPos <= screenHeight) {
// 		// 		el.style.transform = 'translate3d(0px, ' + slideVerticalTransform + 'px, 0px)';
// 		// 	}
// 		// });
// 	});
// })();