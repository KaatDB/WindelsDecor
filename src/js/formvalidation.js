import { eraseCookie } from './cookies';
import * as lottie from 'lottie-web';
import animationData from './submitanimation.json';

const validateForm = () => {
	const form = document.querySelector('.js-validate');
	const submit = document.querySelector('.js-submit-btn');
	const animationContainer = document.querySelector('.js-submit-animation');
	const animationEl = document.querySelector('.js-animation');
	const wrapper = form.parentElement;

	let animation = lottie.loadAnimation({
		container: animationEl,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		animationData: animationData,
	});

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		form.classList.add('was-validated');
		if (!form.checkValidity()) return;

		submit.disabled = true;

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: { Accept: 'application/json' },
			});
			if (!response.ok) throw new Error('Verzenden mislukt');

			wrapper.style.minHeight = `${wrapper.offsetHeight}px`;
			form.classList.add('u-hide');
			animationContainer.classList.remove('u-hide');
			animationContainer.classList.add('c-contact__animation');
			animation.play();
			eraseCookie('contactForm');
		} catch (error) {
			submit.disabled = false;
			alert('Er ging iets mis bij het verzenden. Probeer het later opnieuw of mail naar info@windelsdecor.be.');
		}
	});
};

const init = () => {
	validateForm();
};

document.addEventListener('DOMContentLoaded', init);
