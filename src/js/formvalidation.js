import { eraseCookie } from './cookies';
import * as lottie from 'lottie-web';
import animationData from './submitanimation.json';

let animation = lottie.loadAnimation({
	container: document.querySelector('.js-submit-animation'),
	renderer: 'svg',
	loop: false,
	autoplay: false,
	animationData: animationData,
});

const validateForm = () => {
	const form = document.querySelector('.js-validate');
	const submit = document.querySelector('.js-submit-btn');

	submit.addEventListener('click', (e) => {
		e.preventDefault();
		if (form.checkValidity()) {
			form.classList.add('u-hide');
			document.querySelector('.js-submit-animation').classList.remove('u-hide');
			animation.play();
			eraseCookie('contactForm');
		}
		form.classList.add('was-validated');
	});
};

const init = () => {
	validateForm();
};

document.addEventListener('DOMContentLoaded', init);
