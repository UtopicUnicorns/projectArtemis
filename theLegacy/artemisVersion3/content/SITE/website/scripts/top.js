var top_button = document.getElementById('top');

document.getElementById('content').onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.getElementById('content').scrollTop > 300 || document.getElementById('content').scrollTop > 300) {
		top_button.style.opacity = '1';
	} else {
		top_button.style.opacity = '0';
	}
}

function topFunction() {
	document.getElementById('content').scrollTop = 0;
}
