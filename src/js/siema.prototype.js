Siema.prototype.setNavigationButton = setNavigationButton;
Siema.prototype.attachResizeEvent = attachResizeEvent;

function setNavigationButton(nextButtonCls, prevButtonCls) {
	var vm = this;
	var numberOfSlides = vm.innerElements.length;

	if (numberOfSlides === 0) return;

	
}

function attachResizeEvent() {
	var vm = this;

	window.addEventListener('resize', vm.resizeHandler);
}