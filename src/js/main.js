(function() {
	'use strict';

	var sliderWrapper = document.querySelector('.js-flickity-head-slider');

	var flickity = new Flickity(sliderWrapper, {
		cellAlign: 'left',
		// arrowShape: "M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554"
		// 	+ "c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587"
		// 	+ "c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z",
		contain: true
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
})();