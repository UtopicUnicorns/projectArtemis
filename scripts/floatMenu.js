var float_menu = document.getElementById('float_menu');

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (window.scrollY > 300) {
		float_menu.style.opacity = '1';
		float_menu.style.bottom = '0px';
	} else {
		float_menu.style.opacity = '0';
		float_menu.style.bottom = '-1000px';
	}
}
