Siema.prototype.setNavigationButton = setNavigationButton;
Siema.prototype.attachResizeEvent = attachResizeEvent;

Siema.prototype.startHeadSlider = startHeadSlider;

Siema.prototype.headSlideTouchstartHandler = headSlideTouchstartHandler;
Siema.prototype.headSlideTouchendHandler = headSlideTouchendHandler;
Siema.prototype.headSlideTouchmoveHandler = headSlideTouchmoveHandler;

Siema.prototype.headSlideMousedownHandler = headSlideMousedownHandler;
Siema.prototype.headSlideMouseupHandler = headSlideMouseupHandler;
Siema.prototype.headSlideMouseleaveHandler = headSlideMouseleaveHandler;
Siema.prototype.headSlideMousemoveHandler = headSlideMousemoveHandler;
Siema.prototype.headSlideUpdateAfterDrag = headSlideUpdateAfterDrag;

Siema.prototype.headSlidePrev = headSlidePrev;
Siema.prototype.headSlideNext = headSlideNext;

function setNavigationButton(navButtonCls) {
	var vm = this;
	var numberOfSlides = vm.innerElements.length;
	var buttonClasses = [navButtonCls + ' -prev' + 'js-slider-prev', navButtonCls + ' -next js-slider-next'];
	var button;
	var screenReader;

	if (numberOfSlides === 0) return;

	if (vm.perPage < numberOfSlides) {
        numOfSlides = (numberOfSlides - vm.perPage) + 1;
    }

	if (numOfSlides === 0) return;

	buttonClasses.forEach(function(navButtonCls, index) {
		button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.className = navButtonCls;

		screenReader = document.createElement('span');
		screenReader.className = 'screen-reader-text';
		screenReader.innerHTML = (index) ? 'Next Slide' : 'Previous Slide';
		button.appendChild(screenReader)

		vm.selector.appendChild(button);
	});
}

function attachResizeEvent() {
	var vm = this;

	window.addEventListener('resize', vm.resizeHandler);
}

function startHeadSlider() {
	var vm = this;

	// Touch Listener
	vm.selector.addEventListener('touchstart', vm.headSlideTouchstartHandler.bind(vm), false);
	vm.selector.addEventListener('touchend', vm.headSlideTouchendHandler.bind(vm), false);
	vm.selector.addEventListener('touchmove', vm.headSlideTouchmoveHandler.bind(vm), false);

	// Mouse Listener
	vm.selector.addEventListener('mousedown', vm.headSlideMousedownHandler.bind(vm), false);
	vm.selector.addEventListener('mouseup', vm.headSlideMouseupHandler.bind(vm), false);
	vm.selector.addEventListener('mouseleave', vm.headSlideMouseleaveHandler.bind(vm), false);
	vm.selector.addEventListener('mousemove', vm.headSlideMousemoveHandler.bind(vm), false);

	// Click Listener
	vm.selector.addEventListener('click', vm.clickHandler);
	
}

function headSlideTouchstartHandler(event) {
	var vm = this;

	// Prevent dragging / swiping on inputs, selects and textareas
	const ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(event.target.nodeName) !== -1;
	if (ignoreSiema) return;	

	event.stopPropagation();

	vm.pointerDown = true;
	vm.drag.startX = event.touches[0].pageX;
	vm.drag.startY = event.touches[0].pageY;
}

function headSlideTouchendHandler(event) {
	var vm = this;

	event.stopPropagation();

	vm.pointerDown = false;

	if (vm.drag.endX) {
		vm.headSlideUpdateAfterDrag();
	}

	vm.clearDrag();
}

function headSlideTouchmoveHandler(event) {
	var vm = this;

	event.stopPropagation();

	if (vm.drag.letItGo === null) {
		vm.drag.letItGo = Math.abs(vm.drag.startY - event.touches[0].pageY) < Math.abs(vm.drag.startX - event.touches[0].pageX);
	}

	if (vm.pointerDown && vm.drag.letItGo) {
		event.preventDefault();

		vm.drag.endX = event.touches[0].pageX;
	}
}

function headSlideMousedownHandler(event) {
	var vm = this;

	// Prevent dragging / swiping on inputs, selects and textareas
	const ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(event.target.nodeName) !== -1;
	if (ignoreSiema) return;

	event.preventDefault();
	event.stopPropagation();

	vm.pointerDown = true;
	vm.drag.startX = event.pageX;
}

function headSlideMouseupHandler(event) {
	event.stopPropagation();
	var vm = this;
	
	vm.pointerDown = false;
	vm.selector.style.cursor = '-webkit-grab';

	if (vm.drag.endX) {
		vm.headSlideUpdateAfterDrag();
	}

	vm.clearDrag();
}

function headSlideMouseleaveHandler(event) {
	var vm = this;

	if (vm.pointerDown) {
		vm.pointerDown = false;
		vm.selector.style.cursor = '-webkit-grab';
		vm.drag.endX = event.pageX;
		vm.drag.preventClick = false;

		vm.headSlideUpdateAfterDrag();
		vm.clearDrag();
	}
}

function headSlideMousemoveHandler(event) {
	vm = this;

	event.preventDefault();

	if (vm.pointerDown) {
		if (event.target.nodeName === 'A') {
			vm.drag.preventClick = true;
		}

		vm.drag.endX = event.pageX;
		vm.selector.style.cursor = '-webkit-grabbing';
	}
}


function headSlideUpdateAfterDrag() {
	var vm = this;

	const movement = (vm.config.rtl ? -1 : 1) * (vm.drag.endX - vm.drag.startX);
    const movementDistance = Math.abs(movement);
	const howManySliderToSlide = vm.config.multipleDrag ? Math.ceil(movementDistance / (vm.selectorWidth / vm.perPage)) : 1;

    const slideToNegativeClone = movement > 0 && vm.currentSlide - howManySliderToSlide < 0;
	const slideToPositiveClone = movement < 0 && vm.currentSlide + howManySliderToSlide > vm.innerElements.length - vm.perPage;

	if (movement > 0 && movementDistance > vm.config.threshold && vm.innerElements.length > vm.perPage) {
		vm.headSlidePrev(howManySliderToSlide);
	} else if (movement < 0 && movementDistance > vm.config.threshold && vm.innerElements.length > vm.perPage) {
		vm.headSlideNext(howManySliderToSlide);
	}

	vm.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
}

function headSlidePrev(howManySlides = 1) {
	var vm = this;

	if (vm.innerElements.length <= vm.perPage) return;

	const currentSlide = vm.currentSlide;
	let targetSlide;

	if (vm.config.loop) {
		const isNewIndexClone = currentSlide - howManySlides < 0;

		if (isNewIndexClone) {
			const mirrorSlideIndex = currentSlide + vm.innerElements.length;

			targetSlide = mirrorSlideIndex - howManySlides;
		} else {
			targetSlide = currentSlide - howManySlides;
		}
	} else {
		targetSlide = Math.max(currentSlide - howManySlides, 0);
	}


	console.log(targetSlide);

	var prom = new Promise(function(callback) {
		vm.innerElements[currentSlide].classList.remove('is-active');

		callback();
	});

	prom.then(function() {
		vm.innerElements[targetSlide].classList.add('is-active');
	})
	.then(function() {
		setTimeout(function() {
			vm.currentSlide = targetSlide;

			if (currentSlide !== vm.currentSlide) {
				vm.slideToCurrent(vm.config.loop);
			}
		}, 700);
	});
}

function headSlideNext(howManySlides = 1) {
	var vm = this;

	if (vm.innerElements.length <= vm.perPage) return;

	const currentSlide = vm.currentSlide;
	let targetSlide;

	if (vm.config.loop) {
		const isNewIndexClone = currentSlide + howManySlides > vm.innerElements.length - vm.perPage;

		if (isNewIndexClone) {
			const mirrorSlideIndex = currentSlide - vm.innerElements.length;

			targetSlide = mirrorSlideIndex + howManySlides;
		} else {
			targetSlide = currentSlide + howManySlides;
		}
	} else {
		targetSlide = Math.min(currentSlide + howManySlides, vm.innerElements.length - vm.perPage);
	}

	console.log(targetSlide);

	var prom = new Promise(function(callback) {
		vm.innerElements[currentSlide].classList.remove('is-active');

		callback();
	});
	
	prom.then(function() {
		vm.innerElements[targetSlide].classList.add('is-active');
	})
	.then(function() {
		setTimeout(function() {
			vm.currentSlide = targetSlide;

			if (currentSlide !== vm.currentSlide) {
				vm.slideToCurrent(vm.config.loop);
			}
		}, 700);
	});
}